import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, ArrowLeft } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

// ============================================================
// MOCK DATA - Joueurs par équipe (données à 0)
// ============================================================
const TEAM_ROSTERS = {
  1: [ // Mount X
    { role: 'Top', name: 'MountainKing', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'XPredator', kda: 0.0, status: 'online' },
    { role: 'Mid', name: 'NexusCore', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'ArrowStorm', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'ShieldMaster', kda: 0.0, status: 'online' }
  ],
  2: [ // Flux
    { role: 'Top', name: 'FlameWave', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'TidalBreaker', kda: 0.0, status: 'offline' },
    { role: 'Mid', name: 'StormCaller', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'BlizzardMage', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'FrostBite', kda: 0.0, status: 'online' }
  ],
  3: [ // Froz'nLégion
    { role: 'Top', name: 'IceBroker', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'FrostElite', kda: 0.0, status: 'online' },
    { role: 'Mid', name: 'BlizzardMage', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'StormCaller', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'FrostBite', kda: 0.0, status: 'online' }
  ],
  4: [ // VisionaRY
    { role: 'Top', name: 'SeerTop', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'OracleJG', kda: 0.0, status: 'online' },
    { role: 'Mid', name: 'ProphetMid', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'VisionADC', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'GuardianSup', kda: 0.0, status: 'online' }
  ],
  5: [ // MymétiC
    { role: 'Top', name: 'ShadowClone', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'PhantomJS', kda: 0.0, status: 'online' },
    { role: 'Mid', name: 'MirrorMage', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'EchoShot', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'DarkGuard', kda: 0.0, status: 'online' }
  ],
  6: [ // Team
    { role: 'Top', name: 'GoldenShield', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'StarSeeker', kda: 0.0, status: 'online' },
    { role: 'Mid', name: 'SunBurst', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'LightStrike', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'DawnKeeper', kda: 0.0, status: 'online' }
  ],
  7: [ // LeGendaRY
    { role: 'Top', name: 'LegacyTop', kda: 0.0, status: 'online' },
    { role: 'Jungle', name: 'MythicJG', kda: 0.0, status: 'online' },
    { role: 'Mid', name: 'EpicMage', kda: 0.0, status: 'online' },
    { role: 'ADC', name: 'LegendShot', kda: 0.0, status: 'online' },
    { role: 'Support', name: 'HeroicSup', kda: 0.0, status: 'online' }
  ]
};

// Icônes par équipe
const TEAM_ICONS = {
  1: '⚡', // Mount X
  2: '🔥', // Flux
  3: '❄️', // Froz'nLégion
  4: '👁️', // VisionaRY
  5: '🌑', // MymétiC
  6: '⭐', // Team
  7: '⚔️'  // LeGendaRY
};

const SPONSORS = [
  { id: 1, name: 'Red Bull', logo: '🔴', tier: 'GOLD' },
  { id: 2, name: 'Logitech', logo: '🖱️', tier: 'GOLD' },
  { id: 3, name: 'HyperX', logo: '🎧', tier: 'SILVER' },
  { id: 4, name: 'ASUS ROG', logo: '💻', tier: 'GOLD' },
  { id: 5, name: 'Monster Energy', logo: '⚡', tier: 'SILVER' },
];

const NEWS_FEED = [
  { id: 1, title: 'Mount X remporte le Nexus Tour !', date: '2 Février 2026', category: 'Victoire', emoji: '🏆',
    excerpt: 'Mount X domine la finale 3-1 et décroche le titre du Nexus Tour Saison 2026.', color: '#00FF88' },
  { id: 2, title: 'Nouveau joueur : ShadowBlade rejoint Flux', date: '1 Février 2026', category: 'Roster', emoji: '🔥',
    excerpt: 'Le midlaner Challenger ShadowBlade signe avec Flux pour le Split 2.', color: '#FF6B35' },
  { id: 3, title: 'MymétiC en finale de Prime League', date: '31 Janvier 2026', category: 'Compétition', emoji: '⚔️',
    excerpt: 'MymétiC se qualifie pour la finale après une série de BO5 intense.', color: '#FF1493' }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-black">
        <button onClick={() => setLoggedInUser(null)}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
          style={{ background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.4)', backdropFilter: 'blur(12px)' }}>
          <ArrowLeft className="w-4 h-4 text-red-400" />
          <span className="text-sm font-bold text-red-400 hidden md:block">Retour</span>
        </button>
        <Dashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
      </div>
    );
  }

  if (activeSection === 'dashboard') {
    return <LoginForm onLogin={(account) => setLoggedInUser(account)} onBack={() => setActiveSection('home')} />;
  }

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
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12"
                style={{
                  background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
                  boxShadow: '0 0 30px rgba(220, 20, 60, 0.8)',
                  border: '3px solid rgba(220, 20, 60, 0.4)'
                }}>
                <span className="text-4xl font-black font-bebas text-white">TL</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black font-bebas" style={{
                  background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>STRUCTURE TravL</h1>
                <p className="text-sm text-gray-400 tracking-widest">ESPORTS ORGANIZATION</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'teams', label: 'Équipes' },
                { id: 'news', label: 'Actualités' },
                { id: 'planning', label: 'Planning' },
                { id: 'dashboard', label: 'Dashboard' }
              ].map((item) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`relative px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}>
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
                <div className="inline-block mb-6 px-6 py-2 rounded-full bg-red-900 bg-opacity-30 border border-red-600 border-opacity-50">
                  <span className="text-sm font-bold text-red-400 tracking-widest">STRUCTURE ESPORTS #1 EN FRANCE</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 font-bebas" style={{
                  background: 'linear-gradient(to bottom, #FFFFFF, #DC143C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>7 ÉQUIPES<br />UNE STRUCTURE</h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                  De Master à Prime League, nous formons les champions de demain
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
                  { icon: '🏆', value: '7', label: 'Équipes' },
                  { icon: '🎮', value: '35+', label: 'Joueurs' },
                  { icon: '📊', value: '65%', label: 'Winrate' },
                  { icon: '🌟', value: '3', label: 'Compétitions' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 hover:-translate-y-2 transition-all">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-4xl font-black font-bebas text-red-500">{stat.value}</div>
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
                      <div key={s.id} className="flex flex-col items-center gap-3 p-6 rounded-xl hover:-translate-y-2 hover:scale-110 transition-all cursor-pointer"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <div className="text-5xl">{s.logo}</div>
                        <div className="text-sm font-bold">{s.name}</div>
                        <div className="text-xs text-gray-500 uppercase">{s.tier}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TEAMS - CARTES EXACTES STYLE SCREENSHOT */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-4" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>NOS 7 ÉQUIPES</h2>
              <p className="text-center text-gray-400 mb-16">7 équipes, 35 joueurs, une seule passion</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAMS.map((team) => {
                  const teamColor = team.name === "Froz'nLégion" ? '#FFFFFF' : team.name === 'MymétiC' ? '#2C2C2C' : team.color;
                  const roster = TEAM_ROSTERS[team.id] || [];
                  const winrate = 0; // Données à 0

                  return (
                    <div key={team.id}
                      className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
                      style={{
                        background: `linear-gradient(135deg, ${teamColor}20, rgba(0,0,0,0.9))`,
                        border: `2px solid ${teamColor}50`,
                        boxShadow: `0 10px 40px ${teamColor}30`
                      }}>
                      
                      {/* Icône watermark géante */}
                      <div className="absolute top-4 right-4 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                        {TEAM_ICONS[team.id]}
                      </div>

                      {/* Header */}
                      <div className="relative z-10 p-6 border-b" style={{ borderColor: `${teamColor}30` }}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${teamColor}30`, color: teamColor, border: `1px solid ${teamColor}50` }}>
                            {team.rank}
                          </div>
                          <div className="text-4xl">{team.logo}</div>
                        </div>
                        <h3 className="text-3xl font-black font-bebas mb-2" style={{ color: teamColor }}>{team.name}</h3>
                        <p className="text-xs text-gray-400 italic mb-3">"{team.motto}"</p>

                        {/* Record */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bebas" style={{ color: teamColor }}>0-0</div>
                            <div className="text-xs text-gray-500">Record</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bebas" style={{ color: teamColor }}>{winrate}%</div>
                            <div className="text-xs text-gray-500">Winrate</div>
                          </div>
                        </div>
                      </div>

                      {/* Roster */}
                      <div className="relative z-10 p-6">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-bold">ROSTER</div>
                        <div className="space-y-2">
                          {roster.map((player, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${teamColor}20`, color: teamColor }}>
                                  {player.role}
                                </div>
                                <span className="text-gray-300">{player.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">{player.kda.toFixed(1)} KDA</span>
                                <span className={`w-2 h-2 rounded-full ${player.status === 'online' ? 'bg-green-500' : 'bg-gray-600'}`}></span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Barre de progression Winrate */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500">Winrate</span>
                            <span className="font-bold" style={{ color: teamColor }}>{winrate}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${winrate}%`, background: teamColor }}></div>
                          </div>
                        </div>

                        {/* Badges compétitions */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {team.competitions.slice(0, 2).map((comp, i) => (
                            <div key={i} className="px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(220,20,60,0.2)', color: '#DC143C', border: '1px solid rgba(220,20,60,0.3)' }}>
                              #{comp.position} {comp.name}
                            </div>
                          ))}
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
              <h2 className="text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>ACTUALITÉS</h2>
              <div className="space-y-6">
                {NEWS_FEED.map(article => (
                  <div key={article.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)' }}>
                    <div className="h-2" style={{ background: article.color }}></div>
                    <div className="p-8">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">{article.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: article.color + '22', color: article.color }}>
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-600">{article.date}</span>
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

        {/* PLANNING */}
        {activeSection === 'planning' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>PLANNING</h2>
              <div className="text-center text-gray-500 py-20">
                <p>📅 Calendrier des sessions à venir...</p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900 border-opacity-30 bg-black bg-opacity-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-black font-bebas text-red-500 mb-4">STRUCTURE TravL</h3>
              <p className="text-gray-400 text-sm">Organisation esports française • 7 équipes, une vision</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-gray-400">NAVIGATION</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => setActiveSection('home')}>Accueil</button></li>
                <li><button onClick={() => setActiveSection('teams')}>Équipes</button></li>
                <li><button onClick={() => setActiveSection('news')}>Actualités</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm text-gray-400">CONTACT</h4>
              <p className="text-sm text-gray-500">contact@travl-esports.fr</p>
              <p className="text-sm text-gray-500">Paris, France</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-900 border-opacity-30 text-center text-sm text-gray-600">
            <p>© 2026 Structure TravL. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
