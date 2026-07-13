import { useRef, useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlValue, setHtmlValue] = useState(value);

  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    setHtmlValue(value);
  }, [value, isHtmlMode]);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    exec("createLink", linkUrl);
    setShowLinkModal(false);
    setLinkUrl("");
  };

  const insertImage = () => {
    if (!imageUrl) return;
    exec("insertImage", imageUrl);
    setShowImageModal(false);
    setImageUrl("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      exec("insertImage", base64);
    };
    reader.readAsDataURL(file);
  };

  const toolbarBtn = (icon: string, title: string, action: () => void, active?: boolean) => (
    <button type="button" title={title} onClick={action} className={`w-8 h-8 rounded-lg grid place-items-center text-[13px] transition-colors cursor-pointer ${active ? "bg-navy-900 text-white" : "bg-white hover:bg-gray-100 text-gray-600 border border-gray-200"}`}>
      <i className={icon}></i>
    </button>
  );

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1.5 items-center">
        <div className="flex gap-1.5">
          {toolbarBtn("fas fa-bold", "Bold", () => exec("bold"))}
          {toolbarBtn("fas fa-italic", "Italic", () => exec("italic"))}
          {toolbarBtn("fas fa-underline", "Underline", () => exec("underline"))}
          {toolbarBtn("fas fa-strikethrough", "Strike", () => exec("strikeThrough"))}
        </div>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <div className="flex gap-1.5">
          <select onChange={e => {
            const v = e.target.value;
            if (v) exec("formatBlock", v);
            e.target.value = "";
          }} className="px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs cursor-pointer focus:outline-none">
            <option value="">Format</option>
            <option value="<h1>">H1 Besar</option>
            <option value="<h2>">H2 Sedang</option>
            <option value="<h3>">H3 Kecil</option>
            <option value="<p>">Paragraf</option>
            <option value="<blockquote>">Kutipan</option>
          </select>
        </div>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <div className="flex gap-1.5">
          {toolbarBtn("fas fa-list-ul", "List Bullet", () => exec("insertUnorderedList"))}
          {toolbarBtn("fas fa-list-ol", "List Nomor", () => exec("insertOrderedList"))}
          {toolbarBtn("fas fa-quote-left", "Quote", () => exec("formatBlock", "<blockquote>"))}
          {toolbarBtn("fas fa-minus", "Garis", () => exec("insertHorizontalRule"))}
        </div>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <div className="flex gap-1.5">
          {toolbarBtn("fas fa-link", "Sisip Link", () => setShowLinkModal(true))}
          {toolbarBtn("fas fa-image", "Sisip Gambar URL", () => setShowImageModal(true))}
          <label className="w-8 h-8 rounded-lg grid place-items-center text-[13px] bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 cursor-pointer" title="Upload Gambar">
            <i className="fas fa-upload"></i>
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </label>
          {toolbarBtn("fas fa-align-left", "Rata Kiri", () => exec("justifyLeft"))}
          {toolbarBtn("fas fa-align-center", "Rata Tengah", () => exec("justifyCenter"))}
          {toolbarBtn("fas fa-align-right", "Rata Kanan", () => exec("justifyRight"))}
        </div>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <div className="flex gap-1.5">
          {toolbarBtn("fas fa-eraser", "Hapus Format", () => exec("removeFormat"))}
          {toolbarBtn("fas fa-undo", "Undo", () => exec("undo"))}
          {toolbarBtn("fas fa-redo", "Redo", () => exec("redo"))}
        </div>
        <div className="ml-auto flex gap-1.5">
          <button type="button" onClick={() => setIsHtmlMode(!isHtmlMode)} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${isHtmlMode ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
            <i className={`fas ${isHtmlMode ? "fa-eye" : "fa-code"} mr-1.5`}></i>{isHtmlMode ? "Visual" : "HTML"}
          </button>
        </div>
      </div>

      {/* Editor area */}
      {!isHtmlMode ? (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          className="min-h-[280px] max-h-[500px] overflow-y-auto p-4 text-sm leading-relaxed focus:outline-none prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_blockquote]:border-l-4 [&_blockquote]:border-gold-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-gold-50 [&_blockquote]:py-2 [&_blockquote]:rounded-r-lg [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_img]:rounded-xl [&_img]:shadow-sm [&_a]:text-blue-600 [&_a]:underline empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
          style={{ wordBreak: "break-word" }}
        />
      ) : (
        <textarea value={htmlValue} onChange={e => { setHtmlValue(e.target.value); onChange(e.target.value); }} className="w-full min-h-[280px] max-h-[500px] p-4 text-xs font-mono bg-gray-900 text-green-300 focus:outline-none" placeholder="<p>Tulis HTML..."></textarea>
      )}

      {/* Footer info */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-2 flex items-center justify-between text-[11px] text-gray-500">
        <span className="flex items-center gap-3">
          <span><i className="fas fa-keyboard mr-1"></i>{isHtmlMode ? "Mode HTML" : "Mode Visual Editor"}</span>
          <span className="hidden sm:inline">• Mendukung upload gambar, link, heading, list, kutipan</span>
        </span>
        <span>{value.replace(/<[^>]*>/g, "").length} karakter</span>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm" onClick={() => setShowLinkModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-5 w-full max-w-sm">
            <h4 className="font-bold text-navy-900 mb-3">Sisipkan Link</h4>
            <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setShowLinkModal(false)} className="flex-1 py-2.5 bg-gray-100 rounded-xl text-sm font-semibold cursor-pointer">Batal</button>
              <button onClick={insertLink} className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-bold cursor-pointer">Sisipkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm" onClick={() => setShowImageModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-5 w-full max-w-sm">
            <h4 className="font-bold text-navy-900 mb-3">Sisipkan Gambar via URL</h4>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 mb-2" />
            <p className="text-[11px] text-gray-400 mb-4">Atau gunakan tombol upload di toolbar untuk upload langsung dari device.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowImageModal(false)} className="flex-1 py-2.5 bg-gray-100 rounded-xl text-sm font-semibold cursor-pointer">Batal</button>
              <button onClick={insertImage} className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-bold cursor-pointer">Sisipkan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
