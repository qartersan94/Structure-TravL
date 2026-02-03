import React, { useState } from 'react';
import { 
  Users, Trophy, Calendar, TrendingUp, MessageSquare, 
  Settings, LogOut, Award, Target, Clock, CheckCircle,
  AlertCircle, BarChart3, Shield, Edit, Save, X
} from 'lucide-react';
import { TEAMS } from '../data/teamsData';
import { SCHEDULE } from '../data/scheduleData';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Filtrer les données selon le rôle
  const isStaff = ['Coach', 'Manager', 'Staff'].includes(user.role);
  const isCaptain = user.role === 'Capitaine';
  
  // Données filtrées pour les capitaines
  const userTeam = isCaptain ? TEAMS.find(t => t.id === user.teamId) : null;
  const visibleTeams = isStaff ? TEAMS : [userTeam];
  const visibleSessions = isStaff 
    ? SCHEDULE 
    : SCHEDULE.filter(s => s.teamId === user.teamId || s.teamId === null);

  // Stats globales
  const totalPlayers = visibleTeams.reduce((acc, team) => acc + team.roster.length, 0);
  const totalMatches = visibleSessions.filter(s => s.type.id === 'match').length;
  const upcomingSessions = visibleSessions.filter(s => new Date(s.date) >= new Date()).length;
  const avgWinrate = Math.floor(visibleTeams.reduce((acc, team) => acc + team.globalStats.winRate, 0) / visibleTeams.length);

  // Gestion des notes
  const handleSaveNote = (playerId) => {
    setNotes({ ...notes, [playerId]: noteText });
    setEditingNote(null);
    setNoteText('');
  };

  const handleEditNote = (playerId) => {
    setEditingNote(playerId);
    setNoteText(notes[playerId] || '');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-red-900 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 bg-opacity-20 border-2 border-red-600 border-opacity-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-black font-bebas tracking-tight">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    DASHBOARD {user.role.toUpperCase()}
                  </span>
                </h1>
                <p className="text-sm text-gray-400">
                  {user.name} {isCaptain && `• ${user.teamName}`}
                </p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30 border border-red-600 border-opacity-50 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-bold">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black bg-opacity-50 border-b border-red-900 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'teams', label: isStaff ? 'Équipes' : 'Mon Équipe', icon: Users },
              { id: 'schedule', label: 'Planning', icon: Calendar },
              { id: 'notes', label: 'Notes', icon: MessageSquare },
              { id: 'goals', label: 'Objectifs', icon: Target }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-bold transition-all ${
                  activeTab === tab.id
                    ? 'text-red-500 border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VUE D'ENSEMBLE */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div className="text-right">
                    <div className="text-3xl font-black font-bebas text-blue-500">{totalPlayers}</div>
                    <div className="text-xs text-gray-400">Joueurs</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {isStaff ? '7 équipes actives' : 'Roster complet'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <div className="text-right">
                    <div className="text-3xl font-black font-bebas text-yellow-500">{avgWinrate}%</div>
                    <div className="text-xs text-gray-400">Winrate</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {isStaff ? 'Moyenne globale' : 'Performance équipe'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-purple-500" />
                  <div className="text-right">
                    <div className="text-3xl font-black font-bebas text-purple-500">{upcomingSessions}</div>
                    <div className="text-xs text-gray-400">Sessions</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  À venir cette semaine
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div className="text-right">
                    <div className="text-3xl font-black font-bebas text-green-500">{totalMatches}</div>
                    <div className="text-xs text-gray-400">Matchs</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Compétitions officielles
                </div>
              </div>
            </div>

            {/* Prochaines sessions */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
              <h3 className="text-xl font-black font-bebas mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-500" />
                PROCHAINES SESSIONS
              </h3>
              <div className="space-y-3">
                {visibleSessions.slice(0, 5).map((session, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-4 border border-red-900 border-opacity-10"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${session.type.color}30, ${session.type.color}10)`,
                          border: `2px solid ${session.type.color}30`
                        }}
                      >
                        {session.type.emoji}
                      </div>
                      <div>
                        <div className="font-bold">{session.title}</div>
                        <div className="text-sm text-gray-400">
                          {session.dayName} • {session.time} • {session.teamName}
                        </div>
                      </div>
                    </div>
                    {session.mandatory && (
                      <span className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                        Obligatoire
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÉQUIPES */}
        {activeTab === 'teams' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black font-bebas">
              {isStaff ? 'GESTION DES ÉQUIPES' : 'MON ÉQUIPE'}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleTeams.map(team => (
                <div 
                  key={team.id}
                  className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-900 border-opacity-20 rounded-2xl p-6"
                  style={{
                    background: `linear-gradient(135deg, ${team.color}10 0%, transparent 100%)`
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-black font-bebas" style={{ color: team.color }}>
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-400">{team.rank} • {team.motto}</p>
                    </div>
                    <div className="text-4xl">{team.logo}</div>
                  </div>

                  {/* Stats équipe */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-black font-bebas" style={{ color: team.color }}>
                        {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                      </div>
                      <div className="text-xs text-gray-400">Record</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black font-bebas text-green-500">
                        {team.globalStats.winRate}%
                      </div>
                      <div className="text-xs text-gray-400">Winrate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black font-bebas text-blue-500">
                        {team.roster.length}
                      </div>
                      <div className="text-xs text-gray-400">Joueurs</div>
                    </div>
                  </div>

                  {/* Roster */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-gray-400 mb-3">ROSTER</h4>
                    {team.roster.map((player, pIdx) => (
                      <div 
                        key={pIdx}
                        className="flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                            style={{ 
                              background: `linear-gradient(135deg, ${team.color}30, ${team.color}10)`,
                              border: `2px solid ${team.color}30`,
                              color: team.color
                            }}
                          >
                            {player.role}
                          </div>
                          <div>
                            <div className="font-bold">{player.pseudo}</div>
                            <div className="text-xs text-gray-400">{player.realName}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold" style={{ color: team.color }}>
                            {player.kda} KDA
                          </div>
                          <div className="text-xs text-gray-400">
                            {player.winRate}% WR
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLANNING */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black font-bebas">PLANNING DE LA SEMAINE</h2>
            
            <div className="space-y-4">
              {visibleSessions.map((session, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${session.type.color}30, ${session.type.color}10)`,
                          border: `2px solid ${session.type.color}30`
                        }}
                      >
                        {session.type.emoji}
                      </div>
                      <div>
                        <div className="text-xl font-bold">{session.title}</div>
                        <div className="text-sm text-gray-400">
                          {session.dayName} {session.time} • {session.duration} • {session.teamName}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{session.description}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {session.mandatory && (
                        <span className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                          Obligatoire
                        </span>
                      )}
                      {session.important && (
                        <span className="bg-yellow-600 bg-opacity-20 border border-yellow-600 border-opacity-50 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
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

        {/* NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black font-bebas">NOTES SUR LES JOUEURS</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleTeams.map(team => (
                <div key={team.id}>
                  <h3 className="text-xl font-black font-bebas mb-4" style={{ color: team.color }}>
                    {team.name}
                  </h3>
                  <div className="space-y-3">
                    {team.roster.map((player, pIdx) => {
                      const playerId = `${team.id}-${pIdx}`;
                      const isEditing = editingNote === playerId;
                      
                      return (
                        <div 
                          key={pIdx}
                          className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                                style={{ 
                                  background: `linear-gradient(135deg, ${team.color}30, ${team.color}10)`,
                                  border: `2px solid ${team.color}30`,
                                  color: team.color
                                }}
                              >
                                {player.role}
                              </div>
                              <div>
                                <div className="font-bold">{player.pseudo}</div>
                                <div className="text-xs text-gray-400">{player.realName}</div>
                              </div>
                            </div>
                            
                            {!isEditing ? (
                              <button
                                onClick={() => handleEditNote(playerId)}
                                className="p-2 hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition-all"
                              >
                                <Edit className="w-4 h-4 text-gray-400" />
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleSaveNote(playerId)}
                                  className="p-2 bg-green-600 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
                                >
                                  <Save className="w-4 h-4 text-green-500" />
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingNote(null);
                                    setNoteText('');
                                  }}
                                  className="p-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
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
                              placeholder="Ajouter une note sur ce joueur..."
                              className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none resize-none"
                              rows="3"
                            />
                          ) : (
                            <div className="text-sm text-gray-400">
                              {notes[playerId] || 'Aucune note pour le moment...'}
                            </div>
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

        {/* OBJECTIFS */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black font-bebas">OBJECTIFS</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleTeams.map(team => (
                <div 
                  key={team.id}
                  className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-900 border-opacity-20 rounded-2xl p-6"
                  style={{
                    background: `linear-gradient(135deg, ${team.color}10 0%, transparent 100%)`
                  }}
                >
                  <h3 className="text-2xl font-black font-bebas mb-4" style={{ color: team.color }}>
                    {team.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-black bg-opacity-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-400">Winrate cible</span>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-black font-bebas" style={{ color: team.color }}>
                          {team.globalStats.winRate}%
                        </div>
                        <span className="text-sm text-gray-400">/ 60%</span>
                      </div>
                      <div className="h-2 bg-gray-900 rounded-full overflow-hidden mt-3">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(team.globalStats.winRate / 60) * 100}%`,
                            backgroundColor: team.color
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-black bg-opacity-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-400">Matchs joués</span>
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-black font-bebas" style={{ color: team.color }}>
                          {team.globalStats.totalWins + team.globalStats.totalLosses}
                        </div>
                        <span className="text-sm text-gray-400">/ 50</span>
                      </div>
                      <div className="h-2 bg-gray-900 rounded-full overflow-hidden mt-3">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${((team.globalStats.totalWins + team.globalStats.totalLosses) / 50) * 100}%`,
                            backgroundColor: team.color
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-black bg-opacity-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-400">Position compétition</span>
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-black font-bebas" style={{ color: team.color }}>
                        #{team.competitions[0].position} {team.competitions[0].name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
