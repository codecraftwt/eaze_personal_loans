import { Star } from "lucide-react";

const stats = [
  { value: "$150M+", label: "Funded to date" },
  { value: "50+", label: "Lending partners" },
  { value: "5.0", label: "Customer rating", hasStar: true },
  { value: "24hrs", label: "Average approval" },
];

export const StatsBar = () => {
  return (
    <section className="py-4 md:py-6 bg-[#1e2a47]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center py-1">
              <div className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white flex items-center justify-center gap-0.5">
                {stat.value}
                {stat.hasStar && <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
