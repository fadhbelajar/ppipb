import { useState } from "react";
import { useApp, PengurusMember } from "../../context/AppContext";

export default function PengurusManager() {
  const { pengurus, addPengurus, updatePengurus, deletePengurus, reorderPengurus } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PengurusMember | null>(null);
  const [form, setForm] = useState({ name: "", role: "", badge: "", badgeGold: true, image: "", instagram: "", linkedin: "", email: "" });
  const [preview, setPreview] = useState("");

  const sorted = [...pengurus].sort((a, b) => a.order - b.order);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { const res = r.result as string; setPreview(res); setForm(fm => ({ ...fm, image: res })); };
    r.readAsDataURL(f);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", role: "", badge: "", badgeGold: false, image: "", instagram: "", linkedin: "", email: "" });
    setPreview("");
    setShowModal(true);
  };
  const openEdit = (p: PengurusMember) => {
    setEditing(p);
    setForm({ name: p.name, role: p.role, badge: p.badge, badgeGold: p.badgeGold, image: p.image, instagram: p.instagram || "", linkedin: p.linkedin || "", email: p.email || "" });
    setPreview(p.image);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) return alert("Nama dan jabatan wajib!");
    if (editing) updatePengurus(editing.id, form);
    else addPengurus(form);
    setShowModal(false);
  };

  const move = (index: number, dir: -1 | 1) => {
    const newList = [...sorted];
    const target = index + dir;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    reorderPengurus(newList);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-navy-900 flex items-center gap-2"><i className="fas fa-users text-gold-500"></i>Kelola Pengurus Inti</h3>
          <p className="text-xs text-gray-500 mt-1">Tambah, edit, hapus, urutkan pengurus. Foto mendukung upload langsung.</p>
        </div>
        <button onClick={openAdd} className="px-5 py-2.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 self-start cursor-pointer"><i className="fas fa-plus text-xs"></i> Tambah Pengurus</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sorted.map((p, idx) => (
          <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-72">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent"></div>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="w-7 h-7 bg-white/90 backdrop-blur rounded-full grid place-items-center text-[11px] font-bold text-navy-900 shadow">{p.order}</span>
                <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow ${p.badgeGold ? "bg-gold-500 text-navy-900" : "bg-white/90 text-navy-900"}`}>{p.badge}</span>
              </div>
              <div className="absolute top-3 right-3 flex gap-1.5">
                <button onClick={() => move(idx, -1)} disabled={idx === 0} className="w-7 h-7 bg-white/90 backdrop-blur rounded-full grid place-items-center shadow disabled:opacity-40 cursor-pointer"><i className="fas fa-chevron-up text-[10px]"></i></button>
                <button onClick={() => move(idx, 1)} disabled={idx === sorted.length - 1} className="w-7 h-7 bg-white/90 backdrop-blur rounded-full grid place-items-center shadow disabled:opacity-40 cursor-pointer"><i className="fas fa-chevron-down text-[10px]"></i></button>
              </div>
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                <button onClick={() => openEdit(p)} className="w-8 h-8 bg-white/90 hover:bg-white rounded-full grid place-items-center shadow cursor-pointer"><i className="fas fa-pen text-[11px] text-navy-900"></i></button>
                <button onClick={() => { if (confirm(`Hapus ${p.name}?`)) deletePengurus(p.id); }} className="w-8 h-8 bg-red-500/90 hover:bg-red-600 text-white rounded-full grid place-items-center shadow cursor-pointer"><i className="fas fa-trash text-[11px]"></i></button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-navy-900 text-sm leading-tight">{p.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{p.role}</p>
              <div className="flex gap-2 mt-3">
                {p.instagram && <a href={p.instagram} target="_blank" className="w-7 h-7 bg-gray-100 hover:bg-navy-900 hover:text-white rounded-lg grid place-items-center transition-colors"><i className="fab fa-instagram text-[11px]"></i></a>}
                {p.linkedin && <a href={p.linkedin} target="_blank" className="w-7 h-7 bg-gray-100 hover:bg-navy-900 hover:text-white rounded-lg grid place-items-center transition-colors"><i className="fab fa-linkedin-in text-[11px]"></i></a>}
                {p.email && <a href={`mailto:${p.email}`} className="w-7 h-7 bg-gray-100 hover:bg-navy-900 hover:text-white rounded-lg grid place-items-center transition-colors"><i className="fas fa-envelope text-[11px]"></i></a>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
              <h3 className="font-bold text-navy-900">{editing ? "Edit Pengurus" : "Tambah Pengurus Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 bg-gray-100 rounded-full grid place-items-center cursor-pointer"><i className="fas fa-times text-xs"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex gap-6 items-start">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-2">Foto Resmi</label>
                  <div className="w-36 h-48 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 relative group">
                    {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover object-top" /> : <div className="w-full h-full grid place-items-center text-gray-400 text-xs flex-col"><i className="fas fa-user text-2xl mb-1"></i>No Photo</div>}
                    <label className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 grid place-items-center text-white cursor-pointer transition-opacity text-center">
                      <div><i className="fas fa-camera mb-1 block"></i><span className="text-[10px] font-bold uppercase">Ganti Foto</span></div>
                      <input type="file" accept="image/*" hidden onChange={handleUpload} />
                    </label>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div><label className="text-[11px] font-bold uppercase text-gray-500">Nama Lengkap *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" placeholder="Fadhlurrahman Anshari, S.Pd" /></div>
                  <div><label className="text-[11px] font-bold uppercase text-gray-500">Jabatan Lengkap *</label><input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" placeholder="Ketua Presidium Pemuda Indonesia Papua Barat" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[11px] font-bold uppercase text-gray-500">Badge Singkat</label><input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className="mt-1 w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Ketua Presidium" /></div>
                    <label className="flex items-center gap-2 p-3 bg-gold-50 border border-gold-200 rounded-xl cursor-pointer mt-5">
                      <input type="checkbox" checked={form.badgeGold} onChange={e => setForm({ ...form, badgeGold: e.target.checked })} className="w-4 h-4 rounded text-gold-500" />
                      <span className="text-xs font-bold text-navy-900">Badge Gold</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="text-[11px] font-bold uppercase text-gray-500">Instagram URL</label><input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} className="mt-1 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="https://instagram.com/..." /></div>
                <div><label className="text-[11px] font-bold uppercase text-gray-500">LinkedIn URL</label><input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} className="mt-1 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="https://linkedin.com/..." /></div>
                <div><label className="text-[11px] font-bold uppercase text-gray-500">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="email@..." /></div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-gray-500">Atau Paste URL Foto</label>
                <input value={form.image} onChange={e => { setForm({ ...form, image: e.target.value }); setPreview(e.target.value); }} className="mt-1 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" placeholder="https://..." />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold cursor-pointer">Batal</button>
                <button type="submit" className="flex-1 py-3 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold cursor-pointer">{editing ? "Update" : "Tambah Pengurus"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
