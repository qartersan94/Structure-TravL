import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, X, Minus } from 'lucide-react';

const PlanningMensuel = ({ userId, userName, userRole }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [presences, setPresences] = useState({});

  // Charger les présences depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`presences_${userId}`);
    if (saved) {
      setPresences(JSON.parse(saved));
    }
  }, [userId]);

  // Sauvegarder les présences
  const savePresences = (newPresences) => {
    setPresences(newPresences);
    localStorage.setItem(`presences_${userId}`, JSON.stringify(newPresences));
  };

  // Obtenir le nombre de jours dans le mois
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Obtenir le premier jour du mois (0 = dimanche, 1 = lundi, etc.)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Changer de mois
  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  // Aller au mois actuel
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Toggle présence
  const togglePresence = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    const today = new Date();
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // Calculer la différence en jours
    const diffTime = selectedDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Vérifier si la date est dans le passé
    if (diffDays < 0) {
      alert('⚠️ Vous ne pouvez pas modifier une date passée !');
      return;
    }

    // Vérifier si la date est modifiable (1 mois avant = 30 jours)
    if (diffDays > 30) {
      alert('⚠️ Vous ne pouvez modifier que les dates dans les 30 prochains jours !');
      return;
    }

    const currentValue = presences[dateKey];
    let newValue;

    if (currentValue === 'oui') {
      newValue = 'non';
    } else if (currentValue === 'non') {
      newValue = null;
    } else {
      newValue = 'oui';
    }

    const newPresences = { ...presences };
    if (newValue === null) {
      delete newPresences[dateKey];
    } else {
      newPresences[dateKey] = newValue;
    }

    savePresences(newPresences);
  };

  // Calculer les stats du mois
  const calculateStats = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    let presents = 0;
    let absents = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      if (presences[dateKey] === 'oui') presents++;
      if (presences[dateKey] === 'non') absents++;
    }

    return { presents, absents, total: daysInMonth };
  };

  const stats = calculateStats();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Générer les jours du calendrier
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Jours vides avant le début du mois
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Planning Mensuel</h2>
            <p className="text-sm text-gray-400">{userName} • {userRole}</p>
          </div>
          <CalendarIcon className="w-8 h-8 text-red-400" />
        </div>

        {/* Navigation mois */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h3 className="text-xl font-bold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
          </div>

          <button
            onClick={() => changeMonth(1)}
            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={goToToday}
          className="w-full px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all text-sm">
          Aujourd'hui
        </button>
      </div>

      {/* Calendrier */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
            const presence = presences[dateKey];
            const today = new Date();
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isPast = selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isToday = selectedDate.toDateString() === today.toDateString();

            let bgColor = 'bg-black/20';
            let borderColor = 'border-white/10';
            let icon = <Minus className="w-4 h-4 text-gray-600" />;

            if (presence === 'oui') {
              bgColor = 'bg-green-500/20';
              borderColor = 'border-green-500/50';
              icon = <Check className="w-4 h-4 text-green-400" />;
            } else if (presence === 'non') {
              bgColor = 'bg-red-500/20';
              borderColor = 'border-red-500/50';
              icon = <X className="w-4 h-4 text-red-400" />;
            }

            return (
              <button
                key={day}
                onClick={() => togglePresence(day)}
                disabled={isPast}
                className={`aspect-square rounded-lg border transition-all ${bgColor} ${borderColor} ${
                  isPast ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                } ${isToday ? 'ring-2 ring-red-500' : ''}`}
                title={isPast ? 'Date passée' : 'Cliquer pour modifier'}>
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-xs font-bold text-white mb-1">{day}</span>
                  {icon}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Statistiques */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-black text-white mb-4">Statistiques du mois</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="text-2xl font-black text-green-400">{stats.presents}</div>
            <div className="text-xs text-gray-400 mt-1">Présences</div>
          </div>

          <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-2xl font-black text-red-400">{stats.absents}</div>
            <div className="text-xs text-gray-400 mt-1">Absences</div>
          </div>

          <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-2xl font-black text-blue-400">
              {stats.presents + stats.absents > 0
                ? Math.round((stats.presents / (stats.presents + stats.absents)) * 100)
                : 0}%
            </div>
            <div className="text-xs text-gray-400 mt-1">Taux présence</div>
          </div>
        </div>
      </div>

      {/* Légende */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-3">Légende</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-gray-400">Présent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center">
              <X className="w-3 h-3 text-red-400" />
            </div>
            <span className="text-gray-400">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-black/20 border border-white/10 flex items-center justify-center">
              <Minus className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-gray-400">Non renseigné</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          ⚠️ Vous pouvez modifier vos disponibilités jusqu'à 30 jours à l'avance
        </p>
      </div>
    </div>
  );
};

export default PlanningMensuel;
