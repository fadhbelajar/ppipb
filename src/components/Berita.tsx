import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function Berita() {
  const { news, siteContent } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const c = siteContent.berita;
  const published = news.filter(n => n.status === "published");
  const featured = published.find(n => n.featured) || published[0];
  const side = published.filter(n => n.id !== featured?.id).slice(0, 3);
  const more = published.filter(n => n.id !== featured?.id).slice(3);
  const activeNews = selected ? news.find(n => n.id === selected) : null;

  return (
    <section id="berita" className="py-20 lg:py-28 bg-sand relative overflow-hidden">
      <div className="absolute inset-0 bg-ethnic-star opacity-25"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12" data-aos="fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-900 rounded-md mb-3">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
              <span className="text-[10px] font-heading font-bold text-white uppercase tracking-[.15em]">{c.label}</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 mb-2">{c.heading} <span className="text-gradient">{c.highlight}</span></h2>
            <p className="text-gray-500 text-[15px]">{c.desc}</p>
          </div>
          <span className="text-xs text-gray-400 mt-4 sm:mt-0">{published.length} berita terpublikasi • {news.filter(n => n.featured).length} featured</span>
        </div>

        {featured && (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7" data-aos="fade-right">
              <article onClick={() => setSelected(featured.id)} className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 card-lift ethnic-corner group h-full cursor-pointer">
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px] overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover img-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
                    <span className="px-3 py-1.5 bg-gold-500 text-navy-900 text-[10px] font-heading font-bold uppercase tracking-wider rounded-full shadow">Kegiatan Utama</span>
                    <span className="px-3 py-1.5 bg-white/90 text-navy-900 text-[10px] font-heading font-bold uppercase tracking-wider rounded-full shadow">{featured.category}</span>
                    {featured.tags.slice(0,2).map(t => <span key={t} className="px-2.5 py-1 bg-navy-900/80 backdrop-blur text-white text-[9px] font-bold uppercase rounded-full">#{t}</span>)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug mb-3 group-hover:text-gold-300 transition-colors">{featured.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-5 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1.5"><i className="far fa-calendar-alt"></i> {featured.date}</span>
                      <span className="flex items-center gap-1.5"><i className="far fa-eye"></i> {featured.views} Baca</span>
                      <span className="flex items-center gap-1.5"><i className="fas fa-user-edit"></i> {featured.author}</span>
                      <span className="flex items-center gap-1.5"><i className="fas fa-clock"></i> {Math.ceil(featured.content.replace(/<[^>]*>/g, "").length / 1000)} min</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4" data-aos="fade-left" data-aos-delay="150">
              {side.map((item) => (
                <article key={item.id} onClick={() => setSelected(item.id)} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 card-lift group flex h-full cursor-pointer hover:border-gold-200 transition-colors">
                  <div className="relative w-32 sm:w-36 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover img-zoom" />
                    {item.featured && <div className="absolute top-2 left-2 w-5 h-5 bg-gold-500 rounded-full grid place-items-center"><i className="fas fa-star text-[8px] text-navy-900"></i></div>}
                  </div>
                  <div className="p-4 flex flex-col justify-center min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-heading font-bold uppercase tracking-wider rounded w-fit ${item.category === "Pengumuman" ? "bg-navy-900 text-white" : item.category === "Sosial" ? "bg-terakota-500 text-white" : "bg-emerald-600 text-white"}`}>{item.category}</span>
                      {item.tags[0] && <span className="text-[9px] text-gray-400">#{item.tags[0]}</span>}
                    </div>
                    <h4 className="font-heading font-bold text-navy-900 text-sm leading-snug group-hover:text-gold-600 transition-colors mb-2 line-clamp-2">{item.title}</h4>
                    <span className="text-xs text-gray-400 flex items-center gap-1.5"><i className="far fa-calendar-alt"></i> {item.date} • {item.views} views</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {more.length > 0 && (
          <div className="mt-10">
            <h4 className="font-heading font-bold text-navy-900 mb-4 flex items-center gap-2"><i className="fas fa-layer-group text-gold-500 text-sm"></i>Artikel Lainnya</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {more.map(n => (
                <article key={n.id} onClick={() => setSelected(n.id)} className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 card-lift group cursor-pointer hover:shadow-md transition-all">
                  <div className="h-36 overflow-hidden relative"><img src={n.image} alt={n.title} className="w-full h-full object-cover img-zoom" /><span className="absolute top-2 left-2 px-2 py-1 bg-white/90 text-navy-900 text-[9px] font-bold uppercase rounded-full">{n.category}</span></div>
                  <div className="p-4"><h4 className="font-bold text-sm text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors leading-snug">{n.title}</h4><p className="text-[11px] text-gray-400 mt-2 flex items-center gap-2"><span>{n.date}</span><span>•</span><span>{n.tags.slice(0,2).join(", ")}</span></p></div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" onClick={() => setSelected(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="relative h-72 sm:h-80 overflow-hidden rounded-t-2xl flex-shrink-0">
              <img src={activeNews.image} alt={activeNews.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent"></div>
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur hover:bg-white rounded-full grid place-items-center shadow transition-colors cursor-pointer"><i className="fas fa-times text-sm text-navy-900"></i></button>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex gap-2 mb-3 flex-wrap"><span className="px-3 py-1 bg-gold-500 text-navy-900 text-[10px] font-bold uppercase rounded-full">{activeNews.category}</span><span className="px-3 py-1 bg-white/90 text-navy-900 text-[10px] font-bold uppercase rounded-full">{activeNews.date}</span>{activeNews.featured && <span className="px-3 py-1 bg-navy-900 text-white text-[10px] font-bold uppercase rounded-full">Featured</span>}</div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">{activeNews.title}</h2>
                <div className="flex gap-2 mt-3 flex-wrap">{activeNews.tags.map(t => <span key={t} className="px-2.5 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase rounded-full">#{t}</span>)}</div>
              </div>
            </div>
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 pb-6 border-b">
                <span><i className="fas fa-user-edit mr-1.5"></i>{activeNews.author}</span><span><i className="far fa-eye mr-1.5"></i>{activeNews.views} views</span><span><i className="far fa-calendar mr-1.5"></i>{activeNews.date}</span><span><i className="fas fa-link mr-1.5 font-mono"></i>/{activeNews.slug}</span>
              </div>
              <p className="text-[15px] text-gray-700 leading-relaxed mb-6 font-medium border-l-4 border-gold-500 pl-4 py-2 bg-gold-50 rounded-r-lg italic">{activeNews.excerpt}</p>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-navy-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_blockquote]:border-l-4 [&_blockquote]:border-gold-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-gold-50 [&_blockquote]:py-3 [&_blockquote]:rounded-r-xl [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6 [&_img]:rounded-xl [&_a]:text-blue-600 [&_a]:underline" dangerouslySetInnerHTML={{ __html: activeNews.content }}></div>
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3 justify-between items-center">
                <div className="flex gap-2 flex-wrap"><span className="text-xs text-gray-500">Tags:</span>{activeNews.tags.map(t => <span key={t} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#{t}</span>)}</div>
                <div className="flex gap-2">
                  <button onClick={() => setSelected(null)} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">Tutup</button>
                  <button onClick={() => { if (navigator.share) navigator.share({ title: activeNews.title, text: activeNews.excerpt }).catch(()=>{}); else navigator.clipboard.writeText(window.location.href); }} className="px-6 py-2.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer"><i className="fas fa-share-alt text-xs"></i> Bagikan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
