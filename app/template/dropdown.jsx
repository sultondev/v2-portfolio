// Custom select dropdown — matches dark theme, accessible
function Dropdown({ value, onChange, options, label, placeholder, className = "" }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);
  const opts = options || [];
  const current = opts.find((o) => o.value === value);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  React.useEffect(() => {
    if (open) {
      const i = opts.findIndex((o) => o.value === value);
      setActive(i >= 0 ? i : 0);
    }
  }, [open]);

  const choose = (v) => { onChange && onChange(v); setOpen(false); };

  const onTriggerKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault(); setOpen(true);
    }
  };
  const onListKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(opts.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); if (opts[active]) choose(opts[active].value); }
    else if (e.key === "Tab") { setOpen(false); }
  };

  return (
    <div className={"dd " + (open ? "open " : "") + className} ref={ref}>
      <button
        type="button"
        className="dd-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKey}>
        <span className="dd-value">
          {label && <span className="dd-label">{label}</span>}
          <span>{current ? current.label : (placeholder || "Select")}</span>
        </span>
        <span className="dd-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="dd-menu" role="listbox" tabIndex={-1} onKeyDown={onListKey} ref={(el) => el && el.focus()}>
          {opts.map((o, i) => (
            <li key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={"dd-item " + (i === active ? "active " : "") + (o.value === value ? "selected" : "")}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(o.value)}>
              <span>{o.label}</span>
              {o.value === value && <span className="dd-check" aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

window.Dropdown = Dropdown;
