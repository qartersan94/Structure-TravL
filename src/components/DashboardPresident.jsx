import React, { useState } from 'react';
import { Users, Trophy, TrendingUp, Calendar, DollarSign, BarChart3, Settings } from 'lucide-react';
import TEAMS from '../data/teamsData';

const DashboardPresident = () => {
  const [selectedTeam, setSelectedTeam] = useState('all');

  // Calculer stats globales
  const totalPlayers = TEAMS.reduce((sum, team) => sum + (team.roster?.length || 0), 0);
  const totalGames = TEAMS.reduce((sum, team) => sum + team.globalStats.totalWins + team.globalStats.totalLosses, 0);
  const totalWins = TEAMS.reduce((sum, team) => sum + team.globalStats.totalWins, 0);
  const globalWinRate = ((totalWins / totalGames) * 100).toFixed(1);

  const filteredTeams = selectedTeam === 'all' ? TEAMS : TEAMS.filter(t => t.id === selectedTeam);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Joueurs Actifs</p>
              <p className="text-3xl font-black text-white">{totalPlayers}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Équipes</p>
              <p className="text-3xl font-black text-white">{TEAMS.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <TrendingUp className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Winrate Global</p>
              <p className="text-3xl font-black text-white">{globalWinRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Matchs Joués</p>
              <p className="text-3xl font-black text-white">{totalGames}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtre Équipe */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-white">Filtrer par équipe :</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50"
          >
            <option value="all">Toutes les équipes</option>
            {TEAMS.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tableau Équipes */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-black text-white">Vue Équipes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Équipe</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Joueurs</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Victoires</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Défaites</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Winrate</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase">Rang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTeams.map(team => (
                <tr key={team.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{team.logo}</span>
                      <div>
                        <p className="font-bold text-white" style={{ color: team.color }}>{team.name}</p>
                        <p className="text-xs text-gray-500">{team.rank}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold">{team.roster?.length || 0}/5</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-400 font-bold">{team.globalStats.totalWins}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-red-400 font-bold">{team.globalStats.totalLosses}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${team.globalStats.winRate}%`,
                            background: team.color
                          }}
                        ></div>
                      </div>
                      <span className="text-white font-bold text-sm">{team.globalStats.winRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white">
                      {team.rank}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 rounded-xl hover:border-blue-500/60 transition-all text-left">
          <Calendar className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="font-bold text-white mb-1">Planning Global</h4>
          <p className="text-xs text-gray-400">Voir tous les matchs</p>
        </button>

        <button className="p-6 bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30 rounded-xl hover:border-green-500/60 transition-all text-left">
          <DollarSign className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-bold text-white mb-1">Finances</h4>
          <p className="text-xs text-gray-400">Budget & Sponsors</p>
        </button>

        <button className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-purple-500/30 rounded-xl hover:border-purple-500/60 transition-all text-left">
          <Settings className="w-8 h-8 text-purple-400 mb-3" />
          <h4 className="font-bold text-white mb-1">Paramètres</h4>
          <p className="text-xs text-gray-400">Configuration structure</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardPresident;
