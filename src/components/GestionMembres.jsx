import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Shield, Edit2, Trash2, Search, Filter } from 'lucide-react';
import TEAMS from '../data/teamsData';

const GestionMembres = () => {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, active
  const [search, setSearch] = useState('');
  const [editingMember, setEditingMember] = useState(null);

  // Charger les membres depuis localStorage
  useEffect(() => {
    const savedMembers = JSON.parse(localStorage.getItem('members') || '[]');
    setMembers(savedMembers);
  }, []);

  // Sauvegarder les membres
  const saveMembers = (updatedMembers) => {
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  // Valider un membre (passer de PENDING à JOUEUR)
  const validateMember = (memberId) => {
    const updatedMembers = members.map(m => 
      m.id === memberId 
        ? { ...m, status: 'active', role: 'JOUEUR' }
        : m
    );
    saveMembers(updatedMembers);
  };

  // Refuser un membre
  const rejectMember = (memberId) => {
    if (window.confirm('Êtes-vous sûr de vouloir refuser ce membre ?')) {
      const updatedMembers = members.filter(m => m.id !== memberId);
      saveMembers(updatedMembers);
    }
  };

  // Supprimer un membre
  const deleteMember = (memberId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      const updatedMembers = members.filter(m => m.id !== memberId);
      saveMembers(updatedMembers);
    }
  };

  // Assigner à une équipe
  const assignToTeam = (memberId, teamId) => {
    const updatedMembers = members.map(m => {
      if (m.id === memberId) {
        const teams = m.teams || [];
        if (teams.includes(teamId)) {
          // Retirer de l'équipe
          return { ...m, teams: teams.filter(t => t !== teamId) };
        } else {
          // Ajouter à l'équipe
          return { ...m, teams: [...teams, teamId] };
        }
      }
      return m;
    });
    saveMembers(updatedMembers);
  };

  // Changer le rôle
  const changeRole = (memberId, newRole) => {
    const updatedMembers = members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    );
    saveMembers(updatedMembers);
    setEditingMember(null);
  };

  // Filtrer les membres
  const filteredMembers = members.filter(m => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'pending' ? m.status === 'pending' :
      filter === 'active' ? m.status === 'active' : true;
    
    const matchesSearch = 
      m.username.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.riotId && m.riotId.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Stats
  const stats = {
    total: members.length,
    pending: members.filter(m => m.status === 'pending').length,
    active: members.filter(m => m.status === 'active').length,
    joueurs: members.filter(m => m.role === 'JOUEUR').length,
    capitaines: members.filter(m => m.role === 'CAPITAINE').length
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-2xl font-black text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-orange-900/10 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-orange-400" />
            <div>
              <p className="text-xs text-gray-400">En attente</p>
              <p className="text-2xl font-black text-white">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Actifs</p>
              <p className="text-2xl font-black text-white">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Joueurs</p>
              <p className="text-2xl font-black text-white">{stats.joueurs}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-400" />
            <div>
              <p className="text-xs text-gray-400">Capitaines</p>
              <p className="text-2xl font-black text-white">{stats.capitaines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un membre..."
              className="w-full pl-11 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50"
            />
          </div>

          {/* Filtres */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'all' ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}>
              Tous
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'pending' ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}>
              En attente ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'active' ? 'bg-green-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}>
              Actifs
            </button>
          </div>
        </div>
      </div>

      {/* Liste membres */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-red-400" />
            Gestion des Membres
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Membre</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Équipes</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    Aucun membre trouvé
                  </td>
                </tr>
              ) : (
                filteredMembers.map(member => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-white">{member.username}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                        {member.riotId && (
                          <p className="text-xs text-gray-600 mt-1">Riot: {member.riotId}</p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {editingMember === member.id ? (
                        <select
                          value={member.role}
                          onChange={(e) => changeRole(member.id, e.target.value)}
                          className="px-3 py-1 bg-black/50 border border-white/10 rounded text-white text-sm outline-none">
                          <option value="PENDING">En attente</option>
                          <option value="JOUEUR">Joueur</option>
                          <option value="CAPITAINE">Capitaine</option>
                          <option value="COACH">Coach</option>
                          <option value="MANAGER">Manager</option>
                          <option value="PRESIDENT">Président</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          member.role === 'PENDING' ? 'bg-orange-500/20 text-orange-400' :
                          member.role === 'JOUEUR' ? 'bg-green-500/20 text-green-400' :
                          member.role === 'CAPITAINE' ? 'bg-purple-500/20 text-purple-400' :
                          member.role === 'COACH' ? 'bg-blue-500/20 text-blue-400' :
                          member.role === 'MANAGER' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {member.role}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {TEAMS.map(team => {
                          const isInTeam = member.teams?.includes(team.id);
                          return (
                            <button
                              key={team.id}
                              onClick={() => assignToTeam(member.id, team.id)}
                              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                                isInTeam
                                  ? 'border-2'
                                  : 'bg-white/5 border border-white/10 text-gray-600'
                              }`}
                              style={isInTeam ? { 
                                background: `${team.color}20`,
                                borderColor: team.color,
                                color: team.color
                              } : {}}>
                              {team.name}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {member.status === 'pending' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400">
                          ⏳ En attente
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                          ✅ Actif
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {member.status === 'pending' && (
                          <>
                            <button
                              onClick={() => validateMember(member.id)}
                              className="p-2 bg-green-500/20 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-all"
                              title="Valider">
                              <UserCheck className="w-4 h-4 text-green-400" />
                            </button>
                            <button
                              onClick={() => rejectMember(member.id)}
                              className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                              title="Refuser">
                              <UserX className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                        {member.status === 'active' && (
                          <>
                            <button
                              onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                              className="p-2 bg-blue-500/20 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all"
                              title="Modifier rôle">
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button
                              onClick={() => deleteMember(member.id)}
                              className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                              title="Supprimer">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionMembres;
