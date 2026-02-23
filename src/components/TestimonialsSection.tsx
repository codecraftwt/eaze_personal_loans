import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "EAZE made the entire process so simple. I was pre-approved within hours and had funds in my account in just 4 days. Their team was incredibly helpful throughout.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "I compared multiple lenders and EAZE got me the best rate. The soft credit pull feature gave me peace of mind while exploring my options. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    role: "Healthcare Professional",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "What impressed me most was the personalized service. My consultant took the time to explain every option and helped me choose what was best for my situation.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-40"
             style={{ background: 'radial-gradient(circle, hsl(222 83% 53% / 0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-40"
             style={{ background: 'radial-gradient(circle, hsl(39 100% 50% / 0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <div className="section-label">
            <Star className="w-4 h-4 fill-current" />
            Customer Stories
          </div>
          <h2 className="section-title">
            Trusted by{" "}
            <span className="gradient-text">Thousands</span>
          </h2>
          <p className="section-subtitle mx-auto">
            See what our customers have to say about their funding experience with EAZE.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 right-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                     style={{ background: 'var(--gradient-gold)' }}>
                  <Quote className="w-4 h-4 text-secondary-foreground" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-5 text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="font-display font-bold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
