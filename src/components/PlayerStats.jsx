import React from 'react';
import { TrendingUp, Target, Award, Shield, Swords } from 'lucide-react';

function PlayerStats({ player, teamColor }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6 space-y-6">
      
      {/* Header Joueur */}
      <div className="flex items-center justify-between border-b border-red-900 border-opacity-20 pb-4">
        <div>
          <h3 className="text-2xl font-black font-bebas" style={{ color: teamColor }}>
            {player.pseudo}
          </h3>
          <p className="text-sm text-gray-400">{player.role} • {player.realName}</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black font-bebas" style={{ color: teamColor }}>
            {player.kda}
          </div>
          <div className="text-xs text-gray-500 font-bold">KDA</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Winrate */}
        <div className="bg-black bg-opacity-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-black font-bebas text-green-500">
            {player.winRate}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Winrate</div>
          <div className="text-xs text-gray-600">{player.games} games</div>
        </div>

        {/* Games */}
        <div className="bg-black bg-opacity-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-black font-bebas text-blue-500">
            {player.games}
          </div>
          <div className="text-xs text-gray-400 mt-1">Games</div>
          <div className="text-xs text-gray-600">Joués</div>
        </div>

        {/* Age */}
        <div className="bg-black bg-opacity-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-black font-bebas text-purple-500">
            {player.age}
          </div>
          <div className="text-xs text-gray-400 mt-1">Ans</div>
          <div className="text-xs text-gray-600">{player.nationality}</div>
        </div>

        {/* MVP */}
        <div className="bg-black bg-opacity-50 rounded-xl p-4 text-center">
          <Award className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
          <div className="text-xs text-gray-400">MVP</div>
          <div className="text-xs text-gray-600">x{Math.floor(player.games * 0.15)}</div>
        </div>
      </div>

      {/* Champions Pool */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 mb-3 flex items-center">
          <Swords className="h-4 w-4 mr-2 text-red-500" />
          CHAMPIONS PRINCIPAUX
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {player.mainChampions.map((champ, idx) => (
            <div 
              key={idx}
              className="bg-black bg-opacity-50 border border-red-900 border-opacity-20 rounded-lg px-3 py-2 text-center hover:border-red-600 hover:border-opacity-40 transition-all"
            >
              <div className="text-sm font-bold text-white">{champ}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Bars */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-gray-400 flex items-center">
          <Target className="h-4 w-4 mr-2 text-red-500" />
          PERFORMANCES
        </h4>
        
        {/* KDA Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">KDA</span>
            <span className="font-bold" style={{ color: teamColor }}>{player.kda}</span>
          </div>
          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${Math.min((player.kda / 10) * 100, 100)}%`,
                backgroundColor: teamColor,
                boxShadow: `0 0 10px ${teamColor}`
              }}
            ></div>
          </div>
        </div>

        {/* Winrate Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Winrate</span>
            <span className="font-bold text-green-500">{player.winRate}%</span>
          </div>
          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-green-600 to-green-500"
              style={{ 
                width: `${player.winRate}%`,
                boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
              }}
            ></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PlayerStats;
