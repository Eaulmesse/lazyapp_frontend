import { sql } from '@vercel/postgres';

// Interface pour les entrées de la waitlist
export interface WaitlistEntry {
  id: number;
  email: string;
  preferences: string;
  created_at: string;
}

// Initialiser la base de données avec la table waitlist
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        preferences TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Créer les index pour améliorer les performances
    await sql`
      CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at)
    `;
    
    console.log('Base de données Postgres initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  }
}

// Fonctions pour gérer la waitlist
export async function addToWaitlist(email: string, preferences: string[]): Promise<{ success: boolean; totalSubscribers?: number; error?: string }> {
  try {
    // Vérifier si l'email existe déjà
    const existing = await sql`
      SELECT id FROM waitlist WHERE email = ${email}
    `;
    
    if (existing.rows.length > 0) {
      return { success: false, error: 'Cet email est déjà inscrit' };
    }
    
    // Insérer le nouvel email
    await sql`
      INSERT INTO waitlist (email, preferences) 
      VALUES (${email}, ${JSON.stringify(preferences)})
    `;
    
    // Compter le total d'inscrits
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM waitlist
    `;
    
    const totalSubscribers = parseInt(totalResult.rows[0].count);
    
    console.log(`Nouvelle inscription waitlist: ${email}`);
    console.log(`Préférences: ${preferences.join(', ')}`);
    console.log(`Total inscriptions: ${totalSubscribers}`);
    
    return { success: true, totalSubscribers };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return { success: false, error: 'Erreur interne du serveur' };
  }
}

export async function getWaitlistStats() {
  try {
    // Total d'inscrits
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM waitlist
    `;
    const totalSubscribers = parseInt(totalResult.rows[0].count);
    
    // Statistiques des préférences (approximatif avec PostgreSQL)
    const preferenceStats = await sql`
      SELECT 
        jsonb_array_elements_text(preferences::jsonb) as preference,
        COUNT(*) as count
      FROM waitlist 
      GROUP BY preference 
      ORDER BY count DESC
    `;
    
    // Statistiques quotidiennes (7 derniers jours)
    const dailyStats = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM waitlist 
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    
    // Derniers inscrits
    const recentSubscribers = await sql`
      SELECT email, preferences, created_at
      FROM waitlist 
      ORDER BY created_at DESC 
      LIMIT 5
    `;
    
    return {
      totalSubscribers,
      preferenceStats: preferenceStats.rows.map(row => ({
        preference: row.preference,
        count: parseInt(row.count)
      })),
      dailyStats: dailyStats.rows.map(row => ({
        date: row.date,
        count: parseInt(row.count)
      })),
      recentSubscribers: recentSubscribers.rows.map(row => ({
        email: row.email,
        preferences: JSON.parse(row.preferences),
        createdAt: row.created_at
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw new Error('Erreur interne du serveur');
  }
}

export async function getTotalSubscribers(): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM waitlist
    `;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Erreur lors du comptage des inscrits:', error);
    return 0;
  }
}
