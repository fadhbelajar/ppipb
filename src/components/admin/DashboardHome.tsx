import { useApp } from "../../context/AppContext";

export default function DashboardHome({ setActive }: { setActive: (s: string) => void }) {
  const { news, members, aspirations, users, currentUser, siteContent, pengurus } = useApp();

  const stats = [
    { label: "Total Berita", value: news.filter(n => n.status === "published").length, icon: "fa-newspaper", color: "bg-navy-900", change: `${news.filter(n => n.status === "draft").length} draft, +${news.filter(n => n.featured).length} featured`, action: "berita" },
    { label: "Anggota Terdaftar", value: members.length, icon: "fa-users", color: "bg-emerald-600", change: `${members.filter(m => m.status === "pending").length} perlu verifikasi`, action: "anggota" },
    { label: "Aspirasi Masuk", value: aspirations.length, icon: "fa-comment-dots", color: "bg-gold-500 text-navy-900", change: `${aspirations.filter(a => a.status === "masuk").length} belum dibaca`, action: "aspirasi", textDark: true },
    { label: "Total Akun", value: users.length, icon: "fa-user-shield", color: "bg-terakota-500", change: `${pengurus.length} pengurus • sistem aktif`, action: "users" },
  ];

  const quickActions = [
    { id: "content", label: "Edit Konten Website", desc: "Hero, Sambutan, CTA", icon: "fa-edit", color: "bg-gold-500 text-navy-900", roles: ["admin"] },
    { id: "berita", label: "Tulis Artikel (CMS)", desc: "Rich editor + SEO", icon: "fa-feather-alt", color: "bg-navy-900", roles: ["admin", "editor"] },
    { id: "anggota", label: "Verifikasi Anggota", desc: `${members.filter(m => m.status === "pending").length} pending`, icon: "fa-user-check", color: "bg-emerald-600", roles: ["admin"] },
    { id: "pengurus", label: "Kelola Pengurus", desc: "Foto & jabatan", icon: "fa-user-tie", color: "bg-terakota-500", roles: ["admin"] },
    { id: "aspirasi", label: "Balas Aspirasi", desc: "Tanggapi suara pemuda", icon: "fa-reply", color: "bg-blue-600", roles: ["admin", "editor"] },
    { id: "settings", label: "Pengaturan Web", desc: "Logo, warna, kontak", icon: "fa-cog", color: "bg-gray-700", roles: ["admin"] },
  ].filter(a => !currentUser || a.roles.includes(currentUser.role));

  if (currentUser?.role === "anggota") {
    const myMember = members.find(m => m.email.toLowerCase() === currentUser.email.toLowerCase());
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gold-100 grid place-items-center flex-shrink-0">
              <i className="fas fa-user text-gold-600 text-2xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-xl text-navy-900 mb-1">Selamat Datang, {currentUser.name}!</h3>
              <p className="text-sm text-gray-500 mb-4">Status keanggotaan Anda: <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${myMember?.status === "verified" ? "bg-emerald-100 text-emerald-700" : myMember?.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{myMember?.status || "pending"}</span></p>
              {myMember && (
                <div className="grid sm:grid-cols-2 gap-3 text-xs mt-4">
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-gray-400 uppercase font-bold text-[10px]">ID Anggota</p><p className="font-semibold text-navy-900 mt-1 font-mono">{myMember.id}</p></div>
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-gray-400 uppercase font-bold text-[10px]">Kabupaten</p><p className="font-semibold text-navy-900 mt-1">{myMember.kabupaten}</p></div>
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-gray-400 uppercase font-bold text-[10px]">Bergabung</p><p className="font-semibold text-navy-900 mt-1">{myMember.joinDate}</p></div>
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-gray-400 uppercase font-bold text-[10px]">Email</p><p className="font-semibold text-navy-900 mt-1 truncate">{myMember.email}</p></div>
                </div>
              )}
              <div className="mt-6 flex gap-3">
                <div className="px-4 py-2 bg-navy-900 text-white rounded-full text-xs font-bold"><i className="fas fa-id-card mr-1.5"></i>Kartu Anggota Digital Segera Hadir</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-navy-900 to-navy-700 rounded-2xl p-6 text-white">
          <h4 className="font-bold mb-2">Apa yang bisa kamu lakukan?</h4>
          <ul className="text-sm text-gray-300 space-y-1.5 list-disc ml-4">
            <li>Kirim aspirasi untuk pembangunan Papua Barat</li>
            <li>Baca berita & program kerja terbaru</li>
            <li>Ikut serta dalam kegiatan PPI</li>
            <li>Hubungi pengurus untuk informasi keanggotaan</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-navy-900 to-navy-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terakota-500/5 rounded-full blur-[80px]"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-gold-300 text-xs font-bold uppercase tracking-[.15em] mb-2">Dashboard Admin PPI • CMS Aktif</p>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-2">Halo, {currentUser?.name} 👋</h2>
              <p className="text-gray-300 text-sm max-w-xl">Kelola website Presidium Pemuda Indonesia Papua Barat dengan CMS lengkap. Edit konten, tulis artikel dengan Rich Editor, kelola anggota, aspirasi, dan pengaturan.</p>
            </div>
            <div className="hidden lg:block">
              <img src="/PPI.png" alt="logo" className="w-20 h-20 rounded-full bg-white p-1 object-cover shadow-xl ring-4 ring-gold-500/30" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs flex items-center gap-2"><i className="fas fa-shield-alt text-gold-400"></i> Role: <span className="font-bold capitalize">{currentUser?.role}</span></div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-xs"><i className="fas fa-layer-group mr-1.5 text-gold-400"></i>{siteContent.hero.title1} • {pengurus.length} pengurus</div>
            <div className="px-4 py-2 bg-emerald-500/20 backdrop-blur rounded-full text-xs border border-emerald-500/30"><i className="fas fa-check-circle mr-1.5 text-emerald-400"></i> Semua sistem aktif</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${s.color} ${s.textDark ? "" : "text-white"} shadow-sm`}>
                <i className={`fas ${s.icon} text-sm`}></i>
              </div>
              <button onClick={() => setActive(s.action)} className="w-8 h-8 bg-gray-50 group-hover:bg-navy-900 group-hover:text-white rounded-lg grid place-items-center transition-colors cursor-pointer">
                <i className="fas fa-arrow-up-right text-[11px]"></i>
              </button>
            </div>
            <div className="font-heading font-bold text-2xl text-navy-900 mb-1">{s.value}</div>
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{s.label}</div>
            <div className="text-xs text-gray-400">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-heading font-bold text-navy-900 mb-4 flex items-center gap-2"><i className="fas fa-bolt text-gold-500"></i>Aksi Cepat CMS</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map(a => (
            <button key={a.id} onClick={() => setActive(a.id)} className="p-4 rounded-xl border border-gray-100 hover:border-gold-200 hover:bg-gold-50/50 text-left flex items-center gap-3 transition-all group cursor-pointer">
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${a.color} ${a.color.includes("text-") ? "" : "text-white"} shadow-sm group-hover:scale-105 transition-transform`}><i className={`fas ${a.icon} text-sm`}></i></div>
              <div className="min-w-0 flex-1"><p className="font-bold text-sm text-navy-900 group-hover:text-gold-700 transition-colors">{a.label}</p><p className="text-[11px] text-gray-500 truncate">{a.desc}</p></div>
              <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all"></i>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-navy-900">Berita Terbaru (CMS)</h3>
            <button onClick={() => setActive("berita")} className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1.5 cursor-pointer">Kelola CMS <i className="fas fa-arrow-right text-[10px]"></i></button>
          </div>
          <div className="divide-y divide-gray-50">
            {news.slice(0, 5).map(n => (
              <div key={n.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors group">
                <img src={n.image} alt={n.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 bg-navy-900 text-white text-[9px] font-bold uppercase rounded-full">{n.category}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${n.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{n.status}</span>
                    {n.featured && <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-[9px] font-bold uppercase rounded-full">Featured</span>}
                    <span className="text-[11px] text-gray-400">{n.date}</span>
                  </div>
                  <p className="font-semibold text-sm text-navy-900 line-clamp-1 group-hover:text-gold-700 transition-colors">{n.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{n.excerpt}</p>
                </div>
                <div className="text-[11px] text-gray-400 flex flex-col items-end gap-1 flex-shrink-0"><span className="flex items-center gap-1"><i className="far fa-eye"></i>{n.views}</span><span className="text-[10px]">{n.tags.slice(0,1).join("") ? `#${n.tags[0]}` : ""}</span></div>
              </div>
            ))}
            {news.length === 0 && <p className="p-8 text-center text-sm text-gray-400">Belum ada berita</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-navy-900 text-sm">Perlu Verifikasi</h3>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold">{members.filter(m => m.status === "pending").length}</span>
            </div>
            <div className="p-4 space-y-3">
              {members.filter(m => m.status === "pending").slice(0, 4).map(m => (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 grid place-items-center font-bold text-xs flex-shrink-0">{m.name.charAt(0)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-navy-900 truncate">{m.name}</p>
                    <p className="text-[11px] text-gray-500">{m.kabupaten} • {m.id}</p>
                  </div>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                </div>
              ))}
              {members.filter(m => m.status === "pending").length === 0 && <p className="text-xs text-gray-400 text-center py-4">🎉 Semua terverifikasi!</p>}
              <button onClick={() => setActive("anggota")} className="w-full mt-2 py-2 bg-gray-50 hover:bg-navy-900 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer">Kelola Anggota →</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-heading font-bold text-navy-900 text-sm">Aspirasi Terbaru</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">{aspirations.filter(a => a.status === "masuk").length} baru</span>
            </div>
            <div className="p-4 space-y-3">
              {aspirations.slice(0, 3).map(a => (
                <div key={a.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2 py-0.5 bg-navy-900 text-white text-[9px] font-bold uppercase rounded">{a.kategori}</span>
                    <span className="text-[10px] text-gray-400">{a.kabupaten}</span>
                    <span className={`ml-auto px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${a.status === "masuk" ? "bg-amber-100 text-amber-700" : a.status === "ditanggapi" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{a.status}</span>
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">"{a.isi}"</p>
                </div>
              ))}
              <button onClick={() => setActive("aspirasi")} className="w-full py-2 bg-gray-50 hover:bg-navy-900 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer">Kelola Aspirasi →</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-5 text-navy-900">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><i className="fas fa-edit"></i>Edit Konten Website</h4>
            <p className="text-xs opacity-80 leading-relaxed mb-3">Ubah teks Hero, Sambutan, CTA, dan semua section tanpa koding. Perubahan langsung live!</p>
            <button onClick={() => setActive("content")} className="w-full py-2.5 bg-navy-900 text-white hover:bg-navy-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"><i className="fas fa-pen mr-1.5"></i>Buka Editor Konten</button>
          </div>
        </div>
      </div>
    </div>
  );
}
