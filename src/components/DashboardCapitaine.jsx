import React, { useState } from 'react';
import { Users, Plus, Calendar, Trophy, TrendingUp, Shield, Settings, Target, Edit2 } from 'lucide-react';
import TEAMS from '../data/teamsData';
import PlanningMensuel from './planning/PlanningMensuel';
import TLineup from './TLineup';

const DashboardCapitaine = ({ userTeamId = 'flux', userId, userName }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, planning, gestion, creation, tlineup
  const [showSessionCreator, setShowSessionCreator] = useState(false);
  const [rosterType, setRosterType] = useState('officiel'); // officiel | creation
  const [session, setSession] = useState({
    title: '',
    type: 'Training',
    date: '',
    time: '',
    duration: '',
    description: ''
  });
  const [editingPlayer, setEditingPlayer] = useState(null);

  const team = TEAMS.find(t => t.id === userTeamId) || TEAMS[0];

  // Créer une session
  const createSession = () => {
    if (!session.title || !session.date || !session.time) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newSession = {
      id: Date.now(),
      ...session,
      teamId: team.id,
      createdBy: userName,
      createdAt: new Date().toISOString()
    };

    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push(newSession);
    localStorage.setItem('sessions', JSON.stringify(sessions));

    alert('✅ Session créée !');
    setShowSessionCreator(false);
    setSession({ title: '', type: 'Training', date: '', time: '', duration: '', description: '' });
  };

  // Charger sessions de l'équipe
  const loadSessions = () => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    return sessions.filter(s => s.teamId === team.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const sessions = loadSessions();

  // Supprimer session
  const deleteSession = (sessionId) => {
    if (window.confirm('Supprimer cette session ?')) {
      const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
      const updated = sessions.filter(s => s.id !== sessionId);
      localStorage.setItem('sessions', JSON.stringify(updated));
      alert('✅ Session supprimée');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overview' 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            <Trophy className="w-5 h-5" />
            Vue d'ensemble
          </button>

          <button
            onClick={() => setActiveTab('planning')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'planning' 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            <Calendar className="w-5 h-5" />
            Planning
          </button>

          <button
            onClick={() => setActiveTab('gestion')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'gestion' 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            <Settings className="w-5 h-5" />
            Gestion Roster
          </button>

          <button
            onClick={() => setActiveTab('creation')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'creation' 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            <Plus className="w-5 h-5" />
            Création Sessions
          </button>

          <button
            onClick={() => setActiveTab('tlineup')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tlineup' 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            <Target className="w-5 h-5" />
            TLineup
          </button>
        </div>
      </div>

      {/* CONTENT */}
      
      {/* TAB 1: VUE D'ENSEMBLE */}
      {activeTab === 'overview' && (
        <>
          {/* Header Équipe */}
          <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            style={{ borderColor: `${team.color}30` }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl"
                  style={{ background: `${team.color}20`, border: `2px solid ${team.color}40` }}>
                  {team.logo}
                </div>
                <div>
                  <h2 className="text-3xl font-black" style={{ color: team.color }}>{team.name}</h2>
                  <p className="text-sm text-gray-400">Capitaine - Gestion Équipe</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setRosterType('officiel')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    rosterType === 'officiel'
                      ? 'bg-green-500/30 border-2 border-green-500 text-green-400'
                      : 'bg-white/5 border border-white/10 text-gray-500'
                  }`}>
                  🟢 Roster Officiel
                </button>
                <button
                  onClick={() => setRosterType('creation')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    rosterType === 'creation'
                      ? 'bg-orange-500/30 border-2 border-orange-500 text-orange-400'
                      : 'bg-white/5 border border-white/10 text-gray-500'
                  }`}>
                  🟠 En Création
                </button>
              </div>
            </div>

            {/* Stats Équipe */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
                <p className="text-2xl font-black" style={{ color: team.color }}>
                  {team.roster?.length || 0}/5
                </p>
                <p className="text-xs text-gray-500 mt-1">Joueurs</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
                <p className="text-2xl font-black text-green-400">{team.globalStats.totalWins}</p>
                <p className="text-xs text-gray-500 mt-1">Victoires</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
                <p className="text-2xl font-black text-red-400">{team.globalStats.totalLosses}</p>
                <p className="text-xs text-gray-500 mt-1">Défaites</p>
              </div>
              <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
                <p className="text-2xl font-black" style={{ color: team.color }}>
                  {team.globalStats.winRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Winrate</p>
              </div>
            </div>
          </div>

          {/* Roster */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Users className="w-6 h-6" style={{ color: team.color }} />
                Mon Roster
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                rosterType === 'officiel' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
              }`}>
                {rosterType === 'officiel' ? '🟢 OFFICIEL' : '🟠 EN CRÉATION'}
              </span>
            </div>
            <div className="p-6">
              {team.roster && team.roster.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {team.roster.map(player => (
                    <div key={player.id}
                      className="p-4 bg-black/30 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                          style={{ background: `${team.color}20`, color: team.color }}>
                          {player.role[0]}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm">{player.name}</p>
                          <p className="text-xs text-gray-500">{player.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold" style={{ color: team.color }}>
                          KDA {player.kda}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          player.status === 'online' ? 'bg-green-400' : 'bg-gray-700'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Aucun joueur</p>
              )}
            </div>
          </div>

          {/* Compétitions */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Compétitions
            </h3>
            <div className="space-y-3">
              {team.competitions.map((comp, i) => (
                <div key={i} className="p-4 bg-black/30 rounded-lg border-l-4"
                  style={{ borderColor: team.color }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{comp.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {comp.wins}V - {comp.losses}D • {comp.points} points
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full font-bold text-sm"
                      style={{ background: `${team.color}20`, color: team.color }}>
                      #{comp.position}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* TAB 2: PLANNING */}
      {activeTab === 'planning' && (
        <PlanningMensuel 
          userId={userId} 
          userName={userName} 
          userRole="CAPITAINE" 
        />
      )}

      {/* TAB 3: GESTION ROSTER */}
      {activeTab === 'gestion' && (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
            <Settings className="w-7 h-7 text-red-400" />
            Gestion Roster
          </h3>

          <div className="space-y-4">
            {team.roster && team.roster.length > 0 ? (
              team.roster.map(player => (
                <div key={player.id}
                  className="p-4 bg-black/30 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold"
                        style={{ background: `${team.color}20`, color: team.color }}>
                        {player.role[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white">{player.name}</p>
                        <p className="text-sm text-gray-400">{player.role} • KDA {player.kda}</p>
                        <div className={`inline-flex items-center gap-2 mt-1 px-2 py-1 rounded text-xs font-semibold ${
                          player.status === 'online' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            player.status === 'online' ? 'bg-green-400' : 'bg-gray-600'
                          }`}></div>
                          {player.status === 'online' ? 'En ligne' : 'Hors ligne'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingPlayer(editingPlayer === player.id ? null : player.id)}
                      className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 font-semibold hover:bg-blue-500/30 transition-all flex items-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      Modifier
                    </button>
                  </div>

                  {editingPlayer === player.id && (
                    <div className="mt-4 p-4 bg-black/50 rounded-lg space-y-3">
                      <p className="text-sm font-semibold text-white mb-2">Modifier le joueur :</p>
                      <input
                        type="text"
                        placeholder="Nom du joueur"
                        defaultValue={player.name}
                        className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50"
                      />
                      <select
                        defaultValue={player.role}
                        className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50">
                        <option value="Top">Top</option>
                        <option value="Jungle">Jungle</option>
                        <option value="Mid">Mid</option>
                        <option value="ADC">ADC</option>
                        <option value="Support">Support</option>
                      </select>
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 font-semibold hover:bg-green-500/30 transition-all">
                          ✅ Sauvegarder
                        </button>
                        <button
                          onClick={() => setEditingPlayer(null)}
                          className="flex-1 px-4 py-2 bg-gray-500/20 border border-gray-500/50 rounded-lg text-gray-400 font-semibold hover:bg-gray-500/30 transition-all">
                          ❌ Annuler
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-12">Aucun joueur dans le roster</p>
            )}
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-bold hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Ajouter un joueur
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: CRÉATION SESSIONS */}
      {activeTab === 'creation' && (
        <div className="space-y-6">
          {/* Sessions existantes */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <Calendar className="w-7 h-7 text-red-400" />
                Mes Sessions ({sessions.length})
              </h3>
              <button
                onClick={() => setShowSessionCreator(!showSessionCreator)}
                className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle Session
              </button>
            </div>

            {sessions.length > 0 ? (
              <div className="space-y-3">
                {sessions.map(s => (
                  <div key={s.id} className="p-4 bg-black/30 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            s.type === 'Training' ? 'bg-blue-500/20 text-blue-400' :
                            s.type === 'Tournoi' ? 'bg-purple-500/20 text-purple-400' :
                            s.type === 'Cup' ? 'bg-yellow-500/20 text-yellow-400' :
                            s.type === 'Ligue' ? 'bg-green-500/20 text-green-400' :
                            'bg-pink-500/20 text-pink-400'
                          }`}>
                            {s.type === 'Training' ? '🎯' : s.type === 'Tournoi' ? '🏆' : s.type === 'Cup' ? '🏅' : s.type === 'Ligue' ? '⚔️' : '✨'}
                            {' '}{s.type}
                          </span>
                          <p className="font-bold text-white">{s.title}</p>
                        </div>
                        <p className="text-sm text-gray-400">
                          📅 {s.date} à {s.time} • ⏱️ {s.duration}
                        </p>
                        {s.description && (
                          <p className="text-xs text-gray-500 mt-2">{s.description}</p>
                        )}
                        <p className="text-xs text-gray-600 mt-2">Créé par {s.createdBy}</p>
                      </div>
                      <button
                        onClick={() => deleteSession(s.id)}
                        className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-500/30 transition-all text-sm">
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">Aucune session créée</p>
            )}
          </div>

          {/* Créateur de session */}
          {showSessionCreator && (
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-black text-white mb-4">Créer une Session</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre de la session *"
                  value={session.title}
                  onChange={(e) => setSession({...session, title: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50"
                />

                <select
                  value={session.type}
                  onChange={(e) => setSession({...session, type: e.target.value})}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50">
                  <option value="Training">🎯 Entraînement</option>
                  <option value="Tournoi">🏆 Tournoi</option>
                  <option value="Cup">🏅 Coupe</option>
                  <option value="Ligue">⚔️ Match de Ligue</option>
                  <option value="Showmatch">✨ Showmatch</option>
                </select>

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="date"
                    value={session.date}
                    onChange={(e) => setSession({...session, date: e.target.value})}
                    className="px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50"
                  />
                  <input
                    type="time"
                    value={session.time}
                    onChange={(e) => setSession({...session, time: e.target.value})}
                    className="px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50"
                  />
                  <input
                    type="text"
                    placeholder="Durée (ex: 2h30)"
                    value={session.duration}
                    onChange={(e) => setSession({...session, duration: e.target.value})}
                    className="px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50"
                  />
                </div>

                <textarea
                  placeholder="Description (optionnelle)"
                  value={session.description}
                  onChange={(e) => setSession({...session, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50 resize-none"
                ></textarea>

                <button
                  onClick={createSession}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold hover:scale-105 transition-all"
                  style={{ boxShadow: '0 0 20px rgba(220,20,60,0.3)' }}>
                  Créer la Session
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: TLINEUP */}
      {activeTab === 'tlineup' && (
        <TLineup teamId={userTeamId} />
      )}
    </div>
  );
};

export default DashboardCapitaine;
