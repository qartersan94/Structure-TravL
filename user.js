// UTILISATEURS ET RÔLES - STRUCTURE TRAVL
// Hiérarchie: PRESIDENT > CAPITAINE > COACH > MANAGER > JOUEUR

export const ROLES = {
  PRESIDENT: 5,
  CAPITAINE: 4,
  COACH: 3,
  MANAGER: 2,
  JOUEUR: 1
};

export const PERMISSIONS = {
  PRESIDENT: [
    'manage_all',
    'create_team',
    'delete_team',
    'manage_users',
    'view_finances',
    'manage_sponsors'
  ],
  CAPITAINE: [
    'validate_session',
    'create_session',
    'manage_roster',
    'view_team_stats',
    'select_players'
  ],
  COACH: [
    'view_stats',
    'plan_training',
    'vod_review',
    'analyze_performance'
  ],
  MANAGER: [
    'manage_admin',
    'view_roster',
    'tournament_registration',
    'communications'
  ],
  JOUEUR: [
    'set_presence',
    'view_planning',
    'view_personal_stats'
  ]
};

export const USERS = {
  // ========== PRÉSIDENT ==========
  qartersan: {
    id: 'user_001',
    username: 'qartersan',
    password: 'travl2026!',
    role: 'PRESIDENT',
    roleLevel: ROLES.PRESIDENT,
    name: 'Qartersan',
    email: 'president@structuretravl.com',
    teams: ['*'], // Toutes les équipes
    avatar: '👑',
    createdAt: '2024-01-01'
  },

  // ========== CAPITAINES ==========
  captain_flux: {
    id: 'user_002',
    username: 'captain_flux',
    password: 'flux2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: 'Captain FLUX',
    email: 'captain.flux@structuretravl.com',
    teams: ['flux'],
    avatar: '🔥',
    teamColor: '#ff9966'
  },

  captain_mymetic: {
    id: 'user_003',
    username: 'captain_mymetic',
    password: 'mymetic2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: 'Captain MymétiC',
    email: 'captain.mymetic@structuretravl.com',
    teams: ['mymetic'],
    avatar: '🛡️',
    teamColor: '#cccccc'
  },

  captain_froznlegion: {
    id: 'user_004',
    username: 'captain_froznlegion',
    password: 'frozen2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: "Captain Froz'nLégion",
    email: 'captain.frozen@structuretravl.com',
    teams: ['froznlegion'],
    avatar: '❄️',
    teamColor: '#e8e8e8'
  },

  captain_mountx: {
    id: 'user_005',
    username: 'captain_mountx',
    password: 'mountx2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: 'Captain MOUNT X',
    email: 'captain.mountx@structuretravl.com',
    teams: ['mount-x'],
    avatar: '⚡',
    teamColor: '#33ff99'
  },

  captain_visionary: {
    id: 'user_006',
    username: 'captain_visionary',
    password: 'visionary2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: 'Captain VISIONARY',
    email: 'captain.visionary@structuretravl.com',
    teams: ['visionary'],
    avatar: '👁️',
    teamColor: '#bb99ff'
  },

  captain_team: {
    id: 'user_007',
    username: 'captain_team',
    password: 'team2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: 'Captain TEAM',
    email: 'captain.team@structuretravl.com',
    teams: ['team'],
    avatar: '⭐',
    teamColor: '#ffdd66'
  },

  captain_legendary: {
    id: 'user_008',
    username: 'captain_legendary',
    password: 'legendary2026!',
    role: 'CAPITAINE',
    roleLevel: ROLES.CAPITAINE,
    name: 'Captain LEGENDARY',
    email: 'captain.legendary@structuretravl.com',
    teams: ['legendary'],
    avatar: '🏆',
    teamColor: '#66b3ff'
  },

  // ========== COACHS ==========
  coach_flux: {
    id: 'user_009',
    username: 'coach_flux',
    password: 'coach2026!',
    role: 'COACH',
    roleLevel: ROLES.COACH,
    name: 'Coach FLUX',
    email: 'coach.flux@structuretravl.com',
    teams: ['flux'],
    avatar: '📋'
  },

  coach_global: {
    id: 'user_010',
    username: 'coach_global',
    password: 'coachglobal2026!',
    role: 'COACH',
    roleLevel: ROLES.COACH,
    name: 'Coach Global',
    email: 'coach@structuretravl.com',
    teams: ['*'],
    avatar: '🎯'
  },

  // ========== MANAGERS ==========
  manager_global: {
    id: 'user_011',
    username: 'manager_global',
    password: 'manager2026!',
    role: 'MANAGER',
    roleLevel: ROLES.MANAGER,
    name: 'Manager Global',
    email: 'manager@structuretravl.com',
    teams: ['*'],
    avatar: '💼'
  },

  // ========== JOUEURS (Exemples) ==========
  player_faker: {
    id: 'user_012',
    username: 'player_faker',
    password: 'joueur2026!',
    role: 'JOUEUR',
    roleLevel: ROLES.JOUEUR,
    name: 'Faker',
    email: 'faker@structuretravl.com',
    teams: ['flux'],
    position: 'Mid',
    riotId: 'Hide on bush#KR1',
    avatar: '🎮',
    number: 7
  },

  player_caps: {
    id: 'user_013',
    username: 'player_caps',
    password: 'joueur2026!',
    role: 'JOUEUR',
    roleLevel: ROLES.JOUEUR,
    name: 'Caps',
    email: 'caps@structuretravl.com',
    teams: ['mymetic'],
    position: 'Mid',
    riotId: 'Caps#EUW',
    avatar: '🎮',
    number: 8
  },

  player_rekkles: {
    id: 'user_014',
    username: 'player_rekkles',
    password: 'joueur2026!',
    role: 'JOUEUR',
    roleLevel: ROLES.JOUEUR,
    name: 'Rekkles',
    email: 'rekkles@structuretravl.com',
    teams: ['flux'],
    position: 'ADC',
    riotId: 'Rekkles#EUW',
    avatar: '🎮',
    number: 15
  }
};

// Fonction: Vérifier authentification
export const authenticate = (username, password) => {
  const user = USERS[username];
  if (!user) return { success: false, error: 'Utilisateur introuvable' };
  if (user.password !== password) return { success: false, error: 'Mot de passe incorrect' };
  
  return { success: true, user: { ...user, password: undefined } };
};

// Fonction: Vérifier permission
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  const rolePermissions = PERMISSIONS[user.role];
  return rolePermissions.includes(permission) || rolePermissions.includes('manage_all');
};

// Fonction: Obtenir utilisateurs par équipe
export const getUsersByTeam = (teamId) => {
  return Object.values(USERS).filter(user => 
    user.teams.includes(teamId) || user.teams.includes('*')
  );
};

// Fonction: Obtenir utilisateurs par rôle
export const getUsersByRole = (role) => {
  return Object.values(USERS).filter(user => user.role === role);
};

export default USERS;
