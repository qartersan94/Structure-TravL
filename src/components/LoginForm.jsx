import React, { useState } from 'react';
import { Shield, Eye, EyeOff, LogIn } from 'lucide-react';

// Comptes disponibles :
// STAFF (gère tout) : coach / travl2026 | manager / travl2026 | staff / travl2026
// CAPITAINES (gèrent leur équipe) :
//   mountainking / mountx2026   → Mount X
//   flamewave   / flux2026      → Flux
//   icebreaker  / froz2026      → Froz'nLéGion
//   besetop     / vision2026    → VisionaRY
//   shadowgame  / mymetic2026   → MymétiC
//   goldenshield/ team2026      → Team
//   legacystop  / legendary2026 → LeGendaRY

const ACCOUNTS = [
  { username: 'coach',        password: 'travl2026',    role: 'staff',   teamId: null,  displayName: 'Coach',        title: 'Coach Structure' },
  { username: 'manager',      password: 'travl2026',    role: 'staff',   teamId: null,  displayName: 'Manager',      title: 'Manager Structure' },
  { username: 'staff',        password: 'travl2026',    role: 'staff',   teamId: null,  displayName: 'Staff',        title: 'Staff Structure' },
  { username: 'mountainking', password: 'mountx2026',   role: 'captain', teamId: 1,     displayName: 'MountainKing', title: 'Capitaine Mount X' },
  { username: 'flamewave',    password: 'flux2026',     role: 'captain', teamId: 2,     displayName: 'FlameWave',    title: 'Capitaine Flux' },
  { username: 'icebreaker',   password: 'froz2026',     role: 'captain', teamId: 3,     displayName: 'IceBreaker',   title: "Capitaine Froz'nLéGion" },
  { username: 'besetop',      password: 'vision2026',   role: 'captain', teamId: 4,     displayName: 'BéSetOp',      title: 'Capitaine VisionaRY' },
  { username: 'shadowgame',   password: 'mymetic2026',  role: 'captain', teamId: 5,     displayName: 'ShadowGame',   title: 'Capitaine MymétiC' },
  { username: 'goldenshield', password: 'team2026',     role: 'captain', teamId: 6,     displayName: 'GoldenShield', title: 'Capitaine Team' },
  { username: 'legacystop',   password: 'legendary2026',role: 'captain', teamId: 7,     displayName: 'LegacyStop',   title: 'Capitaine LeGendaRY' }
];

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const account = ACCOUNTS.find(
        acc => acc.username.toLowerCase() === username.toLowerCase() && acc.password === password
      );
      if (account) {
        onLogin(account);
      } else {
        setError('Identifiant ou mot de passe incorrect.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23DC143C' stroke-width='0.5' opacity='0.15'/%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900 rounded-full blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-red-900 border-opacity-30 rounded-2xl p-8 shadow-2xl">
          
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60 rounded-t-2xl"></div>

          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 bg-opacity-10 border-2 border-red-600 border-opacity-40 rounded-2xl mb-4">
              <Shield className="w-10 h-10 text-red-500" style={{ filter: 'drop-shadow(0 0 12px rgba(220,20,60,0.6))' }} />
            </div>
            <h1 className="text-3xl font-bebas tracking-widest text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              DASHBOARD
            </h1>
            <p className="text-sm text-gray-500 mt-1">Structure TravL — Espace de gestion</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">Identifiant</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Votre pseudo"
                autoComplete="off"
                className="w-full bg-black bg-opacity-60 border border-red-900 border-opacity-30 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="w-full bg-black bg-opacity-60 border border-red-900 border-opacity-30 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-600 border-opacity-40 rounded-lg px-4 py-2">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>SE CONNECTER</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Structure TravL © 2026
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
      `}</style>
    </div>
  );
}

export default LoginForm;
