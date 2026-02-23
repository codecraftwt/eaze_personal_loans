import { Check, Sparkles, TrendingUp, Clock, Shield, CreditCard } from "lucide-react";

const benefits = [
  { 
    icon: TrendingUp,
    text: "Rates as low as 5.99% APR",
    description: "Competitive rates based on your profile",
    highlight: true,
    iconBg: "bg-[#3d4670]",
    iconColor: "text-white"
  },
  { 
    icon: Clock,
    text: "Terms from 2-5 years",
    description: "Flexible repayment options",
    highlight: false,
    iconBg: "bg-[#3d4670]",
    iconColor: "text-white"
  },
  { 
    icon: CreditCard,
    text: "No prepayment penalties",
    description: "Pay off anytime without fees",
    highlight: true,
    iconBg: "bg-[#3d4670]",
    iconColor: "text-white"
  },
  { 
    icon: Shield,
    text: "Soft credit check",
    description: "Check rates without hurting your score",
    highlight: true,
    iconBg: "bg-[#3d4670]",
    iconColor: "text-white"
  },
  { 
    icon: Sparkles,
    text: "Pre-approval in hours",
    description: "Know your options quickly",
    highlight: false,
    iconBg: "bg-[#3d4670]",
    iconColor: "text-white"
  },
  { 
    icon: Check,
    text: "Funds in 3-5 days",
    description: "Fast disbursement once approved",
    highlight: false,
    iconBg: "bg-[#3d4670]",
    iconColor: "text-white"
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="section-label">
            <Sparkles className="w-4 h-4" />
            Why Choose EAZE
          </div>
          <h2 className="section-title">
            Benefits That Set Us{" "}
            <span className="gradient-text">Apart</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We've partnered with top lenders to bring you the most competitive rates 
            and flexible terms in the industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-6 h-full"
            >
              <div className="flex items-start gap-4 h-full">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${benefit.iconBg} ${benefit.iconColor}`}>
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-foreground text-base">
                      {benefit.text}
                    </h3>
                    {benefit.highlight && (
                      <span className="flex-shrink-0 text-xs font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/10">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
