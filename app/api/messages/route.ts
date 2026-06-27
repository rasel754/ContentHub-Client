import { NextRequest, NextResponse } from 'next/server'

const messages: any[] = []

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    }

    messages.push(newMessage)

    // In production, send email notification here
    console.log('New message received:', newMessage)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}
