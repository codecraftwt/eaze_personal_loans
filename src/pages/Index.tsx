import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { PartnersSection } from "@/components/PartnersSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhiteGloveSection } from "@/components/WhiteGloveSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { ApplicationForm, FormData, initialFormData } from "@/components/ApplicationForm";
import { Shield, Award, Clock, ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
 const [formData, setFormData] = useState<FormData>(initialFormData);
 const [searchParams] = useSearchParams();
 const updateFormData = (field: keyof FormData, value: string | boolean) => {
     setFormData(prev => ({ ...prev, [field]: value }));
   };
  const handleApplyClick = () => {
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
  };

  useEffect(() => {
    // Scroll both #root (mobile) and window
    const root = document.getElementById("root");
    if (root) root.scrollTo(0, 0);
    window.scrollTo(0, 0);


    // console.log(busCode2,'busCode2')
    // const busCode = searchParams.get('buss_code');
    let busCode: any =
      searchParams.get('buss-code') || // Matches your specific URL
      searchParams.get('bus-code') ||  // Matches common hyphen use
      searchParams.get('bus_code') ||
      searchParams.get('buss_code');
    console.log(busCode, 'busCode')

    if (busCode !== null && !formData.businessAccountId) {
      // debugger
      updateFormData('businessAccountId', busCode);
    }
    // else{
    //   busCode = localStorage.getItem('busCode')
    //   updateFormData('businessAccountId', busCode);
    // }
    // console.log(formData,'formData')
    // console.log(formData.businessAccountId,'formData.businessAccountId')
    // Show disclaimer if coming from Apply Now - always show on fresh navigation
    const fromApplyButton = searchParams.get('apply') === 'true';

    // if (fromApplyButton) {
    //   setShowDisclaimer(true);
    // }
  }, [searchParams, formData.businessAccountId, updateFormData]);

  return (
    <div className="min-h-screen bg-background">
      <Header onApplyClick={handleApplyClick} />
      <HeroSection onApplyClick={handleApplyClick} />
      <StatsBar />
      <PartnersSection />
      <BenefitsSection />
      <ProcessSection onApplyClick={handleApplyClick} />
      <TestimonialsSection />
      <WhiteGloveSection onApplyClick={handleApplyClick} />
      <FAQSection onApplyClick={handleApplyClick} />
      
      {/* Final CTA Section */}
      <section className="py-12 md:py-16 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <div className="glass-card-elevated p-10 md:p-14 text-center">
            <h2 className="section-title mb-4">
              Ready to Get{" "}
              <span className="gradient-text-gold">Started</span>?
            </h2>
            <p className="section-subtitle mx-auto mb-8">
              Join over 25,000 satisfied customers who have secured funding through EAZE. 
              Check your rate in minutes with no impact to your credit score.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-3 mb-6">
              <button 
                onClick={handleApplyClick} 
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
              <p className="text-sm md:text-base font-medium text-muted-foreground">
                Get pre-approved today
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>A+ BBB Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Funds in 3-5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onApplyClick={handleApplyClick} />

      {showApplicationForm && (
        <ApplicationForm onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default Index;
