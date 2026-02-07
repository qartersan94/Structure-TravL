import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Trophy, Loader } from 'lucide-react';
import { getPlayerStats } from '../services/riotAPI';

const RosterCard = ({ team }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rosterType, setRosterType] = useState('officiel'); // officiel | creation

  useEffect(() => {
    loadStats();
  }, [team]);

  const loadStats = async () => {
    setLoading(true);
    
    try {
      // Charger roster depuis localStorage
      const allPlayers = JSON.parse(localStorage.getItem('travl_players') || '[]');
      const teamPlayers = allPlayers.filter(p => p.teamId === team.id);
      
      // Fetch stats Riot pour chaque joueur
      const updatedPlayers = await Promise.all(
        teamPlayers.map(async (player) => {
          if (player.riotId) {
            try {
              const riotStats = await getPlayerStats(player.riotId);
              return { ...player, ...riotStats };
            } catch (error) {
              console.error(`Error loading stats for ${player.name}:`, error);
              return player;
            }
          }
          return player;
        })
      );
      
      // Calculer stats équipe
      const totalGames = updatedPlayers.reduce((sum, p) => sum + (p.totalGames || 0), 0);
      const totalWins = updatedPlayers.reduce((sum, p) => sum + (p.wins || 0), 0);
      const teamWinRate = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(1) : 0;
      
      setStats({
        players: updatedPlayers,
        teamWinRate,
        totalGames,
        lastUpdated: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error loading team stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[260px] rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
        <Loader className="w-8 h-8 text-red-400 animate-spin" />
      </div>
    );
  }

  const teamColor = team.color;

  return (
    <div className="group relative h-[260px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
        style={{ background: `${teamColor}30` }}></div>

      <div className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}>
        
        {/* RECTO */}
        <div className="absolute inset-0 rounded-xl overflow-hidden backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${teamColor}12, rgba(8,8,8,0.98))`,
            border: `1px solid ${teamColor}25`,
            backfaceVisibility: 'hidden'
          }}>
          
          <div className="p-3 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">{team.logo}</span>
                <div>
                  <h3 className="text-sm font-black font-bebas leading-none" style={{ color: teamColor }}>
                    {team.name}
                  </h3>
                  <p className="text-[7px] text-gray-700 uppercase">{team.rank}</p>
                </div>
              </div>
              <div className="px-1.5 py-0.5 rounded text-[8px] font-bold"
                style={{ background: `${teamColor}18`, color: teamColor }}>
                {stats.players.length}/5
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-1.5 mb-2">
              <div className="flex-1 text-center py-1 rounded bg-black/20">
                <div className="text-xs font-bold" style={{ color: teamColor }}>
                  {stats.teamWinRate}%
                </div>
              </div>
              <div className="flex-1 text-center py-1 rounded bg-black/20">
                <div className="text-xs font-bold" style={{ color: teamColor }}>
                  {stats.totalGames}G
                </div>
              </div>
            </div>

            {/* Roster */}
            <div className="flex-1 space-y-0.5 mb-2 overflow-y-auto custom-scrollbar">
              {stats.players.map((player) => (
                <div key={player.id}
                  className="flex items-center justify-between px-1.5 py-1 rounded bg-black/15 hover:bg-black/30">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded flex items-center justify-center text-[7px] font-bold bg-white/5"
                      style={{ color: teamColor }}>
                      {player.role?.[0]}
                    </div>
                    <span className="text-[10px] font-medium text-white truncate max-w-[80px]">
                      {player.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-mono font-bold" style={{ color: teamColor }}>
                      {player.kda || '0.0'}
                    </span>
                    <div className={`w-1 h-1 rounded-full ${player.status === 'online' ? 'bg-green-400' : 'bg-gray-700'}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-1.5">
              <div className="w-full h-0.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${stats.teamWinRate}%`,
                    background: teamColor,
                    boxShadow: `0 0 8px ${teamColor}60`
                  }}></div>
              </div>
            </div>

            {/* Boutons Roster */}
            <div className="flex gap-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); setRosterType('officiel'); }}
                className={`flex-1 px-2 py-1 rounded text-[8px] font-bold transition-all ${
                  rosterType === 'officiel'
                    ? 'bg-green-500/30 border border-green-500/50 text-green-400'
                    : 'bg-white/5 border border-white/10 text-gray-500'
                }`}>
                Officiel
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setRosterType('creation'); }}
                className={`flex-1 px-2 py-1 rounded text-[8px] font-bold transition-all ${
                  rosterType === 'creation'
                    ? 'bg-orange-500/30 border border-orange-500/50 text-orange-400'
                    : 'bg-white/5 border border-white/10 text-gray-500'
                }`}>
                En création
              </button>
              <span className="text-[7px] text-gray-800 self-center">↻</span>
            </div>
          </div>
        </div>

        {/* VERSO */}
        <div className="absolute inset-0 rounded-xl backdrop-blur-sm p-3"
          style={{
            background: `linear-gradient(135deg, ${teamColor}18, rgba(8,8,8,0.98))`,
            border: `1px solid ${teamColor}25`,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}>
          <h3 className="text-sm font-bebas mb-3 text-center" style={{ color: teamColor }}>
            STATISTIQUES
          </h3>
          <div className="space-y-1.5">
            {team.competitions.map((comp, i) => (
              <div key={i} className="p-2 rounded-lg bg-black/20 border-l-2"
                style={{ borderColor: teamColor }}>
                <div className="text-[10px] font-bold mb-0.5 text-white truncate">{comp.name}</div>
                <div className="flex justify-between text-[8px] text-gray-500">
                  <span className="font-bold" style={{ color: teamColor }}>#{comp.position}</span>
                  <span>{comp.points}pts • {comp.wins}V-{comp.losses}D</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[7px] text-center text-gray-800 mt-2 uppercase font-bold">Click ↻</p>
        </div>
      </div>
    </div>
  );
};

export default RosterCard;
