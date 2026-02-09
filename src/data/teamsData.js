const TEAMS = [
  {
    id: 'flux',
    name: 'FLUX',
    logo: '🔥',
    color: '#ff9966',
    rank: 'Master 350LP',
    roster: [
      { id: 1, name: 'FluxTop', role: 'Top', kda: '3.2', status: 'online', champions: ['Aatrox', 'Gwen'] },
      { id: 2, name: 'FluxJungle', role: 'Jungle', kda: '4.1', status: 'online', champions: ['Lee Sin', 'Graves'] },
      { id: 3, name: 'FluxMid', role: 'Mid', kda: '5.8', status: 'online', champions: ['Ahri', 'Syndra'] },
      { id: 4, name: 'FluxADC', role: 'ADC', kda: '6.2', status: 'online', champions: ['Jinx', 'Aphelios'] },
      { id: 5, name: 'FluxSupport', role: 'Support', kda: '2.9', status: 'offline', champions: ['Thresh', 'Nautilus'] },
      { id: 6, name: 'FluxSub1', role: 'Top', kda: '2.8', status: 'offline', champions: ['Ornn', 'Sion'] },
      { id: 7, name: 'FluxSub2', role: 'Jungle', kda: '3.5', status: 'online', champions: ['Nidalee', 'Elise'] },
      { id: 8, name: 'FluxSub3', role: 'Mid', kda: '4.2', status: 'offline', champions: ['Azir', 'Viktor'] }
    ],
    globalStats: {
      totalWins: 45,
      totalLosses: 23,
      winRate: 66,
      totalGames: 68
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
      { id: 9, name: 'MymeTop', role: 'Top', kda: '2.8', status: 'online', champions: ['Jax', 'Camille'] },
      { id: 10, name: 'MymeJungle', role: 'Jungle', kda: '3.5', status: 'online', champions: ['Viego', 'Jarvan'] },
      { id: 11, name: 'MymeMid', role: 'Mid', kda: '4.9', status: 'online', champions: ['Orianna', 'LeBlanc'] },
      { id: 12, name: 'MymeADC', role: 'ADC', kda: '5.1', status: 'offline', champions: ['Vayne', 'Kai\'Sa'] },
      { id: 13, name: 'MymeSupport', role: 'Support', kda: '2.3', status: 'online', champions: ['Leona', 'Braum'] },
      { id: 14, name: 'MymeSub1', role: 'Top', kda: '2.5', status: 'online', champions: ['Sett', 'Renekton'] },
      { id: 15, name: 'MymeSub2', role: 'ADC', kda: '4.7', status: 'offline', champions: ['Lucian', 'Ezreal'] },
      { id: 16, name: 'MymeSub3', role: 'Support', kda: '2.1', status: 'online', champions: ['Rakan', 'Alistar'] }
    ],
    globalStats: {
      totalWins: 38,
      totalLosses: 27,
      winRate: 58,
      totalGames: 65
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
      { id: 17, name: 'FrozenTop', role: 'Top', kda: '3.1', status: 'online', champions: ['K\'Sante', 'Gragas'] },
      { id: 18, name: 'FrozenJungle', role: 'Jungle', kda: '3.8', status: 'online', champions: ['Kindred', 'Diana'] },
      { id: 19, name: 'FrozenMid', role: 'Mid', kda: '5.2', status: 'online', champions: ['Sylas', 'Akali'] },
      { id: 20, name: 'FrozenADC', role: 'ADC', kda: '5.7', status: 'online', champions: ['Samira', 'Draven'] },
      { id: 21, name: 'FrozenSupport', role: 'Support', kda: '2.6', status: 'offline', champions: ['Lulu', 'Yuumi'] },
      { id: 22, name: 'FrozenSub1', role: 'Jungle', kda: '3.3', status: 'online', champions: ['Kha\'Zix', 'Rengar'] },
      { id: 23, name: 'FrozenSub2', role: 'Mid', kda: '4.8', status: 'offline', champions: ['Zed', 'Yasuo'] },
      { id: 24, name: 'FrozenSub3', role: 'ADC', kda: '5.0', status: 'online', champions: ['Ashe', 'Caitlyn'] }
    ],
    globalStats: {
      totalWins: 42,
      totalLosses: 25,
      winRate: 63,
      totalGames: 67
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
      { id: 25, name: 'MountXTop', role: 'Top', kda: '2.9', status: 'online', champions: ['Darius', 'Mordekaiser'] },
      { id: 26, name: 'MountXJungle', role: 'Jungle', kda: '3.3', status: 'online', champions: ['Hecarim', 'Nocturne'] },
      { id: 27, name: 'MountXMid', role: 'Mid', kda: '4.6', status: 'offline', champions: ['Twisted Fate', 'Galio'] },
      { id: 28, name: 'MountXADC', role: 'ADC', kda: '4.9', status: 'online', champions: ['Jhin', 'Miss Fortune'] },
      { id: 29, name: 'MountXSupport', role: 'Support', kda: '2.2', status: 'online', champions: ['Pyke', 'Bard'] },
      { id: 30, name: 'MountXSub1', role: 'Top', kda: '2.6', status: 'offline', champions: ['Malphite', 'Cho\'Gath'] },
      { id: 31, name: 'MountXSub2', role: 'Jungle', kda: '3.0', status: 'online', champions: ['Shyvana', 'Sejuani'] },
      { id: 32, name: 'MountXSub3', role: 'Support', kda: '2.0', status: 'online', champions: ['Blitzcrank', 'Senna'] }
    ],
    globalStats: {
      totalWins: 35,
      totalLosses: 30,
      winRate: 54,
      totalGames: 65
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
      { id: 33, name: 'VisionTop', role: 'Top', kda: '2.7', status: 'online', champions: ['Fiora', 'Irelia'] },
      { id: 34, name: 'VisionJungle', role: 'Jungle', kda: '3.1', status: 'offline', champions: ['Lillia', 'Evelynn'] },
      { id: 35, name: 'VisionMid', role: 'Mid', kda: '4.3', status: 'online', champions: ['Kassadin', 'Katarina'] },
      { id: 36, name: 'VisionADC', role: 'ADC', kda: '4.5', status: 'online', champions: ['Xayah', 'Tristana'] },
      { id: 37, name: 'VisionSupport', role: 'Support', kda: '2.1', status: 'online', champions: ['Karma', 'Soraka'] },
      { id: 38, name: 'VisionSub1', role: 'Mid', kda: '3.9', status: 'offline', champions: ['Vex', 'Neeko'] },
      { id: 39, name: 'VisionSub2', role: 'ADC', kda: '4.2', status: 'online', champions: ['Sivir', 'Varus'] },
      { id: 40, name: 'VisionSub3', role: 'Jungle', kda: '2.8', status: 'offline', champions: ['Rammus', 'Zac'] }
    ],
    globalStats: {
      totalWins: 33,
      totalLosses: 32,
      winRate: 51,
      totalGames: 65
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
      { id: 41, name: 'TeamTop', role: 'Top', kda: '2.5', status: 'online', champions: ['Shen', 'Poppy'] },
      { id: 42, name: 'TeamJungle', role: 'Jungle', kda: '2.9', status: 'online', champions: ['Amumu', 'Warwick'] },
      { id: 43, name: 'TeamMid', role: 'Mid', kda: '3.8', status: 'offline', champions: ['Annie', 'Lux'] },
      { id: 44, name: 'TeamADC', role: 'ADC', kda: '4.2', status: 'online', champions: ['Ziggs', 'Kog\'Maw'] },
      { id: 45, name: 'TeamSupport', role: 'Support', kda: '1.9', status: 'online', champions: ['Janna', 'Nami'] },
      { id: 46, name: 'TeamSub1', role: 'Top', kda: '2.3', status: 'offline', champions: ['Maokai', 'Volibear'] },
      { id: 47, name: 'TeamSub2', role: 'Mid', kda: '3.5', status: 'online', champions: ['Malzahar', 'Xerath'] },
      { id: 48, name: 'TeamSub3', role: 'ADC', kda: '3.9', status: 'offline', champions: ['Twitch', 'Kalista'] }
    ],
    globalStats: {
      totalWins: 29,
      totalLosses: 36,
      winRate: 45,
      totalGames: 65
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
      { id: 49, name: 'LegTop', role: 'Top', kda: '2.4', status: 'offline', champions: ['Garen', 'Nasus'] },
      { id: 50, name: 'LegJungle', role: 'Jungle', kda: '2.8', status: 'online', champions: ['Master Yi', 'Udyr'] },
      { id: 51, name: 'LegMid', role: 'Mid', kda: '3.6', status: 'online', champions: ['Veigar', 'Brand'] },
      { id: 52, name: 'LegADC', role: 'ADC', kda: '4.0', status: 'online', champions: ['Corki', 'Quinn'] },
      { id: 53, name: 'LegSupport', role: 'Support', kda: '1.8', status: 'online', champions: ['Taric', 'Zilean'] },
      { id: 54, name: 'LegSub1', role: 'Top', kda: '2.2', status: 'offline', champions: ['Illaoi', 'Yorick'] },
      { id: 55, name: 'LegSub2', role: 'Jungle', kda: '2.6', status: 'online', champions: ['Fiddlesticks', 'Ivern'] },
      { id: 56, name: 'LegSub3', role: 'Mid', kda: '3.3', status: 'offline', champions: ['Anivia', 'Swain'] }
    ],
    globalStats: {
      totalWins: 27,
      totalLosses: 38,
      winRate: 42,
      totalGames: 65
    },
    competitions: [
      { name: 'Prime League', position: 9, points: 128, wins: 10, losses: 14 },
      { name: 'LFL Division 2', position: 7, points: 156, wins: 13, losses: 17 },
      { name: 'Coupe de France', position: 8, points: 112, wins: 8, losses: 12 }
    ]
  }
];

export default TEAMS;
