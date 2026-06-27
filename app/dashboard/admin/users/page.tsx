'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Shield, User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: 'Nov 20, 2024' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'user', status: 'active', joined: 'Nov 15, 2024' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', status: 'active', joined: 'Oct 10, 2024' },
  { id: 4, name: 'Emma Davis', email: 'emma@example.com', role: 'user', status: 'inactive', joined: 'Oct 5, 2024' },
  { id: 5, name: 'David Lee', email: 'david@example.com', role: 'user', status: 'active', joined: 'Sep 28, 2024' },
]

export default function AdminUsersPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [isLoaded, user, router])

  if (!isLoaded || user?.publicMetadata?.role !== 'admin') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground animate-pulse">Checking authorization...</p>
        </div>
      </div>
    )
  }

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const toggleRole = (id: number) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
        <p className="text-muted-foreground">View and manage all users on the platform</p>
      </div>

      <div className="bg-card border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-3 text-sm">{user.name}</td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {user.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted-foreground">{user.joined}</td>
                  <td className="px-6 py-3 text-sm space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRole(user.id)}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {users.length} users
      </div>
    </div>
  )
}
