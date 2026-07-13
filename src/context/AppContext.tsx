import React, { createContext, useContext, useEffect, useState } from "react";

export type SiteSettings = {
  logo: string;
  siteName: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  gold: string;
  navy: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML
  category: string;
  image: string;
  date: string;
  views: number;
  featured: boolean;
  author: string;
  tags: string[];
  status: "draft" | "published";
  slug: string;
  seoTitle: string;
  seoDesc: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  kabupaten: string;
  status: "pending" | "verified" | "rejected";
  joinDate: string;
  nik: string;
  alamat: string;
};

export type Aspiration = {
  id: string;
  kategori: string;
  kabupaten: string;
  isi: string;
  anonim: boolean;
  nama?: string;
  email?: string;
  status: "masuk" | "ditanggapi" | "selesai";
  date: string;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "operator" | "anggota";
  avatar?: string;
  createdAt: string;
};

export type PengurusMember = {
  id: string;
  name: string;
  role: string;
  badge: string;
  badgeGold: boolean;
  image: string;
  instagram?: string;
  linkedin?: string;
  email?: string;
  order: number;
};

export type SiteContent = {
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title3: string;
    desc: string;
    btnPrimary: string;
    btnSecondary: string;
    showMembers: boolean;
  };
  sambutan: {
    label: string;
    heading: string;
    headingHighlight: string;
    paragraph: string;
    quote: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    ketuaName: string;
    ketuaRole: string;
  };
  statistik: {
    membersLabel: string;
    kabupatenLabel: string;
    programLabel: string;
    yearLabel: string;
    programCount: string;
    yearCount: string;
  };
  berita: {
    label: string;
    heading: string;
    highlight: string;
    desc: string;
  };
  aspirasi: {
    label: string;
    heading: string;
    highlight: string;
    desc: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    ctaText: string;
  };
  pengurus: {
    label: string;
    heading: string;
    highlight: string;
    desc: string;
  };
  cta: {
    badge: string;
    heading1: string;
    headingHighlight: string;
    desc: string;
    btnPrimary: string;
    btnSecondary: string;
  };
  footer: {
    desc: string;
  };
};

const DEFAULT_SETTINGS: SiteSettings = {
  logo: "/PPI.png",
  siteName: "Presidium Pemuda Indonesia",
  subtitle: "Papua Barat",
  address: "Jl. Siliwangi No. 12, Manokwari Barat, Kabupaten Manokwari, Papua Barat 98312",
  phone: "+62 (980) 271-xxxx",
  email: "info@ppipapuabarat.id",
  gold: "#C8A84E",
  navy: "#0F1B2D",
};

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Terpercaya Sejak 2019",
    title1: "Bersatu Membangun",
    titleHighlight: "Pemuda Papua Barat",
    title3: "yang Berintegritas",
    desc: "Wadah pengabdian bagi Presidium Pemuda Indonesia Provinsi Papua Barat dalam mencetak kader pemimpin bangsa yang berjiwa Pancasila.",
    btnPrimary: "Gabung Anggota",
    btnSecondary: "Jelajahi Program",
    showMembers: true,
  },
  sambutan: {
    label: "Sambutan Ketua Presidium",
    heading: "Melangkah Bersama\nMenuju Masa Depan\n yang",
    headingHighlight: "Gemilang",
    paragraph: "Presidium Pemuda Indonesia Papua Barat merupakan wadah perjuangan dan pengabdian bagi para putra-putri terbaik daerah yang telah menunaikan tugas suci sebagai pengabdi bangsa.",
    quote: "Kami berkomitmen untuk terus membina karakter pemuda Papua Barat yang tidak hanya unggul secara intelektual, namun juga secara moral dan berjiwa nasionalis.",
    feature1Title: "Solidaritas Tanpa Batas",
    feature1Desc: "Menjaga silaturahmi antar angkatan lintas generasi.",
    feature2Title: "Pengembangan Karir",
    feature2Desc: "Program pelatihan kepemimpinan dan jejaring profesional.",
    ketuaName: "Fadhlurrahman Anshari, S.Pd, S.H",
    ketuaRole: "Ketua Presidium Pemuda Indonesia Papua Barat",
  },
  statistik: {
    membersLabel: "Anggota Aktif",
    kabupatenLabel: "Kabupaten/Kota",
    programLabel: "Program Kerja",
    yearLabel: "Pengabdian",
    programCount: "250",
    yearCount: "5",
  },
  berita: {
    label: "Warta Terkini",
    heading: "Warta",
    highlight: "Terkini",
    desc: "Update terbaru kegiatan dan informasi seputar Presidium Pemuda Indonesia Papua Barat.",
  },
  aspirasi: {
    label: "Konten Aspirasi",
    heading: "Suaramu adalah",
    highlight: "Perubahan",
    desc: "Presidium Pemuda Indonesia Papua Barat membuka ruang aspirasi bagi seluruh pemuda untuk menyampaikan gagasan, kritik, dan saran demi pembangunan Papua Barat yang lebih baik. Setiap aspirasi akan ditampung dan diperjuangkan.",
    benefit1: "Aspirasi di bidang Pendidikan & Kesehatan",
    benefit2: "Infrastruktur & Ekonomi Kreatif",
    benefit3: "Sosial Budaya & Pelestarian Adat",
    ctaText: "Kirim Aspirasi",
  },
  pengurus: {
    label: "Dewan Pengurus",
    heading: "Pengurus Inti",
    highlight: "Presidium Pemuda Indonesia Papua Barat",
    desc: "Para pemimpin yang berkomitmen mengabdi untuk kemajuan pemuda dan pembangunan Papua Barat.",
  },
  cta: {
    badge: "Bergabung Bersama Kami",
    heading1: "Siap Berkontribusi untuk",
    headingHighlight: "Papua Barat?",
    desc: "Jadilah bagian dari perubahan besar. Bergabunglah dengan ribuan pemuda lainnya dalam membangun masa depan pemuda yang lebih cerah.",
    btnPrimary: "Daftar Sekarang",
    btnSecondary: "Hubungi Kami",
  },
  footer: {
    desc: "Organisasi Presidium Pemuda Indonesia Tingkat Provinsi Papua Barat. Membina karakter dan integritas pemuda untuk Indonesia Maju.",
  },
};

const DEFAULT_PENGURUS: PengurusMember[] = [
  { id: "PG1", name: "Fadhlurrahman Anshari, S.Pd, S.H", role: "Ketua Presidium Pemuda Indonesia Papua Barat", badge: "Ketua Presidium", badgeGold: true, image: "/PPI Fadhel.png", order: 1, instagram: "", linkedin: "", email: "" },
  { id: "PG2", name: "Hasrul Bugis, S.T", role: "Sekretaris Presidium Pemuda Indonesia Papua Barat", badge: "Sekretaris", badgeGold: false, image: "/PPI Hasrul.png", order: 2, instagram: "", linkedin: "", email: "" },
  { id: "PG3", name: "James Raway", role: "Bendahara Presidium Pemuda Indonesia Papua Barat", badge: "Bendahara", badgeGold: false, image: "/PPI James.png", order: 3, instagram: "", linkedin: "", email: "" },
];

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Sukses Penyelenggaraan Rapat Kerja Daerah Presidium Pemuda Indonesia Papua Barat 2024",
    excerpt: "Rapat kerja daerah yang berlangsung selama 3 hari di Manokwari berhasil menghasilkan berbagai program kerja strategis untuk kemajuan pemuda Papua Barat.",
    content: "<p>Rapat Kerja Daerah Presidium Pemuda Indonesia Papua Barat 2024 yang diselenggarakan di Manokwari selama <strong>3 hari penuh</strong> berhasil merumuskan <em>25 program kerja strategis</em>.</p><p>Kegiatan dihadiri oleh perwakilan 13 kabupaten/kota se-Papua Barat. Ketua Presidium <strong>Fadhlurrahman Anshari</strong> menyampaikan pentingnya solidaritas dan inovasi untuk memajukan pemuda di tanah Papua.</p><blockquote>Kami ingin pemuda Papua Barat menjadi motor penggerak pembangunan yang berintegritas dan berjiwa Pancasila.</blockquote><h3>Hasil Utama Rakerda:</h3><ul><li>Program beasiswa pemuda daerah</li><li>Pelatihan kepemimpinan tingkat distrik</li><li>Penguatan UMKM pemuda kreatif</li></ul>",
    category: "Kegiatan Utama",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    date: "2024-10-24",
    views: 1243,
    featured: true,
    author: "Admin PPI",
    tags: ["rakerda", "manokwari", "pemuda"],
    status: "published",
    slug: "sukses-rakerda-presidium-pemuda-indonesia-papua-barat-2024",
    seoTitle: "Sukses Rakerda Presidium Pemuda Indonesia Papua Barat 2024",
    seoDesc: "Rapat kerja daerah Presidium Pemuda Indonesia Papua Barat 2024 menghasilkan program strategis untuk pemuda.",
  },
  {
    id: "2",
    title: "Pendaftaran Anggota Baru Gelombang II Resmi Dibuka",
    excerpt: "Presidium Pemuda Indonesia Papua Barat membuka pendaftaran anggota baru gelombang II untuk periode 2024-2025.",
    content: "<p>Pendaftaran anggota baru gelombang II telah dibuka mulai <strong>18 Oktober 2024</strong>.</p><h3>Persyaratan:</h3><ol><li>WNI usia 17-30 tahun</li><li>Berdomisili di Papua Barat</li><li>Memiliki KTP</li><li>Berkomitmen terhadap nilai Pancasila</li></ol>",
    category: "Pengumuman",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    date: "2024-10-18",
    views: 892,
    featured: false,
    author: "Sekretaris PPI",
    tags: ["pendaftaran", "anggota"],
    status: "published",
    slug: "pendaftaran-anggota-gelombang-ii",
    seoTitle: "Pendaftaran Anggota Baru Gelombang II",
    seoDesc: "Pendaftaran anggota baru Presidium Pemuda Indonesia Papua Barat Gelombang II dibuka.",
  },
  {
    id: "3",
    title: "PPI Peduli: Aksi Kemanusiaan untuk Korban Bencana di Sorong",
    excerpt: "Tim relawan Presidium Pemuda Indonesia Papua Barat turun langsung membantu korban banjir di Kota Sorong.",
    content: "<p>Sebagai bentuk kepedulian sosial, Presidium Pemuda Indonesia Papua Barat menggalang bantuan dan terjun langsung ke lokasi bencana di Sorong.</p><p>Paket sembako dan layanan kesehatan gratis diberikan kepada <strong>250 KK terdampak</strong>.</p>",
    category: "Sosial",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80",
    date: "2024-10-15",
    views: 654,
    featured: false,
    author: "Bidang Sosial",
    tags: ["sosial", "sorong", "bencana"],
    status: "published",
    slug: "aksi-kemanusiaan-sorong",
    seoTitle: "Aksi Kemanusiaan Presidium Pemuda Indonesia Papua Barat di Sorong",
    seoDesc: "Presidium Pemuda Indonesia Papua Barat membantu korban bencana di Sorong",
  },
  {
    id: "4",
    title: "Penghargaan Organisasi Kepemudaan Terbaik Nasional 2024",
    excerpt: "Presidium Pemuda Indonesia Papua Barat meraih penghargaan sebagai organisasi kepemudaan terbaik tingkat nasional.",
    content: "<p>Prestasi membanggakan diraih Presidium Pemuda Indonesia Papua Barat dengan meraih penghargaan <strong>Organisasi Kepemudaan Terbaik Nasional 2024</strong> dari Kementerian Pemuda dan Olahraga RI.</p><blockquote>Penghargaan ini adalah hasil kerja keras 1200+ anggota di seluruh Papua Barat.</blockquote>",
    category: "Prestasi",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    date: "2024-10-10",
    views: 1102,
    featured: false,
    author: "Admin PPI",
    tags: ["prestasi", "nasional", "penghargaan"],
    status: "published",
    slug: "penghargaan-organisasi-terbaik-nasional",
    seoTitle: "Presidium Pemuda Indonesia Papua Barat Raih Penghargaan Nasional",
    seoDesc: "Presidium Pemuda Indonesia Papua Barat terbaik nasional 2024",
  },
];

const DEFAULT_MEMBERS: Member[] = [
  { id: "M001", name: "Yoseph Rumbruren", email: "yoseph.r@example.com", phone: "0812-3456-7890", kabupaten: "Manokwari", status: "verified", joinDate: "2024-01-15", nik: "9105010101990001", alamat: "Jl. Merdeka No. 8 Manokwari" },
  { id: "M002", name: "Marice Mandowen", email: "marice.m@example.com", phone: "0821-2345-6789", kabupaten: "Biak", status: "pending", joinDate: "2024-10-20", nik: "9105044505000002", alamat: "Kampung Bosnik, Biak" },
  { id: "M003", name: "Andi Setiawan", email: "andi.s@example.com", phone: "0813-9876-5432", kabupaten: "Sorong", status: "verified", joinDate: "2024-03-10", nik: "9107011203950003", alamat: "Jl. Ahmad Yani Sorong" },
  { id: "M004", name: "Elisabet Womsiwor", email: "elisabet.w@example.com", phone: "0822-1122-3344", kabupaten: "Raja Ampat", status: "pending", joinDate: "2024-10-22", nik: "9108015608980004", alamat: "Waisai, Raja Ampat" },
  { id: "M005", name: "Barnabas Dowansiba", email: "barnabas.d@example.com", phone: "0812-9988-7766", kabupaten: "Fak-Fak", status: "rejected", joinDate: "2024-09-05", nik: "9103011009920005", alamat: "Fak-Fak Tengah" },
  { id: "M006", name: "Rahma Bugis", email: "rahma.b@example.com", phone: "0813-4455-6677", kabupaten: "Teluk Bintuni", status: "verified", joinDate: "2024-02-18", nik: "9104023001950006", alamat: "Bintuni" },
];

const DEFAULT_ASPIRATIONS: Aspiration[] = [
  { id: "A001", kategori: "Pendidikan", kabupaten: "Manokwari", isi: "Butuh pelatihan digital marketing untuk pemuda di Distrik Manokwari Barat agar bisa bersaing di era digital.", anonim: false, nama: "Yosias", email: "yos@example.com", status: "masuk", date: "2024-10-23" },
  { id: "A002", kategori: "Infrastruktur", kabupaten: "Raja Ampat", isi: "Akses internet di beberapa kampung di Raja Ampat masih sangat terbatas, mohon bantuan pengadaan tower BTS.", anonim: true, status: "ditanggapi", date: "2024-10-22" },
  { id: "A003", kategori: "Kesehatan", kabupaten: "Sorong", isi: "Usulan posyandu keliling untuk wilayah pesisir Sorong Selatan yang sulit akses.", anonim: false, nama: "Mira Kambu", email: "mira@example.com", status: "selesai", date: "2024-10-21" },
];

const DEFAULT_USERS: AppUser[] = [
  { id: "U1", name: "Admin PPI", email: "admin@ppipapuabarat.id", password: "admin123", role: "admin", avatar: "/PPI.png", createdAt: "2024-01-01" },
  { id: "U2", name: "Editor PPI", email: "editor@ppipapuabarat.id", password: "editor123", role: "editor", createdAt: "2024-02-01" },
  { id: "U4", name: "Operator PPI", email: "operator@ppipapuabarat.id", password: "operator123", role: "operator", avatar: "/PPI.png", createdAt: "2024-02-15" },
  { id: "U3", name: "Anggota Demo", email: "anggota@example.com", password: "anggota123", role: "anggota", createdAt: "2024-03-01" },
];

type AppContextType = {
  settings: SiteSettings;
  updateSettings: (s: Partial<SiteSettings>) => void;
  siteContent: SiteContent;
  updateSiteContent: (c: Partial<SiteContent>) => void;
  updateContentSection: <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => void;
  news: NewsItem[];
  addNews: (n: Omit<NewsItem, "id" | "views" | "date">) => void;
  updateNews: (id: string, n: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  members: Member[];
  addMember: (m: Omit<Member, "id" | "joinDate" | "status">) => void;
  updateMember: (id: string, m: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  aspirations: Aspiration[];
  addAspiration: (a: Omit<Aspiration, "id" | "date" | "status">) => void;
  updateAspiration: (id: string, a: Partial<Aspiration>) => void;
  deleteAspiration: (id: string) => void;
  users: AppUser[];
  addUser: (u: Omit<AppUser, "id" | "createdAt">) => void;
  updateUser: (id: string, u: Partial<AppUser>) => void;
  deleteUser: (id: string) => void;
  pengurus: PengurusMember[];
  addPengurus: (p: Omit<PengurusMember, "id" | "order">) => void;
  updatePengurus: (id: string, p: Partial<PengurusMember>) => void;
  deletePengurus: (id: string) => void;
  reorderPengurus: (list: PengurusMember[]) => void;
  currentUser: AppUser | null;
  login: (email: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  register: (data: Omit<AppUser, "id" | "createdAt" | "role">, role?: AppUser["role"]) => { success: boolean; message?: string };
};

const AppContext = createContext<AppContextType | null>(null);

function safeParse<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const parsed = safeParse("ppi-settings", DEFAULT_SETTINGS);
    // Migrasi: jika masih pakai nama lama, ganti ke nama lengkap
    if ((parsed as any).siteName === "PPI Papua Barat" && (parsed as any).subtitle === "Presidium Pemuda Indonesia") {
      return { ...parsed, siteName: "Presidium Pemuda Indonesia", subtitle: "Papua Barat" };
    }
    // Jika ada sisa singkatan, pastikan full name
    if (parsed.siteName === "PPI Papua Barat") {
      return { ...parsed, siteName: "Presidium Pemuda Indonesia", subtitle: "Papua Barat" };
    }
    return parsed;
  });
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const parsed = safeParse("ppi-content", DEFAULT_CONTENT);
    // Migrasi highlight lama
    if ((parsed as any).pengurus?.highlight === "PPI Papua Barat") {
      parsed.pengurus.highlight = "Presidium Pemuda Indonesia Papua Barat";
    }
    if ((parsed as any).berita?.desc?.includes("PPI Papua Barat")) {
      parsed.berita.desc = parsed.berita.desc.replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat");
    }
    if ((parsed as any).aspirasi?.desc?.includes("PPI Papua Barat")) {
      parsed.aspirasi.desc = parsed.aspirasi.desc.replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat");
    }
    if ((parsed as any).sambutan?.ketuaRole === "Ketua Presidium PPI Papua Barat") {
      parsed.sambutan.ketuaRole = "Ketua Presidium Pemuda Indonesia Papua Barat";
    }
    return parsed;
  });
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = safeParse<any[]>("ppi-news", DEFAULT_NEWS);
    return saved.map((n: any) => ({
      ...n,
      title: (n.title || "").replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat"),
      excerpt: (n.excerpt || "").replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat"),
      tags: n.tags ?? [],
      status: n.status ?? "published",
      slug: n.slug ?? n.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      seoTitle: (n.seoTitle || n.title || "").replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat"),
      seoDesc: (n.seoDesc || n.excerpt || "").replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat"),
    }));
  });
  const [members, setMembers] = useState<Member[]>(() => safeParse("ppi-members", DEFAULT_MEMBERS));
  const [aspirations, setAspirations] = useState<Aspiration[]>(() => safeParse("ppi-aspirations", DEFAULT_ASPIRATIONS));
  const [users, setUsers] = useState<AppUser[]>(() => safeParse("ppi-users", DEFAULT_USERS));
  const [pengurus, setPengurus] = useState<PengurusMember[]>(() => {
    const parsed = safeParse("ppi-pengurus", DEFAULT_PENGURUS);
    return parsed.map((p: any) => ({
      ...p,
      role: (p.role || "").replace(/PPI Papua Barat/g, "Presidium Pemuda Indonesia Papua Barat"),
    }));
  });
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => safeParse("ppi-currentUser", null));

  useEffect(() => { localStorage.setItem("ppi-settings", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem("ppi-content", JSON.stringify(siteContent)); }, [siteContent]);
  useEffect(() => { localStorage.setItem("ppi-news", JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem("ppi-members", JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem("ppi-aspirations", JSON.stringify(aspirations)); }, [aspirations]);
  useEffect(() => { localStorage.setItem("ppi-users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("ppi-pengurus", JSON.stringify(pengurus)); }, [pengurus]);
  useEffect(() => {
    if (currentUser) localStorage.setItem("ppi-currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("ppi-currentUser");
  }, [currentUser]);

  const updateSettings = (s: Partial<SiteSettings>) => setSettings(prev => ({ ...prev, ...s }));
  const updateSiteContent = (c: Partial<SiteContent>) => setSiteContent(prev => ({ ...prev, ...c }));
  const updateContentSection = <K extends keyof SiteContent>(section: K, data: Partial<SiteContent[K]>) => {
    setSiteContent(prev => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  const addNews = (n: Omit<NewsItem, "id" | "views" | "date">) => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      views: 0,
      date: new Date().toISOString().split("T")[0],
      ...n,
      slug: n.slug || n.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    };
    setNews(prev => [newItem, ...prev]);
  };
  const updateNews = (id: string, n: Partial<NewsItem>) => setNews(prev => prev.map(x => x.id === id ? { ...x, ...n } : x));
  const deleteNews = (id: string) => setNews(prev => prev.filter(x => x.id !== id));

  const addMember = (m: Omit<Member, "id" | "joinDate" | "status">) => {
    const newM: Member = { id: "M" + Date.now().toString().slice(-5), joinDate: new Date().toISOString().split("T")[0], status: "pending", ...m };
    setMembers(prev => [newM, ...prev]);
  };
  const updateMember = (id: string, m: Partial<Member>) => setMembers(prev => prev.map(x => x.id === id ? { ...x, ...m } : x));
  const deleteMember = (id: string) => setMembers(prev => prev.filter(x => x.id !== id));

  const addAspiration = (a: Omit<Aspiration, "id" | "date" | "status">) => {
    const newA: Aspiration = { id: "A" + Date.now().toString().slice(-5), date: new Date().toISOString().split("T")[0], status: "masuk", ...a };
    setAspirations(prev => [newA, ...prev]);
  };
  const updateAspiration = (id: string, a: Partial<Aspiration>) => setAspirations(prev => prev.map(x => x.id === id ? { ...x, ...a } : x));
  const deleteAspiration = (id: string) => setAspirations(prev => prev.filter(x => x.id !== id));

  const addUser = (u: Omit<AppUser, "id" | "createdAt">) => {
    if (users.some(x => x.email === u.email)) return;
    const newU: AppUser = { id: "U" + Date.now().toString(), createdAt: new Date().toISOString().split("T")[0], ...u };
    setUsers(prev => [...prev, newU]);
  };
  const updateUser = (id: string, u: Partial<AppUser>) => {
    setUsers(prev => prev.map(x => x.id === id ? { ...x, ...u } : x));
    if (currentUser?.id === id) setCurrentUser(prev => prev ? { ...prev, ...u } as AppUser : prev);
  };
  const deleteUser = (id: string) => {
    if (id === "U1") return;
    setUsers(prev => prev.filter(x => x.id !== id));
  };

  const addPengurus = (p: Omit<PengurusMember, "id" | "order">) => {
    const newP: PengurusMember = { id: "PG" + Date.now().toString().slice(-4), order: pengurus.length + 1, ...p };
    setPengurus(prev => [...prev, newP].sort((a, b) => a.order - b.order));
  };
  const updatePengurus = (id: string, p: Partial<PengurusMember>) => setPengurus(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
  const deletePengurus = (id: string) => setPengurus(prev => prev.filter(x => x.id !== id));
  const reorderPengurus = (list: PengurusMember[]) => setPengurus(list.map((p, i) => ({ ...p, order: i + 1 })));

  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (!user) return { success: false, message: "Email atau password salah!" };
    setCurrentUser(user);
    return { success: true };
  };
  const logout = () => setCurrentUser(null);
  const register = (data: Omit<AppUser, "id" | "createdAt" | "role">, role: AppUser["role"] = "anggota") => {
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) return { success: false, message: "Email sudah terdaftar!" };
    const newU: AppUser = { id: "U" + Date.now().toString(), createdAt: new Date().toISOString().split("T")[0], role, ...data };
    setUsers(prev => [...prev, newU]);
    setCurrentUser(newU);
    setMembers(prev => [{ id: "M" + Date.now().toString().slice(-5), name: data.name, email: data.email, phone: "", kabupaten: "Manokwari", status: "pending", joinDate: new Date().toISOString().split("T")[0], nik: "", alamat: "" }, ...prev]);
    return { success: true };
  };

  return (
    <AppContext.Provider value={{
      settings, updateSettings,
      siteContent, updateSiteContent, updateContentSection,
      news, addNews, updateNews, deleteNews,
      members, addMember, updateMember, deleteMember,
      aspirations, addAspiration, updateAspiration, deleteAspiration,
      users, addUser, updateUser, deleteUser,
      pengurus, addPengurus, updatePengurus, deletePengurus, reorderPengurus,
      currentUser, login, logout, register
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be within AppProvider");
  return ctx;
};
