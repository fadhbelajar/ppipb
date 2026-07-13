import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

export default function ContentManager() {
  const { siteContent, updateContentSection } = useApp();
  const [activeTab, setActiveTab] = useState<keyof typeof siteContent>("hero");
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState(siteContent);

  useEffect(() => { setLocal(siteContent); }, [siteContent]);

  const save = () => {
    // update all sections
    (Object.keys(local) as (keyof typeof local)[]).forEach(k => {
      updateContentSection(k, local[k] as any);
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => setLocal(siteContent);

  const tabs = [
    { id: "hero" as const, label: "Beranda / Hero", icon: "fa-home" },
    { id: "sambutan" as const, label: "Profil Ketua", icon: "fa-user-tie" },
    { id: "statistik" as const, label: "Statistik", icon: "fa-chart-bar" },
    { id: "pengurus" as const, label: "Pengurus Section", icon: "fa-users" },
    { id: "berita" as const, label: "Berita Section", icon: "fa-newspaper" },
    { id: "aspirasi" as const, label: "Aspirasi Section", icon: "fa-comment-dots" },
    { id: "cta" as const, label: "CTA Akhir", icon: "fa-bullhorn" },
    { id: "footer" as const, label: "Footer", icon: "fa-info-circle" },
  ];

  const field = (label: string, value: string, onChange: (v: string) => void, type: "input" | "textarea" = "input", placeholder?: string) => (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      {type === "input" ? (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500" />
      ) : (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 resize-none" />
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="font-heading font-bold text-navy-900 flex items-center gap-2"><i className="fas fa-edit text-gold-500"></i>Edit Konten Website</h3>
          <p className="text-xs text-gray-500 mt-1">Ubah teks di semua section website tanpa koding. Perubahan langsung tampil di halaman publik.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">Reset</button>
          <button onClick={save} className="px-6 py-2.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer"><i className="fas fa-save"></i> Simpan Semua</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-5">
        {/* Tabs sidebar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 h-fit lg:sticky lg:top-5">
          <div className="space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${activeTab === t.id ? "bg-navy-900 text-white font-bold shadow" : "text-gray-600 hover:bg-gray-50"}`}>
                <i className={`fas ${t.icon} w-5 text-center text-xs`}></i>{t.label}
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gold-50 border border-gold-200 rounded-xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-1">Live Preview</p>
            <p className="text-xs text-gray-600">Setiap perubahan di sini akan langsung update di website publik setelah klik Simpan.</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h4 className="font-heading font-bold text-navy-900 capitalize flex items-center gap-2"><i className={`fas ${tabs.find(t => t.id === activeTab)?.icon} text-gold-500`}></i>{tabs.find(t => t.id === activeTab)?.label}</h4>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">Editable</span>
          </div>
          <div className="p-6 space-y-5">

            {activeTab === "hero" && (
              <>
                {field("Badge Kecil (atas judul)", local.hero.badge, v => setLocal(s => ({ ...s, hero: { ...s.hero, badge: v } })))}
                {field("Judul Baris 1", local.hero.title1, v => setLocal(s => ({ ...s, hero: { ...s.hero, title1: v } })))}
                {field("Judul Highlight (gold gradient)", local.hero.titleHighlight, v => setLocal(s => ({ ...s, hero: { ...s.hero, titleHighlight: v } })))}
                {field("Judul Baris 3", local.hero.title3, v => setLocal(s => ({ ...s, hero: { ...s.hero, title3: v } })))}
                {field("Deskripsi Hero", local.hero.desc, v => setLocal(s => ({ ...s, hero: { ...s.hero, desc: v } })), "textarea")}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Tombol Primary", local.hero.btnPrimary, v => setLocal(s => ({ ...s, hero: { ...s.hero, btnPrimary: v } })))}
                  {field("Tombol Secondary", local.hero.btnSecondary, v => setLocal(s => ({ ...s, hero: { ...s.hero, btnSecondary: v } })))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <input type="checkbox" checked={local.hero.showMembers} onChange={e => setLocal(s => ({ ...s, hero: { ...s.hero, showMembers: e.target.checked } }))} className="w-4 h-4 rounded text-gold-500" />
                  <span className="text-sm font-medium text-gray-700">Tampilkan anggota & foto pengurus di hero</span>
                </label>
              </>
            )}

            {activeTab === "sambutan" && (
              <>
                {field("Label Kecil", local.sambutan.label, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, label: v } })))}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Heading (multi-baris pakai \\n)", local.sambutan.heading, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, heading: v } })), "textarea")}
                  {field("Highlight Heading", local.sambutan.headingHighlight, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, headingHighlight: v } })))}
                </div>
                {field("Paragraf Utama", local.sambutan.paragraph, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, paragraph: v } })), "textarea")}
                {field("Kutipan Ketua (quote)", local.sambutan.quote, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, quote: v } })), "textarea")}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Fitur 1 Judul", local.sambutan.feature1Title, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, feature1Title: v } })))}
                  {field("Fitur 1 Deskripsi", local.sambutan.feature1Desc, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, feature1Desc: v } })))}
                  {field("Fitur 2 Judul", local.sambutan.feature2Title, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, feature2Title: v } })))}
                  {field("Fitur 2 Deskripsi", local.sambutan.feature2Desc, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, feature2Desc: v } })))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Nama Ketua di Foto", local.sambutan.ketuaName, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, ketuaName: v } })))}
                  {field("Jabatan Ketua", local.sambutan.ketuaRole, v => setLocal(s => ({ ...s, sambutan: { ...s.sambutan, ketuaRole: v } })))}
                </div>
              </>
            )}

            {activeTab === "statistik" && (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Label Anggota Aktif", local.statistik.membersLabel, v => setLocal(s => ({ ...s, statistik: { ...s.statistik, membersLabel: v } })))}
                  {field("Label Kabupaten", local.statistik.kabupatenLabel, v => setLocal(s => ({ ...s, statistik: { ...s.statistik, kabupatenLabel: v } })))}
                  {field("Label Program", local.statistik.programLabel, v => setLocal(s => ({ ...s, statistik: { ...s.statistik, programLabel: v } })))}
                  {field("Label Pengabdian", local.statistik.yearLabel, v => setLocal(s => ({ ...s, statistik: { ...s.statistik, yearLabel: v } })))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Jumlah Program (contoh: 250+)", local.statistik.programCount, v => setLocal(s => ({ ...s, statistik: { ...s.statistik, programCount: v } })))}
                  {field("Lama Pengabdian (contoh: 5)", local.statistik.yearCount, v => setLocal(s => ({ ...s, statistik: { ...s.statistik, yearCount: v } })))}
                </div>
                <p className="text-[11px] text-gray-400">* Jumlah Anggota dan Kabupaten otomatis dari data real member, tidak manual.</p>
              </>
            )}

            {activeTab === "pengurus" && (
              <>
                {field("Label Kecil", local.pengurus.label, v => setLocal(s => ({ ...s, pengurus: { ...s.pengurus, label: v } })))}
                {field("Heading", local.pengurus.heading, v => setLocal(s => ({ ...s, pengurus: { ...s.pengurus, heading: v } })))}
                {field("Highlight", local.pengurus.highlight, v => setLocal(s => ({ ...s, pengurus: { ...s.pengurus, highlight: v } })))}
                {field("Deskripsi Section", local.pengurus.desc, v => setLocal(s => ({ ...s, pengurus: { ...s.pengurus, desc: v } })), "textarea")}
              </>
            )}

            {activeTab === "berita" && (
              <>
                {field("Label Section", local.berita.label, v => setLocal(s => ({ ...s, berita: { ...s.berita, label: v } })))}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Heading", local.berita.heading, v => setLocal(s => ({ ...s, berita: { ...s.berita, heading: v } })))}
                  {field("Highlight", local.berita.highlight, v => setLocal(s => ({ ...s, berita: { ...s.berita, highlight: v } })))}
                </div>
                {field("Deskripsi", local.berita.desc, v => setLocal(s => ({ ...s, berita: { ...s.berita, desc: v } })), "textarea")}
              </>
            )}

            {activeTab === "aspirasi" && (
              <>
                {field("Label", local.aspirasi.label, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, label: v } })))}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Heading", local.aspirasi.heading, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, heading: v } })))}
                  {field("Highlight", local.aspirasi.highlight, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, highlight: v } })))}
                </div>
                {field("Deskripsi Panjang", local.aspirasi.desc, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, desc: v } })), "textarea")}
                {field("Keunggulan 1", local.aspirasi.benefit1, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, benefit1: v } })))}
                {field("Keunggulan 2", local.aspirasi.benefit2, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, benefit2: v } })))}
                {field("Keunggulan 3", local.aspirasi.benefit3, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, benefit3: v } })))}
                {field("Teks CTA Button", local.aspirasi.ctaText, v => setLocal(s => ({ ...s, aspirasi: { ...s.aspirasi, ctaText: v } })))}
              </>
            )}

            {activeTab === "cta" && (
              <>
                {field("Badge", local.cta.badge, v => setLocal(s => ({ ...s, cta: { ...s.cta, badge: v } })))}
                {field("Heading Baris 1", local.cta.heading1, v => setLocal(s => ({ ...s, cta: { ...s.cta, heading1: v } })))}
                {field("Heading Highlight", local.cta.headingHighlight, v => setLocal(s => ({ ...s, cta: { ...s.cta, headingHighlight: v } })))}
                {field("Deskripsi CTA", local.cta.desc, v => setLocal(s => ({ ...s, cta: { ...s.cta, desc: v } })), "textarea")}
                <div className="grid sm:grid-cols-2 gap-4">
                  {field("Tombol Primary", local.cta.btnPrimary, v => setLocal(s => ({ ...s, cta: { ...s.cta, btnPrimary: v } })))}
                  {field("Tombol Secondary", local.cta.btnSecondary, v => setLocal(s => ({ ...s, cta: { ...s.cta, btnSecondary: v } })))}
                </div>
              </>
            )}

            {activeTab === "footer" && (
              <>{field("Deskripsi Footer", local.footer.desc, v => setLocal(s => ({ ...s, footer: { ...s.footer, desc: v } })), "textarea")}</>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={save} className="px-6 py-3 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer"><i className="fas fa-check"></i> Simpan Perubahan {tabs.find(t => t.id === activeTab)?.label}</button>
            </div>
          </div>
        </div>
      </div>

      {saved && <div className="fixed bottom-6 right-6 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50"><i className="fas fa-check-circle text-gold-400"></i><span className="text-sm font-medium">Konten website berhasil diperbarui!</span></div>}
    </div>
  );
}
