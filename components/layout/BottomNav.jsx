'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Image as ImageIcon, Star, Phone } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/designs', label: 'Designs', icon: ImageIcon },
    { href: '/reviews', label: 'Reviews', icon: Star },
    { href: '/contact', label: 'Contact', icon: Phone },
  ]

  // Don't show bottom nav on admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-brand-pink-dark/30 pb-safe md:hidden shadow-[0_-4px_24px_rgba(232,140,154,0.08)]">
      <div className="flex justify-around items-center h-18">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-all duration-300 active:scale-95 ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/10 text-primary scale-110 shadow-inner' 
                  : 'hover:bg-brand-pink/50'
              }`}>
                <Icon className="w-5 h-5 transition-transform duration-300" />
              </div>
              <span className={`text-[10px] tracking-wide transition-all duration-300 ${
                isActive ? 'font-bold scale-105' : 'font-medium'
              }`}>{link.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full shadow-sm" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
