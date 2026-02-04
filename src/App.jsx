import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X, ArrowLeft, Play, Calendar, Trophy, Award } from 'lucide-react';
import { TEAMS } from './data/teamsData';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

// ============================================================
// DONNÉES
// ============================================================

const SPONSORS = [
  { id: 1, name: 'Red Bull', logo: '🔴', tier: 'GOLD' },
  { id: 2, name: 'Logitech', logo: '🖱️', tier: 'GOLD' },
  { id: 3, name: 'HyperX', logo: '🎧', tier: 'SILVER' },
  { id: 4, name: 'ASUS ROG', logo: '💻', tier: 'GOLD' },
  { id: 5, name: 'Monster Energy', logo: '⚡', tier: 'SILVER' },
];

const NEWS_FEED = [
  {
    id: 1, title: 'Mount X remporte le Nexus Tour !', date: '2 Février 2026',
    category: 'Victoire', emoji: '🏆',
    excerpt: 'Mount X domine la finale 3-1 et décroche le titre du Nexus Tour Saison 2026.',
    content: 'Dans une finale épique, Mount X a prouvé sa supériorité en écrasant ses adversaires 3-1. Une performance exceptionnelle de toute l\'équipe.',
    color: '#00FF88'
  },
  {
    id: 2, title: 'Nouveau joueur : ShadowBlade rejoint Flux', date: '1 Février 2026',
    category: 'Roster', emoji: '🔥',
    excerpt: 'Le midlaner Challenger ShadowBlade signe avec Flux pour le Split 2.',
    content: 'Flux renforce son roster avec l\'arrivée du prodige ShadowBlade, classé Challenger avec un winrate de 68%.',
    color: '#FF6B35'
  },
  {
    id: 3, title: 'MymétiC en finale de Prime League', date: '31 Janvier 2026',
    category: 'Compétition', emoji: '⚔️',
    excerpt: 'MymétiC se qualifie pour la finale après une série de BO5 intense.',
    content: 'Après avoir renversé 3-2 les favoris en demi-finale, MymétiC affrontera les champions en titre.',
    color: '#FF1493'
  },
  {
    id: 4, title: 'Froz\'nLégion domine le Winter Classic', date: '30 Janvier 2026',
    category: 'Victoire', emoji: '❄️',
    excerpt: 'Performance glaciale de Froz\'nLégion qui remporte le tournoi sans perdre une seule game.',
    content: 'Record historique ! Froz\'nLégion termine le Winter Classic avec un score parfait de 15-0.',
    color: '#00D9FF'
  },
  {
    id: 5, title: 'VisionaRY recrute un nouveau coach', date: '29 Janvier 2026',
    category: 'Staff', emoji: '🎯',
    excerpt: 'Ancien coach de LEC rejoint VisionaRY pour booster l\'équipe.',
    content: 'VisionaRY frappe fort en recrutant CoachMaster, ancien analyste de G2 Esports.',
    color: '#9D4EDD'
  },
  {
    id: 6, title: 'Team remporte le Clash Regional', date: '28 Janvier 2026',
    category: 'Victoire', emoji: '⭐',
    excerpt: 'Team prouve sa valeur en remportant le tournoi régional face à 64 équipes.',
    content: 'Victoire éclatante pour Team qui s\'impose 3-0 en finale.',
    color: '#FFD700'
  },
  {
    id: 7, title: 'LeGendaRY signe un partenariat majeur', date: '27 Janvier 2026',
    category: 'Annonce', emoji: '🤝',
    excerpt: 'LeGendaRY s\'associe avec une grande marque de gaming.',
    content: 'Un partenariat stratégique qui va permettre de se professionnaliser davantage.',
    color: '#4169E1'
  },
  {
    id: 8, title: 'Bootcamp intensif pour toutes les équipes', date: '26 Janvier 2026',
    category: 'Training', emoji: '💪',
    excerpt: 'Les 7 équipes se préparent pour le Spring Split avec un bootcamp de 2 semaines.',
    content: '14 jours de training intensif, VOD review, scrims quotidiens et coaching personnalisé.',
    color: '#E74C3C'
  },
  {
    id: 9, title: 'Nouveau record de spectateurs sur Twitch', date: '25 Janvier 2026',
    category: 'Milestone', emoji: '📺',
    excerpt: 'Le match Mount X vs Flux attire 15K viewers simultanés.',
    content: 'Record historique pour la Structure TravL ! Plus de 15 000 spectateurs en direct.',
    color: '#9146FF'
  },
  {
    id: 10, title: 'Ouverture de la Gaming House officielle', date: '24 Janvier 2026',
    category: 'Infrastructure', emoji: '🏠',
    excerpt: 'Structure TravL inaugure sa Gaming House high-tech à Paris.',
    content: 'Un espace de 400m² équipé des dernières technologies, salles de training, cuisine, espaces détente.',
    color: '#1ABC9C'
  }
];

const UPCOMING_MATCHES = [
  { id: 1, team1: 'Mount X', team2: 'Flux', date: 'Lundi 5 Février', time: '20:00', competition: 'Nexus Tour', stream: true },
  { id: 2, team1: 'MymétiC', team2: 'VisionaRY', date: 'Mercredi 7 Février', time: '19:00', competition: 'Prime League', stream: true },
  { id: 3, team1: 'Froz\'nLégion', team2: 'Team', date: 'Vendredi 9 Février', time: '21:00', competition: 'Winter Classic', stream: false },
  { id: 4, team1: 'LeGendaRY', team2: 'Mount X', date: 'Samedi 10 Février', time: '18:00', competition: 'Ouat\'venture', stream: true }
];

const RANKINGS = [
  { rank: 1, team: 'Mount X', points: 45, wins: 15, losses: 8, winRate: 65, logo: '⚡', color: '#00FF88' },
  { rank: 2, team: "Froz'nLégion", points: 42, wins: 14, losses: 9, winRate: 61, logo: '❄️', color: '#FFFFFF' },
  { rank: 3, team: 'Flux', points: 36, wins: 12, losses: 11, winRate: 52, logo: '🔥', color: '#FF6B35' },
  { rank: 4, team: 'MymétiC', points: 33, wins: 11, losses: 8, winRate: 58, logo: '🌑', color: '#2C2C2C' },
  { rank: 5, team: 'VisionaRY', points: 30, wins: 10, losses: 6, winRate: 63, logo: '👁️', color: '#9D4EDD' },
  { rank: 6, team: 'LeGendaRY', points: 27, wins: 9, losses: 9, winRate: 50, logo: '⚔️', color: '#4169E1' },
  { rank: 7, team: 'Team', points: 24, wins: 8, losses: 7, winRate: 53, logo: '⭐', color: '#FFD700' }
];

const ACHIEVEMENTS = [
  { id: 1, team: 'Mount X', title: 'Champion Nexus Tour 2026', icon: '🏆', date: '2026', color: '#00FF88' },
  { id: 2, team: 'Mount X', title: 'MVP Spring Split', icon: '⭐', date: '2026', color: '#00FF88' },
  { id: 3, team: "Froz'nLégion", title: 'Finaliste Nexus Tour 2025', icon: '🥈', date: '2025', color: '#FFFFFF' },
  { id: 4, team: 'MymétiC', title: 'Demi-finaliste Prime League', icon: '🏅', date: '2026', color: '#2C2C2C' },
  { id: 5, team: 'Flux', title: 'Winner Winter Invitational', icon: '🎖️', date: '2025', color: '#FF6B35' }
];

const GALLERY = [
  { id: 1, title: 'Victoire Nexus Tour', emoji: '🎮', team: 'Mount X' },
  { id: 2, title: 'Célébration Équipe', emoji: '🎊', team: 'Flux' },
  { id: 3, title: 'Bootcamp Intensif', emoji: '💪', team: 'Toutes' },
  { id: 4, title: 'Gaming House', emoji: '🏠', team: 'Structure' },
  { id: 5, title: 'Meet & Greet Fans', emoji: '🤝', team: 'Event' },
  { id: 6, title: 'Training Session', emoji: '🎯', team: 'Froz\'n' }
];

const HIGHLIGHTS = [
  { id: 1, title: 'ACE de ShadowBlade', views: '12K', duration: '0:45', team: 'Flux' },
  { id: 2, title: 'Baron Steal Épique', views: '18K', duration: '1:20', team: 'Mount X' },
  { id: 3, title: 'Pentakill en Finale', views: '25K', duration: '2:10', team: 'MymétiC' },
  { id: 4, title: '1v5 Outplay', views: '15K', duration: '1:05', team: 'VisionaRY' }
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

  // ─── Dashboard ───
  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-black">
        <button
          onClick={() => setLoggedInUser(null)}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-x-1 group"
          style={{ background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.4)', backdropFilter: 'blur(12px)' }}>
          <ArrowLeft className="w-4 h-4 text-red-400" />
          <span className="text-sm font-bold text-red-400 hidden md:block">Retour au site</span>
        </button>
        <Dashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
      </div>
    );
  }

  // ─── Login ───
  if (activeSection === 'dashboard') {
    return <LoginForm onLogin={(account) => setLoggedInUser(account)} onBack={() => setActiveSection('home')} />;
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
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black bg-opacity-95 backdrop-blur-xl shadow-2xl border-b border-red-900 border-opacity-30' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo TL */}
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveSection('home')}>
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                style={{
                  background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
                  boxShadow: '0 0 30px rgba(220, 20, 60, 0.8), inset 0 0 20px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(220, 20, 60, 0.4)'
                }}>
                <span className="text-4xl font-black font-bebas text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>TL</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black font-bebas" style={{
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
                { id: 'rankings', label: 'Classements' },
                { id: 'matches', label: 'Matchs' },
                { id: 'media', label: 'Médias' },
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

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        
        {/* HOME */}
        {activeSection === 'home' && (
          <div>
            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-4">
              <div className="max-w-6xl mx-auto text-center">
                <div className="inline-block mb-6 px-6 py-2 rounded-full bg-red-900 bg-opacity-30 border border-red-600 border-opacity-50 backdrop-blur-sm">
                  <span className="text-sm font-bold text-red-400 tracking-widest">STRUCTURE ESPORTS #1 EN FRANCE</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 font-bebas" style={{
                  background: 'linear-gradient(to bottom, #FFFFFF, #DC143C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  7 ÉQUIPES<br />UNE STRUCTURE
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  De Master à Prime League, nous formons les champions de demain avec excellence et passion
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setActiveSection('teams')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{ boxShadow: '0 0 40px rgba(220, 20, 60, 0.6)' }}>
                    <span className="relative z-10 flex items-center justify-center">
                      Découvrir nos équipes <ChevronRight className="ml-2" />
                    </span>
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

            {/* NEWS Preview */}
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
                  <button onClick={() => setActiveSection('news')} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold">
                    Voir tout <ChevronRight className="w-4 h-4"/>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {NEWS_FEED.slice(0, 3).map(article => (
                    <div key={article.id} onClick={() => setActiveSection('news')}
                      className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
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

        {/* TEAMS - Style roster cards */}
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
                7 équipes, 35 joueurs, une seule passion
              </p>

              {/* ROSTER CARDS - Style de tes screenshots */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAMS.map((team) => {
                  const teamColor = team.name === "Froz'nLégion" ? '#FFFFFF' : team.name === 'MymétiC' ? '#2C2C2C' : team.color;

                  return (
                    <div key={team.id}
                      className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${teamColor}15, rgba(0,0,0,0.8))`,
                        border: `2px solid ${teamColor}40`,
                        boxShadow: `0 10px 40px ${teamColor}20`
                      }}>
                      
                      {/* Header avec logo et nom */}
                      <div className="p-6 border-b" style={{ borderColor: `${teamColor}20` }}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-6xl group-hover:scale-110 transition-transform">{team.logo}</div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="px-2 py-1 rounded text-xs font-bold" style={{ background: `${teamColor}20`, color: teamColor, border: `1px solid ${teamColor}40` }}>
                                {team.rank}
                              </div>
                            </div>
                            <h3 className="text-2xl font-black font-bebas" style={{ color: teamColor }}>{team.name}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 italic">"{team.motto}"</p>
                      </div>

                      {/* Stats */}
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bebas" style={{ color: teamColor }}>
                              {team.globalStats.totalWins}-{team.globalStats.totalLosses}
                            </div>
                            <div className="text-xs text-gray-500">Record</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bebas" style={{ color: teamColor }}>
                              {team.globalStats.winRate}%
                            </div>
                            <div className="text-xs text-gray-500">Winrate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bebas" style={{ color: teamColor }}>5</div>
                            <div className="text-xs text-gray-500">Joueurs</div>
                          </div>
                        </div>

                        {/* Roster (simulé) */}
                        <div className="space-y-2">
                          {['Top', 'Jungle', 'Mid', 'ADC', 'Support'].map((role, i) => (
                            <div key={role} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${teamColor}15`, color: teamColor }}>
                                  {role}
                                </div>
                                <span className="text-gray-300">Player{i + 1}</span>
                              </div>
                              <span className="text-xs text-gray-600">3.8 KDA</span>
                            </div>
                          ))}
                        </div>

                        {/* Compétitions */}
                        {team.competitions.map((comp, i) => (
                          <div key={i} className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">{comp.name}</span>
                              <span className="text-xs font-bold" style={{ color: teamColor }}>#{comp.position}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{comp.points} pts</span>
                              <span>•</span>
                              <span>{comp.wins}V - {comp.losses}D</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ACHIEVEMENTS */}
              <div className="mt-16">
                <h3 className="text-3xl font-bebas mb-8 text-center" style={{
                  background: 'linear-gradient(to right, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🏆 PALMARÈS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ACHIEVEMENTS.map(achievement => (
                    <div key={achievement.id} className="p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${achievement.color}30` }}>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-white">{achievement.title}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span style={{ color: achievement.color }}>{achievement.team}</span>
                            <span>•</span>
                            <span>{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEWS COMPLET */}
        {activeSection === 'news' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                TOUTES LES ACTUALITÉS
              </h2>
              <div className="space-y-6">
                {NEWS_FEED.map(article => (
                  <div key={article.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)', backdropFilter: 'blur(12px)' }}>
                    <div className="h-1.5" style={{ background: article.color }}></div>
                    <div className="p-8">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl flex-shrink-0">{article.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: article.color + '22', color: article.color, border: `1px solid ${article.color}44` }}>
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-600">{article.date}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{article.title}</h3>
                          <p className="text-gray-300 leading-relaxed">{article.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RANKINGS */}
        {activeSection === 'rankings' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CLASSEMENT GÉNÉRAL
              </h2>
              <div className="space-y-4">
                {RANKINGS.map(ranking => (
                  <div key={ranking.rank} className="rounded-xl p-6 flex items-center justify-between transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${ranking.color}30`, backdropFilter: 'blur(12px)' }}>
                    <div className="flex items-center gap-6">
                      <div className="text-5xl font-black font-bebas" style={{ color: ranking.rank <= 3 ? '#DC143C' : '#666', minWidth: '60px' }}>
                        #{ranking.rank}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{ranking.logo}</span>
                        <div>
                          <div className="text-xl font-bold text-white" style={{ color: ranking.color }}>{ranking.team}</div>
                          <div className="text-sm text-gray-500">{ranking.wins}V - {ranking.losses}D • {ranking.winRate}% WR</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-4xl font-black font-bebas text-red-500">{ranking.points} pts</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* MATCHES */}
        {activeSection === 'matches' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                PROCHAINS MATCHS
              </h2>
              <div className="space-y-6">
                {UPCOMING_MATCHES.map(match => (
                  <div key={match.id} className="rounded-2xl p-8 transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)', backdropFilter: 'blur(12px)' }}>
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div className="flex items-center gap-6">
                        <div className="text-xl font-bold text-white">{match.team1}</div>
                        <div className="text-3xl text-red-400 font-bebas">VS</div>
                        <div className="text-xl font-bold text-white">{match.team2}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-red-400">{match.competition}</div>
                        <div className="text-sm text-gray-500">{match.date} • {match.time}</div>
                        {match.stream && (
                          <div className="text-xs text-purple-400 flex items-center gap-1 mt-1">
                            <span>📺</span> En direct
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* MEDIA */}
        {activeSection === 'media' && (
          <section className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black font-bebas text-center mb-16" style={{
                background: 'linear-gradient(to right, #DC143C, #FF6B6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                MÉDIAS
              </h2>

              {/* Galerie */}
              <h3 className="text-2xl font-bebas mb-6">📸 GALERIE PHOTOS</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                {GALLERY.map(photo => (
                  <div key={photo.id} className="rounded-xl overflow-hidden aspect-square flex flex-col items-center justify-center text-center p-6 hover:scale-105 transition-transform cursor-pointer"
                    style={{ background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.2)' }}>
                    <span className="text-6xl mb-3">{photo.emoji}</span>
                    <div className="text-sm font-bold text-white">{photo.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{photo.team}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <h3 className="text-2xl font-bebas mb-6">🎥 HIGHLIGHTS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HIGHLIGHTS.map(video => (
                  <div key={video.id} className="rounded-xl p-6 hover:-translate-y-2 transition-all cursor-pointer"
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,20,60,0.15)' }}>
                    <div className="aspect-video rounded-lg bg-red-900 bg-opacity-20 flex items-center justify-center mb-4 border border-red-900 border-opacity-30">
                      <Play className="w-16 h-16 text-red-400" />
                    </div>
                    <div className="text-white font-bold mb-2">{video.title}</div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>👁️ {video.views}</span>
                      <span>{video.duration}</span>
                      <span className="text-xs px-2 py-1 rounded bg-red-900 bg-opacity-20 text-red-400">{video.team}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-900 border-opacity-30 bg-black bg-opacity-50 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-black font-bebas mb-4 text-red-500">STRUCTURE TravL</h3>
              <p className="text-gray-400 text-sm mb-4">
                Organisation esports française dédiée à League of Legends. 7 équipes, une vision.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-widest text-gray-400">NAVIGATION</h4>
              <ul className="space-y-2 text-sm">
                {['Accueil', 'Équipes', 'Actualités'].map((link) => (
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

      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
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
