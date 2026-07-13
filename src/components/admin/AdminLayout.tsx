import { useState } from "react";
import { useApp } from "../../context/AppContext";

type Props = {
  active: string;
  setActive: (s: string) => void;
  onExit: () => void;
  children: React.ReactNode;
};

export default function AdminLayout({ active, setActive, onExit, children }: Props) {
  const { currentUser, settings } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: "fa-chart-pie", roles: ["admin", "editor", "operator", "anggota"] },
    { id: "content", label: "Konten Website", icon: "fa-edit", roles: ["admin"] },
    { id: "berita", label: "Kelola Berita (CMS)", icon: "fa-newspaper", roles: ["admin", "editor", "operator"] },
    { id: "anggota", label: "Data Anggota", icon: "fa-users", roles: ["admin"] },
    { id: "aspirasi", label: "Aspirasi", icon: "fa-comment-dots", roles: ["admin", "editor", "operator"] },
    { id: "pengurus", label: "Pengurus", icon: "fa-user-tie", roles: ["admin"] },
    { id: "users", label: "Kelola Akun", icon: "fa-user-shield", roles: ["admin"] },
    { id: "settings", label: "Pengaturan Web", icon: "fa-cog", roles: ["admin"] },
  ];

  const filtered = menu.filter(m => !currentUser || m.roles.includes(currentUser.role));

  return (
    <div className="min-h-screen bg-[#F6F3EE] flex font-body">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-[76px]" : "w-[280px]"} bg-navy-900 text-white flex flex-col transition-all duration-300 flex-shrink-0 fixed left-0 top-0 bottom-0 z-40`}>
        <div className="p-5 flex items-center gap-3 border-b border-white/10">
          <img src={settings.logo} alt="logo" className="w-10 h-10 rounded-full object-cover ring-2 ring-gold-500/40 flex-shrink-0" />
          {!collapsed && (
            <div className="leading-tight overflow-hidden">
              <p className="font-heading font-bold text-sm truncate">{settings.siteName}</p>
              <p className="text-[10px] text-gold-300 uppercase tracking-wider">Panel Admin</p>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto w-7 h-7 bg-white/10 hover:bg-white/20 rounded-lg grid place-items-center flex-shrink-0 cursor-pointer">
            <i className={`fas ${collapsed ? "fa-chevron-right" : "fa-chevron-left"} text-[10px]`}></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filtered.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${active === m.id ? "bg-gold-500 text-navy-900 font-bold shadow" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
            >
              <i className={`fas ${m.icon} w-5 text-center text-[15px]`}></i>
              {!collapsed && <span className="truncate text-left">{m.label}</span>}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-gold-500 text-navy-900 grid place-items-center font-bold text-sm flex-shrink-0">
              {currentUser?.name.charAt(0) || "A"}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{currentUser?.name}</p>
                <p className="text-[11px] text-gold-400 capitalize">{currentUser?.role}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button onClick={onExit} className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-red-500 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer">
              <i className="fas fa-sign-out-alt"></i> Keluar Website
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ${collapsed ? "ml-[76px]" : "ml-[280px]"}`}>
        {/* Top bar */}
        <div className="h-[64px] bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-bold text-navy-900 text-lg capitalize">{filtered.find(f => f.id === active)?.label || active}</h2>
            <span className="hidden sm:inline-flex px-2.5 py-1 bg-gold-100 text-gold-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
              <i className="fas fa-circle text-[6px] mr-1.5 animate-pulse"></i> Live System
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border">
              <i className="fas fa-calendar"></i> {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <button onClick={onExit} className="w-9 h-9 bg-navy-900 text-white rounded-full grid place-items-center hover:bg-navy-700 transition-colors cursor-pointer">
              <i className="fas fa-home text-xs"></i>
            </button>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
