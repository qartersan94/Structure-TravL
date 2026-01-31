import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Shield } from 'lucide-react';

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ACCOUNTS = {
    coach:        { password: 'travl2026',      role: 'Staff',      name: 'Coach Principal' },
    manager:      { password: 'travl2026',      role: 'Staff',      name: 'Manager Structure' },
    staff:        { password: 'travl2026',      role: 'Staff',      name: 'Staff TravL' },
    mountainking: { password: 'mountx2026',     role: 'Capitaine',  name: 'MountainKing',  teamId: 1, teamName: 'Mount X' },
    flamewave:    { password: 'flux2026',       role: 'Capitaine',  name: 'FlameWave',     teamId: 2, teamName: 'Flux' },
    icebreaker:   { password: 'froz2026',       role: 'Capitaine',  name: 'IceBreaker',    teamId: 3, teamName: "Froz'nLéGion" },
    besetop:      { password: 'vision2026',     role: 'Capitaine',  name: 'BeSeTop',       teamId: 4, teamName: 'VisionaRY' },
    shadowgame:   { password: 'mymetic2026',    role: 'Capitaine',  name: 'ShadowGame',    teamId: 5, teamName: 'MymétiC' },
    goldenshield: { password: 'team2026',       role: 'Capitaine',  name: 'GoldenShield',  teamId: 6, teamName: 'Team' },
    legacystop:   { password: 'legendary2026',  role: 'Capitaine',  name: 'LegacysTop',    teamId: 7, teamName: 'LeGendaRY' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const account = ACCOUNTS[credentials.username];
      if (account && account.password === credentials.password) {
        onLogin({
          username: credentials.username,
          role: account.role,
          name: account.name,
          teamId: account.teamId || null,
          teamName: account.teamName || null,
          loggedAt: new Date().toLocaleTimeString()
        });
      } else {
        setError('Identifiants invalides');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900 rounded-full blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-600 bg-opacity-10 border-2 border-red-600 border-opacity-40 rounded-2xl mb-6">
            <Shield className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl font-black font-bebas tracking-tight">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">STRUCTURE TRAVL</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Panel de Gestion</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-30 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">Identifiant</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="Nom d'utilisateur"
                  required
                  className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-800 border-opacity-40 rounded-lg px-4 py-3 text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 text-white font-black text-base tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] flex items-center justify-center space-x-2 font-bebas"
            >
              {loading ? <span className="animate-pulse">Connexion...</span> : (<><Shield className="w-5 h-5" /><span>Se connecter</span></>)}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-600 text-xs mt-6">Structure TravL © 2026</p>
      </div>

      <style>{`.font-bebas { font-family: 'Bebas Neue', sans-serif; }`}</style>
    </div>
  );
}

export default LoginForm;
