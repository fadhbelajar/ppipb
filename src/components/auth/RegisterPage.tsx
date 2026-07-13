import { useState } from "react";
import { useApp } from "../../context/AppContext";

type Props = { onBack: () => void; onSwitchLogin: () => void; onSuccess: () => void; };

export default function RegisterPage({ onBack, onSwitchLogin, onSuccess }: Props) {
  const { register, settings } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", kabupaten: "Manokwari" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) { setError("Password minimal 6 karakter"); return; }
    const res = register({ name: form.name, email: form.email, password: form.password }, "anggota");
    if (res.success) onSuccess();
    else setError(res.message || "Gagal daftar");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-body">
      <div className="hidden lg:flex w-[45%] bg-navy-900 relative overflow-hidden flex-col justify-between p-10">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-ethnic-star opacity-20"></div>
        <div className="relative z-10 flex items-center gap-3">
          <img src={settings.logo} alt="logo" className="w-11 h-11 rounded-full object-cover ring-2 ring-gold-500/40" />
          <div className="leading-tight"><p className="font-heading font-bold text-white">{settings.siteName}</p><p className="text-[10px] text-gold-300 uppercase tracking-wider">{settings.subtitle}</p></div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 mb-6"><span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span><span className="text-[10px] font-bold text-gold-300 uppercase tracking-wider">Pendaftaran Anggota</span></div>
          <h1 className="font-heading font-extrabold text-4xl text-white leading-tight mb-4">Bergabunglah<br />Bersama <span className="text-gradient">1200+ Pemuda</span><br />Papua Barat</h1>
          <div className="space-y-3 mt-6">
            {["Verifikasi admin 1x24 jam", "Akses forum & program kerja", "Sertifikat keanggotaan digital"].map(t => (
              <div key={t} className="flex items-center gap-2 text-sm text-gray-300"><div className="w-6 h-6 bg-emerald-500/20 rounded-full grid place-items-center"><i className="fas fa-check text-emerald-400 text-[10px]"></i></div>{t}</div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-[11px] text-gray-500">© 2024 Presidium Pemuda Indonesia Provinsi Papua Barat</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[460px]">
          <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy-900 transition-colors cursor-pointer"><i className="fas fa-arrow-left text-xs"></i> Kembali ke Website</button>
          <div className="mb-6">
            <h2 className="font-heading font-bold text-3xl text-navy-900 mb-2">Daftar Anggota</h2>
            <p className="text-sm text-gray-500">Isi data diri untuk menjadi bagian dari Presidium Pemuda Indonesia Papua Barat.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600"><i className="fas fa-exclamation-circle mr-2"></i>{error}</div>}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Nama Lengkap *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama sesuai KTP" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">No HP</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="08xx-xxxx-xxxx" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Password *</label>
                  <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min 6 karakter" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Kabupaten/Kota</label>
                  <select value={form.kabupaten} onChange={e => setForm({ ...form, kabupaten: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer">
                    {["Manokwari", "Sorong", "Raja Ampat", "Fak-Fak", "Kaimana", "Teluk Bintuni", "Teluk Wondama", "Manokwari Selatan", "Pegunungan Arfak", "Tambrauw", "Maybrat", "Sorong Selatan"].map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500" />
                <span className="text-[11px] text-gray-500 leading-relaxed">Saya menyetujui <a href="#" className="font-bold text-navy-900 underline">Syarat & Ketentuan</a> dan <a href="#" className="font-bold text-navy-900 underline">Kebijakan Privasi</a> Presidium Pemuda Indonesia Papua Barat.</span>
              </label>
              <button type="submit" className="w-full py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer">Daftar Sekarang <i className="fas fa-user-plus ml-2 text-xs"></i></button>
            </form>
            <p className="mt-6 text-center text-xs text-gray-500">Sudah punya akun? <button onClick={onSwitchLogin} className="font-bold text-navy-900 hover:text-gold-600 underline cursor-pointer">Masuk di sini</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}
