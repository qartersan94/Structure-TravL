import React, { useState, useEffect } from 'react';
import { 
  Shield, Trophy, Users, Newspaper, Calendar, 
  ChevronRight, Menu, X, Target, Award, Star, User, Mail, Phone, Gamepad2
} from 'lucide-react';
import { TEAMS, COMPETITIONS } from './data/teamsData';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    pseudo: '',
    riotId: '',
    email: '',
    phone: ''
  });

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when section changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription:', formData);
    alert(`Bienvenue ${formData.pseudo} ! Votre inscription a été envoyée.`);
    setFormData({ pseudo: '', riotId: '', email: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ========== ANIMATED BACKGROUND ========== */}
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
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-red-500 rounded-full blur-[100px] opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* ========== NAVIGATION ========== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black bg-opacity-95 backdrop-blur-xl shadow-2xl border-b border-red-900 border-opacity-30' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveSection('home')}>
              <img 
                src="/logo-travl-small.png" 
                alt="TravL Esports Logo" 
                className="h-20 w-20 object-contain transition-all duration-300 group-hover:scale-110"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(220, 20, 60, 0.8))'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Shield 
                className="h-16 w-16 text-red-600 hidden"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(220, 20, 60, 0.8))'
                }}
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight font-bebas" style={{
                  textShadow: '0 0 30px rgba(220, 20, 60, 0.9), 0 0 60px rgba(220, 20, 60, 0.6)',
                  letterSpacing: '0.05em'
                }}>
                  STRUCTURE TRAVL
                </h1>
                <p className="text-sm text-red-500 font-medium tracking-[0.25em] -mt-1">
                  Commence ton voyage avec nous
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'teams', label: 'Équipes' },
                { id: 'news', label: 'Actualités' },
                { id: 'schedule', label: 'Planning' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-red-500'
                      : 'text-gray-300 hover:text-red-400'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,20,60,0.8)]"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-xl border-t border-red-900 border-opacity-30">
            <div className="px-4 py-3 space-y-2">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'teams', label: 'Équipes' },
                { id: 'news', label: 'Actualités' },
                { id: 'schedule', label: 'Planning' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full px-4 py-3 rounded-lg font-bold text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-red-900 hover:bg-opacity-30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      <main className="relative z-10 pt-24">
        
        {/* ========== HOME SECTION ========== */}
        {activeSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center space-y-12 mb-16">
                
                <div className="space-y-6" style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}>
                  <h1 className="text-7xl md:text-9xl font-black leading-none font-bebas tracking-tight">
                    <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-900 bg-clip-text text-transparent" style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite' }}>
                      DOMINEZ
                    </span>
                    <br />
                    <span className="text-white drop-shadow-2xl">L'ARÈNE</span>
                  </h1>
                  <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                    7 équipes d'élite • De Master à Diamond • Une seule mission : <span className="text-red-500 font-bold">la victoire absolue</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0 }}>
                  {[
                    { icon: '🎮', value: '7', label: 'Équipes' },
                    { icon: '🏆', value: '3', label: 'Compétitions' },
                    { icon: '⚔️', value: '100+', label: 'Matchs' },
                    { icon: '👥', value: '35', label: 'Joueurs' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-black bg-opacity-70 backdrop-blur-xl border border-red-900 border-opacity-20 rounded-2xl p-8 hover:scale-105 hover:border-red-600 hover:border-opacity-40 transition-all duration-300">
                      <div className="text-6xl mb-3">{stat.icon}</div>
                      <div className="text-6xl font-black font-bebas text-red-500 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400 tracking-widest uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4" style={{ animation: 'fadeInUp 0.8s ease-out 0.4s forwards', opacity: 0 }}>
                  {[
                    { emoji: '🏆', name: 'NEXUS TOUR' },
                    { emoji: '⚔️', name: "OUAT'VENTURE" },
                    { emoji: '👑', name: 'PRIME LEAGUE' }
                  ].map((comp, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-red-900 from-opacity-10 to-red-950 to-opacity-20 border border-red-900 border-opacity-30 backdrop-blur-lg px-6 py-3 rounded-full text-sm font-bold cursor-pointer hover:border-red-600 hover:bg-red-900 hover:bg-opacity-20 transition-all">
                      <span className="text-2xl mr-2">{comp.emoji}</span>
                      <span className="text-red-400">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========== FORMULAIRE D'INSCRIPTION ========== */}
              <div className="max-w-4xl mx-auto mt-20" style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards', opacity: 0 }}>
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border-2 border-red-900 border-opacity-30 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
                  
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full blur-[120px] opacity-20"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 bg-opacity-10 border-2 border-red-600 border-opacity-30 rounded-2xl mb-4">
                        <User className="w-10 h-10 text-red-500" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black font-bebas tracking-tight mb-3">
                        <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                          REJOINS-NOUS
                        </span>
                      </h2>
                      <p className="text-gray-400 text-lg">
                        Crée ton compte et commence ton aventure esports
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="relative group">
                          <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">
                            <User className="inline w-4 h-4 mr-2" />
                            Pseudo
                          </label>
                          <input
                            type="text"
                            name="pseudo"
                            value={formData.pseudo}
                            onChange={handleInputChange}
                            required
                            placeholder="Ton pseudo en jeu"
                            className="w-full bg-black bg-opacity-50 border-2 border-red-900 border-opacity-30 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300"
                          />
                        </div>

                        <div className="relative group">
                          <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">
                            <Gamepad2 className="inline w-4 h-4 mr-2" />
                            Riot ID
                          </label>
                          <input
                            type="text"
                            name="riotId"
                            value={formData.riotId}
                            onChange={handleInputChange}
                            required
                            placeholder="Pseudo#TAG"
                            className="w-full bg-black bg-opacity-50 border-2 border-red-900 border-opacity-30 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300"
                          />
                        </div>

                        <div className="relative group">
                          <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">
                            <Mail className="inline w-4 h-4 mr-2" />
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="ton.email@exemple.com"
                            className="w-full bg-black bg-opacity-50 border-2 border-red-900 border-opacity-30 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300"
                          />
                        </div>

                        <div className="relative group">
                          <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">
                            <Phone className="inline w-4 h-4 mr-2" />
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="+33 6 12 34 56 78"
                            className="w-full bg-black bg-opacity-50 border-2 border-red-900 border-opacity-30 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-lg tracking-wide py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(220,20,60,0.5)] flex items-center justify-center space-x-3 font-bebas"
                      >
                        <Trophy className="w-6 h-6" />
                        <span>CRÉER MON COMPTE</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <p className="text-center text-sm text-gray-500 mt-4">
                        En créant un compte, tu acceptes nos conditions d'utilisation
                      </p>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ========== TEAMS SECTION ========== */}
        {activeSection === 'teams' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-6xl md:text-8xl font-black mb-4 font-bebas">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    NOS ÉQUIPES
                  </span>
                </h2>
                <p className="text-xl text-gray-400">7 équipes, 35 joueurs, une seule passion</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {TEAMS.map((team, idx) => (
                  <div
                    key={team.id}
                    onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                    className="group relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border-2 border-red-900 border-opacity-10 rounded-2xl overflow-hidden cursor-pointer hover:border-red-600 hover:border-opacity-40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(220,20,60,0.3)]"
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <div className={`relative h-48 bg-gradient-to-br ${team.gradient} p-6`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      
                      <div className="relative z-10">
                        <div className="inline-flex items-center bg-red-900 bg-opacity-30 border border-red-600 border-opacity-50 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
                          <Award className="h-3 w-3 mr-1" />
                          <span className="text-xs font-black tracking-wide">{team.rank}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white font-bebas drop-shadow-lg">
                          {team.name}
                        </h3>
                        <p className="text-sm text-white text-opacity-80 mt-1">{team.motto}</p>
                      </div>
                      
                      <div className="relative z-10 absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div>
                          <div className="text-4xl font-black text-white font-bebas">
                            {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                          </div>
                          <div className="text-xs text-white text-opacity-80 font-bold">
                            {team.globalStats.winRate}% WINRATE
                          </div>
                        </div>
                        <div className="text-6xl opacity-30">{team.logo}</div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 mb-3 tracking-wider">ROSTER</h4>
                        <div className="space-y-2">
                          {team.roster.slice(0, 3).map((player, pIdx) => (
                            <div
                              key={pIdx}
                              className="flex items-center justify-between bg-red-900 bg-opacity-5 hover:bg-opacity-15 border-l-2 border-transparent hover:border-red-600 rounded px-3 py-2 transition-all duration-200"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="text-xs font-bold text-red-500 w-12">{player.role}</div>
                                <div className="text-sm font-bold">{player.pseudo}</div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400">{player.kda} KDA</span>
                                <div 
                                  className="w-2 h-2 rounded-full shadow-lg"
                                  style={{ backgroundColor: team.color, boxShadow: `0 0 10px ${team.color}` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {selectedTeam === team.id && team.roster.length > 3 && (
                          <div className="mt-2 space-y-2">
                            {team.roster.slice(3).map((player, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-center justify-between bg-red-900 bg-opacity-5 hover:bg-opacity-15 border-l-2 border-transparent hover:border-red-600 rounded px-3 py-2 transition-all duration-200"
                              >
                                <div className="flex items-center space-x-2">
                                  <div className="text-xs font-bold text-red-500 w-12">{player.role}</div>
                                  <div className="text-sm font-bold">{player.pseudo}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-400">{player.kda} KDA</span>
                                  <div 
                                    className="w-2 h-2 rounded-full shadow-lg"
                                    style={{ backgroundColor: team.color, boxShadow: `0 0 10px ${team.color}` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Winrate</span>
                          <span className="font-bold" style={{ color: team.color }}>{team.globalStats.winRate}%</span>
                        </div>
                        <div className="h-2 bg-gray-900 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${team.globalStats.winRate}%`,
                              background: `linear-gradient(to right, ${team.color}, ${team.secondaryColor})`,
                              boxShadow: `0 0 10px ${team.color}`
                            }}
                          ></div>
                        </div>
                      </div>

                    <div className={`relative h-48 bg-gradient-to-br ${team.gradient} p-6`}>
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
  
  {/* HEADER - Rank + Nom */}
  <div className="relative z-10">
    <div className="inline-flex items-center bg-red-900 bg-opacity-30 border border-red-600 border-opacity-50 backdrop-blur-sm rounded-full px-3 py-1 mb-2">
      <Award className="h-3 w-3 mr-1" />
      <span className="text-xs font-black tracking-wide">{team.rank}</span>
    </div>
    <h3 className="text-3xl font-black text-white font-bebas drop-shadow-lg">
      {team.name}
    </h3>
    <p className="text-sm text-white text-opacity-80 mt-1">{team.motto}</p>
  </div>
  
  {/* FOOTER - Score + Logo (CORRIGÉ) */}
  <div className="absolute bottom-4 left-4 right-4 z-10">
    <div className="flex items-end justify-between">
      {/* Score à gauche */}
      <div className="flex-shrink-0">
        <div className="text-3xl md:text-4xl font-black text-white font-bebas leading-none">
          {team.globalStats.totalWins}-{team.globalStats.totalLosses}
        </div>
        <div className="text-xs text-white text-opacity-80 font-bold mt-1">
          {team.globalStats.winRate}% WINRATE
        </div>
      </div>
      
      {/* Logo à droite */}
      <div className="text-5xl md:text-6xl opacity-30 flex-shrink-0">
        {team.logo}
      </div>
    </div>
  </div>
</div>

        {/* ========== NEWS SECTION ========== */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-6xl md:text-8xl font-black mb-4 font-bebas">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    ACTUALITÉS
                  </span>
                </h2>
                <p className="text-xl text-gray-400">
                  Les dernières nouvelles de l'arène
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Mount X en tête du Nexus Tour',
                    date: '25 Jan 2026',
                    category: 'Classement',
                    emoji: '⚡',
                    color: '#00FF88',
                    excerpt: 'Avec un record de 32-13, Mount X domine la compétition et vise le titre.'
                  },
                  {
                    title: 'Flux remporte un match épique',
                    date: '24 Jan 2026',
                    category: 'Match Report',
                    emoji: '🔥',
                    color: '#FF6B35',
                    excerpt: 'Victoire 2-1 dans un match marathon de plus de 50 minutes.'
                  },
                  {
                    title: 'VisionaRY : La montée en puissance',
                    date: '23 Jan 2026',
                    category: 'Analyse',
                    emoji: '👁️',
                    color: '#9D4EDD',
                    excerpt: 'L\'équipe High Diamond enchaîne les victoires avec un style unique.'
                  },
                  {
                    title: 'LeGendaRY : Les étoiles montantes',
                    date: '22 Jan 2026',
                    category: 'Portrait',
                    emoji: '⚔️',
                    color: '#4169E1',
                    excerpt: 'Focus sur la plus jeune équipe de la compétition et son potentiel.'
                  }
                ].map((article, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-10 rounded-2xl overflow-hidden hover:border-red-600 hover:border-opacity-40 transition-all duration-300 hover:-translate-y-2"
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <div className="relative h-64 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                      {article.emoji}
                      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity"></div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xs font-bold tracking-widest uppercase"
                          style={{ color: article.color }}
                        >
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">{article.date}</span>
                      </div>

                      <h3 className="text-2xl font-black group-hover:text-red-500 transition-colors font-bebas">
                        {article.title}
                      </h3>

                      <p className="text-gray-400 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <button className="flex items-center space-x-2 font-bold text-red-500 group-hover:text-red-400 transition-colors">
                        <span>Lire la suite</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========== SCHEDULE SECTION ========== */}
        {activeSection === 'schedule' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              
              <div className="text-center mb-16">
                <h2 className="text-6xl md:text-8xl font-black mb-4 font-bebas">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    PLANNING
                  </span>
                </h2>
                <p className="text-xl text-gray-400">
                  Prochains matchs de la semaine
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { date: '27 Jan', time: '18:00', team1: 'Mount X', team2: 'Flux', status: 'À venir', competition: 'Nexus Tour' },
                  { date: '27 Jan', time: '20:00', team1: 'VisionaRY', team2: 'LeGendaRY', status: 'À venir', competition: 'Ouat\'venture' },
                  { date: '28 Jan', time: '18:00', team1: 'Froz\'nLéGion', team2: 'MymétiC', status: 'À venir', competition: 'Nexus Tour' },
                  { date: '28 Jan', time: '20:00', team1: 'Team', team2: 'Flux', status: 'À venir', competition: 'Prime League' },
                  { date: '29 Jan', time: '19:00', team1: 'Mount X', team2: 'VisionaRY', status: 'À venir', competition: 'Nexus Tour' }
                ].map((match, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6 hover:border-red-600 hover:border-opacity-50 hover:-translate-y-1 transition-all duration-300"
                    style={{ 
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center bg-red-600 bg-opacity-10 border border-red-600 border-opacity-30 rounded-xl px-4 py-3 min-w-[100px]">
                          <div className="text-sm font-bold text-red-500">{match.date}</div>
                          <div className="text-2xl font-black text-white font-bebas">{match.time}</div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-lg font-bold">{match.team1}</div>
                            <div className="text-xs text-gray-500">{match.competition}</div>
                          </div>
                          <div className="text-red-500 font-black text-2xl font-bebas px-3">VS</div>
                          <div className="text-left">
                            <div className="text-lg font-bold">{match.team2}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 px-4 py-2 rounded-full text-sm font-bold text-red-400">
                        ⚡ {match.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10 bg-black border-t border-red-900 border-opacity-30 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-travl-small.png" 
                alt="TravL Esports Logo" 
                className="h-10 w-10 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(220, 20, 60, 0.6))'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Shield className="h-8 w-8 text-red-600 hidden" />
              <div>
                <h3 className="text-xl font-black font-bebas">STRUCTURE TRAVL</h3>
                <p className="text-xs text-gray-500">Structure TravL © 2026</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors font-bold">Contact</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors font-bold">Discord</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors font-bold">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors font-bold">Twitch</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-red-900 border-opacity-20 text-center">
            <p className="text-sm text-gray-500">
              Made with <span className="text-red-500">❤️</span> for the esports community
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .font-bebas {
          font-family: 'Bebas Neue', sans-serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes drift {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

export default App;
