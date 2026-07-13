import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Statistik from "./components/Statistik";
import Sambutan from "./components/Sambutan";
import Pengurus from "./components/Pengurus";
import Berita from "./components/Berita";
import Aspirasi from "./components/Aspirasi";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardHome from "./components/admin/DashboardHome";
import NewsManager from "./components/admin/NewsManager";
import MembersManager from "./components/admin/MembersManager";
import AspirasiManager from "./components/admin/AspirasiManager";
import SettingsManager from "./components/admin/SettingsManager";
import UsersManager from "./components/admin/UsersManager";
import PengurusManager from "./components/admin/PengurusManager";
import ContentManager from "./components/admin/ContentManager";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

import AOS from "aos";
import "aos/dist/aos.css";

type View = "public" | "login" | "register" | "admin";
type LoginRole = "anggota" | "operator" | "admin" | "editor" | undefined;

function PublicSite({ onLogin, onRegister, onDashboard, onSecretAdmin }: { onLogin: () => void; onRegister: () => void; onDashboard: () => void; onSecretAdmin: () => void; }) {
  useEffect(() => {
    AOS.init({ once: true, offset: 60, easing: "ease-out-cubic", duration: 700 });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 76, behavior: "smooth" });
  };

  return (
    <>
      <Navbar onLogin={onLogin} onRegister={onRegister} onDashboard={onDashboard} />
      <div className="h-[68px]"></div>
      <Hero onJoin={onRegister} onLogin={onLogin} onExplore={() => scrollTo("#berita")} />
      <Statistik />
      <Sambutan />
      <Pengurus />
      <Berita />
      <Aspirasi />
      <CTA onJoin={onRegister} onContact={() => scrollTo("#kontak")} />
      <Footer onSecretAdmin={onSecretAdmin} />
      <BackToTop />
    </>
  );
}

function AdminPanel({ onExit }: { onExit: () => void }) {
  const { currentUser } = useApp();
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    if (currentUser?.role === "anggota" && active !== "dashboard") setActive("dashboard");
    if ((currentUser?.role === "editor" || currentUser?.role === "operator") && ["anggota", "users", "settings", "pengurus", "content"].includes(active)) {
      setActive("dashboard");
    }
  }, [currentUser, active]);

  const renderContent = () => {
    switch (active) {
      case "dashboard": return <DashboardHome setActive={setActive} />;
      case "content": return <ContentManager />;
      case "berita": return <NewsManager />;
      case "anggota": return <MembersManager />;
      case "aspirasi": return <AspirasiManager />;
      case "settings": return <SettingsManager />;
      case "users": return <UsersManager />;
      case "pengurus": return <PengurusManager />;
      default: return <DashboardHome setActive={setActive} />;
    }
  };

  return (
    <AdminLayout active={active} setActive={setActive} onExit={onExit}>
      {renderContent()}
    </AdminLayout>
  );
}

function AppContent() {
  const [view, setView] = useState<View>("public");
  const [loginRole, setLoginRole] = useState<LoginRole>(undefined);
  const { currentUser } = useApp();

  useEffect(() => {
    if (view === "admin" && !currentUser) setView("login");
  }, [view, currentUser]);

  const handleLogin = (role?: LoginRole) => {
    setLoginRole(role);
    setView("login");
  };

  const handleLoginSuccess = () => setView("admin");

  const handleSecretAdmin = () => {
    if (currentUser && (currentUser.role === "admin" || currentUser.role === "editor" || currentUser.role === "operator")) {
      setView("admin");
    } else {
      setLoginRole("admin");
      setView("login");
    }
  };

  if (view === "login") {
    return <LoginPage onBack={() => setView("public")} onSwitchRegister={() => setView("register")} onSuccess={handleLoginSuccess} initialRole={loginRole} />;
  }
  if (view === "register") {
    return <RegisterPage onBack={() => setView("public")} onSwitchLogin={() => { setLoginRole("anggota"); setView("login"); }} onSuccess={() => setView("admin")} />;
  }
  if (view === "admin") {
    if (!currentUser) return <LoginPage onBack={() => setView("public")} onSwitchRegister={() => setView("register")} onSuccess={handleLoginSuccess} initialRole={loginRole} />;
    return <AdminPanel onExit={() => setView("public")} />;
  }

  return <PublicSite onLogin={() => handleLogin()} onRegister={() => setView("register")} onDashboard={() => setView("admin")} onSecretAdmin={handleSecretAdmin} />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
