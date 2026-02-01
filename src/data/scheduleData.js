// 📅 SCHEDULE DATA — Planning de la structure TravL
// Les sessions sont créées dynamiquement par les capitaines / staff via le Dashboard
// Ce fichier contient uniquement les types de sessions disponibles

export const SESSION_TYPES = {
  TRAINING: { id: 'training', label: 'Training', emoji: '🎯', color: '#00FF88', description: 'Entraînement équipe (Scrims, Solo Queue)' },
  MATCH: { id: 'match', label: 'Match Officiel', emoji: '⚔️', color: '#DC143C', description: 'Compétition officielle' },
  REVIEW: { id: 'review', label: 'VOD Review', emoji: '📊', color: '#9D4EDD', description: 'Analyse de performances' },
  MATCH_OFF: { id: 'match_off', label: 'Match Off', emoji: '🎮', color: '#FF6B35', description: 'Match non officiel / amical' },
  STREAM: { id: 'stream', label: 'Stream', emoji: '📺', color: '#FF1493', description: 'Session streamée' },
  BOOTCAMP: { id: 'bootcamp', label: 'Bootcamp', emoji: '🏋️', color: '#FFD700', description: 'Stage intensif d\'entraînement' }
};

// Sessions créées via le Dashboard — initialement vide
export let SCHEDULE = [];

// Fonctions utilitaires
export const getSessionsByDay = (day) => SCHEDULE.filter(session => session.dayName === day);
export const getSessionsByTeam = (teamId) => SCHEDULE.filter(session => session.teamId === teamId);
export const getSessionsByType = (type) => SCHEDULE.filter(session => session.type.id === type);

export default { SCHEDULE, SESSION_TYPES, getSessionsByDay, getSessionsByTeam, getSessionsByType };
