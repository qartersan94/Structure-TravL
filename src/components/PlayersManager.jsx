import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, UserPlus } from 'lucide-react';
import { TEAMS } from '../data/teamsData';

// Gestion LocalStorage
const STORAGE_KEY = 'travl_players';

const getPlayers = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const savePlayers = (players) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};

export default function PlayerManager() {
  const [players, setPlayers] = useState(getPlayers());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [filterTeam, setFilterTeam] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    realName: '',
    role: 'Top',
    teamId: 1,
    rank: 'Master',
    champions: ['', '', ''],
    email: '',
    kda: 0,
    winRate: 0,
    gamesPlayed: 0
  });

  useEffect(() => {
    savePlayers(players);
  }, [players]);

  const handleAdd = () => {
    const newPlayer = {
      id: Date.now(),
      ...formData,
      status: 'offline',
      createdAt: new Date().toISOString()
    };
    setPlayers([...players, newPlayer]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData(player);
    setShowAddModal(true);
  };

  const handleUpdate = () => {
    setPlayers(players.map(p => p.id === editingPlayer.id ? { ...formData, id: editingPlayer.id } : p));
    resetForm();
    setShowAddModal(false);
    setEditingPlayer(null);
  };

  const handleDelete = (id) => {
    if (confirm('Supprimer ce joueur ?')) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', realName: '', role: 'Top', teamId: 1, rank: 'Master',
      champions: ['', '', ''], email: '', kda: 0, winRate: 0, gamesPlayed: 0
    });
  };

  const filteredPlayers = filterTeam === 'all' 
    ? players 
    : players.filter(p => p.teamId === parseInt(filterTeam));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bebas tracking-wider">GESTION DES JOUEURS</h2>
          <p className="text-sm text-gray-500 mt-1">{players.length} joueurs inscrits</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold hover:scale-105 transition-all"
          style={{ boxShadow: '0 0 20px rgba(220,20,60,0.4)' }}>
          <UserPlus className="w-5 h-5" />
          Ajouter un joueur
        </button>
      </div>

      {/* Filtre équipe */}
      <div className="mb-6">
        <select
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
          className="px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none">
          <option value="all">Toutes les équipes ({players.length})</option>
          {TEAMS.map(team => (
            <option key={team.id} value={team.id}>
              {team.name} ({players.filter(p => p.teamId === team.id).length})
            </option>
          ))}
        </select>
      </div>

      {/* Liste des joueurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map(player => {
          const team = TEAMS.find(t => t.id === player.teamId);
          const teamColor = team?.color || '#DC143C';

          return (
            <div key={player.id}
              className="p-4 rounded-xl border transition-all hover:-translate-y-1"
              style={{ background: 'rgba(0,0,0,0.4)', borderColor: `${teamColor}30` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: teamColor }}>{player.name}</h3>
                  <p className="text-xs text-gray-500">{player.realName}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(player)}
                    className="p-2 hover:bg-blue-600/20 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="p-2 hover:bg-red-600/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Rôle</span>
                  <span className="font-semibold">{player.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Équipe</span>
                  <span className="font-semibold">{team?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Rank</span>
                  <span className="font-semibold">{player.rank}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">KDA</span>
                  <span className="font-semibold" style={{ color: teamColor }}>{player.kda}</span>
                </div>
              </div>

              {player.champions.some(c => c) && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Champions</div>
                  <div className="flex gap-1">
                    {player.champions.filter(c => c).map((champ, i) => (
                      <div key={i} className="text-xs px-2 py-1 rounded bg-white/5">{champ}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="mb-4">Aucun joueur inscrit</p>
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="px-6 py-3 bg-red-600/20 border border-red-600/40 text-red-400 rounded-lg font-bold hover:bg-red-600/30 transition-all">
            Ajouter le premier joueur
          </button>
        </div>
      )}

      {/* MODAL AJOUT/ÉDITION */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90"
          onClick={() => { setShowAddModal(false); setEditingPlayer(null); resetForm(); }}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bebas">
                {editingPlayer ? 'MODIFIER JOUEUR' : 'NOUVEAU JOUEUR'}
              </h3>
              <button
                onClick={() => { setShowAddModal(false); setEditingPlayer(null); resetForm(); }}
                className="p-2 hover:bg-red-600/20 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Nom in-game */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Pseudo in-game *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none"
                  placeholder="Ex: MountainKing"
                />
              </div>

              {/* Nom réel */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Nom réel</label>
                <input
                  type="text"
                  value={formData.realName}
                  onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none"
                  placeholder="Ex: Alexandre Martin"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none"
                  placeholder="email@exemple.com"
                />
              </div>

              {/* Rôle + Équipe */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Rôle *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none">
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="ADC">ADC</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Équipe *</label>
                  <select
                    value={formData.teamId}
                    onChange={(e) => setFormData({ ...formData, teamId: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none">
                    {TEAMS.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rank */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Rank</label>
                <input
                  type="text"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:border-red-600 focus:outline-none"
                  placeholder="Ex: Master 280LP"
                />
              </div>

              {/* Champions */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Champions principaux</label>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map(i => (
                    <input
                      key={i}
                      type="text"
                      value={formData.champions[i]}
                      onChange={(e) => {
                        const newChamps = [...formData.champions];
                        newChamps[i] = e.target.value;
                        setFormData({ ...formData, champions: newChamps });
                      }}
                      className="px-3 py-2 bg-black border border-gray-800 rounded-lg text-white text-sm focus:border-red-600 focus:outline-none"
                      placeholder={`Champion ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats (optionnel pour l'instant) */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">KDA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.kda}
                    onChange={(e) => setFormData({ ...formData, kda: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-black border border-gray-800 rounded-lg text-white text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Winrate %</label>
                  <input
                    type="number"
                    value={formData.winRate}
                    onChange={(e) => setFormData({ ...formData, winRate: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-black border border-gray-800 rounded-lg text-white text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Games</label>
                  <input
                    type="number"
                    value={formData.gamesPlayed}
                    onChange={(e) => setFormData({ ...formData, gamesPlayed: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-black border border-gray-800 rounded-lg text-white text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowAddModal(false); setEditingPlayer(null); resetForm(); }}
                className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-all">
                Annuler
              </button>
              <button
                onClick={editingPlayer ? handleUpdate : handleAdd}
                disabled={!formData.name || !formData.role}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                {editingPlayer ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { getPlayers };
