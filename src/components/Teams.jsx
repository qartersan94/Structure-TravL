import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Users, Calendar, Trophy, ExternalLink, Zap, Flame, Snowflake, Eye, Star, Award } from 'lucide-react';

// Composant carte équipe
const TeamCard = ({ team }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Charger les joueurs depuis le localStorage
    const storedPlayers = localStorage.getItem(`team_${team.id}_players`);
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, [team.id]);

  // Icône selon le rang
  const getRankIcon = () => {
    switch(team.rank) {
      case 'Master': return <Zap className="w-5 h-5" />;
      case 'High Diamond': return <Star className="w-5 h-5" />;
      case 'Diamond': return <Award className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div 
      className="team-card relative overflow-hidden rounded-xl p-4 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${team.color}20 0%, ${team.color}05 100%)`,
        borderColor: `${team.color}40`
      }}
    >
      {/* Header avec badge rang */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
          {getRankIcon()}
          <span className="text-xs font-semibold text-white/90">{team.rank}</span>
        </div>
        <div className="team-icon p-2 rounded-lg" style={{ background: team.color }}>
          {team.icon}
        </div>
      </div>

      {/* Nom de l'équipe */}
      <h3 className="text-2xl font-black mb-1 text-white tracking-tight">
        {team.name}
      </h3>
      <p className="text-white/60 text-xs mb-4">{team.league}</p>

      {/* Stats principales */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="stat-box bg-black/30 backdrop-blur-md rounded-lg p-3 border border-white/5">
          <div className="text-xl font-bold text-white">{team.record}</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wider">Record</div>
        </div>
        <div className="stat-box bg-black/30 backdrop-blur-md rounded-lg p-3 border border-white/5">
          <div className="text-xl font-bold" style={{ color: team.color }}>{team.winrate}%</div>
          <div className="text-[10px] text-white/50 uppercase tracking-wider">Winrate</div>
        </div>
      </div>

      {/* Roster */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wide">
          <Users className="w-3 h-3" />
          Roster
        </div>
        
        {players.length > 0 ? (
          players.map((player, idx) => (
            <div 
              key={idx}
              className="player-row flex items-center justify-between p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 hover:bg-black/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="role-badge w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                  style={{ background: team.color }}
                >
                  {player.role}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{player.name}</div>
                  <div className="text-white/40 text-[10px]">{player.realName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono" style={{ color: team.color }}>
                  {player.kda || '0.0'} KDA
                </div>
                <div className="text-[10px] text-white/40">
                  {player.winrate || '0'}% WR
                </div>
              </div>
            </div>
          ))
        ) : (
          // Slots vides prêts à être remplis
          ['Top', 'Jungle', 'Mid', 'ADC', 'Support'].map((role, idx) => (
            <div 
              key={idx}
              className="player-row flex items-center justify-between p-2 rounded-lg bg-black/10 backdrop-blur-sm border border-dashed border-white/10 hover:bg-black/20 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="role-badge w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold opacity-40"
                  style={{ background: team.color }}
                >
                  {role.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <div className="text-white/30 font-semibold text-sm">Slot disponible</div>
                  <div className="text-white/20 text-[10px]">{role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-white/20">0.0 KDA</div>
                <div className="text-[10px] text-white/20">0% WR</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Badges compétition */}
      <div className="flex flex-wrap gap-1.5">
        {team.competitions.map((comp, idx) => (
          <span 
            key={idx}
            className="px-2 py-1 rounded-md text-[10px] font-semibold bg-black/40 backdrop-blur-md border border-white/10 text-white/80"
          >
            {comp}
          </span>
        ))}
      </div>
    </div>
  );
};

// Composant article news - VERSION COMPACTE ET MODERNE
const NewsCard = ({ article }) => (
  <div className="news-card-compact group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300">
    <div className="flex gap-4 p-4">
      {/* Image à gauche */}
      <div className="news-image-container relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Contenu à droite */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
              {article.category}
            </span>
            <span className="text-white/40 text-xs">{article.date}</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1.5 line-clamp-2 group-hover:text-red-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-white/50 text-sm line-clamp-2">
            {article.excerpt}
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-red-400 font-semibold text-sm mt-2 group-hover:gap-2 transition-all">
          Lire <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

// Composant barre sponsors
const SponsorBar = () => {
  const sponsors = [
    { name: 'Red Bull', logo: '🐂' },
    { name: 'Razer', logo: '🖱️' },
    { name: 'Logitech', logo: '⌨️' },
    { name: 'Discord', logo: '💬' },
    { name: 'Twitch', logo: '📺' },
    { name: 'Intel', logo: '💻' },
    { name: 'NVIDIA', logo: '🎮' },
    { name: 'HyperX', logo: '🎧' },
  ];

  return (
    <div className="sponsor-bar relative overflow-hidden bg-black/40 backdrop-blur-xl border-t border-white/10 py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>
      <div className="text-center mb-4">
        <h3 className="text-white/40 text-sm uppercase tracking-wider font-semibold">Nos partenaires</h3>
      </div>
      <div className="sponsor-scroll flex gap-12 items-center">
        {[...sponsors, ...sponsors].map((sponsor, idx) => (
          <div 
            key={idx}
            className="sponsor-item flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
          >
            <span className="text-3xl">{sponsor.logo}</span>
            <span className="text-white/70 font-semibold whitespace-nowrap">{sponsor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant principal
const Teams = () => {
  const teams = [
    {
      id: 'flux',
      name: 'FLUX',
      rank: 'Master',
      league: 'Flux Ignition',
      record: '28-14',
      winrate: 67,
      color: '#ff6b35',
      icon: <Flame className="w-6 h-6 text-white" />,
      competitions: ['#1 Prime League', '#2 Duel Virtuel']
    },
    {
      id: 'mymetic',
      name: 'MYMETIC',
      rank: 'Master',
      league: 'Shadows We Strike',
      record: '26-15',
      winrate: 63,
      color: '#1a1a1a',
      icon: <Shield className="w-6 h-6 text-white" />,
      competitions: ['#2 Prime League', '#1 Nexus Tour']
    },
    {
      id: 'froznlegion',
      name: "FROZ'NLÉGION",
      rank: 'Low Master',
      league: 'Frost Guardians',
      record: '24-16',
      winrate: 60,
      color: '#ffffff',
      icon: <Snowflake className="w-6 h-6 text-gray-900" />,
      competitions: ['#3 Prime League']
    },
    {
      id: 'mount-x',
      name: 'MOUNT X',
      rank: 'High Diamond',
      league: 'Paris Performance',
      record: '22-13',
      winrate: 63,
      color: '#10b981',
      icon: <Zap className="w-6 h-6 text-white" />,
      competitions: ['#1 Nexus Tour']
    },
    {
      id: 'visionary',
      name: 'VISIONARY',
      rank: 'Diamond',
      league: 'Arcane Vision',
      record: '20-15',
      winrate: 57,
      color: '#8b5cf6',
      icon: <Eye className="w-6 h-6 text-white" />,
      competitions: ['#3 Duel Virtuel']
    },
    {
      id: 'team',
      name: 'TEAM',
      rank: 'Diamond',
      league: 'Never Look Back',
      record: '18-17',
      winrate: 51,
      color: '#fbbf24',
      icon: <Star className="w-6 h-6 text-white" />,
      competitions: ['#2 Elven League']
    },
    {
      id: 'legendary',
      name: 'LEGENDARY',
      rank: 'Diamond',
      league: 'Legends Never Die',
      record: '16-19',
      winrate: 46,
      color: '#3b82f6',
      icon: <Trophy className="w-6 h-6 text-white" />,
      competitions: ['#4 Duel Virtuel']
    }
  ];

  const news = [
    {
      category: 'VICTOIRE',
      title: 'Mount X remporte le Nexus Tour !',
      excerpt: 'Une performance exceptionnelle face aux meilleurs équipes européennes.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      date: '5 Fév 2026'
    },
    {
      category: 'ROSTER',
      title: 'Nouveau joueur rejoint FLUX',
      excerpt: 'FlameWave (ex-G2) signe pour renforcer la mid lane.',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      date: '3 Fév 2026'
    },
    {
      category: 'ÉVÉNEMENT',
      title: 'Prochaine compétition : Duel Virtuel',
      excerpt: 'Nos 4 équipes qualifiées pour les playoffs ce weekend.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      date: '1 Fév 2026'
    }
  ];

  return (
    <div className="teams-page min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="hero-section relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent">
            NOS ÉQUIPES
          </h1>
          <p className="text-white/60 text-lg">
            7 équipes, 35 joueurs, une seule passion
          </p>
        </div>
      </div>

      {/* Grille d'équipes */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      {/* Section News - VERSION COMPACTE */}
      <div className="news-section bg-black/20 backdrop-blur-xl border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-1">
                DERNIÈRES ACTUALITÉS
              </h2>
              <p className="text-white/50 text-sm">Restez informé de nos performances</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-semibold text-sm hover:bg-red-500/30 transition-all">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {news.map((article, idx) => (
              <NewsCard key={idx} article={article} />
            ))}
          </div>
        </div>
      </div>

      {/* Barre sponsors */}
      <SponsorBar />

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .sponsor-scroll {
          animation: scroll 30s linear infinite;
        }

        .sponsor-scroll:hover {
          animation-play-state: paused;
        }

        .team-card:hover .player-row {
          transform: translateX(4px);
        }

        .news-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #ef4444, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .news-card:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Teams;
