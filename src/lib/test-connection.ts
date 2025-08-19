import { sql } from '@vercel/postgres';

// Script pour tester la connexion à PostgreSQL
export async function testConnection() {
  try {
    console.log('🔍 Test de connexion à PostgreSQL...');
    
    // Test simple de connexion
    const result = await sql`SELECT NOW() as current_time`;
    
    console.log('✅ Connexion réussie!');
    console.log(`⏰ Heure du serveur: ${result.rows[0].current_time}`);
    
    // Test de création de table (si elle n'existe pas)
    console.log('📊 Vérification de la table waitlist...');
    
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'waitlist'
      ) as exists
    `;
    
    if (tableExists.rows[0].exists) {
      console.log('✅ Table waitlist existe');
      
      // Compter les entrées
      const countResult = await sql`SELECT COUNT(*) as count FROM waitlist`;
      console.log(`📈 Nombre d'entrées: ${countResult.rows[0].count}`);
    } else {
      console.log('⚠️ Table waitlist n\'existe pas');
      console.log('💡 Exécutez: npm run init-db');
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
    console.error('💡 Vérifiez vos variables d\'environnement PostgreSQL');
    return { success: false, error };
  }
}

// Exécuter le test si ce fichier est appelé directement
if (require.main === module) {
  testConnection();
}
