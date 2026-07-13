import { useState } from "react";
import { useApp, AppUser } from "../../context/AppContext";

export default function UsersManager() {
  const { users, addUser, updateUser, deleteUser, currentUser } = useApp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | AppUser["role"]>("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" as AppUser["role"] });

  const filtered = users.filter(u => {
    const mSearch = `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    const mRole = roleFilter === "all" || u.role === roleFilter;
    return mSearch && mRole;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", email: "", password: "", role: "editor" });
    setShowModal(true);
  };
  const openEdit = (u: AppUser) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: u.password, role: u.role });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return alert("Lengkapi semua field!");
    if (editing) {
      updateUser(editing.id, form);
    } else {
      if (users.some(x => x.email.toLowerCase() === form.email.toLowerCase())) return alert("Email sudah terdaftar!");
      addUser(form);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          {[
            { k: "all", label: "Semua" },
            { k: "admin", label: "Admin" },
            { k: "editor", label: "Editor" },
            { k: "anggota", label: "Anggota" },
          ].map(f => (
            <button key={f.k} onClick={() => setRoleFilter(f.k as any)} className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${roleFilter === f.k ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f.label}</button>
          ))}
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <span className="text-xs text-gray-500">{filtered.length} akun</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari akun..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none" />
          </div>
          <button onClick={openAdd} className="px-5 py-2.5 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer"><i className="fas fa-plus text-xs"></i> Tambah Akun</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-500 text-left">
                <th className="px-5 py-3">Pengguna</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Tanggal Daftar</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full grid place-items-center font-bold text-xs ${u.role === "admin" ? "bg-navy-900 text-white" : u.role === "editor" ? "bg-gold-500 text-navy-900" : "bg-emerald-100 text-emerald-700"}`}>{u.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-navy-900">{u.name} {currentUser?.id === u.id && <span className="text-[10px] bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded-full ml-1">Anda</span>}</p>
                        <p className="text-[11px] text-gray-500 font-mono">{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-700">{u.email}</td>
                  <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.role === "admin" ? "bg-navy-900 text-white" : u.role === "editor" ? "bg-gold-500 text-navy-900" : "bg-emerald-100 text-emerald-700"}`}>{u.role}</span></td>
                  <td className="px-5 py-4 text-xs text-gray-500">{u.createdAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => openEdit(u)} className="w-7 h-7 bg-gray-100 hover:bg-navy-900 hover:text-white rounded-lg grid place-items-center transition-colors cursor-pointer"><i className="fas fa-pen text-[10px]"></i></button>
                      {u.id !== "U1" && (
                        <button onClick={() => { if (confirm(`Hapus akun ${u.name}?`)) deleteUser(u.id); }} className="w-7 h-7 bg-gray-100 hover:bg-red-500 hover:text-white rounded-lg grid place-items-center transition-colors cursor-pointer"><i className="fas fa-trash text-[10px]"></i></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-5 border-b flex justify-between items-center"><h3 className="font-bold text-navy-900">{editing ? "Edit Akun" : "Tambah Akun Baru"}</h3><button onClick={() => setShowModal(false)} className="w-8 h-8 bg-gray-100 rounded-full grid place-items-center cursor-pointer"><i className="fas fa-times text-xs"></i></button></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="text-[11px] font-bold uppercase text-gray-500">Nama Lengkap</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" /></div>
              <div><label className="text-[11px] font-bold uppercase text-gray-500">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" /></div>
              <div><label className="text-[11px] font-bold uppercase text-gray-500">Password</label><input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none font-mono" placeholder="Minimal 6 karakter" /></div>
              <div><label className="text-[11px] font-bold uppercase text-gray-500">Role / Hak Akses</label><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as any })} className="mt-1 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer"><option value="admin">Admin - Akses Penuh</option><option value="editor">Editor - Kelola Berita & Aspirasi</option><option value="anggota">Anggota - Akses Member</option></select></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-semibold cursor-pointer">Batal</button><button className="flex-1 py-3 bg-navy-900 text-white rounded-xl text-sm font-bold cursor-pointer">{editing ? "Update" : "Buat Akun"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
