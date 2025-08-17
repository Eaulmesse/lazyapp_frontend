# Configuration SQLite pour Velocity

## 🚀 Avantages de SQLite

- ✅ **Aucune installation** de serveur de base de données requise
- ✅ **Base de données unique** dans un fichier `velocity.db`
- ✅ **Configuration zéro** - fonctionne immédiatement
- ✅ **Parfait pour mesurer l'accueil client** - simple et efficace
- ✅ **Portable** - peut être facilement sauvegardé et déplacé

## 📊 Structure de la Base de Données

### Table: `waitlist`
```sql
CREATE TABLE waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  preferences TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Exemple de Données
```sql
INSERT INTO waitlist (email, preferences) VALUES 
('user@example.com', '["seo", "performance"]');
```

## 🔧 Endpoints API

### POST `/api/waitlist`
- **Fonction** : Inscription à la waitlist
- **Body** : `{ email: string, preferences: string[] }`
- **Retour** : `{ success: boolean, totalSubscribers: number }`

### GET `/api/waitlist`
- **Fonction** : Récupérer toutes les inscriptions
- **Retour** : `{ totalSubscribers: number, recentSubscribers: Array }`

### GET `/api/waitlist/stats`
- **Fonction** : Statistiques détaillées
- **Retour** : `{ totalSubscribers, preferenceStats, dailyStats, recentSubscribers }`

## 📈 Mesures et Analytics

### Données Collectées
- **Email** : Adresse email de l'utilisateur
- **Préférences** : Choix de fonctionnalités (stockées en JSON)
- **Horodatage** : Date et heure d'inscription automatique

### Statistiques Disponibles
- **Total d'inscrits** : Nombre total d'emails
- **Préférences populaires** : Répartition par fonctionnalité
- **Inscriptions par jour** : Évolution sur 7 jours
- **Dernières inscriptions** : 5 derniers inscrits

## 🛠️ Développement

### Démarrage
```bash
# Aucune configuration requise !
npm run dev
```

La base de données SQLite sera automatiquement créée dans `velocity.db` au premier démarrage.

### Vérification
1. Visitez `http://localhost:3000`
2. Inscrivez-vous à la waitlist
3. Vérifiez les données dans SQLite :
```bash
# Ouvrir la base de données SQLite
sqlite3 velocity.db

# Voir les données
SELECT * FROM waitlist;

# Statistiques
SELECT COUNT(*) as total FROM waitlist;
SELECT DATE(created_at) as date, COUNT(*) as count 
FROM waitlist 
GROUP BY DATE(created_at) 
ORDER BY date DESC;
```

## 📁 Fichiers de Base de Données

### `velocity.db`
- **Emplacement** : Racine du projet
- **Taille** : Quelques KB au début, croît avec les inscriptions
- **Sauvegarde** : Copiez simplement le fichier pour sauvegarder

### Structure des Données
```json
{
  "id": 1,
  "email": "user@example.com",
  "preferences": "[\"seo\", \"performance\"]",
  "created_at": "2024-01-15 10:30:00"
}
```

## 🔒 Sécurité

### Avantages
- ✅ **Pas de serveur externe** à sécuriser
- ✅ **Données locales** - contrôle total
- ✅ **Validation côté serveur** maintenue
- ✅ **Protection contre les doublons** par email

### Bonnes Pratiques
- Sauvegardez régulièrement `velocity.db`
- Ne commitez jamais `velocity.db` dans Git
- Ajoutez `*.db` à votre `.gitignore`

## 🚀 Production

### Déploiement
1. **Vercel/Netlify** : SQLite fonctionne parfaitement
2. **Serveur dédié** : Copiez simplement `velocity.db`
3. **Docker** : Montez le fichier comme volume

### Migration
Si vous voulez migrer vers une autre base plus tard :
```sql
-- Export des données
SELECT * FROM waitlist;
```

## 📝 Requêtes Utiles

### Statistiques Basiques
```sql
-- Total d'inscrits
SELECT COUNT(*) FROM waitlist;

-- Inscriptions aujourd'hui
SELECT COUNT(*) FROM waitlist 
WHERE DATE(created_at) = DATE('now');

-- Préférences populaires
WITH split_preferences AS (
  SELECT json_each.value as preference
  FROM waitlist
  CROSS JOIN json_each(waitlist.preferences)
)
SELECT preference, COUNT(*) as count
FROM split_preferences
GROUP BY preference
ORDER BY count DESC;
```

### Nettoyage
```sql
-- Supprimer les doublons (si nécessaire)
DELETE FROM waitlist 
WHERE id NOT IN (
  SELECT MIN(id) 
  FROM waitlist 
  GROUP BY email
);
```

## 🎯 Avantages pour Mesurer l'Accueil Client

- **Simplicité** : Focus sur les métriques, pas sur l'infrastructure
- **Performance** : Requêtes rapides même avec des milliers d'inscriptions
- **Fiabilité** : Pas de dépendance externe
- **Analyse** : Données facilement exportables pour analyse
- **Évolutivité** : Peut gérer des milliers d'inscriptions sans problème

## 📊 Dashboard

Le composant `WaitlistStats` affiche automatiquement :
- Nombre total d'inscrits
- Préférences populaires avec graphiques
- Évolution des inscriptions
- Dernières inscriptions

SQLite est parfait pour mesurer l'accueil client de Velocity ! 🎉
