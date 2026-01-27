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
