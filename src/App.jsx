import React, { useState } from 'react';
import { ChevronRight, Menu, X, UserPlus, Search } from 'lucide-react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import TEAMS from './data/teamsData';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlipCard = (teamId) => {
    setFlippedCards(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (activeSection === 'dashboard') {
    return <Dashboard user={currentUser} onLogout={handleLogout} onBack={() => setActiveSection('home')} />;
  }

  const navItems = [
    { id: 'home', label: 'Accueil', icon: '🏠' },
    { id: 'teams', label: 'Équipes', icon: '👥' },
    { id: 'recrutement', label: 'Recrutement', icon: '📝' },
    { id: 'news', label: 'Actualités', icon: '📰' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-xl border-b border-red-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black text-xl">
                TL
              </div>
              <div>
                <h1 className="text-xl font-black font-bebas leading-none">STRUCTURE TRAVL</h1>
                <p className="text-xs text-gray-500">E-SPORTS</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map(item => (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    activeSection === item.id ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}>
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <nav className="px-6 py-4 space-y-2">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActiveSection(item.id); setIsMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                    activeSection === item.id ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-white/5'
                  }`}>
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div className="relative z-10 pt-20">
        {/* HOME */}
        {activeSection === 'home' && (
          <>
            <section className="min-h-[65vh] flex items-center justify-center px-4 py-6">
              <div className="max-w-6xl mx-auto text-center">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-red-900/30 border border-red-600/50 animate-pulse">
                  <span className="text-xs font-bold text-red-400">STRUCTURE ESPORTS</span>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-3 font-bebas" style={{ background: 'linear-gradient(to bottom, #FFF, #DC143C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Structure TravL<br />E-SPORTS
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6">Commence ton voyage avec nous</p>
                <button onClick={() => setActiveSection('teams')}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold text-base hover:scale-105 transition-all"
                  style={{ boxShadow: '0 0 30px rgba(220,20,60,0.5)' }}>
                  Découvrir nos équipes <ChevronRight className="inline ml-2 w-5 h-5" />
                </button>
              </div>
            </section>

            <section className="-mt-12 py-10 px-4 pb-20">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black font-bebas mb-2" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    DERNIÈRES ACTUALITÉS
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-red-600 to-red-400 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/15 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-red-500/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase">Victoire</span>
                        <span className="text-[10px] text-gray-600">2j</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">FLUX domine la Prime League</h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">Performance exceptionnelle avec un score parfait de 3-0.</p>
                      <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold cursor-pointer">
                        Lire <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/15 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-green-500/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase">Roster</span>
                        <span className="text-[10px] text-gray-600">1sem</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Nouveau prodige chez MymétiC</h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">Un talent Master rejoint notre équipe.</p>
                      <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold cursor-pointer">
                        Lire <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase">Événement</span>
                        <span className="text-[10px] text-gray-600">3j</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">LAN Finals Paris 2026</h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">Rendez-vous à l'Accor Arena.</p>
                      <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold cursor-pointer">
                        Lire <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button onClick={() => setActiveSection('news')}
                    className="px-6 py-2 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-red-500/50 transition-all text-sm">
                    Toutes les actualités
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TEAMS */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-12 px-4 pb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl font-black font-bebas text-center mb-12" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                NOS ÉQUIPES
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {TEAMS.map((team) => {
                  const teamColor = team.color;
                  const isFlipped = flippedCards[team.id];

                  return (
                    <div key={team.id} onClick={() => handleFlipCard(team.id)}
                      className="group relative h-[260px] cursor-pointer" style={{ perspective: '1000px' }}>
                      
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" 
                        style={{ background: `${teamColor}30` }}></div>
                      
                      <div className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}>
                        
                        <div className="absolute inset-0 rounded-xl overflow-hidden backdrop-blur-sm"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}12, rgba(8,8,8,0.98))`,
                            border: `1px solid ${teamColor}25`,
                            backfaceVisibility: 'hidden'
                          }}>
                          
                          <div className="p-3 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1.5">
                                <span className="text-lg">{team.logo}</span>
                                <div>
                                  <h3 className="text-sm font-black font-bebas leading-none" style={{ color: teamColor }}>
                                    {team.name}
                                  </h3>
                                  <p className="text-[7px] text-gray-700 uppercase">{team.rank}</p>
                                </div>
                              </div>
                              <div className="px-1.5 py-0.5 rounded text-[8px] font-bold" 
                                style={{ background: `${teamColor}18`, color: teamColor }}>
                                {team.roster?.length || 0}/5
                              </div>
                            </div>

                            <div className="flex gap-1.5 mb-2">
                              <div className="flex-1 text-center py-1 rounded bg-black/20">
                                <div className="text-xs font-bold" style={{ color: teamColor }}>
                                  {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                                </div>
                              </div>
                              <div className="flex-1 text-center py-1 rounded bg-black/20">
                                <div className="text-xs font-bold" style={{ color: teamColor }}>
                                  {team.globalStats.winRate}%
                                </div>
                              </div>
                            </div>

                            <div className="flex-1 space-y-0.5 mb-2 overflow-y-auto custom-scrollbar">
                              {team.roster && team.roster.length > 0 ? (
                                team.roster.map((player) => (
                                  <div key={player.id}
                                    className="flex items-center justify-between px-1.5 py-1 rounded bg-black/15 hover:bg-black/30">
                                    <div className="flex items-center gap-1">
                                      <div className="w-4 h-4 rounded flex items-center justify-center text-[7px] font-bold bg-white/5" 
                                        style={{ color: teamColor }}>
                                        {player.role[0]}
                                      </div>
                                      <span className="text-[10px] font-medium text-white truncate max-w-[80px]">
                                        {player.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[9px] font-mono font-bold" style={{ color: teamColor }}>
                                        {player.kda}
                                      </span>
                                      <div className={`w-1 h-1 rounded-full ${player.status === 'online' ? 'bg-green-400' : 'bg-gray-700'}`}></div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="flex-1 flex items-center justify-center py-4">
                                  <p className="text-xs text-gray-600">Roster à venir</p>
                                </div>
                              )}
                            </div>

                            <div className="mb-1.5">
                              <div className="w-full h-0.5 rounded-full bg-white/5 overflow-hidden">
                                <div className="h-full rounded-full transition-all" 
                                  style={{ 
                                    width: `${team.globalStats.winRate}%`,
                                    background: teamColor
                                  }}></div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-0.5">
                                {team.competitions.slice(0, 2).map((comp, i) => (
                                  <span key={i} className="text-[8px] font-bold px-1 py-0.5 rounded bg-black/20" 
                                    style={{ color: teamColor }}>
                                    #{comp.position}
                                  </span>
                                ))}
                              </div>
                              <span className="text-[7px] text-gray-800 uppercase font-bold">↻</span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 rounded-xl backdrop-blur-sm p-3"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}18, rgba(8,8,8,0.98))`,
                            border: `1px solid ${teamColor}25`,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}>
                          <h3 className="text-sm font-bebas mb-3 text-center" style={{ color: teamColor }}>
                            STATS
                          </h3>
                          <div className="space-y-1.5">
                            {team.competitions.map((comp, i) => (
                              <div key={i} className="p-2 rounded-lg bg-black/20 border-l-2" 
                                style={{ borderColor: teamColor }}>
                                <div className="text-[10px] font-bold mb-0.5 text-white truncate">{comp.name}</div>
                                <div className="flex justify-between text-[8px] text-gray-500">
                                  <span className="font-bold" style={{ color: teamColor }}>#{comp.position}</span>
                                  <span>{comp.points}pts • {comp.wins}V-{comp.losses}D</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-[7px] text-center text-gray-800 mt-2 uppercase font-bold">Click ↻</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* RECRUTEMENT */}
        {activeSection === 'recrutement' && (
          <section className="min-h-screen py-12 px-4 pb-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black font-bebas text-center mb-2" 
                style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                RECRUTEMENT
              </h2>
              <p className="text-center text-gray-500 text-sm mb-8">Rejoins une équipe ou recrute des joueurs</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <UserPlus className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold text-white">Rejoindre une équipe</h3>
                  </div>
                  
                  <form className="space-y-3">
                    <input type="text" placeholder="Pseudo *"
                      className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none" />
                    
                    <select className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none">
                      <option>Équipe</option>
                      {TEAMS.map(t => <option key={t.id}>{t.name}</option>)}
                    </select>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <select className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none">
                        <option>Rôle</option>
                        <option>Top</option>
                        <option>Jungle</option>
                        <option>Mid</option>
                        <option>ADC</option>
                        <option>Support</option>
                      </select>
                      <input type="text" placeholder="Rang"
                        className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none" />
                    </div>

                    <textarea rows="3" placeholder="Message..."
                      className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none resize-none"></textarea>

                    <button type="submit" 
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-sm hover:scale-105 transition-all">
                      Envoyer
                    </button>
                  </form>
                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold text-white">Recruter</h3>
                  </div>
                  
                  <form className="space-y-3">
                    <select className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none">
                      <option>Équipe</option>
                      {TEAMS.map(t => <option key={t.id}>{t.name}</option>)}
                    </select>

                    <div className="grid grid-cols-2 gap-3">
                      <select className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none">
                        <option>Poste</option>
                        <option>Top</option>
                        <option>Jungle</option>
                        <option>Mid</option>
                        <option>ADC</option>
                        <option>Support</option>
                      </select>
                      <input type="text" placeholder="Rang min"
                        className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none" />
                    </div>

                    <textarea rows="3" placeholder="Description..."
                      className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white outline-none resize-none"></textarea>

                    <button type="submit" 
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-bold text-sm hover:scale-105 transition-all">
                      Publier
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEWS */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-12 px-4 pb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl font-black font-bebas text-center mb-12" 
                style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ACTUALITÉS
              </h2>
              <p className="text-center text-gray-400">Section en développement</p>
            </div>
          </section>
        )}
      </div>

      {/* FOOTER SPONSORS */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/98 to-transparent backdrop-blur-xl border-t border-red-500/10 pb-2">
        <div className="max-w-7xl mx-auto px-6 py-2.5">
          <div className="flex items-center justify-center gap-12">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/30 hover:border-red-500/60 transition-all">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">💰</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
              </button>

              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30 hover:border-green-500/60 transition-all">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🤝</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
              </button>

              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 hover:border-blue-500/60 transition-all">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🎯</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-red-400 rounded-full"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Partenaires Officiels</span>
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-red-400 rounded-full"></div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-purple-500/30 hover:border-purple-500/60 transition-all">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🏆</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
              </button>

              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-green-400/20 to-green-700/10 border border-green-400/30 hover:border-green-400/60 transition-all">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">⚡</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
              </button>

              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-800/10 border border-red-400/30 hover:border-red-400/60 transition-all">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🎮</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
