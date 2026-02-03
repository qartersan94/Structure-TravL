import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Trophy, Filter, ChevronDown } from 'lucide-react';
import { SCHEDULE, SESSION_TYPES } from '../data/scheduleData';
import { TEAMS } from '../data/teamsData';

function Calendar() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');

  // Jours de la semaine
  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // Filtrer les sessions
  const filteredSessions = SCHEDULE.filter(session => {
    const typeMatch = selectedType === 'all' || session.type.id === selectedType;
    const teamMatch = selectedTeam === 'all' || session.teamId === parseInt(selectedTeam);
    const dayMatch = selectedDay === 'all' || session.dayName === selectedDay;
    return typeMatch && teamMatch && dayMatch;
  });

  // Grouper par jour
  const sessionsByDay = weekDays.reduce((acc, day) => {
    acc[day] = filteredSessions.filter(s => s.dayName === day);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      
      {/* ========== FILTRES ========== */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900 border-opacity-20 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-red-500" />
          <h3 className="text-xl font-bold">Filtres</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Filtre Type */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Type de session</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all"
            >
              <option value="all">Toutes les sessions</option>
              {Object.values(SESSION_TYPES).map(type => (
                <option key={type.id} value={type.id}>
                  {type.emoji} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre Équipe */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Équipe</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all"
            >
              <option value="all">Toutes les équipes</option>
              {TEAMS.map(team => (
                <option key={team.id} value={team.id}>
                  {team.logo} {team.name}
                </option>
              ))}
              <option value="staff">Staff TravL</option>
            </select>
          </div>

          {/* Filtre Jour */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Jour</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-black bg-opacity-50 border border-red-900 border-opacity-30 rounded-lg px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-all"
            >
              <option value="all">Toute la semaine</option>
              {weekDays.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Résultats */}
        <div className="mt-4 text-sm text-gray-400">
          <span className="font-bold text-red-500">{filteredSessions.length}</span> session{filteredSessions.length > 1 ? 's' : ''} trouvée{filteredSessions.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* ========== CALENDRIER PAR JOUR ========== */}
      <div className="space-y-6">
        {weekDays.map((day, dayIdx) => {
          const daySessions = sessionsByDay[day];
          
          if (daySessions.length === 0) return null;

          return (
            <div key={day} className="space-y-3">
              
              {/* Header Jour */}
              <div className="flex items-center space-x-3">
                <div className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 rounded-lg px-4 py-2">
                  <div className="text-sm font-bold text-red-500">{day}</div>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-red-600 to-transparent opacity-20"></div>
                <div className="text-sm text-gray-500 font-bold">
                  {daySessions.length} session{daySessions.length > 1 ? 's' : ''}
                </div>
              </div>

              {/* Sessions du jour */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {daySessions.map((session, idx) => (
                  <SessionCard key={session.id} session={session} index={idx} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Message si aucun résultat */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-20">
            <CalendarIcon className="h-16 w-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 mb-2">Aucune session trouvée</h3>
            <p className="text-gray-600">Essayez de modifier les filtres</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ========== COMPOSANT CARTE SESSION ==========
function SessionCard({ session, index }) {
  const [expanded, setExpanded] = useState(false);
  const type = session.type;

  return (
    <div
      className="group bg-gradient-to-br from-gray-900 to-black border-2 border-red-900 border-opacity-10 rounded-xl overflow-hidden hover:border-red-600 hover:border-opacity-30 transition-all duration-300 hover:-translate-y-1"
      style={{ 
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s forwards`,
        opacity: 0
      }}
    >
      {/* Header avec type de session */}
      <div 
        className="p-4 border-b border-red-900 border-opacity-20"
        style={{ 
          background: `linear-gradient(135deg, ${type.color}15 0%, transparent 100%)`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className={`${type.bgColor} bg-opacity-20 border ${type.borderColor} border-opacity-50 rounded-lg p-2`}
            >
              <span className="text-2xl">{type.emoji}</span>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: type.color }}>
                {type.label}
              </div>
              <div className="text-xs text-gray-500">{session.teamName}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-white font-bold">
              <Clock className="h-4 w-4 text-red-500" />
              <span>{session.time}</span>
            </div>
            <div className="text-xs text-gray-500">{session.duration}</div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-3">
        
        {/* Titre */}
        <h4 className="font-bold text-white group-hover:text-red-500 transition-colors">
          {session.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {session.description}
        </p>

        {/* Infos complémentaires */}
        <div className="space-y-2 text-sm">
          
          {/* Location */}
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
            <span>{session.location}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="h-4 w-4 text-red-500 flex-shrink-0" />
            <span>{session.participants.join(', ')}</span>
          </div>

          {/* Compétition (si applicable) */}
          {session.competition && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Trophy className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="font-bold text-red-400">{session.competition}</span>
              {session.opponent && <span>vs {session.opponent}</span>}
            </div>
          )}

          {/* Coach */}
          {session.coach && (
            <div className="text-xs text-gray-500">
              Coach : <span className="text-gray-400 font-bold">{session.coach}</span>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {session.mandatory && (
            <span className="bg-red-600 bg-opacity-20 border border-red-600 border-opacity-50 text-red-400 text-xs font-bold px-2 py-1 rounded">
              Obligatoire
            </span>
          )}
          {session.important && (
            <span className="bg-yellow-600 bg-opacity-20 border border-yellow-600 border-opacity-50 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
              Important
            </span>
          )}
          {session.streamUrl && (
            <a 
              href={session.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 bg-opacity-20 border border-purple-600 border-opacity-50 text-purple-400 text-xs font-bold px-2 py-1 rounded hover:bg-opacity-30 transition-all"
            >
              📺 Stream
            </a>
          )}
        </div>
      </div>

      {/* Barre de couleur en bas */}
      <div 
        className="h-1"
        style={{ 
          background: `linear-gradient(90deg, ${type.color} 0%, transparent 100%)`,
          boxShadow: `0 0 10px ${type.color}50`
        }}
      ></div>
    </div>
  );
}

export default Calendar;
