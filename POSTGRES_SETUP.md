# Configuration Prisma PostgreSQL sur Vercel

## 🚀 Étapes de configuration

### 1. Créer une base de données Prisma PostgreSQL

1. **Allez sur votre dashboard Vercel** : https://vercel.com/dashboard
2. **Sélectionnez votre projet** `lazyapp-frontend`
3. **Cliquez sur "Storage"** dans le menu de gauche
4. **Cliquez sur "Create Database"**
5. **Choisissez "Prisma PostgreSQL"** (seule option PostgreSQL disponible)
6. **Configurez votre base de données** :
   - **Name** : `lazyapp-db` (ou le nom de votre choix)
   - **Region** : Choisissez la région la plus proche de vos utilisateurs
   - **Plan** : Commencez avec le plan gratuit (Hobby)

### 2. Variables d'environnement automatiques

Vercel configure automatiquement ces variables d'environnement :

```env
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=default
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=verceldb
```

### 3. Initialiser la base de données

Après avoir créé la base de données, initialisez-la :

```bash
# En local (pour tester)
npm run init-db

# Ou directement sur Vercel
vercel env pull .env.local
npm run init-db
```

### 4. Vérifier la configuration

Vérifiez que vos variables d'environnement sont bien configurées :

```bash
vercel env ls
```

## 🔧 Utilisation dans votre code

Votre code utilise déjà `@vercel/postgres` qui est parfaitement compatible avec Prisma PostgreSQL :

```typescript
import { sql } from '@vercel/postgres';

// Exemple d'utilisation
const result = await sql`
  SELECT * FROM waitlist WHERE email = ${email}
`;
```

**Note** : Même si Vercel l'appelle "Prisma PostgreSQL", vous n'avez pas besoin d'utiliser Prisma ORM. Votre code avec `@vercel/postgres` fonctionne parfaitement !

## 🚨 Dépannage

### Erreur de connexion

Si vous obtenez une erreur de connexion :

1. **Vérifiez les variables d'environnement** :
   ```bash
   vercel env ls
   ```

2. **Redéployez après avoir configuré la base** :
   ```bash
   vercel --prod
   ```

3. **Vérifiez que la base de données est bien créée** dans votre dashboard Vercel

### Erreur "Table does not exist"

Si vous obtenez une erreur de table inexistante :

1. **Initialisez la base de données** :
   ```bash
   npm run init-db
   ```

2. **Vérifiez que le script s'est bien exécuté** en regardant les logs

## 📊 Monitoring

Vous pouvez surveiller votre base de données depuis le dashboard Vercel :

- **Storage** → Votre base de données → **Overview**
- **Queries** : Voir les requêtes exécutées
- **Metrics** : Performance et utilisation

## 🔒 Sécurité

- Les variables d'environnement sont automatiquement sécurisées par Vercel
- La connexion utilise SSL par défaut
- Les credentials sont gérés automatiquement

## 📝 Notes importantes

- **Plan gratuit** : 256MB de stockage, 10GB de transfert/mois
- **Limitations** : 1000 requêtes/heure sur le plan gratuit
- **Backup** : Automatique sur les plans payants
- **Scaling** : Automatique selon vos besoins
