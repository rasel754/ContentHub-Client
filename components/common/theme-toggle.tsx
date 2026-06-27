'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    const newTheme = isCurrentlyDark ? 'light' : 'dark'
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted text-foreground transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-in fade-in duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 animate-in fade-in duration-300" />
      )}
    </button>
  )
}
export default ThemeToggle;
