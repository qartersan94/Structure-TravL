import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Trash2, Edit, Save, X, UserPlus, UserMinus, 
  Award, DollarSign, MapPin, Calendar, FileText, Image as ImageIcon
} from 'lucide-react';

// ============================================
// SYSTÈME DE GESTION COMPLET POUR DASHBOARD
// ============================================

// Hook pour empêcher le retour au site public
export const useDashboardLock = () => {
  useEffect(() => {
    const preventBack = (e) => {
      e.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };
    
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', preventBack);
    
    // Désactiver aussi le bouton retour du navigateur
    window.onbeforeunload = () => "Voulez-vous vraiment quitter le dashboard ?";
    
    return () => {
      window.removeEventListener('popstate', preventBack);
      window.onbeforeunload = null;
    };
  }, []);
};

// ============================================
// 1. GESTION DES JOUEURS (ROSTER)
// ============================================

export const RosterManager = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    realName: '',
    role: 'Top',
    riotId: '',
    twitch: ''
  });

  useEffect(() => {
    // Charger les joueurs de l'équipe
    const stored = localStorage.getItem(`team_${teamId}_players`);
    if (stored) setPlayers(JSON.parse(stored));
  }, [teamId]);

  const addPlayer = () => {
    const updatedPlayers = [...players, { ...newPlayer, id: Date.now(), kda: 0, winrate: 0 }];
    setPlayers(updatedPlayers);
    localStorage.setItem(`team_${teamId}_players`, JSON.stringify(updatedPlayers));
    setShowAddForm(false);
    setNewPlayer({ name: '', realName: '', role: 'Top', riotId: '', twitch: '' });
  };

  const removePlayer = (playerId) => {
    const updatedPlayers = players.filter(p => p.id !== playerId);
    setPlayers(updatedPlayers);
    localStorage.setItem(`team_${teamId}_players`, JSON.stringify(updatedPlayers));
  };

  const updatePlayer = (playerId, field, value) => {
    const updatedPlayers = players.map(p => 
      p.id === playerId ? { ...p, [field]: value } : p
    );
    setPlayers(updatedPlayers);
    localStorage.setItem(`team_${teamId}_players`, JSON.stringify(updatedPlayers));
  };

  return (
    <div className="roster-manager space-y-4">
      {/* Bouton Ajouter Joueur */}
      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full px-4 py-3 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-all"
      >
        <UserPlus className="w-4 h-4" />
        Ajouter un joueur
      </button>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="add-player-form bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Nouveau joueur</h3>
            <button onClick={() => setShowAddForm(false)}>
              <X className="w-5 h-5 text-white/50 hover:text-white" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Pseudo"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-green-500/50 outline-none"
            />
            <input
              type="text"
              placeholder="Nom réel"
              value={newPlayer.realName}
              onChange={(e) => setNewPlayer({...newPlayer, realName: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-green-500/50 outline-none"
            />
            <select
              value={newPlayer.role}
              onChange={(e) => setNewPlayer({...newPlayer, role: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-green-500/50 outline-none"
            >
              <option value="Top">Top</option>
              <option value="Jungle">Jungle</option>
              <option value="Mid">Mid</option>
              <option value="ADC">ADC</option>
              <option value="Support">Support</option>
            </select>
            <input
              type="text"
              placeholder="Riot ID"
              value={newPlayer.riotId}
              onChange={(e) => setNewPlayer({...newPlayer, riotId: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-green-500/50 outline-none"
            />
            <input
              type="text"
              placeholder="Twitch (optionnel)"
              value={newPlayer.twitch}
              onChange={(e) => setNewPlayer({...newPlayer, twitch: e.target.value})}
              className="col-span-2 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-green-500/50 outline-none"
            />
          </div>

          <button
            onClick={addPlayer}
            className="w-full px-4 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Enregistrer
          </button>
        </div>
      )}

      {/* Liste des joueurs */}
      <div className="players-list space-y-3">
        {players.map((player) => (
          <div key={player.id} className="player-item bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="role-badge w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{player.role.slice(0, 3)}</span>
                </div>
                <div>
                  <div className="text-white font-bold">{player.name}</div>
                  <div className="text-white/50 text-sm">{player.realName}</div>
                  <div className="text-white/40 text-xs mt-1">{player.riotId}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <input
                    type="number"
                    step="0.1"
                    value={player.kda}
                    onChange={(e) => updatePlayer(player.id, 'kda', parseFloat(e.target.value))}
                    className="w-20 px-2 py-1 bg-black/40 border border-white/10 rounded text-white text-sm text-right"
                    placeholder="KDA"
                  />
                  <input
                    type="number"
                    value={player.winrate}
                    onChange={(e) => updatePlayer(player.id, 'winrate', parseInt(e.target.value))}
                    className="w-20 px-2 py-1 bg-black/40 border border-white/10 rounded text-white text-sm text-right mt-1"
                    placeholder="WR %"
                  />
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="p-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 2. GESTION DES COMPÉTITIONS
// ============================================

export const CompetitionManager = ({ teamId }) => {
  const [competitions, setCompetitions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComp, setNewComp] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'upcoming'
  });

  useEffect(() => {
    const stored = localStorage.getItem(`team_${teamId}_competitions`);
    if (stored) setCompetitions(JSON.parse(stored));
  }, [teamId]);

  const addCompetition = () => {
    const updated = [...competitions, { ...newComp, id: Date.now() }];
    setCompetitions(updated);
    localStorage.setItem(`team_${teamId}_competitions`, JSON.stringify(updated));
    setShowAddForm(false);
    setNewComp({ name: '', startDate: '', endDate: '', status: 'upcoming' });
  };

  const removeCompetition = (compId) => {
    const updated = competitions.filter(c => c.id !== compId);
    setCompetitions(updated);
    localStorage.setItem(`team_${teamId}_competitions`, JSON.stringify(updated));
  };

  const updateStatus = (compId, status) => {
    const updated = competitions.map(c => 
      c.id === compId ? { ...c, status } : c
    );
    setCompetitions(updated);
    localStorage.setItem(`team_${teamId}_competitions`, JSON.stringify(updated));
  };

  return (
    <div className="competition-manager space-y-4">
      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full px-4 py-3 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 font-semibold flex items-center justify-center gap-2 hover:bg-purple-500/30 transition-all"
      >
        <Award className="w-4 h-4" />
        Inscrire à une compétition
      </button>

      {showAddForm && (
        <div className="add-comp-form bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Nouvelle compétition</h3>
          <input
            type="text"
            placeholder="Nom de la compétition"
            value={newComp.name}
            onChange={(e) => setNewComp({...newComp, name: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={newComp.startDate}
              onChange={(e) => setNewComp({...newComp, startDate: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
            />
            <input
              type="date"
              value={newComp.endDate}
              onChange={(e) => setNewComp({...newComp, endDate: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
            />
          </div>
          <button
            onClick={addCompetition}
            className="w-full px-4 py-3 rounded-lg bg-purple-500 text-white font-bold hover:bg-purple-600 transition-all"
          >
            Enregistrer
          </button>
        </div>
      )}

      <div className="competitions-list space-y-3">
        {competitions.map((comp) => (
          <div key={comp.id} className="comp-item bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold">{comp.name}</div>
                <div className="text-white/50 text-sm">
                  {comp.startDate} → {comp.endDate}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={comp.status}
                  onChange={(e) => updateStatus(comp.id, e.target.value)}
                  className="px-3 py-1 bg-black/40 border border-white/10 rounded text-white text-sm"
                >
                  <option value="upcoming">À venir</option>
                  <option value="active">En cours</option>
                  <option value="completed">Terminée</option>
                </select>
                <button
                  onClick={() => removeCompetition(comp.id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 3. GESTION DES ACTUALITÉS
// ============================================

export const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    title: '',
    category: 'VICTOIRE',
    excerpt: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const stored = localStorage.getItem('travl_news');
    if (stored) setNews(JSON.parse(stored));
  }, []);

  const saveNews = () => {
    const updated = [...news, { ...currentNews, id: Date.now() }];
    setNews(updated);
    localStorage.setItem('travl_news', JSON.stringify(updated));
    setShowEditor(false);
    setCurrentNews({ title: '', category: 'VICTOIRE', excerpt: '', image: '', date: new Date().toISOString().split('T')[0] });
  };

  const deleteNews = (newsId) => {
    const updated = news.filter(n => n.id !== newsId);
    setNews(updated);
    localStorage.setItem('travl_news', JSON.stringify(updated));
  };

  return (
    <div className="news-manager space-y-4">
      <button 
        onClick={() => setShowEditor(!showEditor)}
        className="w-full px-4 py-3 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-400 font-semibold flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-all"
      >
        <FileText className="w-4 h-4" />
        Nouvelle actualité
      </button>

      {showEditor && (
        <div className="news-editor bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Rédiger une actualité</h3>
          
          <select
            value={currentNews.category}
            onChange={(e) => setCurrentNews({...currentNews, category: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
          >
            <option value="VICTOIRE">VICTOIRE</option>
            <option value="ROSTER">ROSTER</option>
            <option value="ÉVÉNEMENT">ÉVÉNEMENT</option>
            <option value="ANNONCE">ANNONCE</option>
          </select>

          <input
            type="text"
            placeholder="Titre de l'actualité"
            value={currentNews.title}
            onChange={(e) => setCurrentNews({...currentNews, title: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
          />

          <textarea
            placeholder="Résumé..."
            value={currentNews.excerpt}
            onChange={(e) => setCurrentNews({...currentNews, excerpt: e.target.value})}
            rows="4"
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none resize-none"
          />

          <input
            type="url"
            placeholder="URL de l'image"
            value={currentNews.image}
            onChange={(e) => setCurrentNews({...currentNews, image: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
          />

          <button
            onClick={saveNews}
            className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all"
          >
            Publier
          </button>
        </div>
      )}

      <div className="news-list space-y-3">
        {news.map((article) => (
          <div key={article.id} className="news-item bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/20 text-red-400">
                  {article.category}
                </span>
                <h4 className="text-white font-bold mt-2">{article.title}</h4>
                <p className="text-white/60 text-sm mt-1">{article.excerpt}</p>
                <span className="text-white/40 text-xs mt-2 block">{article.date}</span>
              </div>
              <button
                onClick={() => deleteNews(article.id)}
                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 4. GESTION BUDGET & FINANCES
// ============================================

export const BudgetManager = ({ teamId }) => {
  const [transactions, setTransactions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: 'Bootcamp',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const stored = localStorage.getItem(`team_${teamId}_budget`);
    if (stored) setTransactions(JSON.parse(stored));
  }, [teamId]);

  const addTransaction = () => {
    const updated = [...transactions, { ...newTransaction, id: Date.now() }];
    setTransactions(updated);
    localStorage.setItem(`team_${teamId}_budget`, JSON.stringify(updated));
    setShowAddForm(false);
    setNewTransaction({ type: 'expense', category: 'Bootcamp', amount: 0, description: '', date: new Date().toISOString().split('T')[0] });
  };

  const deleteTransaction = (transId) => {
    const updated = transactions.filter(t => t.id !== transId);
    setTransactions(updated);
    localStorage.setItem(`team_${teamId}_budget`, JSON.stringify(updated));
  };

  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="budget-manager space-y-4">
      {/* Stats Budget */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
          <div className="text-green-400 font-bold text-2xl">+{totalIncome}€</div>
          <div className="text-white/60 text-sm">Gains</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
          <div className="text-red-400 font-bold text-2xl">-{totalExpenses}€</div>
          <div className="text-white/60 text-sm">Dépenses</div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4">
          <div className="text-blue-400 font-bold text-2xl">{balance}€</div>
          <div className="text-white/60 text-sm">Solde</div>
        </div>
      </div>

      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full px-4 py-3 rounded-xl bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 font-semibold flex items-center justify-center gap-2 hover:bg-yellow-500/30 transition-all"
      >
        <DollarSign className="w-4 h-4" />
        Nouvelle transaction
      </button>

      {showAddForm && (
        <div className="add-transaction-form bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Nouvelle transaction</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
            >
              <option value="expense">Dépense</option>
              <option value="income">Revenu</option>
            </select>

            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
            >
              <option value="Bootcamp">Bootcamp</option>
              <option value="Déplacement">Déplacement</option>
              <option value="LAN">LAN</option>
              <option value="Équipement">Équipement</option>
              <option value="Prize Pool">Prize Pool</option>
              <option value="Sponsoring">Sponsoring</option>
              <option value="Autre">Autre</option>
            </select>

            <input
              type="number"
              placeholder="Montant (€)"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
            />

            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
            />
          </div>

          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
          />

          <button
            onClick={addTransaction}
            className="w-full px-4 py-3 rounded-lg bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition-all"
          >
            Enregistrer
          </button>
        </div>
      )}

      <div className="transactions-list space-y-3">
        {transactions.map((trans) => (
          <div key={trans.id} className={`transaction-item bg-black/40 backdrop-blur-xl border rounded-xl p-4 ${
            trans.type === 'income' ? 'border-green-500/30' : 'border-red-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg ${
                    trans.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trans.type === 'income' ? '+' : '-'}{trans.amount}€
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-white/60">
                    {trans.category}
                  </span>
                </div>
                <div className="text-white/60 text-sm mt-1">{trans.description}</div>
                <div className="text-white/40 text-xs mt-1">{trans.date}</div>
              </div>
              <button
                onClick={() => deleteTransaction(trans.id)}
                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 5. GESTION LAN & ÉVÉNEMENTS
// ============================================

export const EventManager = ({ teamId }) => {
  const [events, setEvents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    date: '',
    budget: 0,
    type: 'LAN'
  });

  useEffect(() => {
    const stored = localStorage.getItem(`team_${teamId}_events`);
    if (stored) setEvents(JSON.parse(stored));
  }, [teamId]);

  const addEvent = () => {
    const updated = [...events, { ...newEvent, id: Date.now() }];
    setEvents(updated);
    localStorage.setItem(`team_${teamId}_events`, JSON.stringify(updated));
    setShowAddForm(false);
    setNewEvent({ title: '', location: '', date: '', budget: 0, type: 'LAN' });
  };

  const deleteEvent = (eventId) => {
    const updated = events.filter(e => e.id !== eventId);
    setEvents(updated);
    localStorage.setItem(`team_${teamId}_events`, JSON.stringify(updated));
  };

  return (
    <div className="event-manager space-y-4">
      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full px-4 py-3 rounded-xl bg-orange-500/20 border border-orange-500/50 text-orange-400 font-semibold flex items-center justify-center gap-2 hover:bg-orange-500/30 transition-all"
      >
        <MapPin className="w-4 h-4" />
        Nouvel événement
      </button>

      {showAddForm && (
        <div className="add-event-form bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Nouvel événement</h3>
          
          <select
            value={newEvent.type}
            onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
          >
            <option value="LAN">LAN</option>
            <option value="Bootcamp">Bootcamp</option>
            <option value="Meet & Greet">Meet & Greet</option>
            <option value="Autre">Autre</option>
          </select>

          <input
            type="text"
            placeholder="Titre de l'événement"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Lieu"
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white outline-none"
            />
          </div>

          <input
            type="number"
            placeholder="Budget prévu (€)"
            value={newEvent.budget}
            onChange={(e) => setNewEvent({...newEvent, budget: e.target.value})}
            className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-white/40 outline-none"
          />

          <button
            onClick={addEvent}
            className="w-full px-4 py-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all"
          >
            Créer l'événement
          </button>
        </div>
      )}

      <div className="events-list space-y-3">
        {events.map((event) => (
          <div key={event.id} className="event-item bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 rounded text-xs font-bold bg-orange-500/20 text-orange-400">
                  {event.type}
                </span>
                <h4 className="text-white font-bold mt-2">{event.title}</h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                  <span><MapPin className="w-3 h-3 inline mr-1" />{event.location}</span>
                  <span><Calendar className="w-3 h-3 inline mr-1" />{event.date}</span>
                  <span><DollarSign className="w-3 h-3 inline mr-1" />{event.budget}€</span>
                </div>
              </div>
              <button
                onClick={() => deleteEvent(event.id)}
                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  useDashboardLock,
  RosterManager,
  CompetitionManager,
  NewsManager,
  BudgetManager,
  EventManager
};
