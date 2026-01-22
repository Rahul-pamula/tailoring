import { Phone, MapPin, Clock, Instagram, Facebook, Navigation } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/50 to-background">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            Visit our shop or give us a call. We'd love to discuss your tailoring needs.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone */}
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                        Phone
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Call us for inquiries and appointments
                      </p>
                      <a
                        href="tel:+919849098510"
                        className="text-primary font-medium text-lg hover:underline"
                      >
                        +91 98490 98510
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Alternate: +91 98498 32042
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                        Address
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        Visit our shop for measurements and consultations
                      </p>
                      <address className="not-italic text-foreground">
                        <p className="font-medium">Rajeshwari Tailoring</p>
                        <p>6-5-70/4/A/1, Lokya Thanda Road</p>
                        <p>P S No 227, Maripeda Bangla</p>
                        <p>Maripeda, Mahabubabad, Telangana - 506315</p>
                      </address>
                      <Button variant="outline" className="w-full mt-4 gap-2" asChild>
                        <a
                          href="https://www.google.com/maps/dir/?api=1&destination=17.384453,79.897188"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="h-4 w-4" />
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                        Business Hours
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        We're here to serve you
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-8">
                          <span className="text-foreground">Monday - Saturday</span>
                          <span className="text-muted-foreground">10:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span className="text-foreground">Sunday</span>
                          <span className="text-muted-foreground">10:00 AM - 2:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    Follow Us
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Stay updated with our latest designs and offers
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://wa.me/919849098510"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors w-full justify-center border border-green-200"
                    >
                      <span className="text-sm font-medium">DM us in WhatsApp</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="h-[400px] lg:h-full min-h-[400px] rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.291763734005!2d79.89499931744385!3d17.384453000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA0LjAiTiA3OcKwNTMnNDkuOSJF!5e0!3m2!1sen!2sin!4v1635959562000!5m2!1sen!2sin&q=17.384453,79.897188"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shop Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-card">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Visit our shop today or give us a call. We're excited to bring your vision to life!
          </p>
          <a
            href="tel:+919849098510"
            className="inline-flex items-center gap-2 text-xl font-semibold text-primary hover:underline"
          >
            <Phone className="h-5 w-5" />
            +91 98490 98510
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
