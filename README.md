# Velocity - Landing Page

Une landing page moderne pour Velocity, un SaaS d'audits Lighthouse boostés par l'IA pour optimiser les performances web.

## 🚀 Fonctionnalités

### Landing Page
- **Design moderne** avec thème clair et professionnel
- **Navigation fixe** avec liens vers les sections principales
- **Section Hero** avec call-to-action principal et waitlist
- **Section Fonctionnalités** présentant les avantages de Velocity
- **Section "Comment ça marche"** avec processus en 3 étapes
- **Footer** complet avec liens utiles

### Waitlist & Mesure du Besoin
- **Formulaire d'inscription** interactif avec validation
- **API route** pour gérer les inscriptions (`/api/waitlist`)
- **Mesure du besoin** avec analytics intégrés
- **Gestion des erreurs** et feedback utilisateur
- **Accès prioritaire** pour les premiers inscrits

### Composants UI
- **Badge** - Pour les étiquettes et statuts
- **Card** - Pour les sections de contenu
- **Button** - Boutons avec différents variants
- **Input** - Champs de saisie stylisés
- **Navigation Menu** - Menu de navigation

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes
- **class-variance-authority** - Variants de composants

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # API pour la waitlist
│   ├── dashboard/
│   │   └── components/
│   │       └── Input.tsx         # Composant d'audit existant
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Landing page principale
├── components/
│   ├── ui/                       # Composants shadcn/ui
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── navigation-menu.tsx
│   ├── layout/
│   │   └── Navbar.tsx
│   └── WaitlistForm.tsx          # Formulaire de waitlist
└── lib/
    └── utils.ts
```

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd velocity_frontend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📊 Mesure du Besoin

### Métriques suivies
- **Nombre total d'inscrits** à la waitlist
- **Taux de conversion** visiteurs → inscrits
- **Événements analytics** (inscriptions, clics)

### API Endpoints
- `POST /api/waitlist` - Inscription à la waitlist
- `GET /api/waitlist` - Récupération des statistiques

### Analytics
Le composant `WaitlistForm` inclut des événements Google Analytics pour mesurer le besoin :
```javascript
window.gtag('event', 'waitlist_signup', {
  event_category: 'engagement',
  event_label: 'landing_page',
  value: 1
});
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales utilisées :
- **Bleu** : `#3B82F6` (primary)
- **Violet** : `#8B5CF6` (secondary)
- **Vert** : `#10B981` (success)
- **Rose** : `#EC4899` (accent)

### Thème
- **Mode clair** par défaut
- **Design professionnel** et moderne
- **Gradients** bleu-violet pour les CTA
- **Ombres subtiles** et effets de hover

## 📈 Optimisations SEO

- **Meta tags** optimisés
- **Structure sémantique** avec balises appropriées
- **Images optimisées** avec Next.js Image
- **Performance** optimisée avec Tailwind CSS

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SITE_URL=your-site-url
```

### Base de données
Pour la production, remplacez la simulation en mémoire par une vraie base de données dans `/api/waitlist/route.ts`.

## 📝 TODO

- [ ] Intégration avec une vraie base de données
- [ ] Système d'emails automatiques
- [ ] Dashboard admin pour les statistiques
- [ ] Tests unitaires et d'intégration
- [ ] Optimisation des performances
- [ ] Support multilingue

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Velocity** - Optimisez vos performances web avec l'IA 🚀
