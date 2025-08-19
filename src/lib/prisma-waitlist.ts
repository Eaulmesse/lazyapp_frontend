import { prisma } from './prisma'

// Interface pour les entrées de la waitlist
export interface WaitlistEntry {
  id: number
  email: string
  preferences: string[]
  createdAt: Date
}

// Interface pour les statistiques
export interface WaitlistStats {
  totalSubscribers: number
  preferenceStats: Array<{ preference: string; count: number }>
  dailyStats: Array<{ date: string; count: number }>
  recentSubscribers: Array<{
    email: string
    preferences: string[]
    createdAt: Date
  }>
}

// Ajouter un email à la waitlist
export async function addToWaitlist(
  email: string, 
  preferences: string[]
): Promise<{ success: boolean; totalSubscribers?: number; error?: string }> {
  try {
    // Vérifier si l'email existe déjà
    const existing = await prisma.waitlist.findUnique({
      where: { email }
    })
    
    if (existing) {
      return { success: false, error: 'Cet email est déjà inscrit' }
    }
    
    // Insérer le nouvel email
    await prisma.waitlist.create({
      data: {
        email,
        preferences
      }
    })
    
    // Compter le total d'inscrits
    const totalSubscribers = await prisma.waitlist.count()
    
    console.log(`Nouvelle inscription waitlist: ${email}`)
    console.log(`Préférences: ${preferences.join(', ')}`)
    console.log(`Total inscriptions: ${totalSubscribers}`)
    
    return { success: true, totalSubscribers }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return { success: false, error: 'Erreur interne du serveur' }
  }
}

// Obtenir les statistiques de la waitlist
export async function getWaitlistStats(): Promise<WaitlistStats> {
  try {
    // Total d'inscrits
    const totalSubscribers = await prisma.waitlist.count()
    
    // Statistiques des préférences
    const allEntries = await prisma.waitlist.findMany({
      select: { preferences: true }
    })
    
    const preferenceCounts: Record<string, number> = {}
    allEntries.forEach(entry => {
      const prefs = entry.preferences as string[]
      prefs.forEach(pref => {
        preferenceCounts[pref] = (preferenceCounts[pref] || 0) + 1
      })
    })
    
    const preferenceStats = Object.entries(preferenceCounts)
      .map(([preference, count]) => ({ preference, count }))
      .sort((a, b) => b.count - a.count)
    
    // Statistiques quotidiennes (7 derniers jours)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const dailyEntries = await prisma.waitlist.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: { createdAt: true }
    })
    
    const dailyCounts: Record<string, number> = {}
    dailyEntries.forEach(entry => {
      const date = entry.createdAt.toISOString().split('T')[0]
      dailyCounts[date] = (dailyCounts[date] || 0) + 1
    })
    
    const dailyStats = Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
    
    // Derniers inscrits
    const recentSubscribers = await prisma.waitlist.findMany({
      select: {
        email: true,
        preferences: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
    
    return {
      totalSubscribers,
      preferenceStats,
      dailyStats,
      recentSubscribers: recentSubscribers.map(entry => ({
        email: entry.email,
        preferences: entry.preferences as string[],
        createdAt: entry.createdAt
      }))
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    throw new Error('Erreur interne du serveur')
  }
}

// Obtenir le nombre total d'inscrits
export async function getTotalSubscribers(): Promise<number> {
  try {
    return await prisma.waitlist.count()
  } catch (error) {
    console.error('Erreur lors du comptage des inscrits:', error)
    return 0
  }
}

// Obtenir tous les emails de la waitlist
export async function getAllWaitlistEmails(): Promise<string[]> {
  try {
    const entries = await prisma.waitlist.findMany({
      select: { email: true }
    })
    return entries.map(entry => entry.email)
  } catch (error) {
    console.error('Erreur lors de la récupération des emails:', error)
    return []
  }
}

// Supprimer un email de la waitlist
export async function removeFromWaitlist(email: string): Promise<boolean> {
  try {
    await prisma.waitlist.delete({
      where: { email }
    })
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return false
  }
}
