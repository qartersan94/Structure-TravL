// UTILISATEURS ET RÔLES - STRUCTURE TRAVL
// 60 JOUEURS + STAFF

export const ROLES = {
  PRESIDENT: 5,
  CAPITAINE: 4,
  COACH: 3,
  MANAGER: 2,
  JOUEUR: 1
};

export const PERMISSIONS = {
  PRESIDENT: ['manage_all'],
  CAPITAINE: ['validate_session', 'create_session', 'manage_roster', 'view_team_stats'],
  COACH: ['view_stats', 'plan_training', 'vod_review'],
  MANAGER: ['manage_admin', 'view_roster'],
  JOUEUR: ['set_presence', 'view_planning', 'view_personal_stats']
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
    teams: ['*'],
    avatar: '👑'
  },

  // ========== CAPITAINES ==========
  captain_flux: { id: 'user_002', username: 'captain_flux', password: 'flux2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: 'Captain FLUX', teams: ['flux'], avatar: '🔥' },
  captain_mymetic: { id: 'user_003', username: 'captain_mymetic', password: 'mymetic2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: 'Captain MymétiC', teams: ['mymetic'], avatar: '🛡️' },
  captain_froznlegion: { id: 'user_004', username: 'captain_froznlegion', password: 'frozen2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: "Captain Froz'nLégion", teams: ['froznlegion'], avatar: '❄️' },
  captain_mountx: { id: 'user_005', username: 'captain_mountx', password: 'mountx2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: 'Captain MOUNT X', teams: ['mount-x'], avatar: '⚡' },
  captain_visionary: { id: 'user_006', username: 'captain_visionary', password: 'visionary2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: 'Captain VISIONARY', teams: ['visionary'], avatar: '👁️' },
  captain_team: { id: 'user_007', username: 'captain_team', password: 'team2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: 'Captain TEAM', teams: ['team'], avatar: '⭐' },
  captain_legendary: { id: 'user_008', username: 'captain_legendary', password: 'legendary2026!', role: 'CAPITAINE', roleLevel: ROLES.CAPITAINE, name: 'Captain LEGENDARY', teams: ['legendary'], avatar: '🏆' },

  // ========== COACHS ==========
  coach_flux: { id: 'user_009', username: 'coach_flux', password: 'coach2026!', role: 'COACH', roleLevel: ROLES.COACH, name: 'Coach FLUX', teams: ['flux'], avatar: '📋' },
  coach_global: { id: 'user_010', username: 'coach_global', password: 'coachglobal2026!', role: 'COACH', roleLevel: ROLES.COACH, name: 'Coach Global', teams: ['*'], avatar: '🎯' },

  // ========== MANAGERS ==========
  manager_global: { id: 'user_011', username: 'manager_global', password: 'manager2026!', role: 'MANAGER', roleLevel: ROLES.MANAGER, name: 'Manager Global', teams: ['*'], avatar: '💼' },

  // ========== 60 JOUEURS (environ 8-9 par équipe) ==========
  
  // FLUX (9 joueurs)
  flux_01: { id: 'flux_01', username: 'flux_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxTop', teams: ['flux'], position: 'Top', riotId: 'FluxTop#EUW', avatar: '🎮', isTitular: true },
  flux_02: { id: 'flux_02', username: 'flux_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxJungle', teams: ['flux'], position: 'Jungle', riotId: 'FluxJungle#EUW', avatar: '🎮', isTitular: true },
  flux_03: { id: 'flux_03', username: 'flux_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxMid', teams: ['flux'], position: 'Mid', riotId: 'FluxMid#EUW', avatar: '🎮', isTitular: true },
  flux_04: { id: 'flux_04', username: 'flux_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxADC', teams: ['flux'], position: 'ADC', riotId: 'FluxADC#EUW', avatar: '🎮', isTitular: true },
  flux_05: { id: 'flux_05', username: 'flux_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxSupport', teams: ['flux'], position: 'Support', riotId: 'FluxSupport#EUW', avatar: '🎮', isTitular: true },
  flux_06: { id: 'flux_06', username: 'flux_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxSub1', teams: ['flux'], position: 'Top', riotId: 'FluxSub1#EUW', avatar: '🎮', isTitular: false },
  flux_07: { id: 'flux_07', username: 'flux_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxSub2', teams: ['flux'], position: 'Mid', riotId: 'FluxSub2#EUW', avatar: '🎮', isTitular: false },
  flux_08: { id: 'flux_08', username: 'flux_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxAcademy1', teams: ['flux'], position: 'Jungle', riotId: 'FluxAca1#EUW', avatar: '🎮', isTitular: false },
  flux_09: { id: 'flux_09', username: 'flux_09', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FluxAcademy2', teams: ['flux'], position: 'ADC', riotId: 'FluxAca2#EUW', avatar: '🎮', isTitular: false },

  // MYMETIC (9 joueurs)
  mymetic_01: { id: 'mymetic_01', username: 'mymetic_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticTop', teams: ['mymetic'], position: 'Top', riotId: 'MymeTop#EUW', avatar: '🎮', isTitular: true },
  mymetic_02: { id: 'mymetic_02', username: 'mymetic_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticJungle', teams: ['mymetic'], position: 'Jungle', riotId: 'MymeJg#EUW', avatar: '🎮', isTitular: true },
  mymetic_03: { id: 'mymetic_03', username: 'mymetic_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticMid', teams: ['mymetic'], position: 'Mid', riotId: 'MymeMid#EUW', avatar: '🎮', isTitular: true },
  mymetic_04: { id: 'mymetic_04', username: 'mymetic_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticADC', teams: ['mymetic'], position: 'ADC', riotId: 'MymeADC#EUW', avatar: '🎮', isTitular: true },
  mymetic_05: { id: 'mymetic_05', username: 'mymetic_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticSupport', teams: ['mymetic'], position: 'Support', riotId: 'MymeSup#EUW', avatar: '🎮', isTitular: true },
  mymetic_06: { id: 'mymetic_06', username: 'mymetic_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticSub1', teams: ['mymetic'], position: 'Top', riotId: 'MymeSub1#EUW', avatar: '🎮', isTitular: false },
  mymetic_07: { id: 'mymetic_07', username: 'mymetic_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticSub2', teams: ['mymetic'], position: 'Mid', riotId: 'MymeSub2#EUW', avatar: '🎮', isTitular: false },
  mymetic_08: { id: 'mymetic_08', username: 'mymetic_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticAcademy1', teams: ['mymetic'], position: 'Jungle', riotId: 'MymeAca1#EUW', avatar: '🎮', isTitular: false },
  mymetic_09: { id: 'mymetic_09', username: 'mymetic_09', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MymeticAcademy2', teams: ['mymetic'], position: 'Support', riotId: 'MymeAca2#EUW', avatar: '🎮', isTitular: false },

  // FROZNLEGION (9 joueurs)
  frozen_01: { id: 'frozen_01', username: 'frozen_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenTop', teams: ['froznlegion'], position: 'Top', riotId: 'FrozenTop#EUW', avatar: '🎮', isTitular: true },
  frozen_02: { id: 'frozen_02', username: 'frozen_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenJungle', teams: ['froznlegion'], position: 'Jungle', riotId: 'FrozenJg#EUW', avatar: '🎮', isTitular: true },
  frozen_03: { id: 'frozen_03', username: 'frozen_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenMid', teams: ['froznlegion'], position: 'Mid', riotId: 'FrozenMid#EUW', avatar: '🎮', isTitular: true },
  frozen_04: { id: 'frozen_04', username: 'frozen_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenADC', teams: ['froznlegion'], position: 'ADC', riotId: 'FrozenADC#EUW', avatar: '🎮', isTitular: true },
  frozen_05: { id: 'frozen_05', username: 'frozen_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenSupport', teams: ['froznlegion'], position: 'Support', riotId: 'FrozenSup#EUW', avatar: '🎮', isTitular: true },
  frozen_06: { id: 'frozen_06', username: 'frozen_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenSub1', teams: ['froznlegion'], position: 'ADC', riotId: 'FrozenSub1#EUW', avatar: '🎮', isTitular: false },
  frozen_07: { id: 'frozen_07', username: 'frozen_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenSub2', teams: ['froznlegion'], position: 'Support', riotId: 'FrozenSub2#EUW', avatar: '🎮', isTitular: false },
  frozen_08: { id: 'frozen_08', username: 'frozen_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenAcademy1', teams: ['froznlegion'], position: 'Top', riotId: 'FrozenAca1#EUW', avatar: '🎮', isTitular: false },
  frozen_09: { id: 'frozen_09', username: 'frozen_09', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'FrozenAcademy2', teams: ['froznlegion'], position: 'Jungle', riotId: 'FrozenAca2#EUW', avatar: '🎮', isTitular: false },

  // MOUNT X (9 joueurs)
  mountx_01: { id: 'mountx_01', username: 'mountx_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXTop', teams: ['mount-x'], position: 'Top', riotId: 'MountXTop#EUW', avatar: '🎮', isTitular: true },
  mountx_02: { id: 'mountx_02', username: 'mountx_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXJungle', teams: ['mount-x'], position: 'Jungle', riotId: 'MountXJg#EUW', avatar: '🎮', isTitular: true },
  mountx_03: { id: 'mountx_03', username: 'mountx_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXMid', teams: ['mount-x'], position: 'Mid', riotId: 'MountXMid#EUW', avatar: '🎮', isTitular: true },
  mountx_04: { id: 'mountx_04', username: 'mountx_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXADC', teams: ['mount-x'], position: 'ADC', riotId: 'MountXADC#EUW', avatar: '🎮', isTitular: true },
  mountx_05: { id: 'mountx_05', username: 'mountx_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXSupport', teams: ['mount-x'], position: 'Support', riotId: 'MountXSup#EUW', avatar: '🎮', isTitular: true },
  mountx_06: { id: 'mountx_06', username: 'mountx_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXSub1', teams: ['mount-x'], position: 'Mid', riotId: 'MountXSub1#EUW', avatar: '🎮', isTitular: false },
  mountx_07: { id: 'mountx_07', username: 'mountx_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXSub2', teams: ['mount-x'], position: 'Jungle', riotId: 'MountXSub2#EUW', avatar: '🎮', isTitular: false },
  mountx_08: { id: 'mountx_08', username: 'mountx_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXAcademy1', teams: ['mount-x'], position: 'Top', riotId: 'MountXAca1#EUW', avatar: '🎮', isTitular: false },
  mountx_09: { id: 'mountx_09', username: 'mountx_09', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'MountXAcademy2', teams: ['mount-x'], position: 'ADC', riotId: 'MountXAca2#EUW', avatar: '🎮', isTitular: false },

  // VISIONARY (9 joueurs)
  visionary_01: { id: 'visionary_01', username: 'visionary_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionaryTop', teams: ['visionary'], position: 'Top', riotId: 'VisionTop#EUW', avatar: '🎮', isTitular: true },
  visionary_02: { id: 'visionary_02', username: 'visionary_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionaryJungle', teams: ['visionary'], position: 'Jungle', riotId: 'VisionJg#EUW', avatar: '🎮', isTitular: true },
  visionary_03: { id: 'visionary_03', username: 'visionary_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionaryMid', teams: ['visionary'], position: 'Mid', riotId: 'VisionMid#EUW', avatar: '🎮', isTitular: true },
  visionary_04: { id: 'visionary_04', username: 'visionary_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionaryADC', teams: ['visionary'], position: 'ADC', riotId: 'VisionADC#EUW', avatar: '🎮', isTitular: true },
  visionary_05: { id: 'visionary_05', username: 'visionary_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionarySupport', teams: ['visionary'], position: 'Support', riotId: 'VisionSup#EUW', avatar: '🎮', isTitular: true },
  visionary_06: { id: 'visionary_06', username: 'visionary_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionarySub1', teams: ['visionary'], position: 'Top', riotId: 'VisionSub1#EUW', avatar: '🎮', isTitular: false },
  visionary_07: { id: 'visionary_07', username: 'visionary_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionarySub2', teams: ['visionary'], position: 'Support', riotId: 'VisionSub2#EUW', avatar: '🎮', isTitular: false },
  visionary_08: { id: 'visionary_08', username: 'visionary_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionaryAcademy1', teams: ['visionary'], position: 'Mid', riotId: 'VisionAca1#EUW', avatar: '🎮', isTitular: false },
  visionary_09: { id: 'visionary_09', username: 'visionary_09', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'VisionaryAcademy2', teams: ['visionary'], position: 'Jungle', riotId: 'VisionAca2#EUW', avatar: '🎮', isTitular: false },

  // TEAM (8 joueurs)
  team_01: { id: 'team_01', username: 'team_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamTop', teams: ['team'], position: 'Top', riotId: 'TeamTop#EUW', avatar: '🎮', isTitular: true },
  team_02: { id: 'team_02', username: 'team_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamJungle', teams: ['team'], position: 'Jungle', riotId: 'TeamJg#EUW', avatar: '🎮', isTitular: true },
  team_03: { id: 'team_03', username: 'team_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamMid', teams: ['team'], position: 'Mid', riotId: 'TeamMid#EUW', avatar: '🎮', isTitular: true },
  team_04: { id: 'team_04', username: 'team_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamADC', teams: ['team'], position: 'ADC', riotId: 'TeamADC#EUW', avatar: '🎮', isTitular: true },
  team_05: { id: 'team_05', username: 'team_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamSupport', teams: ['team'], position: 'Support', riotId: 'TeamSup#EUW', avatar: '🎮', isTitular: true },
  team_06: { id: 'team_06', username: 'team_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamSub1', teams: ['team'], position: 'ADC', riotId: 'TeamSub1#EUW', avatar: '🎮', isTitular: false },
  team_07: { id: 'team_07', username: 'team_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamSub2', teams: ['team'], position: 'Mid', riotId: 'TeamSub2#EUW', avatar: '🎮', isTitular: false },
  team_08: { id: 'team_08', username: 'team_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'TeamAcademy1', teams: ['team'], position: 'Jungle', riotId: 'TeamAca1#EUW', avatar: '🎮', isTitular: false },

  // LEGENDARY (8 joueurs)
  legendary_01: { id: 'legendary_01', username: 'legendary_01', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendaryTop', teams: ['legendary'], position: 'Top', riotId: 'LegTop#EUW', avatar: '🎮', isTitular: true },
  legendary_02: { id: 'legendary_02', username: 'legendary_02', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendaryJungle', teams: ['legendary'], position: 'Jungle', riotId: 'LegJg#EUW', avatar: '🎮', isTitular: true },
  legendary_03: { id: 'legendary_03', username: 'legendary_03', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendaryMid', teams: ['legendary'], position: 'Mid', riotId: 'LegMid#EUW', avatar: '🎮', isTitular: true },
  legendary_04: { id: 'legendary_04', username: 'legendary_04', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendaryADC', teams: ['legendary'], position: 'ADC', riotId: 'LegADC#EUW', avatar: '🎮', isTitular: true },
  legendary_05: { id: 'legendary_05', username: 'legendary_05', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendarySupport', teams: ['legendary'], position: 'Support', riotId: 'LegSup#EUW', avatar: '🎮', isTitular: true },
  legendary_06: { id: 'legendary_06', username: 'legendary_06', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendarySub1', teams: ['legendary'], position: 'Top', riotId: 'LegSub1#EUW', avatar: '🎮', isTitular: false },
  legendary_07: { id: 'legendary_07', username: 'legendary_07', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendarySub2', teams: ['legendary'], position: 'Support', riotId: 'LegSub2#EUW', avatar: '🎮', isTitular: false },
  legendary_08: { id: 'legendary_08', username: 'legendary_08', password: 'joueur2026!', role: 'JOUEUR', roleLevel: 1, name: 'LegendaryAcademy1', teams: ['legendary'], position: 'Mid', riotId: 'LegAca1#EUW', avatar: '🎮', isTitular: false }
};

export const authenticate = (username, password) => {
  const user = USERS[username];
  if (!user) return { success: false, error: 'Utilisateur introuvable' };
  if (user.password !== password) return { success: false, error: 'Mot de passe incorrect' };
  return { success: true, user: { ...user, password: undefined } };
};

export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  const rolePermissions = PERMISSIONS[user.role];
  return rolePermissions.includes(permission) || rolePermissions.includes('manage_all');
};

export const getUsersByTeam = (teamId) => {
  return Object.values(USERS).filter(user => 
    user.teams && (user.teams.includes(teamId) || user.teams.includes('*'))
  );
};

export const getUsersByRole = (role) => {
  return Object.values(USERS).filter(user => user.role === role);
};

export default USERS;
