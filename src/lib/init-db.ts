import { initializeDatabase } from './postgres';

// Script d'initialisation de la base de données
export async function initDatabase() {
  try {
    console.log('🔄 Initialisation de la base de données Postgres...');
    await initializeDatabase();
    console.log('✅ Base de données Postgres initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  }
}

// Exécuter l'initialisation si ce fichier est appelé directement
if (require.main === module) {
  initDatabase();
}
