import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AspirasiManager() {
  const { aspirations, updateAspiration, deleteAspiration } = useApp();
  const [filter, setFilter] = useState<"all" | "masuk" | "ditanggapi" | "selesai">("all");
  const [search, setSearch] = useState("");

  const filtered = aspirations.filter(a => {
    const matchesSearch = `${a.isi} ${a.kabupaten} ${a.kategori}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex gap-2 flex-wrap">
          {[
            { k: "all", label: "Semua" },
            { k: "masuk", label: "Masuk" },
            { k: "ditanggapi", label: "Ditanggapi" },
            { k: "selesai", label: "Selesai" },
          ].map(f => (
            <button key={f.k} onClick={() => setFilter(f.k as any)} className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${filter === f.k ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f.label}</button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari aspirasi..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none" />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-navy-900 text-white text-[10px] font-bold uppercase rounded-full">{a.kategori}</span>
                <span className="px-2.5 py-1 bg-gold-100 text-gold-700 text-[10px] font-bold uppercase rounded-full">{a.kabupaten}</span>
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${a.status === "masuk" ? "bg-amber-100 text-amber-700" : a.status === "ditanggapi" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{a.status}</span>
                {a.anonim && <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-full"><i className="fas fa-user-secret mr-1"></i>Anonim</span>}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span><i className="far fa-calendar mr-1"></i>{a.date}</span>
                <span className="font-mono">{a.id}</span>
              </div>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-4">"{a.isi}"</p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-50">
              <div className="text-xs text-gray-500">
                {a.anonim ? "Dikirim sebagai anonim" : (
                  <><i className="fas fa-user mr-1.5"></i>{a.nama || "-"} • {a.email || "-"}</>
                )}
              </div>
              <div className="flex items-center gap-2">
                <select value={a.status} onChange={e => updateAspiration(a.id, { status: e.target.value as any })} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold cursor-pointer focus:outline-none">
                  <option value="masuk">Masuk</option>
                  <option value="ditanggapi">Ditanggapi</option>
                  <option value="selesai">Selesai</option>
                </select>
                <button onClick={() => { if (confirm("Hapus aspirasi ini?")) deleteAspiration(a.id); }} className="w-7 h-7 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-lg grid place-items-center transition-colors cursor-pointer"><i className="fas fa-trash text-[10px]"></i></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">Tidak ada aspirasi</div>}
      </div>
    </div>
  );
}
