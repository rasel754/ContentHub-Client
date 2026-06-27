'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'The Complete Guide to AI Content Generation',
    excerpt: 'Learn everything you need to know about using AI to create professional content.',
    author: 'Sarah Chen',
    date: 'Dec 15, 2024',
    readTime: '8 min',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1579275455-11218c8df5e9?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Top 10 AI Tools for Content Creators in 2024',
    excerpt: 'Discover the best AI tools available for content creators this year.',
    author: 'Mike Johnson',
    date: 'Dec 10, 2024',
    readTime: '6 min',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1457821552933-23ae92a41c34?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'How to Write Better AI Prompts',
    excerpt: 'Master the art of prompt engineering to get better results from AI tools.',
    author: 'Emma Davis',
    date: 'Dec 5, 2024',
    readTime: '5 min',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1516874500494-0b63860f3fa3?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'AI Ethics in Content Creation',
    excerpt: 'Exploring the ethical implications of AI in the content creation industry.',
    author: 'David Lee',
    date: 'Nov 28, 2024',
    readTime: '7 min',
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19fad33e9?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Scaling Your Content Production with AI',
    excerpt: 'How to use AI to scale your content production without sacrificing quality.',
    author: 'Jessica Williams',
    date: 'Nov 20, 2024',
    readTime: '6 min',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'The Future of Content Marketing',
    excerpt: 'What the future holds for content marketing in the age of AI.',
    author: 'Alex Johnson',
    date: 'Nov 15, 2024',
    readTime: '9 min',
    category: 'Future',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Insights, tips, and stories about content creation and AI.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="group rounded-lg overflow-hidden border hover:border-primary transition-all hover:shadow-lg cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="text-xs text-muted-foreground pt-4 border-t space-y-1">
                        <p>{post.author}</p>
                        <div className="flex items-center justify-between">
                          <span>{post.date}</span>
                          <span>{post.readTime} read</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
