import React, { useState, useMemo } from 'react';
import {
  Users, Trophy, Calendar, TrendingUp, MessageSquare,
  LogOut, Target, Clock, CheckCircle, AlertCircle,
  BarChart3, Shield, Edit, Save, X, Plus, Trash2,
  UserCheck, UserX, ChevronDown, ChevronUp, Newspaper,
  FileText, ArrowLeft
} from 'lucide-react';
import { TEAMS } from '../data/teamsData';
import { SCHEDULE } from '../data/scheduleData';

// ─── DONNÉES DE PRÉSENCES (état local simulé) ────────────────────
// Structure: { [sessionKey]: { [playerId]: 'pending' | 'confirmed' | 'absent' } }
// sessionKey = `${teamId}-${sessionIndex}`
// playerId = `${teamId}-${rosterIndex}`

function initPresences() {
  const p = {};
  SCHEDULE.forEach((session, sIdx) => {
    const key = `${session.teamId}-${sIdx}`;
    const team = TEAMS.find(t => t.id === session.teamId);
    if (team) {
      p[key] = {};
      team.roster.forEach((_, pIdx) => {
        p[key][`${session.teamId}-${pIdx}`] = 'pending'; // tous pending par défaut
      });
    }
  });
  return p;
}

// ─── DONNÉES NEWS (état local) ─────────────────────────────────
const DEFAULT_NEWS = [
  { id: 1, title: 'Mount X en tête du Nexus Tour', date: '25 Jan 2026', category: 'Classement', emoji: '⚡', color: '#00FF88', content: 'Avec un record de 32-13, Mount X domine la compétition et vise le titre. Leur stratégie en early game est redoutable.' },
  { id: 2, title: 'Flux remporte un match épique', date: '24 Jan 2026', category: 'Match Report', emoji: '🔥', color: '#FF6B35', content: 'Victoire 2-1 dans un match marathon de plus de 50 minutes. Le game 3 reste un moment inoubliable.' },
  { id: 3, title: 'VisionaRY : La montée en puissance', date: '23 Jan 2026', category: 'Analyse', emoji: '👁️', color: '#9D4EDD', content: "L'équipe High Diamond enchaîne les victoires avec un style unique basé sur le contrôle de la carte." },
  { id: 4, title: 'LeGendaRY : Les étoiles montantes', date: '22 Jan 2026', category: 'Portrait', emoji: '⚔️', color: '#4169E1', content: 'Focus sur la plus jeune équipe de la compétition. Leur potentiel est immense et leur progression remarquable.' }
];

// ─── COMPOSANT PRINCIPAL ───────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [presences, setPresences] = useState(initPresences);
  const [notes, setNotes] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [news, setNews] = useState(DEFAULT_NEWS);
  const [editingNews, setEditingNews] = useState(null);
  const [creatingNews, setCreatingNews] = useState(false);
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Classement', emoji: '⚡', color: '#00FF88', content: '' });
  const [expandedSessions, setExpandedSessions] = useState({});
  const [planningFilter, setPlanningFilter] = useState('all'); // all | pending | confirmed

  // Rôle
  const isStaff = user.role === 'Staff';
  const isCaptain = user.role === 'Capitaine';

  // Équipes visibles selon rôle
  const visibleTeams = isStaff ? TEAMS : TEAMS.filter(t => t.id === user.teamId);
  const visibleSessions = isStaff
    ? SCHEDULE
    : SCHEDULE.filter(s => s.teamId === user.teamId);

  // ─── STATS OVERVIEW ──────────────────────────────────────────
  const totalPlayers = visibleTeams.reduce((a, t) => a + t.roster.length, 0);
  const totalMatches = visibleSessions.filter(s => s.type && s.type.id === 'match').length;
  const upcomingSessions = visibleSessions.length;
  const avgWinrate = visibleTeams.length
    ? Math.round(visibleTeams.reduce((a, t) => a + t.globalStats.winRate, 0) / visibleTeams.length)
    : 0;

  // ─── PRÉSENCES HELPERS ───────────────────────────────────────
  const toggleSession = (key) => setExpandedSessions(prev => ({ ...prev, [key]: !prev[key] }));

  const markPresence = (sessionKey, playerId, status) => {
    setPresences(prev => ({
      ...prev,
      [sessionKey]: { ...prev[sessionKey], [playerId]: status }
    }));
  };

  const getPresenceStats = (sessionKey) => {
    const p = presences[sessionKey] || {};
    const vals = Object.values(p);
    return {
      confirmed: vals.filter(v => v === 'confirmed').length,
      absent: vals.filter(v => v === 'absent').length,
      pending: vals.filter(v => v === 'pending').length,
      total: vals.length
    };
  };

  const validatedSessions = useMemo(() => {
    // Une session est "validée" si au moins 3 joueurs sont confirmés (quorum 3/5)
    const result = {};
    Object.keys(presences).forEach(key => {
      const stats = getPresenceStats(key);
      result[key] = stats.confirmed >= 3;
    });
    return result;
  }, [presences]);

  // ─── NOTES HELPERS ───────────────────────────────────────────
  const handleSaveNote = (playerId) => {
    setNotes(prev => ({ ...prev, [playerId]: noteText }));
    setEditingNote(null);
    setNoteText('');
  };

  // ─── NEWS HELPERS ────────────────────────────────────────────
  const saveNews = () => {
    if (editingNews !== null) {
      setNews(prev => prev.map(n => n.id === editingNews ? { ...n, ...newsForm } : n));
      setEditingNews(null);
    } else {
      setNews(prev => [...prev, { ...newsForm, id: Date.now(), date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }]);
      setCreatingNews(false);
    }
    setNewsForm({ title: '', category: 'Classement', emoji: '⚡', color: '#00FF88', content: '' });
  };

  const deleteNews = (id) => setNews(prev => prev.filter(n => n.id !== id));

  const startEditNews = (article) => {
    setNewsForm({ title: article.title, category: article.category, emoji: article.emoji, color: article.color, content: article.content });
    setEditingNews(article.id);
    setCreatingNews(false);
  };

  // ─── TABS CONFIG ─────────────────────────────────────────────
  const tabs = [
    { id: 'overview', label: 'Vue Générale', icon: BarChart3 },
    { id: 'teams', label: isStaff ? 'Équipes' : 'Mon Équipe', icon: Users },
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'news', label: 'Actualités', icon: Newspaper },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
    { id: 'goals', label: 'Objectifs', icon: Target }
  ];

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── HEADER ── */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-red-900 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 bg-red-600 bg-opacity-20 border-2 border-red-600 border-opacity-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-black font-bebas tracking-tight">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    DASHBOARD {user.role.toUpperCase()}
                  </span>
                  {isCaptain && <span className="text-gray-500 text-sm ml-3 font-bebas">— {user.teamName}</span>}
                </h1>
                <p className="text-xs text-gray-500">{user.name} • Connecté à {user.loggedAt}</p>
              </div>
            </div>
            <button onClick={onLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30 border border-red-600 border-opacity-50 rounded-lg transition-all">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-bold">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── TABS NAV ── */}
      <div className="bg-black bg-opacity-50 border-b border-red-900 border-opacity-20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-4 font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'text-red-500 border-b-2 border-red-600' : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ════════ VUE GÉNÉRALE ════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, value: totalPlayers, label: 'Joueurs', sub: `${visibleTeams.length} équipe${visibleTeams.length > 1 ? 's' : ''}`, color: 'text-blue-500' },
                { icon: Trophy, value: `${avgWinrate}%`, label: 'Winrate Moy.', sub: 'Moyenne globale', color: 'text-yellow-500' },
                { icon: Calendar, value: upcomingSessions, label: 'Sessions', sub: 'Cette semaine', color: 'text-purple-500' },
                { icon: TrendingUp, value: totalMatches, label: 'Matchs', sub: 'Compétitions', color: 'text-green-500' }
              ].map((card, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                    <div className="text-right">
                      <div className={`text-2xl font-black font-bebas ${card.color}`}>{card.value}</div>
                      <div className="text-xs text-gray-500">{card.label}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Prochaines sessions avec présence summary */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-xl p-6">
              <h3 className="text-lg font-black font-bebas mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-red-500" /> PROCHAINES SESSIONS
              </h3>
              <div className="space-y-3">
                {visibleSessions.slice(0, 6).map((session, idx) => {
                  const sKey = `${session.teamId}-${SCHEDULE.indexOf(session)}`;
                  const stats = getPresenceStats(sKey);
                  const validated = validatedSessions[sKey];
                  return (
                    <div key={idx} className="flex items-center justify-between bg-black bg-opacity-40 rounded-lg p-3 border border-red-900 border-opacity-10">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: `${session.type.color}15`, border: `1px solid ${session.type.color}30` }}>
                          {session.type.emoji}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{session.title}</div>
                          <div className="text-xs text-gray-500">{session.dayName} • {session.time} • {session.teamName}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{stats.confirmed}/{stats.total} confirmés</div>
                          <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${stats.total ? (stats.confirmed / stats.total) * 100 : 0}%` }}></div>
                          </div>
                        </div>
                        {validated ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ════════ ÉQUIPES ════════ */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black font-bebas">{isStaff ? 'GESTION DES ÉQUIPES' : 'MON ÉQUIPE'}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {visibleTeams.map(team => (
                <div key={team.id} className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${team.color}08 0%, transparent 100%)` }}>
                  {/* Team header band */}
                  <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${team.color}, transparent)` }}></div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-black font-bebas" style={{ color: team.color }}>{team.name}</h3>
                        <p className="text-xs text-gray-500">{team.rank} • {team.motto}</p>
                      </div>
                      <div className="text-3xl opacity-40">{team.logo}</div>
                    </div>
                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-black bg-opacity-40 rounded-lg p-2 text-center">
                        <div className="text-lg font-black font-bebas" style={{ color: team.color }}>{team.globalStats.totalWins}-{team.globalStats.totalLosses}</div>
                        <div className="text-xs text-gray-500">Record</div>
                      </div>
                      <div className="bg-black bg-opacity-40 rounded-lg p-2 text-center">
                        <div className="text-lg font-black font-bebas text-green-500">{team.globalStats.winRate}%</div>
                        <div className="text-xs text-gray-500">Winrate</div>
                      </div>
                      <div className="bg-black bg-opacity-40 rounded-lg p-2 text-center">
                        <div className="text-lg font-black font-bebas text-blue-500">{team.roster.length}</div>
                        <div className="text-xs text-gray-500">Joueurs</div>
                      </div>
                    </div>
                    {/* Roster */}
                    <div className="space-y-1.5">
                      {team.roster.map((player, pIdx) => (
                        <div key={pIdx} className="flex items-center justify-between bg-black bg-opacity-30 rounded-lg px-3 py-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold w-10 text-center rounded px-1 py-0.5" style={{ background: `${team.color}20`, color: team.color }}>{player.role}</span>
                            <span className="text-sm font-bold">{player.pseudo}</span>
                            <span className="text-xs text-gray-600">{player.realName}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold" style={{ color: team.color }}>{player.kda} KDA</span>
                            <span className="text-xs text-gray-600 ml-2">{player.winRate}% WR</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Competitions */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {team.competitions.map((c, i) => (
                        <span key={i} className="text-xs bg-red-950 border border-red-900 border-opacity-30 rounded px-2 py-0.5 text-red-400">#{c.position} {c.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ PLANNING + PRÉSENCES ════════ */}
        {activeTab === 'planning' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-2xl font-black font-bebas">PLANNING & PRÉSENCES</h2>
              <div className="flex items-center space-x-2">
                {['all', 'pending', 'confirmed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setPlanningFilter(f)}
                    className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
                      planningFilter === f ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {f === 'all' ? 'Toutes' : f === 'pending' ? '⏳ En attente' : '✅ Validées'}
                  </button>
                ))}
              </div>
            </div>

            {/* Légende */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span> En attente (joueur doit se pointer)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span> Confirmé</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Absent</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Session validée (≥3 joueurs)</span>
            </div>

            {visibleSessions.map((session, idx) => {
              const globalIdx = SCHEDULE.indexOf(session);
              const sKey = `${session.teamId}-${globalIdx}`;
              const isExpanded = expandedSessions[sKey];
              const stats = getPresenceStats(sKey);
              const validated = validatedSessions[sKey];
              const sessionPresences = presences[sKey] || {};
              const team = TEAMS.find(t => t.id === session.teamId);

              // Filtrage
              if (planningFilter === 'pending' && validated) return null;
              if (planningFilter === 'confirmed' && !validated) return null;

              return (
                <div key={sKey} className={`border rounded-xl overflow-hidden transition-all ${validated ? 'border-blue-900 border-opacity-50' : 'border-red-900 border-opacity-20'} bg-gradient-to-br from-gray-900 to-black`}>
                  {/* Session Header — clickable pour expand */}
                  <button onClick={() => toggleSession(sKey)} className="w-full text-left">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${session.type.color}15`, border: `1px solid ${session.type.color}30` }}>
                          {session.type.emoji}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{session.title}</span>
                            {session.mandatory && <span className="text-xs bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 text-red-400 px-2 py-0.5 rounded-full">Obligatoire</span>}
                            {session.important && <span className="text-xs bg-yellow-600 bg-opacity-20 border border-yellow-600 border-opacity-50 text-yellow-400 px-2 py-0.5 rounded-full">Important</span>}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            <span style={{ color: team?.color }}>{session.teamName}</span>
                            <span className="mx-1.5">•</span>{session.dayName}
                            <span className="mx-1.5">•</span>{session.time}
                            <span className="mx-1.5">•</span>{session.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {/* Mini presence bar */}
                        <div className="hidden sm:block text-right">
                          <div className="text-xs text-gray-500 mb-1">{stats.confirmed}/{stats.total} confirmés</div>
                          <div className="flex space-x-0.5">
                            {Object.values(sessionPresences).map((status, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full ${status === 'confirmed' ? 'bg-green-500' : status === 'absent' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                            ))}
                          </div>
                        </div>
                        {/* Status badge */}
                        {validated
                          ? <span className="flex items-center text-xs text-blue-400 bg-blue-900 bg-opacity-30 border border-blue-800 border-opacity-40 px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3 mr-1" /> Validée</span>
                          : <span className="flex items-center text-xs text-yellow-400 bg-yellow-900 bg-opacity-20 border border-yellow-800 border-opacity-40 px-2 py-1 rounded-full"><AlertCircle className="w-3 h-3 mr-1" /> En attente</span>
                        }
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                      </div>
                    </div>
                  </button>

                  {/* Session Body — roster + présences */}
                  {isExpanded && team && (
                    <div className="border-t border-red-900 border-opacity-15 px-4 py-3">
                      {/* Description */}
                      {session.description && <p className="text-xs text-gray-500 mb-3 italic">{session.description}</p>}

                      <div className="space-y-1.5">
                        {team.roster.map((player, pIdx) => {
                          const playerId = `${session.teamId}-${pIdx}`;
                          const status = sessionPresences[playerId] || 'pending';
                          return (
                            <div key={pIdx} className="flex items-center justify-between bg-black bg-opacity-30 rounded-lg px-3 py-2">
                              <div className="flex items-center space-x-3">
                                {/* Status dot */}
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${status === 'confirmed' ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]' : status === 'absent' ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]' : 'bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.5)]'}`}></div>
                                <span className="text-xs font-bold w-8 text-center rounded" style={{ color: team.color }}>{player.role}</span>
                                <span className="text-sm font-bold">{player.pseudo}</span>
                                <span className="text-xs text-gray-600 hidden sm:inline">{player.realName}</span>
                              </div>
                              {/* Actions de présence */}
                              <div className="flex items-center space-x-1.5">
                                {/* Le joueur s'inscrit lui-même : bouton "Je suis présent" (simule l'action du joueur) */}
                                <button
                                  onClick={() => markPresence(sKey, playerId, status === 'confirmed' ? 'pending' : 'confirmed')}
                                  className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                                    status === 'confirmed'
                                      ? 'bg-green-900 bg-opacity-30 border border-green-800 border-opacity-40 text-green-400 hover:bg-opacity-50'
                                      : 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-green-600 hover:text-green-400'
                                  }`}
                                >
                                  {status === 'confirmed' ? '✓ Présent' : '+ Présence'}
                                </button>
                                {/* Le capitaine / staff valide ou marque absent */}
                                <button
                                  onClick={() => markPresence(sKey, playerId, status === 'absent' ? 'pending' : 'absent')}
                                  className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                                    status === 'absent'
                                      ? 'bg-red-900 bg-opacity-30 border border-red-800 border-opacity-40 text-red-400 hover:bg-opacity-50'
                                      : 'bg-gray-800 border border-gray-700 text-gray-500 hover:border-red-600 hover:text-red-400'
                                  }`}
                                >
                                  {status === 'absent' ? '✕ Absent' : 'Absent'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer validation */}
                      <div className="mt-3 pt-3 border-t border-red-900 border-opacity-15 flex items-center justify-between">
                        <div className="flex space-x-3 text-xs">
                          <span className="text-green-400">✓ {stats.confirmed} confirmés</span>
                          <span className="text-red-400">✕ {stats.absent} absents</span>
                          <span className="text-yellow-400">⏳ {stats.pending} en attente</span>
                        </div>
                        <div className={`text-xs font-bold px-3 py-1 rounded-full ${validated ? 'bg-blue-900 bg-opacity-40 text-blue-400 border border-blue-800 border-opacity-40' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}>
                          {validated ? '✓ Session validée (quorum ≥3)' : `Quorum: ${stats.confirmed}/3 nécessaires`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ════════ ACTUALITÉS ════════ */}
        {activeTab === 'news' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-bebas">GESTION ACTUALITÉS</h2>
              {!creatingNews && editingNews === null && (
                <button onClick={() => { setCreatingNews(true); setEditingNews(null); setNewsForm({ title: '', category: 'Classement', emoji: '⚡', color: '#00FF88', content: '' }); }} className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all">
                  <Plus className="w-4 h-4" /><span>Nouvelle Actualité</span>
                </button>
              )}
            </div>

            {/* Formulaire création / édition */}
            {(creatingNews || editingNews !== null) && (
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-gray-300">{editingNews !== null ? 'Modifier l\'actualité' : 'Nouvelle actualité'}</h3>
                  <button onClick={() => { setCreatingNews(false); setEditingNews(null); }} className="text-gray-500 hover:text-red-500"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Titre</label>
                      <input type="text" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} placeholder="Titre de l'actualité" className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Catégorie</label>
                      <select value={newsForm.category} onChange={e => setNewsForm({ ...newsForm, category: e.target.value })} className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none">
                        {['Classement', 'Match Report', 'Analyse', 'Portrait', 'Annonce', 'Résultats'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Emoji</label>
                      <select value={newsForm.emoji} onChange={e => setNewsForm({ ...newsForm, emoji: e.target.value })} className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none">
                        {['⚡', '🔥', '👁️', '⚔️', '🏆', '🎯', '📢', '🌟'].map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Couleur</label>
                      <select value={newsForm.color} onChange={e => setNewsForm({ ...newsForm, color: e.target.value })} className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-white text-sm focus:border-red-600 focus:outline-none">
                        {[{ v: '#00FF88', l: 'Vert' }, { v: '#FF6B35', l: 'Orange' }, { v: '#9D4EDD', l: 'Violet' }, { v: '#4169E1', l: 'Bleu' }, { v: '#FF1493', l: 'Rose' }, { v: '#FFD700', l: 'Or' }].map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Contenu</label>
                    <textarea value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} placeholder="Écris ton actualité ici..." rows="3" className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none resize-none" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => { setCreatingNews(false); setEditingNews(null); }} className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-all">Annuler</button>
                    <button onClick={saveNews} disabled={!newsForm.title || !newsForm.content} className="text-sm font-bold bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white px-4 py-1.5 rounded-lg transition-all">
                      {editingNews !== null ? 'Mettre à jour' : 'Publier'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste des actualités */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.map(article => (
                <div key={article.id} className="group bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-15 rounded-xl overflow-hidden hover:border-red-900 hover:border-opacity-40 transition-all">
                  {/* Color bar top */}
                  <div className="h-1" style={{ background: article.color }}></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{article.emoji}</span>
                        <span className="text-xs font-bold" style={{ color: article.color }}>{article.category}</span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEditNews(article)} className="p-1.5 hover:bg-gray-800 rounded transition-all"><Edit className="w-3.5 h-3.5 text-gray-400" /></button>
                        <button onClick={() => deleteNews(article.id)} className="p-1.5 hover:bg-red-900 hover:bg-opacity-30 rounded transition-all"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </div>
                    <h3 className="font-black font-bebas text-lg">{article.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{article.date}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{article.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ NOTES ════════ */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black font-bebas">NOTES SUR LES JOUEURS</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {visibleTeams.map(team => (
                <div key={team.id}>
                  <h3 className="text-lg font-black font-bebas mb-3" style={{ color: team.color }}>{team.name}</h3>
                  <div className="space-y-2">
                    {team.roster.map((player, pIdx) => {
                      const playerId = `${team.id}-${pIdx}`;
                      const isEditing = editingNote === playerId;
                      return (
                        <div key={pIdx} className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-15 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold w-8 text-center rounded px-1 py-0.5" style={{ background: `${team.color}20`, color: team.color }}>{player.role}</span>
                              <span className="font-bold text-sm">{player.pseudo}</span>
                              <span className="text-xs text-gray-600">{player.realName}</span>
                            </div>
                            {!isEditing ? (
                              <button onClick={() => { setEditingNote(playerId); setNoteText(notes[playerId] || ''); }} className="p-1 hover:bg-gray-800 rounded transition-all">
                                <Edit className="w-3.5 h-3.5 text-gray-500" />
                              </button>
                            ) : (
                              <div className="flex space-x-1">
                                <button onClick={() => handleSaveNote(playerId)} className="p-1 bg-green-900 bg-opacity-30 hover:bg-opacity-50 rounded transition-all"><Save className="w-3.5 h-3.5 text-green-500" /></button>
                                <button onClick={() => setEditingNote(null)} className="p-1 bg-red-900 bg-opacity-30 hover:bg-opacity-50 rounded transition-all"><X className="w-3.5 h-3.5 text-red-500" /></button>
                              </div>
                            )}
                          </div>
                          {isEditing ? (
                            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Ajouter une note..." className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none resize-none" rows="2" />
                          ) : (
                            <p className="text-xs text-gray-400 italic">{notes[playerId] || 'Aucune note...'}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════ OBJECTIFS ════════ */}
        {activeTab === 'goals' && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black font-bebas">OBJECTIFS</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {visibleTeams.map(team => {
                const totalGames = team.globalStats.totalWins + team.globalStats.totalLosses;
                return (
                  <div key={team.id} className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-xl p-5" style={{ background: `linear-gradient(135deg, ${team.color}08 0%, transparent 100%)` }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-black font-bebas" style={{ color: team.color }}>{team.name}</h3>
                      <span className="text-2xl opacity-30">{team.logo}</span>
                    </div>
                    <div className="space-y-4">
                      {/* Winrate */}
                      <div className="bg-black bg-opacity-40 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-gray-400">🎯 Winrate cible</span>
                          <span className="text-xs text-gray-600">{team.globalStats.winRate}% / 60%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((team.globalStats.winRate / 60) * 100, 100)}%`, backgroundColor: team.globalStats.winRate >= 60 ? '#22c55e' : team.color }}></div>
                        </div>
                        {team.globalStats.winRate >= 60 && <p className="text-xs text-green-500 mt-1">✓ Objectif atteint !</p>}
                      </div>
                      {/* Matchs */}
                      <div className="bg-black bg-opacity-40 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-gray-400">⚔️ Matchs joués</span>
                          <span className="text-xs text-gray-600">{totalGames} / 50</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((totalGames / 50) * 100, 100)}%`, backgroundColor: team.color }}></div>
                        </div>
                      </div>
                      {/* Position */}
                      <div className="bg-black bg-opacity-40 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-400">🏆 Position</span>
                          <span className="text-sm font-black font-bebas" style={{ color: team.color }}>#{team.competitions[0].position} {team.competitions[0].name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <style>{`
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
      `}</style>
    </div>
  );
}

export default Dashboard;
