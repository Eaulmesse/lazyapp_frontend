#!/bin/bash

# 🚀 Script de déploiement Velocity sur Vercel
# Usage: ./deploy.sh

echo "🚀 Déploiement de Velocity sur Vercel..."
echo "========================================"

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "Installez-le avec: npm install -g vercel"
    exit 1
fi

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# Vérifier que le projet est prêt
echo "📋 Vérification du projet..."

# Vérifier les dépendances
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier le build
echo "🔨 Test du build..."
if ! npm run build; then
    echo "❌ Erreur lors du build. Corrigez les erreurs avant de continuer."
    exit 1
fi

echo "✅ Build réussi !"

# Vérifier la connexion Vercel
echo "🔐 Vérification de la connexion Vercel..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Vous n'êtes pas connecté à Vercel"
    echo "Connexion..."
    vercel login
fi

# Déployer
echo "🚀 Déploiement en cours..."
vercel --prod

echo ""
echo "🎉 Déploiement terminé !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Allez sur votre dashboard Vercel"
echo "2. Créez une base de données Postgres dans 'Storage'"
echo "3. Liez la base à votre projet"
echo "4. Testez votre application"
echo ""
echo "📖 Consultez DEPLOYMENT_GUIDE.md pour plus de détails"
