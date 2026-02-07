// SERVICE API RIOT GAMES - STRUCTURE TRAVL
// Documentation: https://developer.riotgames.com/apis

const RIOT_API_KEY = process.env.REACT_APP_RIOT_API_KEY || 'RGAPI-VOTRE-CLE-ICI';

const RIOT_ENDPOINTS = {
  // Account (Riot ID)
  ACCOUNT: 'https://europe.api.riotgames.com/riot/account/v1/accounts',
  
  // Summoner (League of Legends)
  SUMMONER: 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners',
  
  // Match (League of Legends)
  MATCH: 'https://europe.api.riotgames.com/lol/match/v5/matches',
  
  // League (Ranked)
  LEAGUE: 'https://euw1.api.riotgames.com/lol/league/v4/entries'
};

// Cache pour éviter rate limit
const cache = new Map();
const CACHE_DURATION = 3600000; // 1 heure

// ========== FONCTIONS UTILITAIRES ==========

const fetchWithCache = async (url, cacheKey) => {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`[CACHE HIT] ${cacheKey}`);
    return cached.data;
  }
  
  console.log(`[API CALL] ${url}`);
  const response = await fetch(url, {
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  });
  
  if (!response.ok) {
    throw new Error(`Riot API Error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ========== FONCTIONS PRINCIPALES ==========

/**
 * Obtenir PUUID depuis Riot ID (ex: "Faker#KR1")
 */
export const getPUUID = async (riotId) => {
  try {
    const [gameName, tagLine] = riotId.split('#');
    if (!gameName || !tagLine) {
      throw new Error('Format Riot ID invalide. Utilisez: GameName#TAG');
    }
    
    const url = `${RIOT_ENDPOINTS.ACCOUNT}/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
    const data = await fetchWithCache(url, `account_${riotId}`);
    
    return data.puuid;
  } catch (error) {
    console.error(`[ERROR] getPUUID(${riotId}):`, error);
    return null;
  }
};

/**
 * Obtenir informations Summoner
 */
export const getSummonerByPUUID = async (puuid) => {
  try {
    const url = `${RIOT_ENDPOINTS.SUMMONER}/by-puuid/${puuid}`;
    return await fetchWithCache(url, `summoner_${puuid}`);
  } catch (error) {
    console.error('[ERROR] getSummonerByPUUID:', error);
    return null;
  }
};

/**
 * Obtenir informations de rang
 */
export const getRankInfo = async (summonerId) => {
  try {
    const url = `${RIOT_ENDPOINTS.LEAGUE}/by-summoner/${summonerId}`;
    const data = await fetchWithCache(url, `rank_${summonerId}`);
    
    // Trouver ranked solo/duo
    const soloQueue = data.find(q => q.queueType === 'RANKED_SOLO_5x5');
    
    if (!soloQueue) {
      return { tier: 'UNRANKED', rank: '', lp: 0 };
    }
    
    return {
      tier: soloQueue.tier,
      rank: soloQueue.rank,
      lp: soloQueue.leaguePoints,
      wins: soloQueue.wins,
      losses: soloQueue.losses,
      winRate: ((soloQueue.wins / (soloQueue.wins + soloQueue.losses)) * 100).toFixed(1)
    };
  } catch (error) {
    console.error('[ERROR] getRankInfo:', error);
    return { tier: 'UNRANKED', rank: '', lp: 0 };
  }
};

/**
 * Obtenir liste des IDs de matchs récents
 */
export const getMatchIds = async (puuid, count = 20) => {
  try {
    const url = `${RIOT_ENDPOINTS.MATCH}/by-puuid/${puuid}/ids?count=${count}`;
    return await fetchWithCache(url, `matches_${puuid}_${count}`);
  } catch (error) {
    console.error('[ERROR] getMatchIds:', error);
    return [];
  }
};

/**
 * Obtenir détails d'un match
 */
export const getMatchDetails = async (matchId) => {
  try {
    const url = `${RIOT_ENDPOINTS.MATCH}/${matchId}`;
    return await fetchWithCache(url, `match_${matchId}`);
  } catch (error) {
    console.error(`[ERROR] getMatchDetails(${matchId}):`, error);
    return null;
  }
};

/**
 * Calculer statistiques depuis matchs récents
 */
export const calculatePlayerStats = (matches, puuid) => {
  if (!matches || matches.length === 0) {
    return {
      totalGames: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      kda: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      champions: []
    };
  }
  
  let wins = 0;
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  const championStats = {};
  
  matches.forEach(match => {
    if (!match || !match.info || !match.info.participants) return;
    
    const participant = match.info.participants.find(p => p.puuid === puuid);
    if (!participant) return;
    
    // Comptage victoires
    if (participant.win) wins++;
    
    // KDA
    totalKills += participant.kills;
    totalDeaths += participant.deaths;
    totalAssists += participant.assists;
    
    // Champions joués
    const champ = participant.championName;
    if (!championStats[champ]) {
      championStats[champ] = { games: 0, wins: 0 };
    }
    championStats[champ].games++;
    if (participant.win) championStats[champ].wins++;
  });
  
  const totalGames = matches.length;
  const losses = totalGames - wins;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0;
  const kda = totalDeaths === 0 ? 'Perfect' : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
  
  // Top 5 champions
  const topChampions = Object.entries(championStats)
    .map(([name, stats]) => ({
      name,
      games: stats.games,
      wins: stats.wins,
      winRate: ((stats.wins / stats.games) * 100).toFixed(0)
    }))
    .sort((a, b) => b.games - a.games)
    .slice(0, 5);
  
  return {
    totalGames,
    wins,
    losses,
    winRate: parseFloat(winRate),
    kda: typeof kda === 'string' ? kda : parseFloat(kda),
    avgKills: (totalKills / totalGames).toFixed(1),
    avgDeaths: (totalDeaths / totalGames).toFixed(1),
    avgAssists: (totalAssists / totalGames).toFixed(1),
    champions: topChampions
  };
};

/**
 * FONCTION PRINCIPALE: Obtenir toutes les stats d'un joueur
 */
export const getPlayerStats = async (riotId) => {
  try {
    console.log(`[RIOT API] Fetching stats for ${riotId}`);
    
    // 1. Obtenir PUUID
    const puuid = await getPUUID(riotId);
    if (!puuid) {
      throw new Error('PUUID introuvable');
    }
    
    // 2. Obtenir Summoner
    const summoner = await getSummonerByPUUID(puuid);
    if (!summoner) {
      throw new Error('Summoner introuvable');
    }
    
    // 3. Obtenir Rank
    await delay(50); // Anti rate-limit
    const rankInfo = await getRankInfo(summoner.id);
    
    // 4. Obtenir matchs récents
    await delay(50);
    const matchIds = await getMatchIds(puuid, 20);
    
    // 5. Obtenir détails matchs (avec rate limiting)
    const matches = [];
    for (let i = 0; i < Math.min(matchIds.length, 20); i++) {
      await delay(100); // Rate limit: 100ms entre chaque requête
      const match = await getMatchDetails(matchIds[i]);
      if (match) matches.push(match);
    }
    
    // 6. Calculer stats
    const stats = calculatePlayerStats(matches, puuid);
    
    return {
      ...stats,
      rank: rankInfo,
      summonerName: summoner.name,
      summonerLevel: summoner.summonerLevel,
      profileIconId: summoner.profileIconId,
      lastUpdated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`[ERROR] getPlayerStats(${riotId}):`, error);
    return {
      error: error.message,
      totalGames: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      kda: 0,
      rank: { tier: 'ERROR', rank: '', lp: 0 }
    };
  }
};

/**
 * Mise à jour automatique des stats (à appeler toutes les heures)
 */
export const autoUpdateAllPlayers = async (players) => {
  console.log('[AUTO-UPDATE] Démarrage mise à jour stats...');
  
  const results = [];
  
  for (const player of players) {
    if (player.riotId) {
      console.log(`[AUTO-UPDATE] ${player.name} (${player.riotId})`);
      
      try {
        const stats = await getPlayerStats(player.riotId);
        results.push({
          playerId: player.id,
          stats,
          success: !stats.error
        });
        
        // Pause pour rate limit
        await delay(2000); // 2 secondes entre chaque joueur
        
      } catch (error) {
        console.error(`[AUTO-UPDATE ERROR] ${player.name}:`, error);
        results.push({
          playerId: player.id,
          error: error.message,
          success: false
        });
      }
    }
  }
  
  console.log('[AUTO-UPDATE] Terminé');
  return results;
};

/**
 * Nettoyer le cache
 */
export const clearCache = () => {
  cache.clear();
  console.log('[CACHE] Cache vidé');
};

/**
 * Obtenir statistiques du cache
 */
export const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  };
};

export default {
  getPUUID,
  getSummonerByPUUID,
  getRankInfo,
  getMatchIds,
  getMatchDetails,
  calculatePlayerStats,
  getPlayerStats,
  autoUpdateAllPlayers,
  clearCache,
  getCacheStats
};
