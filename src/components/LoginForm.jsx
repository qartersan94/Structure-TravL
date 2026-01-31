import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Shield, Award } from 'lucide-react';

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Comptes autorisés (en production, ça serait en backend)
  const authorizedAccounts = {
    // Staff
    'coach': { password: 'travl2026', role: 'Coach', name: 'Coach Principal', teamId: null },
    'manager': { password: 'travl2026', role: 'Manager', name: 'Manager Structure', teamId: null },
    'staff': { password: 'travl2026', role: 'Staff', name: 'Staff TravL', teamId: null },
    
    // Capitaines des équipes
    'mountainking': { password: 'mountx2026', role: 'Capitaine', name: 'MountainKing', teamId: 1, teamName: 'Mount X' },
    'flamewave': { password: 'flux2026', role: 'Capitaine', name: 'FlameWave', teamId: 2, teamName: 'Flux' },
    'icebreaker': { password: 'froz2026', role: 'Capitaine', name: 'IceBreaker', teamId: 3, teamName: 'Froz\'nLéGion' },
    'besetop': { password: 'vision2026', role: 'Capitaine', name: 'BeSeTop', teamId: 4, teamName: 'VisionaRY' },
    'shadowgame': { password: 'mymetic2026', role: 'Capitaine', name: 'ShadowGame', teamId: 5, teamName: 'MymétiC' },
    'goldenshield': { password: 'team2026', role: 'Capitaine', name: 'GoldenShield', teamId: 6, teamName: 'Team' },
    'legacystop': { password: 'legendary2026', role: 'Capitaine', name: 'LegacysTop', teamId: 7, teamName: 'LeGendaRY' }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation d'un délai de connexion
    setTimeout(() => {
      const account = authorizedAccounts[credentials.username.toLowerCase()];
      
      if (account && account.password === credentials.password) {
        onLogin({
          username: credentials.username,
          role: account.role,
          name: account.name,
          teamId: account.teamId,
          teamName: account.teamName,
          loggedAt: new Date().toISOString()
        });
      } else {
        setError('Identifiants incorrects');
      }
      setLoading(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-950 to-black">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 bg-opacity-10 border-2 border-red-600 border-opacity-30 rounded-2xl mb-4">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-bebas tracking-tight mb-2">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              DASHBOARD
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Espace réservé au Staff et Capitaines
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border-2 border-red-900 border-opacity-30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">
                <User className="inline w-4 h-4 mr-2" />
                Identifiant
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                placeholder="coach / manager / capitaine"
                className="w-full bg-black bg-opacity-50 border-2 border-red-900 border-opacity-30 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 tracking-wide uppercase">
                <Lock className="inline w-4 h-4 mr-2" />
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-black bg-opacity-50 border-2 border-red-900 border-opacity-30 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-600 border-opacity-50 rounded-lg px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-lg tracking-wide py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(220,20,60,0.5)] flex items-center justify-center space-x-3 font-bebas disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>CONNEXION...</span>
                </>
              ) : (
                <>
                  <Shield className="w-6 h-6" />
                  <span>SE CONNECTER</span>
                </>
              )}
            </button>
          </form>

          {/* Informations */}
          <div className="mt-6 p-4 bg-black bg-opacity-50 rounded-xl border border-red-900 border-opacity-20">
            <h3 className="text-sm font-bold text-gray-400 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-2 text-red-500" />
              COMPTES DISPONIBLES
            </h3>
            <div className="space-y-1 text-xs text-gray-500">
              <div>• <span className="text-red-400">Staff</span> : coach / manager / staff</div>
              <div>• <span className="text-red-400">Capitaines</span> : mountainking / flamewave / icebreaker / besetop / shadowgame / goldenshield / legacystop</div>
              <div className="mt-2 text-gray-600">Mot de passe : <span className="text-gray-400">travl2026</span> (staff) ou <span className="text-gray-400">[équipe]2026</span> (capitaines)</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Accès sécurisé • Structure TravL © 2026
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
