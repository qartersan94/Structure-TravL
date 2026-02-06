import React, { useState, useEffect } from 'react';
import { ChevronRight, X, ArrowLeft, Search, UserPlus, ExternalLink } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

// Import getPlayers depuis PlayerManager
const getPlayers = () => {
  const stored = localStorage.getItem('travl_players');
  return stored ? JSON.parse(stored) : [];
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState(getPlayers());

  // Rafraîchir les joueurs depuis localStorage
  useEffect(() => {
    const handleStorage = () => setPlayers(getPlayers());
    window.addEventListener('storage', handleStorage);
    
    const interval = setInterval(() => {
      setPlayers(getPlayers());
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFlipCard = (teamId) => setFlippedCards(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  const handlePlayerClick = (player) => setSelectedPlayer(player);

  const getTeamPlayers = (teamId) => {
    return players.filter(p => p.teamId === teamId).slice(0, 5);
  };

  const filteredTeams = TEAMS.filter(t => 
    !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    players.some(p => p.teamId === t.id && p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-black">
        <button onClick={() => setLoggedInUser(null)}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
          style={{ background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.4)' }}>
          <ArrowLeft className="w-4 h-4 text-red-400" />
        </button>
        <Dashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
      </div>
    );
  }

  if (activeSection === 'dashboard') {
    return <LoginForm onLogin={setLoggedInUser} onBack={() => setActiveSection('home')} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrollY > 50 ? 'bg-black/95 backdrop-blur-xl border-b border-red-900/30' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:rotate-12"
              style={{ background: '#000', boxShadow: '0 0 30px rgba(220,20,60,0.8)', border: '4px solid #DC143C' }}>
              <span className="text-4xl font-black font-bebas" style={{ textShadow: '0 0 20px rgba(220,20,60,0.8)' }}>TL</span>
            </div>
            <div>
              <h1 className="text-4xl font-black font-bebas" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Structure TravL
              </h1>
              <p className="text-sm text-gray-400">E-SPORTS</p>
            </div>
          </div>
          <div className="hidden md:flex gap-1">
            {['home', 'teams', 'news', 'dashboard'].map(id => (
              <button key={id} onClick={() => setActiveSection(id)}
                className={`relative px-6 py-3 rounded-lg font-semibold transition-all ${activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {activeSection === id && <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-80"></div>}
                <span className="relative z-10">{id === 'home' ? 'Accueil' : id === 'teams' ? 'Équipes' : id === 'news' ? 'Actualités' : 'Dashboard'}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-24">
        {/* HOME */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-block mb-6 px-6 py-2 rounded-full bg-red-900/30 border border-red-600/50 animate-pulse">
                <span className="text-sm font-bold text-red-400">STRUCTURE ESPORTS</span>
              </div>
              <h1 className="text-8xl font-black mb-6 font-bebas" style={{ background: 'linear-gradient(to bottom, #FFF, #DC143C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Structure TravL<br />E-SPORTS
              </h1>
              <p className="text-2xl text-gray-300 mb-12">Commence ton voyage avec nous</p>
              <button onClick={() => setActiveSection('teams')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold text-lg hover:scale-105 transition-all"
                style={{ boxShadow: '0 0 40px rgba(220,20,60,0.6)' }}>
                Découvrir nos équipes <ChevronRight className="inline ml-2" />
              </button>
            </div>
          </section>
        )}

        {/* TEAMS - NOUVEAU DESIGN COMPACT ET PRO */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-4" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NOS ÉQUIPES
              </h2>
              <p className="text-center text-gray-400 mb-2">Click pour voir les détails</p>
              <p className="text-center text-sm text-gray-600 mb-8">
                {players.length} joueurs inscrits • {TEAMS.length} équipes actives
              </p>

              <div className="mb-8 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher une équipe ou un joueur..."
                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:border-red-600 focus:outline-none" />
                </div>
              </div>

              {/* NOUVELLES CARTES ROSTER - COMPACTES ET PRO */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTeams.map((team) => {
                  const teamColor = team.color;
                  const roster = getTeamPlayers(team.id);
                  const isFlipped = flippedCards[team.id];

                  return (
                    <div key={team.id} onClick={() => handleFlipCard(team.id)}
                      className="relative h-[340px] cursor-pointer group" style={{ perspective: '1000px' }}>
                      
                      <div className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* RECTO - VERSION COMPACTE */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden backdrop-blur-xl transition-all group-hover:scale-[1.02]"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}20, rgba(0,0,0,0.95))`,
                            border: `2px solid ${teamColor}40`,
                            boxShadow: `0 8px 32px ${teamColor}30`,
                            backfaceVisibility: 'hidden'
                          }}>
                          
                          <div className="relative p-4 h-full flex flex-col">
                            {/* Header compact */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-bold px-2 py-1 rounded-lg" 
                                  style={{ background: `${teamColor}30`, color: teamColor }}>
                                  {team.rank}
                                </div>
                              </div>
                              <div className="text-2xl">{team.logo}</div>
                            </div>

                            <h3 className="text-2xl font-black font-bebas mb-1" style={{ color: teamColor }}>
                              {team.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">{team.league}</p>

                            {/* Stats compactes */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <div className="text-center py-2 rounded-lg" style={{ background: `${teamColor}10` }}>
                                <div className="text-lg font-bold" style={{ color: teamColor }}>
                                  {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                                </div>
                                <div className="text-[9px] text-gray-600 uppercase">Record</div>
                              </div>
                              <div className="text-center py-2 rounded-lg" style={{ background: `${teamColor}10` }}>
                                <div className="text-lg font-bold" style={{ color: teamColor }}>
                                  {team.globalStats.winRate}%
                                </div>
                                <div className="text-[9px] text-gray-600 uppercase">WR</div>
                              </div>
                              <div className="text-center py-2 rounded-lg" style={{ background: `${teamColor}10` }}>
                                <div className="text-lg font-bold" style={{ color: teamColor }}>
                                  {roster.length}/5
                                </div>
                                <div className="text-[9px] text-gray-600 uppercase">Roster</div>
                              </div>
                            </div>

                            {/* Roster compact */}
                            <div className="flex-1 space-y-1.5 mb-3 overflow-y-auto">
                              {roster.length > 0 ? (
                                roster.map((player) => (
                                  <button key={player.id} 
                                    onClick={(e) => { e.stopPropagation(); handlePlayerClick(player); }}
                                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 transition-all border border-white/5">
                                    <div className="flex items-center gap-2 text-xs">
                                      <span className="text-gray-500 w-12 font-bold">{player.role}</span>
                                      <span className="text-white font-medium truncate">{player.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-mono" style={{ color: teamColor }}>
                                        {player.kda || '0.0'}
                                      </span>
                                      <span className={`w-1.5 h-1.5 rounded-full ${player.status === 'online' ? 'bg-green-500' : 'bg-gray-600'}`}></span>
                                    </div>
                                  </button>
                                ))
                              ) : (
                                <div className="flex-1 flex flex-col items-center justify-center py-6">
                                  <UserPlus className="w-10 h-10 text-gray-700 mb-2 opacity-50" />
                                  <p className="text-xs text-gray-600 text-center">Aucun joueur inscrit</p>
                                  <p className="text-[10px] text-gray-700 mt-1">Dashboard → Ajouter joueurs</p>
                                </div>
                              )}
                            </div>

                            {/* Barre de performance */}
                            <div className="mb-3">
                              <div className="relative w-full h-1.5 rounded-full overflow-hidden bg-white/5">
                                <div className="absolute inset-0 h-full rounded-full transition-all duration-1000" 
                                  style={{ 
                                    width: `${team.globalStats.winRate}%`, 
                                    background: teamColor,
                                    boxShadow: `0 0 10px ${teamColor}`
                                  }}></div>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-[9px] text-gray-600 uppercase">Performance</span>
                                <span className="text-xs font-bold" style={{ color: teamColor }}>
                                  {team.globalStats.winRate}%
                                </span>
                              </div>
                            </div>

                            {/* Badges compétitions */}
                            <div className="flex gap-1.5 items-center justify-between">
                              <div className="flex gap-1 flex-wrap flex-1">
                                {team.competitions.slice(0, 2).map((comp, i) => (
                                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md" 
                                    style={{ background: `${teamColor}25`, color: teamColor }}>
                                    #{comp.position} {comp.name.split(' ')[0]}
                                  </span>
                                ))}
                              </div>
                              <span className="text-[9px] text-gray-700 uppercase whitespace-nowrap">↻</span>
                            </div>
                          </div>
                        </div>

                        {/* VERSO - Statistiques détaillées */}
                        <div className="absolute inset-0 rounded-xl backdrop-blur-xl p-4"
                          style={{ 
                            background: `linear-gradient(135deg, ${teamColor}25, rgba(0,0,0,0.95))`, 
                            border: `2px solid ${teamColor}40`, 
                            backfaceVisibility: 'hidden', 
                            transform: 'rotateY(180deg)'
                          }}>
                          <h3 className="text-xl font-bebas mb-4 text-center" style={{ color: teamColor }}>
                            STATISTIQUES DÉTAILLÉES
                          </h3>
                          <div className="space-y-2">
                            {team.competitions.map((comp, i) => (
                              <div key={i} className="p-3 rounded-lg bg-white/5 border-l-2 hover:bg-white/10 transition-all" 
                                style={{ borderColor: teamColor }}>
                                <div className="text-sm font-bold mb-1 text-white">{comp.name}</div>
                                <div className="flex justify-between text-xs text-gray-400">
                                  <span className="font-semibold" style={{ color: teamColor }}>#{comp.position}</span>
                                  <span>{comp.points} pts</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {comp.wins}V - {comp.losses}D
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-[9px] text-center text-gray-700 mt-4 uppercase">Click pour retourner</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Section NEWS moderne et compacte */}
              <div className="mt-16 bg-black/20 backdrop-blur-xl border-t border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-1">DERNIÈRES ACTUALITÉS</h3>
                    <p className="text-sm text-gray-500">Restez informé de nos performances</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-semibold text-sm hover:bg-red-500/30 transition-all">
                    Voir tout
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Exemple actualité 1 */}
                  <div className="flex gap-4 p-4 rounded-xl bg-black/40 border border-white/10 hover:border-red-500/30 transition-all group cursor-pointer">
                    <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                      <span className="text-4xl">🏆</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                          VICTOIRE
                        </span>
                        <span className="text-xs text-gray-500">Il y a 2 jours</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors line-clamp-1">
                        FLUX remporte la Prime League !
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                        Performance exceptionnelle face aux meilleurs équipes européennes.
                      </p>
                      <button className="flex items-center gap-1 text-red-400 font-semibold text-xs group-hover:gap-2 transition-all">
                        Lire <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Exemple actualité 2 */}
                  <div className="flex gap-4 p-4 rounded-xl bg-black/40 border border-white/10 hover:border-green-500/30 transition-all group cursor-pointer">
                    <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                          ROSTER
                        </span>
                        <span className="text-xs text-gray-500">Il y a 1 semaine</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1 group-hover:text-green-400 transition-colors line-clamp-1">
                        Nouveau joueur rejoint MymétiC
                      </h4>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                        Un talent prometteur vient renforcer notre roster Master.
                      </p>
                      <button className="flex items-center gap-1 text-green-400 font-semibold text-xs group-hover:gap-2 transition-all">
                        Lire <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEWS */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-16" 
                style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ACTUALITÉS
              </h2>
              <p className="text-center text-gray-500">Section complète en développement...</p>
            </div>
          </section>
        )}
      </div>

      {/* MODAL JOUEUR */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" 
          onClick={() => setSelectedPlayer(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/30 rounded-2xl p-8 max-w-md w-full" 
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bebas">PROFIL JOUEUR</h3>
              <button onClick={() => setSelectedPlayer(null)} 
                className="p-2 hover:bg-red-600/20 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-4xl font-bebas shadow-lg">
                {selectedPlayer.name[0]}
              </div>
              <h4 className="text-2xl font-bold">{selectedPlayer.name}</h4>
              {selectedPlayer.realName && <p className="text-sm text-gray-500">{selectedPlayer.realName}</p>}
              <p className="text-xs text-gray-600 mt-1">{selectedPlayer.role} • {selectedPlayer.rank}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-red-600/10 border border-red-600/20">
                <div className="text-2xl font-bebas text-red-400">{selectedPlayer.kda || '0.0'}</div>
                <div className="text-xs text-gray-500">KDA</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-600/10 border border-green-600/20">
                <div className="text-2xl font-bebas text-green-400">{selectedPlayer.winRate || 0}%</div>
                <div className="text-xs text-gray-500">WR</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
                <div className="text-sm font-bebas text-blue-400">{selectedPlayer.gamesPlayed || 0}</div>
                <div className="text-xs text-gray-500">Games</div>
              </div>
            </div>
            {selectedPlayer.champions && selectedPlayer.champions.some(c => c) && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2">Champions principaux</div>
                <div className="flex gap-2">
                  {selectedPlayer.champions.filter(c => c).map((champ, i) => (
                    <div key={i} className="flex-1 text-xs text-center py-2 rounded bg-white/5 border border-white/10">
                      {champ}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-red-900/30 mt-20 py-12 text-center text-sm text-gray-600">
        <p>© 2026 Structure TravL E-sports • Tous droits réservés</p>
      </footer>

      <style jsx>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
