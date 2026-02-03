<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Structure TravL</title>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
        .dashboard-container {
            display: flex;
            min-height: 100vh;
            background: #080808;
        }
        
        /* Sidebar */
        .sidebar {
            width: 280px;
            background: rgba(0,0,0,0.6);
            border-right: 1px solid rgba(220,20,60,0.2);
            backdrop-filter: blur(12px);
            padding: 2rem 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .sidebar-header {
            padding: 0 1.5rem 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .sidebar-logo {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2rem;
            color: #DC143C;
            margin-bottom: 0.5rem;
        }
        
        .sidebar-nav {
            padding: 2rem 0;
        }
        
        .nav-tab {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background: transparent;
            border: none;
            border-left: 3px solid transparent;
            color: #888;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            text-align: left;
        }
        
        .nav-tab:hover {
            background: rgba(220,20,60,0.08);
            color: #fff;
        }
        
        .nav-tab.active {
            background: rgba(220,20,60,0.15);
            border-left-color: #DC143C;
            color: #fff;
        }
        
        .sidebar-footer {
            padding: 2rem 1.5rem;
            border-top: 1px solid rgba(255,255,255,0.06);
            margin-top: auto;
        }
        
        /* Main content */
        .main-content {
            flex: 1;
            margin-left: 280px;
            padding: 2rem;
        }
        
        .top-bar {
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(12px);
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Session cards */
        .session-card {
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            backdrop-filter: blur(12px);
        }
        
        .session-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1rem;
        }
        
        .session-info h3 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.5rem;
            color: #fff;
            margin-bottom: 0.5rem;
        }
        
        .session-meta {
            display: flex;
            gap: 1rem;
            font-size: 0.875rem;
            color: #888;
        }
        
        /* Validation buttons for players */
        .validation-buttons {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .btn-validate {
            flex: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 0.5rem;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 700;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .btn-confirm {
            background: rgba(39,174,96,0.2);
            border: 1px solid rgba(39,174,96,0.4);
            color: #27ae60;
        }
        
        .btn-confirm:hover, .btn-confirm.active {
            background: rgba(39,174,96,0.3);
            transform: translateY(-2px);
        }
        
        .btn-absent {
            background: rgba(231,76,60,0.2);
            border: 1px solid rgba(231,76,60,0.4);
            color: #e74c3c;
        }
        
        .btn-absent:hover, .btn-absent.active {
            background: rgba(231,76,60,0.3);
            transform: translateY(-2px);
        }
        
        .btn-pending {
            background: rgba(241,196,15,0.2);
            border: 1px solid rgba(241,196,15,0.4);
            color: #f1c40f;
        }
        
        .btn-pending:hover, .btn-pending.active {
            background: rgba(241,196,15,0.3);
            transform: translateY(-2px);
        }
        
        /* Stats */
        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .stat-box {
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(220,20,60,0.2);
            border-radius: 1rem;
            padding: 1.5rem;
            backdrop-filter: blur(12px);
        }
        
        .stat-value {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2.5rem;
            color: #DC143C;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: #888;
        }
        
        /* Bouton retour */
        .btn-back {
            position: fixed;
            top: 2rem;
            left: 2rem;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: rgba(220,20,60,0.15);
            border: 1px solid rgba(220,20,60,0.4);
            border-radius: 0.75rem;
            color: #DC143C;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 700;
            cursor: pointer;
            backdrop-filter: blur(12px);
            transition: all 0.3s ease;
        }
        
        .btn-back:hover {
            transform: translateX(-5px);
            background: rgba(220,20,60,0.25);
        }
    </style>
</head>
<body>
    <!-- Bouton retour (toujours visible) -->
    <button class="btn-back" onclick="window.location.href='index.html'">
        ← <span>Retour au site</span>
    </button>

    <div class="dashboard-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo">DASHBOARD</div>
                <p style="color: #888; font-size: 0.875rem;" id="userRole">Joueur</p>
            </div>
            
            <nav class="sidebar-nav">
                <button class="nav-tab active" onclick="showTab('overview')">
                    📊 <span>Vue d'ensemble</span>
                </button>
                <button class="nav-tab" onclick="showTab('planning')">
                    📅 <span id="planningTabLabel">Mon Planning</span>
                </button>
                <button class="nav-tab" onclick="showTab('equipes')">
                    👥 <span>Équipes</span>
                </button>
                <button class="nav-tab" onclick="showTab('actualites')">
                    📰 <span>Actualités</span>
                </button>
                <button class="nav-tab" onclick="showTab('notes')">
                    📝 <span>Notes</span>
                </button>
                <button class="nav-tab" onclick="showTab('objectifs')">
                    🎯 <span>Objectifs</span>
                </button>
                <button class="nav-tab" onclick="showTab('tlineup')">
                    ⚔️ <span>TLineup</span>
                </button>
            </nav>
            
            <div class="sidebar-footer">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(220,20,60,0.2); display: flex; align-items: center; justify-center; font-size: 1.25rem;">
                        👤
                    </div>
                    <div>
                        <div style="font-weight: 700; color: #fff;" id="userName">Player</div>
                        <div style="font-size: 0.75rem; color: #888;" id="userTeam">Mount X</div>
                    </div>
                </div>
                <button onclick="window.location.href='index.html'" style="
                    width: 100%;
                    padding: 0.75rem;
                    background: rgba(220,20,60,0.15);
                    border: 1px solid rgba(220,20,60,0.4);
                    border-radius: 0.5rem;
                    color: #DC143C;
                    font-family: 'Rajdhani', sans-serif;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">
                    🚪 Déconnexion
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="top-bar">
                <div>
                    <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #fff;">
                        Bienvenue, <span id="topBarName">Player</span>
                    </h1>
                    <p style="color: #888; font-size: 0.875rem;">Gérez votre équipe et vos sessions</p>
                </div>
            </div>

            <!-- TAB: Overview -->
            <div id="tab-overview" class="tab-content active">
                <div class="stats-row">
                    <div class="stat-box">
                        <div class="stat-value">15/20</div>
                        <div class="stat-label">Sessions validées</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">75%</div>
                        <div class="stat-label">Taux de présence</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Matchs joués</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">65%</div>
                        <div class="stat-label">Winrate</div>
                    </div>
                </div>
                
                <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1.5rem;">
                    Prochaines Sessions
                </h2>
                <div id="upcomingSessions"></div>
            </div>

            <!-- TAB: Mon Planning (JOUEURS) -->
            <div id="tab-planning" class="tab-content">
                <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1.5rem;">
                    Mon Planning
                </h2>
                <p style="color: #888; margin-bottom: 2rem;">
                    Validez votre présence pour chaque session de votre équipe
                </p>
                <div id="planningContainer"></div>
            </div>

            <!-- TAB: Équipes -->
            <div id="tab-equipes" class="tab-content">
                <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1.5rem;">
                    Mon Équipe
                </h2>
                <div id="teamInfo"></div>
            </div>

            <!-- TAB: Actualités -->
            <div id="tab-actualites" class="tab-content">
                <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1.5rem;">
                    Actualités
                </h2>
                <p style="color: #888;">Dernières news de votre équipe et de la structure...</p>
            </div>

            <!-- TAB: Notes -->
            <div id="tab-notes" class="tab-content">
                <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1.5rem;">
                    Notes d'équipe
                </h2>
                <textarea style="
                    width: 100%;
                    min-height: 300px;
                    background: rgba(0,0,0,0.4);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    color: #fff;
                    font-family: 'Rajdhani', sans-serif;
                    resize: vertical;
                " placeholder="Prenez des notes pour votre équipe..."></textarea>
            </div>

            <!-- TAB: Objectifs -->
            <div id="tab-objectifs" class="tab-content">
                <h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1.5rem;">
                    Objectifs de l'équipe
                </h2>
                <p style="color: #888;">Définissez et suivez vos objectifs...</p>
            </div>

            <!-- TAB: TLineup -->
            <div id="tab-tlineup" class="tab-content">
                <iframe src="tlineup.html" style="
                    width: 100%;
                    height: 800px;
                    border: none;
                    border-radius: 1rem;
                    background: transparent;
                "></iframe>
            </div>
        </main>
    </div>

    <script src="teams-data.js"></script>
    <script>
        // Simulated user data
        const currentUser = {
            name: 'Player123',
            role: 'player',
            teamId: 1
        };

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('topBarName').textContent = currentUser.name;
            if (typeof TEAMS !== 'undefined') {
                document.getElementById('userTeam').textContent = TEAMS.find(t => t.id === currentUser.teamId)?.name || 'Équipe';
            }
            loadSessions();
        });

        // Tab navigation
        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(`tab-${tabId}`).classList.add('active');
            document.querySelectorAll('.nav-tab').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.closest('.nav-tab').classList.add('active');
        }

        // Load sessions
        function loadSessions() {
            if (typeof SESSIONS === 'undefined') {
                console.log('SESSIONS not loaded');
                return;
            }
            
            const userSessions = SESSIONS.filter(s => s.teamId === currentUser.teamId);
            
            // Planning container
            const planningContainer = document.getElementById('planningContainer');
            planningContainer.innerHTML = userSessions.map(session => `
                <div class="session-card">
                    <div class="session-header">
                        <div class="session-info">
                            <h3>${session.title}</h3>
                            <div class="session-meta">
                                <span>📅 ${session.day}</span>
                                <span>🕐 ${session.time}</span>
                                <span>${session.mandatory ? '🔴 Obligatoire' : '⚪ Optionnel'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="validation-buttons">
                        <button class="btn-validate btn-confirm" onclick="validatePresence(${session.id}, 'confirmed')">
                            ✓ Confirmé
                        </button>
                        <button class="btn-validate btn-absent" onclick="validatePresence(${session.id}, 'absent')">
                            ✗ Absent
                        </button>
                        <button class="btn-validate btn-pending active" onclick="validatePresence(${session.id}, 'pending')">
                            ⏳ En attente
                        </button>
                    </div>
                </div>
            `).join('');
            
            // Upcoming sessions (overview)
            const upcomingSessions = document.getElementById('upcomingSessions');
            upcomingSessions.innerHTML = userSessions.slice(0, 3).map(session => `
                <div class="session-card">
                    <div class="session-info">
                        <h3>${session.title}</h3>
                        <div class="session-meta">
                            <span>📅 ${session.day}</span>
                            <span>🕐 ${session.time}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Validate presence
        function validatePresence(sessionId, status) {
            const sessionCard = event.target.closest('.session-card');
            const buttons = sessionCard.querySelectorAll('.btn-validate');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.closest('.btn-validate').classList.add('active');
            console.log(`Session ${sessionId}: ${status}`);
        }
    </script>
</body>
</html>
