import { initializeDatabase } from './postgres';

// Script d'initialisation de la base de données
export async function initDatabase() {
  try {
    console.log('🔄 Initialisation de la base de données Postgres...');
    console.log('📍 Vérification de la connexion...');
    
    await initializeDatabase();
    
    console.log('✅ Base de données Postgres initialisée avec succès');
    console.log('📊 Tables créées : waitlist');
    console.log('🔍 Index créés : idx_waitlist_email, idx_waitlist_created_at');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    console.error('💡 Vérifiez que vos variables d\'environnement PostgreSQL sont configurées');
    process.exit(1);
  }
}

// Exécuter l'initialisation si ce fichier est appelé directement
if (require.main === module) {
  initDatabase();
}
