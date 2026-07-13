import { useState, useMemo } from "react";
import { useApp, NewsItem } from "../../context/AppContext";
import RichEditor from "./RichEditor";

const CATEGORIES = ["Kegiatan Utama", "Pengumuman", "Sosial", "Prestasi", "Pendidikan", "Ekonomi", "Infrastruktur"];

export default function NewsManager() {
  const { news, addNews, updateNews, deleteNews } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "published" | "draft">("Semua");
  const [tab, setTab] = useState<"content" | "media" | "seo">("content");

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Kegiatan Utama",
    image: "",
    featured: false,
    author: "Admin PPI",
    tags: [] as string[],
    status: "published" as "draft" | "published",
    slug: "",
    seoTitle: "",
    seoDesc: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const filtered = useMemo(() => {
    return news.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.category.toLowerCase().includes(search.toLowerCase()) || n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = catFilter === "Semua" || n.category === catFilter;
      const matchStatus = statusFilter === "Semua" || n.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [news, search, catFilter, statusFilter]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setForm(f => ({ ...f, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", excerpt: "", content: "<p>Mulai tulis artikel di sini...</p>", category: "Kegiatan Utama", image: "", featured: false, author: "Admin PPI", tags: [], status: "published", slug: "", seoTitle: "", seoDesc: "" });
    setImagePreview("");
    setTab("content");
    setShowModal(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      image: item.image,
      featured: item.featured,
      author: item.author,
      tags: item.tags || [],
      status: item.status || "published",
      slug: item.slug || generateSlug(item.title),
      seoTitle: item.seoTitle || item.title,
      seoDesc: item.seoDesc || item.excerpt,
    });
    setImagePreview(item.image);
    setTab("content");
    setShowModal(true);
  };

  const handleTitleChange = (title: string) => {
    setForm(f => {
      const autoSlug = generateSlug(title);
      const shouldUpdateSlug = !f.slug || f.slug === generateSlug(f.title) || f.slug === "";
      return {
        ...f,
        title,
        slug: shouldUpdateSlug ? autoSlug : f.slug,
        seoTitle: !f.seoTitle || f.seoTitle === f.title ? title : f.seoTitle,
      };
    });
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (!t || form.tags.includes(t)) { setTagInput(""); return; }
    setForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim()) { alert("Judul dan ringkasan wajib diisi!"); return; }
    if (!form.content.trim() || form.content.replace(/<[^>]*>/g, "").trim().length < 20) { alert("Konten artikel minimal 20 karakter!"); return; }
    if (!form.image) { if (!confirm("Belum upload gambar sampul. Lanjutkan tanpa gambar?")) return; }

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      category: form.category,
      image: form.image || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
      featured: form.featured,
      author: form.author,
      tags: form.tags,
      status: form.status,
      slug: form.slug || generateSlug(form.title),
      seoTitle: form.seoTitle || form.title,
      seoDesc: form.seoDesc || form.excerpt,
    };

    if (editing) updateNews(editing.id, payload);
    else addNews(payload);
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Header controls */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari judul, tag, kategori..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30" />
            </div>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold cursor-pointer focus:outline-none">
              <option>Semua</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold cursor-pointer focus:outline-none">
              <option value="Semua">Semua Status</option><option value="published">Published</option><option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:inline">{filtered.length} artikel • {news.filter(n => n.featured).length} featured • {news.filter(n => n.status === "draft").length} draft</span>
            <button onClick={openAdd} className="px-5 py-2.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"><i className="fas fa-plus text-xs"></i> Tulis Artikel</button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col">
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-navy-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow">{item.category}</span>
                {item.featured && <span className="px-2.5 py-1 bg-gold-500 text-navy-900 text-[10px] font-bold uppercase rounded-full shadow"><i className="fas fa-star mr-1"></i>Featured</span>}
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full shadow ${item.status === "published" ? "bg-emerald-500 text-white" : "bg-amber-400 text-navy-900"}`}>{item.status}</span>
              </div>
              <div className="absolute top-3 right-3 flex gap-1.5">
                <button onClick={() => openEdit(item)} className="w-8 h-8 bg-white/90 backdrop-blur hover:bg-white rounded-full grid place-items-center shadow transition-colors cursor-pointer"><i className="fas fa-pen text-[11px] text-navy-900"></i></button>
                <button onClick={() => { if (confirm(`Hapus artikel \"${item.title}\"?`)) deleteNews(item.id); }} className="w-8 h-8 bg-white/90 backdrop-blur hover:bg-red-500 hover:text-white rounded-full grid place-items-center shadow transition-colors cursor-pointer"><i className="fas fa-trash text-[11px]"></i></button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                <span className="flex items-center gap-1.5"><i className="far fa-calendar"></i> {item.date}</span>
                <span className="flex items-center gap-3"><span><i className="far fa-eye mr-1"></i>{item.views}</span><span className="truncate max-w-[100px]"><i className="fas fa-tag mr-1"></i>{item.tags.slice(0,2).join(", ")}</span></span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-heading font-bold text-navy-900 line-clamp-2 mb-1.5 leading-snug">{item.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2 flex-1">{item.excerpt}</p>
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5"><i className="fas fa-user-edit"></i> {item.author}</span>
                <span className="font-mono text-[10px] truncate max-w-[120px]">/{item.slug}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center"><i className="fas fa-newspaper text-3xl text-gray-300 mb-3 block"></i><p className="text-sm text-gray-500">Tidak ada artikel ditemukan</p><button onClick={openAdd} className="mt-4 px-5 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-bold cursor-pointer">Tulis Artikel Pertama</button></div>}

      {/* Modal CMS */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-[#F8F5F0] rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col my-4">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-heading font-bold text-navy-900 text-lg flex items-center gap-2"><i className="fas fa-feather-alt text-gold-500"></i>{editing ? "Edit Artikel" : "CMS - Tulis Artikel Baru"}</h3>
                <p className="text-[11px] text-gray-500 mt-1">Gunakan editor kaya fitur untuk menulis artikel profesional dengan gambar, link, heading, dan SEO.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border"><i className="fas fa-circle text-emerald-500 text-[7px] animate-pulse"></i>Auto-save draft</div>
                <button onClick={() => setShowModal(false)} className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full grid place-items-center cursor-pointer"><i className="fas fa-times text-sm"></i></button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b px-6 flex gap-6 overflow-x-auto">
              {[
                { id: "content", label: "Konten Artikel", icon: "fa-edit" },
                { id: "media", label: "Media & Pengaturan", icon: "fa-photo-video" },
                { id: "seo", label: "SEO & Publikasi", icon: "fa-search" },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id as any)} className={`py-3.5 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${tab === t.id ? "border-navy-900 text-navy-900" : "border-transparent text-gray-400 hover:text-gray-600"}`}><i className={`fas ${t.icon} text-xs`}></i>{t.label}</button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {tab === "content" && (
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Judul Artikel * <span className="normal-case font-normal text-gray-400">({form.title.length}/100)</span></label>
                        <input value={form.title} onChange={e => handleTitleChange(e.target.value)} maxLength={100} className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[15px] font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500" placeholder="Contoh: Sukses Rakerda PPI 2024..." />
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500"><i className="fas fa-link"></i><span className="font-mono bg-gray-100 px-2 py-1 rounded-full">/{form.slug || "slug-akan-otomatis"}</span></div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Ringkasan / Excerpt * <span className="normal-case font-normal text-gray-400">({form.excerpt.length}/160)</span></label>
                        <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} maxLength={160} rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 resize-none" placeholder="Tulis ringkasan singkat 20-30 kata yang menarik untuk pembaca..." />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">Konten Lengkap * (Rich Editor)</label>
                          <span className="text-[11px] text-gray-400">{form.content.replace(/<[^>]*>/g, "").length} karakter • {Math.ceil(form.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)} menit baca</span>
                        </div>
                        <RichEditor value={form.content} onChange={html => setForm(f => ({ ...f, content: html }))} placeholder="Mulai menulis artikel lengkap di sini... Gunakan toolbar untuk format, gambar, list, quote, dll." />
                        <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5"><i className="fas fa-lightbulb text-gold-500"></i>Tip: Gunakan Heading untuk struktur artikel yang baik untuk SEO.</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <h4 className="font-bold text-navy-900 text-sm mb-3">Preview Ringkas</h4>
                        <div className="rounded-lg overflow-hidden border border-gray-100 mb-3">
                          <div className="h-32 bg-gray-100 relative">
                            {form.image ? <img src={form.image} alt="preview" className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-gray-400 text-xs"><i className="fas fa-image text-xl mb-1"></i><br />No image</div>}
                            <div className="absolute bottom-2 left-2 flex gap-1">
                              <span className="px-2 py-1 bg-navy-900 text-white text-[9px] font-bold uppercase rounded-full">{form.category}</span>
                              {form.featured && <span className="px-2 py-1 bg-gold-500 text-navy-900 text-[9px] font-bold uppercase rounded-full">Featured</span>}
                            </div>
                          </div>
                          <div className="p-3">
                            <h5 className="font-bold text-navy-900 text-sm line-clamp-2 leading-snug">{form.title || "Judul Preview"}</h5>
                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{form.excerpt || "Excerpt preview akan tampil di sini..."}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className={`px-2.5 py-1 rounded-full font-bold uppercase ${form.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{form.status}</span>
                          <span className="text-gray-400">• {form.tags.length} tags</span>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h4 className="font-bold text-amber-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5"><i className="fas fa-magic"></i>Cheklis Publikasi</h4>
                        <ul className="space-y-2 text-xs">
                          <li className={`flex items-center gap-2 ${form.title.length > 10 ? "text-emerald-700" : "text-gray-500"}`}><i className={`fas ${form.title.length > 10 ? "fa-check-circle text-emerald-500" : "fa-circle text-gray-300"} text-[11px]`}></i>Judul menarik &gt;10 karakter</li>
                          <li className={`flex items-center gap-2 ${form.excerpt.length > 20 ? "text-emerald-700" : "text-gray-500"}`}><i className={`fas ${form.excerpt.length > 20 ? "fa-check-circle text-emerald-500" : "fa-circle text-gray-300"} text-[11px]`}></i>Excerpt lengkap</li>
                          <li className={`flex items-center gap-2 ${form.image ? "text-emerald-700" : "text-gray-500"}`}><i className={`fas ${form.image ? "fa-check-circle text-emerald-500" : "fa-circle text-gray-300"} text-[11px]`}></i>Gambar sampul terupload</li>
                          <li className={`flex items-center gap-2 ${form.content.replace(/<[^>]*>/g, "").length > 100 ? "text-emerald-700" : "text-gray-500"}`}><i className={`fas ${form.content.replace(/<[^>]*>/g, "").length > 100 ? "fa-check-circle text-emerald-500" : "fa-circle text-gray-300"} text-[11px]`}></i>Konten &gt;100 karakter</li>
                          <li className={`flex items-center gap-2 ${form.tags.length > 0 ? "text-emerald-700" : "text-gray-500"}`}><i className={`fas ${form.tags.length > 0 ? "fa-check-circle text-emerald-500" : "fa-circle text-gray-300"} text-[11px]`}></i>Minimal 1 tag</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "media" && (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">Gambar Sampul / Cover *</label>
                        <div className="flex gap-4 items-start">
                          <label className="flex-1 border-2 border-dashed border-gray-200 hover:border-gold-400 rounded-xl p-8 text-center cursor-pointer transition-colors group bg-gray-50/50">
                            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                            <i className="fas fa-cloud-upload-alt text-3xl text-gray-300 group-hover:text-gold-500 mb-3 block"></i>
                            <p className="text-sm font-bold text-gray-700">Klik atau Drag untuk upload</p>
                            <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, WEBP max 5MB. Rekomendasi 1200x675px.</p>
                          </label>
                          {imagePreview && (
                            <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 relative group">
                              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                              <button type="button" onClick={() => { setImagePreview(""); setForm(f => ({ ...f, image: "" })); }} className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><i className="fas fa-times text-[10px]"></i></button>
                              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] p-1.5 text-center">Cover Image</div>
                            </div>
                          )}
                        </div>
                        <input value={form.image} onChange={e => { setForm({ ...form, image: e.target.value }); setImagePreview(e.target.value); }} placeholder="Atau paste URL gambar https://..." className="mt-4 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-gold-500" />
                      </div>

                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">Tags / Label (tekan Enter)</label>
                        <div className="flex gap-2 mb-3">
                          <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="ketik tag lalu Enter, contoh: pemuda" className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" />
                          <button type="button" onClick={addTag} className="px-4 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-bold cursor-pointer">+ Tag</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {form.tags.map(t => (
                            <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-100 text-gold-700 rounded-full text-xs font-semibold"><i className="fas fa-tag text-[10px]"></i>{t}<button type="button" onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} className="w-4 h-4 bg-gold-500 text-white rounded-full grid place-items-center hover:bg-red-500 transition-colors cursor-pointer"><i className="fas fa-times text-[8px]"></i></button></span>
                          ))}
                          {form.tags.length === 0 && <span className="text-xs text-gray-400">Belum ada tag. Tambahkan 2-5 tag relevan.</span>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                        <h4 className="font-bold text-navy-900 text-sm">Pengaturan Publikasi</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Kategori</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
                              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
                            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer">
                              <option value="published">Published - Langsung tayang</option><option value="draft">Draft - Simpan dulu</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Penulis / Author</label>
                          <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" placeholder="Nama penulis" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded text-gold-500 focus:ring-gold-500 border-gray-300" />
                            <div><p className="text-sm font-bold text-navy-900">Featured</p><p className="text-[11px] text-gray-500">Tampilkan di hero berita</p></div>
                          </label>
                          <div className="p-3 bg-gold-50 border border-gold-200 rounded-xl">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-700 mb-1">Slug URL</p>
                            <p className="text-xs font-mono text-navy-900 truncate">/{form.slug || generateSlug(form.title) || "contoh-slug"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-navy-900 rounded-xl p-5 text-white">
                        <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><i className="fas fa-info-circle text-gold-400"></i>Tips CMS Editor</h4>
                        <ul className="text-xs text-gray-300 space-y-1.5 list-disc ml-4 leading-relaxed">
                          <li>Gunakan gambar cover dengan rasio 16:9 untuk tampilan optimal.</li>
                          <li>Tambahkan heading H2, H3 agar artikel mudah dibaca & SEO friendly.</li>
                          <li>Sisipkan 3-5 tag yang relevan, jangan terlalu banyak.</li>
                          <li>Gunakan status Draft jika artikel belum siap publish.</li>
                          <li>Featured article akan tampil besar di halaman berita.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "seo" && (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                        <h4 className="font-bold text-navy-900 flex items-center gap-2"><i className="fas fa-search text-gold-500"></i>Optimasi SEO</h4>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Slug URL (otomatis dari judul)</label>
                          <div className="flex gap-2">
                            <span className="px-3 py-3 bg-gray-100 border border-gray-200 rounded-l-xl text-xs text-gray-500 font-mono">ppipapuabarat.id/berita/</span>
                            <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:border-gold-500 font-mono" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">SEO Title ({form.seoTitle.length}/60)</label>
                          <input value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} maxLength={60} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none" placeholder="Judul untuk Google Search" />
                          <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                            <p className="text-[11px] text-gray-400 uppercase font-bold">Preview Google</p>
                            <p className="text-sm text-blue-600 font-medium mt-1 truncate">{form.seoTitle || form.title || "SEO Title Preview"}</p>
                            <p className="text-xs text-green-700 font-mono truncate">https://ppipapuabarat.id/berita/{form.slug}</p>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{form.seoDesc || form.excerpt}</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Meta Description ({form.seoDesc.length}/160)</label>
                          <textarea value={form.seoDesc} onChange={e => setForm({ ...form, seoDesc: e.target.value })} maxLength={160} rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none resize-none" placeholder="Deskripsi singkat untuk search engine..." />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <h4 className="font-bold text-navy-900 text-sm mb-3">Ringkasan Publikasi</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`font-bold ${form.status === "published" ? "text-emerald-600" : "text-amber-600"}`}>{form.status.toUpperCase()}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Kategori</span><span className="font-bold text-navy-900">{form.category}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Penulis</span><span className="font-bold text-navy-900">{form.author}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Karakter Konten</span><span className="font-bold text-navy-900">{form.content.replace(/<[^>]*>/g, "").length}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Estimasi Baca</span><span className="font-bold text-navy-900">{Math.ceil(form.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)} menit</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Tags</span><span className="font-bold text-navy-900">{form.tags.length}</span></div>
                        </div>
                        <div className="mt-5 p-4 bg-gold-50 border border-gold-200 rounded-xl">
                          <p className="text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">Siap Publish?</p>
                          <p className="text-xs text-gray-600">Pastikan semua field wajib terisi, gambar cover terupload, dan konten sudah diperiksa ulang. Artikel published akan langsung tampil di website publik.</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <h4 className="font-bold text-navy-900 text-sm mb-3">Open Graph Preview (Sosmed)</h4>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                          {form.image && <img src={form.image} alt="og" className="w-full h-40 object-cover" />}
                          <div className="p-3">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">PPIPAPUABARAT.ID</p>
                            <p className="font-bold text-navy-900 text-sm mt-1 line-clamp-2">{form.title || "Judul Artikel"}</p>
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">{form.excerpt || "Deskripsi untuk preview media sosial..."}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end flex-shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors cursor-pointer">Batal</button>
                <button type="button" onClick={() => { setForm(f => ({ ...f, status: "draft" })); setTimeout(() => { const formEl = document.querySelector("form"); if (formEl) formEl.requestSubmit(); }, 100); }} className="px-6 py-3 bg-white border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"><i className="fas fa-save mr-2"></i>Simpan Draft</button>
                <button type="submit" className="px-8 py-3 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold shadow-lg transition-colors cursor-pointer"><i className="fas fa-paper-plane mr-2"></i>{editing ? "Update & Publish" : "Publikasikan Artikel"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
