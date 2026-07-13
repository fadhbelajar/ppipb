import { useApp } from "../context/AppContext";

export default function CTA({ onJoin, onContact }: { onJoin: () => void; onContact: () => void; }) {
  const { siteContent } = useApp();
  const c = siteContent.cta;
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-navy-900"></div>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-ethnic-star"></div>
      <div className="absolute top-0 inset-x-0 asmat-border rotate-180"></div>
      <div className="absolute bottom-0 inset-x-0 asmat-border"></div>
      <div className="absolute top-8 right-8 w-72 h-72 bg-gold-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-8 left-8 w-72 h-72 bg-terakota-500/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="zoom-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/[.08] mb-6">
          <i className="fas fa-star text-gold-400 text-[10px]"></i>
          <span className="text-[10px] font-heading font-semibold text-gold-300 uppercase tracking-[.18em]">{c.badge}</span>
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
          {c.heading1}<br /><span className="text-gradient">{c.headingHighlight}</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {c.desc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onJoin} className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-heading font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse-gold cursor-pointer">
            <i className="fas fa-user-plus text-xs"></i> {c.btnPrimary}
          </button>
          <button onClick={onContact} className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 hover:border-white/50 text-white font-heading font-semibold text-sm rounded-full transition-all hover:bg-white/5 cursor-pointer">
            <i className="fas fa-phone-alt text-xs"></i> {c.btnSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}
