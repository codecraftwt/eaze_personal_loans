import step1Image from "@/assets/step1-apply.jpg";
import step2Image from "@/assets/step2-consultant.jpg";
import step3Image from "@/assets/step3-funds.jpg";
import { ArrowRight, FileText, Phone, Banknote, CheckCircle2 } from "lucide-react";

interface ProcessSectionProps {
  onApplyClick: () => void;
}

const steps = [
  {
    number: 1,
    image: step1Image,
    icon: FileText,
    title: "Complete Your Application",
    description: "Fill out our simple online form in just 5 minutes. We only ask for essential information.",
    features: ["No paperwork required", "Mobile-friendly", "Secure & encrypted"],
    color: "hsl(222 83% 53%)",
  },
  {
    number: 2,
    image: step2Image,
    icon: Phone,
    title: "Review Your Offers",
    description: "Speak with a dedicated funding specialist who will walk you through your personalized options.",
    features: ["Multiple offers to compare", "Expert guidance", "No obligation"],
    color: "hsl(152 69% 40%)",
  },
  {
    number: 3,
    image: step3Image,
    icon: Banknote,
    title: "Get Your Funds",
    description: "Once approved, funds are deposited directly into your bank account within days.",
    features: ["Fast disbursement", "Direct deposit", "Track your status"],
    color: "hsl(39 100% 50%)",
  },
];

export const ProcessSection = ({ onApplyClick }: ProcessSectionProps) => {
  return (
    <section id="process" className="py-12 md:py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <div className="section-label">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Simple Process
          </div>
          <h2 className="section-title">
            Three Simple Steps to{" "}
            <span className="gradient-text-gold">Your Funding</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our streamlined process gets you from application to funding faster than traditional lenders.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="relative"
            >
              <div className="glass-card-elevated p-6 h-full group hover:shadow-xl transition-all duration-300">
                {/* Step number */}
                <div className="absolute -top-4 left-6 z-10">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}cc 100%)`,
                      boxShadow: `0 8px 20px -4px ${step.color}40`
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Image */}
                <div className="mt-4 mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex items-start gap-3 mb-5">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-4 border-t border-border/50">
                  {step.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button 
            onClick={onApplyClick} 
            className="group relative overflow-hidden bg-primary text-primary-foreground font-semibold text-sm md:text-base px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ring-4 ring-primary/20 hover:ring-primary/30"
            style={{
              boxShadow: '0 8px 32px -4px hsl(220 70% 25% / 0.4), 0 4px 16px -2px hsl(220 70% 25% / 0.3), 0 0 0 1px hsl(220 70% 40% / 0.1)'
            }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10 flex items-center gap-2">
              Apply Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
          <p className="mt-3 text-sm md:text-base font-medium text-muted-foreground">
            Get pre-approved today
          </p>
        </div>
      </div>
    </section>
  );
};
