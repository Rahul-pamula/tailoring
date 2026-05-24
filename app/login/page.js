'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Scissors } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Check if entered value is a mobile number (consists only of numbers/plus sign)
    const isMobile = /^[0-9+]+$/.test(email.trim())

    if (isMobile) {
      try {
        const { data, error: dbError } = await supabase
          .from('admins')
          .select('*')
          .eq('mobile_number', email.trim())
          .eq('password', password)
          .single()

        if (dbError || !data) {
          setError('Invalid mobile number or password.')
          setLoading(false)
        } else {
          // 1. Success! Store custom session
          localStorage.setItem('custom_admin_session', JSON.stringify({
            mobile_number: data.mobile_number,
            id: data.id,
            role: 'admin'
          }))
          
          // 2. Sign in to Supabase Auth behind the scenes so the client has the "authenticated" role for RLS!
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: 'admin@rajeshwari.com',
            password: password // password matches `@RAJESHWARISURESH`
          })

          // Self-healing fallback: if companion auth user doesn't exist, register it natively
          if (signInError && (signInError.message.includes('Invalid login credentials') || signInError.message.includes('Email not confirmed'))) {
            const { error: signUpError } = await supabase.auth.signUp({
              email: 'admin@rajeshwari.com',
              password: password
            })
            if (!signUpError) {
              await supabase.auth.signInWithPassword({
                email: 'admin@rajeshwari.com',
                password: password
              })
            }
          }

          router.push('/admin')
          router.refresh()
        }
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
      } else {
        router.push('/admin')
        router.refresh()
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream/30 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8 px-6 sm:px-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary p-3 rounded-full mb-4">
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-gray-500 text-sm text-center mt-2">
              Sign in to manage Rajeshwari Tailoring
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email or Mobile Number</label>
              <Input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter email or mobile number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
