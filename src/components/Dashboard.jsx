import React, { useState } from 'react';
import {
  Users, Trophy, Calendar, TrendingUp, MessageSquare,
  LogOut, Target, Clock, CheckCircle,
  AlertCircle, BarChart3, Shield, Edit, Save, X
} from 'lucide-react';
import { TEAMS } from '../data/teamsData';
import { SCHEDULE } from '../data/scheduleData';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Role logic
  const isStaff = ['Coach', 'Manager', 'Staff'].includes(user.role);
  const isCaptain = user.role === 'Capitaine';

  const visibleTeams = isStaff ? TEAMS : TEAMS.filter(t => t.id === user.teamId);
  const visibleSessions = isStaff
    ? SCHEDULE
    : SCHEDULE.filter(s => s.teamId === user.teamId || s.teamId === null);

  // Computed stats
  const totalPlayers = visibleTeams.reduce((acc, t) => acc + t.roster.length, 0);
  const totalMatches = visibleTeams.reduce((acc, t) => acc + t.globalStats.totalWins + t.globalStats.totalLosses, 0);
  const upcomingSessions = visibleSessions.length;
  const avgWinrate = visibleTeams.length
    ? Math.round(visibleTeams.reduce((acc, t) => acc + t.globalStats.winRate, 0) / visibleTeams.length)
    : 0;

  // Notes handlers
  const handleSaveNote = (id) => {
    setNotes({ ...notes, [id]: noteText });
    setEditingNote(null);
    setNoteText('');
  };
  const handleEditNote = (id) => {
    setEditingNote(id);
    setNoteText(notes[id] || '');
  };

  const tabs = [
    { id: 'overview', label: "Vue d'ensemble", icon: BarChart3 },
    { id: 'teams', label: isStaff ? 'Équipes' : 'Mon Équipe', icon: Users },
    { id: 'schedule', label: 'Planning', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
    { id: 'goals', label: 'Objectifs', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-red-900 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 bg-opacity-20 border-2 border-red-600 border-opacity-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    DASHBOARD {user.role.toUpperCase()}
                  </span>
                </h1>
                <p className="text-sm text-gray-400">
                  {user.name}{isCaptain ? ` • ${user.teamName}` : ''}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 bg-opacity-10 hover:bg-opacity-20 border border-red-600 border-opacity-40 rounded-lg transition-all text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-bold">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== TABS NAV ===== */}
      <div className="bg-black border-b border-red-900 border-opacity-20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-4 font-bold text-sm whitespace-nowrap transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-red-500'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_8px_rgba(220,20,60,0.7)]"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ===== OVERVIEW ===== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, value: totalPlayers, label: 'Joueurs', color: 'text-blue-500', sub: isStaff ? '7 équipes' : 'Roster complet' },
                { icon: Trophy, value: `${avgWinrate}%`, label: 'Winrate Moy.', color: 'text-yellow-500', sub: isStaff ? 'Moyenne globale' : 'Performance équipe' },
                { icon: Calendar, value: upcomingSessions, label: 'Sessions', color: 'text-purple-500', sub: 'Cette semaine' },
                { icon: TrendingUp, value: totalMatches, label: 'Matchs Total', color: 'text-green-500', sub: 'Toutes compétitions' }
              ].map((s, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className={`w-7 h-7 ${s.color}`} />
                    <div className="text-right">
                      <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.value}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Prochaines sessions */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
              <h3 className="text-lg font-black mb-4 flex items-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <Clock className="w-5 h-5 mr-2 text-red-500" />
                PROCHAINES SESSIONS
              </h3>
              <div className="space-y-3">
                {visibleSessions.slice(0, 5).map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-black bg-opacity-40 rounded-xl p-4 border border-red-900 border-opacity-10 hover:border-opacity-20 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${session.type.color}25, ${session.type.color}08)`,
                          border: `1px solid ${session.type.color}30`
                        }}
                      >
                        {session.type.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{session.title}</div>
                        <div className="text-xs text-gray-500">
                          {session.dayName} • {session.time} • {session.teamName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.mandatory && (
                        <span className="bg-red-600 bg-opacity-15 border border-red-600 border-opacity-40 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                          Obligatoire
                        </span>
                      )}
                      {session.important && (
                        <span className="bg-yellow-600 bg-opacity-15 border border-yellow-600 border-opacity-40 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== TEAMS ===== */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {isStaff ? 'GESTION DES ÉQUIPES' : 'MON ÉQUIPE'}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleTeams.map(team => (
                <div
                  key={team.id}
                  className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl overflow-hidden"
                >
                  {/* Team Header band */}
                  <div className="h-2" style={{ background: `linear-gradient(90deg, ${team.color}, transparent)` }}></div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>
                          {team.name}
                        </h3>
                        <p className="text-xs text-gray-500">{team.rank} • {team.motto}</p>
                      </div>
                      <div className="text-3xl opacity-60">{team.logo}</div>
                    </div>

                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="bg-black bg-opacity-40 rounded-lg p-3 text-center">
                        <div className="text-lg font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>
                          {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                        </div>
                        <div className="text-xs text-gray-500">Record</div>
                      </div>
                      <div className="bg-black bg-opacity-40 rounded-lg p-3 text-center">
                        <div className="text-lg font-black text-green-500" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {team.globalStats.winRate}%
                        </div>
                        <div className="text-xs text-gray-500">Winrate</div>
                      </div>
                      <div className="bg-black bg-opacity-40 rounded-lg p-3 text-center">
                        <div className="text-lg font-black text-blue-500" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {team.roster.length}
                        </div>
                        <div className="text-xs text-gray-500">Joueurs</div>
                      </div>
                    </div>

                    {/* Roster */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-gray-500 tracking-wider mb-2">ROSTER</div>
                      {team.roster.map((player, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center justify-between bg-black bg-opacity-40 rounded-lg px-3 py-2.5 border border-transparent hover:border-red-900 hover:border-opacity-30 transition-all"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold shrink-0"
                              style={{
                                background: `${team.color}15`,
                                border: `1px solid ${team.color}30`,
                                color: team.color
                              }}
                            >
                              {player.role}
                            </div>
                            <div>
                              <div className="text-sm font-bold">{player.pseudo}</div>
                              <div className="text-xs text-gray-600">{player.realName}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold" style={{ color: team.color }}>{player.kda} KDA</div>
                            <div className="text-xs text-gray-500">{player.winRate}% WR</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SCHEDULE ===== */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>PLANNING DE LA SEMAINE</h2>

            <div className="space-y-3">
              {visibleSessions.map((session, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-gray-900 to-black border border-red-900 border-opacity-15 rounded-xl p-4 hover:border-opacity-30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${session.type.color}25, ${session.type.color}08)`,
                          border: `1px solid ${session.type.color}30`
                        }}
                      >
                        {session.type.emoji}
                      </div>
                      <div>
                        <div className="font-bold">{session.title}</div>
                        <div className="text-sm text-gray-500">
                          {session.dayName} • {session.time} • {session.duration} • {session.teamName}
                        </div>
                        {session.description && (
                          <div className="text-xs text-gray-600 mt-0.5">{session.description}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      {session.mandatory && (
                        <span className="bg-red-600 bg-opacity-15 border border-red-600 border-opacity-40 text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
                          Obligatoire
                        </span>
                      )}
                      {session.important && (
                        <span className="bg-yellow-600 bg-opacity-15 border border-yellow-600 border-opacity-40 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== NOTES ===== */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>NOTES SUR LES JOUEURS</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleTeams.map(team => (
                <div key={team.id}>
                  <h3
                    className="text-lg font-black mb-3 pb-2 border-b border-opacity-20"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color, borderColor: team.color }}
                  >
                    {team.name}
                  </h3>
                  <div className="space-y-2">
                    {team.roster.map((player, pIdx) => {
                      const noteId = `${team.id}-${pIdx}`;
                      const isEditing = editingNote === noteId;

                      return (
                        <div
                          key={pIdx}
                          className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-15 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold shrink-0"
                                style={{
                                  background: `${team.color}15`,
                                  border: `1px solid ${team.color}30`,
                                  color: team.color
                                }}
                              >
                                {player.role}
                              </div>
                              <div>
                                <div className="text-sm font-bold">{player.pseudo}</div>
                                <div className="text-xs text-gray-600">{player.realName}</div>
                              </div>
                            </div>

                            {!isEditing ? (
                              <button
                                onClick={() => handleEditNote(noteId)}
                                className="p-1.5 hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition-all"
                              >
                                <Edit className="w-4 h-4 text-gray-500" />
                              </button>
                            ) : (
                              <div className="flex space-x-1.5">
                                <button
                                  onClick={() => handleSaveNote(noteId)}
                                  className="p-1.5 bg-green-600 bg-opacity-15 hover:bg-opacity-25 rounded-lg transition-all"
                                >
                                  <Save className="w-4 h-4 text-green-500" />
                                </button>
                                <button
                                  onClick={() => { setEditingNote(null); setNoteText(''); }}
                                  className="p-1.5 bg-red-600 bg-opacity-15 hover:bg-opacity-25 rounded-lg transition-all"
                                >
                                  <X className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            )}
                          </div>

                          {isEditing ? (
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Ajoute une note sur ce joueur..."
                              className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-red-600 focus:outline-none resize-none"
                              rows="3"
                            />
                          ) : (
                            <p className="text-xs text-gray-500 italic">
                              {notes[noteId] || 'Aucune note pour le moment...'}
                            </p>
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

        {/* ===== GOALS ===== */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>OBJECTIFS D'ÉQUIPE</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleTeams.map(team => {
                const totalGames = team.globalStats.totalWins + team.globalStats.totalLosses;
                const winrateProgress = Math.min((team.globalStats.winRate / 60) * 100, 100);
                const gamesProgress = Math.min((totalGames / 50) * 100, 100);

                return (
                  <div
                    key={team.id}
                    className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl overflow-hidden"
                  >
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${team.color}, transparent)` }}></div>
                    <div className="p-6">
                      <h3 className="text-lg font-black mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>
                        {team.name}
                      </h3>

                      <div className="space-y-4">
                        {/* Winrate Target */}
                        <div className="bg-black bg-opacity-40 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Winrate cible</span>
                            <CheckCircle className={`w-4 h-4 ${team.globalStats.winRate >= 60 ? 'text-green-500' : 'text-yellow-500'}`} />
                          </div>
                          <div className="flex items-baseline space-x-2 mb-3">
                            <span className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>
                              {team.globalStats.winRate}%
                            </span>
                            <span className="text-xs text-gray-500">/ 60% cible</span>
                          </div>
                          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${winrateProgress}%`, backgroundColor: team.color, boxShadow: `0 0 8px ${team.color}50` }}
                            ></div>
                          </div>
                        </div>

                        {/* Matches played */}
                        <div className="bg-black bg-opacity-40 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Matchs joués</span>
                            <AlertCircle className={`w-4 h-4 ${totalGames >= 50 ? 'text-green-500' : 'text-yellow-500'}`} />
                          </div>
                          <div className="flex items-baseline space-x-2 mb-3">
                            <span className="text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>
                              {totalGames}
                            </span>
                            <span className="text-xs text-gray-500">/ 50 cible</span>
                          </div>
                          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{ width: `${gamesProgress}%`, backgroundColor: team.color, boxShadow: `0 0 8px ${team.color}50` }}
                            ></div>
                          </div>
                        </div>

                        {/* Competition Position */}
                        <div className="bg-black bg-opacity-40 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Position compétition</span>
                            <Trophy className="w-4 h-4 text-yellow-500" />
                          </div>
                          <div className="text-xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", color: team.color }}>
                            #{team.competitions[0].position} <span className="text-sm text-gray-500 font-normal" style={{ fontFamily: 'inherit' }}>{team.competitions[0].name}</span>
                          </div>
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
    </div>
  );
}

export default Dashboard;
