import Link from 'next/link'
import { Scissors, Lock } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-brand-pink-dark/20 shadow-[0_2px_15px_rgba(232,140,154,0.04)]">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5 transition-transform duration-200 active:scale-95">
          <div className="bg-gradient-to-tr from-accent to-primary p-2 rounded-full shadow-md shadow-primary/20">
            <Scissors className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-200">
            Rajeshwari Tailoring
          </span>
        </Link>
        
        <div>
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-accent transition-all duration-200 py-1.5 px-3 rounded-full hover:bg-brand-pink/50 active:scale-95 border border-gray-100"
          >
            <Lock className="w-3.5 h-3.5 text-text-secondary/75" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
