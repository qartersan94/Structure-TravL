const TEAMS = [
  {
    id: 'flux',
    name: 'FLUX',
    logo: '🔥',
    color: '#ff9966',
    rank: 'Master 350LP',
    roster: [
      { id: 1, name: 'FluxTop', role: 'Top', kda: '3.2', status: 'online' },
      { id: 2, name: 'FluxJungle', role: 'Jungle', kda: '4.1', status: 'online' },
      { id: 3, name: 'FluxMid', role: 'Mid', kda: '5.8', status: 'online' },
      { id: 4, name: 'FluxADC', role: 'ADC', kda: '6.2', status: 'online' },
      { id: 5, name: 'FluxSupport', role: 'Support', kda: '2.9', status: 'offline' }
    ],
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
    roster: [
      { id: 6, name: 'MymeTop', role: 'Top', kda: '2.8', status: 'online' },
      { id: 7, name: 'MymeJungle', role: 'Jungle', kda: '3.5', status: 'online' },
      { id: 8, name: 'MymeMid', role: 'Mid', kda: '4.9', status: 'online' },
      { id: 9, name: 'MymeADC', role: 'ADC', kda: '5.1', status: 'offline' },
      { id: 10, name: 'MymeSupport', role: 'Support', kda: '2.3', status: 'online' }
    ],
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
    roster: [
      { id: 11, name: 'FrozenTop', role: 'Top', kda: '3.1', status: 'online' },
      { id: 12, name: 'FrozenJungle', role: 'Jungle', kda: '3.8', status: 'online' },
      { id: 13, name: 'FrozenMid', role: 'Mid', kda: '5.2', status: 'online' },
      { id: 14, name: 'FrozenADC', role: 'ADC', kda: '5.7', status: 'online' },
      { id: 15, name: 'FrozenSupport', role: 'Support', kda: '2.6', status: 'offline' }
    ],
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
    roster: [
      { id: 16, name: 'MountXTop', role: 'Top', kda: '2.9', status: 'online' },
      { id: 17, name: 'MountXJungle', role: 'Jungle', kda: '3.3', status: 'online' },
      { id: 18, name: 'MountXMid', role: 'Mid', kda: '4.6', status: 'offline' },
      { id: 19, name: 'MountXADC', role: 'ADC', kda: '4.9', status: 'online' },
      { id: 20, name: 'MountXSupport', role: 'Support', kda: '2.2', status: 'online' }
    ],
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
    roster: [
      { id: 21, name: 'VisionTop', role: 'Top', kda: '2.7', status: 'online' },
      { id: 22, name: 'VisionJungle', role: 'Jungle', kda: '3.1', status: 'offline' },
      { id: 23, name: 'VisionMid', role: 'Mid', kda: '4.3', status: 'online' },
      { id: 24, name: 'VisionADC', role: 'ADC', kda: '4.5', status: 'online' },
      { id: 25, name: 'VisionSupport', role: 'Support', kda: '2.1', status: 'online' }
    ],
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
    roster: [
      { id: 26, name: 'TeamTop', role: 'Top', kda: '2.5', status: 'online' },
      { id: 27, name: 'TeamJungle', role: 'Jungle', kda: '2.9', status: 'online' },
      { id: 28, name: 'TeamMid', role: 'Mid', kda: '3.8', status: 'offline' },
      { id: 29, name: 'TeamADC', role: 'ADC', kda: '4.2', status: 'online' },
      { id: 30, name: 'TeamSupport', role: 'Support', kda: '1.9', status: 'online' }
    ],
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
    roster: [
      { id: 31, name: 'LegTop', role: 'Top', kda: '2.4', status: 'offline' },
      { id: 32, name: 'LegJungle', role: 'Jungle', kda: '2.8', status: 'online' },
      { id: 33, name: 'LegMid', role: 'Mid', kda: '3.6', status: 'online' },
      { id: 34, name: 'LegADC', role: 'ADC', kda: '4.0', status: 'online' },
      { id: 35, name: 'LegSupport', role: 'Support', kda: '1.8', status: 'online' }
    ],
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
