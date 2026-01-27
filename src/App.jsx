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

        
