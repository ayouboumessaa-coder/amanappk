/* AMAN branded dropdowns.
   Replaces the device's native select list (grey/dark system popup) with a picker in AMAN colours.
   The real <select> stays the source of truth: choosing an option sets its value and fires
   "input" + "change", so every existing onchange handler keeps working. Uses event delegation only. */
(() => {
  const TXT = {
    ar: { close: "إغلاق", search: "بحث في الخيارات…", none: "لا توجد نتائج", pick: "اختاري" },
    fr: { close: "Fermer", search: "Rechercher une option…", none: "Aucun résultat", pick: "Choisir" },
    en: { close: "Close", search: "Search options…", none: "No results", pick: "Choose" }
  };
  const tx = k => (TXT[(document.documentElement.lang || "ar").slice(0, 2)] || TXT.ar)[k];
  const usable = el => el && el.tagName === "SELECT" && !el.multiple && !(el.size > 1) && !el.disabled && !el.hasAttribute("data-native");

  let root, list, title, q, sel = null, items = [], active = -1, lastTouch = 0;

  function build() {
    root = document.createElement("div");
    root.className = "aman-sel";
    root.hidden = true;
    root.innerHTML = '<div class="aman-sel-bg" data-close></div><div class="aman-sel-box" role="dialog" aria-modal="true" aria-labelledby="aman-sel-title">' +
      '<div class="aman-sel-head"><h2 class="aman-sel-title" id="aman-sel-title"></h2><button type="button" class="aman-sel-x" data-close>' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
      '<input type="search" class="aman-sel-q" autocomplete="off" hidden><ul class="aman-sel-list" role="listbox" id="aman-sel-list" tabindex="-1"></ul></div>';
    document.body.appendChild(root);
    list = root.querySelector(".aman-sel-list");
    title = root.querySelector(".aman-sel-title");
    q = root.querySelector(".aman-sel-q");
    root.addEventListener("click", e => {
      if (e.target.closest("[data-close]")) return close();
      const li = e.target.closest(".aman-sel-opt");
      if (li) choose(li);
    });
    root.addEventListener("keydown", onKey);
    q.addEventListener("input", filter);
  }

  function labelFor(s) {
    const a = s.getAttribute("aria-label");
    if (a) return a;
    const lb = s.getAttribute("aria-labelledby");
    if (lb) { const n = document.getElementById(lb); if (n) return n.textContent.trim(); }
    const l = (s.id && document.querySelector('label[for="' + CSS.escape(s.id) + '"]')) || s.closest("label");
    if (l) { const t = Array.from(l.childNodes).filter(n => n !== s && !(n.contains && n.contains(s))).map(n => n.textContent).join(" ").trim(); if (t) return t; }
    return s.title || tx("pick");
  }

  function open(s) {
    if (!root) build();
    sel = s;
    title.textContent = labelFor(s);
    root.querySelector(".aman-sel-x").setAttribute("aria-label", tx("close"));
    root.setAttribute("dir", s.closest("[dir]") ? s.closest("[dir]").getAttribute("dir") : document.documentElement.dir || "rtl");
    list.innerHTML = "";
    items = [];
    let n = 0;
    const add = (o, grp) => {
      const li = document.createElement("li");
      li.className = "aman-sel-opt";
      li.id = "aman-sel-o" + n++;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", o.selected ? "true" : "false");
      if (o.disabled || (grp && grp.disabled)) li.setAttribute("aria-disabled", "true");
      if (o.lang) li.lang = o.lang;
      li.innerHTML = '<span class="aman-sel-txt"></span><span class="aman-sel-dot" aria-hidden="true"></span>';
      li.firstChild.textContent = o.label || o.textContent;
      li._opt = o;
      items.push(li);
      return li;
    };
    Array.from(s.children).forEach(c => {
      if (c.tagName === "OPTGROUP") {
        const g = document.createElement("li");
        g.setAttribute("role", "presentation");
        g.innerHTML = '<div class="aman-sel-grp"></div><ul role="group" style="list-style:none;margin:0;padding:0"></ul>';
        g.firstChild.textContent = c.label;
        g.lastChild.setAttribute("aria-label", c.label);
        Array.from(c.children).forEach(o => g.lastChild.appendChild(add(o, c)));
        list.appendChild(g);
      } else if (c.tagName === "OPTION" && !c.hidden) list.appendChild(add(c));
    });
    const many = items.length > 9;
    q.hidden = !many;
    q.value = "";
    q.placeholder = tx("search");
    q.setAttribute("aria-label", tx("search"));
    q.setAttribute("aria-controls", "aman-sel-list");
    s.classList.add("aman-sel-open");
    s.setAttribute("aria-expanded", "true");
    root.hidden = false;
    document.documentElement.style.overflow = "hidden";
    const cur = items.findIndex(li => li.getAttribute("aria-selected") === "true");
    setActive(cur < 0 ? 0 : cur, true);
    // On touch devices don't pop the keyboard up by focusing the search box
    (many && Date.now() - lastTouch > 800 ? q : list).focus({ preventScroll: true });
  }

  function close(keepFocus = true) {
    if (!root || root.hidden) return;
    root.hidden = true;
    document.documentElement.style.overflow = "";
    if (sel) {
      sel.classList.remove("aman-sel-open");
      sel.setAttribute("aria-expanded", "false");
      if (keepFocus) try { sel.focus({ preventScroll: true }); } catch (e) {}
    }
    sel = null;
  }

  function choose(li) {
    if (!li || li.getAttribute("aria-disabled") === "true" || !sel) return;
    const s = sel, o = li._opt;
    close();
    if (!o.selected) {
      o.selected = true;
      s.dispatchEvent(new Event("input", { bubbles: true }));
      s.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  const visible = () => items.filter(li => !li.hidden && li.getAttribute("aria-disabled") !== "true");
  function setActive(i, center) {
    items.forEach(li => li.classList.remove("is-active"));
    active = i;
    const li = items[i];
    if (!li) { list.removeAttribute("aria-activedescendant"); return; }
    li.classList.add("is-active");
    list.setAttribute("aria-activedescendant", li.id);
    q.setAttribute("aria-activedescendant", li.id);
    li.scrollIntoView({ block: center ? "center" : "nearest" });
  }
  function move(d) {
    const v = visible();
    if (!v.length) return;
    let p = v.indexOf(items[active]);
    p = p < 0 ? 0 : Math.max(0, Math.min(v.length - 1, p + d));
    setActive(items.indexOf(v[p]));
  }
  function filter() {
    const t = q.value.trim().toLowerCase();
    list.querySelectorAll('[role="presentation"]').forEach(g => (g.hidden = false));
    items.forEach(li => (li.hidden = !!t && !li.textContent.toLowerCase().includes(t)));
    list.querySelectorAll('[role="presentation"]').forEach(g => (g.hidden = !g.querySelector(".aman-sel-opt:not([hidden])")));
    let e = list.querySelector(".aman-sel-empty");
    const none = !items.some(li => !li.hidden);
    if (none && !e) { e = document.createElement("li"); e.className = "aman-sel-empty"; e.textContent = tx("none"); list.appendChild(e); }
    if (!none && e) e.remove();
    const v = visible();
    setActive(v.length ? items.indexOf(v[0]) : -1);
  }
  function onKey(e) {
    const k = e.key;
    if (k === "Escape") { e.preventDefault(); return close(); }
    if (k === "ArrowDown") { e.preventDefault(); return move(1); }
    if (k === "ArrowUp") { e.preventDefault(); return move(-1); }
    if (k === "Home" && e.target !== q) { e.preventDefault(); return move(-1e9); }
    if (k === "End" && e.target !== q) { e.preventDefault(); return move(1e9); }
    if (k === "Enter" || (k === " " && e.target !== q)) { if (items[active]) { e.preventDefault(); choose(items[active]); } return; }
    if (k === "Tab") {
      // keep focus inside the picker
      const f = [q, list, root.querySelector(".aman-sel-x")].filter(x => !x.hidden);
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  }

  // Open our picker instead of the native one
  let tx0 = 0, ty0 = 0;
  document.addEventListener("touchstart", e => { lastTouch = Date.now(); const t = e.touches[0]; tx0 = t.clientX; ty0 = t.clientY; }, { passive: true, capture: true });
  document.addEventListener("touchend", e => {
    const s = e.target.closest && e.target.closest("select");
    if (!usable(s)) return;
    const t = e.changedTouches[0];
    if (Math.abs(t.clientX - tx0) > 10 || Math.abs(t.clientY - ty0) > 10) return; // was a scroll
    e.preventDefault(); // stops the native picker (and the follow-up click)
    open(s);
  }, { passive: false, capture: true });
  document.addEventListener("mousedown", e => {
    const s = e.target.closest && e.target.closest("select");
    if (!usable(s) || e.button !== 0) return;
    e.preventDefault();
  }, true);
  document.addEventListener("click", e => {
    const s = e.target.closest && e.target.closest("select");
    if (!usable(s)) return;
    e.preventDefault();
    open(s);
  }, true);
  document.addEventListener("keydown", e => {
    if (root && !root.hidden) return;
    const s = e.target;
    if (!usable(s)) return;
    if (e.key === "Enter" || e.key === " " || e.key === "F4" || (e.altKey && (e.key === "ArrowDown" || e.key === "ArrowUp"))) {
      e.preventDefault();
      open(s);
    }
  }, true);
  // Close on navigation between app pages
  addEventListener("hashchange", () => close(false));
})();
