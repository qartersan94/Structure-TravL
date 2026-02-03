import React, { useState, useEffect } from 'react';
import { Trophy, Users, ChevronRight, Menu, X, ArrowLeft } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Calendar from './components/Calendar';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import PlayerProfile from './components/PlayerProfile';

// ============================================================
// SPONSORS DATA
// ============================================================
const SPONSORS = [
  { id: 1, name: 'Red Bull', logo: '🔴', tier: 'GOLD' },
  { id: 2, name: 'Logitech', logo: '🖱️', tier: 'GOLD' },
  { id: 3, name: 'HyperX', logo: '🎧', tier: 'SILVER' },
  { id: 4, name: 'ASUS ROG', logo: '💻', tier: 'GOLD' },
  { id: 5, name: 'Monster Energy', logo: '⚡', tier: 'SILVER' },
];

// ============================================================
// NEWS DATA
// ============================================================
const NEWS_FEED = [
  {
    id: 1,
    title: 'Mount X remporte le Nexus Tour !',
    date: '2 Février 2026',
    category: 'Victoire',
    emoji: '🏆',
    excerpt: 'Mount X domine la finale 3-1 et décroche le titre du Nexus Tour Saison 2026.',
    color: '#00FF88'
  },
  {
    id: 2,
    title: 'Nouveau joueur : ShadowBlade rejoint Flux',
    date: '1 Février 2026',
    category: 'Roster',
    emoji: '🔥',
    excerpt: 'Le midlaner Challenger ShadowBlade signe avec Flux pour le Split 2.',
    color: '#FF6B35'
  },
  {
    id: 3,
    title: 'MymétiC en finale de Prime League',
    date: '31 Janvier 2026',
    category: 'Compétition',
    emoji: '⚔️',
    excerpt: 'MymétiC se qualifie pour la finale après une série de BO5 intense.',
    color: '#FF1493'
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formData, setFormData] = useState({ pseudo: '', riotId: '', email: '', phone: '' });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bienvenue ${formData.pseudo} ! Votre inscription a été envoyée.`);
    setFormData({ pseudo: '', riotId: '', email: '', phone: '' });
  };

  // ─── Dashboard avec bouton retour ───
  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-black">
        <button
          onClick={() => setLoggedInUser(null)}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-x-1 group"
          style={{
            background: 'rgba(220,20,60,0.15)',
            border: '1px solid rgba(220,20,60,0.4)',
            backdropFilter: 'blur(12px)'
          }}>
          <ArrowLeft className="w-4 h-4 text-red-400 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-sm font-bold text-red-400 hidden md:block">Retour au site</span>
        </button>
        <Dashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
      </div>
    );
  }

  // ─── Login avec bouton retour ───
  if (activeSection === 'dashboard') {
    return (
      <div className="min-h-screen bg-black">
        <button
          onClick={() => setActiveSection('home')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-x-1 group"
          style={{
            background: 'rgba(220,20,60,0.15)',
            border: '1px solid rgba(220,20,60,0.4)',
            backdropFilter: 'blur(12px)'
          }}>
          <ArrowLeft className="w-4 h-4 text-red-400 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-sm font-bold text-red-400 hidden md:block">Retour</span>
        </button>
        <LoginForm onLogin={(account) => setLoggedInUser(account)} onBack={() => setActiveSection('home')} />
      </div>
    );
  }

  // ─── SITE PRINCIPAL ───
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23DC143C' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E\")",
            backgroundSize: '60px 60px',
            animation: 'drift 30s linear infinite',
            height: '100%'
          }}></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black bg-opacity-95 backdrop-blur-xl shadow-2xl border-b border-red-900 border-opacity-30' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo TL Rond Rouge */}
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveSection('home')}>
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                style={{
                  background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
                  boxShadow: '0 0 30px rgba(220, 20, 60, 0.8), inset 0 0 20px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(220, 20, 60, 0.4)'
                }}>
                <span className="text-4xl font-black font-bebas text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)', letterSpacing: '2px' }}>
                  TL
                </span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight font-bebas" style={{
                  textShadow: '0 0 30px rgba(220, 20, 60, 0.9)',
                  background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  STRUCTURE TravL
                </h1>
                <p className="text-sm text-gray-400 tracking-widest">ESPORTS ORGANIZATION</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'teams', label: 'Équipes' },
                { id: 'news', label: 'Actualités' },
                { id: 'schedule', label: 'Calendrier' },
                { id: 'profils', label: 'Profils' },
                { id: 'dashboard', label: 'Dashboard' }
              ].map((item) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}>
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-80 animate-pulse"></div>
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-98 backdrop-blur-xl border-b border-red-900 border-opacity-30">
            <div className="px-4 py-4 space-y-2">
              {[
                { id: 'home', label: '🏠 Accueil' },
                { id: 'teams', label: '👥 Équipes' },
                { id: 'news', label: '📰 Actualités' },
                { id: 'schedule', label: '📅 Calendrier' },
                { id: 'profils', label: '👤 Profils' },
                { id: 'dashboard', label: '🎯 Dashboard' }
              ].map((item) => (
                <button key={item.id} onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id ? 'bg-red-600 bg-opacity-80 text-white' : 'text-gray-400 hover:bg-red-900 hover:bg-opacity-30 hover:text-white'
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        
        {/* HOME SECTION */}
        {activeSection === 'home' && (
          <div>
            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-4">
              <div className="max-w-6xl mx-auto text-center">
                <div className="inline-block mb-6 px-6 py-2 rounded-full bg-red-900 bg-opacity-30 border border-red-600 border-opacity-50 backdrop-blur-sm animate-fadeInDown">
                  <span className="text-sm font-bold text-red-400 tracking-widest">STRUCTURE ESPORTS #1 EN FRANCE</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 font-bebas animate-fadeInUp" style={{
                  background: 'linear-gradient(to bottom, #FFFFFF, #DC143C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(220, 20, 60, 0.5)'
                }}>
                  7 ÉQUIPES<br />UNE STRUCTURE
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  De Master à Prime League, nous formons les champions de demain avec excellence et passion
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <button onClick={() => setActiveSection('teams')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{ boxShadow: '0 0 40px rgba(220, 20, 60, 0.6)' }}>
                    <span className="relative z-10 flex items-center justify-center">
                      Découvrir nos équipes <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <button onClick={() => setActiveSection('profils')}
                    className="group px-8 py-4 bg-white bg-opacity-5 backdrop-blur-sm border-2 border-red-600 border-opacity-50 rounded-xl font-bold text-lg hover:bg-opacity-10 transition-all duration-300 hover:scale-105">
                    Créer un profil
                  </button>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { icon: '🏆', value: '7', label: 'Équipes' },
                    { icon: '🎮', value: '35+', label: 'Joueurs' },
                    { icon: '📊', value: '65%', label: 'Winrate Moyen' },
                    { icon: '🌟', value: '3', label: 'Compétitions' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm">
                      <div className="text-4xl mb-3">{stat.icon}</div>
                      <div className="text-4xl font-black font-bebas text-red-500 mb-2">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SPONSORS */}
            <section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black font-bebas text-center mb-12" style={{
                  background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  NOS PARTENAIRES
                </h2>
                <div className="rounded-2xl p-8" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.2)', backdropFilter: 'blur(12px)' }}>
                  <div className="flex items-center justify-around flex-wrap gap-8">
                    {SPONSORS.map(sponsor => (
                      <div key={sponsor.id} className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer group"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="text-5xl group-hover:scale-125 transition-transform">{sponsor.logo}</div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-white">{sponsor.name}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">{sponsor.tier}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* NEWS */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl md:text-4xl font-black font-bebas" style={{
                    background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    DERNIÈRES ACTUALITÉS
                  </h2>
                  <button onClick={() => setActiveSection('news')} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
                    Voir tout <ChevronRight className="w-4 h-4"/>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {NEWS_FEED.map(article => (
                    <div key={article.id} className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)', backdropFilter: 'blur(12px)' }}>
                      <div className="h-2" style={{ background: article.color }}></div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{article.emoji}</span>
                          <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: article.color + '22', color: article.color, border: `1px solid ${article.color}44` }}>
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{article.title}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{article.excerpt}</p>
                        <div className="text-xs text-gray-600">{article.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TEAMS avec couleurs corrigées */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-4" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                NOS 7 ÉQUIPES
              </h2>
              <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                De la compétition amateur à la scène européenne, nos équipes visent l'excellence
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEAMS.map((team, index) => {
                  // CORRECTION COULEURS
                  const teamColor = team.name === "Froz'nLégion" ? '#FFFFFF' :
                                    team.name === 'MymétiC' ? '#2C2C2C' :
                                    team.color;
                  const teamSecondary = team.name === "Froz'nLégion" ? '#E0E0E0' :
                                        team.name === 'MymétiC' ? '#444444' :
                                        team.secondaryColor;

                  return (
                    <div key={team.id} onClick={() => setSelectedTeam(team.id === selectedTeam ? null : team.id)}
                      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${teamColor}15, ${teamSecondary}08)`,
                        border: `2px solid ${teamColor}30`,
                        boxShadow: selectedTeam === team.id ? `0 20px 60px ${teamColor}40` : `0 10px 40px ${teamColor}20`
                      }}>
                      <div className="relative p-8">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{team.logo}</div>
                        <h3 className="text-3xl font-black font-bebas mb-2" style={{ color: teamColor }}>{team.name}</h3>
                        <p className="text-sm text-gray-400 mb-4 italic">"{team.motto}"</p>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${teamColor}20`, color: teamColor, border: `1px solid ${teamColor}40` }}>
                            {team.rank}
                          </div>
                        </div>
                        {team.competitions.map((comp, i) => (
                          <div key={i} className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">{comp.name}</span>
                              <span className="text-xs font-bold" style={{ color: teamColor }}>#{comp.position}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{comp.wins}V - {comp.losses}D</span>
                              <span className="text-gray-700">•</span>
                              <span>{comp.points} pts</span>
                            </div>
                          </div>
                        ))}
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
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ACTUALITÉS
              </h2>
              <div className="space-y-6">
                {NEWS_FEED.map(article => (
                  <div key={article.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)', backdropFilter: 'blur(12px)' }}>
                    <div className="h-1.5" style={{ background: article.color }}></div>
                    <div className="p-8">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl flex-shrink-0">{article.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: article.color + '22', color: article.color, border: `1px solid ${article.color}44` }}>
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-600">{article.date}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{article.title}</h3>
                          <p className="text-gray-400">{article.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SCHEDULE */}
        {activeSection === 'schedule' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CALENDRIER
              </h2>
              <Calendar />
            </div>
          </section>
        )}

        {/* PROFILS */}
        {activeSection === 'profils' && (
          <PlayerProfile onBack={() => setActiveSection('home')} />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900 border-opacity-30 bg-black bg-opacity-50 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-black font-bebas mb-4" style={{ color: '#DC143C' }}>STRUCTURE TravL</h3>
              <p className="text-gray-400 text-sm mb-4">
                Organisation esports française dédiée à League of Legends. 7 équipes, une vision.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-widest text-gray-400">NAVIGATION</h4>
              <ul className="space-y-2 text-sm">
                {['Accueil', 'Équipes', 'Actualités', 'Calendrier'].map((link) => (
                  <li key={link}>
                    <button className="text-gray-500 hover:text-red-400 transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-widest text-gray-400">CONTACT</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>contact@travl-esports.fr</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-900 border-opacity-30 text-center text-sm text-gray-600">
            <p>© 2026 Structure TravL. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
      `}</style>
    </div>
  );
}

export default App;
