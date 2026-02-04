import React, { useState } from 'react';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sessionStatus, setSessionStatus] = useState({});

  const currentUser = {
    name: user?.name || 'Coach',
    role: user?.role || 'staff',
    teamId: user?.teamId || 1,
    teamName: 'Structure TravL'
  };

  // Mock sessions data
  const SESSIONS = [
    { 
      id: 1, 
      type: 'training', 
      title: 'Scrims vs équipe externe', 
      day: 'Lundi', 
      time: '18:00',
      team: 'Mount X',
      details: 'Discord - Salon Mount X',
      roles: 'Top, Jungle, Mid, ADC, Support',
      coach: 'Staff TravL',
      mandatory: true
    },
    { 
      id: 2, 
      type: 'match', 
      title: 'VOD Review - Dernier match', 
      day: 'Lundi', 
      time: '20:00',
      team: 'Flux',
      details: 'Discord - Salon Flux',
      roles: 'Toute l\'équipe',
      coach: 'Coach Flux',
      mandatory: false
    },
    { 
      id: 3, 
      type: 'training', 
      title: 'Solo Queue collectif', 
      day: 'Lundi', 
      time: '21:00',
      team: 'VisionaRY',
      details: 'EUW Solo Queue',
      roles: 'Tout le roster',
      coach: 'Coach VisionaRY',
      mandatory: true
    },
    { 
      id: 4, 
      type: 'match', 
      title: 'Match officiel', 
      day: 'Mardi', 
      time: '19:00',
      team: 'Nexus',
      details: 'Tournament Realm',
      roles: 'Titulaires + Remplaçants',
      coach: 'Nexus Tour',
      competition: 'vs Flux',
      mandatory: true
    },
    { 
      id: 5, 
      type: 'training', 
      title: 'Préparation tactique', 
      day: 'Mardi', 
      time: '18:00',
      team: 'Froz\'nLégion',
      details: 'Discord - Salon Froz\'nLégion',
      roles: 'Top, Jungle, Mid, ADC, Support',
      coach: 'Coach FRZ',
      mandatory: true
    }
  ];

  const handleValidatePresence = (sessionId, status) => {
    setSessionStatus(prev => ({ ...prev, [sessionId]: status }));
  };

  const confirmedCount = Object.values(sessionStatus).filter(s => s === 'confirmed').length;
  const totalSessions = SESSIONS.length;

  // Type colors
  const getTypeColor = (type) => {
    switch(type) {
      case 'training': return '#16a34a'; // vert
      case 'match': return '#dc2626'; // rouge
      case 'review': return '#9333ea'; // violet
      default: return '#6366f1';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'training': return '🎯';
      case 'match': return '⚔️';
      case 'review': return '📊';
      default: return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900/50 to-black/50 border-r border-red-900/20 backdrop-blur-xl fixed h-screen">
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-lg">🛡️</span>
            </div>
            <h2 className="font-bebas text-xl tracking-wider text-red-500">TRAVL</h2>
          </div>
        </div>

        <nav className="p-4">
          {[
            { id: 'overview', icon: '📊', label: 'Vue d\'ensemble' },
            { id: 'planning', icon: '📅', label: 'Planning' },
            { id: 'equipes', icon: '👥', label: 'Équipes' },
            { id: 'actualites', icon: '📰', label: 'Actualités' },
            { id: 'notes', icon: '📝', label: 'Notes' },
            { id: 'objectifs', icon: '🎯', label: 'Objectifs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                activeTab === tab.id
                  ? 'bg-red-600/20 text-red-400 font-semibold'
                  : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
              }`}>
              <span>{tab.icon}</span>
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
          <div className="flex items-center gap-2 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center text-xs">
              {currentUser.name[0]}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{currentUser.name}</div>
              <div className="text-xs text-gray-500">
                {currentUser.role === 'staff' ? 'Staff' : currentUser.role === 'captain' ? 'Capitaine' : 'Coach'}
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 py-2 rounded-lg text-sm font-semibold transition-all">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bebas tracking-wider mb-1">
            DASHBOARD {currentUser.role === 'staff' ? 'MANAGER' : 'STAFF'}
          </h1>
          <p className="text-sm text-gray-500">Manager Structure</p>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/10 border border-blue-800/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bebas text-blue-400">35</div>
                    <div className="text-xs text-gray-400">Joueurs</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">7 équipes actives</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-950/10 border border-yellow-800/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bebas text-yellow-400">61%</div>
                    <div className="text-xs text-gray-400">Winrate</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Moyenne globale</div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-purple-950/10 border border-purple-800/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bebas text-purple-400">21</div>
                    <div className="text-xs text-gray-400">Sessions</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">À venir cette semaine</div>
              </div>

              <div className="bg-gradient-to-br from-green-900/20 to-green-950/10 border border-green-800/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bebas text-green-400">5</div>
                    <div className="text-xs text-gray-400">Matchs</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Compétitions officielles</div>
              </div>
            </div>

            {/* Prochaines Sessions */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bebas tracking-wider flex items-center gap-2">
                  <span className="text-red-500">⏰</span> PROCHAINES SESSIONS
                </h2>
                <button className="text-sm text-red-400 hover:text-red-300 font-semibold">
                  Créer une session
                </button>
              </div>

              <div className="space-y-4">
                {SESSIONS.slice(0, 4).map(session => (
                  <div 
                    key={session.id}
                    className="bg-gradient-to-r from-gray-900/50 to-gray-950/30 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:border-gray-700/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: getTypeColor(session.type) + '20', border: `2px solid ${getTypeColor(session.type)}40` }}>
                        <span className="text-2xl">{getTypeIcon(session.type)}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span 
                                className="text-xs font-bold px-2 py-0.5 rounded"
                                style={{ backgroundColor: getTypeColor(session.type) + '30', color: getTypeColor(session.type) }}>
                                {session.type === 'training' ? 'Training' : session.type === 'match' ? 'Match' : 'Review'}
                              </span>
                              {session.mandatory && (
                                <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded font-semibold">
                                  Obligatoire
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-white">{session.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                              <span>📅 {session.day} • 🕐 {session.time}</span>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-400 rounded-lg text-sm font-semibold transition-all">
                            Obligatoire
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">🎯 Discord</div>
                            <div className="text-gray-300">{session.details}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">👥 {session.roles}</div>
                            <div className="text-gray-300">Coach: {session.coach}</div>
                          </div>
                          {session.competition && (
                            <div>
                              <div className="text-xs text-gray-500 mb-1">⚔️ {session.competition}</div>
                              <div className="text-gray-300">{session.competition}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PLANNING TAB - AVEC VALIDATION PRÉSENCES */}
        {activeTab === 'planning' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bebas tracking-wider">PLANNING</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {confirmedCount} / {totalSessions} sessions validées
                </p>
              </div>
            </div>

            {/* Sessions par jour */}
            {['Lundi', 'Mardi'].map(day => {
              const daySessions = SESSIONS.filter(s => s.day === day);
              return (
                <div key={day} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-red-600/20 border border-red-600/40 rounded-lg">
                      <span className="text-sm font-bebas text-red-400">{day}</span>
                    </div>
                    <div className="text-sm text-gray-500">{daySessions.length} sessions</div>
                  </div>

                  <div className="space-y-3">
                    {daySessions.map(session => {
                      const status = sessionStatus[session.id] || 'pending';
                      return (
                        <div 
                          key={session.id}
                          className="bg-gradient-to-r from-gray-900/50 to-gray-950/30 border border-gray-800/50 rounded-xl p-5 backdrop-blur-sm">
                          
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div 
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: getTypeColor(session.type) + '20' }}>
                                <span className="text-xl">{getTypeIcon(session.type)}</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold mb-1">{session.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                  <span>🕐 {session.time}</span>
                                  <span>•</span>
                                  <span>{session.team}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* BOUTONS VALIDATION */}
                          <div className="grid grid-cols-3 gap-3 mt-4">
                            <button
                              onClick={() => handleValidatePresence(session.id, 'confirmed')}
                              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
                                status === 'confirmed'
                                  ? 'bg-green-600/30 border-2 border-green-500 text-green-400 scale-105'
                                  : 'bg-green-600/10 border border-green-600/30 text-green-600 hover:bg-green-600/20'
                              }`}>
                              ✓ Confirmé
                            </button>

                            <button
                              onClick={() => handleValidatePresence(session.id, 'absent')}
                              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
                                status === 'absent'
                                  ? 'bg-red-600/30 border-2 border-red-500 text-red-400 scale-105'
                                  : 'bg-red-600/10 border border-red-600/30 text-red-600 hover:bg-red-600/20'
                              }`}>
                              ✗ Absent
                            </button>

                            <button
                              onClick={() => handleValidatePresence(session.id, 'pending')}
                              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${
                                status === 'pending'
                                  ? 'bg-yellow-600/30 border-2 border-yellow-500 text-yellow-400 scale-105'
                                  : 'bg-yellow-600/10 border border-yellow-600/30 text-yellow-600 hover:bg-yellow-600/20'
                              }`}>
                              ⏳ En attente
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AUTRES TABS (placeholder) */}
        {activeTab !== 'overview' && activeTab !== 'planning' && (
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-950/30 border border-gray-800/50 rounded-xl p-8 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bebas tracking-wider mb-2">
              {activeTab === 'equipes' && 'ÉQUIPES'}
              {activeTab === 'actualites' && 'ACTUALITÉS'}
              {activeTab === 'notes' && 'NOTES'}
              {activeTab === 'objectifs' && 'OBJECTIFS'}
            </h2>
            <p className="text-gray-500">Section à venir...</p>
          </div>
        )}
      </main>
    </div>
  );
}
