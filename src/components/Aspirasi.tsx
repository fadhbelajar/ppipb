import { useState } from "react";
import { useApp } from "../context/AppContext";

const KATEGORI = ["Pendidikan", "Kesehatan", "Infrastruktur", "Ekonomi", "Sosial Budaya"];
const KABUPATEN = ["Manokwari", "Sorong", "Raja Ampat", "Fak-Fak", "Kaimana", "Teluk Bintuni", "Teluk Wondama", "Manokwari Selatan", "Pegunungan Arfak", "Tambrauw", "Maybrat", "Sorong Selatan", "Kota Sorong"];

export default function Aspirasi() {
  const { addAspiration, aspirations, currentUser, siteContent } = useApp();
  const [kategori, setKategori] = useState("Pendidikan");
  const [kabupaten, setKabupaten] = useState("Manokwari");
  const [isi, setIsi] = useState("");
  const [anonim, setAnonim] = useState(false);
  const [nama, setNama] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [success, setSuccess] = useState(false);
  const c = siteContent.aspirasi;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isi.trim() || isi.length < 10) { alert("Isi aspirasi minimal 10 karakter!"); return; }
    addAspiration({ kategori, kabupaten, isi, anonim, nama: anonim ? undefined : nama, email: anonim ? undefined : email });
    setIsi("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section id="aspirasi" className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      <div className="absolute inset-0 bg-cenderawasih opacity-60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-900 rounded-md mb-6">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
              <span className="text-[10px] font-heading font-bold text-white uppercase tracking-[.15em]">{c.label}</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy-900 leading-tight mb-6">
              {c.heading} <span className="text-gradient">{c.highlight}</span> untuk Papua Barat
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              {c.desc}
            </p>

            <div className="space-y-3.5 mb-8">
              {[c.benefit1, c.benefit2, c.benefit3].map(item => (
                <div key={item} className="flex items-center gap-3"><div className="w-7 h-7 bg-emerald-100 rounded-full grid place-items-center flex-shrink-0"><i className="fas fa-check text-emerald-600 text-[10px]"></i></div><span className="text-sm text-gray-700">{item}</span></div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h4 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2"><i className="fas fa-chart-bar text-gold-500"></i> Statistik Aspirasi</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="font-stat text-2xl font-bold text-navy-900">{aspirations.length}</div><div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Masuk</div></div>
                <div><div className="font-stat text-2xl font-bold text-emerald-600">{aspirations.filter(a => a.status !== "masuk").length}</div><div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Ditanggapi</div></div>
                <div><div className="font-stat text-2xl font-bold text-gold-600">89%</div><div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Response</div></div>
              </div>
              <div className="mt-4 space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {aspirations.slice(0, 4).map(a => (
                  <div key={a.id} className="text-xs p-2.5 bg-gray-50 rounded-lg border border-gray-100"><div className="flex items-center gap-2"><span className="font-bold text-navy-900">{a.kategori}</span><span className="px-1.5 py-0.5 bg-gold-100 text-gold-700 rounded text-[9px] font-bold uppercase">{a.kabupaten}</span><span className={`ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${a.status === "masuk" ? "bg-amber-100 text-amber-700" : a.status === "ditanggapi" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{a.status}</span></div><p className="text-gray-600 mt-1 line-clamp-1">"{a.isi}"</p></div>
                ))}
                {aspirations.length === 0 && <p className="text-xs text-gray-400 text-center py-3">Belum ada aspirasi</p>}
              </div>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="150">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold-500/[.04] rounded-bl-[80px]"></div>
              <h3 className="font-heading font-bold text-navy-900 text-lg mb-6"><i className="fas fa-comment-dots text-gold-500 mr-2"></i> Form Aspirasi</h3>

              {success && <div className="mb-5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2"><i className="fas fa-check-circle"></i> Aspirasi berhasil dikirim! Terima kasih atas kontribusi Anda.</div>}

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">Kategori Aspirasi</label>
                  <div className="flex flex-wrap gap-2">
                    {KATEGORI.map(kat => (
                      <button key={kat} type="button" onClick={() => setKategori(kat)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${kategori === kat ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>{kat}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">Asal Kabupaten/Kota</label>
                  <select value={kabupaten} onChange={e => setKabupaten(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 cursor-pointer">
                    {KABUPATEN.map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>

                {!anonim && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Nama</label><input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama Anda" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" /></div>
                    <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" /></div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">Isi Aspirasi Anda *</label>
                  <textarea value={isi} onChange={e => setIsi(e.target.value)} rows={4} placeholder="Tulis aspirasi Anda di sini... minimal 10 karakter" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 resize-none" required></textarea>
                  <p className="text-[11px] text-gray-400 mt-1">{isi.length}/500 karakter {isi.length >= 10 && <span className="text-emerald-600 font-bold">✓ siap kirim</span>}</p>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={anonim} onChange={e => setAnonim(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500" />
                  <span className="text-xs text-gray-500">Kirim sebagai anonim (nama disembunyikan)</span>
                </label>

                <button type="submit" className="w-full py-3.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <i className="fas fa-paper-plane text-xs"></i> {c.ctaText}
                </button>

                <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5"><i className="fas fa-shield-alt text-[10px]"></i> Data Anda aman dan hanya digunakan untuk tindak lanjut aspirasi.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
