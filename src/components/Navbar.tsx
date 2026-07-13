import { useState, useCallback, useEffect } from "react";
import { useApp } from "../context/AppContext";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda", icon: "fa-home" },
  { href: "#profil", label: "Profil", icon: "fa-building" },
  { href: "#berita", label: "Berita", icon: "fa-newspaper" },
  { href: "#aspirasi", label: "Konten Aspirasi", icon: "fa-comment-dots" },
  { href: "#pengurus", label: "Pengurus", icon: "fa-users" },
  { href: "#kontak", label: "Kontak", icon: "fa-envelope" },
];

type Props = {
  onLogin: () => void;
  onRegister: () => void;
  onDashboard: () => void;
};

export default function Navbar({ onLogin, onRegister, onDashboard }: Props) {
  const { settings, currentUser, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY + 160;
    let currentId = "beranda";
    sections.forEach((sec) => {
      const el = sec as HTMLElement;
      if (scrollY >= el.offsetTop) currentId = sec.id;
    });
    setActiveSection(currentId);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) window.scrollTo({ top: (target as HTMLElement).offsetTop - 76, behavior: "smooth" });
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-lg ethnic-border transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <a href="#beranda" onClick={(e) => handleNavClick(e, "#beranda")} className="flex items-center gap-3 group flex-shrink-0">
            <img src={settings.logo} alt="Logo PPI" className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-500/30 group-hover:ring-gold-500/70 transition-all bg-white" />
            <div className="hidden sm:block leading-tight">
              <span className="block font-heading font-bold text-navy-900 text-[15px]">{settings.siteName}</span>
              <span className="block text-[9.5px] text-gray-400 uppercase tracking-[.12em] font-medium">{settings.subtitle}</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 text-[13px] font-heading transition-colors duration-200 rounded-lg hover:bg-gray-50 ${activeSection === link.href.slice(1) ? "nav-link-active" : "font-medium text-gray-500 hover:text-navy-900"}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2.5">
            {currentUser ? (
              <>
                <button onClick={onDashboard} className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-full text-[13px] font-bold hover:bg-navy-700 transition-colors cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-gold-500 text-navy-900 grid place-items-center text-[11px] font-bold">{currentUser.name.charAt(0)}</div>
                  Dashboard
                </button>
                <button onClick={logout} className="w-9 h-9 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full grid place-items-center transition-colors cursor-pointer" title="Logout"><i className="fas fa-sign-out-alt text-xs"></i></button>
              </>
            ) : (
              <>
                <button onClick={onLogin} className="px-5 py-2.5 text-[13px] font-heading font-bold text-navy-900 bg-white border-2 border-navy-900 hover:bg-navy-900 hover:text-white rounded-full transition-all flex items-center gap-2 cursor-pointer">
                  <i className="fas fa-sign-in-alt text-xs"></i>Login
                </button>
                <button onClick={onRegister} className="px-5 py-2.5 text-[13px] font-heading font-bold text-white bg-navy-900 hover:bg-navy-700 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer">
                  Daftar
                </button>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2.5 -mr-1 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Menu">
            <i className={`${isOpen ? "fas fa-times" : "fas fa-bars"} text-navy-900 text-lg`}></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-5 py-5 space-y-1 mobile-slide">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-heading transition-colors ${activeSection === link.href.slice(1) ? "font-semibold text-navy-900 bg-gold-100" : "font-medium text-gray-500 hover:bg-gray-50"}`}>
                <i className={`fas ${link.icon} w-5 text-center ${activeSection === link.href.slice(1) ? "text-gold-500" : "text-gray-400"}`}></i>
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-navy-900 text-white grid place-items-center font-bold">{currentUser.name.charAt(0)}</div>
                    <div><p className="text-sm font-bold text-navy-900">{currentUser.name}</p><p className="text-[11px] text-gray-500 capitalize">{currentUser.role}</p></div>
                  </div>
                  <button onClick={() => { setIsOpen(false); onDashboard(); }} className="w-full py-3 bg-navy-900 text-white rounded-full text-sm font-bold cursor-pointer">Buka Dashboard</button>
                  <button onClick={() => { setIsOpen(false); logout(); }} className="w-full py-2.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold cursor-pointer">Keluar</button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { setIsOpen(false); onLogin(); }} className="py-3 bg-white border-2 border-navy-900 text-navy-900 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"><i className="fas fa-sign-in-alt text-xs"></i>Login</button>
                  <button onClick={() => { setIsOpen(false); onRegister(); }} className="py-3 bg-navy-900 text-white rounded-full text-sm font-bold cursor-pointer">Daftar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
