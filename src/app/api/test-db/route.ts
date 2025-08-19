import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTotalSubscribers } from '@/lib/prisma-waitlist';

export async function GET() {
  try {
    console.log('🔍 Test de connexion Prisma à PostgreSQL...');
    
    // Test simple de connexion avec Prisma
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    const currentTime = (result as any)[0].current_time;
    
    console.log('✅ Connexion Prisma réussie!');
    console.log(`⏰ Heure du serveur: ${currentTime}`);
    
    // Test de la table waitlist
    console.log('📊 Vérification de la table waitlist...');
    
    try {
      const entryCount = await getTotalSubscribers();
      console.log(`📈 Nombre d'entrées: ${entryCount}`);
      
      return NextResponse.json({
        success: true,
        message: 'Connexion Prisma PostgreSQL réussie',
        serverTime: currentTime,
        tableExists: true,
        entryCount: entryCount,
        prismaVersion: 'Active'
      });
    } catch (tableError) {
      console.log('⚠️ Table waitlist n\'existe pas ou erreur de connexion');
      
      return NextResponse.json({
        success: true,
        message: 'Connexion Prisma PostgreSQL réussie, mais table waitlist manquante',
        serverTime: currentTime,
        tableExists: false,
        entryCount: 0,
        prismaVersion: 'Active'
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur de connexion Prisma:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erreur de connexion Prisma à PostgreSQL',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}
