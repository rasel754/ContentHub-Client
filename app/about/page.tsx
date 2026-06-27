import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/config/constants'

export default function AboutPage() {
  const team = [
    { name: 'Alex Johnson', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Maria Garcia', role: 'CTO', emoji: '👩‍💻' },
    { name: 'David Lee', role: 'Head of Product', emoji: '👨‍🔬' },
    { name: 'Sophie Martin', role: 'Head of Design', emoji: '👩‍🎨' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">About ContentHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            We&apos;re building the future of content creation with AI-powered tools designed for creators and businesses.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                ContentHub was founded with a simple mission: to democratize professional content creation. We believe that everyone should have access to high-quality content generation tools, regardless of their budget or technical expertise.
              </p>
              <p className="text-muted-foreground mb-4">
                Our AI-powered platform eliminates the barriers to entry for content creators, entrepreneurs, and businesses, enabling them to produce amazing content at scale.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg h-64"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg border">
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly push the boundaries of AI technology to provide cutting-edge tools for content creation.
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border">
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe powerful tools should be accessible to everyone, regardless of their background or budget.
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg border">
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to delivering the highest quality content and customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-8 text-blue-100">
            Be part of the content revolution. Start creating amazing content today.
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
