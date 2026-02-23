import { CheckCircle, Lock, Shield } from "lucide-react";
import eazeLogo from "@/assets/eaze-consulting-logo.png";

interface HeroSectionProps {
  onApplyClick: () => void;
}

const trustBadges = [
  { icon: Shield, text: "Soft Credit Check" },
  { icon: CheckCircle, text: "Same-Day Decisions" },
  { icon: Lock, text: "Bank-Level Security" },
];

export const HeroSection = ({ onApplyClick }: HeroSectionProps) => {
  return (
    <section className="relative pt-28 pb-8 md:pt-36 md:pb-10 overflow-hidden">
      {/* Layered background - light lavender gradient */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, #fcfbfe 0%, #f8f7fc 50%, #f4f2f9 100%)'
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Static decorative shapes */}
      <div 
        className="absolute top-20 left-[10%] w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(220 70% 50% / 0.12), transparent 70%)' }}
      />
      <div 
        className="absolute top-40 right-[5%] w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(39 100% 50% / 0.1), transparent 70%)' }}
      />
      <div 
        className="absolute bottom-20 left-[20%] w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(152 69% 40% / 0.08), transparent 70%)' }}
      />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-10">
            <img 
              src={eazeLogo} 
              alt="EAZE Consulting" 
              className="h-20 md:h-28 mx-auto mix-blend-multiply dark:mix-blend-normal dark:brightness-0 dark:invert" 
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
            Flexible Funding
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              from $5,000 to $100,000
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-sm md:text-base text-muted-foreground mt-6 mb-10 max-w-lg mx-auto leading-relaxed">
            Get pre-approved same day. Soft credit check only.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center">
            {/* Main CTA Button */}
            <button 
              onClick={onApplyClick} 
              className="group relative overflow-hidden bg-primary text-primary-foreground font-semibold text-lg px-12 py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ring-4 ring-primary/20 hover:ring-primary/30"
              style={{
                boxShadow: '0 8px 32px -4px hsl(220 70% 25% / 0.4), 0 4px 16px -2px hsl(220 70% 25% / 0.3), 0 0 0 1px hsl(220 70% 40% / 0.1)'
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <span>Apply Now</span>
                <span className="text-primary-foreground/70">—</span>
                <span className="text-sm font-normal text-primary-foreground/80">Takes 5 min</span>
              </span>
            </button>
            
            {/* Customer reassurance */}
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-success" />
              <span>No impact to your credit score</span>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-3">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
                ].map((src, i) => (
                  <img 
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="text-foreground font-medium">2,847</span>
                <span className="text-muted-foreground"> people applied this month</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
