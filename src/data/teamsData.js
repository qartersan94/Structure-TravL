// 🎮 STRUCTURE TRAVL — Configuration des Équipes
// Stats reset à 0 | Rosters vides — joueurs ajoutés via Dashboard après création de compte

export const COMPETITIONS = {
  NEXUS_TOUR: { id: 'nexus_tour', name: 'Nexus Tour', season: 'Saison 2026', logo: '🏆', format: 'BO3', region: 'France', prizePool: '50,000€' },
  OUATVENTURE: { id: 'ouatventure', name: "Ouat'venture", season: 'Split 1', logo: '⚔️', format: 'BO1', region: 'Francophone', prizePool: '25,000€' },
  PRIME_LEAGUE: { id: 'prime_league', name: 'Prime League', season: 'Division 1', logo: '👑', format: 'BO3', region: 'Europe', prizePool: '100,000€' }
};

export const TEAMS = [
  {
    id: 1, name: 'Mount X', shortName: 'MNT', rank: 'Master+',
    color: '#00FF88', secondaryColor: '#00CC6A',
    gradient: 'from-green-400 via-emerald-500 to-green-600',
    glowColor: 'rgba(0, 255, 136, 0.5)',
    logo: '⚡', motto: 'Peak Performance',
    description: 'Équipe Master spécialisée dans les stratégies agressives.',
    competitions: [{ name: 'Nexus Tour', division: 'Division Master', wins: 0, losses: 0, position: 1, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@MountX_Esports' }, sponsors: [], matchHistory: []
  },
  {
    id: 2, name: 'Flux', shortName: 'FLX', rank: 'Diamond',
    color: '#FF6B35', secondaryColor: '#FF8C42',
    gradient: 'from-orange-500 via-red-500 to-orange-600',
    glowColor: 'rgba(255, 107, 53, 0.5)',
    logo: '🔥', motto: 'Constant Evolution',
    description: 'Masters de l\'adaptation, Flux excelle dans les team fights.',
    competitions: [{ name: 'Nexus Tour', division: 'Division Master', wins: 0, losses: 0, position: 2, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@Flux_Esports' }, sponsors: [], matchHistory: []
  },
  {
    id: 3, name: "Froz'nLéGion", shortName: 'FRZ', rank: 'Diamond',
    color: '#00BFFF', secondaryColor: '#00A8E0',
    gradient: 'from-cyan-400 via-sky-500 to-cyan-600',
    glowColor: 'rgba(0, 191, 255, 0.5)',
    logo: '❄️', motto: 'Cold. Calculated. Victorious.',
    description: 'Précision glaciale et exécution parfaite.',
    competitions: [{ name: 'Nexus Tour', division: 'Division Master', wins: 0, losses: 0, position: 3, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@FroznLegion' }, sponsors: [], matchHistory: []
  },
  {
    id: 4, name: 'VisionaRY', shortName: 'VSN', rank: 'High Diamond',
    color: '#9D4EDD', secondaryColor: '#B185DB',
    gradient: 'from-purple-600 via-violet-600 to-purple-700',
    glowColor: 'rgba(157, 78, 221, 0.5)',
    logo: '👁️', motto: 'See Beyond Victory',
    description: 'Vision map parfaite et anticipation.',
    competitions: [{ name: "Ouat'venture", division: 'Division High Diamond', wins: 0, losses: 0, position: 3, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@VisionaRY_GG' }, sponsors: [], matchHistory: []
  },
  {
    id: 5, name: 'MymétiC', shortName: 'MYM', rank: 'Diamond',
    color: '#FF1493', secondaryColor: '#FF69B4',
    gradient: 'from-pink-600 via-rose-600 to-pink-700',
    glowColor: 'rgba(255, 20, 147, 0.5)',
    logo: '🌑', motto: 'From Shadows, We Strike',
    description: 'Maîtres de l\'adaptation.',
    competitions: [{ name: 'Nexus Tour', division: 'Division High Diamond', wins: 0, losses: 0, position: 5, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@Mymetic_Esports' }, sponsors: [], matchHistory: []
  },
  {
    id: 6, name: 'Team', shortName: 'TEAM', rank: 'Diamond',
    color: '#FFD700', secondaryColor: '#FFC300',
    gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
    glowColor: 'rgba(255, 215, 0, 0.5)',
    logo: '⭐', motto: 'Together We Rise',
    description: 'Synergie parfaite et esprit d\'équipe inégalé.',
    competitions: [{ name: 'Prime League', division: 'Division 2', wins: 0, losses: 0, position: 6, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@Team_Esports' }, sponsors: [], matchHistory: []
  },
  {
    id: 7, name: 'LeGendaRY', shortName: 'LGD', rank: 'Diamond',
    color: '#4169E1', secondaryColor: '#5B8DEE',
    gradient: 'from-blue-600 via-indigo-600 to-blue-700',
    glowColor: 'rgba(65, 105, 225, 0.5)',
    logo: '⚔️', motto: 'Legends Never Die',
    description: 'Nouveaux venus prometteurs avec un potentiel illimité.',
    competitions: [{ name: "Ouat'venture", division: 'Division Diamond', wins: 0, losses: 0, position: 7, points: 0, lastResults: [] }],
    roster: [],
    globalStats: { totalGames: 0, totalWins: 0, totalLosses: 0, winRate: 0 },
    achievements: [], socialMedia: { twitter: '@LeGendaRY_LoL' }, sponsors: [], matchHistory: []
  }
];

export const getTeamById = (id) => TEAMS.find(team => team.id === id);
export const getTeamByName = (name) => TEAMS.find(team => team.name === name);
export const getTeamsByRank = (rank) => TEAMS.filter(team => team.rank === rank);
export default { TEAMS, COMPETITIONS, getTeamById, getTeamByName, getTeamsByRank };
