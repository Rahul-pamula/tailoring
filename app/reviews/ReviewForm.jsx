'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { supabase } from '@/lib/supabaseClient'
import { Image as ImageIcon, X } from 'lucide-react'

export function ReviewForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [images, setImages] = useState([]) // { id, file, preview }

  const handleFileChange = (e) => {
    setError(null); setSuccess(null)
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      if (images.length + selectedFiles.length > 2) {
        setError('You can upload a maximum of 2 images.')
        return
      }
      
      const newImages = selectedFiles.map(file => ({
        id: `${Math.random().toString(36).slice(2)}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file)
      }))

      setImages(prev => [...prev, ...newImages])
      e.target.value = ''
    }
  }

  const removeFile = (index) => {
    const newImages = [...images]
    const removed = newImages.splice(index, 1)[0]
    if (removed) URL.revokeObjectURL(removed.preview)
    setImages(newImages)
    
    // Reset file input value if no files are left
    if (newImages.length === 0) {
      const fileInput = document.getElementById('review-file-upload')
      if (fileInput) fileInput.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const message = formData.get('message')

    if (!name || !message) {
      setError('Name and message are required.')
      setLoading(false)
      return
    }

    try {
      const imageUrls = []
      const timestamp = Date.now()

      // Upload review images if selected
      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        const fileExt = img.file.name.split('.').pop() || 'jpg'
        
        // Path format: reviews/<timestamp>/<index>.<ext>
        const filePath = `reviews/${timestamp}/${i}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('reviews-images')
          .upload(filePath, img.file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('reviews-images')
          .getPublicUrl(filePath)

        if (urlData?.publicUrl) {
          imageUrls.push(urlData.publicUrl)
        }
      }

      // Insert record with image_urls array and unapproved status
      const { error: dbError } = await supabase
        .from('reviews')
        .insert([{ 
          name, 
          message, 
          is_approved: false,
          image_urls: imageUrls
        }])

      if (dbError) throw dbError

      setSuccess(true)
      images.forEach(img => URL.revokeObjectURL(img.preview))
      setImages([])
      e.target.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <h3 className="text-2xl font-bold text-text-primary tracking-tight">Share Your Experience</h3>
      
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-medium border border-green-100">
          Thank you for your feedback! Your review will be visible once approved by our team.
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-medium border border-red-100">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Your Name</label>
        <Input name="name" placeholder="E.g. Priya Sharma" required disabled={loading} />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Your Review Message</label>
        <Textarea name="message" rows={4} placeholder="Tell us how you liked our custom stitching..." required disabled={loading} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Upload Images (Optional, Max 2)</label>
        {images.length < 2 && (
          <div className="relative">
            <input 
              id="review-file-upload"
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
            <label 
              htmlFor="review-file-upload"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-brand-pink-dark/30 rounded-xl cursor-pointer hover:bg-brand-pink/20 transition-all font-semibold text-sm text-accent hover:border-primary/50"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Choose Photos</span>
            </label>
          </div>
        )}

        {/* Selected Files Preview List */}
        {images.length > 0 && (
          <div className="flex gap-3 mt-3">
            {images.map((img, idx) => (
              <div key={img.id} className="relative w-16 h-16 bg-white rounded-xl overflow-hidden border border-brand-pink-dark/20 flex items-center justify-center p-1 shadow-sm animate-fade-in">
                <img src={img.preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                <button 
                  type="button" 
                  onClick={() => removeFile(idx)} 
                  className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md active:scale-90 z-10 cursor-pointer"
                  title="Remove photo"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Button type="submit" disabled={loading} className="w-full sm:w-auto py-3.5">
        {loading ? 'Submitting Review...' : 'Submit Review'}
      </Button>
    </form>
  )
}
