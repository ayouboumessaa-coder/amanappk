/* AMAN voice assistant, A to Z: every Moroccan dialect and Arabic voice on the device,
   a voice per dialect, the listening language, dictation into any field, calls, SMS /
   WhatsApp / email, saved contacts, location, clicking buttons by name, asking AMAN AI.
   Loaded after app-extra.js. Contacts and voice choices stay on this device only. */
(function () {
  if (typeof P === "undefined") return;
  const tr = a => (a && (a[L] || a[0])) || "";
  const lb = (ar, fr, en) => [ar, fr, en][L] || ar;
  const E = s => amanEsc(String(s == null ? "" : s));
  const store = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const ln = l => String(l || "").replace("_", "-").toLowerCase();
  const base = l => ln(l).split("-")[0];
  const voices = () => (window.speechSynthesis && speechSynthesis.getVoices()) || [];
  const uiLang = () => ["ar", "fr", "en"][L] || "ar";
  const langName = tag => { try { return new Intl.DisplayNames([uiLang()], { type: "language" }).of(tag); } catch (e) { return tag; } };

  /* ================= 1. Dialects and their voices ================= */
  // pref: voice tags to try first. b: voice families the user may pick from.
  const DIALECTS = [
    { k: "darija", g: "ma", pref: ["ar-MA", "ar"], b: ["ar", "fr"], n: ["الدارجة المغربية", "Darija marocaine", "Moroccan Darija"], s: "السلام، أنا أمان. واش نقدر نعاونك؟ ما تخافيش، أنا معاك." },
    { k: "chamali", g: "ma", pref: ["ar-MA", "ar"], b: ["ar", "fr"], n: ["الشمالية / الجبلية (طنجة، تطوان)", "Darija du Nord (Jebli)", "Northern Darija (Jebli)"], s: "السلام، أنا أمان. كيفاش نقدر نعاونك؟ أنا هنا معاك." },
    { k: "charqi", g: "ma", pref: ["ar-MA", "ar-DZ", "ar"], b: ["ar", "fr"], n: ["الشرقية (وجدة)", "Darija de l'Oriental (Oujda)", "Eastern Darija (Oujda)"], s: "السلام، أنا أمان. واش راكي؟ راني هنا باش نعاونك." },
    { k: "aroubi", g: "ma", pref: ["ar-MA", "ar"], b: ["ar", "fr"], n: ["العروبية (دكالة، عبدة، الشاوية، الغرب)", "Darija aroubi (rurale)", "Rural Aroubi Darija"], s: "السلام، أنا أمان. آش خصك؟ أنا معاك وما غاديش نخليك." },
    { k: "hassaniya", g: "ma", pref: ["ar-MA", "ar-MR", "ar"], b: ["ar", "fr"], n: ["الحسانية (الصحراء)", "Hassaniya (Sahara)", "Hassaniya (Sahara)"], s: "السلام عليكم، أنا أمان. شحالك؟ آن هون باش نعاونك." },
    { k: "arabizi", g: "ma", pref: ["fr-FR", "fr", "ar-MA"], b: ["fr", "ar", "en"], n: ["الدارجة بالحروف اللاتينية", "Darija en lettres latines", "Darija in Latin letters"], s: "Salam, ana AMAN. Wach nqder nawnek? Ana hna m3ak." },
    { k: "tarifit", g: "ber", pref: ["fr-FR", "fr", "ar-MA"], b: ["fr", "ar"], n: ["تاريفيت (الريف)", "Tarifit (Rif)", "Tarifit (Rif)"], s: "Azul fellam, necc d AMAN. Mamec tellid?" },
    { k: "tachelhit", g: "ber", pref: ["fr-FR", "fr", "ar-MA"], b: ["fr", "ar"], n: ["تشلحيت (سوس)", "Tachelhit (Souss)", "Tachelhit (Souss)"], s: "Azul fellawn, nkki d AMAN. Mamnk a tllit?" },
    { k: "atlas", g: "ber", pref: ["fr-FR", "fr", "ar-MA"], b: ["fr", "ar"], n: ["تمازيغت (الأطلس المتوسط)", "Tamazight (Moyen Atlas)", "Central Atlas Tamazight"], s: "Azul, nekk d AMAN. Mamec tellid?" },
    { k: "fusha", g: "ar", pref: ["ar-SA", "ar-XA", "ar-EG", "ar-AE", "ar-MA", "ar"], b: ["ar"], n: ["العربية الفصحى", "Arabe standard", "Standard Arabic"], s: "السلام عليكم، أنا أمان. كيف يمكنني مساعدتك؟" },
    { k: "french", g: "off", pref: ["fr-FR", "fr-CA", "fr"], b: ["fr"], n: ["Français", "Français", "French"], s: "Bonjour, je suis AMAN. Comment puis-je vous aider ?" },
    { k: "english", g: "off", pref: ["en-GB", "en-US", "en"], b: ["en"], n: ["English", "Anglais", "English"], s: "Hello, I am AMAN. How can I help you?" }
  ];
  const GROUPS = { ma: ["الدارجة المغربية ولهجاتها", "Darija et dialectes marocains", "Moroccan Darija & dialects"], ber: ["الأمازيغية", "Amazigh", "Amazigh"], ar: ["العربية", "Arabe", "Arabic"], off: ["لغات أخرى", "Autres langues", "Other languages"] };
  const VKEY = "aman-dialect-voice";
  const quality = v => (/natural|neural|online|enhanced|premium|google|microsoft/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0);
  const byQuality = list => list.slice().sort((a, z) => quality(z) - quality(a));
  const findURI = uri => uri && voices().find(v => v.voiceURI === uri || v.name === uri);
  function autoVoice(d) {
    const vs = voices();
    for (const tag of d.pref) {
      const t = ln(tag);
      const hit = byQuality(vs.filter(v => (t.includes("-") ? ln(v.lang) === t : base(v.lang) === t)));
      if (hit.length) return hit[0];
    }
    return null;
  }
  const dialectVoice = d => findURI(load(VKEY, {})[d.k]) || autoVoice(d);

  // The voice picked for the current answer language wins when its language matches the text.
  const basePick = window.amanPickVoice;
  window.amanPickVoice = function (lang) {
    const map = load(VKEY, {});
    const k = window.amanReplyLang;
    const fam = base(lang);
    const cand = [k, fam === "ar" ? "darija" : fam === "fr" ? "french" : fam === "en" ? "english" : ""].filter(Boolean);
    for (const c of cand) { const v = findURI(map[c]); if (v && base(v.lang) === fam) return v; }
    return basePick ? basePick(lang) : null;
  };

  let sayN = 0;
  const speakWith = (text, v, lang) => {
    if (!("speechSynthesis" in window)) return;
    const id = ++sayN;
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = v ? v.lang : lang; if (v) u.voice = v;
    u.rate = (window.amanA11y && amanA11y.rate) || 0.95;
    setTimeout(() => { if (id === sayN) speechSynthesis.speak(u); }, 40);
  };
  window.amanTestDialect = function (k) {
    const d = DIALECTS.find(x => x.k === k); if (!d) return;
    const v = dialectVoice(d);
    speakWith(d.s, v, d.pref[0]);
    const o = document.getElementById("dv-out");
    if (o) o.textContent = tr(d.n) + " – " + (v ? `${v.name} (${langName(v.lang)})` : lb("الصوت الافتراضي ديال الجهاز", "voix par défaut de l'appareil", "device default voice"));
  };
  window.amanSetDialectVoice = function (k, uri) {
    const map = load(VKEY, {});
    if (uri) map[k] = uri; else delete map[k];
    store(VKEY, map);
    amanTestDialect(k);
  };
  window.amanTestVoiceURI = function (uri, lang) {
    const v = findURI(uri);
    const d = DIALECTS.find(x => x.pref.some(p => ln(p) === ln(lang))) || DIALECTS.find(x => x.b[0] === base(lang));
    speakWith(base(lang) === "ar" ? (ln(lang) === "ar-ma" ? DIALECTS[0].s : DIALECTS.find(x => x.k === "fusha").s) : d ? d.s : "AMAN", v, lang);
  };

  /* ---------- Listening (speech recognition) language ---------- */
  const RKEY = "aman-rec-lang";
  const RECS = [
    ["", ["تلقائي (حسب لغة الجواب)", "Automatique (selon la langue de réponse)", "Automatic (follows answer language)"]],
    ["ar-MA", ["الدارجة المغربية وجميع اللهجات (ar-MA)", "Darija marocaine et dialectes (ar-MA)", "Moroccan Darija & dialects (ar-MA)"]],
    ["ar-DZ", ["الشرقية / القريبة من الجزائرية (ar-DZ)", "Oriental / proche algérien (ar-DZ)", "Eastern / near Algerian (ar-DZ)"]],
    ["ar-MR", ["الحسانية / القريبة من الموريتانية (ar-MR)", "Hassaniya / proche mauritanien (ar-MR)", "Hassaniya / near Mauritanian (ar-MR)"]],
    ["ar-SA", ["العربية الفصحى (ar-SA)", "Arabe standard (ar-SA)", "Standard Arabic (ar-SA)"]],
    ["ar-EG", ["العربية المصرية (ar-EG)", "Arabe égyptien (ar-EG)", "Egyptian Arabic (ar-EG)"]],
    ["fr-FR", ["الفرنسية (fr-FR)", "Français (fr-FR)", "French (fr-FR)"]],
    ["en-US", ["الإنجليزية (en-US)", "Anglais (en-US)", "English (en-US)"]]
  ];
  window.amanRecLang = function () {
    const s = load(RKEY, "");
    if (s) return s;
    const o = typeof amanReplyLangObj === "function" ? amanReplyLangObj() : null;
    return (o && o.sr) || "";
  };
  window.amanSetRecLang = function (v) {
    store(RKEY, v || null);
    try { window.amanVC && amanVC.rec && amanVC.rec.abort(); } catch (e) {}
    if (window.amanAnnounce) amanAnnounce(lb("لغة الاستماع: ", "Langue d'écoute : ", "Listening language: ") + tr((RECS.find(r => r[0] === v) || RECS[0])[1]));
  };

  /* ---------- Voices list on the accessibility page ---------- */
  window.amanRenderVoices = function () {
    const host = document.getElementById("a11y-voices"); if (!host) return;
    const vs = voices();
    if (!("speechSynthesis" in window) || !vs.length) {
      host.innerHTML = `<p class="note">${lb("ما لقينا حتى صوت فهاد المتصفح. جرّب Chrome أو Safari، أو استعمل TalkBack / VoiceOver مباشرة.", "Aucune voix trouvée dans ce navigateur. Essayez Chrome ou Safari, ou utilisez TalkBack / VoiceOver.", "No voices found in this browser. Try Chrome or Safari, or use TalkBack / VoiceOver directly.")}</p>`;
      return;
    }
    const map = load(VKEY, {});
    const opt = (v, sel) => `<option value="${E(v.voiceURI)}"${sel ? " selected" : ""}>${E(v.name)} – ${E(langName(v.lang))}</option>`;
    const rows = Object.keys(GROUPS).map(g => {
      const ds = DIALECTS.filter(d => d.g === g);
      return `<h5 class="dv-group">${tr(GROUPS[g])}</h5><ul class="dv-list">` + ds.map(d => {
        const pool = byQuality(vs.filter(v => d.b.includes(base(v.lang)))).sort((a, z) => d.b.indexOf(base(a.lang)) - d.b.indexOf(base(z.lang)));
        const cur = map[d.k] || "";
        const auto = autoVoice(d);
        const id = "dv-" + d.k;
        return `<li class="dv-row"><label for="${id}"><b>${E(tr(d.n))}</b></label>
          <select id="${id}" onchange="amanSetDialectVoice('${d.k}',this.value)">
            <option value="">${lb("تلقائي", "Automatique", "Automatic")}${auto ? " – " + E(auto.name) : ""}</option>
            ${pool.map(v => opt(v, v.voiceURI === cur)).join("")}
          </select>
          <button type="button" class="btn o" onclick="amanTestDialect('${d.k}')" aria-label="${lb("اسمع", "Écouter", "Listen")}: ${E(tr(d.n))}">${svgIcon("volume", "ic", 16)} <span>${lb("اسمع", "Écouter", "Listen")}</span></button></li>`;
      }).join("") + "</ul>";
    }).join("");
    // Every Arabic variety installed, plus French and English
    const regions = {};
    vs.forEach(v => { const b = base(v.lang); if (["ar", "fr", "en"].includes(b)) (regions[ln(v.lang)] = regions[ln(v.lang)] || []).push(v); });
    const order = t => (t === "ar-ma" ? 0 : base(t) === "ar" ? 1 : base(t) === "fr" ? 2 : 3);
    const tags = Object.keys(regions).sort((a, z) => order(a) - order(z) || a.localeCompare(z));
    const arCount = vs.filter(v => base(v.lang) === "ar").length;
    const hasMA = !!regions["ar-ma"];
    const all = `<h5 class="dv-group">${lb("جميع الأصوات العربية والفرنسية والإنجليزية فهاد الجهاز", "Toutes les voix arabes, françaises et anglaises de l'appareil", "All Arabic, French and English voices on this device")} <small>(${lb("عربية", "arabes", "Arabic")}: ${arCount})</small></h5>
      <ul class="a11y-voices">${tags.map(t => regions[t].map(v => `<li><button type="button" class="btn o" lang="${E(v.lang)}" onclick="amanTestVoiceURI(this.dataset.u,'${E(v.lang)}')" data-u="${E(v.voiceURI)}">${svgIcon("volume", "ic", 16)} <span>${E(v.name)}</span> <small>${E(langName(v.lang))}</small></button></li>`).join("")).join("")}</ul>
      ${hasMA ? "" : `<p class="note">${lb("ما كاينش صوت «العربية (المغرب)» فهاد الجهاز، كنستعملو صوت عربي آخر. باش تزيدو: أندرويد ← الإعدادات ← تسهيل الاستخدام ← تحويل النص إلى كلام ← محرك Google ← تثبيت بيانات الصوت ← العربية. آيفون ← الإعدادات ← تسهيل الاستخدام ← المحتوى المنطوق ← الأصوات ← العربية.", "Pas de voix « arabe (Maroc) » sur cet appareil : une autre voix arabe est utilisée. Pour l'ajouter : Android › Paramètres › Accessibilité › Synthèse vocale › moteur Google › installer les données vocales › Arabe. iPhone › Réglages › Accessibilité › Contenu énoncé › Voix › Arabe.", "No \"Arabic (Morocco)\" voice on this device, so another Arabic voice is used. To add one: Android › Settings › Accessibility › Text-to-speech › Google engine › Install voice data › Arabic. iPhone › Settings › Accessibility › Spoken Content › Voices › Arabic.")}</p>`}`;
    const rec = load(RKEY, "");
    const recSel = `<label class="reply-lang dv-rec" for="dv-rec">${svgIcon("mic", "ic", 16)}<span>${lb("لغة الاستماع (التعرف على الصوت)", "Langue d'écoute (reconnaissance vocale)", "Listening language (speech recognition)")}</span>
      <select id="dv-rec" onchange="amanSetRecLang(this.value)">${RECS.map(r => `<option value="${r[0]}"${r[0] === rec ? " selected" : ""}>${E(tr(r[1]))}</option>`).join("")}</select></label>`;
    host.innerHTML = `<p class="note">${lb("اختار الصوت اللي بغيتي لكل لهجة، وضغط «اسمع» باش تجربو. الاختيار كيتسجل فهاد الجهاز فقط.", "Choisissez une voix pour chaque dialecte et touchez « Écouter » pour l'essayer. Le choix reste sur cet appareil.", "Pick a voice for each dialect and tap \"Listen\" to try it. The choice stays on this device.")}</p>
      ${recSel}${rows}<p id="dv-out" class="note" role="status" aria-live="polite"></p>${all}`;
  };

  /* ================= 2. Saved contacts (this device only) ================= */
  const CKEY = "aman-contacts";
  const contacts = () => load(CKEY, []).filter(c => c && c.n && c.p);
  const toDigits = s => String(s || "").replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632).replace(/[۰-۹]/g, d => d.charCodeAt(0) - 1776);
  const cleanPhone = s => { const t = toDigits(s).trim(); return (t.startsWith("+") ? "+" : "") + t.replace(/\D/g, ""); };
  window.amanAddContact = function (name, phone, quiet) {
    name = String(name || "").trim().slice(0, 40); phone = cleanPhone(phone);
    if (!name || phone.replace("+", "").length < 3) return false;
    const list = contacts().filter(c => vnorm(c.n) !== vnorm(name));
    list.push({ n: name, p: phone }); store(CKEY, list);
    if (!quiet && typeof route === "function" && route() === "access") draw();
    return true;
  };
  window.amanDelContact = function (i) { const l = contacts(); l.splice(i, 1); store(CKEY, l); draw(); };
  window.amanAddContactForm = function () {
    const n = document.getElementById("ct-name"), p = document.getElementById("ct-phone"), o = document.getElementById("ct-out");
    if (!amanAddContact(n && n.value, p && p.value, true)) { if (o) o.textContent = lb("كتب الاسم والرقم.", "Écrivez le nom et le numéro.", "Enter a name and a number."); return; }
    draw(); setTimeout(() => { const x = document.getElementById("ct-out"); if (x) x.textContent = lb("تسجل.", "Enregistré.", "Saved."); }, 50);
  };

  /* ================= 3. Voice commands from A to Z ================= */
  const vnorm = s => toDigits(s).toLowerCase().normalize("NFKD").replace(/[ً-ٰٟ̀-ͯ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  const words = list => list.split("|").map(vnorm).filter(Boolean).sort((a, z) => z.length - a.length);
  const W = {
    write: words("اكتب|اكتبي|كتب|كتبي|كتب ليا|كتبي ليا|اكتب ليا|سجل ليا|دون|ecris|ecrit|ecrire|tape|ecris moi|write|type|ari|aru"),
    dictOn: words("ابدا الكتابه|بدا الكتابه|بدا تكتب|ابدا تكتب|كتب اللي غادي نقول|كتب داكشي اللي نقول|الاملاء|وضع الكتابه|commence la dictee|dictee|mode dictee|start dictation|start writing|dictation"),
    dictOff: words("سالي الكتابه|صافي الكتابه|حبس الكتابه|وقف الكتابه|بركا من الكتابه|سالينا|صافي|fin de la dictee|arrete la dictee|arrete d ecrire|stop dictation|stop writing|done"),
    clearAll: words("امسح كلشي|مسح كلشي|امسح الكل|مسح الكل|خوي|efface tout|tout effacer|clear all|delete all"),
    delWord: words("امسح|مسح|امسح الكلمه|حيد الكلمه|efface|supprime|delete|undo"),
    newline: words("سطر جديد|رجع للسطر|نزل للسطر|a la ligne|nouvelle ligne|new line"),
    send: words("صيفط|صيفطي|سيفط|سيفطي|صفط|رسل|رسلي|ارسل|ارسلي|بعت|ابعت|بعث|ابعث|نشر|انشر|azn|azen|envoie|envoyer|envoi|publie|send|submit|post"),
    msg: words("رساله|ميساج|مساج|ميساجه|sms|اس ام اس|message|texto|text"),
    wa: words("واتساب|واتسب|الواتساب|الواتس|واتس|whatsapp|whats app|watsap|wtsp"),
    mail: words("ايميل|اميل|امايل|الايميل|بريد|email|e mail|mail|courriel"),
    call: words("عيط|عيطي|عيط على|عيطي على|عيط ل|اتصل|اتصلي|اتصل ب|تاصل|تصل|ضرب|طلب|طلب الرقم|دق|دقي|اعيط|ghr|ghar|appelle|appeler|appel|telephone a|compose|call|dial|phone"),
    save: words("سجل|سجلي|زيد|زيدي|حفظ|احفظ|خبي|enregistre|enregistrer|ajoute|sauvegarde|save|add contact"),
    contactWord: words("رقم|الرقم|نمره|النمره|contact|numero|number|باسم|سميه|سميها|سمي|بسميه|بسميت|nom|as|named|called|name"),
    trusted: words("الشخص الثقه|شخص الثقه|الثقه|ديال الثقه|personne de confiance|contact de confiance|confiance|trusted contact|trusted"),
    loc: words("موقعي|بلاصتي|فين انا|البلاصه ديالي|الموقع ديالي|ma position|ma localisation|position|localisation|my location|location"),
    body: words("قول ليه|قولي ليه|قول ليها|قولي ليها|قول ليهم|قوليه|قوليها|كتب ليه|كتب ليها|كتبي ليه|كتبي ليها|وقول|و قول|بلي|فيها|dis lui|dites lui|en disant|disant|ecris lui|que|saying|tell him|tell her|that says|that"),
    click: words("ضغط على|ضغطي على|اضغط على|اضغطي على|ورك على|وركي على|كليكي على|كليك على|بريسي على|حل|حلي|clique sur|clic sur|appuie sur|appuyez sur|touche|click on|click|press|tap on|tap"),
    ask: words("سول امان|سولي امان|اسال امان|اسالي امان|سول المساعد|سولي المساعد|امان|demande a aman|demande a l assistant|ask aman|ask the assistant|aman"),
    near: words("اقرب|قريب|قريبه|حدايا|فين كاين|فين كاينه|le plus proche|la plus proche|proche|pres de moi|nearest|near me|closest"),
    heads: words("شنو كاين فالصفحه|شنو فالصفحه|العناوين|عناوين الصفحه|les titres|titres|qu y a t il|headings|what s on the page"),
    cancel: words("لا|بلاش|الغي|الغي الرساله|حبس|annule|annuler|non|cancel|no")
  };
  const PLACES = [
    [words("كوميساريه|الكوميساريه|البوليس|الشرطه|بوليس|شرطه|commissariat|police"), "commissariat de police"],
    [words("الدرك|الجادارمي|جادارمي|gendarmerie"), "gendarmerie royale"],
    [words("سبيطار|السبيطار|مستشفي|المستشفي|سبيطار|اسعاف|urgences|hopital|hospital"), "hôpital urgences"],
    [words("المحكمه|محكمه|tribunal|court"), "tribunal de première instance"],
    [words("جمعيه|الجمعيه|جمعيات|association|associations"), "association soutien femmes"],
    [words("فرمسيان|فارماسي|صيدليه|الصيدليه|pharmacie|pharmacy"), "pharmacie de garde"]
  ];
  const SERVICES = [[words("الاسعاف|لانبيلانس|الوقايه المدنيه|المطافي|البومبيا|pompiers|protection civile|ambulance|samu"), "15"]];
  const pad = s => ` ${s} `;
  const hasW = (s, list) => list.some(w => pad(s).includes(pad(w)));
  // Text after the first command phrase found near the start (keeps the original wording).
  function after(raw, list, maxStart) {
    const toks = String(raw).trim().split(/\s+/), nt = toks.map(vnorm);
    for (const w of list) {
      const wt = w.split(" ");
      for (let i = 0; i <= Math.min(maxStart == null ? 3 : maxStart, nt.length - wt.length); i++) {
        if (wt.every((x, j) => nt[i + j] === x)) return toks.slice(i + wt.length).join(" ").trim();
      }
    }
    return null;
  }
  // Text after a body marker anywhere ("... قول ليه نتلاقاو غدا").
  function bodyOf(raw) {
    const toks = String(raw).trim().split(/\s+/), nt = toks.map(vnorm);
    for (const w of W.body) {
      const wt = w.split(" ");
      for (let i = 1; i <= nt.length - wt.length; i++) if (wt.every((x, j) => nt[i + j] === x)) return { body: toks.slice(i + wt.length).join(" ").trim(), head: toks.slice(0, i).join(" ") };
    }
    const c = String(raw).indexOf(":");
    if (c > 0) return { body: raw.slice(c + 1).trim(), head: raw.slice(0, c) };
    return { body: "", head: raw };
  }
  const numIn = raw => { const m = toDigits(raw).match(/\+?\d[\d\s.\-]{1,22}\d/); const p = m ? cleanPhone(m[0]) : ""; return p.replace("+", "").length >= 3 ? p : ""; };
  const mailIn = raw => { const m = String(raw).replace(/\s+(at|arobase|ات)\s+/gi, "@").replace(/\s+(dot|point|نقطه)\s+/gi, ".").match(/[\w.+-]+@[\w-]+\.[\w.]+/); return m ? m[0] : ""; };
  const contactIn = s => contacts().sort((a, z) => z.n.length - a.n.length).find(c => vnorm(c.n) && pad(s).includes(pad(vnorm(c.n))));
  function recipient(raw, s) {
    const n = numIn(raw); if (n) return { p: n, label: n };
    const c = contactIn(s); if (c) return { p: c.p, label: c.n };
    if (hasW(s, W.trusted)) { const t = window.amanGetTrusted && amanGetTrusted(); if (t) return { p: t, label: lb("الشخص الثقة", "la personne de confiance", "your trusted contact") }; }
    return null;
  }

  /* ---------- Fields: where dictation goes ---------- */
  const FIELD = 'textarea,input:not([type]),input[type=text],input[type=search],input[type=email],input[type=tel],input[type=url],input[type=number],[contenteditable=true],[contenteditable=""]';
  const isField = el => !!(el && el.matches && el.matches(FIELD));
  const shown = el => !!(el && el.isConnected && (el.offsetParent !== null || el.getClientRects().length) && !el.disabled && !el.readOnly && !el.closest("[hidden],[aria-hidden=true]"));
  let lastField = null;
  document.addEventListener("focusin", e => { if (isField(e.target)) lastField = e.target; }, true);
  function field() {
    const a = document.activeElement;
    if (isField(a) && shown(a)) return a;
    if (shown(lastField)) return lastField;
    const ai = document.getElementById("ai-input"); if (shown(ai)) return ai;
    const m = document.getElementById("m") || document.body;
    return [...m.querySelectorAll(FIELD)].find(shown) || null;
  }
  const fieldName = el => (el && (el.getAttribute("aria-label") || el.placeholder || (el.labels && el.labels[0] && el.labels[0].textContent) || "")).trim();
  function insert(text, mode) {
    const el = field(); if (!el) return null;
    try { el.focus({ preventScroll: false }); } catch (e) {}
    if (el.isContentEditable) {
      if (mode === "clear") el.textContent = "";
      else if (mode === "del") el.textContent = el.textContent.replace(/\s*\S+\s*$/, "");
      else document.execCommand("insertText", false, (el.textContent && !/\s$/.test(el.textContent) ? " " : "") + text);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      return el;
    }
    const v = el.value || "";
    let a = v.length, b = v.length;
    try { if (typeof el.selectionStart === "number") { a = el.selectionStart; b = el.selectionEnd; } } catch (e) {}
    let nv, caret;
    if (mode === "clear") { nv = ""; caret = 0; }
    else if (mode === "del") { const pre = v.slice(0, a).replace(/\s*\S+\s*$/, ""); nv = pre + v.slice(b); caret = pre.length; }
    else {
      const pre = v.slice(0, a);
      const glue = text === "\n" || !pre || /\s$/.test(pre) || /^[.,،؛؟?!:]/.test(text) ? "" : " ";
      const add = el.tagName === "TEXTAREA" || text !== "\n" ? glue + text : " ";
      nv = pre + add + v.slice(b); caret = (pre + add).length;
    }
    const max = el.maxLength > 0 ? el.maxLength : 0;
    if (max && nv.length > max) nv = nv.slice(0, max);
    el.value = nv;
    try { el.setSelectionRange(Math.min(caret, nv.length), Math.min(caret, nv.length)); } catch (e) {}
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return el;
  }
  const PUNCT = [[words("نقطه|point|full stop|period"), "."], [words("فاصله|virgule|comma"), "،"], [words("علامه استفهام|علامه الاستفهام|point d interrogation|question mark"), "؟"], [words("علامه تعجب|point d exclamation|exclamation mark"), "!"]];
  const punct = s => { for (const [l, p] of PUNCT) if (l.includes(s)) return L === 0 || /[؀-ۿ]/.test((field() || {}).value || "") ? p : p.replace("،", ",").replace("؟", "?"); return null; };

  /* ---------- Clicking buttons and links by name ---------- */
  const CLICKABLE = 'button,a[href],[role=button],[role=tab],[role=menuitem],summary,input[type=submit],input[type=button],input[type=checkbox],input[type=radio],select,' + FIELD;
  const nameOf = el => vnorm(el.getAttribute("aria-label") || el.innerText || el.value || el.title || el.placeholder || (el.labels && el.labels[0] && el.labels[0].innerText) || "");
  function findEl(q) {
    const qn = vnorm(q); if (!qn) return null;
    let best = null, top = 0;
    document.querySelectorAll(CLICKABLE).forEach(el => {
      if (!shown(el) && !(el.tagName === "SELECT" || el.type === "checkbox" || el.type === "radio")) return;
      if (el.closest("#vc-tip")) return;
      const n = nameOf(el); if (!n) return;
      const sc = n === qn ? 4 : pad(n).includes(pad(qn)) ? 3 : n.includes(qn) ? 2 : (n.length > 2 && qn.includes(n)) ? 1 : 0;
      if (sc > top) { top = sc; best = el; }
    });
    return best;
  }
  function submitNow() {
    const el = field();
    const f = (el && el.closest && el.closest("form")) || (typeof route === "function" && route() === "ai" && document.getElementById("ai-form"));
    if (f) { if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); return true; }
    const root = (el && el.closest && el.closest("section,.card,.modal,dialog,[role=dialog]")) || document.getElementById("m") || document;
    const btn = [...root.querySelectorAll("button,[role=button],input[type=submit]")].filter(shown).find(b => hasW(nameOf(b), W.send) || /send|submit|publi|envoy/i.test(b.id + " " + b.className));
    if (btn) { btn.click(); return true; }
    return false;
  }

  /* ---------- Outgoing: calls, SMS, WhatsApp, email, maps ---------- */
  const openExt = url => { const w = window.open(url, "_blank"); if (w) { try { w.opener = null; } catch (e) {} } else location.href = url; };
  function call(p, label, say) {
    say(lb("كنعيط على ", "J'appelle ", "Calling ") + label + ".");
    setTimeout(() => { location.href = "tel:" + p; }, 900);
  }
  function openMsg(ch, to, body, say) {
    const enc = encodeURIComponent(body || "");
    const who = to ? to.label : "";
    if (ch === "wa") {
      say(lb("حليت ليك واتساب", "J'ouvre WhatsApp", "Opening WhatsApp") + (who ? lb(" ل ", " pour ", " for ") + who : "") + lb(". ضغط على إرسال.", ". Appuyez sur Envoyer.", ". Tap send."));
      setTimeout(() => openExt(`https://wa.me/${to ? amanIntlPhone(to.p) : ""}?text=${enc}`), 700);
    } else if (ch === "mail") {
      say(lb("حليت ليك الإيميل. ضغط على إرسال.", "J'ouvre l'e-mail. Appuyez sur Envoyer.", "Opening email. Tap send."));
      setTimeout(() => { location.href = `mailto:${to && to.mail ? to.mail : ""}?body=${enc}`; }, 700);
    } else {
      say(lb("حليت ليك الرسالة", "J'ouvre le SMS", "Opening the text message") + (who ? lb(" ل ", " pour ", " for ") + who : "") + lb(". ضغط على إرسال.", ". Appuyez sur Envoyer.", ". Tap send."));
      setTimeout(() => { location.href = `sms:${to ? to.p : ""}?&body=${enc}`; }, 700);
    }
  }
  function sendLocation(ch, to, say) {
    if (!navigator.geolocation) { say(lb("هاد الجهاز ما كيعطيش الموقع.", "Position indisponible sur cet appareil.", "Location isn't available on this device.")); return; }
    say(lb("كنقلب على موقعك…", "Je cherche votre position…", "Finding your location…"));
    navigator.geolocation.getCurrentPosition(pos => {
      const url = `https://maps.google.com/?q=${pos.coords.latitude.toFixed(5)},${pos.coords.longitude.toFixed(5)}`;
      openMsg(ch, to, lb("هذا موقعي دابا: ", "Voici ma position actuelle : ", "This is my location now: ") + url, say);
    }, () => say(lb("ما قدرتش نجيب الموقع. سمح بالموقع فالمتصفح.", "Position introuvable. Autorisez la localisation.", "Couldn't get your location. Allow location access.")), { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }

  /* ---------- State ---------- */
  const ST = window.amanVA = { dict: false, pend: null };
  const tip = msg => { const t = document.getElementById("vc-tip"); if (t) { t.textContent = msg; t.hidden = false; clearTimeout(t._t); t._t = setTimeout(() => { t.hidden = true; }, 5000); } };
  const SOS_WORDS = words("sos|طوارئ|النجده|عتقوني|عاونوني|urgence|au secours|help me");

  window.amanVoiceExtra = function (raw, s, say) {
    // A pending message waits for its text
    if (ST.pend) {
      const p = ST.pend; ST.pend = null;
      if (W.cancel.includes(s)) { say(lb("تلغات الرسالة.", "Message annulé.", "Message cancelled.")); return true; }
      if (p.loc) sendLocation(p.ch, p.to, say); else openMsg(p.ch, p.to, raw, say);
      return true;
    }
    // Dictation mode: everything goes into the field
    if (ST.dict) {
      if (hasW(s, SOS_WORDS) && s.split(" ").length <= 3) { ST.dict = false; return false; }
      if (W.dictOff.includes(s)) { ST.dict = false; say(lb("سالينا الكتابة.", "Dictée terminée.", "Dictation finished.")); return true; }
      if (W.send.includes(s) || (s.split(" ").length <= 2 && hasW(s, W.send))) { ST.dict = false; if (submitNow()) say(lb("تصيفط.", "Envoyé.", "Sent.")); else say(lb("ما لقيتش زر الإرسال.", "Bouton d'envoi introuvable.", "Couldn't find a send button.")); return true; }
      if (W.clearAll.includes(s)) { insert("", "clear"); tip(lb("تمسح كلشي", "Tout effacé", "Cleared")); return true; }
      if (W.delWord.includes(s)) { insert("", "del"); tip(lb("تمسحات الكلمة", "Mot effacé", "Word deleted")); return true; }
      if (W.newline.includes(s)) { insert("\n"); return true; }
      const pc = punct(s); if (pc) { insert(pc); return true; }
      const el = insert(raw);
      if (!el) { ST.dict = false; say(lb("ما لقيتش فين نكتب. ضغط على خانة الكتابة وعاود.", "Aucun champ où écrire. Touchez un champ et réessayez.", "No field to write in. Tap a text box and try again.")); return true; }
      tip("✎ " + raw);
      return true;
    }
    const nw = s.split(" ").length;
    // Start dictation
    if (hasW(s, W.dictOn) && nw <= 6) {
      const el = field();
      if (!el) { say(lb("ما لقيتش فين نكتب فهاد الصفحة. قول مثلاً «افتح المساعد».", "Aucun champ dans cette page. Dites par exemple « ouvre l'assistant ».", "No text box on this page. Say for example \"open assistant\".")); return true; }
      ST.dict = true;
      try { el.focus(); } catch (e) {}
      say(lb("تكلم، أنا كنكتب", "Parlez, j'écris", "Speak, I'm writing") + (fieldName(el) ? " – " + fieldName(el) : "") + lb(". قول «صيفط» باش نصيفط، و«صافي» باش نحبس.", ". Dites « envoie » pour envoyer et « fin de la dictée » pour arrêter.", ". Say \"send\" to send, \"stop dictation\" to finish."));
      return true;
    }
    // Save a contact: "سجل رقم ماما 0612345678"
    if (hasW(s, W.save) && numIn(raw)) {
      const p = numIn(raw);
      const name = after(raw, W.save, 1);
      const nm = String(name == null ? "" : name).split(/\s+/).filter(tk => !/\d/.test(toDigits(tk)) && !W.contactWord.includes(vnorm(tk))).join(" ").trim();
      if (!nm) { say(lb("قول الاسم مع الرقم، مثلاً: سجل ماما 0612345678.", "Dites le nom avec le numéro, ex. : enregistre maman 0612345678.", "Say the name with the number, e.g. save mom 0612345678.")); return true; }
      amanAddContact(nm, p);
      say(lb("تسجل ", "Enregistré : ", "Saved: ") + nm + lb(" فهاد الجهاز.", " sur cet appareil.", " on this device."));
      return true;
    }
    // Write once: "اكتب ..."
    const w = after(raw, W.write, 0);
    if (w !== null && !hasW(s, W.msg) && !hasW(s, W.wa) && !hasW(s, W.mail)) {
      if (!w) return window.amanVoiceExtra("ابدا الكتابه", vnorm("ابدا الكتابه"), say);
      const el = insert(w);
      if (!el) say(lb("ما لقيتش فين نكتب فهاد الصفحة.", "Aucun champ où écrire ici.", "No text box on this page."));
      else { tip("✎ " + w); say(lb("كتبت. قول «صيفط» باش نصيفط.", "C'est écrit. Dites « envoie » pour envoyer.", "Written. Say \"send\" to send it.")); }
      return true;
    }
    // Messages: SMS / WhatsApp / email, with text or asking for it; location
    const ch = hasW(s, W.wa) ? "wa" : hasW(s, W.mail) ? "mail" : (hasW(s, W.msg) ? "sms" : "");
    const isLoc = hasW(s, W.loc) && hasW(s, W.send);
    if ((hasW(s, W.send) && (ch || isLoc)) || (ch && (numIn(raw) || contactIn(s) || hasW(s, W.trusted)))) {
      const { body, head } = bodyOf(raw);
      const hn = vnorm(head);
      let to = recipient(head, hn) || recipient(raw, s);
      if (!to && isLoc) { const t = window.amanGetTrusted && amanGetTrusted(); if (t) to = { p: t, label: lb("الشخص الثقة", "la personne de confiance", "your trusted contact") }; }
      if (ch === "mail") { const m = mailIn(raw); to = m ? { mail: m, label: m } : to && { label: to.label }; }
      const c = ch || (isLoc ? "wa" : "sms");
      if (isLoc) { sendLocation(c, to, say); return true; }
      if (body) { openMsg(c, to, body, say); return true; }
      ST.pend = { ch: c, to };
      say(lb("شنو نكتب فالرسالة", "Que dois-je écrire dans le message", "What should the message say") + (to && to.label ? lb(" ل ", " pour ", " to ") + to.label : "") + "؟".replace("؟", L === 0 ? "؟" : "?"));
      return true;
    }
    // "صيفط" alone: send the form being written
    if (nw <= 2 && hasW(s, W.send)) {
      if (submitNow()) say(lb("تصيفط.", "Envoyé.", "Sent."));
      else say(lb("ما كاين حتى حاجة نصيفطها هنا.", "Rien à envoyer ici.", "Nothing to send here."));
      return true;
    }
    // Calls: number, saved contact, trusted contact, civil protection
    if (hasW(s, W.call)) {
      const to = recipient(raw, s);
      if (to) { call(to.p, to.label, say); return true; }
      for (const [l, n] of SERVICES) if (hasW(s, l)) { call(n, n, say); return true; }
      if (hasW(s, W.trusted)) { say(lb("ما سجلتيش شخص ثقة. سجلو من زر SOS.", "Aucun contact de confiance. Ajoutez-le depuis le bouton SOS.", "No trusted contact saved. Add one from the SOS button.")); return true; }
      // police / gendarmerie / 8350 are handled by the base commands
    }
    // Nearest police station, hospital…
    if (hasW(s, W.near)) {
      for (const [l, q] of PLACES) if (hasW(s, l)) {
        say(lb("حليت ليك الخريطة.", "J'ouvre la carte.", "Opening the map."));
        setTimeout(() => openExt("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q)), 600);
        return true;
      }
    }
    // Ask AMAN AI from any page
    const q = after(raw, W.ask, 1);
    if (q && q.split(/\s+/).length >= 2) {
      if (route() !== "ai") { location.hash = "ai"; setTimeout(() => window.amanSendAiQuery && amanSendAiQuery(q), 700); }
      else window.amanSendAiQuery && amanSendAiQuery(q);
      tip("AMAN AI: " + q);
      return true;
    }
    // Page outline
    if (hasW(s, W.heads) && nw <= 6) {
      const hs = [...document.querySelectorAll("#m h1,#m h2,#m h3")].filter(shown).map(h => h.innerText.trim()).filter(Boolean).slice(0, 12);
      say(hs.length ? hs.join(". ") : lb("ما كاين حتى عنوان.", "Aucun titre.", "No headings."));
      return true;
    }
    // Click / press any button, link or field by its name
    const c = after(raw, W.click, 1);
    if (c) {
      const el = findEl(c);
      if (!el) { say(lb("ما لقيتش ", "Je ne trouve pas ", "I can't find ") + c + "."); return true; }
      if (isField(el)) { el.focus(); say(lb("واجد. قول «ابدا الكتابة» أو «اكتب» متبوعة بالنص.", "Prêt. Dites « dictée » ou « écris » suivi du texte.", "Ready. Say \"start dictation\" or \"write\" followed by the text.")); return true; }
      if (el.tagName === "SELECT") { el.focus(); try { el.showPicker && el.showPicker(); } catch (e) {} return true; }
      el.click();
      tip("▶ " + (el.getAttribute("aria-label") || el.innerText || c).trim().slice(0, 60));
      return true;
    }
    return false;
  };

  /* ================= 4. Accessibility page cards ================= */
  const EX = [
    [["اكتب السلام، بغيت نعرف حقوقي", "écris bonjour, je veux connaître mes droits", "write hello, I want to know my rights"], ["كيكتب النص فالخانة اللي مفتوحة", "Écrit le texte dans le champ ouvert", "Types the text in the open box"]],
    [["ابدا الكتابة … صافي", "commence la dictée … fin de la dictée", "start dictation … stop dictation"], ["كلشي اللي كتقول كيتكتب. «نقطة»، «فاصلة»، «سطر جديد»، «امسح»، «امسح كلشي»", "Tout ce que vous dites s'écrit. « point », « virgule », « nouvelle ligne », « efface », « efface tout »", "Everything you say is written. \"period\", \"comma\", \"new line\", \"delete\", \"clear all\""]],
    [["صيفط", "envoie", "send"], ["كيصيفط الرسالة أو السؤال أو المنشور", "Envoie le message, la question ou la publication", "Sends the message, question or post"]],
    [["عيط على 0612345678 · عيط على ماما", "appelle le 0612345678 · appelle maman", "call 0612345678 · call mom"], ["كيحل الهاتف بالرقم", "Ouvre le téléphone avec le numéro", "Opens the phone dialer"]],
    [["صيفط رسالة لماما قول ليها راني مزيانة", "envoie un SMS à maman que je vais bien", "send a text to mom saying I'm fine"], ["SMS بالنص واجد، غير ضغط إرسال", "SMS prêt, appuyez sur Envoyer", "Text ready, just tap send"]],
    [["صيفط واتساب للشخص الثقة", "envoie un WhatsApp à mon contact de confiance", "send a WhatsApp to my trusted contact"], ["كيسولك على النص من بعد", "Demande ensuite le texte", "Then asks what to write"]],
    [["صيفط موقعي فواتساب", "envoie ma position par WhatsApp", "send my location on WhatsApp"], ["رابط الخريطة ديال بلاصتك", "Lien de carte de votre position", "Map link of where you are"]],
    [["سجل ماما 0612345678", "enregistre maman 0612345678", "save mom 0612345678"], ["كيسجل الرقم فهاد الجهاز فقط", "Enregistre le numéro sur cet appareil uniquement", "Saves the number on this device only"]],
    [["ضغط على نشر · ضغط على تسجيل الدخول", "clique sur publier · clique sur connexion", "click publish · click log in"], ["كيضغط على أي زر أو رابط بسميتو", "Appuie sur n'importe quel bouton ou lien par son nom", "Presses any button or link by its name"]],
    [["سول أمان شنو نقدر ندير إلا تهددني شي حد", "demande à AMAN que faire en cas de menace", "ask AMAN what to do if someone threatens me"], ["كيسول المساعد الذكي من أي صفحة", "Pose la question à l'assistant depuis n'importe quelle page", "Asks the AI assistant from any page"]],
    [["فين أقرب كوميسارية · أقرب سبيطار", "commissariat le plus proche · hôpital le plus proche", "nearest police station · nearest hospital"], ["كيحل الخريطة", "Ouvre la carte", "Opens the map"]],
    [["شنو كاين فالصفحة · اقرأ الصفحة", "les titres · lis la page", "headings · read the page"], ["كيقرا العناوين أو الصفحة كاملة", "Lit les titres ou toute la page", "Reads the headings or the whole page"]]
  ];
  const baseAccess = P.access;
  P.access = function () {
    const html = baseAccess();
    const on = window.amanVC && amanVC.on;
    const list = contacts();
    const cards = `<section class="card va-card" aria-labelledby="va-h">
      <h3 id="va-h">${svgIcon("mic", "ic", 20)} ${lb("المساعد الصوتي من A حتى Z", "Assistant vocal de A à Z", "Voice assistant from A to Z")}</h3>
      <p>${lb("فعّل التحكم بالصوت وتكلم بالدارجة ولا بأي لهجة مغربية، بالعربية، بالفرنسية ولا بالإنجليزية. كيكتب ليك، كيعيط، كيحضر ليك SMS ولا واتساب ولا إيميل، كيصيفط موقعك، وكيضغط على الأزرار بلاصتك. المكالمات والرسائل كتحل فالهاتف ديالك وانت اللي كتأكد الإرسال.", "Activez le contrôle vocal et parlez en darija ou tout dialecte marocain, en arabe, en français ou en anglais. Il écrit pour vous, appelle, prépare un SMS, un WhatsApp ou un e-mail, envoie votre position et appuie sur les boutons à votre place. Les appels et messages s'ouvrent sur votre téléphone et c'est vous qui confirmez l'envoi.", "Turn on voice control and speak Darija or any Moroccan dialect, Arabic, French or English. It writes for you, calls, prepares an SMS, WhatsApp or email, sends your location and presses buttons for you. Calls and messages open on your phone and you confirm sending.")}</p>
      <p><button type="button" class="btn d" onclick="amanVoiceControl();setTimeout(draw,300)">${svgIcon("mic", "ic", 18)} ${on ? lb("إيقاف التحكم بالصوت", "Désactiver le contrôle vocal", "Turn voice control off") : lb("تفعيل التحكم بالصوت", "Activer le contrôle vocal", "Turn voice control on")}</button></p>
      <table class="a11y-keys va-ex">${EX.map(e => `<tr><td><b dir="auto">«${E(tr(e[0]))}»</b></td><td>${E(tr(e[1]))}</td></tr>`).join("")}</table>
    </section>
    <section class="card" aria-labelledby="ct-h">
      <h3 id="ct-h">${svgIcon("user", "ic", 20)} ${lb("الأرقام ديالي (للمكالمة والرسائل بالصوت)", "Mes contacts (appels et messages vocaux)", "My contacts (for voice calls and messages)")}</h3>
      <p class="muted">${lb("كيتسجلو فهاد الجهاز فقط، ما كيتصيفطو لحتى شي واحد. قول «عيط على» ولا «صيفط رسالة ل» متبوعة بالاسم.", "Stockés uniquement sur cet appareil, jamais envoyés. Dites « appelle » ou « envoie un SMS à » suivi du nom.", "Stored only on this device, never uploaded. Say \"call\" or \"send a text to\" followed by the name.")}</p>
      ${list.length ? `<ul class="ct-list">${list.map((c, i) => `<li><b>${E(c.n)}</b> <span dir="ltr">${E(c.p)}</span>
        <a class="btn o" href="tel:${E(c.p)}" aria-label="${lb("عيط على", "Appeler", "Call")} ${E(c.n)}">${svgIcon("phone", "ic", 16)}</a>
        <button type="button" class="btn o" onclick="amanDelContact(${i})" aria-label="${lb("حذف", "Supprimer", "Delete")} ${E(c.n)}">${svgIcon("trash", "ic", 16)}</button></li>`).join("")}</ul>` : ""}
      <div class="a11y-row"><input id="ct-name" type="text" dir="auto" maxlength="40" placeholder="${lb("الاسم (مثلاً: ماما)", "Nom (ex. : maman)", "Name (e.g. mom)")}" aria-label="${lb("الاسم", "Nom", "Name")}" style="flex:1;min-width:140px">
        <input id="ct-phone" type="tel" inputmode="tel" dir="ltr" maxlength="20" placeholder="0612345678" aria-label="${lb("الرقم", "Numéro", "Number")}" style="flex:1;min-width:140px">
        <button type="button" class="btn d" onclick="amanAddContactForm()">${svgIcon("check", "ic", 16)} ${lb("حفظ", "Enregistrer", "Save")}</button></div>
      <p id="ct-out" class="note" role="status" aria-live="polite" style="margin:8px 0 0;padding:6px 12px"></p>
    </section>`;
    const i = html.indexOf("</section>");
    return i > 0 ? html.slice(0, i + 10) + cards + html.slice(i + 10) : cards + html;
  };

  if ("speechSynthesis" in window) setTimeout(() => { try { voices(); window.amanRenderVoices(); } catch (e) {} }, 300);
  if (typeof route === "function" && route() === "access") setTimeout(() => window.draw(), 0);
})();
