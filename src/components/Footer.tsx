import { useApp } from "../context/AppContext";
import { useState } from "react";

type Props = { onSecretAdmin: () => void; };

export default function Footer({ onSecretAdmin }: Props) {
  const { settings, siteContent } = useApp();
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      onSecretAdmin();
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 2000);
  };

  return (
    <footer id="kontak" className="bg-navy-900 text-white relative overflow-hidden">
      <div className="asmat-border"></div>
      <div className="absolute inset-0 bg-ethnic-star opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={settings.logo} alt="Logo PPI" className="h-11 w-11 rounded-full object-cover ring-2 ring-gold-500/40 bg-white" />
              <div className="leading-tight">
                <span className="block font-heading font-bold text-[15px]">{settings.siteName}</span>
                <span className="block text-[9px] text-gray-400 uppercase tracking-[.12em]">{settings.subtitle}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {siteContent.footer.desc}
            </p>
            <div className="flex gap-2.5">
              {["instagram", "facebook-f", "youtube", "tiktok"].map((soc) => (
                <a key={soc} href="#" className="w-9 h-9 bg-white/[.07] hover:bg-gold-500 rounded-lg grid place-items-center transition-all group cursor-pointer">
                  <i className={`fab fa-${soc} text-sm text-gray-400 group-hover:text-navy-900`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[.14em] text-gold-400 mb-5">Navigasi Cepat</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Tentang Kami", href: "#profil" },
                { label: "Struktur Organisasi", href: "#pengurus" },
                { label: "Pendaftaran Anggota", href: "#beranda" },
                { label: "Galeri Kegiatan", href: "#berita" },
              ].map((item) => (
                <li key={item.label}><a href={item.href} className="text-sm text-gray-400 hover:text-white hover:pl-1.5 transition-all"><i className="fas fa-chevron-right text-[7px] mr-2 text-gold-500/40"></i>{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[.14em] text-gold-400 mb-5">Informasi</h4>
            <ul className="space-y-2.5">
              {["Pusat Bantuan", "Kebijakan Privasi", "Syarat & Ketentuan", "FAQ"].map((item) => (
                <li key={item}><a href="#" className="text-sm text-gray-400 hover:text-white hover:pl-1.5 transition-all"><i className="fas fa-chevron-right text-[7px] mr-2 text-gold-500/40"></i>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[.14em] text-gold-400 mb-5">Alamat Kantor</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              <i className="fas fa-map-marker-alt text-gold-500/50 mr-2"></i>
              {settings.address}
            </p>
            <div className="space-y-2">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[.05] hover:bg-white/[.1] rounded-lg transition-colors">
                <i className="fas fa-phone-alt text-gold-500 text-xs"></i><span className="text-sm text-gray-300">{settings.phone}</span>
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[.05] hover:bg-white/[.1] rounded-lg transition-colors">
                <i className="fas fa-envelope text-gold-500 text-xs"></i><span className="text-sm text-gray-300">{settings.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="tribal-divider w-full mb-6"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500">
            <span onClick={handleSecretClick} className="cursor-pointer select-none hover:text-gold-400 transition-colors" title={clickCount > 0 ? `${3 - clickCount} klik lagi untuk admin` : "Login admin"}>© 2024</span> {settings.siteName}. Seluruh Hak Cipta Dilindungi.
            {clickCount > 0 && <span className="ml-2 text-[10px] text-gold-400/60">• {clickCount}/3 - klik lagi untuk login admin</span>}
          </p>
          <p className="text-[11px] text-gray-600 flex items-center gap-1.5">
            Dibuat dengan <i className="fas fa-heart text-terakota-500 text-[9px] animate-pulse"></i> untuk Papua Barat
          </p>
        </div>
      </div>
    </footer>
  );
}
