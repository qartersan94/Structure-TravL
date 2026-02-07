import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Calendar, TrendingUp, Users, Settings, Trophy, Target, Activity, Crown, Shield, Gamepad2, BarChart3, Clock, Edit } from 'lucide-react';
import { TEAMS } from '../data/teamsData';

const getPlayers = () => {
  const stored = localStorage.getItem('travl_players');
  return stored ? JSON.parse(stored) : [];
};

const savePlayers = (players) => {
  localStorage.setItem('travl_players', JSON.stringify(players));
  window.dispatchEvent(new Event('storage'));
};

const getSessions = () => {
  const stored = localStorage.getItem('travl_sessions');
  return stored ? JSON.parse(stored) : [];
};

const saveSessions = (sessions) => {
  localStorage.setItem('travl_sessions', JSON.stringify(sessions));
};

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [players, setPlayers] = useState(getPlayers());
  const [selectedTeam, setSelectedTeam] = useState('flux');
  const [sessions, setSessions] = useState(getSessions());
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    realName: '',
    role: 'Top',
    rank: '',
    riotId: '',
    twitch: ''
  });
  const [planning, setPlanning] = useState([]);
  const [availability, setAvailability] = useState([]);

  // Charger planning et disponibilités
  useEffect(() => {
    const storedPlanning = localStorage.getItem(`planning_${user.username}`);
    const storedAvailability = localStorage.getItem(`availability_${user.username}`);
    if (storedPlanning) setPlanning(JSON.parse(storedPlanning));
    if (storedAvailability) setAvailability(JSON.parse(storedAvailability));
  }, [user.username]);

  const savePlanning = (newPlanning) => {
    localStorage.setItem(`planning_${user.username}`, JSON.stringify(newPlanning));
    setPlanning(newPlanning);
  };

  const saveAvailability = (newAvailability) => {
    localStorage.setItem(`availability_${user.username}`, JSON.stringify(newAvailability));
    setAvailability(newAvailability);
  };

  const addPlayer = () => {
    if (!newPlayer.name) return;
    const player = {
      id: Date.now(),
      ...newPlayer,
      teamId: selectedTeam,
      kda: 0,
      winRate: 0,
      gamesPlayed: 0,
      status: 'offline'
    };
    const updated = [...players, player];
    setPlayers(updated);
    savePlayers(updated);
    setNewPlayer({ name: '', realName: '', role: 'Top', rank: '', riotId: '', twitch: '' });
  };

  const removePlayer = (playerId) => {
    const updated = players.filter(p => p.id !== playerId);
    setPlayers(updated);
    savePlayers(updated);
  };

  const getTeamPlayers = (teamId) => players.filter(p => p.teamId === teamId);

  const addSession = () => {
    const newSession = {
      id: Date.now(),
      title: 'Nouvelle session',
      team: selectedTeam,
      date: '',
      startTime: '18:00',
      endTime: '20:00',
      type: 'Training',
      createdBy: user.username
    };
    const updated = [...sessions, newSession];
    setSessions(updated);
    saveSessions(updated);
  };

  const removeSession = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    saveSessions(updated);
  };

  const addPlanningSlot = () => {
    const newSlot = {
      id: Date.now(),
      day: 'Lundi',
      startTime: '18:00',
      endTime: '20:00',
      activity: 'Training',
      notes: ''
    };
    savePlanning([...planning, newSlot]);
  };

  const removePlanningSlot = (id) => {
    savePlanning(planning.filter(slot => slot.id !== id));
  };

  const updatePlanningSlot = (id, field, value) => {
    const updated = planning.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    );
    savePlanning(updated);
  };

  const toggleAvailability = (day) => {
    const existing = availability.find(a => a.day === day);
    if (existing) {
      saveAvailability(availability.filter(a => a.day !== day));
    } else {
      saveAvailability([...availability, { day, available: true }]);
    }
  };

  const teams = [
    { id: 'flux', name: 'FLUX', color: '#ff9966' },
    { id: 'mymetic', name: 'MymétiC', color: '#cccccc' },
    { id: 'froznlegion', name: "Froz'nLégion", color: '#e8e8e8' },
    { id: 'mount-x', name: 'MOUNT X', color: '#33ff99' },
    { id: 'visionary', name: 'VISIONARY', color: '#bb99ff' },
    { id: 'team', name: 'TEAM', color: '#ffdd66' },
    { id: 'legendary', name: 'LEGENDARY', color: '#66b3ff' }
  ];

  // Déterminer les tabs selon le rôle
  const getTabs = () => {
    if (user.role === 'president') {
      return [
        { id: 'panel', label: 'Panel Président', icon: Crown },
        { id: 'overview', label: 'Vue Globale', icon: BarChart3 },
        { id: 'roster', label: 'Gestion Roster', icon: Users },
        { id: 'sessions', label: 'Sessions', icon: Calendar },
        { id: 'tools', label: 'Outils', icon: Settings }
      ];
    }
    if (user.role === 'manager' || user.role === 'coach') {
      return [
        { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
        { id: 'roster', label: 'Gestion Roster', icon: Users },
        { id: 'sessions', label: 'Organiser Sessions', icon: Calendar },
        { id: 'planning', label: 'Planning', icon: Clock }
      ];
    }
    if (user.role === 'captain') {
      return [
        { id: 'roster', label: 'Mon Équipe', icon: Shield },
        { id: 'planning', label: 'Planning', icon: Calendar },
        { id: 'stats', label: 'Statistiques', icon: TrendingUp }
      ];
    }
    return [
      { id: 'planning', label: 'Mon Planning', icon: Calendar },
      { id: 'availability', label: 'Mes Disponibilités', icon: Clock },
      { id: 'mystats', label: 'Mes Stats', icon: Trophy }
    ];
  };

  const tabs = getTabs();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/20 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="text-xl font-black">TL</span>
              </div>
              <div>
                <h1 className="text-2xl font-black font-bebas flex items-center gap-2">
                  DASHBOARD
                  {user.role === 'president' && <Crown className="w-5 h-5 text-yellow-400" />}
                  {user.role === 'manager' && <Shield className="w-5 h-5 text-blue-400" />}
                  {user.role === 'captain' && <Target className="w-5 h-5 text-purple-400" />}
                </h1>
                <p className="text-xs text-gray-500">
                  {user.role === 'president' ? '👑 Président' :
                   user.role === 'manager' ? '🎯 Manager' :
                   user.role === 'coach' ? '📋 Coach' :
                   user.role === 'captain' ? '⚔️ Capitaine' : '🎮 Joueur'} • {user.username}
                </p>
              </div>
            </div>
            <button onClick={onLogout}
              className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all">
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* PANEL PRÉSIDENT */}
        {activeTab === 'panel' && user.role === 'president' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-600/20 to-black border border-yellow-500/30 rounded-2xl p-6">
              <h2 className="text-2xl font-black text-yellow-400 mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6" />
                PANEL PRÉSIDENT - CONTRÔLE TOTAL
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 border border-white/10 rounded-xl p-4 hover:border-red-500/50 transition-all cursor-pointer">
                  <Users className="w-8 h-8 text-red-400 mb-2" />
                  <h3 className="font-bold text-white mb-1">Gestion Globale Roster</h3>
                  <p className="text-xs text-gray-400">{players.length} joueurs actifs</p>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-xl p-4 hover:border-green-500/50 transition-all cursor-pointer">
                  <Calendar className="w-8 h-8 text-green-400 mb-2" />
                  <h3 className="font-bold text-white mb-1">Sessions & Planning</h3>
                  <p className="text-xs text-gray-400">{sessions.length} sessions planifiées</p>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition-all cursor-pointer">
                  <Settings className="w-8 h-8 text-blue-400 mb-2" />
                  <h3 className="font-bold text-white mb-1">Outils & Config</h3>
                  <p className="text-xs text-gray-400">TLineup, Mapper...</p>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Accès Rapide</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => setActiveTab('overview')}
                    className="px-4 py-3 bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-lg text-blue-400 font-semibold hover:border-blue-500/60 transition-all">
                    📊 Vue Globale
                  </button>
                  <button onClick={() => setActiveTab('roster')}
                    className="px-4 py-3 bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/30 rounded-lg text-red-400 font-semibold hover:border-red-500/60 transition-all">
                    👥 Roster
                  </button>
                  <button onClick={() => setActiveTab('sessions')}
                    className="px-4 py-3 bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30 rounded-lg text-green-400 font-semibold hover:border-green-500/60 transition-all">
                    📅 Sessions
                  </button>
                  <button onClick={() => setActiveTab('tools')}
                    className="px-4 py-3 bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-purple-500/30 rounded-lg text-purple-400 font-semibold hover:border-purple-500/60 transition-all">
                    🛠️ Outils
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OVERVIEW */}
        {activeTab === 'overview' && (user.role === 'president' || user.role === 'manager' || user.role === 'coach') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-600/20 to-black border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-blue-400" />
                  <span className="text-3xl font-black text-blue-400">{players.length}</span>
                </div>
                <p className="text-sm text-gray-400">Joueurs actifs</p>
              </div>

              <div className="bg-gradient-to-br from-green-600/20 to-black border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-8 h-8 text-green-400" />
                  <span className="text-3xl font-black text-green-400">7</span>
                </div>
                <p className="text-sm text-gray-400">Équipes</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-black border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-purple-400" />
                  <span className="text-3xl font-black text-purple-400">5</span>
                </div>
                <p className="text-sm text-gray-400">Compétitions</p>
              </div>

              <div className="bg-gradient-to-br from-red-600/20 to-black border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-red-400" />
                  <span className="text-3xl font-black text-red-400">61%</span>
                </div>
                <p className="text-sm text-gray-400">Winrate Global</p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">État des équipes</h3>
              <div className="space-y-3">
                {teams.map(team => {
                  const teamPlayers = getTeamPlayers(team.id);
                  return (
                    <div key={team.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ background: team.color }}></div>
                        <span className="font-semibold text-white">{team.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{teamPlayers.length}/5 joueurs</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          teamPlayers.length === 5 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {teamPlayers.length === 5 ? 'Complet' : 'Incomplet'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ROSTER */}
        {activeTab === 'roster' && (user.role === 'president' || user.role === 'manager' || user.role === 'coach' || user.role === 'captain') && (
          <div className="space-y-6">
            {(user.role === 'president' || user.role === 'manager' || user.role === 'coach') && (
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Sélectionner une équipe</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {teams.map(team => (
                    <button key={team.id}
                      onClick={() => setSelectedTeam(team.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        selectedTeam === team.id ? 'border-2 scale-105' : 'border border-white/10 hover:border-white/30'
                      }`}
                      style={{
                        borderColor: selectedTeam === team.id ? team.color : undefined,
                        background: selectedTeam === team.id ? `${team.color}15` : 'rgba(255,255,255,0.05)'
                      }}>
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: team.color }}></div>
                        <span className="text-xs font-bold text-white">{team.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-red-600/10 to-black border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un joueur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Pseudo in-game *" value={newPlayer.name}
                  onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none" />
                <input type="text" placeholder="Nom réel" value={newPlayer.realName}
                  onChange={(e) => setNewPlayer({...newPlayer, realName: e.target.value})}
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none" />
                <select value={newPlayer.role} onChange={(e) => setNewPlayer({...newPlayer, role: e.target.value})}
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none">
                  <option>Top</option>
                  <option>Jungle</option>
                  <option>Mid</option>
                  <option>ADC</option>
                  <option>Support</option>
                </select>
                <input type="text" placeholder="Rang" value={newPlayer.rank}
                  onChange={(e) => setNewPlayer({...newPlayer, rank: e.target.value})}
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none" />
                <input type="text" placeholder="Riot ID" value={newPlayer.riotId}
                  onChange={(e) => setNewPlayer({...newPlayer, riotId: e.target.value})}
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none" />
                <input type="text" placeholder="Twitch" value={newPlayer.twitch}
                  onChange={(e) => setNewPlayer({...newPlayer, twitch: e.target.value})}
                  className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none" />
              </div>
              <button onClick={addPlayer}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold hover:scale-105 transition-all">
                Ajouter le joueur
              </button>
            </div>

            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Roster {teams.find(t => t.id === selectedTeam)?.name}
              </h3>
              <div className="space-y-3">
                {getTeamPlayers(selectedTeam).map(player => (
                  <div key={player.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-bold text-lg">
                        {player.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white">{player.name}</p>
                        <p className="text-sm text-gray-400">{player.role} • {player.rank || 'Non défini'}</p>
                      </div>
                    </div>
                    <button onClick={() => removePlayer(player.id)}
                      className="p-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-600/30 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {getTeamPlayers(selectedTeam).length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun joueur dans cette équipe</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SESSIONS */}
        {activeTab === 'sessions' && (user.role === 'president' || user.role === 'manager' || user.role === 'coach') && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-600/10 to-black border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Organiser Sessions
                </h3>
                <button onClick={addSession}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-semibold hover:scale-105 transition-all">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Nouvelle Session
                </button>
              </div>

              <div className="space-y-3">
                {sessions.map(session => (
                  <div key={session.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <input type="text" defaultValue={session.title}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white font-bold outline-none flex-1 mr-4" />
                      <button onClick={() => removeSession(session.id)}
                        className="p-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      <select className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none">
                        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                      <input type="date"
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none" />
                      <input type="time" defaultValue={session.startTime}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none" />
                      <input type="time" defaultValue={session.endTime}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none" />
                      <select defaultValue={session.type}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none">
                        <option>Training</option>
                        <option>Match</option>
                        <option>VOD Review</option>
                        <option>Scrims</option>
                        <option>Bootcamp</option>
                      </select>
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucune session planifiée</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PLANNING */}
        {activeTab === 'planning' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600/10 to-black border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Mon Planning Semaine
                </h3>
                <button onClick={addPlanningSlot}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold hover:scale-105 transition-all">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Ajouter
                </button>
              </div>

              <div className="space-y-3">
                {planning.map(slot => (
                  <div key={slot.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                      <select value={slot.day}
                        onChange={(e) => updatePlanningSlot(slot.id, 'day', e.target.value)}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none">
                        <option>Lundi</option>
                        <option>Mardi</option>
                        <option>Mercredi</option>
                        <option>Jeudi</option>
                        <option>Vendredi</option>
                        <option>Samedi</option>
                        <option>Dimanche</option>
                      </select>
                      <input type="time" value={slot.startTime}
                        onChange={(e) => updatePlanningSlot(slot.id, 'startTime', e.target.value)}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none" />
                      <input type="time" value={slot.endTime}
                        onChange={(e) => updatePlanningSlot(slot.id, 'endTime', e.target.value)}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none" />
                      <select value={slot.activity}
                        onChange={(e) => updatePlanningSlot(slot.id, 'activity', e.target.value)}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none">
                        <option>Training</option>
                        <option>Match</option>
                        <option>VOD Review</option>
                        <option>Solo Queue</option>
                        <option>Bootcamp</option>
                      </select>
                      <input type="text" placeholder="Notes..." value={slot.notes}
                        onChange={(e) => updatePlanningSlot(slot.id, 'notes', e.target.value)}
                        className="px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none" />
                      <button onClick={() => removePlanningSlot(slot.id)}
                        className="p-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {planning.length === 0 && (
                  <p className="text-center text-gray-500 py-8">Aucun créneau planifié</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DISPONIBILITÉS - Joueur */}
        {activeTab === 'availability' && user.role === 'player' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-600/10 to-black border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Mes Disponibilités
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => (
                  <button key={day}
                    onClick={() => toggleAvailability(day)}
                    className={`p-4 rounded-xl border transition-all ${
                      availability.some(a => a.day === day)
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                    }`}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {availability.some(a => a.day === day) ? '✓' : '○'}
                      </div>
                      <span className="text-xs font-bold">{day}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <p className="text-sm text-gray-400 mt-4 text-center">
                Click sur les jours où tu es disponible
              </p>
            </div>
          </div>
        )}

        {/* MES STATS - Joueur */}
        {activeTab === 'mystats' && user.role === 'player' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-red-600/20 to-black border border-red-500/30 rounded-xl p-6 text-center">
                <Trophy className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-2">KDA</p>
                <p className="text-4xl font-black text-red-400">3.2</p>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-black border border-green-500/30 rounded-xl p-6 text-center">
                <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-2">Winrate</p>
                <p className="text-4xl font-black text-green-400">58%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-black border border-blue-500/30 rounded-xl p-6 text-center">
                <Gamepad2 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-2">Games</p>
                <p className="text-4xl font-black text-blue-400">127</p>
              </div>
            </div>
          </div>
        )}

        {/* OUTILS - Président */}
        {activeTab === 'tools' && user.role === 'president' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600/10 to-black border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Outils Structure
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all cursor-pointer">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-400" />
                    TLineup
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Créer compositions d'équipe et stratégies
                  </p>
                  <button className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all">
                    Ouvrir TLineup
                  </button>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Statistiques Avancées
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Analyse détaillée performances
                  </p>
                  <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-400 font-semibold hover:bg-blue-600/30 transition-all">
                    Voir Stats
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
