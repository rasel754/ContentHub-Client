import { NextRequest, NextResponse } from 'next/server'

// Mock database
const mockContents = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  title: `Content Item ${i + 1}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  category: ['Technology', 'Business', 'Marketing', 'Design'][i % 4],
  image: `https://images.unsplash.com/photo-1579275455-11218c8df5e9?w=400&h=300&fit=crop`,
  author: { id: '1', name: 'Admin', email: 'admin@example.com' },
  views: Math.floor(Math.random() * 10000),
  likes: Math.floor(Math.random() * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
}))

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '12')
    const category = searchParams.get('category')

    let filtered = mockContents
    if (category && category !== 'All') {
      filtered = filtered.filter(c => c.category === category)
    }

    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const items = filtered.slice(startIndex, startIndex + pageSize)

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contents' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newContent = {
      id: String(mockContents.length + 1),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockContents.push(newContent)
    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
  }
}
