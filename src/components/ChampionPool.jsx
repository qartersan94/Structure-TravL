import React from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

function ChampionPool({ player, teamColor }) {
  // Créer des stats détaillées pour chaque champion
  const championStats = player.mainChampions.map((champ, idx) => ({
    name: champ,
    mastery: 7 - idx, // Mastery 7, 6, 5
    games: Math.floor(50 - idx * 10 + Math.random() * 20),
    winRate: Math.floor(65 - idx * 5 + Math.random() * 10),
    kda: (player.kda + (Math.random() - 0.5) * 1.5).toFixed(1),
    pickRate: Math.floor(30 - idx * 8),
    banRate: Math.floor(15 + idx * 5),
    pentaKills: idx === 0 ? Math.floor(Math.random() * 3) : 0
  }));

  // Champion le plus joué
  const topChampion = championStats[0];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-red-900 border-opacity-20 pb-4">
        <div>
          <h3 className="text-xl font-black font-bebas" style={{ color: teamColor }}>
            POOL DE CHAMPIONS
          </h3>
          <p className="text-sm text-gray-400">{player.mainChampions.length} champions principaux</p>
        </div>
        <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg px-3 py-2">
          <Award className="h-4 w-4 text-yellow-500" />
          <span className="text-xs font-bold text-yellow-500">Mastery 7</span>
        </div>
      </div>

      {/* Top Champion Highlight */}
      <div 
        className="relative bg-gradient-to-br from-black to-gray-900 border-2 rounded-2xl p-6 overflow-hidden"
        style={{ 
          borderColor: teamColor,
          boxShadow: `0 0 20px ${teamColor}30`
        }}
      >
        <div className="absolute top-0 right-0 text-9xl opacity-5">🏆</div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Star className="h-5 w-5" style={{ color: teamColor }} />
                <h4 className="text-2xl font-black font-bebas" style={{ color: teamColor }}>
                  {topChampion.name}
                </h4>
              </div>
              <p className="text-xs text-gray-400">Champion principal</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-black font-bebas text-green-500">
                {topChampion.winRate}%
              </div>
              <div className="text-xs text-gray-400">Winrate</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-black bg-opacity-50 rounded-lg p-3 text-center">
              <div className="text-xl font-black font-bebas" style={{ color: teamColor }}>
                {topChampion.games}
              </div>
              <div className="text-xs text-gray-400">Games</div>
            </div>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-3 text-center">
              <div className="text-xl font-black font-bebas text-blue-500">
                {topChampion.kda}
              </div>
              <div className="text-xs text-gray-400">KDA</div>
            </div>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-3 text-center">
              <div className="text-xl font-black font-bebas text-purple-500">
                {topChampion.pickRate}%
              </div>
              <div className="text-xs text-gray-400">Pick</div>
            </div>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-3 text-center">
              <div className="text-xl font-black font-bebas text-red-500">
                {topChampion.banRate}%
              </div>
              <div className="text-xs text-gray-400">Ban</div>
            </div>
          </div>

          {topChampion.pentaKills > 0 && (
            <div className="flex items-center justify-center space-x-2 bg-yellow-600 bg-opacity-10 border border-yellow-600 border-opacity-30 rounded-lg py-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-500">
                {topChampion.pentaKills} Penta Kill{topChampion.pentaKills > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Autres Champions */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-400">AUTRES CHAMPIONS</h4>
        
        {championStats.slice(1).map((champ, idx) => (
          <div 
            key={idx}
            className="bg-black bg-opacity-50 rounded-xl p-4 hover:bg-opacity-70 transition-all duration-300 border border-transparent hover:border-red-900 hover:border-opacity-30"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${teamColor}30, ${teamColor}10)`,
                    border: `2px solid ${teamColor}30`
                  }}
                >
                  {champ.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{champ.name}</div>
                  <div className="text-xs text-gray-400">Mastery {champ.mastery}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-black font-bebas text-green-500">
                  {champ.winRate}%
                </div>
                <div className="text-xs text-gray-500">{champ.games} games</div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">KDA</span>
                  <span className="font-bold text-white">{champ.kda}</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${Math.min((parseFloat(champ.kda) / 10) * 100, 100)}%`,
                      backgroundColor: teamColor
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Pick</span>
                  <span className="font-bold text-purple-400">{champ.pickRate}%</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-purple-600"
                    style={{ width: `${champ.pickRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Ban</span>
                  <span className="font-bold text-red-400">{champ.banRate}%</span>
                </div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-red-600"
                    style={{ width: `${champ.banRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-black bg-opacity-50 rounded-xl p-4 border-t border-red-900 border-opacity-20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-black font-bebas" style={{ color: teamColor }}>
              {championStats.reduce((acc, c) => acc + c.games, 0)}
            </div>
            <div className="text-xs text-gray-400">Total Games</div>
          </div>
          
          <div>
            <div className="text-2xl font-black font-bebas text-green-500">
              {Math.floor(championStats.reduce((acc, c) => acc + c.winRate, 0) / championStats.length)}%
            </div>
            <div className="text-xs text-gray-400">Avg Winrate</div>
          </div>
          
          <div>
            <div className="text-2xl font-black font-bebas text-blue-500">
              {(championStats.reduce((acc, c) => acc + parseFloat(c.kda), 0) / championStats.length).toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">Avg KDA</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ChampionPool;
