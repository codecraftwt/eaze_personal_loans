import { useState } from "react";
import eazeLogo from "@/assets/eaze-consulting-logo.png";
import { Menu, X, Phone } from "lucide-react";

interface HeaderProps {
  onApplyClick: () => void;
}

export const Header = ({ onApplyClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How It Works", href: "#process" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-12">
            <a href="/" className="flex-shrink-0">
              <img src={eazeLogo} alt="EAZE" className="h-10" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            </nav>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:1-800-123-4567"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              1-800-123-4567
            </a>
            <button onClick={onApplyClick} className="btn-primary py-3 px-6 text-sm">
              Check Your Rate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:1-800-123-4567"
                className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <Phone className="w-4 h-4" />
                1-800-123-4567
              </a>
              <button onClick={() => { onApplyClick(); setIsMobileMenuOpen(false); }} className="btn-primary mt-4">
                Check Your Rate
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
