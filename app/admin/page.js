'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent } from '@/components/ui/Card'
import { Image as ImageIcon, Star, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    designs: 0,
    reviews: 0,
    pendingReviews: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: designsCount },
        { count: reviewsCount },
        { count: pendingCount }
      ] = await Promise.all([
        supabase.from('designs').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('is_approved', false)
      ])

      setStats({
        designs: designsCount || 0,
        reviews: reviewsCount || 0,
        pendingReviews: pendingCount || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Designs</p>
              <h3 className="text-3xl font-bold text-foreground">{stats.designs}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-2xl text-green-600">
              <Star className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Reviews</p>
              <h3 className="text-3xl font-bold text-foreground">{stats.reviews}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-yellow-100 p-4 rounded-2xl text-yellow-600">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Approvals</p>
              <h3 className="text-3xl font-bold text-foreground">{stats.pendingReviews}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
