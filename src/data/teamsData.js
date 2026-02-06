// teamsData.js - COULEURS OPTIMISÉES POUR VISIBILITÉ MAXIMALE

export const TEAMS = [
  {
    id: 'flux',
    name: 'FLUX',
    rank: 'Master',
    league: 'Flux Ignition',
    color: '#ff9966', // Orange lumineux - TOUJOURS VISIBLE
    logo: '🔥',
    globalStats: {
      totalWins: 28,
      totalLosses: 14,
      winRate: 67
    },
    competitions: [
      { name: 'Prime League', position: 1, points: 145, wins: 15, losses: 3 },
      { name: 'Duel Virtuel', position: 2, points: 98, wins: 13, losses: 11 }
    ]
  },
  {
    id: 'mymetic',
    name: 'MymétiC',
    rank: 'Master',
    league: 'Shadows We Strike',
    color: '#cccccc', // Gris très clair - TOUJOURS VISIBLE
    logo: '🛡️',
    globalStats: {
      totalWins: 26,
      totalLosses: 15,
      winRate: 63
    },
    competitions: [
      { name: 'Prime League', position: 2, points: 132, wins: 14, losses: 5 },
      { name: 'Nexus Tour', position: 1, points: 110, wins: 12, losses: 10 }
    ]
  },
  {
    id: 'froznlegion',
    name: "Froz'nLégion",
    rank: 'Low Master',
    league: 'Frost Guardians',
    color: '#e8e8e8', // Blanc grisé - TOUJOURS VISIBLE
    logo: '❄️',
    globalStats: {
      totalWins: 24,
      totalLosses: 16,
      winRate: 60
    },
    competitions: [
      { name: 'Prime League', position: 3, points: 118, wins: 13, losses: 7 }
    ]
  },
  {
    id: 'mount-x',
    name: 'MOUNT X',
    rank: 'High Diamond',
    league: 'Paris Performance',
    color: '#33ff99', // Vert très lumineux - TOUJOURS VISIBLE
    logo: '⚡',
    globalStats: {
      totalWins: 22,
      totalLosses: 13,
      winRate: 63
    },
    competitions: [
      { name: 'Nexus Tour', position: 1, points: 105, wins: 12, losses: 8 }
    ]
  },
  {
    id: 'visionary',
    name: 'VISIONARY',
    rank: 'Diamond',
    league: 'Arcane Vision',
    color: '#bb99ff', // Violet lumineux - TOUJOURS VISIBLE
    logo: '👁️',
    globalStats: {
      totalWins: 20,
      totalLosses: 15,
      winRate: 57
    },
    competitions: [
      { name: 'Duel Virtuel', position: 3, points: 87, wins: 10, losses: 12 }
    ]
  },
  {
    id: 'team',
    name: 'TEAM',
    rank: 'Diamond',
    league: 'Never Look Back',
    color: '#ffdd66', // Jaune très lumineux - TOUJOURS VISIBLE
    logo: '⭐',
    globalStats: {
      totalWins: 18,
      totalLosses: 17,
      winRate: 51
    },
    competitions: [
      { name: 'Elven League', position: 2, points: 76, wins: 9, losses: 8 }
    ]
  },
  {
    id: 'legendary',
    name: 'LEGENDARY',
    rank: 'Diamond',
    league: 'Legends Never Die',
    color: '#66b3ff', // Bleu lumineux - TOUJOURS VISIBLE
    logo: '🏆',
    globalStats: {
      totalWins: 16,
      totalLosses: 19,
      winRate: 46
    },
    competitions: [
      { name: 'Duel Virtuel', position: 4, points: 65, wins: 8, losses: 11 }
    ]
  }
];

// Helper pour récupérer une équipe par ID
export const getTeamById = (teamId) => {
  return TEAMS.find(team => team.id === teamId);
};

// Helper pour récupérer toutes les équipes d'un certain rang
export const getTeamsByRank = (rank) => {
  return TEAMS.filter(team => team.rank === rank);
};

// Helper pour calculer les stats globales
export const getGlobalStats = () => {
  const totalGames = TEAMS.reduce((sum, team) => 
    sum + team.globalStats.totalWins + team.globalStats.totalLosses, 0
  );
  
  const totalWins = TEAMS.reduce((sum, team) => 
    sum + team.globalStats.totalWins, 0
  );
  
  const globalWinrate = Math.round((totalWins / totalGames) * 100);
  
  return {
    totalTeams: TEAMS.length,
    totalGames,
    totalWins,
    globalWinrate
  };
};

export default TEAMS;
