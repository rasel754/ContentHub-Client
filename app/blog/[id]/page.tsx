'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, BookOpen, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/constants';
import { useToast } from '@/components/ui/toast';

const blogPosts = [
  {
    id: 1,
    title: 'The Complete Guide to AI Content Generation',
    excerpt: 'Learn everything you need to know about using AI to create professional content.',
    author: 'Sarah Chen',
    date: 'Dec 15, 2024',
    readTime: '8 min',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1579275455-11218c8df5e9?w=1200&h=600&fit=crop',
    content: `Artificial Intelligence is transforming how we write, market, and design. In this comprehensive guide, we will explore the fundamentals of AI content generation, understand how language models work, and outline actionable strategies to integrate AI into your content pipeline.

### Understanding Large Language Models
At the heart of modern AI tools are Large Language Models (LLMs). These models predict the next most probable word based on patterns in massive training datasets. By understanding context, tone, and grammar, LLMs can draft high-quality copy that feels human-written.

### Best Practices for Content Generation
1. **Provide Clear Context**: The more information you give the AI about your brand, audience, and goal, the better the output.
2. **Set a Tone**: Explicitly ask the AI to write in a specific voice, such as "professional," "friendly," or "technical."
3. **Edit and Refine**: AI is a powerful assistant, but humans should always review, refine, and check the facts in the output.

### Conclusion
Embracing AI isn't about replacing human creativity; it's about scaling your capabilities. When paired with human oversight, AI content generators allow teams to produce high-value content faster than ever.`,
  },
  {
    id: 2,
    title: 'Top 10 AI Tools for Content Creators in 2024',
    excerpt: 'Discover the best AI tools available for content creators this year.',
    author: 'Mike Johnson',
    date: 'Dec 10, 2024',
    readTime: '6 min',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1457821552933-23ae92a41c34?w=1200&h=600&fit=crop',
    content: `The landscape of content creation tools has exploded. Here are the top 10 AI-powered platforms that every modern creator should know about in 2024.

### 1. ContentHub
Our all-in-one AI engine for articles, captions, emails, and conversational brainstorming.

### 2. Midjourney & DALL-E 3
Stunning AI art engines that generate professional-grade illustrations and assets from text prompts.

### 3. ElevenLabs
Realistic voice generators that make high-fidelity voiceovers and podcasts simple to record.

### 4. Runway Gen-2
Cutting-edge text-to-video tools that allow creators to render cinematic assets in seconds.

### Conclusion
Choosing the right tools depends on your workflow. By stacking these tools, you can build a highly automated production studio.`,
  },
  {
    id: 3,
    title: 'How to Write Better AI Prompts',
    excerpt: 'Master the art of prompt engineering to get better results from AI tools.',
    author: 'Emma Davis',
    date: 'Dec 5, 2024',
    readTime: '5 min',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1516874500494-0b63860f3fa3?w=1200&h=600&fit=crop',
    content: `Prompt engineering is the core skill of the AI era. Learn how to draft instructions that get exactly what you want on the first try.

### The Anatomy of a Perfect Prompt
A great prompt contains four elements:
* **Role**: Establish who the AI is (e.g. "You are an expert copywriter").
* **Task**: Define the job clearly (e.g. "Write a 300-word email").
* **Context**: Feed in constraints or references.
* **Output Format**: Specify layout rules (e.g. "Use bullet points").

### Prompting Tips
Avoid vague statements like "make it good." Instead, write "write a snappy, persuasive introduction using short, punchy sentences."`,
  },
  {
    id: 4,
    title: 'AI Ethics in Content Creation',
    excerpt: 'Exploring the ethical implications of AI in the content creation industry.',
    author: 'David Lee',
    date: 'Nov 28, 2024',
    readTime: '7 min',
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19fad33e9?w=1200&h=600&fit=crop',
    content: `As AI tools grow more integrated, creators must evaluate the ethical implications of automated writing, copyright claims, and disclosure rules.

### Disclosure and Transparency
Audience trust is paramount. Disclosing major AI collaborations builds transparency and respect.

### The Bias Challenge
Large language models carry biases inherent in their training data. Content managers must audit and filter generations to ensure inclusivity and fairness.`,
  },
  {
    id: 5,
    title: 'Scaling Your Content Production with AI',
    excerpt: 'How to use AI to scale your content production without sacrificing quality.',
    author: 'Jessica Williams',
    date: 'Nov 20, 2024',
    readTime: '6 min',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: `Scaling output traditionally required expanding headcount. Now, you can amplify your team's throughput by converting them into AI directors.

### Setting Up the Automation Funnel
Map out repetitive content types and build reusable custom prompt templates. Train editors to critique drafts instead of writing from scratch.`,
  },
  {
    id: 6,
    title: 'The Future of Content Marketing',
    excerpt: 'What the future holds for content marketing in the age of AI.',
    author: 'Alex Johnson',
    date: 'Nov 15, 2024',
    readTime: '9 min',
    category: 'Future',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: `The ultimate trajectory of content marketing is highly hyper-personalized. AI enables real-time dynamic copy tailored to unique reader signals.

### Personalization at Scale
Future content funnels won't rely on static blog posts. Rather, readers will ask questions and receive bespoke documents compiled instantly.`,
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const blogId = parseInt(resolvedParams.id, 10);
  const { success } = useToast();

  const post = blogPosts.find((p) => p.id === blogId) || blogPosts[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      success('Link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen bg-background py-12 animate-in fade-in duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link href={ROUTES.BLOG} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-muted text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} read
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border shadow-sm mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-muted">
          <p className="text-muted-foreground text-sm italic">
            {post.excerpt}
          </p>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Link
          </Button>
        </div>

        {/* Content Body */}
        <div className="prose dark:prose-invert max-w-none text-foreground leading-relaxed text-base sm:text-lg mb-16 whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
}
