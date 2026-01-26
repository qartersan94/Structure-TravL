export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🚫 **FICHIER 6 : .gitignore** (À la racine)
```
# Dependencies
node_modules
.pnp
.pnp.js

# Production
dist
dist-ssr
build
*.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.DS_Store

# Cache
.cache
.eslintcache
