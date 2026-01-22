import { Link } from "react-router-dom";
import { Scissors, Instagram, Facebook, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">
                RAJESHWARI TAILORING
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Crafting timeless elegance with every stitch. Your vision, our expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/designs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Design Gallery
              </Link>
              <Link to="/reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Customer Reviews
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-medium text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98490 98510 / +91 98498 32042</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>6-5-70/4/A/1, Lokya Thanda Road<br />P S No 227, Maripeda Bangla<br />Maripeda, Mahabubabad<br />Telangana - 506315</span>
              </div>
            </div>

            {/* Social Icons */}
            {/* WhatsApp Link */}
            <div className="pt-2">
              <a
                href="https://wa.me/919849098510"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-green-600 transition-colors flex items-center gap-2"
              >
                DM us in WhatsApp to 9849098510
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} RAJESHWARI TAILORING. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
