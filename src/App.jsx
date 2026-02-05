import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, ArrowLeft, Search, Filter, TrendingUp, Users, Award, Zap } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

// ============================================================
// DONNÉES JOUEURS COMPLÈTES
// ============================================================
const PLAYERS_DATABASE = {
  1: [ // Mount X
    { id: 1, role: 'Top', name: 'MountainKing', realName: 'Alexandre Martin', kda: 3.8, winRate: 68, gamesPlayed: 45, champion1: 'Aatrox', champion2: 'Darius', champion3: 'Garen', rank: 'Master 280LP', status: 'online' },
    { id: 2, role: 'Jungle', name: 'XPredator', realName: 'Lucas Dubois', kda: 4.2, winRate: 72, gamesPlayed: 48, champion1: 'Lee Sin', champion2: 'Graves', champion3: 'Vi', rank: 'Master 310LP', status: 'online' },
    { id: 3, role: 'Mid', name: 'NexusCore', realName: 'Thomas Leclerc', kda: 5.1, winRate: 74, gamesPlayed: 52, champion1: 'Ahri', champion2: 'Syndra', champion3: 'Orianna', rank: 'Grandmaster 120LP', status: 'online' },
    { id: 4, role: 'ADC', name: 'ArrowStorm', realName: 'Julien Moreau', kda: 6.5, winRate: 76, gamesPlayed: 50, champion1: 'Jinx', champion2: 'Caitlyn', champion3: 'Ashe', rank: 'Master 290LP', status: 'online' },
    { id: 5, role: 'Support', name: 'ShieldMaster', realName: 'Antoine Bernard', kda: 3.5, winRate: 65, gamesPlayed: 47, champion1: 'Thresh', champion2: 'Nautilus', champion3: 'Leona', rank: 'Master 250LP', status: 'online' }
  ],
  2: [ // Flux  
    { id: 6, role: 'Top', name: 'FlameWave', realName: 'Pierre Durand', kda: 3.2, winRate: 62, gamesPlayed: 42, champion1: 'Fiora', champion2: 'Irelia', champion3: 'Riven', rank: 'Diamond I 80LP', status: 'online' },
    { id: 7, role: 'Jungle', name: 'TidalBreaker', realName: 'Marc Petit', kda: 3.9, winRate: 64, gamesPlayed: 40, champion1: 'Elise', champion2: 'Nidalee', champion3: 'Kha\'Zix', rank: 'Diamond I 95LP', status: 'offline' },
    { id: 8, role: 'Mid', name: 'StormCaller', realName: 'Hugo Simon', kda: 4.8, winRate: 70, gamesPlayed: 44, champion1: 'Zed', champion2: 'Yasuo', champion3: 'Katarina', rank: 'Master 100LP', status: 'online' },
    { id: 9, role: 'ADC', name: 'BlizzardShot', realName: 'Maxime Laurent', kda: 4.1, winRate: 58, gamesPlayed: 38, champion1: 'Kai\'Sa', champion2: 'Vayne', champion3: 'Ezreal', rank: 'Diamond I 75LP', status: 'online' },
    { id: 10, role: 'Support', name: 'FrostBite', realName: 'Nicolas Michel', kda: 2.8, winRate: 55, gamesPlayed: 41, champion1: 'Braum', champion2: 'Alistar', champion3: 'Rakan', rank: 'Diamond I 60LP', status: 'online' }
  ],
  // Ajoutez les autres équipes...
};

const TEAM_ICONS = { 1: '⚡', 2: '🔥', 3: '❄️', 4: '👁️', 5: '🌑', 6: '⭐', 7: '⚔️' };

const SPONSORS = [
  { id: 1, name: 'Red Bull', logo: '🔴', tier: 'GOLD', url: '#' },
  { id: 2, name: 'Logitech', logo: '🖱️', tier: 'GOLD', url: '#' },
  { id: 3, name: 'HyperX', logo: '🎧', tier: 'SILVER', url: '#' },
  { id: 4, name: 'ASUS ROG', logo: '💻', tier: 'GOLD', url: '#' },
  { id: 5, name: 'Monster Energy', logo: '⚡', tier: 'SILVER', url: '#' },
];

const NEWS_FEED = [
  { id: 1, title: 'Mount X remporte le Nexus Tour !', date: '2 Février 2026', category: 'Victoire', emoji: '🏆', excerpt: 'Mount X domine la finale 3-1.', color: '#00FF88', views: 1520 },
  { id: 2, title: 'Nouveau joueur : ShadowBlade rejoint Flux', date: '1 Février 2026', category: 'Roster', emoji: '🔥', excerpt: 'Le midlaner Challenger rejoint Flux.', color: '#FF6B35', views: 980 },
  { id: 3, title: 'MymétiC en finale de Prime League', date: '31 Janvier 2026', category: 'Compétition', emoji: '⚔️', excerpt: 'Qualification après une série intense.', color: '#FF1493', views: 1200 }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // ÉTATS FONCTIONNELS
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rankFilter, setRankFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rank');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FONCTION FLIP CARTE
  const handleFlipCard = (teamId) => {
    setFlippedCards(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  // FONCTION OPEN MODAL JOUEUR
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  // FILTRER ET TRIER LES ÉQUIPES
  const getFilteredTeams = () => {
    let filtered = [...TEAMS];

    // Filtre par rank
    if (rankFilter !== 'all') {
      filtered = filtered.filter(t => t.rank.includes(rankFilter));
    }

    // Recherche
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (PLAYERS_DATABASE[t.id] || []).some(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Tri
    if (sortBy === 'winrate') {
      filtered.sort((a, b) => b.globalStats.winRate - a.globalStats.winRate);
    } else if (sortBy === 'games') {
      filtered.sort((a, b) => b.globalStats.totalGames - a.globalStats.totalGames);
    }

    return filtered;
  };

  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-black">
        <button onClick={() => setLoggedInUser(null)}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
          style={{ background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.4)', backdropFilter: 'blur(12px)' }}>
          <ArrowLeft className="w-4 h-4 text-red-400" />
          <span className="text-sm font-bold text-red-400">Retour</span>
        </button>
        <Dashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
      </div>
    );
  }

  if (activeSection === 'dashboard') {
    return <LoginForm onLogin={(account) => setLoggedInUser(account)} onBack={() => setActiveSection('home')} />;
  }

  const filteredTeams = getFilteredTeams();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black bg-opacity-95 backdrop-blur-xl border-b border-red-900 border-opacity-30' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveSection('home')}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                style={{ background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)', boxShadow: '0 0 30px rgba(220, 20, 60, 0.8)', border: '3px solid rgba(220, 20, 60, 0.4)' }}>
                <span className="text-4xl font-black font-bebas text-white">TL</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black font-bebas" style={{
                  background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Structure TravL</h1>
                <p className="text-sm text-gray-400 tracking-widest">E-SPORTS</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'teams', label: 'Équipes' },
                { id: 'news', label: 'Actualités' },
                { id: 'dashboard', label: 'Dashboard' }
              ].map((item) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`relative px-6 py-3 rounded-lg font-semibold transition-all ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-80"></div>
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-24">
        
        {/* HOME */}
        {activeSection === 'home' && (
          <div>
            <section className="relative min-h-screen flex items-center justify-center px-4">
              <div className="max-w-6xl mx-auto text-center">
                <div className="inline-block mb-6 px-6 py-2 rounded-full bg-red-900 bg-opacity-30 border border-red-600 border-opacity-50 animate-pulse">
                  <span className="text-sm font-bold text-red-400 tracking-widest">STRUCTURE ESPORTS</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 font-bebas" style={{
                  background: 'linear-gradient(to bottom, #FFFFFF, #DC143C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Structure TravL<br />E-SPORTS</h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                  Commence ton voyage avec nous
                </p>
                <button onClick={() => setActiveSection('teams')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                  style={{ boxShadow: '0 0 40px rgba(220, 20, 60, 0.6)' }}>
                  Découvrir nos équipes <ChevronRight className="inline ml-2" />
                </button>
              </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: '🏆', value: '7', label: 'Équipes', color: '#DC143C' },
                  { icon: '🎮', value: '35+', label: 'Joueurs', color: '#00FF88' },
                  { icon: '📊', value: '65%', label: 'Winrate', color: '#FFD700' },
                  { icon: '🌟', value: '3', label: 'Compétitions', color: '#9D4EDD' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border hover:scale-105 transition-all cursor-pointer group"
                    style={{ borderColor: `${stat.color}30` }}>
                    <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{stat.icon}</div>
                    <div className="text-4xl font-black font-bebas mb-2" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sponsors */}
            <section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-black font-bebas text-center mb-12" style={{
                  background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>NOS PARTENAIRES</h2>
                <div className="rounded-2xl p-8" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.2)' }}>
                  <div className="flex items-center justify-around flex-wrap gap-8">
                    {SPONSORS.map(s => (
                      <button key={s.id} onClick={() => window.open(s.url, '_blank')}
                        className="flex flex-col items-center gap-3 p-6 rounded-xl hover:-translate-y-2 hover:scale-110 transition-all cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <div className="text-5xl">{s.logo}</div>
                        <div className="text-sm font-bold">{s.name}</div>
                        <div className="text-xs text-gray-500 uppercase">{s.tier}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TEAMS - FONCTIONNEL */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-4" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>NOS ÉQUIPES</h2>
              <p className="text-center text-gray-400 mb-8">Click sur une carte pour voir les détails</p>

              {/* FILTRES ET RECHERCHE */}
              <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Recherche */}
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher une équipe ou un joueur..."
                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Filtres */}
                <div className="flex gap-3">
                  <select
                    value={rankFilter}
                    onChange={(e) => setRankFilter(e.target.value)}
                    className="px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:border-red-600 focus:outline-none cursor-pointer">
                    <option value="all">Tous les rangs</option>
                    <option value="Master">Master</option>
                    <option value="Diamond">Diamond</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:border-red-600 focus:outline-none cursor-pointer">
                    <option value="rank">Trier par rang</option>
                    <option value="winrate">Trier par winrate</option>
                    <option value="games">Trier par matchs</option>
                  </select>
                </div>
              </div>

              {/* CARTES FLIP */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map((team) => {
                  const teamColor = team.name === "Froz'nLégion" ? '#FFFFFF' : team.name === 'MymétiC' ? '#2C2C2C' : team.color;
                  const roster = PLAYERS_DATABASE[team.id] || [];
                  const isFlipped = flippedCards[team.id];

                  return (
                    <div key={team.id}
                      onClick={() => handleFlipCard(team.id)}
                      className="relative h-[600px] cursor-pointer group"
                      style={{ perspective: '1000px' }}>
                      
                      <div className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* RECTO */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}20, rgba(0,0,0,0.9))`,
                            border: `2px solid ${teamColor}50`,
                            boxShadow: `0 10px 40px ${teamColor}30`,
                            backfaceVisibility: 'hidden'
                          }}>
                          
                          {/* Icône watermark */}
                          <div className="absolute top-4 right-4 text-9xl opacity-10 pointer-events-none">
                            {TEAM_ICONS[team.id]}
                          </div>

                          <div className="relative z-10 p-6 h-full flex flex-col">
                            {/* Header */}
                            <div className="border-b pb-4" style={{ borderColor: `${teamColor}30` }}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${teamColor}30`, color: teamColor }}>
                                  {team.rank}
                                </div>
                                <div className="text-4xl">{team.logo}</div>
                              </div>
                              <h3 className="text-3xl font-black font-bebas mb-2" style={{ color: teamColor }}>{team.name}</h3>
                              <p className="text-xs text-gray-400 italic">"{team.motto}"</p>
                            </div>

                            {/* Roster */}
                            <div className="flex-1 mt-4">
                              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">ROSTER</div>
                              <div className="space-y-2">
                                {roster.slice(0, 5).map((player) => (
                                  <button
                                    key={player.id}
                                    onClick={(e) => { e.stopPropagation(); handlePlayerClick(player); }}
                                    className="w-full flex items-center justify-between text-sm hover:bg-white hover:bg-opacity-5 p-2 rounded-lg transition-all">
                                    <div className="flex items-center gap-2">
                                      <div className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${teamColor}20`, color: teamColor }}>
                                        {player.role}
                                      </div>
                                      <span className="text-gray-300">{player.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-gray-500">{player.kda} KDA</span>
                                      <span className={`w-2 h-2 rounded-full ${player.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-auto pt-4 border-t" style={{ borderColor: `${teamColor}30` }}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-500">Winrate</span>
                                <span className="text-sm font-bold" style={{ color: teamColor }}>{team.globalStats.winRate}%</span>
                              </div>
                              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="h-full transition-all duration-1000" style={{ width: `${team.globalStats.winRate}%`, background: teamColor }}></div>
                              </div>
                              <p className="text-xs text-center text-gray-600 mt-3">Click pour voir plus</p>
                            </div>
                          </div>
                        </div>

                        {/* VERSO */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}15, rgba(0,0,0,0.95))`,
                            border: `2px solid ${teamColor}50`,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}>
                          <div className="p-6 h-full flex flex-col">
                            <h3 className="text-2xl font-bebas mb-4" style={{ color: teamColor }}>STATISTIQUES</h3>
                            
                            <div className="space-y-4 flex-1">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-400">Record</span>
                                  <span className="font-bold" style={{ color: teamColor }}>
                                    {team.globalStats.totalWins}V - {team.globalStats.totalLosses}D
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-400">Winrate</span>
                                  <span className="font-bold" style={{ color: teamColor }}>{team.globalStats.winRate}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Matchs joués</span>
                                  <span className="font-bold" style={{ color: teamColor }}>{team.globalStats.totalGames}</span>
                                </div>
                              </div>

                              {team.competitions.map((comp, i) => (
                                <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                  <div className="text-sm font-bold mb-1">{comp.name}</div>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Position #{comp.position}</span>
                                    <span>{comp.points} pts</span>
                                  </div>
                                </div>
                              ))}

                              {team.achievements.length > 0 && (
                                <div className="mt-4">
                                  <div className="text-xs text-gray-500 mb-2 uppercase">Achievements</div>
                                  {team.achievements.map((ach, i) => (
                                    <div key={i} className="text-xs text-gray-400 flex items-center gap-2 mb-1">
                                      <Award className="w-3 h-3" style={{ color: teamColor }} />
                                      {ach}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-center text-gray-600 mt-4">Click pour retourner</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredTeams.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  <p>Aucune équipe trouvée</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* NEWS */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>ACTUALITÉS</h2>
              <div className="space-y-6">
                {NEWS_FEED.map(article => (
                  <div key={article.id} className="rounded-2xl overflow-hidden hover:-translate-y-1 transition-all cursor-pointer"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)' }}>
                    <div className="h-2" style={{ background: article.color }}></div>
                    <div className="p-8">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">{article.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: article.color + '22', color: article.color }}>
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-600">{article.date}</span>
                            <span className="text-xs text-gray-600 ml-auto flex items-center gap-1">
                              👁️ {article.views}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                          <p className="text-gray-300">{article.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* MODAL JOUEUR */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={() => setSelectedPlayer(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-30 rounded-2xl p-8 max-w-md w-full animate-fadeInScale"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bebas">PROFIL JOUEUR</h3>
              <button onClick={() => setSelectedPlayer(null)} className="p-2 hover:bg-red-600 hover:bg-opacity-20 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-4xl font-bebas">
                  {selectedPlayer.name[0]}
                </div>
                <h4 className="text-2xl font-bold">{selectedPlayer.name}</h4>
                <p className="text-gray-500 text-sm">{selectedPlayer.realName}</p>
                <p className="text-xs text-gray-600 mt-1">{selectedPlayer.role} • {selectedPlayer.rank}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-red-600 bg-opacity-10 border border-red-600 border-opacity-20">
                  <div className="text-2xl font-bebas text-red-400">{selectedPlayer.kda}</div>
                  <div className="text-xs text-gray-500">KDA</div>
                </div>
                <div className="p-3 rounded-lg bg-green-600 bg-opacity-10 border border-green-600 border-opacity-20">
                  <div className="text-2xl font-bebas text-green-400">{selectedPlayer.winRate}%</div>
                  <div className="text-xs text-gray-500">Winrate</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-600 bg-opacity-10 border border-blue-600 border-opacity-20">
                  <div className="text-2xl font-bebas text-blue-400">{selectedPlayer.gamesPlayed}</div>
                  <div className="text-xs text-gray-500">Matchs</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 uppercase mb-2">Champions favoris</div>
                <div className="flex gap-2">
                  {[selectedPlayer.champion1, selectedPlayer.champion2, selectedPlayer.champion3].map((champ, i) => (
                    <div key={i} className="flex-1 p-2 rounded-lg bg-white bg-opacity-5 text-center text-sm">
                      {champ}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${selectedPlayer.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
                <span className="text-sm text-gray-400">{selectedPlayer.status === 'online' ? 'En ligne' : 'Hors ligne'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-red-900 border-opacity-30 bg-black bg-opacity-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-gray-600">
          <p>© 2026 Structure TravL E-sports. Tous droits réservés.</p>
        </div>
      </footer>

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default App;
