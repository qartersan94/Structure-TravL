import React, { useState } from 'react';
import { Search, Save, Trash2, Plus, Users } from 'lucide-react';

// CHAMPIONS DATABASE (exemple - à compléter)
const CHAMPIONS_DB = {
  Top: ['Aatrox', 'Akali', 'Camille', 'Darius', 'Dr. Mundo', 'Fiora', 'Garen', 'Gwen', 'Irelia', 'Jax', 'Jayce', 'K\'Sante', 'Malphite', 'Ornn', 'Renekton', 'Riven', 'Sett', 'Shen', 'Sion', 'Teemo', 'Urgot', 'Vladimir', 'Volibear', 'Yasuo', 'Yone'],
  Jungle: ['Amumu', 'Bel\'Veth', 'Brand', 'Briar', 'Diana', 'Elise', 'Evelynn', 'Fiddlesticks', 'Gragas', 'Graves', 'Hecarim', 'Ivern', 'Jarvan IV', 'Karthus', 'Kha\'Zix', 'Kindred', 'Lee Sin', 'Lillia', 'Master Yi', 'Nidalee', 'Nocturne', 'Nunu', 'Rammus', 'Rek\'Sai', 'Rengar', 'Sejuani', 'Shaco', 'Shyvana', 'Taliyah', 'Viego', 'Vi', 'Warwick', 'Xin Zhao', 'Zac'],
  Mid: ['Ahri', 'Akali', 'Anivia', 'Annie', 'Aurelion Sol', 'Azir', 'Cassiopeia', 'Corki', 'Diana', 'Ekko', 'Fizz', 'Galio', 'Irelia', 'Kassadin', 'Katarina', 'LeBlanc', 'Lissandra', 'Lux', 'Malzahar', 'Neeko', 'Orianna', 'Qiyana', 'Ryze', 'Syndra', 'Sylas', 'Taliyah', 'Twisted Fate', 'Veigar', 'Vel\'Koz', 'Viktor', 'Vladimir', 'Xerath', 'Yasuo', 'Yone', 'Zed', 'Ziggs', 'Zoe'],
  ADC: ['Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kai\'Sa', 'Kalista', 'Kog\'Maw', 'Lucian', 'Miss Fortune', 'Nilah', 'Samira', 'Senna', 'Sivir', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah', 'Zeri'],
  Support: ['Alistar', 'Bard', 'Blitzcrank', 'Braum', 'Janna', 'Karma', 'Leona', 'Lulu', 'Lux', 'Maokai', 'Milio', 'Morgana', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Rell', 'Renata', 'Senna', 'Seraphine', 'Sona', 'Soraka', 'Tahm Kench', 'Taric', 'Thresh', 'Yuumi', 'Zilean', 'Zyra']
};

const TLineup = ({ teamPlayers }) => {
  const [activeTab, setActiveTab] = useState('lineup'); // lineup, mapper, compositions
  const [blueLineup, setBlueLineup] = useState({
    Top: null,
    Jungle: null,
    Mid: null,
    ADC: null,
    Support: null
  });
  const [redLineup, setRedLineup] = useState({
    Top: null,
    Jungle: null,
    Mid: null,
    ADC: null,
    Support: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Top');
  const [showChampionSelector, setShowChampionSelector] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null); // { side: 'blue'|'red', role: 'Top' }

  const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

  // Filtrer champions selon recherche
  const filteredChampions = selectedRole && CHAMPIONS_DB[selectedRole] 
    ? CHAMPIONS_DB[selectedRole].filter(champ => 
        champ.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Sélectionner champion
  const selectChampion = (champion) => {
    if (!selectingFor) return;
    
    if (selectingFor.side === 'blue') {
      setBlueLineup({
        ...blueLineup,
        [selectingFor.role]: {
          champion,
          player: blueLineup[selectingFor.role]?.player || null
        }
      });
    } else {
      setRedLineup({
        ...redLineup,
        [selectingFor.role]: {
          champion,
          player: redLineup[selectingFor.role]?.player || null
        }
      });
    }
    
    setShowChampionSelector(false);
    setSelectingFor(null);
    setSearchTerm('');
  };

  // Ouvrir sélecteur champion
  const openChampionSelector = (side, role) => {
    setSelectingFor({ side, role });
    setSelectedRole(role);
    setShowChampionSelector(true);
  };

  // Sélectionner joueur
  const selectPlayer = (side, role, player) => {
    if (side === 'blue') {
      setBlueLineup({
        ...blueLineup,
        [role]: {
          ...blueLineup[role],
          player
        }
      });
    } else {
      setRedLineup({
        ...redLineup,
        [role]: {
          ...redLineup[role],
          player
        }
      });
    }
  };

  // Sauvegarder lineup
  const saveLineup = () => {
    const lineup = {
      id: Date.now(),
      name: prompt('Nom du lineup:') || 'Sans nom',
      blue: blueLineup,
      red: redLineup,
      createdAt: new Date().toISOString()
    };
    
    const saved = JSON.parse(localStorage.getItem('tlineup_saved') || '[]');
    saved.push(lineup);
    localStorage.setItem('tlineup_saved', JSON.stringify(saved));
    
    alert('✅ Lineup sauvegardé !');
  };

  // Reset lineup
  const resetLineup = () => {
    if (!confirm('Réinitialiser le lineup ?')) return;
    
    setBlueLineup({
      Top: null,
      Jungle: null,
      Mid: null,
      ADC: null,
      Support: null
    });
    setRedLineup({
      Top: null,
      Jungle: null,
      Mid: null,
      ADC: null,
      Support: null
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black font-bebas flex items-center gap-2">
            <span className="text-red-400">TL</span>INEUP
          </h1>
          <div className="text-xs text-gray-600">
            Compositions & Stratégie • Focus sur Mapper
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('lineup')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition-all ${
              activeTab === 'lineup'
                ? 'bg-red-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            📋 LINEUP
          </button>
          <button
            onClick={() => setActiveTab('mapper')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition-all ${
              activeTab === 'mapper'
                ? 'bg-green-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            🗺️ MAPPER
          </button>
          <button
            onClick={() => setActiveTab('compositions')}
            className={`px-6 py-2 rounded-t-lg font-semibold transition-all ${
              activeTab === 'compositions'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ COMPOSITIONS
          </button>
        </div>
      </div>

      {/* LINEUP TAB */}
      {activeTab === 'lineup' && (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Nom du lineup..."
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-red-500/50"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={saveLineup}
                className="px-4 py-2 bg-green-600/20 border border-green-500/50 rounded-lg text-green-400 font-semibold hover:bg-green-600/30 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </button>
              <button
                onClick={resetLineup}
                className="px-4 py-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-600/30 transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* BLUE SIDE */}
            <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h3 className="text-xl font-bold text-blue-400">BLUE SIDE</h3>
              </div>
              
              <div className="space-y-3">
                {roles.map(role => (
                  <div key={role} className="bg-black/30 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                        {role[0]}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">{role}</div>
                        
                        {blueLineup[role] ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openChampionSelector('blue', role)}
                              className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-400 text-sm font-semibold hover:bg-blue-500/30"
                            >
                              {blueLineup[role].champion || 'Choisir'}
                            </button>
                            {teamPlayers && (
                              <select
                                onChange={(e) => selectPlayer('blue', role, e.target.value)}
                                className="flex-1 px-2 py-1 bg-black/50 border border-white/10 rounded text-white text-sm outline-none"
                                value={blueLineup[role].player || ''}
                              >
                                <option value="">Joueur...</option>
                                {teamPlayers.filter(p => p.position === role).map(player => (
                                  <option key={player.id} value={player.name}>{player.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => openChampionSelector('blue', role)}
                            className="w-full px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-500 text-sm hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                          >
                            + Choisir
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RED SIDE */}
            <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="text-xl font-bold text-red-400">RED SIDE</h3>
              </div>
              
              <div className="space-y-3">
                {roles.map(role => (
                  <div key={role} className="bg-black/30 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-xs font-bold text-red-400">
                        {role[0]}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">{role}</div>
                        
                        {redLineup[role] ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openChampionSelector('red', role)}
                              className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm font-semibold hover:bg-red-500/30"
                            >
                              {redLineup[role].champion || 'Choisir'}
                            </button>
                            {teamPlayers && (
                              <select
                                onChange={(e) => selectPlayer('red', role, e.target.value)}
                                className="flex-1 px-2 py-1 bg-black/50 border border-white/10 rounded text-white text-sm outline-none"
                                value={redLineup[role].player || ''}
                              >
                                <option value="">Joueur...</option>
                                {teamPlayers.filter(p => p.position === role).map(player => (
                                  <option key={player.id} value={player.name}>{player.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => openChampionSelector('red', role)}
                            className="w-full px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-500 text-sm hover:bg-white/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                          >
                            + Choisir
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAPPER TAB */}
      {activeTab === 'mapper' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🗺️ MAPPER - EN DÉVELOPPEMENT</h3>
            <p className="text-gray-400 mb-6">
              Visualisation de la carte avec marqueurs stratégiques, zones de contrôle, et points objectifs.
            </p>
            <div className="aspect-video bg-gradient-to-br from-green-900/10 to-black border border-green-500/20 rounded-xl flex items-center justify-center">
              <p className="text-gray-600">MAP SUMMONER'S RIFT ICI</p>
            </div>
          </div>
        </div>
      )}

      {/* COMPOSITIONS TAB */}
      {activeTab === 'compositions' && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">⚔️ COMPOSITIONS - EN DÉVELOPPEMENT</h3>
            <p className="text-gray-400">
              Bibliothèque de compositions d'équipe, synergies, et stratégies.
            </p>
          </div>
        </div>
      )}

      {/* MODAL - Champion Selector */}
      {showChampionSelector && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  CHOISIR {selectedRole?.toUpperCase()}
                </h3>
                <button
                  onClick={() => setShowChampionSelector(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Chercher un champion..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500/50"
                  autoFocus
                />
              </div>
              
              {/* Filtres par rôle */}
              <div className="flex gap-2 mt-4">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === role
                        ? 'bg-red-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredChampions.map(champion => (
                  <button
                    key={champion}
                    onClick={() => selectChampion(champion)}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-red-500/50 transition-all text-center"
                  >
                    <div className="text-sm font-semibold text-white">{champion}</div>
                  </button>
                ))}
              </div>
              
              {filteredChampions.length === 0 && (
                <p className="text-center text-gray-500 py-12">Aucun champion trouvé</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TLineup;
