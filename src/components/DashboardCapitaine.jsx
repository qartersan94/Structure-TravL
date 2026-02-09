# 🔄 MIGRATION VERS NOUVEAUX DASHBOARDS

## ❌ ANCIEN SYSTÈME (À SUPPRIMER)

```
src/components/
└── Dashboard-ULTIMATE.jsx    ← SUPPRIMER ce fichier
```

**Problème :**
- Un seul fichier pour tous les rôles
- Pas de routing propre
- Pas de fonctionnalités avancées
- Code monolithique difficile à maintenir

---

## ✅ NOUVEAU SYSTÈME (À INSTALLER)

```
src/components/
├── Dashboard.jsx              ← NOUVEAU (routing principal)
├── DashboardPresident.jsx     ← NOUVEAU (président uniquement)
├── DashboardCapitaine.jsx     ← NOUVEAU (capitaine uniquement)
├── DashboardJoueur.jsx        ← NOUVEAU (joueur uniquement)
├── planning/
│   └── PlanningMensuel.jsx    ← NOUVEAU
└── TLineup.jsx                ← NOUVEAU
```

**Avantages :**
- ✅ Code séparé par rôle (maintenabilité)
- ✅ Routing avec tabs (Overview, Planning, TLineup)
- ✅ Fonctionnalités avancées par rôle
- ✅ Planning interactif
- ✅ TLineup intégré
- ✅ Création sessions (capitaine)
- ✅ Objectifs personnels (joueur)

---

## 🚀 MIGRATION EN 5 ÉTAPES

### ÉTAPE 1 : Supprimer ancien fichier

```bash
# Supprimer Dashboard-ULTIMATE.jsx
rm src/components/Dashboard-ULTIMATE.jsx

# OU renommer en backup
mv src/components/Dashboard-ULTIMATE.jsx src/components/Dashboard-ULTIMATE.jsx.old
```

### ÉTAPE 2 : Créer dossier planning

```bash
mkdir -p src/components/planning
```

### ÉTAPE 3 : Copier TOUS les nouveaux fichiers

```bash
# Dashboard principal
cp Dashboard.jsx src/components/

# Dashboards par rôle
cp DashboardPresident.jsx src/components/
cp DashboardCapitaine.jsx src/components/
cp DashboardJoueur.jsx src/components/

# Modules
cp PlanningMensuel.jsx src/components/planning/
cp TLineup.jsx src/components/
```

### ÉTAPE 4 : Vérifier App.jsx

Dans `src/App.jsx`, l'import doit être :

```javascript
// ✅ BON
import Dashboard from './components/Dashboard';

// ❌ ANCIEN (à supprimer)
import Dashboard from './components/Dashboard-ULTIMATE';
```

Si tu as l'ancien import, **remplace-le** par le nouveau !

### ÉTAPE 5 : Mettre à jour LoginForm

Dans `src/components/LoginForm.jsx`, **ajouter `teams`** aux users :

```javascript
const testUsers = {
  qartersan: { 
    username: 'qartersan', 
    password: 'travl2026!', 
    role: 'PRESIDENT', 
    name: 'Qartersan',
    id: 'user_001',
    teams: ['*']  // ← AJOUTER
  },
  captain_flux: { 
    username: 'captain_flux', 
    password: 'flux2026!', 
    role: 'CAPITAINE', 
    name: 'Captain FLUX',
    id: 'user_002',
    teams: ['flux']  // ← AJOUTER
  },
  joueur: { 
    username: 'joueur', 
    password: 'joueur2026!', 
    role: 'JOUEUR', 
    name: 'Joueur Test',
    id: 'flux_01',
    teams: ['flux']  // ← AJOUTER
  }
};
```

---

## 📊 COMPARAISON FONCTIONNALITÉS

| Fonctionnalité | Dashboard-ULTIMATE | Nouveaux Dashboards |
|----------------|-------------------|---------------------|
| Président | ⚠️ Simple | ✅ Complet (filtres, tableau) |
| Capitaine | ⚠️ Simple | ✅ Création sessions |
| Joueur | ⚠️ Simple | ✅ Objectifs + Stats |
| Planning | ❌ Non | ✅ Calendrier interactif |
| TLineup | ❌ Non | ✅ Composition équipe |
| Routing | ❌ Non | ✅ 3 Tabs par rôle |
| Maintenance | ⚠️ Difficile | ✅ Facile (séparé) |

---

## 🔍 VÉRIFICATION APRÈS MIGRATION

### Test 1 : Connexion Président
```
1. Login : qartersan / travl2026!
2. Click "Dashboard"
3. Vérifier : Stats globales + Tableau équipes
4. Vérifier : Tabs "Vue d'ensemble", "Planning", "TLineup"
```

### Test 2 : Connexion Capitaine
```
1. Login : captain_flux / flux2026!
2. Click "Dashboard"
3. Vérifier : Roster équipe FLUX
4. Vérifier : Bouton "Nouvelle Session"
5. Vérifier : Tabs "Mon Équipe", "Planning", "TLineup"
```

### Test 3 : Connexion Joueur
```
1. Login : joueur / joueur2026!
2. Click "Dashboard"
3. Vérifier : Stats personnelles + Objectifs
4. Vérifier : Tabs "Mes Stats", "Mes Disponibilités", "TLineup"
```

### Test 4 : Planning
```
1. N'importe quel rôle
2. Tab "Planning"
3. Click sur un jour
4. Vérifier : Vert (présent) / Rouge (absent)
```

### Test 5 : TLineup
```
1. N'importe quel rôle
2. Tab "TLineup"
3. Click "Choisir" pour Top
4. Vérifier : Liste champions s'affiche
```

---

## ⚠️ ERREURS POSSIBLES

### Erreur : "Cannot find module Dashboard"
**Solution :** Vérifier dans `App.jsx` :
```javascript
import Dashboard from './components/Dashboard';
```

### Erreur : "user.teams is undefined"
**Solution :** Ajouter `teams: ['flux']` dans LoginForm

### Erreur : "Cannot find module DashboardPresident"
**Solution :** Vérifier chemins dans `Dashboard.jsx` :
```javascript
import DashboardPresident from './DashboardPresident';
```

### Dashboard vide
**Solution :** Vérifier que `teamsData.js` a la propriété `roster` pour chaque équipe

---

## 🗑️ FICHIERS À SUPPRIMER

Après migration réussie, supprimer :
```bash
rm src/components/Dashboard-ULTIMATE.jsx.old
```

---

## 📦 COMMANDES COMPLÈTES

```bash
# 1. Backup ancien
mv src/components/Dashboard-ULTIMATE.jsx src/components/Dashboard-ULTIMATE.jsx.old

# 2. Créer dossier
mkdir -p src/components/planning

# 3. Copier nouveaux fichiers
cp Dashboard.jsx src/components/
cp DashboardPresident.jsx src/components/
cp DashboardCapitaine.jsx src/components/
cp DashboardJoueur.jsx src/components/
cp PlanningMensuel.jsx src/components/planning/
cp TLineup.jsx src/components/

# 4. Vérifier structure
ls -la src/components/
ls -la src/components/planning/

# 5. Test local
npm start

# 6. Si OK, commit
git add src/components/
git commit -m "Refactor: Migration vers nouveaux dashboards par rôle"
git push origin main

# 7. Supprimer backup
rm src/components/Dashboard-ULTIMATE.jsx.old
```

---

## ✅ CHECKLIST MIGRATION

- [ ] Dashboard-ULTIMATE.jsx supprimé/renommé
- [ ] Dossier `planning/` créé
- [ ] 6 nouveaux fichiers copiés
- [ ] App.jsx import corrigé
- [ ] LoginForm avec `teams`
- [ ] teamsData.js avec `roster`
- [ ] Test Président OK
- [ ] Test Capitaine OK
- [ ] Test Joueur OK
- [ ] Planning fonctionne
- [ ] TLineup fonctionne
- [ ] Commit + Push
- [ ] Backup supprimé

---

## 🎯 RÉSUMÉ

**ANCIEN :**
```
Dashboard-ULTIMATE.jsx (1 fichier monolithique)
```

**NOUVEAU :**
```
Dashboard.jsx (routing)
├── DashboardPresident.jsx (stats globales)
├── DashboardCapitaine.jsx (gestion équipe)
├── DashboardJoueur.jsx (stats perso)
├── PlanningMensuel.jsx (calendrier)
└── TLineup.jsx (compositions)
```

---

**MIGRATION = SUPPRIMER L'ANCIEN + INSTALLER LE NOUVEAU ! 🚀**
