import { useApp } from "../context/AppContext";

export default function Pengurus() {
  const { siteContent, pengurus } = useApp();
  const c = siteContent.pengurus;
  const sorted = [...pengurus].sort((a, b) => a.order - b.order);
  return (
    <section id="pengurus" className="py-20 lg:py-28 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-900 rounded-md mb-4">
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
            <span className="text-[10px] font-heading font-bold text-white uppercase tracking-[.15em]">{c.label}</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 mb-3">{c.heading} <span className="text-gradient">{c.highlight}</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px]">{c.desc}</p>
          <div className="tribal-divider w-20 mx-auto mt-6"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {sorted.map((person, idx) => {
            const isLast = idx === sorted.length - 1 && sorted.length % 3 === 1;
            return (
              <div key={person.id} className={`relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 card-lift ethnic-corner group ${isLast ? "sm:col-span-2 lg:col-span-1 sm:max-w-sm sm:mx-auto lg:max-w-none" : ""}`} data-aos="fade-up" data-aos-delay={(idx + 1) * 100}>
                <div className="relative h-72 overflow-hidden">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top img-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-block px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-wider rounded-full shadow ${person.badgeGold ? "bg-gold-500 text-navy-900" : "bg-white/90 text-navy-900"}`}>{person.badge}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-navy-900 text-[16px] mb-1 leading-snug">{person.name}</h3>
                  <p className="text-[13px] text-gray-500 mb-3">{person.role}</p>
                  <div className="flex gap-2">
                    {person.instagram ? <a href={person.instagram} target="_blank" className="w-8 h-8 bg-gray-100 hover:bg-navy-900 rounded-lg grid place-items-center transition-all group/i cursor-pointer"><i className="fab fa-instagram text-xs text-gray-500 group-hover/i:text-white"></i></a> : <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-navy-900 rounded-lg grid place-items-center transition-all group/i cursor-pointer"><i className="fab fa-instagram text-xs text-gray-500 group-hover/i:text-white"></i></a>}
                    <a href={person.linkedin || "#"} target="_blank" className="w-8 h-8 bg-gray-100 hover:bg-navy-900 rounded-lg grid place-items-center transition-all group/i cursor-pointer"><i className="fab fa-linkedin-in text-xs text-gray-500 group-hover/i:text-white"></i></a>
                    <a href={person.email ? `mailto:${person.email}` : "#"} className="w-8 h-8 bg-gray-100 hover:bg-navy-900 rounded-lg grid place-items-center transition-all group/i cursor-pointer"><i className="fas fa-envelope text-xs text-gray-500 group-hover/i:text-white"></i></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
