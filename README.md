# ContentHub - AI-Powered Content Generator

A modern, full-stack web application for generating high-quality content using AI. Built with Next.js 16, React, TypeScript, Tailwind CSS, and Clerk authentication.

## Features

### Public Pages
- **Home Page**: Hero section with features, stats, testimonials, and FAQs
- **Explore Page**: Browse and search generated content with filtering and pagination
- **Details Page**: View individual content items with related articles
- **About Page**: Company information and team details
- **Contact Page**: Contact form with validation
- **Blog Page**: Article listings with search functionality
- **Privacy Page**: Privacy policy information

### User Dashboard
- **Overview**: Quick stats and recent activity
- **Content Generator**: AI-powered content generation tool (Articles, Social Posts, Emails, Scripts)
- **Analytics**: Track content performance and engagement metrics

### Admin Dashboard (RBAC)
- **User Management**: View and manage users, assign admin roles
- **Content Management**: Review and approve user-generated content
- **Analytics**: Platform-wide statistics and trends

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Data Fetching**: React Query, Axios
- **Authentication**: Clerk
- **State Management**: React Query + custom hooks
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Chart.js + React-ChartJS-2

## Project Structure

```
/app
  /public          # Public pages (about, contact, blog, privacy)
    /explore       # Content exploration with search/filter
    /[id]          # Content detail pages
  /dashboard       # User dashboard
    /generator     # Content generation tool
    /analytics     # User analytics
    /admin         # Admin panel
      /users       # User management
      /content     # Content moderation
      /stats       # Platform analytics
  /api             # API endpoints
    /contents      # Content management
    /generate      # AI generation
    /messages      # Contact messages
    /dashboard     # Dashboard stats

/components
  /common          # Shared components (Navbar, Footer, etc.)
  /dashboard       # Dashboard-specific components
  /pages           # Page-specific components

/config
  constants.ts     # App-wide constants, colors, routes

/hooks
  use-theme.ts     # Dark mode management
  use-media-query.ts # Responsive design hooks

/lib
  /api
    client.ts      # Axios instance with interceptors
    hooks.ts       # React Query hooks

/types
  index.ts         # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Add your Clerk keys to .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Key Features Explained

### Authentication (Clerk)
- Sign up and sign in pages
- User profile management
- Role-based access control (RBAC)

### Content Generation
- Support for multiple content types
- Mock AI backend (ready for real API integration)
- Ability to copy and download generated content

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

### Dark Mode
- System preference detection
- Manual toggle
- Smooth transitions
- Persistent theme preference

### Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus visible styles
- Reduced motion support

## API Endpoints

- `GET /api/contents` - Get paginated content list
- `POST /api/contents` - Create new content
- `POST /api/generate` - Generate content using AI
- `GET/POST /api/messages` - Contact form messages
- `GET /api/dashboard/stats` - Dashboard statistics

## Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Development Tips

### Adding New Pages
1. Create a new route folder in `/app`
2. Add a `page.tsx` file
3. Update navigation constants if needed

### Adding New Components
1. Create component in appropriate `/components` folder
2. Use TypeScript for type safety
3. Follow naming conventions

### Styling
- Use Tailwind CSS utility classes
- Follow the design system tokens
- Maintain consistent spacing using Tailwind's spacing scale

### Forms
- Use React Hook Form for management
- Validate with Zod schemas
- Display errors with proper messaging

## Deployment

The app is ready to deploy to Vercel:

```bash
# Push to GitHub
git push origin main

# Deploy from Vercel dashboard
# Connect your GitHub repository and deploy
```

## Future Enhancements

- Real AI integration (OpenAI, Anthropic, etc.)
- Database integration (Neon, Supabase)
- Email notification system
- Payment integration (Stripe)
- User collaboration features
- Content templates
- Advanced analytics
- API rate limiting
- User subscriptions

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub or contact us at support@contenthub.io.
