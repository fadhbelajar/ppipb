import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";

type Props = { onBack: () => void; onSwitchRegister: () => void; onSuccess: () => void; initialRole?: "anggota" | "operator" | "admin" | "editor"; };

export default function LoginPage({ onBack, onSwitchRegister, onSuccess, initialRole }: Props) {
  const { login, settings } = useApp();
  const [role, setRole] = useState<"anggota" | "operator">(
    initialRole === "operator" || initialRole === "editor" ? "operator" : "anggota"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (initialRole === "anggota") { setEmail("anggota@example.com"); setPassword("anggota123"); setRole("anggota"); }
    else if (initialRole === "operator" || initialRole === "editor") { setEmail("operator@ppipapuabarat.id"); setPassword("operator123"); setRole("operator"); }
    else if (initialRole === "admin") { setEmail("admin@ppipapuabarat.id"); setPassword("admin123"); setRole("operator"); }
    else { setEmail("anggota@example.com"); setPassword("anggota123"); }
  }, [initialRole]);

  useEffect(() => {
    if (role === "anggota") { setEmail("anggota@example.com"); setPassword("anggota123"); }
    else { setEmail("operator@ppipapuabarat.id"); setPassword("operator123"); }
    setError("");
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) onSuccess();
    else setError(res.message || "Email atau password salah!");
  };

  const fillAnggota = () => { setRole("anggota"); setEmail("anggota@example.com"); setPassword("anggota123"); setError(""); };
  const fillOperator = () => { setRole("operator"); setEmail("operator@ppipapuabarat.id"); setPassword("operator123"); setError(""); };
  const fillEditor = () => { setRole("operator"); setEmail("editor@ppipapuabarat.id"); setPassword("editor123"); setError(""); };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-body">
      <div className="hidden lg:flex w-[44%] bg-navy-900 relative overflow-hidden flex-col justify-between p-10">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-ethnic-star opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/10 rounded-full blur-[80px]"></div>
        <div className="relative z-10 flex items-center gap-3">
          <img src={settings.logo} alt="logo" className="w-11 h-11 rounded-full object-cover ring-2 ring-gold-500/40 bg-white" />
          <div className="leading-tight"><p className="font-heading font-bold text-white">{settings.siteName}</p><p className="text-[10px] text-gold-300 uppercase tracking-wider">{settings.subtitle}</p></div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 mb-5">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-gold-300 uppercase tracking-[.15em]">{role === "anggota" ? "Portal Anggota" : "Portal Operator"} • Secure Access</span>
          </div>
          <h1 className="font-heading font-extrabold text-[2.6rem] leading-[1.1] text-white mb-4">
            {role === "anggota" ? "Masuk Sebagai" : "Masuk Sebagai"}<br />
            <span className="text-gradient">{role === "anggota" ? "Anggota PPI" : "Operator PPI"}</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed max-w-[340px]">
            {role === "anggota"
              ? "Akses dashboard anggota, kartu digital, riwayat aspirasi, dan informasi kegiatan Presidium Pemuda Indonesia Papua Barat."
              : "Akses CMS berita, edit konten website, kelola aspirasi dan data anggota dengan hak operator & editor."}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img src="/PPI Fadhel.png" alt="f" className="w-9 h-9 rounded-full border-2 border-navy-900 object-cover object-top" />
              <img src="/PPI Hasrul.png" alt="h" className="w-9 h-9 rounded-full border-2 border-navy-900 object-cover object-top" />
              <img src="/PPI James.png" alt="j" className="w-9 h-9 rounded-full border-2 border-navy-900 object-cover object-top" />
            </div>
            <div className="text-[11px] text-gray-400"><p className="font-bold text-white">1200+ Anggota</p><p>Bergabung & berkolaborasi</p></div>
          </div>
        </div>
        <div className="relative z-10 text-[11px] text-gray-500">© 2024 {settings.siteName} • Login aman & terenkripsi</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-[440px]">
          <button onClick={onBack} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy-900 transition-colors cursor-pointer"><i className="fas fa-arrow-left text-xs"></i> Kembali ke Beranda</button>

          <div className="mb-6">
            <h2 className="font-heading font-bold text-3xl text-navy-900 mb-2">Portal Login</h2>
            <p className="text-sm text-gray-500">Satu pintu masuk untuk anggota & operator. Pilih peran Anda.</p>
          </div>

          {/* Role Selector - Single Login with choice */}
          <div className="bg-gray-100 p-1.5 rounded-xl flex gap-1.5 mb-6">
            <button onClick={() => setRole("anggota")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${role === "anggota" ? "bg-navy-900 text-white shadow" : "text-gray-500 hover:text-navy-900"}`}>
              <i className="fas fa-user"></i> Anggota
            </button>
            <button onClick={() => setRole("operator")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${role === "operator" ? "bg-gold-500 text-navy-900 shadow" : "text-gray-500 hover:text-navy-900"}`}>
              <i className="fas fa-user-cog"></i> Operator
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-11 h-11 rounded-xl grid place-items-center ${role === "anggota" ? "bg-navy-900 text-white" : "bg-gold-500 text-navy-900"}`}>
                <i className={`fas ${role === "anggota" ? "fa-user" : "fa-user-cog"}`}></i>
              </div>
              <div>
                <p className="font-bold text-navy-900 text-sm">Login sebagai {role === "anggota" ? "Anggota" : "Operator"}</p>
                <p className="text-[11px] text-gray-500">{role === "anggota" ? "Akses member & aspirasi" : "Akses CMS & manajemen konten"}</p>
              </div>
              <span className={`ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${role === "anggota" ? "bg-emerald-100 text-emerald-700" : "bg-gold-100 text-gold-700"}`}>{role}</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2"><i className="fas fa-exclamation-circle"></i> {error}</div>}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email {role === "anggota" ? "Anggota" : "Operator"}</label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={role === "anggota" ? "anggota@example.com" : "operator@ppipapuabarat.id"} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500" required />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Password</label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500" required />
                </div>
              </div>

              <button type="submit" className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${role === "operator" ? "bg-gold-500 hover:bg-gold-600 text-navy-900" : "bg-navy-900 hover:bg-navy-700 text-white"}`}>
                <i className={`fas ${role === "anggota" ? "fa-sign-in-alt" : "fa-rocket"}`}></i> Masuk sebagai {role === "anggota" ? "Anggota" : "Operator"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <button onClick={() => setShowDemo(!showDemo)} className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <i className="fas fa-key"></i> {showDemo ? "Sembunyikan" : "Lihat"} Akun Demo
              </button>

              {showDemo && (
                <div className="mt-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={fillAnggota} className={`p-3 border rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${role === "anggota" ? "bg-navy-900 border-navy-900 text-white" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                      <div><p className={`text-xs font-bold ${role === "anggota" ? "text-white" : "text-navy-900"}`}>Anggota</p><p className={`text-[11px] font-mono ${role === "anggota" ? "text-gold-300" : "text-gray-500"}`}>anggota123</p></div>
                      <i className="fas fa-user text-xs opacity-60"></i>
                    </button>
                    <button onClick={fillOperator} className={`p-3 border rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${role === "operator" ? "bg-gold-500 border-gold-500 text-navy-900" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                      <div><p className="text-xs font-bold">Operator</p><p className="text-[11px] font-mono opacity-70">operator123</p></div>
                      <i className="fas fa-user-cog text-xs opacity-60"></i>
                    </button>
                  </div>
                  <button onClick={fillEditor} className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer">
                    <div><p className="text-xs font-bold text-navy-900">Editor (alternatif operator)</p><p className="text-[11px] font-mono text-gray-600">editor@ppipapuabarat.id / editor123</p></div>
                    <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase">Editor</span>
                  </button>
                  <div className="p-2.5 bg-gray-900 rounded-xl text-[11px] font-mono text-gray-400">
                    <p className="text-gold-400 font-bold mb-1">Admin hidden → via footer © 2024 klik 3x</p>
                    <p>admin@ppipapuabarat.id / admin123</p>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">Belum punya akun anggota? <button onClick={onSwitchRegister} className="font-bold text-navy-900 hover:text-gold-600 underline cursor-pointer">Daftar di sini</button></p>
          </div>

          <p className="mt-6 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5"><i className="fas fa-shield-alt text-[10px]"></i> Satu login dengan pilihan Anggota / Operator. Data aman & terenkripsi.</p>
        </div>
      </div>
    </div>
  );
}
