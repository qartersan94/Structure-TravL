// teamsData.js - Données des équipes Structure TravL

export const teamsData = [
  {
    id: 'flux',
    name: 'FLUX',
    rank: 'Master',
    league: 'Flux Ignition',
    record: '28-14',
    winrate: 67,
    color: '#ff6b35', // Orange
    iconName: 'Flame',
    competitions: ['#1 Prime League', '#2 Duel Virtuel']
  },
  {
    id: 'mymetic',
    name: 'MYMETIC',
    rank: 'Master',
    league: 'Shadows We Strike',
    record: '26-15',
    winrate: 63,
    color: '#1a1a1a', // Noir
    textColor: '#ffffff', // Blanc pour le texte
    iconName: 'Shield',
    competitions: ['#2 Prime League', '#1 Nexus Tour']
  },
  {
    id: 'froznlegion',
    name: "FROZ'NLÉGION",
    rank: 'Low Master',
    league: 'Frost Guardians',
    record: '24-16',
    winrate: 60,
    color: '#ffffff', // Blanc
    textColor: '#1a1a1a', // Noir pour le texte
    iconName: 'Snowflake',
    competitions: ['#3 Prime League']
  },
  {
    id: 'mount-x',
    name: 'MOUNT X',
    rank: 'High Diamond',
    league: 'Paris Performance',
    record: '22-13',
    winrate: 63,
    color: '#10b981', // Vert
    iconName: 'Zap',
    competitions: ['#1 Nexus Tour']
  },
  {
    id: 'visionary',
    name: 'VISIONARY',
    rank: 'Diamond',
    league: 'Arcane Vision',
    record: '20-15',
    winrate: 57,
    color: '#8b5cf6', // Violet
    iconName: 'Eye',
    competitions: ['#3 Duel Virtuel']
  },
  {
    id: 'team',
    name: 'TEAM',
    rank: 'Diamond',
    league: 'Never Look Back',
    record: '18-17',
    winrate: 51,
    color: '#fbbf24', // Jaune/Or
    iconName: 'Star',
    competitions: ['#2 Elven League']
  },
  {
    id: 'legendary',
    name: 'LEGENDARY',
    rank: 'Diamond',
    league: 'Legends Never Die',
    record: '16-19',
    winrate: 46,
    color: '#3b82f6', // Bleu
    iconName: 'Trophy',
    competitions: ['#4 Duel Virtuel']
  }
];

// Helper pour récupérer une équipe par ID
export const getTeamById = (teamId) => {
  return teamsData.find(team => team.id === teamId);
};

// Helper pour récupérer toutes les équipes d'un certain rang
export const getTeamsByRank = (rank) => {
  return teamsData.filter(team => team.rank === rank);
};

// Helper pour calculer les stats globales
export const getGlobalStats = () => {
  const totalGames = teamsData.reduce((sum, team) => {
    const [wins, losses] = team.record.split('-').map(Number);
    return sum + wins + losses;
  }, 0);
  
  const totalWins = teamsData.reduce((sum, team) => {
    const [wins] = team.record.split('-').map(Number);
    return sum + wins;
  }, 0);
  
  const globalWinrate = Math.round((totalWins / totalGames) * 100);
  
  return {
    totalTeams: teamsData.length,
    totalGames,
    totalWins,
    globalWinrate
  };
};

export default teamsData;
