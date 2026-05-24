import { supabase } from '@/lib/supabaseClient'
import { Card, CardContent } from '@/components/ui/Card'
import { ReviewForm } from './ReviewForm'
import { Star } from 'lucide-react'

export const revalidate = 60

export default async function ReviewsPage() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Customer Reviews</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Read what our lovely customers have to say about our premium tailoring services.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            Latest Approved Reviews
          </h2>
          
          {reviews?.length > 0 ? reviews.map((review) => (
            <Card key={review.id} className="bg-white">
              <CardContent className="pt-6 flex flex-col gap-4">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-primary italic leading-relaxed">"{review.message}"</p>
                </div>

                {/* Uploaded Images Grid */}
                {review.image_urls && review.image_urls.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {review.image_urls.map((url, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden bg-white border border-gray-100 p-1">
                        <img 
                          src={url} 
                          alt={`Review photo by ${review.name}`} 
                          className="w-full h-auto block object-contain rounded-lg"
                          style={{ imageRendering: 'auto' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <div className="font-bold text-text-primary">— {review.name}</div>
                  <div className="text-xs text-text-secondary mt-0.5">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="text-text-secondary py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              No reviews available yet. Be the first to write one!
            </div>
          )}
        </div>

        {/* Submit Form */}
        <div>
          <ReviewForm />
        </div>
      </div>
    </div>
  )
}
