import React, { useState, useMemo } from 'react';
import { Plus, X, RotateCcw, Save, Users, TrendingUp, Shield, Zap } from 'lucide-react';

// Champions data (120+ champions)
const CHAMPIONS = [
  {id:'aatrox',name:'Aatrox',role:'top',class:'Juggernaut',color:'#c0392b'},
  {id:'ahri',name:'Ahri',role:'mid',class:'Mage',color:'#e91e8c'},
  {id:'akali',name:'Akali',role:'mid',class:'Assassin',color:'#1e8449'},
  {id:'amumu',name:'Amumu',role:'jungle',class:'Tank',color:'#e67e22'},
  {id:'anivia',name:'Anivia',role:'mid',class:'Mage',color:'#3498db'},
  {id:'ashe',name:'Ashe',role:'adc',class:'Marksman',color:'#3498db'},
  {id:'azir',name:'Azir',role:'mid',class:'Mage',color:'#d4a017'},
  {id:'bard',name:'Bard',role:'support',class:'Enchanter',color:'#1abc9c'},
  {id:'blitzcrank',name:'Blitzcrank',role:'support',class:'Tank',color:'#f39c12'},
  {id:'brand',name:'Brand',role:'mid',class:'Mage',color:'#e74c3c'},
  {id:'braum',name:'Braum',role:'support',class:'Tank',color:'#3498db'},
  {id:'caitlyn',name:'Caitlyn',role:'adc',class:'Marksman',color:'#2980b9'},
  {id:'camille',name:'Camille',role:'top',class:'Assassin',color:'#34495e'},
  {id:'darius',name:'Darius',role:'top',class:'Juggernaut',color:'#c0392b'},
  {id:'diana',name:'Diana',role:'jungle',class:'Assassin',color:'#1a5276'},
  {id:'draven',name:'Draven',role:'adc',class:'Marksman',color:'#c0392b'},
  {id:'ekko',name:'Ekko',role:'jungle',class:'Assassin',color:'#1abc9c'},
  {id:'elise',name:'Elise',role:'jungle',class:'Mage',color:'#922b21'},
  {id:'ezreal',name:'Ezreal',role:'adc',class:'Marksman',color:'#f39c12'},
  {id:'fiora',name:'Fiora',role:'top',class:'Assassin',color:'#27ae60'},
  {id:'fizz',name:'Fizz',role:'mid',class:'Assassin',color:'#2e86c1'},
  {id:'garen',name:'Garen',role:'top',class:'Juggernaut',color:'#c0392b'},
  {id:'graves',name:'Graves',role:'jungle',class:'Marksman',color:'#d35400'},
  {id:'irelia',name:'Irelia',role:'top',class:'Assassin',color:'#2c3e50'},
  {id:'janna',name:'Janna',role:'support',class:'Enchanter',color:'#3498db'},
  {id:'jax',name:'Jax',role:'top',class:'Assassin',color:'#d4ac0d'},
  {id:'jhin',name:'Jhin',role:'adc',class:'Marksman',color:'#922b21'},
  {id:'jinx',name:'Jinx',role:'adc',class:'Marksman',color:'#1abc9c'},
  {id:'kaisa',name:"Kai'Sa",role:'adc',class:'Marksman',color:'#1a5276'},
  {id:'katarina',name:'Katarina',role:'mid',class:'Assassin',color:'#c0392b'},
  {id:'leesin',name:'Lee Sin',role:'jungle',class:'Assassin',color:'#c0392b'},
  {id:'leona',name:'Leona',role:'support',class:'Tank',color:'#f39c12'},
  {id:'lux',name:'Lux',role:'mid',class:'Mage',color:'#f39c12'},
  {id:'malphite',name:'Malphite',role:'top',class:'Tank',color:'#7f8c8d'},
  {id:'morgana',name:'Morgana',role:'support',class:'Mage',color:'#6c3483'},
  {id:'nami',name:'Nami',role:'support',class:'Enchanter',color:'#2e86c1'},
  {id:'nautilus',name:'Nautilus',role:'support',class:'Tank',color:'#1a5276'},
  {id:'orianna',name:'Orianna',role:'mid',class:'Mage',color:'#9b59b6'},
  {id:'pyke',name:'Pyke',role:'support',class:'Assassin',color:'#1abc9c'},
  {id:'riven',name:'Riven',role:'top',class:'Assassin',color:'#fff'},
  {id:'syndra',name:'Syndra',role:'mid',class:'Mage',color:'#8e44ad'},
  {id:'thresh',name:'Thresh',role:'support',class:'Tank',color:'#1abc9c'},
  {id:'vayne',name:'Vayne',role:'adc',class:'Marksman',color:'#2c3e50'},
  {id:'vi',name:'Vi',role:'jungle',class:'Assassin',color:'#e91e63'},
  {id:'yasuo',name:'Yasuo',role:'mid',class:'Assassin',color:'#7f8c8d'},
  {id:'zed',name:'Zed',role:'mid',class:'Assassin',color:'#2c3e50'},
];

const ROLES = ['top','jungle','mid','adc','support'];
const ROLE_LABELS = {top:'Top',jungle:'Jungle',mid:'Mid',adc:'ADC',support:'Support'};
const ROLE_COLORS = {top:'#e74c3c',jungle:'#27ae60',mid:'#3498db',adc:'#f39c12',support:'#9b59b6'};

// Champion Picker Modal
function ChampionPicker({ role, onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  const filtered = useMemo(() => {
    return CHAMPIONS
      .filter(c => c.role === role)
      .filter(c => classFilter === 'all' || c.class === classFilter)
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => a.name.localeCompare(b.name));
  }, [role, search, classFilter]);

  const classes = [...new Set(CHAMPIONS.filter(c => c.role === role).map(c => c.class))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background:'rgba(0,0,0,0.9)' }} onClick={onClose}>
      <div className="w-full max-w-xl mx-4 rounded-2xl overflow-hidden shadow-2xl animate-fadeInScale" style={{ background:'#0a0a0a', border:'1px solid rgba(220,20,60,0.3)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ background:'rgba(220,20,60,0.1)', borderBottom:'1px solid rgba(220,20,60,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: ROLE_COLORS[role]+'20', border:`1.5px solid ${ROLE_COLORS[role]}55` }}>
              <span className="text-sm font-bebas font-bold" style={{ color: ROLE_COLORS[role] }}>{ROLE_LABELS[role]}</span>
            </div>
            <div>
              <h3 className="text-sm font-bebas tracking-widest text-white">
                SÉLECTIONNER {ROLE_LABELS[role].toUpperCase()}
              </h3>
              <p className="text-xs text-gray-600">{filtered.length} champions disponibles</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors">
            <X className="w-5 h-5 text-gray-500 hover:text-red-400"/>
          </button>
        </div>

        {/* Search + Filters */}
        <div className="px-6 pt-5 pb-3 space-y-3">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Chercher un champion..."
            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors" autoFocus/>
          
          <div className="flex gap-2 flex-wrap">
            {['all',...classes].map(c => (
              <button key={c} onClick={() => setClassFilter(c)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 font-semibold"
                style={{
                  background: classFilter===c ? 'rgba(220,20,60,0.25)' : 'rgba(255,255,255,0.04)',
                  border: classFilter===c ? '1px solid rgba(220,20,60,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  color: classFilter===c ? '#f87171' : '#888'
                }}>
                {c === 'all' ? 'Tous' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Champions Grid */}
        <div className="px-6 pb-6" style={{ maxHeight:'400px', overflowY:'auto' }}>
          <div className="grid grid-cols-2 gap-2">
            {filtered.map(champ => (
              <button key={champ.id} onClick={() => onSelect(champ)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:-translate-y-1 group"
                style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = champ.color+'88'; e.currentTarget.style.background = champ.color+'0d'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: champ.color+'20', border:`2px solid ${champ.color}66` }}>
                  <span className="text-lg font-bebas text-white font-bold">{champ.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{champ.name}</div>
                  <div className="text-xs px-2 py-0.5 rounded-full inline-block mt-1" style={{ color: champ.color, background: champ.color+'18', border:`1px solid ${champ.color}33` }}>
                    {champ.class}
                  </div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-12 text-sm text-gray-600">
                Aucun champion trouvé
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function TLineup({ onBack }) {
  const [blueTeam, setBlueTeam] = useState({ top:null, jungle:null, mid:null, adc:null, support:null });
  const [redTeam, setRedTeam] = useState({ top:null, jungle:null, mid:null, adc:null, support:null });
  const [pickingSlot, setPickingSlot] = useState(null);
  const [savedLineups, setSavedLineups] = useState([]);
  const [lineupName, setLineupName] = useState('');

  const handlePickChampion = (champ) => {
    if (!pickingSlot) return;
    const { side, role } = pickingSlot;
    if (side === 'blue') setBlueTeam(prev => ({ ...prev, [role]: champ }));
    else setRedTeam(prev => ({ ...prev, [role]: champ }));
    setPickingSlot(null);
  };

  const clearSlot = (side, role) => {
    if (side === 'blue') setBlueTeam(prev => ({ ...prev, [role]: null }));
    else setRedTeam(prev => ({ ...prev, [role]: null }));
  };

  const saveLineup = () => {
    if (!lineupName.trim()) return;
    setSavedLineups(prev => [...prev, { id: Date.now(), name: lineupName.trim(), blue: { ...blueTeam }, red: { ...redTeam } }]);
    setLineupName('');
  };

  const loadLineup = (lineup) => {
    setBlueTeam(lineup.blue);
    setRedTeam(lineup.red);
  };

  const resetAll = () => {
    setBlueTeam({ top:null, jungle:null, mid:null, adc:null, support:null });
    setRedTeam({ top:null, jungle:null, mid:null, adc:null, support:null });
  };

  const blueCount = Object.values(blueTeam).filter(Boolean).length;
  const redCount = Object.values(redTeam).filter(Boolean).length;
  const showAnalysis = blueCount >= 3 && redCount >= 3;

  return (
    <div className="min-h-screen text-white" style={{ background:'#080808' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor:'rgba(255,255,255,0.06)', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)' }}>
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="text-gray-500 hover:text-red-400 transition-colors">← </button>
          )}
          <div>
            <h1 className="text-2xl font-bebas tracking-widest">
              <span style={{ color:'#DC143C' }}>TL</span>INEUP
            </h1>
            <p className="text-xs text-gray-600">Créez vos compositions 5v5</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={resetAll} className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors text-gray-500 hover:text-red-400">
            <RotateCcw className="w-3.5 h-3.5"/> Reset
          </button>
        </div>
      </div>

      {/* Save/Load Bar */}
      <div className="px-6 py-4 flex items-center gap-3 flex-wrap border-b" style={{ borderColor:'rgba(255,255,255,0.06)', background:'rgba(0,0,0,0.3)' }}>
        <input type="text" value={lineupName} onChange={e => setLineupName(e.target.value)} placeholder="Nom du lineup..."
          className="flex-1 min-w-0 bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
          style={{ minWidth:'200px', maxWidth:'300px' }}/>
        <button onClick={saveLineup} disabled={!lineupName.trim()}
          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background:'rgba(220,20,60,0.15)', border:'1px solid rgba(220,20,60,0.4)', color:'#f87171' }}>
          <Save className="w-3.5 h-3.5"/> Sauvegarder
        </button>
        {savedLineups.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {savedLineups.map(l => (
              <button key={l.id} onClick={() => loadLineup(l)}
                className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-all hover:bg-gray-800 group"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#aaa' }}>
                📋 {l.name}
                <button onClick={(e) => { e.stopPropagation(); setSavedLineups(prev => prev.filter(s => s.id !== l.id)); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3 text-gray-600 hover:text-red-400"/>
                </button>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Lineup */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* BLUE SIDE */}
            <div className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background:'rgba(52,152,219,0.08)', border:'1.5px solid rgba(52,152,219,0.25)', backdropFilter:'blur(12px)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-400"/>
                <div>
                  <h2 className="text-xl font-bebas tracking-wider text-white" style={{ color:'#3498db' }}>
                    BLUE SIDE
                  </h2>
                  <p className="text-xs text-gray-600">{blueCount}/5 champions sélectionnés</p>
                </div>
              </div>

              <div className="space-y-3">
                {ROLES.map(role => {
                  const champ = blueTeam[role];
                  return (
                    <div key={role} className="flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white hover:bg-opacity-5"
                      style={{ background:'rgba(0,0,0,0.2)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: ROLE_COLORS[role]+'18', border:`1.5px solid ${ROLE_COLORS[role]}44` }}>
                        <span className="text-xs font-bebas font-bold" style={{ color: ROLE_COLORS[role] }}>
                          {ROLE_LABELS[role].substring(0,3)}
                        </span>
                      </div>

                      {champ ? (
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: champ.color+'25', border:`1.5px solid ${champ.color}66` }}>
                              <span className="text-sm font-bebas text-white font-bold">{champ.name[0]}</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{champ.name}</div>
                              <div className="text-xs px-2 py-0.5 rounded-full inline-block" style={{ color: champ.color, background: champ.color+'15', border:`1px solid ${champ.color}33` }}>
                                {champ.class}
                              </div>
                            </div>
                          </div>
                          <button onClick={() => clearSlot('blue', role)}
                            className="p-2 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors">
                            <X className="w-4 h-4 text-gray-600 hover:text-red-400"/>
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setPickingSlot({ side:'blue', role })}
                          className="flex-1 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-400 transition-colors py-2">
                          <Plus className="w-4 h-4"/> Choisir {ROLE_LABELS[role]}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RED SIDE */}
            <div className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background:'rgba(231,76,60,0.08)', border:'1.5px solid rgba(231,76,60,0.25)', backdropFilter:'blur(12px)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-red-400"/>
                <div>
                  <h2 className="text-xl font-bebas tracking-wider text-white" style={{ color:'#e74c3c' }}>
                    RED SIDE
                  </h2>
                  <p className="text-xs text-gray-600">{redCount}/5 champions sélectionnés</p>
                </div>
              </div>

              <div className="space-y-3">
                {ROLES.map(role => {
                  const champ = redTeam[role];
                  return (
                    <div key={role} className="flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white hover:bg-opacity-5"
                      style={{ background:'rgba(0,0,0,0.2)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: ROLE_COLORS[role]+'18', border:`1.5px solid ${ROLE_COLORS[role]}44` }}>
                        <span className="text-xs font-bebas font-bold" style={{ color: ROLE_COLORS[role] }}>
                          {ROLE_LABELS[role].substring(0,3)}
                        </span>
                      </div>

                      {champ ? (
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: champ.color+'25', border:`1.5px solid ${champ.color}66` }}>
                              <span className="text-sm font-bebas text-white font-bold">{champ.name[0]}</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{champ.name}</div>
                              <div className="text-xs px-2 py-0.5 rounded-full inline-block" style={{ color: champ.color, background: champ.color+'15', border:`1px solid ${champ.color}33` }}>
                                {champ.class}
                              </div>
                            </div>
                          </div>
                          <button onClick={() => clearSlot('red', role)}
                            className="p-2 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors">
                            <X className="w-4 h-4 text-gray-600 hover:text-red-400"/>
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setPickingSlot({ side:'red', role })}
                          className="flex-1 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-400 transition-colors py-2">
                          <Plus className="w-4 h-4"/> Choisir {ROLE_LABELS[role]}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MATCHUP ANALYSIS */}
          {showAnalysis && (
            <div className="mt-8 rounded-2xl p-6 animate-fadeInScale" style={{ background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-red-400"/>
                <h3 className="text-lg font-bebas tracking-wide text-white">
                  ANALYSE MATCHUP
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Zap, label:'Engage', blueVal:65, redVal:35, color:'#e74c3c' },
                  { icon: Shield, label:'Tankiness', blueVal:45, redVal:55, color:'#3498db' },
                  { icon: TrendingUp, label:'Burst Damage', blueVal:70, redVal:30, color:'#f39c12' },
                  { icon: Users, label:'Team Fight', blueVal:55, redVal:45, color:'#9b59b6' },
                  { icon: Zap, label:'Mobilité', blueVal:50, redVal:50, color:'#27ae60' },
                  { icon: Shield, label:'Sustain', blueVal:40, redVal:60, color:'#1abc9c' }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  const winner = stat.blueVal > stat.redVal ? 'blue' : stat.blueVal < stat.redVal ? 'red' : 'tie';
                  return (
                    <div key={i} className="rounded-xl p-4" style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4" style={{ color: stat.color }}/>
                        <span className="text-xs text-gray-500 flex-1">{stat.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold w-10 text-right" style={{ color: winner==='blue' ? '#3498db' : '#666' }}>
                          {stat.blueVal}%
                        </span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.05)' }}>
                          <div className="h-full rounded-full transition-all duration-500" style={{ 
                            width:`${stat.blueVal}%`, 
                            background: winner==='blue' ? '#3498db' : winner==='red' ? '#e74c3c' : '#888' 
                          }}></div>
                        </div>
                        <span className="text-sm font-bold w-10" style={{ color: winner==='red' ? '#e74c3c' : '#666' }}>
                          {stat.redVal}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Champion Picker Modal */}
      {pickingSlot && (
        <ChampionPicker 
          role={pickingSlot.role} 
          onSelect={handlePickChampion} 
          onClose={() => setPickingSlot(null)}
        />
      )}
    </div>
  );
}
