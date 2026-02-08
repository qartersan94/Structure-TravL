# 🎮 STRUCTURE TRAVL - PLATEFORME E-SPORTS

## 🚀 INSTALLATION RAPIDE

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/qartersan94/Structure-TravL.git
cd Structure-TravL
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Lancer en local
```bash
npm start
```

Le site s'ouvre sur `http://localhost:3000`

---

## 📂 STRUCTURE DU PROJET

```
Structure-TravL/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   └── Dashboard.jsx
│   ├── data/
│   │   └── teamsData.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 🔧 CONFIGURATION TAILWIND CSS

### tailwind.config.js
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif']
      }
    },
  },
  plugins: [],
}
```

### postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
```

---

## 🔑 COMPTES DE TEST

| Username | Password | Rôle |
|----------|----------|------|
| qartersan | travl2026! | Président |
| coach | travl2026! | Coach |
| manager | travl2026! | Manager |
| joueur | travl2026! | Joueur |

---

## 📦 DÉPLOIEMENT GITHUB PAGES

### 1️⃣ Activer GitHub Pages
1. Va dans **Settings** → **Pages**
2. Source: **GitHub Actions**

### 2️⃣ Créer workflow GitHub Actions

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        CI: false
    
    - name: Setup Pages
      uses: actions/configure-pages@v4
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './build'
    
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### 3️⃣ Push et déployer
```bash
git add .
git commit -m "Deploy site"
git push origin main
```

Le site sera accessible sur : `https://qartersan94.github.io/Structure-TravL/`

---

## ✅ CHECKLIST AVANT DÉPLOIEMENT

- [ ] `npm install` réussi
- [ ] `npm start` fonctionne en local
- [ ] `npm run build` compile sans erreurs
- [ ] Tous les imports sont corrects
- [ ] package.json configuré
- [ ] Tailwind CSS configuré
- [ ] GitHub workflow créé

---

## 🐛 RÉSOLUTION PROBLÈMES COURANTS

### Erreur: "Module not found"
```bash
npm install lucide-react
```

### Erreur Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Build échoue
1. Supprimer `node_modules` et `package-lock.json`
2. Relancer `npm install`
3. Relancer `npm run build`

---

## 📞 SUPPORT

Pour toute question ou bug, ouvrir une **Issue** sur GitHub.

---

**Version:** 2.0.0  
**Auteur:** Structure TravL  
**Licence:** MIT
