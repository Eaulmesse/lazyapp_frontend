# Script de déploiement avec initialisation de la base de données
Write-Host "🚀 Déploiement de l'application sur Vercel..." -ForegroundColor Green

# Build de l'application
Write-Host "📦 Build de l'application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}

# Déploiement sur Vercel
Write-Host "🌐 Déploiement sur Vercel..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Déploiement terminé avec succès!" -ForegroundColor Green
Write-Host "💡 N'oubliez pas d'initialiser votre base de données Prisma PostgreSQL:" -ForegroundColor Cyan
Write-Host "   - Allez sur votre dashboard Vercel" -ForegroundColor Cyan
Write-Host "   - Créez une base de données Prisma PostgreSQL" -ForegroundColor Cyan
Write-Host "   - Exécutez: npm run init-db" -ForegroundColor Cyan
