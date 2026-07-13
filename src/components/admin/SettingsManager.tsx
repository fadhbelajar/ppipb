import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function SettingsManager() {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);
  const [logoPreview, setLogoPreview] = useState(settings.logo);
  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      setLogoPreview(res);
      setForm(f => ({ ...f, logo: res }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-heading font-bold text-navy-900">Identitas Website</h3>
          <p className="text-xs text-gray-500 mt-1">Atur logo, nama, dan informasi kontak utama website Presidium Pemuda Indonesia Papua Barat.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Logo Organisasi</label>
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 relative group">
                <img src={logoPreview} alt="logo preview" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity">
                  <i className="fas fa-camera text-lg mb-1"></i>
                  <span className="text-[10px] font-bold uppercase">Ganti Logo</span>
                  <input type="file" accept="image/*" hidden onChange={handleLogoUpload} />
                </label>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 max-w-[128px]">Disarankan 512x512px, PNG transparan</p>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Nama Website *</label>
                <input value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Sub Judul / Tagline</label>
                <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Warna Gold</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.gold} onChange={e => setForm({ ...form, gold: e.target.value })} className="w-12 h-11 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white" />
                    <input value={form.gold} onChange={e => setForm({ ...form, gold: e.target.value })} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Warna Navy</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.navy} onChange={e => setForm({ ...form, navy: e.target.value })} className="w-12 h-11 rounded-xl border border-gray-200 cursor-pointer p-1 bg-white" />
                    <input value={form.navy} onChange={e => setForm({ ...form, navy: e.target.value })} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-heading font-bold text-navy-900">Kontak & Alamat</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Alamat Kantor</label>
            <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">No. Telepon</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Resmi</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-navy-900 mb-4">Preview Tampilan</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="h-16 flex items-center gap-3 px-5" style={{ backgroundColor: form.navy }}>
            <img src={logoPreview} alt="logo" className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20" />
            <div className="leading-tight">
              <p className="font-heading font-bold text-white text-sm">{form.siteName}</p>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">{form.subtitle}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <div className="w-20 h-7 rounded-full" style={{ backgroundColor: form.gold }}></div>
            </div>
          </div>
          <div className="p-4 bg-[#FAF8F5] text-xs text-gray-500">
            <p><i className="fas fa-map-marker-alt mr-1.5" style={{ color: form.gold }}></i>{form.address}</p>
            <div className="flex gap-4 mt-2">
              <span><i className="fas fa-phone mr-1" style={{ color: form.gold }}></i>{form.phone}</span>
              <span><i className="fas fa-envelope mr-1" style={{ color: form.gold }}></i>{form.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => { setForm(settings); setLogoPreview(settings.logo); }} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold transition-colors cursor-pointer">Reset</button>
        <button onClick={handleSave} className="px-8 py-3 bg-navy-900 hover:bg-navy-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer">
          {saved ? <><i className="fas fa-check"></i> Tersimpan!</> : <><i className="fas fa-save"></i> Simpan Pengaturan</>}
        </button>
      </div>

      {saved && <div className="fixed bottom-6 right-6 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-pulse"><i className="fas fa-check-circle text-gold-400"></i><span className="text-sm font-medium">Pengaturan website berhasil disimpan!</span></div>}
    </div>
  );
}
