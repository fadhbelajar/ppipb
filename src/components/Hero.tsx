import { useApp } from "../context/AppContext";

type Props = {
  onJoin: () => void;
  onLogin: () => void;
  onExplore: () => void;
};

export default function Hero({ onJoin, onLogin, onExplore }: Props) {
  const { settings, siteContent, pengurus } = useApp();
  const c = siteContent.hero;
  return (
    <section id="beranda" className="relative min-h-[88vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-navy-900"></div>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 mountain-silhouette"></div>
      <div className="absolute inset-0 bg-cenderawasih"></div>
      <div className="absolute inset-0 bg-ethnic-star"></div>
      <div className="absolute top-16 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-terakota-500/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/[.08] mb-8" data-aos="fade-down">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-heading font-semibold text-gold-300 uppercase tracking-[.18em]">{c.badge} • {settings.siteName}</span>
          </div>

          <h1 className="font-heading font-extrabold text-[2.6rem] sm:text-5xl lg:text-[3.5rem] text-white leading-[1.13] mb-6" data-aos="fade-up" data-aos-delay="80">
            {c.title1}<br />
            <span className="text-gradient italic">{c.titleHighlight}</span><br className="hidden sm:block" /> {c.title3}
          </h1>

          <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed mb-10" data-aos="fade-up" data-aos-delay="180">
            {c.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="280">
            <button onClick={onJoin} className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-heading font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse-gold cursor-pointer">
              <i className="fas fa-user-plus text-xs"></i> {c.btnPrimary} <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button onClick={onLogin} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-900 hover:bg-gray-100 font-heading font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer">
              <i className="fas fa-sign-in-alt text-xs"></i> Login
            </button>
            <button onClick={onExplore} className="hidden sm:inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 hover:border-white/50 text-white font-heading font-semibold text-sm rounded-full transition-all hover:bg-white/5 cursor-pointer">
              <i className="fas fa-compass text-xs"></i> {c.btnSecondary}
            </button>
          </div>

          {c.showMembers && (
            <div className="mt-12 flex items-center justify-center gap-6" data-aos="fade-up" data-aos-delay="400">
              <img src={settings.logo} alt="logo" className="w-12 h-12 rounded-full bg-white p-1 object-cover shadow-lg" />
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex items-center gap-2 text-left">
                <div className="flex -space-x-2">
                  {pengurus.slice(0,3).map(p => (
                    <img key={p.id} src={p.image} className="w-8 h-8 rounded-full border-2 border-navy-900 object-cover object-top" alt={p.name} />
                  ))}
                </div>
                <div className="text-[11px] leading-tight"><p className="text-white font-bold">1200+ Anggota</p><p className="text-gray-400">Bergabung & Berkarya</p></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block"><path d="M0 90V55C180 20 360 0 600 15C840 30 1080 70 1260 65C1350 62 1400 56 1440 50V90H0Z" fill="#FAF8F5" /></svg>
      </div>
    </section>
  );
}
