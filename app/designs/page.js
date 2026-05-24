import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabaseClient'
import { Search } from 'lucide-react'

export const revalidate = 0 // Dynamic data, or we could use searchParams caching

export default async function DesignsPage({ searchParams }) {
  const query = await searchParams;
  const category = query?.category || 'All'
  const search = query?.search || ''

  let supabaseQuery = supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false })

  if (category !== 'All') {
    supabaseQuery = supabaseQuery.eq('category', category)
  }
  
  if (search) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${search}%,custom_id.ilike.%${search}%`)
  }

  const { data: designs } = await supabaseQuery

  const categories = ['All', 'Dress', 'Blouse']

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Our Designs</h1>
      
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form className="flex-1 relative flex items-center">
          <Input 
            type="text" 
            name="search"
            defaultValue={search}
            placeholder="Search by name or ID..." 
            className="pl-10"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3" />
          {category !== 'All' && <input type="hidden" name="category" value={category} />}
          <button type="submit" className="hidden">Search</button>
        </form>

        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <Link 
              key={cat} 
              href={`/designs?category=${cat}${search ? `&search=${search}` : ''}`}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                category === cat 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-brand-pink/30 text-foreground hover:bg-brand-pink'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {designs?.length > 0 ? designs.map((design) => (
          <Link key={design.id} href={`/designs/${design.id}`}>
            <Card className="hover:border-primary/30 transition-all duration-300 cursor-pointer group flex flex-col">
              <div className="w-full bg-white p-2">
                {design.image_urls?.[0] ? (
                  <img
                    src={design.image_urls[0]}
                    alt={design.name}
                    className="w-full h-auto block max-w-full rounded-lg"
                    style={{ objectFit: 'contain', imageRendering: 'auto' }}
                  />
                ) : (
                  <div className="w-full py-14 flex items-center justify-center text-gray-400 bg-brand-pink/20 rounded-lg text-sm">
                    No image
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col flex-grow justify-between gap-4">
                <div>
                  <h3 className="font-bold text-text-primary text-base sm:text-lg line-clamp-1 group-hover:text-accent transition-colors">{design.name}</h3>
                  <p className="text-xs text-text-secondary font-mono mt-1 bg-brand-pink/30 w-fit px-2 py-0.5 rounded-full">{design.custom_id}</p>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-3">
                  <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">{design.category}</span>
                  <span className="font-extrabold text-accent text-lg">₹{design.price}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )) : (
          <div className="col-span-full text-center text-text-secondary py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            No designs found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
