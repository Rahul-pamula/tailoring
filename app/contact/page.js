import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MapPin, MessageCircle, Clock, User } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 bg-primary/10 text-accent text-xs sm:text-sm font-bold tracking-wider uppercase rounded-full mb-4">
          Visit Our Studio
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">Get In Touch</h1>
        <p className="text-text-secondary max-w-xl mx-auto text-base">
          Have questions about fabrics, custom designs, or measurements? Give us a call or visit our boutique studio.
        </p>
      </div>
      
      <div className="grid md:grid-cols-12 gap-8 mb-16 items-start">
        {/* Owner Card (4 cols) */}
        <div className="md:col-span-4">
          <Card className="bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="aspect-[4/5] w-full bg-brand-pink/10 relative overflow-hidden">
              <img 
                src="/images/owner.jpg" 
                alt="Rajeshwari - Owner of Rajeshwari Tailoring" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="text-center pt-6 pb-8">
              <span className="text-xs text-accent uppercase tracking-widest font-bold bg-brand-pink/50 px-3 py-1 rounded-full">Founder & Master Designer</span>
              <h3 className="text-xl font-bold text-text-primary mt-3">Rajeshwari</h3>
              <p className="text-xs text-text-secondary mt-1">Crafting custom designs with precision for over a decade</p>
              
              <a href="https://wa.me/919849098510" target="_blank" rel="noreferrer" className="block mt-6">
                <Button variant="whatsapp" className="w-full py-3.5 h-auto gap-2 text-sm shadow-md">
                  <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Business Details (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-white border border-gray-100/50">
              <CardContent className="pt-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-accent mt-1 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-text-primary text-base mb-2">Our Studio Address</h4>
                  <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line font-medium mb-3">
                    6-5-70/4/A/1, LOKYA THANDA
                    ROAD P S NO 227, MARIPEDA BANGLA,
                    MARIPEDA, MARIPEDA, MAHABUBABAD,
                    TELANGANA- 506315
                  </p>
                  <a href="https://maps.app.goo.gl/hpHkcVCfXrB69hfB7" target="_blank" rel="noreferrer" className="inline-block">
                    <Button variant="outline" className="px-4 py-2 h-auto text-xs gap-1.5 rounded-full border-brand-pink-dark/40 text-accent hover:bg-brand-pink/40 hover:scale-[1.03] active:scale-[0.98] transition-all">
                      <MapPin className="w-3.5 h-3.5" /> View on Map
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100/50">
              <CardContent className="pt-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-accent mt-1 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-text-primary text-base mb-2">Boutique Hours</h4>
                  <p className="text-text-secondary text-sm leading-relaxed font-medium">
                    <span className="font-semibold text-text-primary">Monday – Sunday:</span><br />
                    10:00 AM – 8:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border border-gray-100/50">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-full text-[#25D366] shrink-0">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-extrabold text-text-primary text-base">Direct Business Hot-line</h4>
                  <p className="text-text-secondary text-sm">Chat with us now to book an appointment or discuss custom sizing</p>
                </div>
              </div>
              <a href="https://wa.me/919849098510" target="_blank" rel="noreferrer" className="shrink-0 w-full sm:w-auto">
                <Button variant="whatsapp" className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20ba59] py-3.5 px-6">
                  <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Interactive Google Map Embed */}
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-[350px] relative">
            <iframe 
              src="https://maps.google.com/maps?q=Maripeda%20Bangla%20Telangana%20506315&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location for Rajeshwari Tailoring"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
