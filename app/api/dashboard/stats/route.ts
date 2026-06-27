import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const stats = {
      totalUsers: 1234,
      totalContent: 45200,
      totalMessages: 892,
      activeUsers: 342,
      thisMonthGrowth: 12,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
