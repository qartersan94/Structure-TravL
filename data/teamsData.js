// 🎮 ESPORTS ARENA - Configuration des Équipes
// Fichier de données centralisé pour toutes les équipes

export const COMPETITIONS = {
  NEXUS_TOUR: {
    id: 'nexus_tour',
    name: 'Nexus Tour',
    season: 'Saison 2026',
    logo: '🏆',
    format: 'BO3',
    region: 'France',
    prizePool: '50,000€',
    startDate: '2026-01-15',
    endDate: '2026-06-30'
  },
  OUATVENTURE: {
    id: 'ouatventure',
    name: "Ouat'venture",
    season: 'Split 1',
    logo: '⚔️',
    format: 'BO1',
    region: 'Francophone',
    prizePool: '25,000€',
    startDate: '2026-02-01',
    endDate: '2026-05-15'
  },
  PRIME_LEAGUE: {
    id: 'prime_league',
    name: 'Prime League',
    season: 'Division 1',
    logo: '👑',
    format: 'BO3',
    region: 'Europe',
    prizePool: '100,000€',
    startDate: '2026-01-20',
    endDate: '2026-07-30'
  }
};

export const TEAMS = [
  {
    // ========== ÉQUIPE 1 : MOUNT X ==========
    id: 1,
    name: 'Mount X',
    shortName: 'MNT',
    rank: 'Master',
    color: '#00FF88',
    secondaryColor: '#00CC6A',
    gradient: 'from-green-400 via-emerald-500 to-green-600',
    glowColor: 'rgba(0, 255, 136, 0.5)',
    
    logo: '⚡',
    motto: 'Peak Performance',
    description: 'Équipe Master spécialisée dans les stratégies agressives et les rotations parfaites.',
    
    competitions: [
      {
        name: COMPETITIONS.NEXUS_TOUR.name,
        division: 'Division Master',
        wins: 15,
        losses: 3,
        position: 1,
        points: 45,
        lastResults: ['W', 'W', 'W', 'L', 'W']
      },
      {
        name: COMPETITIONS.OUATVENTURE.name,
        division: 'Elite',
        wins: 12,
        losses: 5,
        position: 2,
        points: 36,
        lastResults: ['W', 'L', 'W', 'W', 'W']
      }
    ],
    
    roster: [
      {
        role: 'Top',
        pseudo: 'MountainKing',
        realName: 'Alexandre Martin',
        age: 22,
        nationality: 'FR',
        mainChampions: ['Aatrox', 'K\'Sante', 'Gnar'],
        kda: 3.8,
        games: 45,
        winRate: 67,
      },
      {
        role: 'Jungle',
        pseudo: 'XPredator',
        realName: 'Lucas Dubois',
        age: 21,
        nationality: 'FR',
        mainChampions: ['Lee Sin', 'Viego', 'Jarvan IV'],
        kda: 4.2,
        games: 45,
        winRate: 71,
      },
      {
        role: 'Mid',
        pseudo: 'NexusCore',
        realName: 'Thomas Leclerc',
        age: 20,
        nationality: 'FR',
        mainChampions: ['Azir', 'Orianna', 'Syndra'],
        kda: 5.1,
        games: 45,
        winRate: 73,
      },
      {
        role: 'ADC',
        pseudo: 'ArrowStorm',
        realName: 'Julien Moreau',
        age: 23,
        nationality: 'FR',
        mainChampions: ['Jinx', 'Aphelios', 'Kai\'Sa'],
        kda: 6.3,
        games: 45,
        winRate: 69,
      },
      {
        role: 'Support',
        pseudo: 'ShieldMaster',
        realName: 'Antoine Bernard',
        age: 24,
        nationality: 'FR',
        mainChampions: ['Thresh', 'Nautilus', 'Rakan'],
        kda: 3.5,
        games: 45,
        winRate: 67,
      }
    ],
    
    globalStats: {
      totalGames: 45,
      totalWins: 32,
      totalLosses: 13,
      winRate: 71,
      averageGameTime: '32:45',
      firstBloodRate: 68,
      firstTowerRate: 72,
      baronControlRate: 65,
      dragonControlRate: 70
    },
    
    achievements: [
      '🥇 Champion Nexus Tour Spring 2025',
      '🥈 2nd Place Ouat\'venture Summer 2025',
      '⭐ Team of the Month - Janvier 2026',
      '🏆 Best Early Game Team'
    ],
    
    socialMedia: {
      twitter: '@MountX_Esports',
      instagram: '@mountx.gg',
      discord: 'discord.gg/mountx',
    },
  },

  {
    // ========== ÉQUIPE 2 : FLUX ==========
    id: 2,
    name: 'Flux',
    shortName: 'FLX',
    rank: 'Master',
    color: '#FF6B35',
    secondaryColor: '#FF8C42',
    gradient: 'from-orange-500 via-red-500 to-orange-600',
    glowColor: 'rgba(255, 107, 53, 0.5)',
    
    logo: '🔥',
    motto: 'Constant Evolution',
    description: 'Masters de l\'adaptation, Flux excelle dans les team fights chaotiques.',
    
    competitions: [
      {
        name: COMPETITIONS.NEXUS_TOUR.name,
        division: 'Division Master',
        wins: 14,
        losses: 4,
        position: 2,
        points: 42,
        lastResults: ['L', 'W', 'W', 'W', 'L']
      }
    ],
    
    roster: [
      { role: 'Top', pseudo: 'FlameWave', realName: 'Marc Rousseau', age: 21, nationality: 'FR', mainChampions: ['Jax', 'Fiora', 'Camille'], kda: 3.9, games: 42, winRate: 65 },
      { role: 'Jungle', pseudo: 'TideBreaker', realName: 'Kevin Laurent', age: 22, nationality: 'BE', mainChampions: ['Graves', 'Nidalee', 'Kindred'], kda: 4.0, games: 42, winRate: 68 },
      { role: 'Mid', pseudo: 'StormCaller', realName: 'Emma Petit', age: 19, nationality: 'FR', mainChampions: ['Zoe', 'LeBlanc', 'Akali'], kda: 5.5, games: 42, winRate: 70 },
      { role: 'ADC', pseudo: 'VortexShot', realName: 'Louis Simon', age: 23, nationality: 'FR', mainChampions: ['Ezreal', 'Lucian', 'Zeri'], kda: 5.8, games: 42, winRate: 66 },
      { role: 'Support', pseudo: 'FlowGuard', realName: 'Nathan Moreau', age: 24, nationality: 'CH', mainChampions: ['Bard', 'Pyke', 'Karma'], kda: 3.2, games: 42, winRate: 65 }
    ],
    
    globalStats: {
      totalGames: 42,
      totalWins: 28,
      totalLosses: 14,
      winRate: 67,
      averageGameTime: '34:12',
    },
    
    achievements: [
      '🥇 Champion Ouat\'venture Spring 2025',
      '🥉 3rd Place Nexus Tour Summer 2025',
    ],
  },

  {
    // ========== ÉQUIPE 3 : FROZ'NLÉGION ==========
    id: 3,
    name: "Froz'nLéGion",
    shortName: 'FRZ',
    rank: 'Master',
    color: '#F0F0F0',
    secondaryColor: '#E0E0E0',
    gradient: 'from-gray-100 via-blue-100 to-gray-200',
    glowColor: 'rgba(240, 240, 240, 0.5)',
    textColor: '#1a1a1a',
    
    logo: '❄️',
    motto: 'Cold. Calculated. Victorious.',
    description: 'Précision glaciale et exécution parfaite.',
    
    competitions: [
      {
        name: COMPETITIONS.NEXUS_TOUR.name,
        division: 'Division Master',
        wins: 13,
        losses: 5,
        position: 3,
        points: 39,
        lastResults: ['W', 'W', 'L', 'W', 'L']
      }
    ],
    
    roster: [
      { role: 'Top', pseudo: 'IceBreaker', realName: 'Hugo Blanc', age: 22, nationality: 'FR', mainChampions: ['Ornn', 'Sion', 'Maokai'], kda: 3.2, games: 40, winRate: 63 },
      { role: 'Jungle', pseudo: 'FrostBite', realName: 'Maxime Legrand', age: 20, nationality: 'FR', mainChampions: ['Sejuani', 'Zac', 'Rammus'], kda: 3.8, games: 40, winRate: 65 },
      { role: 'Mid', pseudo: 'BlizzardMage', realName: 'Théo Mercier', age: 21, nationality: 'BE', mainChampions: ['Viktor', 'Kassadin', 'Ryze'], kda: 4.9, games: 40, winRate: 68 },
      { role: 'ADC', pseudo: 'ColdSniper', realName: 'Arthur Renaud', age: 23, nationality: 'FR', mainChampions: ['Ashe', 'Varus', 'Caitlyn'], kda: 5.2, games: 40, winRate: 64 },
      { role: 'Support', pseudo: 'GlacierWall', realName: 'Benjamin Roux', age: 25, nationality: 'CH', mainChampions: ['Braum', 'Alistar', 'Leona'], kda: 2.9, games: 40, winRate: 63 }
    ],
    
    globalStats: {
      totalGames: 40,
      totalWins: 26,
      totalLosses: 14,
      winRate: 65,
      averageGameTime: '36:30',
    },
    
    achievements: [
      '🥈 Runner-up Nexus Tour Spring 2025',
      '🛡️ Best Defensive Team'
    ],
  },

  {
    // ========== ÉQUIPE 4 : VISIONARY ==========
    id: 4,
    name: 'VisionaRY',
    shortName: 'VSN',
    rank: 'High Diamond',
    color: '#9D4EDD',
    secondaryColor: '#B185DB',
    gradient: 'from-purple-600 via-violet-600 to-purple-700',
    glowColor: 'rgba(157, 78, 221, 0.5)',
    
    logo: '👁️',
    motto: 'See Beyond Victory',
    description: 'Vision map parfaite et anticipation.',
    
    competitions: [
      {
        name: COMPETITIONS.OUATVENTURE.name,
        division: 'Division High Diamond',
        wins: 11,
        losses: 6,
        position: 3,
        points: 33,
        lastResults: ['W', 'W', 'W', 'L', 'W']
      }
    ],
    
    roster: [
      { role: 'Top', pseudo: 'SeerTop', realName: 'Raphaël Dumont', age: 20, nationality: 'FR', mainChampions: ['Kennen', 'Jayce', 'Gangplank'], kda: 3.5, games: 38, winRate: 61 },
      { role: 'Jungle', pseudo: 'OracleJG', realName: 'Dylan Faure', age: 21, nationality: 'FR', mainChampions: ['Elise', 'Rek\'Sai', 'Nocturne'], kda: 3.7, games: 38, winRate: 63 },
      { role: 'Mid', pseudo: 'ProphetMid', realName: 'Gabriel Fontaine', age: 19, nationality: 'FR', mainChampions: ['Twisted Fate', 'Galio', 'Taliyah'], kda: 4.3, games: 38, winRate: 65 },
      { role: 'ADC', pseudo: 'EagleEye', realName: 'Lucas Girard', age: 22, nationality: 'BE', mainChampions: ['Xayah', 'Jhin', 'Miss Fortune'], kda: 4.8, games: 38, winRate: 60 },
      { role: 'Support', pseudo: 'WatcherSup', realName: 'Tom Chevalier', age: 23, nationality: 'FR', mainChampions: ['Janna', 'Lulu', 'Yuumi'], kda: 3.1, games: 38, winRate: 61 }
    ],
    
    globalStats: {
      totalGames: 38,
      totalWins: 23,
      totalLosses: 15,
      winRate: 61,
      averageGameTime: '33:15',
    },
    
    achievements: [
      '🔮 Best Vision Score Team',
    ],
  },

  {
    // ========== ÉQUIPE 5 : MYMETIC ==========
    id: 5,
    name: 'MymétiC',
    shortName: 'MYM',
    rank: 'High Diamond',
    color: '#1C1C1C',
    secondaryColor: '#2D2D2D',
    gradient: 'from-gray-900 via-black to-gray-800',
    glowColor: 'rgba(28, 28, 28, 0.5)',
    
    logo: '🌑',
    motto: 'From Shadows, We Strike',
    description: 'Maîtres de l\'adaptation.',
    
    competitions: [
      {
        name: COMPETITIONS.NEXUS_TOUR.name,
        division: 'Division High Diamond',
        wins: 10,
        losses: 7,
        position: 5,
        points: 30,
        lastResults: ['L', 'W', 'L', 'W', 'W']
      }
    ],
    
    roster: [
      { role: 'Top', pseudo: 'ShadowClone', realName: 'Nicolas Leroux', age: 21, nationality: 'FR', mainChampions: ['Akshan', 'Sylas', 'Renekton'], kda: 3.3, games: 36, winRate: 58 },
      { role: 'Jungle', pseudo: 'PhantomJG', realName: 'Mathieu Roy', age: 22, nationality: 'FR', mainChampions: ['Kha\'Zix', 'Shaco', 'Evelynn'], kda: 3.6, games: 36, winRate: 60 },
      { role: 'Mid', pseudo: 'MirrorMage', realName: 'Bastien Caron', age: 20, nationality: 'BE', mainChampions: ['Sylas', 'Vex', 'Neeko'], kda: 4.1, games: 36, winRate: 59 },
      { role: 'ADC', pseudo: 'EchoShot', realName: 'Clément Barbier', age: 23, nationality: 'FR', mainChampions: ['Samira', 'Draven', 'Yasuo'], kda: 4.5, games: 36, winRate: 57 },
      { role: 'Support', pseudo: 'VoidWalker', realName: 'Olivier Renard', age: 24, nationality: 'CH', mainChampions: ['Senna', 'Zilean', 'Morgana'], kda: 2.8, games: 36, winRate: 58 }
    ],
    
    globalStats: {
      totalGames: 36,
      totalWins: 21,
      totalLosses: 15,
      winRate: 58,
      averageGameTime: '31:45',
    },
    
    achievements: [
      '🎭 Most Unpredictable Team',
    ],
  },

  {
    // ========== ÉQUIPE 6 : TEAM ==========
    id: 6,
    name: 'Team',
    shortName: 'TEAM',
    rank: 'Diamond',
    color: '#FFD700',
    secondaryColor: '#FFC300',
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    textColor: '#1a1a1a',
    
    logo: '⭐',
    motto: 'Together We Rise',
    description: 'Synergie parfaite.',
    
    competitions: [
      {
        name: COMPETITIONS.PRIME_LEAGUE.name,
        division: 'Division 2',
        wins: 9,
        losses: 8,
        position: 6,
        points: 27,
        lastResults: ['W', 'L', 'W', 'W', 'L']
      }
    ],
    
    roster: [
      { role: 'Top', pseudo: 'GoldenShield', realName: 'Victor Clement', age: 20, nationality: 'FR', mainChampions: ['Shen', 'Poppy', 'Malphite'], kda: 3.0, games: 34, winRate: 55 },
      { role: 'Jungle', pseudo: 'StarSeeker', realName: 'Florian Morel', age: 21, nationality: 'FR', mainChampions: ['Hecarim', 'Xin Zhao', 'Vi'], kda: 3.4, games: 34, winRate: 56 },
      { role: 'Mid', pseudo: 'SunBurst', realName: 'Simon Andre', age: 19, nationality: 'FR', mainChampions: ['Ahri', 'Yone', 'Yasuo'], kda: 3.9, games: 34, winRate: 54 },
      { role: 'ADC', pseudo: 'RadiantArrow', realName: 'Paul Blanc', age: 22, nationality: 'BE', mainChampions: ['Tristana', 'Sivir', 'Twitch'], kda: 4.2, games: 34, winRate: 53 },
      { role: 'Support', pseudo: 'LightBearer', realName: 'Etienne Garnier', age: 23, nationality: 'FR', mainChampions: ['Soraka', 'Nami', 'Taric'], kda: 2.7, games: 34, winRate: 55 }
    ],
    
    globalStats: {
      totalGames: 34,
      totalWins: 19,
      totalLosses: 15,
      winRate: 56,
      averageGameTime: '35:20',
    },
    
    achievements: [
      '🤝 Best Teamwork Award',
    ],
  },

  {
    // ========== ÉQUIPE 7 : LEGENDARY ==========
    id: 7,
    name: 'LeGendaRY',
    shortName: 'LGD',
    rank: 'Diamond',
    color: '#4169E1',
    secondaryColor: '#5B8DEE',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    glowColor: 'rgba(65, 105, 225, 0.5)',
    
    logo: '⚔️',
    motto: 'Legends Never Die',
    description: 'Nouveaux venus prometteurs.',
    
    competitions: [
      {
        name: COMPETITIONS.OUATVENTURE.name,
        division: 'Division Diamond',
        wins: 8,
        losses: 9,
        position: 7,
        points: 24,
        lastResults: ['L', 'L', 'W', 'W', 'L']
      }
    ],
    
    roster: [
      { role: 'Top', pseudo: 'LegacyTop', realName: 'Antoine Muller', age: 19, nationality: 'FR', mainChampions: ['Darius', 'Mordekaiser', 'Sett'], kda: 2.9, games: 32, winRate: 50 },
      { role: 'Jungle', pseudo: 'MythicJG', realName: 'Julien Roche', age: 20, nationality: 'FR', mainChampions: ['Warwick', 'Volibear', 'Udyr'], kda: 3.2, games: 32, winRate: 52 },
      { role: 'Mid', pseudo: 'EpicMage', realName: 'Mathis Fournier', age: 18, nationality: 'BE', mainChampions: ['Lux', 'Xerath', 'Vel\'Koz'], kda: 3.7, games: 32, winRate: 51 },
      { role: 'ADC', pseudo: 'HeroicShot', realName: 'Robin Lambert', age: 21, nationality: 'FR', mainChampions: ['Vayne', 'Kog\'Maw', 'Kalista'], kda: 4.0, games: 32, winRate: 49 },
      { role: 'Support', pseudo: 'GuardianAngel', realName: 'Maxence Dupont', age: 22, nationality: 'CH', mainChampions: ['Lux', 'Brand', 'Zyra'], kda: 2.6, games: 32, winRate: 50 }
    ],
    
    globalStats: {
      totalGames: 32,
      totalWins: 16,
      totalLosses: 16,
      winRate: 50,
      averageGameTime: '34:50',
    },
    
    achievements: [
      '🌟 Rising Stars Award',
    ],
  }
];

export const getTeamById = (id) => TEAMS.find(team => team.id === id);
export const getTeamByName = (name) => TEAMS.find(team => team.name === name);
export const getTeamsByRank = (rank) => TEAMS.filter(team => team.rank === rank);

export default {
  TEAMS,
  COMPETITIONS,
  getTeamById,
  getTeamByName,
  getTeamsByRank
};
