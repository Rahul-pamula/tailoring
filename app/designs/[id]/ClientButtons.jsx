'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Copy, Check, MessageCircle } from 'lucide-react'

export function ClientButtons({ designId, customId, name }) {
  const [copied, setCopied] = useState(false)
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    setPageUrl(window.location.href)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(customId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappMessage = `Hello Rajeshwari Tailoring, I liked this design.
Name: ${name}
Design ID: ${customId}
Link: ${pageUrl}`

  const whatsappUrl = `https://wa.me/919849098510?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button 
        variant="outline" 
        onClick={handleCopy}
        className="flex-1 gap-2"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied ID' : 'Copy Design ID'}
      </Button>
      
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex-1">
        <Button variant="whatsapp" className="w-full gap-2">
          <MessageCircle className="w-4 h-4 fill-current" /> 
          Chat on WhatsApp
        </Button>
      </a>
    </div>
  )
}
