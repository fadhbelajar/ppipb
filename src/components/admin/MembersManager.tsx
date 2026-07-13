import { useState } from "react";
import { useApp, Member } from "../../context/AppContext";

export default function MembersManager() {
  const { members, updateMember, deleteMember, addMember } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Member["status"]>("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", kabupaten: "Manokwari", nik: "", alamat: "" });

  const filtered = members.filter(m => {
    const matchesSearch = `${m.name} ${m.email} ${m.kabupaten}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", email: "", phone: "", kabupaten: "Manokwari", nik: "", alamat: "" });
    setShowModal(true);
  };
  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({ name: m.name, email: m.email, phone: m.phone, kabupaten: m.kabupaten, nik: m.nik, alamat: m.alamat });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Nama dan email wajib!");
    if (editing) {
      updateMember(editing.id, form);
    } else {
      addMember(form);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total", value: members.length, color: "bg-navy-900", k: "all" },
          { label: "Terverifikasi", value: members.filter(m => m.status === "verified").length, color: "bg-emerald-600", k: "verified" },
          { label: "Pending", value: members.filter(m => m.status === "pending").length, color: "bg-amber-500", k: "pending" },
          { label: "Ditolak", value: members.filter(m => m.status === "rejected").length, color: "bg-red-500", k: "rejected" },
        ].map(s => (
          <button key={s.label} onClick={() => setFilter(s.k as any)} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${filter === s.k ? "border-navy-900 bg-white shadow-md" : "bg-white border-gray-100 hover:shadow-sm"}`}>
            <div className={`w-8 h-8 rounded-lg ${s.color} text-white grid place-items-center mb-2 text-xs`}><i className="fas fa-users"></i></div>
            <div className="font-bold text-xl text-navy-900">{s.value}</div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-gray-500">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full max-w-sm">
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, email, kabupaten..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30" />
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer"><i className="fas fa-plus text-xs"></i> Tambah Anggota</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-500 text-left">
                <th className="px-5 py-3">Anggota</th>
                <th className="px-5 py-3">Kontak</th>
                <th className="px-5 py-3">Kabupaten</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy-900 text-white grid place-items-center font-bold text-xs flex-shrink-0">{m.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</div>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy-900 truncate">{m.name}</p>
                        <p className="text-[11px] text-gray-500">{m.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-navy-900 text-xs">{m.email}</p>
                    <p className="text-[11px] text-gray-500">{m.phone || "-"}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-700">{m.kabupaten}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${m.status === "verified" ? "bg-emerald-100 text-emerald-700" : m.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{m.status}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{m.joinDate}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      {m.status === "pending" && (
                        <>
                          <button onClick={() => updateMember(m.id, { status: "verified" })} className="w-7 h-7 bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-700 rounded-lg grid place-items-center transition-colors cursor-pointer" title="Verifikasi"><i className="fas fa-check text-[10px]"></i></button>
                          <button onClick={() => updateMember(m.id, { status: "rejected" })} className="w-7 h-7 bg-red-100 hover:bg-red-600 hover:text-white text-red-700 rounded-lg grid place-items-center transition-colors cursor-pointer" title="Tolak"><i className="fas fa-times text-[10px]"></i></button>
                        </>
                      )}
                      {m.status !== "pending" && (
                        <button onClick={() => updateMember(m.id, { status: m.status === "verified" ? "pending" : "verified" })} className="w-7 h-7 bg-gray-100 hover:bg-navy-900 hover:text-white rounded-lg grid place-items-center transition-colors cursor-pointer"><i className={`fas ${m.status === "verified" ? "fa-clock" : "fa-check"} text-[10px]`}></i></button>
                      )}
                      <button onClick={() => openEdit(m)} className="w-7 h-7 bg-gray-100 hover:bg-navy-900 hover:text-white rounded-lg grid place-items-center transition-colors cursor-pointer"><i className="fas fa-pen text-[10px]"></i></button>
                      <button onClick={() => { if (confirm(`Hapus anggota ${m.name}?`)) deleteMember(m.id); }} className="w-7 h-7 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg grid place-items-center transition-colors cursor-pointer"><i className="fas fa-trash text-[10px]"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="p-12 text-center text-gray-400 text-sm">Tidak ada data anggota</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center"><h3 className="font-bold text-navy-900">{editing ? "Edit Anggota" : "Tambah Anggota"}</h3><button onClick={() => setShowModal(false)} className="w-8 h-8 bg-gray-100 rounded-full grid place-items-center cursor-pointer"><i className="fas fa-times text-xs"></i></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-[11px] font-bold uppercase text-gray-500">Nama Lengkap *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500" /></div>
                <div><label className="text-[11px] font-bold uppercase text-gray-500">Email *</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-[11px] font-bold uppercase text-gray-500">No HP</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" /></div>
                <div><label className="text-[11px] font-bold uppercase text-gray-500">NIK</label><input value={form.nik} onChange={e => setForm({ ...form, nik: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" /></div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-gray-500">Kabupaten/Kota</label>
                <select value={form.kabupaten} onChange={e => setForm({ ...form, kabupaten: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer">
                  {["Manokwari", "Sorong", "Raja Ampat", "Fak-Fak", "Kaimana", "Teluk Bintuni", "Teluk Wondama", "Manokwari Selatan", "Pegunungan Arfak", "Tambrauw", "Maybrat", "Sorong Selatan", "Biak"].map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div><label className="text-[11px] font-bold uppercase text-gray-500">Alamat Lengkap</label><textarea value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} rows={2} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none" /></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">Batal</button><button className="flex-1 py-3 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold cursor-pointer">{editing ? "Update" : "Simpan"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
