import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { type, prompt } = await request.json()

    if (!type || !prompt) {
      return NextResponse.json(
        { error: 'Type and prompt are required' },
        { status: 400 }
      )
    }

    // Mock AI generation - in production, this would call an AI API
    const templates: Record<string, string> = {
      article: `# ${prompt}\n\nComprehensive guide about ${prompt.toLowerCase()}.\n\n## Introduction\n...\n## Main Points\n...\n## Conclusion\n...`,
      social: `✨ Check out this amazing content about ${prompt}!\n\nLearn more about ${prompt.toLowerCase()} and why it matters.\n\n#${prompt.split(' ')[0].toLowerCase()} #trending`,
      email: `Subject: ${prompt}\n\nHi there,\n\nWe're excited to share this about ${prompt}.\n\nBest regards,\nThe Team`,
      script: `[INTRO]\nHey everyone! Today we're talking about ${prompt}.\n\n[MAIN]\n${prompt} is...\n\n[CTA]\nLike and subscribe for more!\n\n[OUTRO]\nThanks for watching!`,
    }

    const generatedContent = templates[type] || templates.article

    return NextResponse.json({
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: prompt,
      content: generatedContent,
      prompt,
      createdAt: new Date(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
