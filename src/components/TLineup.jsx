<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TLineup - Créateur de Compositions</title>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Rajdhani', sans-serif;
            background: #080808;
            color: #fff;
            min-height: 100vh;
        }
        
        .tlineup-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .header h1 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2.5rem;
            letter-spacing: 3px;
        }
        
        .header h1 span {
            color: #DC143C;
        }
        
        .save-bar {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 1rem;
            backdrop-filter: blur(12px);
        }
        
        .save-bar input {
            flex: 1;
            max-width: 300px;
            padding: 0.75rem 1rem;
            background: #000;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 0.5rem;
            color: #fff;
            font-family: 'Rajdhani', sans-serif;
        }
        
        .save-bar input:focus {
            outline: none;
            border-color: #DC143C;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            background: rgba(220,20,60,0.15);
            border: 1px solid rgba(220,20,60,0.4);
            border-radius: 0.5rem;
            color: #DC143C;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background: rgba(220,20,60,0.25);
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: rgba(255,255,255,0.04);
            border-color: rgba(255,255,255,0.1);
            color: #888;
        }
        
        .lineups-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .team-panel {
            background: rgba(0,0,0,0.4);
            border: 1.5px solid;
            border-radius: 1.5rem;
            padding: 2rem;
            backdrop-filter: blur(12px);
        }
        
        .team-panel.blue {
            border-color: rgba(52,152,219,0.3);
            background: rgba(52,152,219,0.05);
        }
        
        .team-panel.red {
            border-color: rgba(231,76,60,0.3);
            background: rgba(231,76,60,0.05);
        }
        
        .team-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .team-header h2 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.75rem;
            letter-spacing: 2px;
        }
        
        .team-panel.blue h2 {
            color: #3498db;
        }
        
        .team-panel.red h2 {
            color: #e74c3c;
        }
        
        .role-slot {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 0.75rem;
            margin-bottom: 0.75rem;
            transition: all 0.3s ease;
        }
        
        .role-slot:hover {
            background: rgba(255,255,255,0.05);
        }
        
        .role-icon {
            width: 48px;
            height: 48px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Bebas Neue', sans-serif;
            font-weight: 700;
            font-size: 0.875rem;
        }
        
        .champion-info {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .champion-avatar {
            width: 40px;
            height: 40px;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.125rem;
        }
        
        .champion-name {
            font-weight: 700;
        }
        
        .champion-class {
            font-size: 0.75rem;
            padding: 0.25rem 0.75rem;
            border-radius: 50px;
        }
        
        .btn-pick {
            padding: 0.5rem 1rem;
            background: none;
            border: none;
            color: #888;
            font-family: 'Rajdhani', sans-serif;
            cursor: pointer;
        }
        
        .btn-pick:hover {
            color: #fff;
        }
        
        .btn-remove {
            padding: 0.5rem;
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
        }
        
        .btn-remove:hover {
            background: rgba(231,76,60,0.2);
            color: #e74c3c;
        }
        
        /* Modal */
        .modal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal.active {
            display: flex;
        }
        
        .modal-content {
            background: #0a0a0a;
            border: 1px solid rgba(220,20,60,0.3);
            border-radius: 1.5rem;
            max-width: 700px;
            width: 100%;
            max-height: 80vh;
            overflow: hidden;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.95) translateY(20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        .modal-header {
            padding: 1.5rem;
            background: rgba(220,20,60,0.1);
            border-bottom: 1px solid rgba(220,20,60,0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-body {
            padding: 1.5rem;
            max-height: 500px;
            overflow-y: auto;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem 1rem;
            background: #000;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 0.75rem;
            color: #fff;
            font-family: 'Rajdhani', sans-serif;
            margin-bottom: 1rem;
        }
        
        .search-input:focus {
            outline: none;
            border-color: #DC143C;
        }
        
        .champions-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }
        
        .champion-card {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 0.75rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .champion-card:hover {
            background: rgba(255,255,255,0.05);
            transform: translateY(-2px);
        }
        
        /* Analysis */
        .analysis-section {
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 1.5rem;
            padding: 2rem;
            backdrop-filter: blur(12px);
        }
        
        .analysis-section h3 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .stat-item {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 0.75rem;
            padding: 1rem;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: #888;
            margin-bottom: 0.75rem;
        }
        
        .stat-bar {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .stat-value {
            font-weight: 700;
            font-size: 0.875rem;
            min-width: 45px;
            text-align: right;
        }
        
        .bar-container {
            flex: 1;
            height: 8px;
            background: rgba(255,255,255,0.05);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .bar-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
    </style>
</head>
<body>
    <div class="tlineup-container">
        <!-- Header -->
        <div class="header">
            <div>
                <h1><span>TL</span>INEUP</h1>
                <p style="color: #888; font-size: 0.875rem;">Créez vos compositions 5v5</p>
            </div>
            <button class="btn btn-secondary" onclick="resetAll()">
                🔄 Reset
            </button>
        </div>

        <!-- Save Bar -->
        <div class="save-bar">
            <input type="text" id="lineupName" placeholder="Nom du lineup...">
            <button class="btn" onclick="saveLineup()">
                💾 Sauvegarder
            </button>
        </div>

        <!-- Lineups Grid -->
        <div class="lineups-grid">
            <!-- Blue Side -->
            <div class="team-panel blue">
                <div class="team-header">
                    <span style="font-size: 1.5rem;">👥</span>
                    <h2>BLUE SIDE</h2>
                </div>
                <div id="blueTeam"></div>
            </div>

            <!-- Red Side -->
            <div class="team-panel red">
                <div class="team-header">
                    <span style="font-size: 1.5rem;">👥</span>
                    <h2>RED SIDE</h2>
                </div>
                <div id="redTeam"></div>
            </div>
        </div>

        <!-- Analysis -->
        <div class="analysis-section" id="analysisSection" style="display: none;">
            <h3>📈 ANALYSE MATCHUP</h3>
            <div class="stats-grid" id="statsGrid"></div>
        </div>
    </div>

    <!-- Champion Picker Modal -->
    <div class="modal" id="championModal">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.25rem;">
                        SÉLECTIONNER <span id="modalRoleLabel"></span>
                    </h3>
                </div>
                <button class="btn-remove" onclick="closeModal()">✕</button>
            </div>
            <div class="modal-body">
                <input type="text" class="search-input" id="searchInput" placeholder="Chercher un champion...">
                <div class="champions-grid" id="championsGrid"></div>
            </div>
        </div>
    </div>

    <script>
        // Champions data (simplified - 35 champions)
        const CHAMPIONS = [
            {id:'aatrox',name:'Aatrox',role:'top',class:'Juggernaut',color:'#c0392b'},
            {id:'ahri',name:'Ahri',role:'mid',class:'Mage',color:'#e91e8c'},
            {id:'ashe',name:'Ashe',role:'adc',class:'Marksman',color:'#3498db'},
            {id:'braum',name:'Braum',role:'support',class:'Tank',color:'#3498db'},
            {id:'caitlyn',name:'Caitlyn',role:'adc',class:'Marksman',color:'#2980b9'},
            {id:'darius',name:'Darius',role:'top',class:'Juggernaut',color:'#c0392b'},
            {id:'diana',name:'Diana',role:'jungle',class:'Assassin',color:'#1a5276'},
            {id:'ekko',name:'Ekko',role:'jungle',class:'Assassin',color:'#1abc9c'},
            {id:'ezreal',name:'Ezreal',role:'adc',class:'Marksman',color:'#f39c12'},
            {id:'fiora',name:'Fiora',role:'top',class:'Assassin',color:'#27ae60'},
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

        let blueTeam = {top:null,jungle:null,mid:null,adc:null,support:null};
        let redTeam = {top:null,jungle:null,mid:null,adc:null,support:null};
        let currentPick = null;

        // Initialize
        renderTeams();

        function renderTeams() {
            renderTeam('blue', blueTeam, document.getElementById('blueTeam'));
            renderTeam('red', redTeam, document.getElementById('redTeam'));
            updateAnalysis();
        }

        function renderTeam(side, team, container) {
            container.innerHTML = ROLES.map(role => {
                const champ = team[role];
                return `
                    <div class="role-slot">
                        <div class="role-icon" style="background: ${ROLE_COLORS[role]}22; border: 1.5px solid ${ROLE_COLORS[role]}55; color: ${ROLE_COLORS[role]}">
                            ${ROLE_LABELS[role].substring(0,3)}
                        </div>
                        ${champ ? `
                            <div class="champion-info">
                                <div class="champion-avatar" style="background: ${champ.color}33; border: 1.5px solid ${champ.color}88">
                                    ${champ.name[0]}
                                </div>
                                <div style="flex: 1;">
                                    <div class="champion-name">${champ.name}</div>
                                    <span class="champion-class" style="background: ${champ.color}20; color: ${champ.color}; border: 1px solid ${champ.color}44">
                                        ${champ.class}
                                    </span>
                                </div>
                            </div>
                            <button class="btn-remove" onclick="clearSlot('${side}', '${role}')">✕</button>
                        ` : `
                            <button class="btn-pick" onclick="pickChampion('${side}', '${role}')">
                                + Choisir ${ROLE_LABELS[role]}
                            </button>
                        `}
                    </div>
                `;
            }).join('');
        }

        function pickChampion(side, role) {
            currentPick = {side, role};
            document.getElementById('modalRoleLabel').textContent = ROLE_LABELS[role].toUpperCase();
            showChampions(role);
            document.getElementById('championModal').classList.add('active');
        }

        function showChampions(role) {
            const filtered = CHAMPIONS.filter(c => c.role === role);
            const grid = document.getElementById('championsGrid');
            grid.innerHTML = filtered.map(champ => `
                <div class="champion-card" onclick="selectChampion('${champ.id}')">
                    <div class="champion-avatar" style="background: ${champ.color}33; border: 1.5px solid ${champ.color}88">
                        ${champ.name[0]}
                    </div>
                    <div>
                        <div style="font-weight: 700;">${champ.name}</div>
                        <div style="font-size: 0.75rem; color: #888;">${champ.class}</div>
                    </div>
                </div>
            `).join('');
        }

        function selectChampion(champId) {
            const champ = CHAMPIONS.find(c => c.id === champId);
            if (currentPick.side === 'blue') {
                blueTeam[currentPick.role] = champ;
            } else {
                redTeam[currentPick.role] = champ;
            }
            closeModal();
            renderTeams();
        }

        function clearSlot(side, role) {
            if (side === 'blue') blueTeam[role] = null;
            else redTeam[role] = null;
            renderTeams();
        }

        function closeModal() {
            document.getElementById('championModal').classList.remove('active');
        }

        function resetAll() {
            blueTeam = {top:null,jungle:null,mid:null,adc:null,support:null};
            redTeam = {top:null,jungle:null,mid:null,adc:null,support:null};
            renderTeams();
        }

        function saveLineup() {
            const name = document.getElementById('lineupName').value;
            if (!name) return alert('Entrez un nom pour le lineup');
            const lineup = {name, blue: blueTeam, red: redTeam};
            console.log('Saved:', lineup);
            alert(`Lineup "${name}" sauvegardé !`);
        }

        function updateAnalysis() {
            const blueCount = Object.values(blueTeam).filter(Boolean).length;
            const redCount = Object.values(redTeam).filter(Boolean).length;
            
            if (blueCount >= 3 && redCount >= 3) {
                document.getElementById('analysisSection').style.display = 'block';
                const stats = [
                    {label:'Engage',blue:65,red:35},
                    {label:'Tankiness',blue:45,red:55},
                    {label:'Burst Damage',blue:70,red:30},
                    {label:'Team Fight',blue:55,red:45},
                    {label:'Mobilité',blue:50,red:50},
                    {label:'Sustain',blue:40,red:60}
                ];
                
                document.getElementById('statsGrid').innerHTML = stats.map(stat => {
                    const winner = stat.blue > stat.red ? 'blue' : stat.blue < stat.red ? 'red' : 'tie';
                    const barColor = winner === 'blue' ? '#3498db' : winner === 'red' ? '#e74c3c' : '#888';
                    return `
                        <div class="stat-item">
                            <div class="stat-label">${stat.label}</div>
                            <div class="stat-bar">
                                <span class="stat-value" style="color: ${winner === 'blue' ? '#3498db' : '#666'}">${stat.blue}%</span>
                                <div class="bar-container">
                                    <div class="bar-fill" style="width: ${stat.blue}%; background: ${barColor}"></div>
                                </div>
                                <span class="stat-value" style="color: ${winner === 'red' ? '#e74c3c' : '#666'}">${stat.red}%</span>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                document.getElementById('analysisSection').style.display = 'none';
            }
        }

        // Search
        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            const search = e.target.value.toLowerCase();
            const role = currentPick?.role;
            if (!role) return;
            
            const filtered = CHAMPIONS.filter(c => 
                c.role === role && c.name.toLowerCase().includes(search)
            );
            
            const grid = document.getElementById('championsGrid');
            grid.innerHTML = filtered.map(champ => `
                <div class="champion-card" onclick="selectChampion('${champ.id}')">
                    <div class="champion-avatar" style="background: ${champ.color}33; border: 1.5px solid ${champ.color}88">
                        ${champ.name[0]}
                    </div>
                    <div>
                        <div style="font-weight: 700;">${champ.name}</div>
                        <div style="font-size: 0.75rem; color: #888;">${champ.class}</div>
                    </div>
                </div>
            `).join('');
        });
    </script>
</body>
</html>
