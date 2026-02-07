import React, { useState } from 'react';
import { ArrowLeft, LogOut, Users, Calendar, TrendingUp, Trophy } from 'lucide-react';

const Dashboard = ({ user, onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-xl border-b border-red-500/10 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-black font-bebas">DASHBOARD</h1>
                <p className="text-sm text-gray-400">{user.name} • {user.role}</p>
              </div>
            </div>
            
            <button onClick={onLogout}
              className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
              <TrendingUp className="w-5 h-5" />
              Vue d'ensemble
            </button>
            
            <button
              onClick={() => setActiveTab('planning')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'planning'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
              <Calendar className="w-5 h-5" />
              Planning
            </button>
            
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
              <Trophy className="w-5 h-5" />
              Statistiques
            </button>
          </div>

          {/* Content */}
          <div className="mt-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-3xl font-black mb-6">Vue d'ensemble</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Joueurs actifs</p>
                        <p className="text-2xl font-black">35</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-green-500/20 rounded-xl">
                        <Trophy className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Équipes</p>
                        <p className="text-2xl font-black">7</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-red-500/20 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Winrate Global</p>
                        <p className="text-2xl font-black">61%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'planning' && (
              <div>
                <h2 className="text-3xl font-black mb-6">Planning</h2>
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <p className="text-gray-400">Module planning en développement</p>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h2 className="text-3xl font-black mb-6">Statistiques</h2>
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <p className="text-gray-400">Module statistiques en développement</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
