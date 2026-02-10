import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Shield } from 'lucide-react';

const RegisterForm = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    discordTag: '',
    riotId: '',
    mainRole: 'Top'
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Créer le nouveau membre (statut "pending" par défaut)
    const newMember = {
      id: `member_${Date.now()}`,
      username: formData.username,
      email: formData.email,
      password: formData.password, // En production, hash le mot de passe !
      discordTag: formData.discordTag,
      riotId: formData.riotId,
      mainRole: formData.mainRole,
      role: 'PENDING', // Rôle en attente de validation
      teams: [],
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Sauvegarder dans localStorage (simulation base de données)
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    members.push(newMember);
    localStorage.setItem('members', JSON.stringify(members));

    // Appeler callback
    onRegister(newMember);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center font-black text-2xl mx-auto mb-4">
              TL
            </div>
            <h1 className="text-3xl font-black font-bebas mb-2">INSCRIPTION</h1>
            <p className="text-sm text-gray-400">Rejoins Structure TravL</p>
          </div>

          {/* Erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Pseudo <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Ton pseudo"
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="ton@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Mot de passe <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Confirmer mot de passe <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Discord */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Discord Tag (optionnel)
              </label>
              <input
                type="text"
                value={formData.discordTag}
                onChange={(e) => setFormData({...formData, discordTag: e.target.value})}
                placeholder="Pseudo#1234"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50 transition-all"
              />
            </div>

            {/* Riot ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Riot ID (optionnel)
              </label>
              <input
                type="text"
                value={formData.riotId}
                onChange={(e) => setFormData({...formData, riotId: e.target.value})}
                placeholder="Pseudo#EUW"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 outline-none focus:border-red-500/50 transition-all"
              />
            </div>

            {/* Main Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Rôle principal <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.mainRole}
                onChange={(e) => setFormData({...formData, mainRole: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white outline-none focus:border-red-500/50 transition-all">
                <option value="Top">Top</option>
                <option value="Jungle">Jungle</option>
                <option value="Mid">Mid</option>
                <option value="ADC">ADC</option>
                <option value="Support">Support</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-bold hover:scale-105 transition-all mt-6"
              style={{ boxShadow: '0 0 30px rgba(220,20,60,0.5)' }}>
              S'inscrire
            </button>
          </form>

          {/* Retour login */}
          <div className="mt-6 text-center">
            <button
              onClick={onBackToLogin}
              className="text-sm text-gray-400 hover:text-white transition-all">
              Déjà inscrit ? <span className="text-red-400 font-semibold">Se connecter</span>
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-400 text-center">
              ⚡ Ton compte sera validé par un administrateur avant de pouvoir accéder au site
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
