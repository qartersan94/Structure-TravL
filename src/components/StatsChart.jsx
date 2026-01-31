import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StatsChart({ player, teamColor }) {
  // Simulation de données d'évolution sur 10 derniers matchs
  const recentMatches = Array.from({ length: 10 }, (_, i) => ({
    match: i + 1,
    kda: (player.kda + (Math.random() - 0.5) * 2).toFixed(1),
    cs: Math.floor(200 + Math.random() * 100),
    visionScore: Math.floor(30 + Math.random() * 40),
    damage: Math.floor(15000 + Math.random() * 10000)
  }));

  // Calcul du max pour la hauteur des barres
  const maxKda = Math.max(...recentMatches.map(m => parseFloat(m.kda)));

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black font-bebas" style={{ color: teamColor }}>
            ÉVOLUTION RÉCENTE
          </h3>
          <p className="text-sm text-gray-400">10 derniers matchs</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm font-bold text-green-500">+12% forme</span>
        </div>
      </div>

      {/* KDA Evolution Chart */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 mb-4">KDA PAR MATCH</h4>
        <div className="flex items-end justify-between h-40 gap-2">
          {recentMatches.map((match, idx) => {
            const height = (parseFloat(match.kda) / maxKda) * 100;
            const isGood = parseFloat(match.kda) >= player.kda;
            
            return (
              <div key={idx} className="flex-1 flex flex-col items-center group">
                {/* Bar */}
                <div className="w-full flex items-end h-32">
                  <div 
                    className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative"
                    style={{ 
                      height: `${height}%`,
                      background: isGood 
                        ? `linear-gradient(to top, ${teamColor}, ${teamColor}aa)`
                        : 'linear-gradient(to top, #ef4444, #dc2626)',
                      boxShadow: `0 0 10px ${isGood ? teamColor : '#ef4444'}50`,
                      minHeight: '20px'
                    }}
                  >
                    {/* Tooltip au hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-red-900 border-opacity-30 rounded-lg px-3 py-2 text-xs whitespace-nowrap z-10">
                      <div className="font-bold" style={{ color: teamColor }}>Match {match.match}</div>
                      <div className="text-white">KDA: {match.kda}</div>
                      <div className="text-gray-400">CS: {match.cs}</div>
                      <div className="text-gray-400">Vision: {match.visionScore}</div>
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-xs text-gray-500 mt-2 font-bold">M{match.match}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-red-900 border-opacity-20">
        
        {/* Moyenne KDA */}
        <div className="text-center">
          <div className="text-2xl font-black font-bebas" style={{ color: teamColor }}>
            {player.kda}
          </div>
          <div className="text-xs text-gray-400">KDA Moyen</div>
        </div>

        {/* Best KDA */}
        <div className="text-center">
          <div className="text-2xl font-black font-bebas text-green-500">
            {maxKda.toFixed(1)}
          </div>
          <div className="text-xs text-gray-400">Meilleur KDA</div>
        </div>

        {/* Consistency */}
        <div className="text-center">
          <div className="text-2xl font-black font-bebas text-blue-500">
            {Math.floor(70 + Math.random() * 20)}%
          </div>
          <div className="text-xs text-gray-400">Régularité</div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-red-900 border-opacity-20">
        
        {/* CS/min */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">CS/min</span>
            <span className="text-sm font-bold text-white">
              {(recentMatches.reduce((acc, m) => acc + m.cs, 0) / recentMatches.length / 25).toFixed(1)}
            </span>
          </div>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500"
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>

        {/* Vision Score */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Vision Score</span>
            <span className="text-sm font-bold text-white">
              {Math.floor(recentMatches.reduce((acc, m) => acc + m.visionScore, 0) / recentMatches.length)}
            </span>
          </div>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-500"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>

        {/* Damage */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Damage/Game</span>
            <span className="text-sm font-bold text-white">
              {Math.floor(recentMatches.reduce((acc, m) => acc + m.damage, 0) / recentMatches.length).toLocaleString()}
            </span>
          </div>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-500"
              style={{ width: '80%' }}
            ></div>
          </div>
        </div>

        {/* Gold/min */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Gold/min</span>
            <span className="text-sm font-bold text-white">
              {Math.floor(350 + Math.random() * 100)}
            </span>
          </div>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-500"
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default StatsChart;
