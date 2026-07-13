import { useApp } from "../context/AppContext";

export default function Sambutan() {
  const { siteContent, pengurus } = useApp();
  const c = siteContent.sambutan;
  const headingParts = c.heading.split("\n");
  const ketua = pengurus.find(p => p.badgeGold) || pengurus[0];
  const ketuaImg = ketua?.image || "/PPI Fadhel.png";
  return (
    <section id="profil" className="py-20 lg:py-28 bg-sand relative overflow-hidden">
      <div className="absolute inset-0 bg-ethnic-star opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div className="flex justify-center lg:justify-end" data-aos="fade-right" data-aos-duration="900">
            <div className="relative">
              <div className="ethnic-frame">
                <div className="w-[280px] h-[380px] sm:w-[310px] sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                  <img src={ketuaImg} alt={c.ketuaName} className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="absolute -top-5 -right-5 w-14 h-14 bg-gold-500 rounded-2xl flex items-center justify-center shadow-lg rotate-6" style={{ boxShadow: "0 0 20px rgba(200,168,78,.35)" }}>
                <i className="fas fa-quote-right text-navy-900 text-lg"></i>
              </div>
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white rounded-xl px-5 py-3 shadow-xl border border-gray-100 max-w-[260px]">
                <p className="font-heading font-bold text-navy-900 text-sm leading-tight">{c.ketuaName}</p>
                <p className="text-[10px] text-gold-600 font-semibold uppercase tracking-wider mt-1">{c.ketuaRole}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-900 rounded-md mb-6">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
              <span className="text-[10px] font-heading font-bold text-white uppercase tracking-[.15em]">{c.label}</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-navy-900 leading-tight mb-6">
              {headingParts.map((part, i) => (
                <span key={i}>{part}{i < headingParts.length - 1 && <br />}</span>
              ))}
              <span className="text-gradient"> {c.headingHighlight}</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
              {c.paragraph}
            </p>

            <blockquote className="ethnic-quote pl-6 py-3 mb-8">
              <p className="text-navy-700 italic font-medium leading-relaxed text-[15px]">
                "{c.quote}"
              </p>
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm card-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center"><i className="fas fa-handshake text-gold-600 text-sm"></i></div>
                <div><h4 className="font-heading font-bold text-navy-900 text-sm mb-0.5">{c.feature1Title}</h4><p className="text-[12px] text-gray-500 leading-relaxed">{c.feature1Desc}</p></div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm card-lift">
                <div className="flex-shrink-0 w-10 h-10 bg-terakota-500/10 rounded-lg flex items-center justify-center"><i className="fas fa-chart-line text-terakota-500 text-sm"></i></div>
                <div><h4 className="font-heading font-bold text-navy-900 text-sm mb-0.5">{c.feature2Title}</h4><p className="text-[12px] text-gray-500 leading-relaxed">{c.feature2Desc}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
