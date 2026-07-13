import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-full shadow-xl grid place-items-center transition-all duration-300 hover:scale-110 cursor-pointer ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <i className="fas fa-chevron-up text-sm"></i>
    </button>
  );
}
