import React, { useState, useEffect } from 'react';
import { ChevronRight, X, ArrowLeft, Search, UserPlus, ExternalLink } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

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

  useEffect(() => {
    const handleStorage = () => setPlayers(getPlayers());
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => setPlayers(getPlayers()), 500);
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
  const getTeamPlayers = (teamId) => players.filter(p => p.teamId === teamId).slice(0, 5);
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
    <div className="min-h-screen bg-black text-white pb-14">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

      {/* Nav - LOGO COMPACT */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrollY > 50 ? 'bg-black/95 backdrop-blur-xl border-b border-red-900/30' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #DC143C, #FF1744)', boxShadow: '0 0 20px rgba(220,20,60,0.6)' }}>
              <span className="text-xl font-black font-bebas text-white">TL</span>
            </div>
            <div>
              <h1 className="text-2xl font-black font-bebas leading-none" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Structure TravL
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">E-Sports</p>
            </div>
          </div>
          <div className="hidden md:flex gap-1">
            {['home', 'teams', 'recrutement', 'news', 'dashboard'].map(id => (
              <button key={id} onClick={() => setActiveSection(id)}
                className={`relative px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                {activeSection === id && <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-80"></div>}
                <span className="relative z-10">
                  {id === 'home' ? 'Accueil' : id === 'teams' ? 'Équipes' : id === 'recrutement' ? 'Recrutement' : id === 'news' ? 'Actualités' : 'Dashboard'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-20">
        {/* HOME */}
        {activeSection === 'home' && (
          <>
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

            {/* Actualités SOBRES FUTURISTES */}
            <section className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-black font-bebas mb-4" style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    ACTUALITÉS
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Actu 1 */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                          Victoire
                        </span>
                        <span className="text-xs text-gray-600">2j</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                        FLUX domine la Prime League
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Performance exceptionnelle avec un score parfait de 3-0 en finale.
                      </p>
                      <div className="flex items-center gap-2 text-red-400 text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                        Lire <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Actu 2 */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                          Roster
                        </span>
                        <span className="text-xs text-gray-600">1sem</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                        Nouveau prodige chez MymétiC
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Un talent Master rejoint notre équipe pour viser le sommet.
                      </p>
                      <div className="flex items-center gap-2 text-green-400 text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                        Lire <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Actu 3 */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          Événement
                        </span>
                        <span className="text-xs text-gray-600">3j</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        LAN Finals Paris 2026
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">
                        Rendez-vous à l'Accor Arena pour les finales nationales.
                      </p>
                      <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                        Lire <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button onClick={() => setActiveSection('news')}
                    className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-red-500/50 transition-all">
                    Toutes les actualités
                  </button>
                </div>
              </div>
            </section>
          </>
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
                {players.length} joueurs inscrits • {TEAMS.length} équipes actives
              </p>

              <div className="mb-8 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:border-red-600 focus:outline-none" />
                </div>
              </div>

              {/* CARTES ROSTER - ULTRA COMPACT PRO */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredTeams.map((team) => {
                  const teamColor = team.color;
                  const roster = getTeamPlayers(team.id);
                  const isFlipped = flippedCards[team.id];

                  return (
                    <div key={team.id} onClick={() => handleFlipCard(team.id)}
                      className="group relative h-[260px] cursor-pointer" style={{ perspective: '1000px' }}>
                      
                      {/* Glow subtil */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" 
                        style={{ background: `${teamColor}30` }}></div>
                      
                      <div className={`relative w-full h-full transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* RECTO - ULTRA COMPACT */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden backdrop-blur-sm transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${teamColor}12, rgba(8,8,8,0.98))`,
                            border: `1px solid ${teamColor}25`,
                            boxShadow: `0 4px 20px ${teamColor}15`,
                            backfaceVisibility: 'hidden'
                          }}>
                          
                          {/* Ligne accent top */}
                          <div className="absolute top-0 left-0 right-0 h-px" 
                            style={{ background: `linear-gradient(90deg, transparent, ${teamColor}60, transparent)` }}></div>
                          
                          <div className="relative p-3 h-full flex flex-col">
                            {/* Header minimal */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1.5">
                                <span className="text-lg">{team.logo}</span>
                                <div>
                                  <h3 className="text-sm font-black font-bebas leading-none" style={{ color: teamColor }}>
                                    {team.name}
                                  </h3>
                                  <p className="text-[7px] text-gray-700 uppercase tracking-wide">{team.rank}</p>
                                </div>
                              </div>
                              <div className="px-1.5 py-0.5 rounded text-[8px] font-bold" 
                                style={{ background: `${teamColor}18`, color: teamColor }}>
                                {roster.length}/5
                              </div>
                            </div>

                            {/* Stats inline ultra compact */}
                            <div className="flex gap-1.5 mb-2">
                              <div className="flex-1 text-center py-1 rounded bg-black/20 border border-white/5">
                                <div className="text-xs font-bold leading-none" style={{ color: teamColor }}>
                                  {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                                </div>
                              </div>
                              <div className="flex-1 text-center py-1 rounded bg-black/20 border border-white/5">
                                <div className="text-xs font-bold leading-none" style={{ color: teamColor }}>
                                  {team.globalStats.winRate}%
                                </div>
                              </div>
                            </div>

                            {/* Roster ultra minimal */}
                            <div className="flex-1 space-y-0.5 mb-2 overflow-y-auto custom-scrollbar">
                              {roster.length > 0 ? (
                                roster.map((player) => (
                                  <button key={player.id} 
                                    onClick={(e) => { e.stopPropagation(); handlePlayerClick(player); }}
                                    className="w-full flex items-center justify-between px-1.5 py-1 rounded bg-black/15 hover:bg-black/30 transition-all border border-white/3 hover:border-white/10">
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
                                        {player.kda || '0.0'}
                                      </span>
                                      <div className={`w-1 h-1 rounded-full ${player.status === 'online' ? 'bg-green-400' : 'bg-gray-700'}`}></div>
                                    </div>
                                  </button>
                                ))
                              ) : (
                                <div className="flex-1 flex flex-col items-center justify-center py-4">
                                  <UserPlus className="w-6 h-6 text-gray-800 mb-1 opacity-20" />
                                  <p className="text-[8px] text-gray-800">Roster vide</p>
                                </div>
                              )}
                            </div>

                            {/* Progress bar ultra fine */}
                            <div className="mb-1.5">
                              <div className="relative w-full h-0.5 rounded-full overflow-hidden bg-white/5">
                                <div className="absolute inset-0 h-full rounded-full transition-all duration-1000" 
                                  style={{ 
                                    width: `${team.globalStats.winRate}%`, 
                                    background: teamColor,
                                    boxShadow: `0 0 8px ${teamColor}60`
                                  }}></div>
                              </div>
                            </div>

                            {/* Footer minimal */}
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

                          {/* Scan line subtil */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan"></div>
                          </div>
                        </div>

                        {/* VERSO - Compact */}
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
                              <div key={i} className="p-2 rounded-lg bg-black/20 border-l-2 hover:bg-black/30 transition-all" 
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

        {/* RECRUTEMENT - ULTRA COMPACT */}
        {activeSection === 'recrutement' && (
          <section className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black font-bebas text-center mb-2" 
                style={{ background: 'linear-gradient(to right, #DC143C, #FF6B6B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                RECRUTEMENT
              </h2>
              <p className="text-center text-gray-500 text-sm mb-8">Rejoins une équipe ou recrute des joueurs</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Rejoindre équipe - COMPACT */}
                <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <UserPlus className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold text-white">Rejoindre une équipe TL</h3>
                  </div>
                  
                  <form className="space-y-3">
                    <input type="text" placeholder="Pseudo in-game *"
                      className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-red-500/50 outline-none" />
                    
                    <select className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-red-500/50 outline-none">
                      <option>Équipe souhaitée</option>
                      <option>FLUX</option>
                      <option>MymétiC</option>
                      <option>Froz'nLégion</option>
                      <option>MOUNT X</option>
                      <option>VISIONARY</option>
                      <option>TEAM</option>
                      <option>LEGENDARY</option>
                    </select>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <select className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-red-500/50 outline-none">
                        <option>Rôle</option>
                        <option>Top</option>
                        <option>Jungle</option>
                        <option>Mid</option>
                        <option>ADC</option>
                        <option>Support</option>
                      </select>
                      <input type="text" placeholder="Rang"
                        className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-red-500/50 outline-none" />
                    </div>

                    <textarea rows="3" placeholder="Message..."
                      className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-red-500/50 outline-none resize-none"></textarea>

                    <button type="submit" 
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                      style={{ boxShadow: '0 0 20px rgba(220,20,60,0.3)' }}>
                      Envoyer ma candidature
                    </button>
                  </form>
                </div> 
                        placeholder="Présente-toi et explique pourquoi tu veux rejoindre cette équipe..."></textarea>
                    </div>

                    <button type="submit" 
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold hover:scale-105 transition-all"
                      style={{ boxShadow: '0 0 30px rgba(220,20,60,0.4)' }}>
                      Envoyer ma candidature
                    </button>
                  </form>
                </div>


                {/* Recruter joueur - COMPACT */}
                <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-bold text-white">Recruter des joueurs</h3>
                  </div>
                  
                  <form className="space-y-3">
                    <select className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-green-500/50 outline-none">
                      <option>Équipe</option>
                      {TEAMS.map(t => <option key={t.id}>{t.name}</option>)}
                    </select>

                    <div className="grid grid-cols-2 gap-3">
                      <select className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-green-500/50 outline-none">
                        <option>Poste</option>
                        <option>Top</option>
                        <option>Jungle</option>
                        <option>Mid</option>
                        <option>ADC</option>
                        <option>Support</option>
                      </select>
                      <input type="text" placeholder="Rang minimum"
                        className="px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-green-500/50 outline-none" />
                    </div>

                    <textarea rows="3" placeholder="Description du profil..."
                      className="w-full px-3 py-2 text-sm bg-black/50 border border-white/10 rounded-lg text-white focus:border-green-500/50 outline-none resize-none"></textarea>

                    <button type="submit" 
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                      style={{ boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}>
                      Publier l'offre
                    </button>
                  </form>
                </div>
              </div>

              {/* Annonces - COMPACT */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Annonces récentes</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-red-500/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                          CHERCHE ÉQUIPE
                        </span>
                        <span className="text-xs text-gray-600">2h</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-white">ShadowKing</span>
                      <span className="text-xs text-gray-500">• Top • Diamond 1</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      Joueur Top expérimenté cherche équipe Master+. Dispo tous les soirs.
                    </p>
                  </div>

                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-green-500/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-green-500/20 text-green-400 border border-green-500/30">
                          CHERCHE JOUEUR
                        </span>
                        <span className="text-xs text-gray-600">5h</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-white">FLUX</span>
                      <span className="text-xs text-gray-500">• Jungle • Plat 1+</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      Team Master cherche Jungle motivé pour Prime League.
                    </p>
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

      {/* BANNIÈRE SPONSORS - EMOJIS PERTINENTS */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black via-black/98 to-transparent backdrop-blur-xl border-t border-red-500/10">
        <div className="max-w-7xl mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            {/* 3 Boutons GAUCHE */}
            <div className="flex items-center gap-2">
              <button className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-br from-red-600/20 to-red-900/10 border border-red-500/30 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">💰</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-br from-green-600/20 to-green-900/10 border border-green-500/30 hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🤝</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-900/10 border border-blue-500/30 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🎯</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>

            {/* CENTRE - Texte */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-red-400 rounded-full"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Partenaires Officiels</span>
              <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-red-400 rounded-full"></div>
            </div>

            {/* 3 Boutons DROITE */}
            <div className="flex items-center gap-2">
              <button className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-900/10 border border-purple-500/30 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🏆</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-br from-green-400/20 to-green-700/10 border border-green-400/30 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">⚡</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button className="group relative px-3 py-1.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-800/10 border border-red-400/30 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-400/20 transition-all duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🎮</span>
                  <span className="text-xs font-bold text-white">Vous ?</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 to-red-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
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
                <div className="text-xs text-gray-500 mb-2">Champions</div>
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

      <footer className="relative z-10 border-t border-red-900/30 mt-20 py-8 text-center text-sm text-gray-600">
        <p>© 2026 Structure TravL E-sports • Tous droits réservés</p>
      </footer>

      <style jsx>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        
        @keyframes scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(400%);
            opacity: 0;
          }
        }
        
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
