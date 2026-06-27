// Routes
export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  DETAILS: '/explore/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',
  PRIVACY: '/privacy',
  DASHBOARD: '/dashboard',
  ADMIN: '/dashboard/admin',
  LOGIN: '/auth/sign-in',
  REGISTER: '/auth/sign-up',
} as const;

// Colors - Modern, Professional Palette
export const COLORS = {
  primary: '#3b82f6', // Bright Blue
  secondary: '#10b981', // Emerald Green
  accent: '#f59e0b', // Amber
  background: '#ffffff',
  backgroundDark: '#0f172a',
  surface: '#f8fafc',
  surfaceDark: '#1e293b',
  text: '#1e293b',
  textLight: '#64748b',
  textDark: '#ffffff',
  border: '#e2e8f0',
  borderDark: '#334155',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
} as const;

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Explore', href: ROUTES.EXPLORE },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Blog', href: ROUTES.BLOG },
  { label: 'Contact', href: ROUTES.CONTACT },
] as const;

// User Roles for RBAC
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

// Pagination
export const ITEMS_PER_PAGE = 12;
export const ITEMS_PER_PAGE_SMALL = 8;
