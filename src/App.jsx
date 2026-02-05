import React, { useState, useEffect } from 'react';
import { ChevronRight, X, ArrowLeft, Search, UserPlus } from 'lucide-react';
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
    
    // Check toutes les 500ms si les joueurs ont changé
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

  // Obtenir les joueurs d'une équipe
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

        {/* TEAMS */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-4" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NOS ÉQUIPES
              </h2>
              <p className="text-center text-gray-400 mb-2">Click pour voir les détails</p>
              <p className="text-center text-sm text-gray-600 mb-8">
                {players.length} joueurs inscrits • Connectez-vous au Dashboard pour gérer les rosters
              </p>

              <div className="mb-8 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..." className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:border-red-600 focus:outline-none" />
                </div>
              </div>

              {/* CARTES ROSTER DYNAMIQUES */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map((team) => {
                  const teamColor = team.name === "Froz'nLégion" ? '#FFF' : team.name === 'MymétiC' ? '#2C2C2C' : team.color;
                  const roster = getTeamPlayers(team.id);
                  const isFlipped = flippedCards[team.id];

                  return (
                    <div key={team.id} onClick={() => handleFlipCard(team.id)}
                      className="relative h-[380px] cursor-pointer group" style={{ perspective: '1000px' }}>
                      
                      <div className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* RECTO */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden backdrop-blur-xl transition-all group-hover:scale-[1.03]"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}15, rgba(0,0,0,0.97))`,
                            border: `2px solid ${teamColor}`,
                            boxShadow: `0 4px 24px ${teamColor}50, inset 0 0 60px ${teamColor}05`,
                            backfaceVisibility: 'hidden',
                            clipPath: 'polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)'
                          }}>
                          
                          <div className="relative p-4 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-bold px-2 py-1 rounded" style={{ background: `${teamColor}30`, color: teamColor }}>
                                  {team.rank}
                                </div>
                                <h3 className="text-lg font-black font-bebas tracking-wide" style={{ color: teamColor }}>{team.name}</h3>
                              </div>
                              <div className="text-3xl opacity-30">{team.logo}</div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              <div className="text-center py-1.5 rounded" style={{ background: `${teamColor}08` }}>
                                <div className="text-base font-bebas" style={{ color: teamColor }}>{team.globalStats.totalWins}-{team.globalStats.totalLosses}</div>
                                <div className="text-[10px] text-gray-600 uppercase">Record</div>
                              </div>
                              <div className="text-center py-1.5 rounded" style={{ background: `${teamColor}08` }}>
                                <div className="text-base font-bebas" style={{ color: teamColor }}>{team.globalStats.winRate}%</div>
                                <div className="text-[10px] text-gray-600 uppercase">WR</div>
                              </div>
                              <div className="text-center py-1.5 rounded" style={{ background: `${teamColor}08` }}>
                                <div className="text-base font-bebas" style={{ color: teamColor }}>{roster.length}/5</div>
                                <div className="text-[10px] text-gray-600 uppercase">Roster</div>
                              </div>
                            </div>

                            {/* Roster DYNAMIQUE */}
                            <div className="flex-1 space-y-1 mb-3">
                              {roster.length > 0 ? (
                                roster.map((player) => (
                                  <button key={player.id} onClick={(e) => { e.stopPropagation(); handlePlayerClick(player); }}
                                    className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-2 text-xs">
                                      <span className="text-gray-600 w-8">{player.role}</span>
                                      <span className="text-gray-300 font-medium truncate">{player.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-mono" style={{ color: teamColor }}>{player.kda || 0}</span>
                                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${player.status === 'online' ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                                    </div>
                                  </button>
                                ))
                              ) : (
                                <div className="flex-1 flex flex-col items-center justify-center py-8">
                                  <UserPlus className="w-8 h-8 text-gray-700 mb-2" />
                                  <p className="text-xs text-gray-600 text-center">Aucun joueur inscrit</p>
                                  <p className="text-[10px] text-gray-700 mt-1">Ajoutez des joueurs via le Dashboard</p>
                                </div>
                              )}
                            </div>

                            {/* Progress */}
                            <div className="mb-3">
                              <div className="relative w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <div className="absolute inset-0 h-full rounded-full transition-all duration-1000" 
                                  style={{ 
                                    width: `${team.globalStats.winRate}%`, 
                                    background: `linear-gradient(90deg, ${teamColor}, ${teamColor}AA)`,
                                    boxShadow: `0 0 8px ${teamColor}`
                                  }}></div>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-gray-600 uppercase">Performance</span>
                                <span className="text-xs font-bold" style={{ color: teamColor }}>{team.globalStats.winRate}%</span>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-1.5 items-center justify-between">
                              <div className="flex gap-1.5 flex-wrap">
                                {team.competitions.slice(0, 2).map((comp, i) => (
                                  <div key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded" 
                                    style={{ background: `${teamColor}20`, color: teamColor }}>
                                    #{comp.position} {comp.name.split(' ')[0]}
                                  </div>
                                ))}
                              </div>
                              <span className="text-[9px] text-gray-700 uppercase">Click ↻</span>
                            </div>
                          </div>

                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            style={{ boxShadow: `inset 0 0 40px ${teamColor}20` }}></div>
                        </div>

                        {/* VERSO */}
                        <div className="absolute inset-0 rounded-xl backdrop-blur-xl p-4"
                          style={{ 
                            background: `linear-gradient(135deg, ${teamColor}20, rgba(0,0,0,0.97))`, 
                            border: `2px solid ${teamColor}`, 
                            backfaceVisibility: 'hidden', 
                            transform: 'rotateY(180deg)',
                            clipPath: 'polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)'
                          }}>
                          <h3 className="text-lg font-bebas mb-3 text-center" style={{ color: teamColor }}>STATISTIQUES</h3>
                          <div className="space-y-2">
                            {team.competitions.map((comp, i) => (
                              <div key={i} className="p-2 rounded bg-white/5 border-l-2" style={{ borderColor: teamColor }}>
                                <div className="text-xs font-bold mb-0.5">{comp.name}</div>
                                <div className="flex justify-between text-[10px] text-gray-500">
                                  <span>#{comp.position}</span>
                                  <span>{comp.points} pts • {comp.wins}V-{comp.losses}D</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-[9px] text-center text-gray-700 mt-3 uppercase">Click retour</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* NEWS */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-16" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ACTUALITÉS
              </h2>
              <p className="text-center text-gray-500">Section à venir...</p>
            </div>
          </section>
        )}
      </div>

      {/* MODAL JOUEUR */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90" onClick={() => setSelectedPlayer(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/30 rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bebas">PROFIL</h3>
              <button onClick={() => setSelectedPlayer(null)} className="p-2 hover:bg-red-600/20 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-4xl font-bebas">
                {selectedPlayer.name[0]}
              </div>
              <h4 className="text-2xl font-bold">{selectedPlayer.name}</h4>
              {selectedPlayer.realName && <p className="text-sm text-gray-500">{selectedPlayer.realName}</p>}
              <p className="text-xs text-gray-600 mt-1">{selectedPlayer.role} • {selectedPlayer.rank}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-red-600/10">
                <div className="text-2xl font-bebas text-red-400">{selectedPlayer.kda || 0}</div>
                <div className="text-xs text-gray-500">KDA</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-600/10">
                <div className="text-2xl font-bebas text-green-400">{selectedPlayer.winRate || 0}%</div>
                <div className="text-xs text-gray-500">WR</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-600/10">
                <div className="text-sm font-bebas text-blue-400">{selectedPlayer.gamesPlayed || 0}</div>
                <div className="text-xs text-gray-500">Games</div>
              </div>
            </div>
            {selectedPlayer.champions && selectedPlayer.champions.some(c => c) && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2">Champions</div>
                <div className="flex gap-2">
                  {selectedPlayer.champions.filter(c => c).map((champ, i) => (
                    <div key={i} className="flex-1 text-xs text-center py-2 rounded bg-white/5">{champ}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-red-900/30 mt-20 py-12 text-center text-sm text-gray-600">
        <p>© 2026 Structure TravL E-sports</p>
      </footer>

      <style jsx>{`
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

export default App;
