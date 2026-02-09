import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Calendar as CalendarIcon } from 'lucide-react';

const PlanningMensuel = ({ userId, userName, userRole }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [presences, setPresences] = useState({});
  const [loading, setLoading] = useState(true);

  // Charger les présences depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`presences_${userId}`);
    if (stored) {
      setPresences(JSON.parse(stored));
    }
    setLoading(false);
  }, [userId]);

  // Sauvegarder les présences
  const savePresences = (newPresences) => {
    localStorage.setItem(`presences_${userId}`, JSON.stringify(newPresences));
    setPresences(newPresences);
  };

  // Obtenir les jours du mois
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startDayOfWeek = firstDay.getDay();
    
    // Jours vides au début
    for (let i = 0; i < (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1); i++) {
      days.push(null);
    }
    
    // Jours du mois
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Vérifier si modification possible (1 mois avant)
  const canModify = (date) => {
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    return date >= oneMonthFromNow;
  };

  // Vérifier si date passée
  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Toggle présence
  const togglePresence = (date) => {
    if (!date) return;
    
    const dateKey = date.toISOString().split('T')[0];
    
    // Vérifier si modification possible
    if (!canModify(date)) {
      alert('⚠️ Modification impossible - Moins d\'un mois avant la date');
      return;
    }
    
    if (isPast(date)) {
      alert('⚠️ Impossible de modifier une date passée');
      return;
    }
    
    const newPresences = { ...presences };
    
    if (newPresences[dateKey] === undefined) {
      newPresences[dateKey] = true; // OUI
    } else if (newPresences[dateKey] === true) {
      newPresences[dateKey] = false; // NON
    } else {
      delete newPresences[dateKey]; // Reset
    }
    
    savePresences(newPresences);
  };

  // Navigation mois
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtenir statut jour
  const getDayStatus = (date) => {
    if (!date) return null;
    const dateKey = date.toISOString().split('T')[0];
    return presences[dateKey];
  };

  // Nom du mois
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const days = getDaysInMonth(currentDate);
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-gray-400">Chargement du planning...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-red-400" />
            Planning Mensuel
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {userName} - Cliquez sur les jours pour indiquer votre présence
          </p>
        </div>
        
        <button onClick={goToToday}
          className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 text-sm font-semibold hover:bg-red-600/30 transition-all">
          Aujourd'hui
        </button>
      </div>

      {/* Navigation mois */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={previousMonth}
          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <h4 className="text-xl font-bold text-white">
          {monthName} {year}
        </h4>
        
        <button onClick={nextMonth}
          className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square"></div>;
          }
          
          const status = getDayStatus(date);
          const past = isPast(date);
          const modifiable = canModify(date);
          const today = new Date().toDateString() === date.toDateString();
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => togglePresence(date)}
              disabled={past}
              className={`aspect-square rounded-lg border transition-all relative group ${
                today ? 'ring-2 ring-red-500' : ''
              } ${
                past ? 'opacity-50 cursor-not-allowed bg-gray-900/50 border-gray-800' :
                status === true ? 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30' :
                status === false ? 'bg-red-500/20 border-red-500/50 hover:bg-red-500/30' :
                'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              {/* Numéro du jour */}
              <div className="absolute top-1 left-1 text-xs font-semibold text-white">
                {date.getDate()}
              </div>
              
              {/* Icône statut */}
              <div className="flex items-center justify-center h-full">
                {status === true && <Check className="w-5 h-5 text-green-400" />}
                {status === false && <X className="w-5 h-5 text-red-400" />}
              </div>
              
              {/* Tooltip */}
              {!modifiable && !past && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-yellow-500/50 rounded text-[10px] text-yellow-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  ⚠️ Moins de 1 mois
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center">
              <Check className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-gray-400">Présent</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center">
              <X className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-gray-400">Absent</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/5 border border-white/10"></div>
            <span className="text-gray-400">Non renseigné</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-600 mt-4">
          💡 Modification possible jusqu'à 1 mois avant la date
        </p>
      </div>

      {/* Statistiques */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-sm font-bold text-white mb-3">Statistiques du mois</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-black text-green-400">
              {Object.values(presences).filter(p => p === true).length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Présences</div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-black text-red-400">
              {Object.values(presences).filter(p => p === false).length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Absences</div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-black text-blue-400">
              {((Object.values(presences).filter(p => p === true).length / Math.max(Object.values(presences).length, 1)) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Taux</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningMensuel;
