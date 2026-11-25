// Photos page — masonry of user-fillable frames + lightbox with shot metadata
const PHOTOS = [
  { id: "ph-01", title: "Morning light, Chorsu", place: "Chorsu Bazaar", city: "Tashkent", group: "tashkent", date: "2026·03", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/4 · 1/500 · ISO 160", ratio: "4/5" },
  { id: "ph-02", title: "Registan after rain", place: "Registan Square", city: "Samarkand", group: "silkroad", date: "2025·10", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/5.6 · 1/250 · ISO 200", ratio: "3/2" },
  { id: "ph-03", title: "Desk, 2am build", place: "Home studio", city: "Berlin", group: "desk", date: "2026·01", camera: "iPhone 15 Pro", lens: "24mm", exif: "f/1.8 · 1/60 · ISO 640", ratio: "1/1" },
  { id: "ph-04", title: "Tiles of Shah-i-Zinda", place: "Shah-i-Zinda", city: "Samarkand", group: "silkroad", date: "2025·10", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/2.8 · 1/320 · ISO 160", ratio: "2/3" },
  { id: "ph-05", title: "Chimgan, first snow", place: "Chimgan peaks", city: "Tashkent region", group: "mountains", date: "2025·12", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/8 · 1/1000 · ISO 160", ratio: "3/2" },
  { id: "ph-06", title: "U-Bahn, Kottbusser Tor", place: "Kottbusser Tor", city: "Berlin", group: "berlin", date: "2026·02", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/2 · 1/125 · ISO 1600", ratio: "4/5" },
  { id: "ph-07", title: "Minor Mosque at dusk", place: "Minor Mosque", city: "Tashkent", group: "tashkent", date: "2025·09", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/2.8 · 1/60 · ISO 800", ratio: "2/3" },
  { id: "ph-08", title: "Kalta Minor, noon", place: "Itchan Kala", city: "Khiva", group: "silkroad", date: "2024·05", camera: "Sony A7 III", lens: "35mm f/1.8", exif: "f/9 · 1/800 · ISO 100", ratio: "4/5" },
  { id: "ph-09", title: "Keyboard, new switches", place: "Home studio", city: "Berlin", group: "desk", date: "2025·11", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/2 · 1/100 · ISO 400", ratio: "3/2" },
  { id: "ph-10", title: "Spree in February", place: "Oberbaum Bridge", city: "Berlin", group: "berlin", date: "2026·02", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/5.6 · 1/400 · ISO 160", ratio: "16/9" },
  { id: "ph-11", title: "Lyabi-Hauz evening", place: "Lyabi-Hauz", city: "Bukhara", group: "silkroad", date: "2024·05", camera: "Sony A7 III", lens: "35mm f/1.8", exif: "f/2 · 1/80 · ISO 1250", ratio: "1/1" },
  { id: "ph-12", title: "Metro, Kosmonavtlar", place: "Kosmonavtlar station", city: "Tashkent", group: "tashkent", date: "2026·03", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/2 · 1/60 · ISO 2000", ratio: "2/3" },
  { id: "ph-13", title: "Charvak, still water", place: "Charvak Reservoir", city: "Tashkent region", group: "mountains", date: "2025·07", camera: "Fujifilm X100V", lens: "23mm f/2", exif: "f/8 · 1/640 · ISO 160", ratio: "3/2" },
  { id: "ph-14", title: "Conference badge pile", place: "Vue.js Nation", city: "Amsterdam", group: "desk", date: "2025·06", camera: "iPhone 15 Pro", lens: "24mm", exif: "f/1.8 · 1/120 · ISO 250", ratio: "4/5" }
];

const PHOTO_GROUPS = ["all", "tashkent", "silkroad", "berlin", "mountains", "desk"];

function PhotoTile({ p, idx, onOpen }) {
  const t = window.useT();
  return (
    <figure className="ph-tile reveal in" style={{ aspectRatio: p.ratio }}>
      <image-slot id={p.id} shape="rect" placeholder={t("photos.drop") + " \u2014 " + p.title}></image-slot>
      <div className="ph-over">
        <div className="ph-top">
          <span className="ph-num">{String(idx + 1).padStart(2, "0")}</span>
          <button type="button" className="ph-expand" onClick={() => onOpen(idx)} aria-label={t("photos.open") + ": " + p.title}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"></path></svg>
          </button>
        </div>
        <figcaption className="ph-cap">
          <span className="ph-title">{p.title}</span>
          <span className="ph-place">{p.city} · {p.date}</span>
        </figcaption>
      </div>
    </figure>
  );
}

function PhotoLightbox({ list, index, onClose, onNav }) {
  const t = window.useT();
  const p = list[index];
  const [src, setSrc] = React.useState(null);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onNav]);
  React.useEffect(() => {
    const el = document.getElementById(p.id);
    const img = el && el._img;
    const s = img && img.getAttribute("src");
    setSrc(s && img.naturalWidth > 0 ? s : null);
  }, [p.id]);
  return (
    <div className="ph-lb" role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button type="button" className="ph-lb-close" onClick={onClose} aria-label={t("photos.close")}>✕</button>
      <button type="button" className="ph-lb-nav prev" onClick={() => onNav(-1)} aria-label={t("pg.prev")}>←</button>
      <div className="ph-lb-stage" key={p.id}>
        {src ?
          <img src={src} alt={p.title} /> :
          <div className="ph-lb-empty" style={{ aspectRatio: p.ratio }}>
            <span>{t("photos.empty")}</span>
          </div>}
      </div>
      <aside className="ph-lb-meta">
        <span className="ph-lb-count">{String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}</span>
        <h2>{p.title}</h2>
        <p className="ph-lb-place">{p.place}, {p.city}</p>
        <dl>
          <div><dt>{t("photos.date")}</dt><dd>{p.date}</dd></div>
          <div><dt>{t("photos.camera")}</dt><dd>{p.camera}</dd></div>
          <div><dt>{t("photos.lens")}</dt><dd>{p.lens}</dd></div>
          <div><dt>{t("photos.exposure")}</dt><dd>{p.exif}</dd></div>
        </dl>
        <span className="tag">{t("photos.g." + p.group)}</span>
      </aside>
      <button type="button" className="ph-lb-nav next" onClick={() => onNav(1)} aria-label={t("pg.next")}>→</button>
    </div>
  );
}

function PhotosPage() {
  const t = window.useT();
  const [group, setGroup] = React.useState("all");
  const [open, setOpen] = React.useState(-1);
  const list = group === "all" ? PHOTOS : PHOTOS.filter((p) => p.group === group);
  const cities = new Set(PHOTOS.map((p) => p.city)).size;
  const nav = React.useCallback((d) => setOpen((i) => (i + d + list.length) % list.length), [list.length]);
  const close = React.useCallback(() => setOpen(-1), []);
  return (
    <>
      <section className="page-header container compact">
        <span className="section-label">/ {t("nav.photos").toLowerCase()}</span>
        <h1>{t("photos.h1")}</h1>
        <p>{t("photos.lead")}</p>
        <div className="ph-stats">
          <span><b>{PHOTOS.length}</b> {t("photos.frames")}</span>
          <span><b>{cities}</b> {t("photos.cities")}</span>
          <span>X100V · 23mm</span>
        </div>
      </section>
      <section className="container">
        <div className="filter-bar">
          <div className="left">
            {PHOTO_GROUPS.map((g) =>
              <button key={g} className="chip" aria-pressed={group === g} onClick={() => setGroup(g)}>
                {t("photos.g." + g)}
                <span className="count">{g === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.group === g).length}</span>
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="container ph-section">
        <div className="ph-grid">
          {list.map((p, i) => <PhotoTile key={p.id} p={p} idx={i} onOpen={setOpen} />)}
        </div>
      </section>
      {open >= 0 && list[open] && <PhotoLightbox list={list} index={open} onClose={close} onNav={nav} />}
    </>
  );
}

window.PhotosPage = PhotosPage;
