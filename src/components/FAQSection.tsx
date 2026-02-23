import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";

interface FAQSectionProps {
  onApplyClick: () => void;
}

const faqs = [
  {
    question: "Do you have minimum income and credit score requirements to apply?",
    answer: "Yes. Requirements for each lender are different. They each have unique criteria, and current market conditions will play a factor. With that said, keep in mind it is a soft pull to find out whether you may be approved, meaning it won't affect your credit score to review what offers are available for your situation. You have nothing to lose and everything to gain by applying and, once preapproved; you can then determine which option is best for you."
  },
  {
    question: "I submitted my application! Now what?",
    answer: "You'll receive a notification within a few business hours on different offers. You'll then get a chance to speak with an Eaze consulting specialist to find out which offer may be best for you! If you're pre-approved, you'll then be able to go through the official approval process and get funding within a few days."
  },
  {
    question: "I just got some great news! I got pre-approved! What are the chances of me going from pre-approved to getting approved?",
    answer: "Very good! Most of the time, when you're pre-approved, as long as you can verify the income you filled out on your application, you'll be able to get the full pre-approval amount."
  },
  {
    question: "What's the best way to connect with a funding specialist after I've been pre-approved?",
    answer: "After you receive offers, we'll send you a calendar link to book a time that works for you and our number you can call if you have any questions. We'll then go over the best offers to decide which may be the best option for you."
  },
  {
    question: "If I apply for a specific amount and don't qualify for that amount, will I receive offers on any amounts that might be lower?",
    answer: "Absolutely. Let's say you apply for $15k. We'll share with you all the different pre-approvals that you qualify for. You may qualify for $5k, $10k, $12k, and so on! On the application, fill out the amount you would like. If you don't qualify for that amount, we'll share any amounts you do qualify for."
  },
  {
    question: "Does my credit get hit when I apply?",
    answer: "No. We do what's called a \"soft\" pull which means you'll see all the different offers without it affecting your credit score. Once you set up a call with an Eaze consultant on the best funding for you, you'll be able to get the funding then and choose the best option for you! Only after you decide to move forward on the best funding option for you will there be a hard pull by the lender to complete the funding process."
  },
  {
    question: "Once I get the funding and make payments or payoff the loan, does it positively affect my credit score?",
    answer: "Yes. As long as you pay your monthly installments on time and follow all the loan guidelines, you're positively impacting your credit score."
  },
  {
    question: "Once I get the loan and pay it off, can I return and use the funding again to work with the same client?",
    answer: "Yes, as long as your credit is in good standing and you properly followed the loan guidelines. If you have established a relationship with one of our lenders and come back to fund again after paying off your original loan, you'll be able to use our platform again to work with the same client."
  },
  {
    question: "Do we have funding in Canada or internationally?",
    answer: "We're currently funding in the U.S. only! We'll keep you posted once we expand outside the U.S.!"
  },
  {
    question: "I've received the funds! What's next?",
    answer: "That's great, and congrats! Reach out to our client, and they will share with you how to send funds to get started with their program!"
  },
  {
    question: "What happens if I get declined?",
    answer: "Feel free to reach back to our client. They may have some other options for you on how to get started."
  },
  {
    question: "I have a spouse. What's the best way to apply?",
    answer: "Our funding is based on individuals, not spouses. If you'd like your spouse to apply, they would submit their own application. You can then use funding from your spouse to work with our client. You can have your spouse apply through the same application link."
  },
  {
    question: "Which of the 3 credit check bureaus do you use to check credit?",
    answer: "We work with various lending institutions, and they all use different credit bureaus."
  },
  {
    question: "Are there any fees I have to pay Eaze Consulting upon being funded?",
    answer: "No. We work on behalf of our clients, and they pay for our services. In some cases, you may have origination fees with the lender, unrelated to Eaze Consulting. We will let you know any fees or details before you commit."
  },
];

export const FAQSection = ({ onApplyClick }: FAQSectionProps) => {
  return (
    <section id="faq" className="py-8 md:py-10 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left column - Header */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="section-label">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </div>
              <h2 className="section-title">
                Common{" "}
                <span className="gradient-text">Questions</span>
              </h2>
              <p className="section-subtitle mb-6">
                Everything you need to know about getting funded through EAZE. 
                Can't find what you're looking for?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={onApplyClick} 
                  className="group relative overflow-hidden bg-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ring-4 ring-primary/20 hover:ring-primary/30"
                  style={{
                    boxShadow: '0 8px 32px -4px hsl(220 70% 25% / 0.4), 0 4px 16px -2px hsl(220 70% 25% / 0.3), 0 0 0 1px hsl(220 70% 40% / 0.1)'
                  }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10 flex items-center gap-2">
                    Check Your Rate
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button className="btn-ghost hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column - Accordion */}
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="glass-card px-5 border-none data-[state=open]:ring-2 data-[state=open]:ring-accent/20 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5 text-sm [&>svg]:text-accent [&>svg]:w-4 [&>svg]:h-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
