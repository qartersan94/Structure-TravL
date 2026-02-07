import React, { useState } from 'react';
import { Plus, X, Users, Trophy, Clock, Calendar as CalendarIcon, Save } from 'lucide-react';

const SessionCreator = ({ teamId, teamName, teamPlayers, onSessionCreated }) => {
  const [session, setSession] = useState({
    title: '',
    players: [],
    subs: [],
    type: 'Training',
    leagueType: '',
    duration: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [showSubSelector, setShowSubSelector] = useState(false);

  const sessionTypes = [
    { value: 'Training', label: 'Entraînement', icon: '🎯', color: 'blue' },
    { value: 'Tournoi', label: 'Tournoi', icon: '🏆', color: 'yellow' },
    { value: 'Cup', label: 'Coupe', icon: '🏅', color: 'purple' },
    { value: 'Ligue', label: 'Match de Ligue', icon: '⚔️', color: 'red' },
    { value: 'Showmatch', label: 'Showmatch', icon: '✨', color: 'green' }
  ];

  const leagueTypes = [
    'Prime League',
    'LFL Division 2',
    'Coupe de France',
    'Tournoi Local',
    'Autre'
  ];

  // Toggle joueur
  const togglePlayer = (player) => {
    const isSelected = session.players.find(p => p.id === player.id);
    
    if (isSelected) {
      setSession({
        ...session,
        players: session.players.filter(p => p.id !== player.id)
      });
    } else {
      if (session.players.length >= 5) {
        alert('Maximum 5 joueurs titulaires');
        return;
      }
      setSession({
        ...session,
        players: [...session.players, player]
      });
    }
  };

  // Toggle sub
  const toggleSub = (player) => {
    const isSelected = session.subs.find(p => p.id === player.id);
    
    if (isSelected) {
      setSession({
        ...session,
        subs: session.subs.filter(p => p.id !== player.id)
      });
    } else {
      if (session.subs.length >= 3) {
        alert('Maximum 3 substituts');
        return;
      }
      setSession({
        ...session,
        subs: [...session.subs, player]
      });
    }
  };

  // Calculer heure de fin
  const calculateEndTime = () => {
    if (!session.startTime || !session.duration) return '';
    
    const [hours, minutes] = session.startTime.split(':').map(Number);
    const durationMatch = session.duration.match(/(\d+)h?(\d+)?/);
    
    if (!durationMatch) return '';
    
    const durationHours = parseInt(durationMatch[1] || 0);
    const durationMinutes = parseInt(durationMatch[2] || 0);
    
    const endHours = hours + durationHours;
    const endMinutes = minutes + durationMinutes;
    
    const finalHours = endHours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    
    return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
  };

  // Valider et créer session
  const createSession = () => {
    // Validations
    if (!session.title.trim()) {
      alert('⚠️ Titre de la session requis');
      return;
    }
    
    if (session.players.length === 0) {
      alert('⚠️ Sélectionnez au moins 1 joueur');
      return;
    }
    
    if (!session.date) {
      alert('⚠️ Date requise');
      return;
    }
    
    if (!session.startTime) {
      alert('⚠️ Heure de début requise');
      return;
    }
    
    const newSession = {
      id: `session_${Date.now()}`,
      ...session,
      endTime: calculateEndTime(),
      teamId,
      teamName,
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: 'current_user' // À remplacer par vrai user
    };
    
    // Sauvegarder
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push(newSession);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    
    // Callback
    if (onSessionCreated) {
      onSessionCreated(newSession);
    }
    
    // Reset form
    setSession({
      title: '',
      players: [],
      subs: [],
      type: 'Training',
      leagueType: '',
      duration: '',
      date: '',
      startTime: '',
      endTime: '',
      notes: ''
    });
    
    alert('✅ Session créée avec succès !');
  };

  const selectedType = sessionTypes.find(t => t.value === session.type);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Plus className="w-6 h-6 text-red-400" />
        Créer une Session - {teamName}
      </h3>

      <div className="space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Titre de la session *</label>
          <input
            type="text"
            value={session.title}
            onChange={(e) => setSession({ ...session, title: e.target.value })}
            placeholder="Ex: Match Prime League vs Équipe X"
            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none"
          />
        </div>

        {/* Type de session */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3">Type de session *</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {sessionTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSession({ ...session, type: type.value })}
                className={`p-3 rounded-xl border transition-all ${
                  session.type === type.value
                    ? `bg-${type.color}-500/20 border-${type.color}-500/50`
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-2xl mb-1">{type.icon}</div>
                <div className="text-xs font-semibold text-white">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Type de ligue (si Ligue) */}
        {session.type === 'Ligue' && (
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Type de Ligue</label>
            <select
              value={session.leagueType}
              onChange={(e) => setSession({ ...session, leagueType: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none"
            >
              <option value="">Sélectionner...</option>
              {leagueTypes.map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          </div>
        )}

        {/* Joueurs Titulaires */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              Joueurs Titulaires ({session.players.length}/5) *
            </label>
            <button
              onClick={() => setShowPlayerSelector(!showPlayerSelector)}
              className="px-3 py-1 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 text-xs font-semibold hover:bg-green-600/30 transition-all"
            >
              {showPlayerSelector ? 'Fermer' : 'Sélectionner'}
            </button>
          </div>
          
          {showPlayerSelector && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              {teamPlayers.map(player => (
                <button
                  key={player.id}
                  onClick={() => togglePlayer(player)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    session.players.find(p => p.id === player.id)
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-semibold text-sm">{player.name}</span>
                      <span className="text-gray-400 text-xs ml-2">{player.role}</span>
                    </div>
                    {session.players.find(p => p.id === player.id) && (
                      <div className="text-green-400">✓</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {session.players.map(player => (
              <span key={player.id} className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-semibold flex items-center gap-2">
                {player.name}
                <button onClick={() => togglePlayer(player)} className="hover:text-green-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Substituts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Substituts ({session.subs.length}/3)
            </label>
            <button
              onClick={() => setShowSubSelector(!showSubSelector)}
              className="px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-all"
            >
              {showSubSelector ? 'Fermer' : 'Sélectionner'}
            </button>
          </div>
          
          {showSubSelector && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
              {teamPlayers.filter(p => !session.players.find(sp => sp.id === p.id)).map(player => (
                <button
                  key={player.id}
                  onClick={() => toggleSub(player)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    session.subs.find(p => p.id === player.id)
                      ? 'bg-blue-500/20 border-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-semibold text-sm">{player.name}</span>
                      <span className="text-gray-400 text-xs ml-2">{player.role}</span>
                    </div>
                    {session.subs.find(p => p.id === player.id) && (
                      <div className="text-blue-400">✓</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {session.subs.map(player => (
              <span key={player.id} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 text-xs font-semibold flex items-center gap-2">
                {player.name}
                <button onClick={() => toggleSub(player)} className="hover:text-blue-300">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Date, Heure, Durée */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-red-400" />
              Date *
            </label>
            <input
              type="date"
              value={session.date}
              onChange={(e) => setSession({ ...session, date: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
              Heure début *
            </label>
            <input
              type="time"
              value={session.startTime}
              onChange={(e) => setSession({ ...session, startTime: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Durée</label>
            <input
              type="text"
              value={session.duration}
              onChange={(e) => setSession({ ...session, duration: e.target.value })}
              placeholder="Ex: 2h30"
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none"
            />
            {calculateEndTime() && (
              <p className="text-xs text-gray-400 mt-1">Fin: {calculateEndTime()}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Notes / Informations</label>
          <textarea
            value={session.notes}
            onChange={(e) => setSession({ ...session, notes: e.target.value })}
            rows="3"
            placeholder="Informations complémentaires, stratégie, points importants..."
            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:border-red-500/50 outline-none resize-none"
          />
        </div>

        {/* Bouton Créer */}
        <button
          onClick={createSession}
          className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          style={{ boxShadow: '0 0 30px rgba(220,20,60,0.5)' }}
        >
          <Save className="w-5 h-5" />
          Créer la Session
        </button>
      </div>
    </div>
  );
};

export default SessionCreator;
