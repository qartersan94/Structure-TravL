// 📅 SCHEDULE DATA - Planning complet de la structure
// Types de sessions : Training, Match, Review, Show-match, Stream

export const SESSION_TYPES = {
  TRAINING: {
    id: 'training',
    label: 'Training',
    emoji: '🎯',
    color: '#00FF88',
    bgColor: 'bg-green-600',
    borderColor: 'border-green-600',
    description: 'Entraînement équipe (Scrims, Solo Queue)'
  },
  MATCH: {
    id: 'match',
    label: 'Match Officiel',
    emoji: '⚔️',
    color: '#DC143C',
    bgColor: 'bg-red-600',
    borderColor: 'border-red-600',
    description: 'Compétition officielle'
  },
  REVIEW: {
    id: 'review',
    label: 'VOD Review',
    emoji: '📊',
    color: '#9D4EDD',
    bgColor: 'bg-purple-600',
    borderColor: 'border-purple-600',
    description: 'Analyse de performances'
  },
  SHOWMATCH: {
    id: 'showmatch',
    label: 'Show-match',
    emoji: '🎮',
    color: '#FFD700',
    bgColor: 'bg-yellow-600',
    borderColor: 'border-yellow-600',
    description: 'Match exhibition'
  },
  STREAM: {
    id: 'stream',
    label: 'Stream',
    emoji: '📺',
    color: '#FF6B35',
    bgColor: 'bg-orange-600',
    borderColor: 'border-orange-600',
    description: 'Session streamée'
  },
  MEETING: {
    id: 'meeting',
    label: 'Réunion',
    emoji: '👥',
    color: '#4169E1',
    bgColor: 'bg-blue-600',
    borderColor: 'border-blue-600',
    description: 'Réunion d\'équipe/structure'
  }
};

// Planning de la semaine
export const SCHEDULE = [
  // ========== LUNDI ==========
  {
    id: 1,
    date: '2026-02-03',
    dayName: 'Lundi',
    time: '18:00',
    duration: '2h',
    type: SESSION_TYPES.TRAINING,
    teamId: 1, // Mount X
    teamName: 'Mount X',
    title: 'Scrims vs équipe externe',
    description: 'Entraînement contre une équipe de la Prime League',
    location: 'Discord - Salon Mount X',
    mandatory: true,
    participants: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
    coach: 'Staff TravL'
  },
  {
    id: 2,
    date: '2026-02-03',
    dayName: 'Lundi',
    time: '20:00',
    duration: '1h30',
    type: SESSION_TYPES.REVIEW,
    teamId: 2, // Flux
    teamName: 'Flux',
    title: 'VOD Review - Dernier match',
    description: 'Analyse du match vs Froz\'nLéGion',
    location: 'Discord - Salon Flux',
    mandatory: true,
    participants: ['Toute l\'équipe'],
    coach: 'Coach Flux'
  },
  {
    id: 3,
    date: '2026-02-03',
    dayName: 'Lundi',
    time: '21:00',
    duration: '2h',
    type: SESSION_TYPES.TRAINING,
    teamId: 4, // VisionaRY
    teamName: 'VisionaRY',
    title: 'Solo Queue collectif',
    description: 'Session Solo Queue coordonnée',
    location: 'EUW Solo Queue',
    mandatory: false,
    participants: ['Tout le roster'],
    coach: null
  },

  // ========== MARDI ==========
  {
    id: 4,
    date: '2026-02-04',
    dayName: 'Mardi',
    time: '19:00',
    duration: '3h',
    type: SESSION_TYPES.MATCH,
    teamId: 1, // Mount X
    teamName: 'Mount X',
    title: 'Nexus Tour - Mount X vs Flux',
    description: 'Match officiel BO3 - Division Master',
    location: 'Tournament Realm',
    competition: 'Nexus Tour',
    opponent: 'Flux',
    mandatory: true,
    participants: ['Titulaires + Remplaçants'],
    coach: 'Staff TravL',
    streamUrl: 'https://twitch.tv/nexustour'
  },
  {
    id: 5,
    date: '2026-02-04',
    dayName: 'Mardi',
    time: '18:00',
    duration: '2h',
    type: SESSION_TYPES.TRAINING,
    teamId: 3, // Froz'nLéGion
    teamName: 'Froz\'nLéGion',
    title: 'Préparation tactique',
    description: 'Focus macro game et rotations',
    location: 'Discord - Salon Froz\'nLéGion',
    mandatory: true,
    participants: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
    coach: 'Coach FRZ'
  },
  {
    id: 6,
    date: '2026-02-04',
    dayName: 'Mardi',
    time: '20:30',
    duration: '1h',
    type: SESSION_TYPES.MEETING,
    teamId: null, // Toute la structure
    teamName: 'Toutes les équipes',
    title: 'Réunion mensuelle Structure',
    description: 'Point sur les objectifs et résultats',
    location: 'Discord - Salon Général',
    mandatory: true,
    participants: ['Tous les capitaines', 'Staff'],
    coach: 'Direction TravL'
  },

  // ========== MERCREDI ==========
  {
    id: 7,
    date: '2026-02-05',
    dayName: 'Mercredi',
    time: '18:30',
    duration: '2h30',
    type: SESSION_TYPES.MATCH,
    teamId: 4, // VisionaRY
    teamName: 'VisionaRY',
    title: 'Ouat\'venture - VisionaRY vs LeGendaRY',
    description: 'Match officiel BO1 - Division High Diamond',
    location: 'Tournament Realm',
    competition: 'Ouat\'venture',
    opponent: 'LeGendaRY',
    mandatory: true,
    participants: ['Titulaires'],
    coach: 'Coach VSN'
  },
  {
    id: 8,
    date: '2026-02-05',
    dayName: 'Mercredi',
    time: '20:00',
    duration: '2h',
    type: SESSION_TYPES.SHOWMATCH,
    teamId: 2, // Flux
    teamName: 'Flux',
    title: 'Show-match Streamers',
    description: 'Match amical vs équipe de streamers',
    location: 'Custom Game',
    mandatory: false,
    participants: ['Volontaires'],
    coach: null,
    streamUrl: 'https://twitch.tv/structure_travl'
  },
  {
    id: 9,
    date: '2026-02-05',
    dayName: 'Mercredi',
    time: '19:00',
    duration: '1h30',
    type: SESSION_TYPES.TRAINING,
    teamId: 5, // MymétiC
    teamName: 'MymétiC',
    title: 'Entraînement compositions',
    description: 'Test de nouvelles compositions',
    location: 'Discord - Salon MymétiC',
    mandatory: true,
    participants: ['Toute l\'équipe'],
    coach: 'Coach MYM'
  },

  // ========== JEUDI ==========
  {
    id: 10,
    date: '2026-02-06',
    dayName: 'Jeudi',
    time: '18:00',
    duration: '2h',
    type: SESSION_TYPES.TRAINING,
    teamId: 1, // Mount X
    teamName: 'Mount X',
    title: 'Scrims vs Top équipe EU',
    description: 'Session d\'entraînement haute intensité',
    location: 'Tournament Realm',
    mandatory: true,
    participants: ['Titulaires'],
    coach: 'Staff TravL'
  },
  {
    id: 11,
    date: '2026-02-06',
    dayName: 'Jeudi',
    time: '20:00',
    duration: '3h',
    type: SESSION_TYPES.MATCH,
    teamId: 6, // Team
    teamName: 'Team',
    title: 'Prime League - Team vs Adversaire',
    description: 'Match officiel Division 2',
    location: 'Tournament Realm',
    competition: 'Prime League',
    opponent: 'TBD',
    mandatory: true,
    participants: ['Titulaires + Remplaçants'],
    coach: 'Coach TEAM'
  },
  {
    id: 12,
    date: '2026-02-06',
    dayName: 'Jeudi',
    time: '21:30',
    duration: '1h',
    type: SESSION_TYPES.REVIEW,
    teamId: 4, // VisionaRY
    teamName: 'VisionaRY',
    title: 'Post-match review',
    description: 'Débrief du match vs LeGendaRY',
    location: 'Discord - Salon VisionaRY',
    mandatory: true,
    participants: ['Toute l\'équipe'],
    coach: 'Coach VSN'
  },

  // ========== VENDREDI ==========
  {
    id: 13,
    date: '2026-02-07',
    dayName: 'Vendredi',
    time: '19:00',
    duration: '2h',
    type: SESSION_TYPES.STREAM,
    teamId: 2, // Flux
    teamName: 'Flux',
    title: 'Stream Solo Queue',
    description: 'Stream communautaire avec l\'équipe',
    location: 'Twitch',
    mandatory: false,
    participants: ['Volontaires'],
    coach: null,
    streamUrl: 'https://twitch.tv/flux_esports'
  },
  {
    id: 14,
    date: '2026-02-07',
    dayName: 'Vendredi',
    time: '20:00',
    duration: '2h30',
    type: SESSION_TYPES.MATCH,
    teamId: 3, // Froz'nLéGion
    teamName: 'Froz\'nLéGion',
    title: 'Nexus Tour - Froz\'nLéGion vs MymétiC',
    description: 'Match officiel BO3 - Division Master',
    location: 'Tournament Realm',
    competition: 'Nexus Tour',
    opponent: 'MymétiC',
    mandatory: true,
    participants: ['Titulaires'],
    coach: 'Coach FRZ'
  },
  {
    id: 15,
    date: '2026-02-07',
    dayName: 'Vendredi',
    time: '18:00',
    duration: '1h30',
    type: SESSION_TYPES.TRAINING,
    teamId: 7, // LeGendaRY
    teamName: 'LeGendaRY',
    title: 'Training lane phase',
    description: 'Focus early game et laning',
    location: 'Discord - Salon LeGendaRY',
    mandatory: true,
    participants: ['Top', 'Mid', 'ADC'],
    coach: 'Coach LGD'
  },

  // ========== SAMEDI ==========
  {
    id: 16,
    date: '2026-02-08',
    dayName: 'Samedi',
    time: '14:00',
    duration: '4h',
    type: SESSION_TYPES.MATCH,
    teamId: 1, // Mount X
    teamName: 'Mount X',
    title: 'Nexus Tour - Playoffs Bracket',
    description: 'Match de playoffs - BO5',
    location: 'Tournament Realm',
    competition: 'Nexus Tour',
    opponent: 'TBD (selon bracket)',
    mandatory: true,
    participants: ['Tout le roster'],
    coach: 'Staff TravL',
    streamUrl: 'https://twitch.tv/nexustour',
    important: true
  },
  {
    id: 17,
    date: '2026-02-08',
    dayName: 'Samedi',
    time: '16:00',
    duration: '3h',
    type: SESSION_TYPES.TRAINING,
    teamId: 6, // Team
    teamName: 'Team',
    title: 'Scrims intensifs',
    description: 'Session marathon d\'entraînement',
    location: 'Tournament Realm',
    mandatory: true,
    participants: ['Toute l\'équipe'],
    coach: 'Coach TEAM'
  },
  {
    id: 18,
    date: '2026-02-08',
    dayName: 'Samedi',
    time: '20:00',
    duration: '2h',
    type: SESSION_TYPES.SHOWMATCH,
    teamId: null, // Multi-équipes
    teamName: 'TravL All-Stars',
    title: 'Show-match All-Stars TravL',
    description: 'Match fun entre les meilleurs joueurs',
    location: 'Custom Game',
    mandatory: false,
    participants: ['Sélection'],
    coach: null,
    streamUrl: 'https://twitch.tv/structure_travl',
    important: true
  },

  // ========== DIMANCHE ==========
  {
    id: 19,
    date: '2026-02-09',
    dayName: 'Dimanche',
    time: '15:00',
    duration: '2h',
    type: SESSION_TYPES.REVIEW,
    teamId: 1, // Mount X
    teamName: 'Mount X',
    title: 'Review hebdomadaire',
    description: 'Bilan de la semaine et objectifs',
    location: 'Discord - Salon Mount X',
    mandatory: true,
    participants: ['Toute l\'équipe'],
    coach: 'Staff TravL'
  },
  {
    id: 20,
    date: '2026-02-09',
    dayName: 'Dimanche',
    time: '17:00',
    duration: '2h',
    type: SESSION_TYPES.TRAINING,
    teamId: 5, // MymétiC
    teamName: 'MymétiC',
    title: 'Solo Queue coordonné',
    description: 'Climb en équipe',
    location: 'EUW Solo Queue',
    mandatory: false,
    participants: ['Volontaires'],
    coach: null
  },
  {
    id: 21,
    date: '2026-02-09',
    dayName: 'Dimanche',
    time: '19:00',
    duration: '1h',
    type: SESSION_TYPES.MEETING,
    teamId: null, // Staff
    teamName: 'Staff TravL',
    title: 'Réunion staff',
    description: 'Point hebdomadaire équipe coaching',
    location: 'Discord - Salon Staff',
    mandatory: true,
    participants: ['Coachs', 'Managers'],
    coach: 'Direction TravL'
  }
];

// Fonctions utilitaires
export const getSessionsByDay = (day) => {
  return SCHEDULE.filter(session => session.dayName === day);
};

export const getSessionsByTeam = (teamId) => {
  return SCHEDULE.filter(session => session.teamId === teamId);
};

export const getSessionsByType = (type) => {
  return SCHEDULE.filter(session => session.type.id === type);
};

export const getUpcomingSessions = () => {
  const today = new Date();
  return SCHEDULE.filter(session => new Date(session.date) >= today);
};

export const getImportantSessions = () => {
  return SCHEDULE.filter(session => session.important === true);
};

export default {
  SCHEDULE,
  SESSION_TYPES,
  getSessionsByDay,
  getSessionsByTeam,
  getSessionsByType,
  getUpcomingSessions,
  getImportantSessions
};
