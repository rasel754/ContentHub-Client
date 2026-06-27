'use client'

import { Search, X } from 'lucide-react'
import { useState } from 'react'

interface AccessibleSearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  onClear?: () => void
}

export function AccessibleSearch({
  placeholder = 'Search...',
  onSearch,
  onClear,
}: AccessibleSearchProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setQuery('')
    onClear?.()
  }

  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2 rounded-lg border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={placeholder}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3 p-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
          type="button"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
