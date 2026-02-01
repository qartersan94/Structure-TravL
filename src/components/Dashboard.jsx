import React, { useState, useMemo } from 'react';
import {
  Shield, LogOut, Users, Calendar, Newspaper, FileText, Target,
  Plus, Trash2, ChevronDown, ChevronUp, Check, X, Clock, ArrowLeft,
  Edit2, Save, User, Swords
} from 'lucide-react';
import { TEAMS } from '../data/teamsData';
import { SESSION_TYPES } from '../data/scheduleData';

// ============================================================
// DONNÉES D'ÉTAT (en mémoire — réinitialisées à chaque rechargement)
// ============================================================

const ROLES = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function Dashboard({ user, onLogout }) {
  // ─── TABS ───
  const [activeTab, setActiveTab] = useState('planning');

  // ─── TEAMS STATE (rosters par équipe, mutable) ───
  const [teamsState, setTeamsState] = useState(() =>
    TEAMS.map(t => ({ ...t, roster: [] }))
  );

  // ─── SESSIONS (créées par capitaines/staff) ───
  const [sessions, setSessions] = useState([]);

  // ─── PRÉSENCES { [sessionId]: { [playerId]: 'pending'|'confirmed'|'absent' } } ───
  const [presences, setPresences] = useState({});

  // ─── NEWS ───
  const [news, setNews] = useState([]);

  // ─── NOTES ───
  const [notes, setNotes] = useState({});

  // ─── OBJECTIFS ───
  const [objectives, setObjectives] = useState(() =>
    TEAMS.map(t => ({
      teamId: t.id,
      winrateTarget: 60,
      winrateCurrent: 0,
      matchesTarget: 50,
      matchesCurrent: 0,
      position: '-',
      competition: t.competitions[0]?.name || ''
    }))
  );

  // ─── HELPERS ───
  const isStaff = user.role === 'staff';
  const userTeamId = user.teamId;

  const getTeam = (id) => TEAMS.find(t => t.id === id);
  const getTeamState = (id) => teamsState.find(t => t.id === id);

  // Tabs disponibles selon rôle
  const tabs = [
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'equipes', label: 'Équipes', icon: Users },
    { id: 'actualites', label: 'Actualités', icon: Newspaper },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'objectifs', label: 'Objectifs', icon: Target }
  ];

  // ============================================================
  // PLANNING TAB
  // ============================================================
  function PlanningTab() {
    const [showCreate, setShowCreate] = useState(false);
    const [expandedSession, setExpandedSession] = useState(null);
    const [filterDay, setFilterDay] = useState('all');
    const [filterType, setFilterType] = useState('all');

    // Form state
    const [form, setForm] = useState({
      title: '', date: '', dayName: 'Lundi', time: '18:00', duration: '2h',
      type: 'training', teamId: isStaff ? 1 : userTeamId,
      description: '', mandatory: false, important: false
    });

    const filteredSessions = useMemo(() => {
      return sessions
        .filter(s => {
          if (!isStaff && s.teamId !== userTeamId) return false;
          if (filterDay !== 'all' && s.dayName !== filterDay) return false;
          if (filterType !== 'all' && s.type !== filterType) return false;
          return true;
        })
        .sort((a, b) => {
          const dayOrder = DAYS.indexOf(a.dayName) - DAYS.indexOf(b.dayName);
          if (dayOrder !== 0) return dayOrder;
          return a.time.localeCompare(b.time);
        });
    }, [sessions, filterDay, filterType, isStaff, userTeamId]);

    // Grouper par jour
    const sessionsByDay = useMemo(() => {
      const groups = {};
      DAYS.forEach(d => { groups[d] = []; });
      filteredSessions.forEach(s => { groups[s.dayName].push(s); });
      return groups;
    }, [filteredSessions]);

    const handleCreate = () => {
      if (!form.title || !form.time) return;
      const typeObj = SESSION_TYPES[form.type.toUpperCase()] || Object.values(SESSION_TYPES).find(t => t.id === form.type);
      const newSession = {
        id: Date.now(),
        title: form.title,
        date: form.date,
        dayName: form.dayName,
        time: form.time,
        duration: form.duration,
        type: typeObj,
        teamId: parseInt(form.teamId),
        teamName: getTeam(parseInt(form.teamId))?.name || '',
        description: form.description,
        mandatory: form.mandatory,
        important: form.important,
        createdBy: user.displayName
      };
      setSessions(prev => [...prev, newSession]);

      // Init présences avec les joueurs du roster
      const team = getTeamState(parseInt(form.teamId));
      const roster = team?.roster || [];
      const presenceMap = {};
      roster.forEach(p => { presenceMap[p.id] = 'pending'; });
      setPresences(prev => ({ ...prev, [newSession.id]: presenceMap }));

      setForm({ title: '', date: '', dayName: 'Lundi', time: '18:00', duration: '2h', type: 'training', teamId: isStaff ? 1 : userTeamId, description: '', mandatory: false, important: false });
      setShowCreate(false);
    };

    const deleteSession = (id) => {
      setSessions(prev => prev.filter(s => s.id !== id));
      setPresences(prev => { const n = { ...prev }; delete n[id]; return n; });
    };

    const handlePresence = (sessionId, playerId, status) => {
      setPresences(prev => ({
        ...prev,
        [sessionId]: { ...prev[sessionId], [playerId]: status }
      }));
    };

    const getSessionPresenceSummary = (session) => {
      const p = presences[session.id] || {};
      const team = getTeamState(session.teamId);
      const roster = team?.roster || [];
      let confirmed = 0, pending = 0, absent = 0;
      roster.forEach(player => {
        const status = p[player.id] || 'pending';
        if (status === 'confirmed') confirmed++;
        else if (status === 'absent') absent++;
        else pending++;
      });
      return { confirmed, pending, absent, total: roster.length };
    };

    return (
      <div className="space-y-6">
        {/* Header + Create */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>PLANNING</h2>
            <p className="text-xs text-gray-500">
              {isStaff ? 'Toutes les équipes' : `Équipe ${getTeam(userTeamId)?.name}`}
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all"
          >
            {showCreate ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showCreate ? 'Annuler' : 'Nouvelle session'}
          </button>
        </div>

        {/* Formulaire de création */}
        {showCreate && (
          <div className="bg-gray-900 bg-opacity-80 border border-red-900 border-opacity-40 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-red-400 tracking-wide">CRÉER UNE SESSION</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="col-span-2 md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Scrims vs équipe externe"
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Type de session *</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none"
                >
                  {Object.values(SESSION_TYPES).map(t => (
                    <option key={t.id} value={t.id}>{t.emoji} {t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Jour</label>
                <select
                  value={form.dayName}
                  onChange={e => setForm({ ...form, dayName: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none"
                >
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Heure *</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Durée</label>
                <select
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none"
                >
                  {['30min','1h','1h30','2h','2h30','3h','4h'].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              {isStaff && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Équipe</label>
                  <select
                    value={form.teamId}
                    onChange={e => setForm({ ...form, teamId: e.target.value })}
                    className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none"
                  >
                    {TEAMS.map(t => <option key={t.id} value={t.id}>{t.logo} {t.name}</option>)}
                  </select>
                </div>
              )}
              <div className="col-span-2 md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Description de la session..."
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none"
                />
              </div>
              <div className="col-span-2 md:col-span-3 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.mandatory} onChange={e => setForm({ ...form, mandatory: e.target.checked })} className="accent-red-600" />
                  <span className="text-xs text-gray-400">Obligatoire</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.important} onChange={e => setForm({ ...form, important: e.target.checked })} className="accent-yellow-500" />
                  <span className="text-xs text-gray-400">Important</span>
                </label>
              </div>
            </div>
            <button
              onClick={handleCreate}
              disabled={!form.title || !form.time}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 rounded-lg transition-all"
            >
              Créer la session
            </button>
          </div>
        )}

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-1 bg-gray-900 bg-opacity-60 rounded-lg p-1">
            {['all', ...DAYS].map(d => (
              <button key={d} onClick={() => setFilterDay(d)}
                className={`text-xs font-bold px-3 py-1 rounded-md transition-all ${filterDay === d ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                {d === 'all' ? 'Tous' : d.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-gray-900 bg-opacity-60 rounded-lg p-1">
            <button onClick={() => setFilterType('all')}
              className={`text-xs font-bold px-3 py-1 rounded-md transition-all ${filterType === 'all' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              Tous types
            </button>
            {Object.values(SESSION_TYPES).map(t => (
              <button key={t.id} onClick={() => setFilterType(t.id)}
                className={`text-xs font-bold px-2 py-1 rounded-md transition-all ${filterType === t.id ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                {t.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions groupées par jour */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucune session créée. Clique sur "Nouvelle session" pour commencer.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {DAYS.map(day => {
              const daySessions = sessionsByDay[day];
              if (daySessions.length === 0) return null;
              return (
                <div key={day}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-red-400 tracking-widest uppercase">{day}</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                    <span className="text-xs text-gray-600">{daySessions.length} session{daySessions.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="space-y-3">
                    {daySessions.map(session => {
                      const team = getTeam(session.teamId);
                      const teamSt = getTeamState(session.teamId);
                      const summary = getSessionPresenceSummary(session);
                      const isExpanded = expandedSession === session.id;
                      const isValidated = summary.confirmed >= 3 && summary.total > 0;

                      return (
                        <div key={session.id} className="border border-gray-800 rounded-xl overflow-hidden" style={{ borderLeftColor: session.type?.color || '#DC143C', borderLeftWidth: '3px' }}>
                          {/* Header clickable */}
                          <div
                            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-900 hover:bg-opacity-50 transition-all"
                            onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{session.type?.emoji}</span>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-bold text-white">{session.title}</span>
                                  {session.mandatory && <span className="text-xs bg-red-900 bg-opacity-40 text-red-400 px-2 py-0.5 rounded">Obligatoire</span>}
                                  {session.important && <span className="text-xs bg-yellow-900 bg-opacity-40 text-yellow-400 px-2 py-0.5 rounded">⚠ Important</span>}
                                  {isValidated && <span className="text-xs bg-green-900 bg-opacity-40 text-green-400 px-2 py-0.5 rounded">✓ Validé</span>}
                                </div>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{session.time} — {session.duration}</span>
                                  <span className="text-xs font-bold" style={{ color: team?.color }}>{team?.logo} {session.teamName}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-xs text-gray-500">
                                  <span className="text-green-400">{summary.confirmed}</span>/<span className="text-gray-400">{summary.total}</span>
                                </div>
                              </div>
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                          </div>

                          {/* Expanded: roster + présences */}
                          {isExpanded && (
                            <div className="border-t border-gray-800 p-3 space-y-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
                              {session.description && (
                                <p className="text-xs text-gray-500 mb-2">{session.description}</p>
                              )}
                              {(teamSt?.roster || []).length === 0 ? (
                                <p className="text-xs text-gray-600 italic">Aucun joueur dans le roster de cette équipe.</p>
                              ) : (
                                (teamSt?.roster || []).map(player => {
                                  const status = (presences[session.id] || {})[player.id] || 'pending';
                                  return (
                                    <div key={player.id} className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${team?.color || '#333'}` }}>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold w-14" style={{ color: team?.color }}>{player.role}</span>
                                        <span className="text-sm text-white">{player.pseudo}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {/* Status indicator */}
                                        <span className={`text-xs font-bold ${status === 'confirmed' ? 'text-green-400' : status === 'absent' ? 'text-red-400' : 'text-yellow-400'}`}>
                                          {status === 'confirmed' ? '✓ Confirmé' : status === 'absent' ? '✕ Absent' : '⏳ En attente'}
                                        </span>
                                        {/* Actions (capitaine/staff peuvent confirmer/marquer absent) */}
                                        <div className="flex gap-1">
                                          <button
                                            onClick={() => handlePresence(session.id, player.id, 'confirmed')}
                                            className={`p-1 rounded transition-all ${status === 'confirmed' ? 'bg-green-900 bg-opacity-60' : 'hover:bg-green-900 hover:bg-opacity-30'}`}
                                            title="Confirmer"
                                          >
                                            <Check className={`w-3.5 h-3.5 ${status === 'confirmed' ? 'text-green-400' : 'text-gray-500'}`} />
                                          </button>
                                          <button
                                            onClick={() => handlePresence(session.id, player.id, 'absent')}
                                            className={`p-1 rounded transition-all ${status === 'absent' ? 'bg-red-900 bg-opacity-60' : 'hover:bg-red-900 hover:bg-opacity-30'}`}
                                            title="Absent"
                                          >
                                            <X className={`w-3.5 h-3.5 ${status === 'absent' ? 'text-red-400' : 'text-gray-500'}`} />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                              {/* Delete */}
                              <div className="flex justify-end pt-1">
                                <button
                                  onClick={() => deleteSession(session.id)}
                                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" /> Supprimer la session
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // EQUIPES TAB — Roster management avec couleurs team
  // ============================================================
  function EquipesTab() {
    const [selectedTeamId, setSelectedTeamId] = useState(isStaff ? null : userTeamId);
    const [addingPlayer, setAddingPlayer] = useState(false);
    const [playerForm, setPlayerForm] = useState({ pseudo: '', realName: '', role: 'Top' });

    const visibleTeams = isStaff ? TEAMS : TEAMS.filter(t => t.id === userTeamId);
    const selectedTeam = getTeam(selectedTeamId);
    const selectedTeamState = getTeamState(selectedTeamId);

    const addPlayer = () => {
      if (!playerForm.pseudo) return;
      const newPlayer = {
        id: Date.now(),
        pseudo: playerForm.pseudo,
        realName: playerForm.realName,
        role: playerForm.role,
        kda: 0,
        winRate: 0,
        games: 0
      };
      setTeamsState(prev =>
        prev.map(t =>
          t.id === selectedTeamId
            ? { ...t, roster: [...t.roster, newPlayer] }
            : t
        )
      );
      // Ajouter le joueur aux présences des sessions existantes de cette équipe
      setSessions(prev => prev); // trigger
      setPresences(prev => {
        const updated = { ...prev };
        sessions.forEach(s => {
          if (s.teamId === selectedTeamId && updated[s.id]) {
            updated[s.id] = { ...updated[s.id], [newPlayer.id]: 'pending' };
          }
        });
        return updated;
      });

      setPlayerForm({ pseudo: '', realName: '', role: 'Top' });
      setAddingPlayer(false);
    };

    const removePlayer = (playerId) => {
      setTeamsState(prev =>
        prev.map(t =>
          t.id === selectedTeamId
            ? { ...t, roster: t.roster.filter(p => p.id !== playerId) }
            : t
        )
      );
    };

    // Si capitaine, afficher directement son équipe
    if (!isStaff && selectedTeamId) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedTeam?.logo}</span>
              <div>
                <h2 className="text-xl font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", color: selectedTeam?.color }}>{selectedTeam?.name}</h2>
                <p className="text-xs text-gray-500">{selectedTeam?.rank} — {selectedTeam?.motto}</p>
              </div>
            </div>
          </div>
          <RosterManager team={selectedTeam} teamState={selectedTeamState} onAddPlayer={addPlayer} onRemovePlayer={removePlayer} addingPlayer={addingPlayer} setAddingPlayer={setAddingPlayer} playerForm={playerForm} setPlayerForm={setPlayerForm} />
        </div>
      );
    }

    // Staff: liste de toutes les équipes puis roster détail
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>ÉQUIPES</h2>

        {selectedTeamId ? (
          <div className="space-y-4">
            <button onClick={() => setSelectedTeamId(null)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors">
              <ArrowLeft className="w-3 h-3" /> Retour à la liste
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedTeam?.logo}</span>
              <div>
                <h3 className="text-lg font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", color: selectedTeam?.color }}>{selectedTeam?.name}</h3>
                <p className="text-xs text-gray-500">{selectedTeam?.rank} — {selectedTeam?.motto}</p>
              </div>
            </div>
            <RosterManager team={selectedTeam} teamState={selectedTeamState} onAddPlayer={addPlayer} onRemovePlayer={removePlayer} addingPlayer={addingPlayer} setAddingPlayer={setAddingPlayer} playerForm={playerForm} setPlayerForm={setPlayerForm} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {visibleTeams.map(team => {
              const ts = getTeamState(team.id);
              return (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className="cursor-pointer rounded-xl border border-gray-800 hover:border-opacity-60 transition-all hover:-translate-y-1 p-4 text-center"
                  style={{ borderColor: team.color + '33', background: team.color + '08' }}
                >
                  <div className="text-3xl mb-2">{team.logo}</div>
                  <div className="text-sm font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>{team.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{ts?.roster?.length || 0} joueur{(ts?.roster?.length || 0) !== 1 ? 's' : ''}</div>
                  <div className="text-xs text-gray-600">{team.rank}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function RosterManager({ team, teamState, onAddPlayer, onRemovePlayer, addingPlayer, setAddingPlayer, playerForm, setPlayerForm }) {
    const roster = teamState?.roster || [];
    return (
      <div className="space-y-4">
        {/* Roster avec couleur de l'équipe */}
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: team?.color + '40' }}>
          <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: team?.color + '12' }}>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: team?.color }}>ROSTER — {roster.length} / 5</span>
            <button
              onClick={() => setAddingPlayer(!addingPlayer)}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg transition-all"
              style={{ background: addingPlayer ? '#333' : team?.color, color: addingPlayer ? '#aaa' : '#000' }}
            >
              {addingPlayer ? <><X className="w-3 h-3" /> Annuler</> : <><Plus className="w-3 h-3" /> Ajouter joueur</>}
            </button>
          </div>

          {/* Form d'ajout */}
          {addingPlayer && (
            <div className="p-4 border-b" style={{ borderColor: team?.color + '20', background: 'rgba(0,0,0,0.4)' }}>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Pseudo *</label>
                  <input
                    type="text"
                    value={playerForm.pseudo}
                    onChange={e => setPlayerForm({ ...playerForm, pseudo: e.target.value })}
                    placeholder="Pseudo du joueur"
                    className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs placeholder-gray-600 focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nom réel</label>
                  <input
                    type="text"
                    value={playerForm.realName}
                    onChange={e => setPlayerForm({ ...playerForm, realName: e.target.value })}
                    placeholder="Prénom Nom"
                    className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs placeholder-gray-600 focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Rôle</label>
                  <select
                    value={playerForm.role}
                    onChange={e => setPlayerForm({ ...playerForm, role: e.target.value })}
                    className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs focus:border-red-600 focus:outline-none"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={onAddPlayer}
                disabled={!playerForm.pseudo}
                className="mt-2 w-full text-xs font-bold py-1.5 rounded-lg transition-all disabled:opacity-40"
                style={{ background: team?.color, color: '#000' }}
              >
                Ajouter au roster
              </button>
            </div>
          )}

          {/* Liste joueurs */}
          {roster.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <User className="w-8 h-8 text-gray-700 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Aucun joueur. Ajoute les joueurs une fois leur compte créé sur le site.</p>
            </div>
          ) : (
            <div>
              {roster.map((player, idx) => (
                <div key={player.id} className={`flex items-center justify-between px-4 py-2.5 ${idx !== roster.length - 1 ? 'border-b border-gray-800' : ''}`}
                  style={{ background: idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold w-14 text-right" style={{ color: team?.color }}>{player.role}</span>
                    <div>
                      <span className="text-sm font-bold text-white">{player.pseudo}</span>
                      {player.realName && <span className="text-xs text-gray-500 ml-2">({player.realName})</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: team?.color, boxShadow: `0 0 6px ${team?.color}` }}></div>
                    <button onClick={() => onRemovePlayer(player.id)} className="text-gray-600 hover:text-red-400 transition-colors p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================
  // ACTUALITÉS TAB
  // ============================================================
  function ActualitesTab() {
    const [showCreate, setShowCreate] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ title: '', emoji: '📢', color: '#DC143C', category: 'Annonce', content: '' });

    const saveNews = () => {
      if (!form.title) return;
      if (editId !== null) {
        setNews(prev => prev.map(n => n.id === editId ? { ...n, ...form } : n));
        setEditId(null);
      } else {
        setNews(prev => [...prev, { id: Date.now(), ...form, date: new Date().toLocaleDateString('fr-FR') }]);
      }
      setForm({ title: '', emoji: '📢', color: '#DC143C', category: 'Annonce', content: '' });
      setShowCreate(false);
    };

    const startEdit = (article) => {
      setForm({ title: article.title, emoji: article.emoji, color: article.color, category: article.category, content: article.content });
      setEditId(article.id);
      setShowCreate(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>ACTUALITÉS</h2>
          <button onClick={() => { setShowCreate(!showCreate); setEditId(null); setForm({ title: '', emoji: '📢', color: '#DC143C', category: 'Annonce', content: '' }); }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all">
            {showCreate ? <><X className="w-4 h-4" /> Annuler</> : <><Plus className="w-4 h-4" /> Nouvelle</>}
          </button>
        </div>

        {showCreate && (
          <div className="bg-gray-900 bg-opacity-80 border border-red-900 border-opacity-40 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-red-400 tracking-wide">{editId !== null ? 'MODIFIER' : 'CRÉER'} UNE ARTICLE</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="col-span-2 md:col-span-4">
                <label className="block text-xs text-gray-500 mb-1">Titre *</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'article"
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Emoji</label>
                <select value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none">
                  {['📢','🏆','🔥','⚡','⭐','🎮','📊','👁️','❄️','🌑'].map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Catégorie</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none">
                  {['Annonce','Match Report','Analyse','Portrait','Classement'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Couleur</label>
                <select value={form.color} onChange={e => setForm({ ...form, color: e.target.value })}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none">
                  {[{ c: '#DC143C', n: 'Rouge' },{ c: '#00FF88', n: 'Vert' },{ c: '#FF6B35', n: 'Orange' },{ c: '#9D4EDD', n: 'Violet' },{ c: '#4169E1', n: 'Bleu' },{ c: '#FFD700', n: 'Or' }].map(x => (
                    <option key={x.c} value={x.c}>{x.n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">&nbsp;</label>
              </div>
              <div className="col-span-2 md:col-span-4">
                <label className="block text-xs text-gray-500 mb-1">Contenu</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Contenu de l'article..."
                  rows={3} className="w-full bg-black bg-opacity-50 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none resize-none" />
              </div>
            </div>
            <button onClick={saveNews} disabled={!form.title}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white text-sm font-bold py-2.5 rounded-lg transition-all">
              {editId !== null ? 'Sauvegarder' : 'Publier'}
            </button>
          </div>
        )}

        {news.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="w-10 h-10 text-gray-700 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Aucune actualité. Crée le premier article !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map(article => (
              <div key={article.id} className="border border-gray-800 rounded-xl overflow-hidden hover:border-opacity-60 transition-all" style={{ borderColor: article.color + '30' }}>
                <div className="p-4 space-y-2" style={{ background: article.color + '08' }}>
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{article.emoji}</span>
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(article)} className="text-gray-500 hover:text-red-400 p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setNews(prev => prev.filter(n => n.id !== article.id))} className="text-gray-500 hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: article.color }}>{article.category}</span>
                    <span className="text-xs text-gray-600">{article.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{article.title}</h3>
                  {article.content && <p className="text-xs text-gray-500 leading-relaxed">{article.content}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // NOTES TAB
  // ============================================================
  function NotesTab() {
    const [selectedTeamForNotes, setSelectedTeamForNotes] = useState(isStaff ? null : userTeamId);
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState('');

    const visibleTeams = isStaff ? TEAMS : TEAMS.filter(t => t.id === userTeamId);
    const selectedTeamState = getTeamState(selectedTeamForNotes);
    const roster = selectedTeamState?.roster || [];

    const saveNote = (playerId) => {
      setNotes(prev => ({ ...prev, [playerId]: noteText }));
      setEditingNote(null);
      setNoteText('');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>NOTES</h2>

        {/* Sélection équipe (staff) */}
        {isStaff && !selectedTeamForNotes && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {visibleTeams.map(team => (
              <div key={team.id} onClick={() => setSelectedTeamForNotes(team.id)}
                className="cursor-pointer rounded-lg border border-gray-800 p-3 text-center hover:border-opacity-60 transition-all"
                style={{ borderColor: team.color + '33', background: team.color + '08' }}>
                <div className="text-xl mb-1">{team.logo}</div>
                <div className="text-xs font-bebas" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>{team.name}</div>
              </div>
            ))}
          </div>
        )}

        {(isStaff && selectedTeamForNotes) && (
          <button onClick={() => setSelectedTeamForNotes(null)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Retour
          </button>
        )}

        {selectedTeamForNotes && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTeam(selectedTeamForNotes)?.logo}</span>
              <span className="text-sm font-bebas" style={{ fontFamily: "'Bebas Neue', sans-serif", color: getTeam(selectedTeamForNotes)?.color }}>{getTeam(selectedTeamForNotes)?.name}</span>
            </div>
            {roster.length === 0 ? (
              <p className="text-xs text-gray-600 italic">Aucun joueur dans ce roster.</p>
            ) : (
              roster.map(player => (
                <div key={player.id} className="border border-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: getTeam(selectedTeamForNotes)?.color }}>{player.role}</span>
                      <span className="text-sm text-white">{player.pseudo}</span>
                    </div>
                    {editingNote !== player.id && (
                      <button onClick={() => { setEditingNote(player.id); setNoteText(notes[player.id] || ''); }}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                    )}
                  </div>
                  {editingNote === player.id ? (
                    <div className="p-3 space-y-2" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Notes sur ce joueur..."
                        rows={2} className="w-full bg-black bg-opacity-60 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-600 focus:border-red-600 focus:outline-none resize-none" />
                      <div className="flex gap-2">
                        <button onClick={() => saveNote(player.id)} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-lg transition-all">
                          <Save className="w-3 h-3" /> Sauvegarder
                        </button>
                        <button onClick={() => setEditingNote(null)} className="text-xs text-gray-500 hover:text-white transition-colors">Annuler</button>
                      </div>
                    </div>
                  ) : notes[player.id] && (
                    <div className="px-3 py-2" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <p className="text-xs text-gray-400">{notes[player.id]}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // OBJECTIFS TAB
  // ============================================================
  function ObjectifsTab() {
    const visibleTeams = isStaff ? TEAMS : TEAMS.filter(t => t.id === userTeamId);

    const updateObjective = (teamId, field, value) => {
      setObjectives(prev =>
        prev.map(o => o.teamId === teamId ? { ...o, [field]: value } : o)
      );
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bebas text-white tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>OBJECTIFS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleTeams.map(team => {
            const obj = objectives.find(o => o.teamId === team.id) || {};
            const wrPct = obj.winrateTarget > 0 ? Math.min((obj.winrateCurrent / obj.winrateTarget) * 100, 100) : 0;
            const mPct = obj.matchesTarget > 0 ? Math.min((obj.matchesCurrent / obj.matchesTarget) * 100, 100) : 0;
            const wrReached = obj.winrateCurrent >= obj.winrateTarget;
            const mReached = obj.matchesCurrent >= obj.matchesTarget;

            return (
              <div key={team.id} className="border rounded-xl overflow-hidden" style={{ borderColor: team.color + '40', background: team.color + '06' }}>
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: team.color + '12' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{team.logo}</span>
                    <span className="text-sm font-bebas tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>{team.name}</span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Winrate cible */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">🎯 Winrate cible</span>
                      <span className="text-xs font-bold text-gray-400">
                        <input type="number" value={obj.winrateCurrent || 0} onChange={e => updateObjective(team.id, 'winrateCurrent', parseInt(e.target.value) || 0)}
                          className="w-8 bg-transparent border-b border-gray-600 text-center text-xs text-white focus:border-red-600 focus:outline-none" />
                        % / <input type="number" value={obj.winrateTarget || 60} onChange={e => updateObjective(team.id, 'winrateTarget', parseInt(e.target.value) || 60)}
                          className="w-8 bg-transparent border-b border-gray-600 text-center text-xs text-white focus:border-red-600 focus:outline-none" />%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${wrPct}%`, background: wrReached ? '#00FF88' : team.color }}></div>
                    </div>
                    {wrReached && <p className="text-xs text-green-400 mt-1">✓ Objectif atteint !</p>}
                  </div>

                  {/* Matchs joués */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">🎮 Matchs joués</span>
                      <span className="text-xs font-bold text-gray-400">
                        <input type="number" value={obj.matchesCurrent || 0} onChange={e => updateObjective(team.id, 'matchesCurrent', parseInt(e.target.value) || 0)}
                          className="w-8 bg-transparent border-b border-gray-600 text-center text-xs text-white focus:border-red-600 focus:outline-none" />
                        / <input type="number" value={obj.matchesTarget || 50} onChange={e => updateObjective(team.id, 'matchesTarget', parseInt(e.target.value) || 50)}
                          className="w-8 bg-transparent border-b border-gray-600 text-center text-xs text-white focus:border-red-600 focus:outline-none" />
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${mPct}%`, background: mReached ? '#00FF88' : team.color }}></div>
                    </div>
                    {mReached && <p className="text-xs text-green-400 mt-1">✓ Objectif atteint !</p>}
                  </div>

                  {/* Position */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">🏆 Position</span>
                    <input type="text" value={obj.position || '-'} onChange={e => updateObjective(team.id, 'position', e.target.value)}
                      placeholder="#1"
                      className="w-24 bg-transparent border-b border-gray-600 text-right text-xs font-bold focus:border-red-600 focus:outline-none"
                      style={{ color: team.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER PRINCIPAL
  // ============================================================
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Sidebar nav */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-16 md:w-56 min-h-screen bg-black border-r border-gray-800 flex flex-col flex-shrink-0">
          {/* Logo */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-500" />
              <span className="hidden md:block text-sm font-bebas tracking-widest text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>TRAVL</span>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex-1 p-2 space-y-0.5">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    active ? 'bg-red-600 bg-opacity-20 text-red-400' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                  }`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden md:block text-xs font-bold tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom: user info + actions */}
          <div className="p-3 border-t border-gray-800 space-y-2">
            {/* Retour au site */}
            <a
              href="https://qartersan94.github.io/Structure-TravL/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-blue-400 hover:bg-blue-900 hover:bg-opacity-20 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:block">Retour au site</span>
            </a>

            {/* User info */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-red-900 bg-opacity-40 border border-red-600 border-opacity-40 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{user.displayName}</div>
                <div className="text-xs text-gray-600 leading-tight">{user.title}</div>
              </div>
            </div>

            {/* Logout */}
            <button onClick={onLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-red-400 hover:bg-red-900 hover:bg-opacity-20 transition-all">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:block">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top bar */}
          <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bebas tracking-widest text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                DASHBOARD {user.role === 'staff' ? 'STAFF' : 'CAPITAINE'}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              Connecté : <span className="text-gray-400 font-bold">{user.displayName}</span>
              {user.teamId && <span className="ml-2" style={{ color: getTeam(user.teamId)?.color }}>• {getTeam(user.teamId)?.name}</span>}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'planning' && <PlanningTab />}
            {activeTab === 'equipes' && <EquipesTab />}
            {activeTab === 'actualites' && <ActualitesTab />}
            {activeTab === 'notes' && <NotesTab />}
            {activeTab === 'objectifs' && <ObjectifsTab />}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        select option { background: #1a1a1a; color: #fff; }
        input[type="number"]::-webkit-inner-spin-button { opacity: 0.3; }
      `}</style>
    </div>
  );
}

export default Dashboard;
