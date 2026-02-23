import { ArrowRight, Heart, ShieldCheck, Headphones, Award, Users, Lock } from "lucide-react";

interface WhiteGloveSectionProps {
  onApplyClick: () => void;
}

const features = [
  {
    icon: ShieldCheck,
    title: "Credit Score Protected",
    description: "Our soft pull technology lets you explore rates without impacting your credit.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Get personalized guidance from our team of funding specialists throughout your journey.",
  },
  {
    icon: Award,
    title: "Best Rate Guarantee",
    description: "We work with multiple lenders to find you the most competitive rate available.",
  },
  {
    icon: Users,
    title: "Trusted Network",
    description: "Access to our vetted network of top-tier lending partners nationwide.",
  },
  {
    icon: Heart,
    title: "Customer-First",
    description: "Your financial wellbeing is our priority. We're here to help, not sell.",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "256-bit encryption and SOC 2 compliance keep your data safe.",
  },
];

export const WhiteGloveSection = ({ onApplyClick }: WhiteGloveSectionProps) => {
  return (
    <section className="py-8 md:py-10 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="glass-card-elevated p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 pointer-events-none"
               style={{ background: 'var(--gradient-radial)' }} />
          
          <div className="relative">
            <div className="text-center mb-10">
              <div className="section-label mx-auto">
                <Heart className="w-4 h-4" />
                White-Glove Service
              </div>
              <h2 className="section-title">
                Experience the{" "}
                <span className="gradient-text">EAZE Difference</span>
              </h2>
              <p className="section-subtitle mx-auto">
                We go beyond just connecting you with lenders. Our white-glove approach 
                ensures you have expert support every step of the way.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-5 rounded-xl transition-all duration-300 hover:bg-accent/5 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-accent/10">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-display font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3">
                <button 
                  onClick={onApplyClick} 
                  className="group relative overflow-hidden bg-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ring-4 ring-primary/20 hover:ring-primary/30"
                  style={{
                    boxShadow: '0 8px 32px -4px hsl(220 70% 25% / 0.4), 0 4px 16px -2px hsl(220 70% 25% / 0.3), 0 0 0 1px hsl(220 70% 40% / 0.1)'
                  }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get Pre-Qualified Now
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
