import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { supabase } from '@/lib/supabaseClient'
import { MessageCircle, Star, MapPin, Clock, ArrowRight } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // 1. Fetch featured designs (latest 3)
  const { data: designs } = await supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  // 2. Fetch latest approved reviews (latest 2)
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(2)

  return (
    <div className="flex flex-col gap-20 pb-20">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#fff7f8] to-[#ffe4e8] py-20 px-4 md:py-24 shadow-[0_10px_30px_rgba(232,140,154,0.06)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-accent text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full mb-6">
            Bespoke Fashion Tailoring
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary tracking-tight mb-6 md:leading-tight">
            Custom Tailoring, <br className="md:hidden" /> Perfected
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
            Discover exquisite custom designs crafted with care. Bring your fashion vision to life with professional tailoring, budget-friendly rates, and simple WhatsApp ordering.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <Link href="/designs" className="w-full sm:w-auto">
              <Button className="w-full sm:px-8 py-4">Browse Collection</Button>
            </Link>
            <a href="https://wa.me/919849098510" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <Button variant="whatsapp" className="w-full sm:w-auto gap-2 sm:px-8 py-4">
                <MessageCircle className="w-5 h-5 fill-current" /> Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Designs Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Featured Creations</h2>
            <p className="text-sm text-text-secondary mt-1">Our latest and most loved custom-stitched styles</p>
          </div>
          <Link href="/designs" className="text-accent font-semibold hover:underline hover:text-primary transition-colors text-sm sm:text-base flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {designs?.length > 0 ? designs.map((design) => (
            <Link key={design.id} href={`/designs/${design.id}`}>
              <Card className="hover:border-primary/30 transition-all duration-200 cursor-pointer group flex flex-col">
                {/* Image — no forced ratio, no overflow clip conflict */}
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
              No designs available yet.
            </div>
          )}
        </div>
      </section>

      {/* Reviews Preview Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Customer Reviews</h2>
            <p className="text-sm text-text-secondary mt-1">Read about the custom stitching experiences of our customers</p>
          </div>
          <Link href="/reviews" className="text-accent font-semibold hover:underline hover:text-primary transition-colors text-sm sm:text-base flex items-center gap-1">
            Read All Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews?.length > 0 ? reviews.map((review) => (
            <Card key={review.id} className="bg-white hover:border-primary/20 transition-all duration-200">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-primary italic leading-relaxed text-sm sm:text-base">"{review.message}"</p>
                </div>

                {/* Attachments */}
                {review.image_urls && review.image_urls.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {review.image_urls.map((url, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden bg-white border border-gray-100 p-1">
                        <img 
                          src={url} 
                          alt="Review attachment" 
                          className="w-full h-auto block object-contain rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <div className="font-bold text-text-primary text-sm sm:text-base">— {review.name}</div>
                  <div className="text-xs text-text-secondary mt-0.5">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full text-center text-text-secondary py-12 bg-white rounded-3xl border border-dashed border-gray-200">
              No reviews available yet. Be the first to share your experience!
            </div>
          )}
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">Our Boutique Studio</h2>
          <p className="text-sm text-text-secondary mt-1">Visit us or get in touch for custom measurements and tailoring consultations</p>
        </div>

        <Card className="bg-white border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="grid md:grid-cols-12">
            {/* Owner Portrait */}
            <div className="md:col-span-4 bg-brand-pink/10 relative overflow-hidden w-full aspect-[4/5] md:aspect-auto md:h-full">
              <img 
                src="/images/owner.jpg" 
                alt="Rajeshwari - Owner" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {/* Quick Details */}
            <CardContent className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-brand-pink/60 text-accent text-xs font-bold rounded-full w-fit">
                  Founder & Master Designer: Rajeshwari
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Rajeshwari Tailoring</h3>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Studio Location</h4>
                      <p className="text-xs text-text-secondary leading-relaxed mt-1 mb-2">
                        6-5-70/4/A/1, LOKYA THANDA ROAD PS 227,<br />
                        MARIPEDA BANGLA, MAHABUBABAD, TELANGANA- 506315
                      </p>
                      <a href="https://maps.app.goo.gl/hpHkcVCfXrB69hfB7" target="_blank" rel="noreferrer" className="inline-block">
                        <Button variant="outline" className="px-3 py-1 h-auto text-[10px] gap-1 rounded-full border-brand-pink-dark/40 text-accent hover:bg-brand-pink/40 hover:scale-[1.03] active:scale-[0.98] transition-all font-semibold">
                          <MapPin className="w-3 h-3" /> View on Map
                        </Button>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">Opening Hours</h4>
                      <p className="text-xs text-text-secondary leading-relaxed mt-1">
                        Monday – Sunday: 10:00 AM – 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div className="text-left w-full sm:w-auto">
                  <p className="text-xs text-text-secondary">Have questions or want to send custom designs?</p>
                  <p className="text-sm font-bold text-text-primary mt-0.5">Let's connect on WhatsApp!</p>
                </div>
                <a href="https://wa.me/919849098510" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                  <Button variant="whatsapp" className="w-full sm:w-auto gap-2">
                    <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </div>
        </Card>
      </section>

      {/* Quality Promise Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-primary to-accent text-white rounded-3xl p-10 md:p-12 text-center shadow-[0_12px_32px_rgba(232,140,154,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
          <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Premium Quality Promise</h2>
          <p className="text-white/95 max-w-xl mx-auto text-base leading-relaxed">
            Every creation is handcrafted with meticulous attention to detail, precision measurements, and high-quality fabrics to deliver an impeccable, boutique-level fit tailored exclusively for you.
          </p>
        </div>
      </section>

    </div>
  )
}
