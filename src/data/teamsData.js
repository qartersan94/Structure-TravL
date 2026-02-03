// ============================================================
// STRUCTURE TravL - DONNÉES DES ÉQUIPES
// Couleurs corrigées: Froz'nLéGion (blanc), MymétiC (noir/gris)
// ============================================================

export const TEAMS = [
    {
        id: 1,
        name: 'Mount X',
        shortName: 'MNT',
        rank: 'Master+',
        color: '#00FF88',
        secondaryColor: '#00CC6A',
        logo: '⚡',
        motto: 'Peak Performance',
        description: 'Équipe Master spécialisée dans les stratégies agressives et les rotations parfaites.',
        competitions: [
            { name: 'Nexus Tour', division: 'Division Master', wins: 15, losses: 8, position: 1, points: 45 }
        ],
        globalStats: {
            totalGames: 23,
            totalWins: 15,
            totalLosses: 8,
            winRate: 65
        },
        achievements: ['Champion Nexus Tour 2026', 'MVP Spring Split']
    },
    {
        id: 2,
        name: 'Flux',
        shortName: 'FLX',
        rank: 'Diamond',
        color: '#FF6B35',
        secondaryColor: '#FF8C42',
        logo: '🔥',
        motto: 'Constant Evolution',
        description: 'Masters de l\'adaptation, Flux excelle dans les team fights chaotiques.',
        competitions: [
            { name: 'Nexus Tour', division: 'Division Master', wins: 12, losses: 11, position: 2, points: 36 }
        ],
        globalStats: {
            totalGames: 23,
            totalWins: 12,
            totalLosses: 11,
            winRate: 52
        },
        achievements: []
    },
    {
        id: 3,
        name: "Froz'nLégion",
        shortName: 'FRZ',
        rank: 'Diamond',
        color: '#FFFFFF',  // ← CORRIGÉ: Blanc
        secondaryColor: '#E0E0E0',  // ← CORRIGÉ: Gris clair
        logo: '❄️',
        motto: 'Cold. Calculated. Victorious.',
        description: 'Précision glaciale et exécution parfaite.',
        competitions: [
            { name: 'Nexus Tour', division: 'Division Master', wins: 14, losses: 9, position: 3, points: 42 }
        ],
        globalStats: {
            totalGames: 23,
            totalWins: 14,
            totalLosses: 9,
            winRate: 61
        },
        achievements: ['Finaliste Nexus Tour 2025']
    },
    {
        id: 4,
        name: 'VisionaRY',
        shortName: 'VSN',
        rank: 'High Diamond',
        color: '#9D4EDD',
        secondaryColor: '#B185DB',
        logo: '👁️',
        motto: 'See Beyond Victory',
        description: 'Vision map parfaite et anticipation.',
        competitions: [
            { name: "Ouat'venture", division: 'Division High Diamond', wins: 10, losses: 6, position: 3, points: 30 }
        ],
        globalStats: {
            totalGames: 16,
            totalWins: 10,
            totalLosses: 6,
            winRate: 63
        },
        achievements: []
    },
    {
        id: 5,
        name: 'MymétiC',
        shortName: 'MYM',
        rank: 'Diamond',
        color: '#2C2C2C',  // ← CORRIGÉ: Gris foncé
        secondaryColor: '#444444',  // ← CORRIGÉ: Gris moyen
        logo: '🌑',
        motto: 'From Shadows, We Strike',
        description: 'Maîtres de l\'adaptation et de la stratégie.',
        competitions: [
            { name: 'Nexus Tour', division: 'Division High Diamond', wins: 11, losses: 8, position: 5, points: 33 }
        ],
        globalStats: {
            totalGames: 19,
            totalWins: 11,
            totalLosses: 8,
            winRate: 58
        },
        achievements: ['Demi-finaliste Prime League']
    },
    {
        id: 6,
        name: 'Team',
        shortName: 'TEAM',
        rank: 'Diamond',
        color: '#FFD700',
        secondaryColor: '#FFC300',
        logo: '⭐',
        motto: 'Together We Rise',
        description: 'Synergie parfaite et esprit d\'équipe inégalé.',
        competitions: [
            { name: 'Prime League', division: 'Division 2', wins: 8, losses: 7, position: 6, points: 24 }
        ],
        globalStats: {
            totalGames: 15,
            totalWins: 8,
            totalLosses: 7,
            winRate: 53
        },
        achievements: []
    },
    {
        id: 7,
        name: 'LeGendaRY',
        shortName: 'LGD',
        rank: 'Diamond',
        color: '#4169E1',
        secondaryColor: '#5B8DEE',
        logo: '⚔️',
        motto: 'Legends Never Die',
        description: 'Nouveaux venus prometteurs avec un potentiel illimité.',
        competitions: [
            { name: "Ouat'venture", division: 'Division Diamond', wins: 9, losses: 9, position: 7, points: 27 }
        ],
        globalStats: {
            totalGames: 18,
            totalWins: 9,
            totalLosses: 9,
            winRate: 50
        },
        achievements: []
    }
];
