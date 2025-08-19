import { NextResponse } from 'next/server';
import { getWaitlistStats } from '@/lib/prisma-waitlist';

export async function GET() {
  try {
    const stats = await getWaitlistStats();
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
