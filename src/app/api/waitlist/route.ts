import { NextRequest, NextResponse } from 'next/server';
import { addToWaitlist, getTotalSubscribers } from '@/lib/postgres';

export async function POST(request: NextRequest) {
  try {
    const { email, preferences = [] } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
    }

    const result = await addToWaitlist(email, preferences);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Inscription réussie !', 
      totalSubscribers: result.totalSubscribers, 
      preferences: preferences 
    }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const totalSubscribers = await getTotalSubscribers();
    
    return NextResponse.json({ 
      totalSubscribers,
      message: 'Statistiques récupérées avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
