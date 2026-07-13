import { useApp } from "../context/AppContext";

export default function Statistik() {
  const { members, news, aspirations, siteContent } = useApp();
  const s = siteContent.statistik;
  const stats = [
    { value: `${members.length.toLocaleString()}`, suffix: "+", label: s.membersLabel, sub: `${aspirations.length} aspirasi • ${members.filter(m => m.status === "verified").length} terverifikasi` },
    { value: "13", suffix: "", label: s.kabupatenLabel },
    { value: `${s.programCount}`, suffix: "+", label: s.programLabel, sub: `${news.length} berita publish` },
    { value: `${s.yearCount}`, suffix: "th", label: s.yearLabel },
  ];
  return (
    <section className="relative -mt-2 z-20 pb-16 lg:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" data-aos="fade-up">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 lg:p-7 text-center shadow-lg hover:shadow-xl border border-gray-100/80 card-lift">
              <div className="font-stat text-3xl lg:text-[2.6rem] font-bold text-navy-900 mb-1 leading-none">
                {stat.value}<span className="text-gold-500 text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-heading font-bold text-gold-600 uppercase tracking-[.14em] mt-2">{stat.label}</div>
              {stat.sub && <div className="mt-2 text-[10px] text-gray-400">{stat.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
