/* ===== AMAN screen-reader layer: TalkBack / VoiceOver / NVDA + multilingual voice ===== */
(function () {
  const UI = () => ["ar", "fr", "en"][L] || "ar";
  const tr = a => a[L] || a[0];

  // ---- 1. Answer / reading languages: Morocco only (grouped) ----
  // Old saved choices (removed languages) fall back to automatic.
  if (!AMAN_REPLY_LANGS.some(x => x.k === window.amanReplyLang)) window.amanReplyLang = "auto";
  const GROUPS = { main: ["الدارجة المغربية واللهجات", "Darija et dialectes marocains", "Moroccan Darija & dialects"], ber: ["الأمازيغية", "Amazigh", "Amazigh"], off: ["لغات الإدارة", "Langues de l'administration", "Administration languages"] };
  window.amanReplyLangSelect = function (id) {
    const lbl = ["لغة الجواب والقراءة", "Langue de réponse et de lecture", "Answer & reading language"][L];
    const cur = window.amanReplyLang;
    const opts = Object.keys(GROUPS).map(g => `<optgroup label="${tr(GROUPS[g])}">` + AMAN_REPLY_LANGS.filter(x => x.g === g).map(x =>
      `<option value="${x.k}"${x.k === cur ? " selected" : ""}${x.tts && x.g !== "main" && x.g !== "ber" ? ` lang="${x.tts.split("-")[0]}"` : ""}>${x.l[L]}</option>`).join("") + "</optgroup>").join("");
    return `<label class="reply-lang" for="${id}">${svgIcon("globe", "ic", 16)}<span>${lbl}</span><select id="${id}" class="reply-lang-sel" onchange="amanSetReplyLang(this.value)">${opts}</select></label>`;
  };

  // ---- 2. Language detection for any script ----
  const SCRIPTS = [
    [/[ⴰ-⵿]/g, "zgh"], [/[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/g, "ar"], [/[Ѐ-ӿ]/g, "ru"],
    [/[Ͱ-Ͽ]/g, "el"], [/[֐-׿]/g, "he"], [/[ऀ-ॿ]/g, "hi"], [/[ঀ-৿]/g, "bn"],
    [/[਀-੿]/g, "pa"], [/[઀-૿]/g, "gu"], [/[஀-௿]/g, "ta"], [/[ఀ-౿]/g, "te"],
    [/[ಀ-೿]/g, "kn"], [/[ഀ-ൿ]/g, "ml"], [/[඀-෿]/g, "si"], [/[฀-๿]/g, "th"],
    [/[ក-៿]/g, "km"], [/[က-႟]/g, "my"], [/[Ⴀ-ჿ]/g, "ka"], [/[԰-֏]/g, "hy"],
    [/[ሀ-፿]/g, "am"], [/[぀-ヿ]/g, "ja"], [/[가-힯ᄀ-ᇿ]/g, "ko"], [/[一-鿿㐀-䶿]/g, "zh"],
    [/[A-Za-zÀ-ɏḀ-ỿ]/g, "latn"]
  ];
  const LATIN_WORDS = {
    fr: /\b(le|la|les|des|est|vous|je|une|pour|que|avec|et|pas|dans|sur|mon|votre|c'est|il|elle|nous|qui|au|aux)\b/gi,
    es: /\b(el|los|las|usted|para|una|que|está|por|con|es|del|mi|tu|pero|como|muy|yo)\b/gi,
    en: /\b(the|you|and|is|are|your|what|how|i|my|to|of|it|this|that|with|for|can|please|help)\b/gi,
    pt: /\b(você|não|uma|para|com|é|do|da|os|as|meu|minha|obrigad[oa]|está|isso)\b/gi,
    it: /\b(il|gli|sono|una|per|che|non|è|della|con|mio|questo|ciao|grazie)\b/gi,
    de: /\b(der|die|das|und|ist|ich|nicht|sie|ein|eine|mit|bitte|hilfe|ich|mein|zu)\b/gi,
    nl: /\b(de|het|een|en|is|niet|ik|jij|met|voor|van|mijn|hulp|alsjeblieft)\b/gi,
    tr: /\b(ve|bir|bu|ne|için|değil|ben|sen|yardım|lütfen|mı|mi|çok)\b/gi,
    id: /\b(dan|yang|saya|tidak|ini|itu|dengan|untuk|tolong|bantuan|apa)\b/gi,
    pl: /\b(nie|jest|się|że|ja|ty|pomocy|proszę|czy|jak|mój)\b/gi,
    ro: /\b(și|este|nu|eu|tu|pentru|cu|ajutor|vă|rog|meu)\b/gi,
    sw: /\b(na|ya|wa|ni|kwa|msaada|tafadhali|mimi|wewe|hii|sana)\b/gi,
    ha: /\b(da|ba|ne|na|ina|taimako|don|allah|yaya)\b/gi,
    darija: /\b(wach|chno|chnou|bghit|dyal|dial|mzyan|mzyana|3la|rah|kayn|kayna|daba|bzaf|ghadi|safi|nta|nti|hna|3afak|wakha|kifach|fin|lah|khoya|khti|ana|ndir|chi|walo|mn)\b/gi,
    amz: /\b(azul|tanmmirt|tanemmirt|mamek|labas|ur|is|ad|nkk|kyyi|tamazight|tifawin)\b/gi
  };
  const count = (s, re) => (s.match(re) || []).length;
  // Returns a BCP-47 tag. hint = tag the user picked (or ""), used when the script matches.
  window.amanDetectLang = function (text, hint) {
    const s = String(text || "");
    let best = "", bestN = 0;
    SCRIPTS.forEach(([re, k]) => { const n = count(s, re); if (n > bestN) { bestN = n; best = k; } });
    hint = hint === undefined ? (amanReplyLangObj().tts || "") : hint;
    const hb = (hint || "").split("-")[0];
    if (!best) return hint || ({ 0: "ar-MA", 1: "fr-FR", 2: "en-US" }[L]);
    if (best === "ar") {
      if (/[ےٹڈںھ]/.test(s)) return "ur-PK";
      if (count(s, /[پچژی]/g) >= 2 && !/[ةى]/.test(s) && !/(ديال|دابا|بزاف|واش|شنو|كاين)/.test(s)) return "fa-IR";
      if (hb === "ar") return hint;
      return "ar-MA";
    }
    if (best === "ru") return /[іїєґ]/i.test(s) ? "uk-UA" : (hb === "bg" || hb === "sr" ? hint : "ru-RU");
    if (best === "zh") return hb === "ja" ? hint : "zh-CN";
    if (best === "zgh") return "zgh";
    if (best !== "latn") {
      const map = { el: "el-GR", he: "he-IL", hi: "hi-IN", bn: "bn-BD", pa: "pa-IN", gu: "gu-IN", ta: "ta-IN", te: "te-IN", kn: "kn-IN", ml: "ml-IN", si: "si-LK", th: "th-TH", km: "km-KH", my: "my-MM", ka: "ka-GE", hy: "hy-AM", am: "am-ET", ja: "ja-JP", ko: "ko-KR" };
      return hb === best ? hint : (map[best] || best);
    }
    // Latin script: score common words
    if (/[ơưđ]/i.test(s) || /[ạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(s)) return "vi-VN";
    let lang = "", top = 0;
    Object.keys(LATIN_WORDS).forEach(k => { const n = count(s, LATIN_WORDS[k]); if (n > top) { top = n; lang = k; } });
    if (/\b[a-z]*[23579][a-z]+\b/i.test(s) && /[a-z]/i.test(s)) { top = Math.max(top, 2); lang = lang && lang !== "darija" && top > 3 ? lang : "darija"; }
    if (/[ñ¿¡]/.test(s)) lang = "es"; else if (/[ãõ]/.test(s)) lang = "pt"; else if (/[ßäöü]/i.test(s) && lang !== "tr") lang = lang || "de"; else if (/[ğış]/.test(s)) lang = "tr"; else if (/[ąęłńśźż]/.test(s)) lang = "pl"; else if (/[ăâîșț]/.test(s) && lang !== "fr") lang = "ro";
    if (hint && hb !== "ar" && hb !== "zgh" && (!lang || top < 2)) return hint;
    if (!lang) lang = /[éèêàçùœ]/i.test(s) ? "fr" : (L === 2 ? "en" : "fr");
    const full = { fr: "fr-FR", es: "es-ES", en: "en-US", pt: "pt-PT", it: "it-IT", de: "de-DE", nl: "nl-NL", tr: "tr-TR", id: "id-ID", pl: "pl-PL", ro: "ro-RO", sw: "sw-KE", ha: "ha-NG", darija: "fr-FR", amz: "fr-FR" }[lang];
    if (hint && hint.split("-")[0] === full.split("-")[0]) return hint;
    return full;
  };

  // ---- 3. Voice choice with fallbacks (dialect -> language -> family) ----
  const FALLBACK = { zgh: ["fr-FR"], ber: ["fr-FR"], ur: ["hi-IN"], fa: ["ar-SA"], ha: ["en-US"], am: ["ar-SA"], sw: ["en-US"], uk: ["ru-RU"] };
  const norm = l => String(l || "").replace("_", "-").toLowerCase();
  const quality = v => (/natural|neural|online|enhanced|premium|google/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0);
  window.amanPickVoice = function (lang) {
    const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    if (!vs.length) return null;
    const tryOne = tag => {
      const t = norm(tag), b = t.split("-")[0];
      const exact = vs.filter(v => norm(v.lang) === t).sort((a, z) => quality(z) - quality(a));
      if (exact.length) return exact[0];
      const base = vs.filter(v => norm(v.lang).split("-")[0] === b).sort((a, z) => quality(z) - quality(a));
      return base[0] || null;
    };
    const chain = [lang].concat(FALLBACK[norm(lang).split("-")[0]] || []);
    for (const c of chain) { const v = tryOne(c); if (v) return v; }
    return null;
  };
  window.amanVoiceAvailable = lang => !!(amanPickVoice(lang) && norm(amanPickVoice(lang).lang).split("-")[0] === norm(lang).split("-")[0]);

  // ---- 4. Speech: per-sentence language, no emojis/symbols, safe cancel ----
  const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}️‍⃣]/gu;
  window.amanStripEmoji = s => String(s || "").replace(EMOJI, "").replace(/[ \t]{2,}/g, " ");
  const cleanForSpeech = s => amanStripEmoji(s).replace(/<[^>]*>/g, " ").replace(/https?:\/\/\S+/g, " ").replace(/[*_#>`|~^=\[\]{}←→↑↓•·]/g, " ").replace(/\s+/g, " ").trim();
  window.amanUpdateAudioStatus = function () {
    const status = document.getElementById("ai-audio-status");
    const supported = "speechSynthesis" in window;
    const arabic = supported && speechSynthesis.getVoices().some(v => /^ar(?:[-_]|$)/i.test(v.lang));
    if (status) status.textContent = !supported
      ? tr(["القراءة الصوتية ما مدعومةش فهاد المتصفح. الجواب كيبقى مكتوب.", "Lecture audio indisponible dans ce navigateur. La réponse reste écrite.", "Speech is unavailable in this browser. Replies remain available as text."])
      : !window.amanTtsEnabled
      ? tr(["الصوت موقف. فعّلو باش تسمع الأجوبة.", "Audio désactivé. Activez-le pour écouter les réponses.", "Audio is off. Enable it to hear replies."])
      : !arabic
      ? tr(["باش تسمع العربية والدارجة، خاص صوت عربي فإعدادات الهاتف. تقدر تعاود تسمع أي جواب بزر «استماع».", "Installez une voix arabe dans les réglages du téléphone pour écouter l’arabe et la darija. Le bouton Écouter relance la lecture.", "Install an Arabic voice in your phone settings for Arabic and Darija. Use Listen on any reply to play it again."])
      : tr(["الجواب كيتقرا بالصوت. نطق الدارجة كيعتمد على الأصوات المتوفرة فالهاتف. استعمل «استماع» إلا ما بداش تلقائياً.", "Les réponses sont lues à voix haute. La prononciation de la darija dépend des voix installées. Touchez Écouter si la lecture ne démarre pas.", "Replies are spoken aloud. Darija pronunciation depends on installed voices. Tap Listen if playback does not start."]);
    const toggle = document.getElementById("ai-audio-toggle");
    if (toggle) { toggle.setAttribute("aria-pressed", String(window.amanTtsEnabled)); toggle.disabled = !supported; }
    document.querySelectorAll(".ai-tts").forEach(b => b.setAttribute("aria-pressed", String(window.amanTtsEnabled)));
  };
  if (window.speechSynthesis) speechSynthesis.addEventListener("voiceschanged", () => window.amanUpdateAudioStatus());
  let sayId = 0;
  let activeUtterance = null;
  let speechFinish = null;
  window.amanSay = function (text, onEnd) {
    if (speechFinish) speechFinish();
    const id = ++sayId;
    let ended = false;
    const finish = () => { if (ended) return; ended = true; activeUtterance = null; speechFinish = null; onEnd && onEnd(); };
    speechFinish = finish;
    if (!("speechSynthesis" in window)) { finish(); return; }
    try { speechSynthesis.cancel(); window.amanVC?.rec?.abort(); } catch (e) {}
    const clean = cleanForSpeech(text);
    if (!clean) { finish(); return; }
    const hint = amanReplyLangObj().tts || "";
    const sentences = clean.match(/[^.!?؟।。！？\n]{1,200}[.!?؟।。！？]*/g) || [clean];
    const parts = [];
    sentences.forEach(p => {
      p = p.trim(); if (!p || !/[\p{L}\p{N}]/u.test(p)) return;
      // split mixed Arabic / Latin sentences so each part gets the right voice
      const runs = p.match(/[؀-ۿݐ-ݿ][^A-Za-zÀ-ɏ]*|[A-Za-zÀ-ɏ][^؀-ۿݐ-ݿ]*|[^؀-ۿA-Za-zÀ-ɏ]+/g) || [p];
      runs.forEach(r => {
        r = r.trim(); if (!r || !/[\p{L}\p{N}]/u.test(r)) return;
        let lang = amanDetectLang(r.length < 12 ? p : r, hint);
        if (lang === "zgh") { if (!/[A-Za-z؀-ۿ]/.test(clean)) lang = "ar-MA"; else return; } // Tifinagh has no voice: read its transliteration
        const last = parts[parts.length - 1];
        if (last && last.lang === lang && last.text.length + r.length < 220) last.text += " " + r; else parts.push({ text: r, lang });
      });
    });
    if (!parts.length) { finish(); return; }
    let i = 0;
    const next = () => {
      if (id !== sayId) { finish(); return; }
      if (i >= parts.length) { finish(); return; }
      const p = parts[i++], voice = amanPickVoice(p.lang);
      if (!voice && /^ar(?:-|$)/i.test(p.lang)) { window.amanUpdateAudioStatus(); finish(); return; }
      const u = new SpeechSynthesisUtterance(p.text);
      activeUtterance = u;
      u.lang = voice ? voice.lang : p.lang; if (voice) u.voice = voice;
      u.rate = (window.amanA11y && window.amanA11y.rate) || 0.95;
      u.onend = next;
      u.onerror = e => { if (["interrupted", "canceled", "not-allowed", "language-unavailable", "voice-unavailable"].includes(e.error)) { if (e.error === "not-allowed" && window.amanVoice?.on) amanVoiceSet("idle"); finish(); } else next(); };
      try { speechSynthesis.speak(u); } catch (e) { finish(); }
    };
    setTimeout(next, 40); // let cancel() settle (Safari / Android)
  };
  window.amanStopSpeech = function () { sayId++; try { speechSynthesis.cancel(); } catch (e) {} if (speechFinish) speechFinish(); };
  window.amanReadPage = function () {
    const m = document.getElementById("m");
    if (!m) return;
    if (window.speechSynthesis && speechSynthesis.speaking) { amanStopSpeech(); return; }
    const c = m.cloneNode(true);
    c.querySelectorAll("script,style,svg,select,.ai-msg-actions,[aria-hidden=true]").forEach(x => x.remove());
    amanSay(c.innerText || c.textContent);
  };

  // AI replies: no emojis on screen either
  const baseFormat = window.amanFormatAiReply;
  if (baseFormat) window.amanFormatAiReply = raw => baseFormat(amanStripEmoji(raw));

  // ---- 5. Native screen readers: lang tags, names, focus ----
  const TAG_SEL = "h1,h2,h3,h4,p,li,a,button,label,td,th,small,b,strong,span,option,blockquote,figcaption,summary";
  function tagLangs(root) {
    const page = UI();
    root.querySelectorAll(".ai-msg-bubble:not([data-lt])").forEach(b => {
      b.dataset.lt = 1;
      const c = b.cloneNode(true); c.querySelectorAll(".ai-msg-actions").forEach(x => x.remove());
      const txt = (c.textContent || "").trim(); if (!txt) return;
      const isUser = !!b.closest(".ai-msg.user");
      const lang = amanDetectLang(txt, isUser ? "" : (amanReplyLangObj().tts || ""));
      const code = lang === "zgh" ? "zgh" : lang;
      b.setAttribute("lang", code); b.setAttribute("dir", "auto");
      const a = b.querySelector(".ai-msg-actions"); if (a) { a.setAttribute("lang", page); a.setAttribute("dir", page === "ar" ? "rtl" : "ltr"); }
    });
    root.querySelectorAll(TAG_SEL).forEach(el => {
      if (el.dataset.lt || el.hasAttribute("lang") || el.closest(".ai-msg-bubble") || el.closest(".a11y-noread")) return;
      el.dataset.lt = 1;
      if (el.parentElement && el.parentElement.closest("[data-ltset]")) return;
      const txt = (el.getAttribute("aria-label") || el.textContent || "").trim();
      if (txt.length < 3 || txt.length > 800) return;
      const ar = count(txt, /[؀-ۿ]/g), lat = count(txt, /[A-Za-zÀ-ɏ]/g);
      let lang = "";
      if (page === "ar" && lat > ar * 2 && lat >= 4 && !/^[A-Z0-9 +\-]{2,8}$/.test(txt)) lang = amanDetectLang(txt, "").split("-")[0];
      else if (page !== "ar" && ar > lat) lang = "ar";
      else if (page !== "ar") { const d = amanDetectLang(txt, "").split("-")[0]; const other = { es: 1, pt: 1, it: 1, de: 1, nl: 1, tr: 1 }; if (other[d] && txt.split(/\s+/).length > 3) lang = d; }
      if (lang && lang !== page) { el.setAttribute("lang", lang); el.dataset.ltset = 1; if (lang === "ar" || lang === "fa" || lang === "ur" || lang === "he") el.setAttribute("dir", "rtl"); }
    });
  }
  function fixNames(root) {
    root.querySelectorAll("svg:not([aria-hidden]):not([role=img])").forEach(s => { s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false"); });
    root.querySelectorAll("button,a[href],[role=button],input,select,textarea").forEach(el => {
      if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return;
      if (/^(input|select|textarea)$/i.test(el.tagName)) {
        if (el.type === "hidden" || (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) || el.closest("label")) return;
        const n = el.getAttribute("placeholder") || el.title; if (n) el.setAttribute("aria-label", n); return;
      }
      if ((el.textContent || "").trim()) return;
      const img = el.querySelector("img[alt]:not([alt=''])");
      const n = el.title || (img && img.alt) || "";
      if (n) el.setAttribute("aria-label", n);
    });
    root.querySelectorAll("img:not([alt])").forEach(i => i.alt = "");
  }
  let pending = 0;
  const dirty = new Set();
  function pass() {
    pending = 0;
    const roots = [...dirty]; dirty.clear();
    roots.forEach(root => { if (root.isConnected) { try { fixNames(root); tagLangs(root); } catch (e) { console.warn("a11y pass", e); } } });
  }
  const schedule = (root = document.body) => { dirty.add(root); if (!pending) pending = setTimeout(pass, 120); };
  new MutationObserver(records => {
    records.forEach(r => { if (r.target.nodeType === 1) schedule(r.target); });
  }).observe(document.body, { childList: true, subtree: true });
  schedule();

  // Re-tag when the chosen reply language changes
  const baseSet = window.amanSetReplyLang;
  window.amanSetReplyLang = function (k) { baseSet(k); document.querySelectorAll(".ai-msg.assistant .ai-msg-bubble[data-lt]").forEach(b => delete b.dataset.lt); schedule(); };

  // Page change: move focus to the page heading so TalkBack/VoiceOver announce the new page
  window.addEventListener("hashchange", () => setTimeout(() => {
    const m = document.getElementById("m");
    const camo = document.getElementById("aman-camou-screen");
    if (!m || (camo && camo.style.display === "block")) return;
    if (document.activeElement && document.activeElement.closest && document.activeElement.closest("#aman-voice,#aman-sos-modal")) return;
    const h = m.querySelector("h1,h2") || m;
    if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
    h.focus({ preventScroll: true });
    const name = (h.textContent || "").trim().slice(0, 60);
    if (name) document.title = name + " – AMAN";
  }, 260));

  // Chat: tell screen readers the assistant is writing
  const baseTyping = window.amanShowTyping;
  if (baseTyping) window.amanShowTyping = function () {
    const box = document.getElementById("ai-chat-box"); if (box) box.setAttribute("aria-busy", "true");
    amanAnnounce(["مساعد أمان كيكتب الجواب…", "L'assistant AMAN rédige sa réponse…", "AMAN assistant is writing…"][L]);
    return baseTyping.apply(this, arguments);
  };
  const baseRemove = window.amanRemoveTyping;
  if (baseRemove) window.amanRemoveTyping = function () {
    const box = document.getElementById("ai-chat-box"); if (box) box.removeAttribute("aria-busy");
    return baseRemove.apply(this, arguments);
  };

  // ---- 6. Accessibility page: screen-reader guide + voices on this device ----
  const SRT = {
    h: ["TalkBack و VoiceOver: قارئ الشاشة", "TalkBack et VoiceOver : lecteur d'écran", "TalkBack & VoiceOver: screen reader"],
    d: ["الموقع مصمم يخدم مع قارئ الشاشة ديال الهاتف. كل زر عندو اسم مسموع، وكل نص كيتعلم بلغتو باش الهاتف يقراه بالصوت المناسب (الدارجة بجميع لهجاتها، الحسانية، الأمازيغية بالحروف اللاتينية، العربية والفرنسية).", "Le site est conçu pour le lecteur d'écran du téléphone. Chaque bouton a un nom vocal et chaque texte est marqué avec sa langue pour être lu avec la bonne voix.", "The site is built for your phone's screen reader. Every button has a spoken name and every text is marked with its language so it is read with the right voice."],
    and: ["أندرويد (TalkBack)", "Android (TalkBack)", "Android (TalkBack)"],
    andS: [["التشغيل: الإعدادات ← تسهيل الاستخدام ← TalkBack، أو اضغط على زرّي الصوت معاً 3 ثواني.", "اسحب بأصبع واحد يمين/يسار للانتقال، واضغط مرتين للتفعيل.", "باش يقرا بجميع اللغات: الإعدادات ← تسهيل الاستخدام ← تحويل النص إلى كلام ← محرك Google ← ثبّت بيانات الصوت للعربية والفرنسية واللغات اللي بغيتي.", "فإعدادات TalkBack فعّل «تغيير اللغة تلقائياً» (Language switching)."],
      ["Activer : Paramètres › Accessibilité › TalkBack, ou maintenez les deux touches de volume 3 secondes.", "Glissez à droite/gauche pour avancer, touchez deux fois pour activer.", "Pour toutes les langues : Paramètres › Accessibilité › Synthèse vocale › moteur Google › installez les voix (arabe, français, etc.).", "Dans les réglages de TalkBack, activez le changement automatique de langue."],
      ["Turn on: Settings › Accessibility › TalkBack, or hold both volume keys for 3 seconds.", "Swipe right/left to move, double-tap to activate.", "For every language: Settings › Accessibility › Text-to-speech › Google engine › install voice data (Arabic, French, etc.).", "In TalkBack settings, turn on automatic language switching."]],
    ios: ["آيفون (VoiceOver)", "iPhone (VoiceOver)", "iPhone (VoiceOver)"],
    iosS: [["التشغيل: الإعدادات ← تسهيل الاستخدام ← VoiceOver، أو اضغط 3 مرات على الزر الجانبي.", "اسحب يمين/يسار للانتقال، واضغط مرتين للتفعيل. اسحب بأصبعين للأسفل لقراءة كل الصفحة.", "باش يقرا بجميع اللغات: VoiceOver ← الكلام ← أضف لغة (العربية، الفرنسية…)، وفعّل «كشف اللغات».", "دوّر بأصبعين (الروتور) واختر «اللغات» باش تبدّل الصوت يدوياً."],
      ["Activer : Réglages › Accessibilité › VoiceOver, ou triple-clic sur le bouton latéral.", "Glissez pour avancer, touchez deux fois pour activer. Balayez à deux doigts vers le bas pour tout lire.", "Pour toutes les langues : VoiceOver › Parole › ajoutez des langues et activez « Détecter les langues ».", "Le rotor (rotation à deux doigts) › Langues permet de changer de voix."],
      ["Turn on: Settings › Accessibility › VoiceOver, or triple-click the side button.", "Swipe to move, double-tap to activate. Two-finger swipe down reads the whole page.", "For every language: VoiceOver › Speech › add languages and turn on Detect Languages.", "Use the rotor (two-finger twist) › Languages to switch voice by hand."]],
    pc: ["الحاسوب (NVDA / JAWS / Narrator)", "Ordinateur (NVDA / JAWS / Narrateur)", "Computer (NVDA / JAWS / Narrator)"],
    pcS: [["فعّل «التبديل التلقائي للغة» فإعدادات الصوت.", "H للتنقل بين العناوين، B للأزرار، و Alt+S للطوارئ."], ["Activez le changement automatique de langue dans les réglages de voix.", "H pour les titres, B pour les boutons, Alt+S pour SOS."], ["Turn on automatic language switching in voice settings.", "H jumps between headings, B between buttons, Alt+S opens SOS."]],
    v: ["الأصوات المتوفرة فهاد الجهاز", "Voix disponibles sur cet appareil", "Voices on this device"],
    vD: ["هادي الأصوات العربية والفرنسية اللي فهاتفك (الصوت العربي كيقرا الدارجة، والفرنسي كيقرا الدارجة والأمازيغية بالحروف اللاتينية). إلا ما لقيتيهمش، ثبّتهم من إعدادات الهاتف كما فوق.", "Langues que votre appareil peut lire maintenant. Touchez une langue pour l'écouter. Sinon, installez sa voix dans les réglages.", "Languages your device can read right now. Tap one to hear it. If yours is missing, install its voice in the phone settings above."],
    none: ["ما لقينا حتى صوت فهاد المتصفح. جرّب Chrome أو Safari، أو استعمل TalkBack / VoiceOver مباشرة.", "Aucune voix trouvée dans ce navigateur. Essayez Chrome ou Safari, ou utilisez TalkBack / VoiceOver.", "No voices found in this browser. Try Chrome or Safari, or use TalkBack / VoiceOver directly."],
    test: ["جرّب: اكتب أي جملة بالدارجة ولا بالأمازيغية واسمعها", "Essai : écrivez une phrase en darija ou en amazigh", "Try: type a sentence in Darija or Amazigh"],
    play: ["اسمع", "Écouter", "Listen"],
    det: ["اللغة المكتشفة:", "Langue détectée :", "Detected language:"]
  };
  const langName = tag => { try { return new Intl.DisplayNames([UI()], { type: "language" }).of(tag); } catch (e) { return tag; } };
  const selfName = tag => { try { return new Intl.DisplayNames([tag], { type: "language" }).of(tag.split("-")[0]); } catch (e) { return tag; } };
  window.amanRenderVoices = function () {
    const host = document.getElementById("a11y-voices"); if (!host) return;
    const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    if (!vs.length) { host.innerHTML = `<p class="note">${tr(SRT.none)}</p>`; return; }
    const by = {};
    vs.forEach(v => { const b = norm(v.lang).split("-")[0]; if (b) (by[b] = by[b] || []).push(v); });
    const keys = ["ar", "fr"].filter(b => by[b]); // Morocco: Arabic voices (Darija) and French voices (Latin-script Darija/Amazigh)
    host.innerHTML = `<p class="note">${keys.length} ${["لغة", "langues", "languages"][L]}</p><ul class="a11y-voices">` + keys.map(b =>
      `<li><button type="button" class="btn o" lang="${b}" onclick="amanTestVoice('${b}')" aria-label="${amanEsc(langName(b))}, ${by[b].length} ${["صوت", "voix", "voices"][L]}">${svgIcon("volume", "ic", 16)} <span>${amanEsc(langName(b))}</span> <small>${by[b].length}</small></button></li>`).join("") + "</ul>";
  };
  window.amanTestVoice = function (b) {
    const v = amanPickVoice(b);
    const txt = "AMAN. " + selfName(v ? v.lang : b);
    const id = ++sayId;
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(txt); u.lang = v ? v.lang : b; if (v) u.voice = v; u.rate = (amanA11y && amanA11y.rate) || 0.95;
    setTimeout(() => { if (id === sayId) try { speechSynthesis.speak(u); } catch (e) { finish(); } }, 40);
  };
  window.amanTryText = function () {
    const i = document.getElementById("a11y-try"), o = document.getElementById("a11y-try-out");
    const s = (i && i.value || "").trim(); if (!s) { i && i.focus(); return; }
    const lang = amanDetectLang(s, "");
    if (o) o.textContent = tr(SRT.det) + " " + (lang === "zgh" ? "Tamazight (Tifinagh)" : langName(lang)) + (lang !== "zgh" && !amanVoiceAvailable(lang) ? " – " + ["ما كاينش صوت خاص بها فهاد الجهاز", "pas de voix dédiée sur cet appareil", "no dedicated voice on this device"][L] : "");
    amanSay(s);
  };
  if ("speechSynthesis" in window) {
    const prev = speechSynthesis.onvoiceschanged;
    speechSynthesis.onvoiceschanged = function () { try { prev && prev.apply(this, arguments); } catch (e) {} amanRenderVoices(); };
  }
  const steps = a => `<ol class="a11y-steps">${tr(a).map(x => `<li>${x}</li>`).join("")}</ol>`;
  const baseAccess = P.access;
  P.access = function () {
    const html = baseAccess();
    const extra = `<section class="card a11y-sr" aria-labelledby="sr-h">
      <h3 id="sr-h">${svgIcon("ai", "ic", 20)} ${tr(SRT.h)}</h3><p>${tr(SRT.d)}</p>
      <div class="grid">
        <div><h4>${svgIcon("phone", "ic", 18)} ${tr(SRT.and)}</h4>${steps(SRT.andS)}</div>
        <div><h4>${svgIcon("phone", "ic", 18)} ${tr(SRT.ios)}</h4>${steps(SRT.iosS)}</div>
        <div><h4>${svgIcon("keyboard", "ic", 18)} ${tr(SRT.pc)}</h4>${steps(SRT.pcS)}</div>
      </div>
      <h4>${svgIcon("globe", "ic", 18)} ${tr(SRT.test)}</h4>
      <div class="a11y-row"><input id="a11y-try" type="text" dir="auto" aria-label="${tr(SRT.test)}" placeholder="Salam / السلام / واش لاباس / Azul / Bonjour" style="flex:1;min-width:180px"><button type="button" class="btn d" onclick="amanTryText()">${svgIcon("play", "ic", 18)} ${tr(SRT.play)}</button></div>
      <p id="a11y-try-out" class="note" role="status" aria-live="polite"></p>
      <h4>${svgIcon("volume", "ic", 18)} ${tr(SRT.v)}</h4><p class="note">${tr(SRT.vD)}</p>
      <div id="a11y-voices"></div>
    </section>`;
    const i = html.lastIndexOf("</section>");
    setTimeout(amanRenderVoices, 0);
    return i > 0 ? html.slice(0, i) + extra + html.slice(i) : html + extra;
  };
  if (typeof route === "function" && route() === "access") setTimeout(() => window.draw(), 0);
})();
