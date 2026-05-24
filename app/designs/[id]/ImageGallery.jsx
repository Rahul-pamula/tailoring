'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ImageGallery({ imageUrls = [], altText = '' }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const total = imageUrls.length

  if (total === 0) {
    return (
      <div className="w-full py-24 flex items-center justify-center text-gray-400 bg-gray-50 rounded-2xl text-sm">
        No image available
      </div>
    )
  }

  const goPrev = () => setActiveIdx(i => (i - 1 + total) % total)
  const goNext = () => setActiveIdx(i => (i + 1) % total)

  // Touch Swipe Handlers for mobile users
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      goNext()
    } else if (isRightSwipe) {
      goPrev()
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full select-none">

      {/* ── Outer relative wrapper for arrows to hover outside ── */}
      <div className="relative w-full px-2">
        
        {/* Main image container */}
        <div 
          className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[440px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image wrapper with flex centering */}
          <div className="w-full h-full flex items-center justify-center p-3">
            <img
              key={activeIdx}
              src={imageUrls[activeIdx]}
              alt={`${altText} – photo ${activeIdx + 1}`}
              className="max-w-full max-h-[45vh] object-contain rounded-xl transition-all duration-300 ease-in-out"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>

        {/* Left arrow — placed outside the main container overflow bounds */}
        {total > 1 && (
          <button
            onClick={goPrev}
            type="button"
            aria-label="Previous photo"
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-gray-700 hover:text-accent hover:border-primary/40 active:scale-95 transition-all cursor-pointer hover:shadow-[0_6px_16px_rgba(232,140,154,0.15)] bg-white/95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right arrow */}
        {total > 1 && (
          <button
            onClick={goNext}
            type="button"
            aria-label="Next photo"
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-gray-700 hover:text-accent hover:border-primary/40 active:scale-95 transition-all cursor-pointer hover:shadow-[0_6px_16px_rgba(232,140,154,0.15)] bg-white/95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ── Dot indicators ── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2">
          {imageUrls.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              type="button"
              aria-label={`Go to photo ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx
                  ? 'w-7 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-gray-200 hover:bg-primary/45'
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Clickable thumbnails strip ── */}
      {total > 1 && (
        <div className="flex gap-2.5 justify-center overflow-x-auto pb-1 scrollbar-none">
          {imageUrls.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              type="button"
              aria-label={`View photo ${idx + 1}`}
              className={`w-16 h-16 sm:w-20 sm:h-20 flex-none rounded-xl overflow-hidden border-2 transition-all bg-white p-1 cursor-pointer ${
                idx === activeIdx
                  ? 'border-primary shadow-md shadow-primary/20 scale-105'
                  : 'border-gray-200 hover:border-primary/50 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={url}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
