import React from 'react';
import { Trophy, TrendingUp, Target, Award } from 'lucide-react';
import TEAMS from '../data/teamsData';

const DashboardJoueur = ({ userId, userTeamId = 'flux' }) => {
  const team = TEAMS.find(t => t.id === userTeamId) || TEAMS[0];
  const player = team.roster?.find(p => p.id === parseInt(userId?.split('_')[1]) || 1) || team.roster?.[0];

  if (!player) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Aucune donnée joueur disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Joueur */}
      <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6"
        style={{ borderColor: `${team.color}30` }}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl"
            style={{ background: `${team.color}20`, border: `2px solid ${team.color}40` }}>
            {team.logo}
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">{player.name}</h2>
            <p className="text-lg font-semibold" style={{ color: team.color }}>{player.role}</p>
            <p className="text-sm text-gray-400 mt-1">{team.name} • {team.rank}</p>
          </div>
        </div>

        {/* Stats Principales */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
            <p className="text-3xl font-black" style={{ color: team.color }}>{player.kda}</p>
            <p className="text-xs text-gray-500 mt-1">KDA</p>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
            <p className="text-3xl font-black text-green-400">{team.globalStats.totalWins}</p>
            <p className="text-xs text-gray-500 mt-1">Victoires</p>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
            <p className="text-3xl font-black text-red-400">{team.globalStats.totalLosses}</p>
            <p className="text-xs text-gray-500 mt-1">Défaites</p>
          </div>
          <div className="text-center p-4 bg-black/30 rounded-lg border border-white/5">
            <p className="text-3xl font-black" style={{ color: team.color }}>
              {team.globalStats.winRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Winrate</p>
          </div>
        </div>
      </div>

      {/* Statistiques Détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Mes Performances
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <span className="text-gray-400">KDA Moyen</span>
              <span className="font-bold text-white">{player.kda}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <span className="text-gray-400">Matchs Joués</span>
              <span className="font-bold text-white">
                {team.globalStats.totalWins + team.globalStats.totalLosses}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <span className="text-gray-400">Taux de Victoire</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${team.globalStats.winRate}%`,
                      background: team.color
                    }}
                  ></div>
                </div>
                <span className="font-bold text-white">{team.globalStats.winRate}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <span className="text-gray-400">Statut</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                player.status === 'online' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {player.status === 'online' ? '🟢 En ligne' : '⚫ Hors ligne'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400" />
            Compétitions
          </h3>
          
          <div className="space-y-3">
            {team.competitions.map((comp, i) => (
              <div key={i} className="p-4 bg-black/30 rounded-lg border-l-4"
                style={{ borderColor: team.color }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-white text-sm">{comp.name}</p>
                  <span className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: `${team.color}20`, color: team.color }}>
                    #{comp.position}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{comp.wins}V - {comp.losses}D</span>
                  <span>•</span>
                  <span>{comp.points} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prochaines Sessions */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-red-400" />
          Prochaines Sessions
        </h3>
        
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune session prévue</p>
          <p className="text-xs text-gray-600 mt-2">Les sessions créées par ton capitaine apparaîtront ici</p>
        </div>
      </div>

      {/* Objectifs */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          Mes Objectifs
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-green-600/10 to-green-900/5 border border-green-500/30 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">KDA Objectif</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-green-400">4.0</span>
              <span className="text-sm text-gray-500 mb-1">Actuel: {player.kda}</span>
            </div>
            <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(parseFloat(player.kda) / 4.0) * 100}%` }}></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-600/10 to-blue-900/5 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Winrate Objectif</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-blue-400">70%</span>
              <span className="text-sm text-gray-500 mb-1">Actuel: {team.globalStats.winRate}%</span>
            </div>
            <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${(team.globalStats.winRate / 70) * 100}%` }}></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-600/10 to-purple-900/5 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Matchs ce mois</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-purple-400">20</span>
              <span className="text-sm text-gray-500 mb-1">Joués: 15</span>
            </div>
            <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJoueur;
