import { Building2, Shield, TrendingUp } from "lucide-react";

const features = [
  { icon: Building2, text: "50+ Lending Partners" },
  { icon: Shield, text: "All FDIC Insured" },
  { icon: TrendingUp, text: "Competitive Rates" },
];

export const PartnersSection = () => {
  return (
    <section className="pt-10 pb-6 md:pt-12 md:pb-8 bg-muted/30 border-y border-border/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Access to a Broad Network of Lending Partners
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto mb-8">
            We work with established financial institutions to match you with competitive offers.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2.5 text-base text-muted-foreground"
              >
                <feature.icon className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
