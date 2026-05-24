'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { LayoutDashboard, Image as ImageIcon, Star, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkSession = async () => {
      const customAdmin = typeof window !== 'undefined' ? localStorage.getItem('custom_admin_session') : null
      if (customAdmin) {
        try {
          const parsed = JSON.parse(customAdmin)
          
          // Verify if there is an active Supabase session; if not, login silently behind the scenes
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) {
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: 'admin@rajeshwari.com',
              password: '@RAJESHWARISURESH'
            })
            
            // Self-healing fallback: if companion auth user doesn't exist, register it natively
            if (signInError && (signInError.message.includes('Invalid login credentials') || signInError.message.includes('Email not confirmed'))) {
              const { error: signUpError } = await supabase.auth.signUp({
                email: 'admin@rajeshwari.com',
                password: '@RAJESHWARISURESH'
              })
              if (!signUpError) {
                await supabase.auth.signInWithPassword({
                  email: 'admin@rajeshwari.com',
                  password: '@RAJESHWARISURESH'
                })
              }
            }
          }

          setUser({ email: parsed.mobile_number, isCustom: true })
          setLoading(false)
          return
        } catch (e) {
          localStorage.removeItem('custom_admin_session')
        }
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const customAdmin = typeof window !== 'undefined' ? localStorage.getItem('custom_admin_session') : null
      if (customAdmin) return

      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleLogout = async () => {
    localStorage.removeItem('custom_admin_session')
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>
  }

  if (!user) {
    return null // Will redirect
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/designs', label: 'Manage Designs', icon: ImageIcon },
    { href: '/admin/reviews', label: 'Manage Reviews', icon: Star },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-r border-gray-200 shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
        </div>
        <nav className="px-4 pb-4 space-y-2 flex md:flex-col overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-primary text-white font-medium shadow-sm' 
                    : 'text-gray-600 hover:bg-brand-pink/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 mt-auto hidden md:block border-t border-gray-100">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-5 h-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="md:hidden flex justify-end mb-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
        {children}
      </main>
    </div>
  )
}
