import React, { useState } from 'react';
import { ArrowLeft, LogOut, Calendar, Users, Trophy, Target, Map } from 'lucide-react';
import DashboardPresident from './DashboardPresident';
import DashboardCapitaine from './DashboardCapitaine';
import DashboardJoueur from './DashboardJoueur';
import PlanningMensuel from './planning/PlanningMensuel';
import TLineup from './TLineup';

const Dashboard = ({ user, onLogout, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Définir les tabs selon le rôle
  const getTabsByRole = () => {
    const commonTabs = [
      { id: 'overview', label: 'Vue d\'ensemble', icon: Target },
      { id: 'planning', label: 'Planning', icon: Calendar },
      { id: 'tlineup', label: 'TLineup', icon: Map }
    ];

    if (user.role === 'PRESIDENT') {
      return commonTabs;
    } else if (user.role === 'CAPITAINE') {
      return [
        { id: 'overview', label: 'Mon Équipe', icon: Users },
        { id: 'planning', label: 'Planning', icon: Calendar },
        { id: 'tlineup', label: 'TLineup', icon: Map }
      ];
    } else if (user.role === 'JOUEUR') {
      return [
        { id: 'overview', label: 'Mes Stats', icon: Trophy },
        { id: 'planning', label: 'Mes Disponibilités', icon: Calendar },
        { id: 'tlineup', label: 'TLineup', icon: Map }
      ];
    }

    return commonTabs;
  };

  const tabs = getTabsByRole();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-b from-black via-black/95 to-transparent backdrop-blur-xl border-b border-red-500/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-black font-bebas">DASHBOARD</h1>
                  <p className="text-sm text-gray-400">
                    {user.name} • <span className="text-red-400">{user.role}</span>
                  </p>
                </div>
              </div>
              
              <button onClick={onLogout}
                className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex gap-2 border-b border-white/5 pb-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-t-xl font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}>
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 pb-20">
          {activeTab === 'overview' && (
            <>
              {user.role === 'PRESIDENT' && <DashboardPresident />}
              {user.role === 'CAPITAINE' && <DashboardCapitaine userTeamId={user.teams?.[0]} />}
              {user.role === 'JOUEUR' && <DashboardJoueur userId={user.id} userTeamId={user.teams?.[0]} />}
              {(user.role === 'COACH' || user.role === 'MANAGER') && (
                <div className="text-center py-20">
                  <p className="text-gray-400">Dashboard {user.role} en développement</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'planning' && (
            <PlanningMensuel 
              userId={user.id} 
              userName={user.name} 
              userRole={user.role} 
            />
          )}

          {activeTab === 'tlineup' && (
            <TLineup teamId={user.teams?.[0]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
