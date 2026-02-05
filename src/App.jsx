import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, ArrowLeft, Search } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

const PLAYERS_DB = {
  1: [
    { id: 1, role: 'Top', name: 'MountainKing', kda: 3.8, winRate: 68, rank: 'Master 280LP', status: 'online' },
    { id: 2, role: 'Jungle', name: 'XPredator', kda: 4.2, winRate: 72, rank: 'Master 310LP', status: 'online' },
    { id: 3, role: 'Mid', name: 'NexusCore', kda: 5.1, winRate: 74, rank: 'GM 120LP', status: 'online' },
    { id: 4, role: 'ADC', name: 'ArrowStorm', kda: 6.5, winRate: 76, rank: 'Master 290LP', status: 'online' },
    { id: 5, role: 'Support', name: 'ShieldMaster', kda: 3.5, winRate: 65, rank: 'Master 250LP', status: 'online' }
  ],
  2: [
    { id: 6, role: 'Top', name: 'FlameWave', kda: 3.2, winRate: 62, rank: 'Diamond I', status: 'online' },
    { id: 7, role: 'Jungle', name: 'TidalBreaker', kda: 3.9, winRate: 64, rank: 'Diamond I', status: 'offline' },
    { id: 8, role: 'Mid', name: 'StormCaller', kda: 4.8, winRate: 70, rank: 'Master', status: 'online' },
    { id: 9, role: 'ADC', name: 'BlizzardShot', kda: 4.1, winRate: 58, rank: 'Diamond I', status: 'online' },
    { id: 10, role: 'Support', name: 'FrostBite', kda: 2.8, winRate: 55, rank: 'Diamond I', status: 'online' }
  ]
};

const TEAM_ICONS = { 1: '⚡', 2: '🔥', 3: '❄️', 4: '👁️', 5: '🌑', 6: '⭐', 7: '⚔️' };
const ROLE_ICONS = { Top: '🛡️', Jungle: '🌲', Mid: '⚡', ADC: '🎯', Support: '💚' };

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFlipCard = (teamId) => setFlippedCards(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  const handlePlayerClick = (player) => setSelectedPlayer(player);

  const filteredTeams = TEAMS.filter(t => 
    !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (PLAYERS_DB[t.id] || []).some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrollY > 50 ? 'bg-black bg-opacity-95 backdrop-blur-xl border-b border-red-900/30' : ''}`}>
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
          <div>
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
          </div>
        )}

        {/* TEAMS */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-4" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NOS ÉQUIPES
              </h2>
              <p className="text-center text-gray-400 mb-8">Click sur une carte pour voir les détails</p>

              <div className="mb-8 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..." className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:border-red-600 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map((team) => {
                  const teamColor = team.name === "Froz'nLégion" ? '#FFF' : team.name === 'MymétiC' ? '#2C2C2C' : team.color;
                  const roster = PLAYERS_DB[team.id] || [];
                  const isFlipped = flippedCards[team.id];

                  return (
                    <div key={team.id} onClick={() => handleFlipCard(team.id)}
                      className="relative h-[480px] cursor-pointer" style={{ perspective: '1000px' }}>
                      
                      <div className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* RECTO */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}12, rgba(0,0,0,0.95))`,
                            border: `2px solid ${teamColor}`,
                            boxShadow: `0 8px 32px ${teamColor}40, inset 0 0 80px ${teamColor}08`,
                            backfaceVisibility: 'hidden'
                          }}>
                          
                          <div className="p-5 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="text-3xl">{team.logo}</div>
                                <div className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: `${teamColor}25`, color: teamColor }}>
                                  {team.rank}
                                </div>
                              </div>
                              <div className="text-6xl opacity-20">{TEAM_ICONS[team.id]}</div>
                            </div>

                            {/* Nom */}
                            <div className="mb-4 text-center">
                              <h3 className="text-2xl font-black font-bebas" style={{ color: teamColor }}>{team.name}</h3>
                              <p className="text-xs text-gray-500 italic">"{team.motto}"</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="text-center p-2 rounded-lg" style={{ background: `${teamColor}08`, border: `1px solid ${teamColor}30` }}>
                                <div className="text-xl font-bebas" style={{ color: teamColor }}>{team.globalStats.totalWins}-{team.globalStats.totalLosses}</div>
                                <div className="text-xs text-gray-500">Record</div>
                              </div>
                              <div className="text-center p-2 rounded-lg" style={{ background: `${teamColor}08`, border: `1px solid ${teamColor}30` }}>
                                <div className="text-xl font-bebas" style={{ color: teamColor }}>{team.globalStats.winRate}%</div>
                                <div className="text-xs text-gray-500">Winrate</div>
                              </div>
                            </div>

                            {/* Roster */}
                            <div className="flex-1 space-y-1.5 mb-4">
                              {roster.slice(0, 5).map((player) => (
                                <button key={player.id} onClick={(e) => { e.stopPropagation(); handlePlayerClick(player); }}
                                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">{ROLE_ICONS[player.role]}</span>
                                    <span className="text-xs text-gray-400">{player.role}</span>
                                    <span className="text-gray-300 font-semibold">{player.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs" style={{ color: teamColor }}>{player.kda}</span>
                                    <span className={`w-1.5 h-1.5 rounded-full ${selectedPlayer.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Progress */}
                            <div className="mb-3">
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-gray-500">Performance</span>
                                <span className="font-bold" style={{ color: teamColor }}>{team.globalStats.winRate}%</span>
                              </div>
                              <div className="relative w-full h-1.5 rounded-full overflow-hidden bg-white/10">
                                <div className="h-full rounded-full transition-all duration-1000" 
                                  style={{ width: `${team.globalStats.winRate}%`, background: `linear-gradient(90deg, ${teamColor}, ${teamColor}CC)`, boxShadow: `0 0 10px ${teamColor}80` }}></div>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-2 flex-wrap">
                              {team.competitions.slice(0, 2).map((comp, i) => (
                                <div key={i} className="text-xs font-bold px-2 py-1 rounded" 
                                  style={{ background: `${teamColor}15`, color: teamColor, border: `1px solid ${teamColor}30` }}>
                                  #{comp.position} {comp.name.split(' ')[0]}
                                </div>
                              ))}
                            </div>

                            <p className="text-xs text-center text-gray-600 mt-3">Click pour plus</p>
                          </div>
                        </div>

                        {/* VERSO */}
                        <div className="absolute inset-0 rounded-2xl backdrop-blur-xl p-5"
                          style={{ background: `linear-gradient(135deg, ${teamColor}15, rgba(0,0,0,0.95))`, border: `2px solid ${teamColor}`, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                          <h3 className="text-xl font-bebas mb-4 text-center" style={{ color: teamColor }}>STATS</h3>
                          <div className="space-y-3">
                            {team.competitions.map((comp, i) => (
                              <div key={i} className="p-3 rounded-lg bg-white/5">
                                <div className="text-sm font-bold mb-1">{comp.name}</div>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>#{comp.position}</span>
                                  <span>{comp.points} pts</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-4">Click pour retourner</p>
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

      {/* MODAL */}
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
              <p className="text-xs text-gray-600">{selectedPlayer.role} • {selectedPlayer.rank}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-red-600/10">
                <div className="text-2xl font-bebas text-red-400">{selectedPlayer.kda}</div>
                <div className="text-xs text-gray-500">KDA</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-green-600/10">
                <div className="text-2xl font-bebas text-green-400">{selectedPlayer.winRate}%</div>
                <div className="text-xs text-gray-500">WR</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-600/10">
                <div className="text-2xl font-bebas text-blue-400 text-sm">{selectedPlayer.status === 'online' ? 'Online' : 'Offline'}</div>
                <div className="text-xs text-gray-500">Status</div>
              </div>
            </div>
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
