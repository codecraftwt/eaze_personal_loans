import { Mail, Phone, Globe, Linkedin, Twitter, Facebook } from "lucide-react";

interface FooterProps {
  onApplyClick: () => void;
}

export const Footer = ({ onApplyClick }: FooterProps) => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">EAZE</h3>
            <p className="text-background/60 mb-6 leading-relaxed text-sm">
              White-glove funding solutions that put your financial success first.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-background/60 text-sm">
              <li>
                <button onClick={onApplyClick} className="hover:text-background transition-colors">
                  Apply Now
                </button>
              </li>
              <li><a href="#process" className="hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Loan Calculator</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Compare Rates</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-background/60 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-background/60 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-background transition-colors">
                  +123-456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <a href="https://www.eazeconsulting.com" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  www.eazeconsulting.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:admin@eazeconsulting.com" className="hover:text-background transition-colors">
                  admin@eazeconsulting.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-background/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} EAZE Consulting. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-background/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background/80 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background/80 transition-colors">FCRA Disclosure</a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-xs text-background/40 text-center mt-8 max-w-4xl mx-auto leading-relaxed">
          EAZE Consulting is a marketing lead generator and is not a lender. Checking your rate generates a soft credit inquiry, 
          which is visible only to you and has no impact on your credit score. If you choose to proceed, each lender is responsible 
          for their own underwriting and determining your final rate and terms.
        </p>
      </div>
    </footer>
  );
};
