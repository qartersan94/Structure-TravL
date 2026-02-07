const TEAMS = [
  {
    id: 'flux',
    name: 'FLUX',
    logo: '🔥',
    color: '#ff9966',
    rank: 'Master 350LP',
    globalStats: {
      totalWins: 45,
      totalLosses: 23,
      winRate: 66
    },
    competitions: [
      { name: 'Prime League', position: 2, points: 245, wins: 18, losses: 7 },
      { name: 'LFL Division 2', position: 1, points: 312, wins: 22, losses: 10 },
      { name: 'Coupe de France', position: 3, points: 189, wins: 12, losses: 6 }
    ]
  },
  {
    id: 'mymetic',
    name: 'MymétiC',
    logo: '🛡️',
    color: '#cccccc',
    rank: 'Master 280LP',
    globalStats: {
      totalWins: 38,
      totalLosses: 27,
      winRate: 58
    },
    competitions: [
      { name: 'Prime League', position: 4, points: 198, wins: 15, losses: 9 },
      { name: 'LFL Division 2', position: 3, points: 234, wins: 19, losses: 12 },
      { name: 'Coupe de France', position: 5, points: 145, wins: 10, losses: 8 }
    ]
  },
  {
    id: 'froznlegion',
    name: "Froz'nLégion",
    logo: '❄️',
    color: '#e8e8e8',
    rank: 'Diamond 1 95LP',
    globalStats: {
      totalWins: 42,
      totalLosses: 25,
      winRate: 63
    },
    competitions: [
      { name: 'Prime League', position: 3, points: 223, wins: 17, losses: 8 },
      { name: 'LFL Division 2', position: 2, points: 267, wins: 21, losses: 11 },
      { name: 'Coupe de France', position: 4, points: 167, wins: 11, losses: 7 }
    ]
  },
  {
    id: 'mount-x',
    name: 'MOUNT X',
    logo: '⚡',
    color: '#33ff99',
    rank: 'Diamond 1 60LP',
    globalStats: {
      totalWins: 35,
      totalLosses: 30,
      winRate: 54
    },
    competitions: [
      { name: 'Prime League', position: 6, points: 176, wins: 13, losses: 11 },
      { name: 'LFL Division 2', position: 5, points: 201, wins: 17, losses: 13 },
      { name: 'Coupe de France', position: 7, points: 123, wins: 9, losses: 9 }
    ]
  },
  {
    id: 'visionary',
    name: 'VISIONARY',
    logo: '👁️',
    color: '#bb99ff',
    rank: 'Diamond 2 40LP',
    globalStats: {
      totalWins: 33,
      totalLosses: 32,
      winRate: 51
    },
    competitions: [
      { name: 'Prime League', position: 7, points: 158, wins: 12, losses: 12 },
      { name: 'LFL Division 2', position: 6, points: 189, wins: 16, losses: 14 },
      { name: 'Coupe de France', position: 6, points: 134, wins: 10, losses: 10 }
    ]
  },
  {
    id: 'team',
    name: 'TEAM',
    logo: '⭐',
    color: '#ffdd66',
    rank: 'Diamond 3 75LP',
    globalStats: {
      totalWins: 29,
      totalLosses: 36,
      winRate: 45
    },
    competitions: [
      { name: 'Prime League', position: 8, points: 142, wins: 11, losses: 13 },
      { name: 'LFL Division 2', position: 8, points: 167, wins: 14, losses: 16 },
      { name: 'Coupe de France', position: 9, points: 98, wins: 7, losses: 11 }
    ]
  },
  {
    id: 'legendary',
    name: 'LEGENDARY',
    logo: '🏆',
    color: '#66b3ff',
    rank: 'Diamond 3 50LP',
    globalStats: {
      totalWins: 27,
      totalLosses: 38,
      winRate: 42
    },
    competitions: [
      { name: 'Prime League', position: 9, points: 128, wins: 10, losses: 14 },
      { name: 'LFL Division 2', position: 7, points: 156, wins: 13, losses: 17 },
      { name: 'Coupe de France', position: 8, points: 112, wins: 8, losses: 12 }
    ]
  }
];

export default TEAMS;
