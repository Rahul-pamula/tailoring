import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ClientButtons } from './ClientButtons'
import { ImageGallery } from './ImageGallery'

export const revalidate = 60

export default async function DesignDetailPage({ params }) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const { data: design } = await supabase
    .from('designs')
    .select('*')
    .eq('id', id)
    .single()

  if (!design) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link 
          href="/designs" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent font-semibold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collection</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">

        {/* Image Gallery — all images, interactive thumbnails */}
        <div className="w-full md:w-1/2 bg-[#fafafa] p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center">
          <ImageGallery
            imageUrls={design.image_urls || []}
            altText={design.name}
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 bg-brand-pink/50 text-xs font-semibold rounded-full w-fit mb-4 text-gray-800">
            {design.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{design.name}</h1>
          <p className="text-gray-500 mb-6 font-mono bg-gray-50 inline-block px-2 py-1 rounded w-fit text-sm border">
            ID: {design.custom_id}
          </p>
          
          <div className="text-3xl font-bold text-primary mb-8">
            ₹{design.price}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-foreground mb-2">How to order?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Click the button below to send us a WhatsApp message with this design's details. We will assist you with measurements and customization.
            </p>
            <ClientButtons designId={design.id} customId={design.custom_id} name={design.name} />
          </div>
        </div>
      </div>
    </div>
  )
}
