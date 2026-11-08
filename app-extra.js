/* AMAN pages layer: real content pages (articles, academy, laws, FAQ, complaint guide),
   voice control for the whole app, and English support. Loaded after the other scripts. */
(function () {
  const C = window.AC;
  if (!C || typeof P === "undefined") return;
  const X = a => (a && (a[L] || a[0])) || "";
  const E = s => amanEsc(s);
  // Body lines: "- " bullets grouped into a list, other lines become paragraphs.
  const body = lines => {
    let h = "", ul = false;
    (lines || []).forEach(l => {
      if (l.startsWith("- ")) { if (!ul) { h += "<ul>"; ul = true; } h += `<li>${E(l.slice(2))}</li>`; }
      else { if (ul) { h += "</ul>"; ul = false; } h += `<p>${E(l)}</p>`; }
    });
    return ul ? h + "</ul>" : h;
  };
  const lb = (ar, fr, en) => [ar, fr, en][L] || ar;

  /* ---------- Dictionary fixes (no more placeholder / demo wording) ---------- */
  Object.assign(T, {
    laws: ["القوانين", "Lois", "Laws"],
    faq: ["أسئلة شائعة", "FAQ", "FAQ"],
    progs: ["برامج أمان", "Les programmes AMAN", "AMAN programmes"],
    pd: ["مقالات موثوقة وإرشادات عملية للسلامة الرقمية والشخصية.", "Articles fiables et conseils pratiques de sécurité numérique et personnelle.", "Reliable articles and practical digital and personal safety advice."],
    pa: ["دروس تفاعلية مجانية مع اختبارات قصيرة، وورشات توعية.", "Cours interactifs gratuits avec quiz, et ateliers de sensibilisation.", "Free interactive lessons with short quizzes, and awareness workshops."],
    arts: ["مقالات توعوية", "Articles de sensibilisation", "Awareness articles"],
    acT: ["ورشات التوعية", "Ateliers de sensibilisation", "Awareness workshops"],
    ci: ["لم تُنشر بعد وسائل الاتصال الرسمية لأمان. استعملي النموذج أدناه، وفي الحالات المستعجلة اتصلي بـ19 أو 177 أو 8350.", "Les coordonnées officielles d'AMAN ne sont pas encore publiées. Utilisez le formulaire ci-dessous ; en urgence, appelez le 19, le 177 ou le 8350.", "AMAN's official contact details are not published yet. Use the form below; in an emergency call 19, 177 or 8350."],
    ftD: ["منصة اجتماعية مستقلة للتوعية والتوجيه. ليست خدمة طوارئ. المحتوى تعليمي وليس استشارة قانونية.", "Plateforme sociale indépendante d'information et d'orientation. Ce n'est pas un service d'urgence. Contenu pédagogique, pas un avis juridique.", "An independent social platform for awareness and guidance. Not an emergency service. Content is educational, not legal advice."],
    inL: [T.inL[0].split("|").slice(0, 3).join("|") + "|يعمل التطبيق المثبت أيضاً دون إنترنت للصفحات التي فتحتِها من قبل. يمكنك فتحه بالصوت: «Ok Google، افتح AMAN» أو «Siri، افتح AMAN».",
      T.inL[1].split("|").slice(0, 3).join("|") + "|L'application installée fonctionne aussi hors ligne pour les pages déjà ouvertes. Ouvrez-la à la voix : « Ok Google, ouvre AMAN » ou « Dis Siri, ouvre AMAN ».",
      T.inL[2].split("|").slice(0, 3).join("|") + "|The installed app also works offline for pages you have opened before. Open it by voice: \"Hey Google, open AMAN\" or \"Siri, open AMAN\"."],
    rightsD: ["القانون 103-13 لمحاربة العنف ضد النساء ساري المفعول منذ 12 شتنبر 2018. يجرّم التحرش والإكراه على الزواج والطرد من بيت الزوجية والمس بالحياة الخاصة، ويتيح تدابير حماية، وأحدث خلايا للتكفل بالنساء ضحايا العنف في المحاكم والشرطة والدرك والمستشفيات. هذه معلومة عامة وليست استشارة قانونية.", "La loi 103-13 est en vigueur depuis le 12 septembre 2018. Elle incrimine le harcèlement, le mariage forcé, l'expulsion du domicile conjugal et l'atteinte à la vie privée, prévoit des mesures de protection et a créé des cellules de prise en charge dans les tribunaux, la police, la gendarmerie et les hôpitaux. Information générale, pas un avis juridique.", "Law 103-13 has been in force since 12 September 2018. It criminalises harassment, forced marriage, expulsion from the marital home and violations of privacy, provides protection measures, and created support units in courts, police, gendarmerie and hospitals. General information, not legal advice."]
  });
  // Same RTL fix for law numbers in the built-in Arabic texts.
  Object.keys(T).forEach(k => { if (Array.isArray(T[k]) && typeof T[k][0] === "string") T[k][0] = amanIsoNums(T[k][0]); });
  IC.laws = "M12 3v18M5 7h14M3 15l2-8 2 8a3 3 0 0 1-4 0zM17 15l2-8 2 8a3 3 0 0 1-4 0zM8 21h8";
  IC.faq = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01";
  if (!NAV.includes("laws")) NAV.splice(NAV.indexOf("guide") + 1, 0, "laws");
  if (!NAV.includes("faq")) NAV.splice(NAV.indexOf("about") + 1, 0, "faq");

  /* ---------- Articles ---------- */
  const artCard = a => `<details class="card art" id="art-${a.id}"><summary><span class="tag">${E(X(C.cats[a.cat]))}</span><h3>${E(X(a.t))}</h3><p>${E(X(a.s))}</p><span class="art-more">${lb("اقرئي المقال", "Lire l'article", "Read article")}</span></summary><div class="art-b">${body(X(a.b))}<p class="art-ai"><a class="btn o" href="#ai">${lb("اسألي مساعد أمان عن هذا الموضوع", "Poser une question à l'assistant", "Ask the assistant about this")}</a></p></div></details>`;
  let artCat = "", homeMode = false;
  window.art = function (q) {
    if (homeMode) return "<!--ARTS-->";
    q = String(q || "").toLowerCase();
    const list = C.articles.filter(a => (!artCat || a.cat === artCat) && (!q || (X(a.t) + X(a.s) + X(a.b).join(" ")).toLowerCase().includes(q)));
    return list.length ? list.map(artCard).join("") : `<p>${t("empty")}</p>`;
  };
  window.amanArtCat = function (c) {
    artCat = c;
    document.querySelectorAll(".chips [data-c]").forEach(b => b.setAttribute("aria-pressed", b.dataset.c === c));
    flt();
  };
  const baseHome = P.home;
  P.home = function () {
    homeMode = true;
    let h;
    try { h = baseHome().replace(`<span class="tag w">${t("demo")}</span>`, ""); } finally { homeMode = false; }
    const feat = C.articles.slice(0, 3).map(a => `<a class="card" href="#digital" onclick="amanOpenArt('${a.id}')" style="text-decoration:none;color:inherit"><span class="tag">${E(X(C.cats[a.cat]))}</span><h3>${E(X(a.t))}</h3><p>${E(X(a.s))}</p></a>`).join("");
    // Replace the built-in article grid with featured articles + quick links to the new pages.
    const more = `<p><a class="btn o" href="#digital">${lb("كل المقالات", "Tous les articles", "All articles")}</a> <a class="btn o" href="#academy">${t("academy")}</a> <a class="btn o" href="#laws">${t("laws")}</a></p>`;
    return h.replace('<div class="grid"><!--ARTS--></div>', `<div class="grid">${feat}</div>${more}`).replace("<!--ARTS-->", feat);
  };
  window.amanOpenArt = function (id) {
    setTimeout(() => { const d = document.getElementById("art-" + id); if (d) { d.open = true; d.scrollIntoView({ block: "start" }); } }, 200);
  };
  P.digital = function () {
    artCat = "";
    const chips = [["", t("all")]].concat(Object.keys(C.cats).map(k => [k, X(C.cats[k])]));
    return `<h2>${t("digital")}</h2><p>${lb("مقالات مبسطة ومراجعة حول العنف والسلامة الرقمية والحقوق. اضغطي على أي مقال لقراءته.", "Des articles simples et relus sur la violence, la sécurité numérique et les droits. Touchez un article pour le lire.", "Simple, reviewed articles on violence, digital safety and rights. Tap an article to read it.")}</p>
      <div class="bar"><input id="q" type="search" placeholder="${t("search")}" oninput="flt()" aria-label="${t("search")}"></div>
      <div class="chips" role="group" aria-label="${lb("المواضيع", "Thèmes", "Topics")}">${chips.map(c => `<button type="button" class="chip" data-c="${c[0]}" aria-pressed="${c[0] === ""}" onclick="amanArtCat('${c[0]}')">${E(c[1])}</button>`).join("")}</div>
      <div class="grid art-grid" id="al">${art("")}</div>
      <div class="note">${t("gN")}</div><p class="muted">${X(C.reviewed)}</p>`;
  };

  /* ---------- Academy ---------- */
  const PK = "aman-academy";
  const prog = () => { try { return JSON.parse(localStorage.getItem(PK)) || {}; } catch (e) { return {}; } };
  const saveProg = p => { try { localStorage.setItem(PK, JSON.stringify(p)); } catch (e) {} };
  const courseDone = (p, c) => c.ls.every((_, i) => p[c.id + ":" + i]) && !!p[c.id + ":quiz"];
  P.academy = function () {
    const p = prog();
    const total = C.courses.length, done = C.courses.filter(c => courseDone(p, c)).length;
    const courses = C.courses.map(c => {
      const n = c.ls.filter((_, i) => p[c.id + ":" + i]).length + (p[c.id + ":quiz"] ? 1 : 0), all = c.ls.length + 1;
      return `<details class="card course" id="co-${c.id}"><summary>${svgIcon(c.ic, "ic", 22)}<div><h3>${E(X(c.t))}</h3><p>${E(X(c.d))}</p>
        <small class="muted">${E(X(c.lvl))} · ${c.ls.length} ${lb("دروس", "leçons", "lessons")} · ~${c.min} ${lb("دقيقة", "min", "min")}</small>
        <div class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="${all}" aria-valuenow="${n}" aria-label="${lb("التقدم", "Progression", "Progress")}"><span style="width:${Math.round(n / all * 100)}%"></span></div></div></summary>
        <ol class="lessons">${c.ls.map((l, i) => `<li><h4>${E(X(l.t))}</h4>${body(X(l.b))}<label class="ldone"><input type="checkbox" ${p[c.id + ":" + i] ? "checked" : ""} onchange="amanLesson('${c.id}',${i},this.checked)"> ${lb("أنهيت هذا الدرس", "J'ai terminé cette leçon", "I finished this lesson")}</label></li>`).join("")}</ol>
        <div class="quiz"><h4>${lb("اختبري معلوماتك", "Testez vos connaissances", "Check your knowledge")}</h4>${c.q.map((q, qi) => `<fieldset><legend>${E(X(q.q))}</legend>${X(q.o).map((o, oi) => `<label><input type="radio" name="q-${c.id}-${qi}" value="${oi}"> ${E(o)}</label>`).join("")}</fieldset>`).join("")}
        <button type="button" class="btn d" onclick="amanQuiz('${c.id}')">${lb("تحقق", "Vérifier", "Check")}</button><p class="ms" role="status" id="qr-${c.id}">${p[c.id + ":quiz"] ? lb(
  `<span class="quiz-ok"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> نجحتِ في هذا الاختبار</span>`,
  `<span class="quiz-ok"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Quiz réussi</span>`,
  `<span class="quiz-ok"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Quiz passed</span>`
) : ""}</p></div></details>`;
    }).join("");
    const ws = C.workshops.map(w => `<div class="card"><h3>${E(X(w.t))}</h3><p>${E(X(w.d))}</p><span class="tag w">${lb("الموعد يُعلن بعد التأكيد", "Date annoncée après confirmation", "Date announced once confirmed")}</span></div>`).join("");
    return `<h2>${t("academy")}</h2><p>${lb("دروس قصيرة ومجانية، بلا حساب. تقدمك يُحفظ على هذا الجهاز فقط.", "Des leçons courtes et gratuites, sans compte. Votre progression reste sur cet appareil.", "Short free lessons, no account needed. Your progress stays on this device.")}</p>
      <div class="card acad-sum"><b>${done} / ${total}</b> ${lb("دورات مكتملة", "cours terminés", "courses completed")}<div class="pbar"><span style="width:${Math.round(done / total * 100)}%"></span></div>${done === total ? `<p><svg style="display:inline-block;vertical-align:middle;margin-inline-end:4px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4B942" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>${lb("أحسنتِ! أكملتِ كل الدورات.", "Bravo ! Vous avez terminé tous les cours.", "Well done! You completed every course.")}</p>` : ""}</div>
      <div class="courses">${courses}</div>
      <h2>${t("acT")}</h2><div class="grid">${ws}</div>
      <h3>${t("reg")}</h3><p class="note">${lb("سجلي اهتمامك وسنراسلك عند تحديد موعد الورشة.", "Indiquez votre intérêt : nous vous écrirons quand la date sera fixée.", "Register your interest and we will email you when a date is set.")}</p>${form("ev", ts("ef"), ["email", "text"], "0", "")}
      <p class="muted">${X(C.reviewed)}</p>`;
  };
  const keepOpen = id => {
    const y = scrollY, m = document.getElementById("m");
    m.innerHTML = P.academy();
    const d = document.getElementById("co-" + id); if (d) d.open = true;
    scrollTo(0, y);
  };
  window.amanLesson = function (id, i, on) { const p = prog(); if (on) p[id + ":" + i] = 1; else delete p[id + ":" + i]; saveProg(p); keepOpen(id); };
  window.amanQuiz = function (id) {
    const c = C.courses.find(x => x.id === id); if (!c) return;
    let ok = 0, ans = 0;
    c.q.forEach((q, qi) => { const r = document.querySelector(`input[name="q-${id}-${qi}"]:checked`); if (r) { ans++; if (+r.value === q.a) ok++; } });
    const out = document.getElementById("qr-" + id);
    if (ans < c.q.length) { out.textContent = lb("أجيبي على كل الأسئلة.", "Répondez à toutes les questions.", "Answer every question."); return; }
    if (ok === c.q.length) { const p = prog(); p[id + ":quiz"] = 1; saveProg(p); keepOpen(id); const o2 = document.getElementById("qr-" + id); if (o2) o2.textContent = lb("تم بنجاح — كل الأجوبة صحيحة.", "Réussi — toutes les réponses sont justes.", "Passed — all answers correct."); if (window.amanAnnounce) amanAnnounce(o2 ? o2.textContent : ""); }
    else { out.textContent = `${ok} / ${c.q.length} — ${lb("راجعي الدروس وحاولي مرة أخرى.", "Relisez les leçons et réessayez.", "Review the lessons and try again.")}`; }
  };

  /* ---------- Laws ---------- */
  P.laws = function () {
    return `<h2>${t("laws")}</h2><p>${lb("أهم النصوص المغربية القديمة والجديدة المتعلقة بحماية النساء والفتيات، بلغة مبسطة.", "Les principaux textes marocains, anciens et récents, sur la protection des femmes et des filles, en langage simple.", "The main Moroccan texts, old and new, protecting women and girls, in plain language.")}</p>
      <div class="bar"><input id="lq" type="search" placeholder="${t("search")}" aria-label="${t("search")}" oninput="amanLawFilter(this.value)"></div>
      <div class="laws" id="laws">${C.laws.slice().sort((a, b) => b.y - a.y).map(l => `<details class="card law" data-s="${E((X(l.t) + " " + X(l.p).join(" ")).toLowerCase())}"><summary><span class="tag">${l.y}</span><h3>${E(X(l.t))}</h3></summary><ul>${X(l.p).map(x => `<li>${E(x)}</li>`).join("")}</ul></details>`).join("")}</div>
      <div class="note">${X(C.lawSrc).map(E).join("<br>")}</div>
      <p><a class="btn d" href="#ai">${lb("اسألي مساعد أمان عن حالتك", "Demander à l'assistant pour votre situation", "Ask the assistant about your situation")}</a> <a class="btn o" href="#guide">${t("guide")}</a></p><p class="muted">${X(C.reviewed)}</p>`;
  };
  window.amanLawFilter = function (q) {
    q = String(q || "").toLowerCase();
    document.querySelectorAll("#laws .law").forEach(d => { d.hidden = !!q && !d.dataset.s.includes(q); });
  };

  /* ---------- FAQ ---------- */
  P.faq = function () {
    return `<h2>${t("faq")}</h2><div class="faq">${C.faq.map(f => `<details class="card"><summary><h3>${E(X(f.q))}</h3></summary><p>${E(X(f.a))}</p></details>`).join("")}</div><p><a class="btn d" href="#ai">${t("ai")}</a> <a class="btn o" href="#contact">${t("contact")}</a></p>`;
  };

  /* ---------- Guidance + complaint assistance (3 modes) ---------- */
  const baseGuide = P.guide;
  P.guide = function () {
    const cats = C.complaint.cats;
    return baseGuide().replace(`<div class="note">${t("gN")}</div><p><a class="btn d" href="#dir">${t("c3")}</a></p>`, "") + `
      <h2 id="complaint">${lb("المساعدة في الشكاية", "Aide à la plainte", "Complaint assistance")}</h2>
      <div class="grid">
        <div class="card"><h3>1. ${lb("التوجيه نحو الجهات الرسمية", "Orientation vers les services officiels", "Official redirection")}</h3>
          <p>${lb("تقديم الشكاية يتم لدى الجهات الرسمية مباشرة. أمان لا يرسل الشكاية نيابة عنك، والضغط على الرابط لا يعني أن الشكاية قُدمت.", "La plainte se dépose directement auprès des services officiels. AMAN ne l'envoie pas à votre place ; cliquer sur un lien ne dépose pas de plainte.", "Complaints are filed directly with official services. AMAN does not send them for you; clicking a link does not file a complaint.")}</p>
          <ul><li><a href="https://vcfemme.pmp.ma/" target="_blank" rel="noopener">vcfemme.pmp.ma</a> — ${lb("منصة رئاسة النيابة العامة للتبليغ عن العنف ضد النساء", "plateforme de la Présidence du ministère public pour signaler les violences faites aux femmes", "Public Prosecution platform for reporting violence against women")}</li>
          <li><a href="https://www.chikaya.ma/?lang=ar" target="_blank" rel="noopener">chikaya.ma</a> — ${lb("البوابة الوطنية للشكايات ضد الإدارات العمومية", "portail national des réclamations contre les administrations", "national portal for complaints about public administrations")}</li>
          <li>${lb("حضورياً: وكيل الملك بالمحكمة الابتدائية، الشرطة (19)، الدرك الملكي (177)، أو خلية التكفل بالمستشفى.", "Sur place : procureur du Roi au tribunal de première instance, police (19), gendarmerie (177) ou cellule de l'hôpital.", "In person: the King's Prosecutor at the court of first instance, police (19), gendarmerie (177) or the hospital support unit.")}</li></ul>
          <p class="muted">${lb("تحققي من توفر المواقع والإجراءات الحالية قبل الاعتماد عليها.", "Vérifiez la disponibilité des sites et procédures actuelles.", "Check that the sites and current procedures are available.")}</p></div>
        <div class="card"><h3>2. ${lb("تحضير نص الشكاية", "Préparer le texte de la plainte", "Prepare the complaint text")}</h3>
          <p>${lb("نموذج بسيط يُنشأ على جهازك فقط ولا يُرسل ولا يُحفظ. لا تكتبي إلا ما تريدين، ويمكنك تعديل النص بالكامل.", "Un modèle simple généré sur votre appareil uniquement, ni envoyé ni enregistré. N'écrivez que ce que vous voulez ; tout reste modifiable.", "A simple template created only on your device, never sent or saved. Write only what you want; everything stays editable.")}</p>
          <form class="cw" onsubmit="return amanDraft(event)">
            <label for="cw-k">${lb("نوع المشكل", "Type de problème", "Type of issue")}</label><select id="cw-k">${cats.map((c, i) => `<option value="${i}">${E(X(c.t))}</option>`).join("")}</select>
            <label for="cw-n">${lb("الاسم الكامل (اختياري هنا، ضروري في الشكاية الرسمية)", "Nom complet (facultatif ici, requis dans la plainte officielle)", "Full name (optional here, required in the official complaint)")}</label><input id="cw-n" maxlength="120" autocomplete="off">
            <label for="cw-c">${lb("المدينة", "Ville", "City")}</label><input id="cw-c" maxlength="80" autocomplete="off">
            <label for="cw-d">${lb("تاريخ الوقائع التقريبي", "Date approximative des faits", "Approximate date of events")}</label><input id="cw-d" type="date">
            <label for="cw-f">${lb("وصف قصير بكلماتك (اختياري — يمكنك إضافته لاحقاً)", "Courte description avec vos mots (facultatif, à compléter plus tard)", "Short description in your own words (optional, add it later)")}</label><textarea id="cw-f" rows="3" maxlength="1500"></textarea>
            <button class="btn d">${lb("إنشاء المسودة", "Générer le brouillon", "Create draft")}</button>
          </form>
          <div id="cw-out" hidden><label for="cw-txt">${lb("المسودة (قابلة للتعديل)", "Brouillon (modifiable)", "Draft (editable)")}</label><textarea id="cw-txt" rows="14" dir="auto"></textarea>
            <p><button type="button" class="btn d" onclick="amanDraftCopy()">${lb("نسخ", "Copier", "Copy")}</button> <button type="button" class="btn o" onclick="amanDraftSave()">${lb("تحميل كملف", "Télécharger", "Download")}</button> <button type="button" class="btn o" onclick="document.getElementById('cw-txt').value='';document.getElementById('cw-out').hidden=true">${lb("مسح", "Effacer", "Clear")}</button></p>
            <p class="note" id="cw-to"></p></div></div>
        <div class="card"><h3>3. ${lb("الإرسال الإلكتروني المباشر", "Envoi électronique direct", "Direct electronic submission")}</h3>
          <p>${lb("غير متاح حالياً. لا يوجد ربط رسمي مرخص بين أمان والسلطات، لذلك لا يرسل أمان أي شكاية ولا يمنح رقم توصيل. استعملي المنصات الرسمية أعلاه.", "Non disponible actuellement. Il n'existe aucune intégration officielle autorisée entre AMAN et les autorités : AMAN n'envoie aucune plainte et ne délivre aucun récépissé. Utilisez les plateformes officielles ci-dessus.", "Not available at the moment. There is no authorised official integration between AMAN and the authorities, so AMAN does not send complaints or issue receipts. Use the official platforms above.")}</p></div>
      </div>
      <div class="note">${t("gN")}</div><p><a class="btn d" href="#dir">${t("c3")}</a> <a class="btn o" href="#laws">${t("laws")}</a> <a class="btn o" href="#faq">${t("faq")}</a></p>`;
  };
  window.amanDraft = function (e) {
    e.preventDefault();
    const g = id => document.getElementById(id).value.trim();
    const c = C.complaint.cats[+g("cw-k")] || C.complaint.cats[0];
    const name = g("cw-n") || lb("[الاسم الكامل]", "[Nom complet]", "[Full name]"), city = g("cw-c") || lb("[المدينة]", "[Ville]", "[City]");
    const date = g("cw-d") || lb("[التاريخ]", "[date]", "[date]"), facts = g("cw-f") || lb("[اكتبي هنا ما وقع بكلماتك: ماذا، متى، أين، ومن]", "[Décrivez ici les faits avec vos mots : quoi, quand, où, qui]", "[Describe here what happened in your words: what, when, where, who]");
    const today = new Date().toLocaleDateString(["ar-MA", "fr-MA", "en-GB"][L]);
    const txt = [
      `${city}، ${today}`.replace("،", L ? "," : "،"),
      "",
      lb("إلى ", "À ", "To: ") + X(c.to),
      "",
      lb("الموضوع: شكاية بشأن ", "Objet : plainte concernant ", "Subject: complaint concerning ") + X(c.t),
      "",
      lb("المشتكية: ", "Plaignante : ", "Complainant: ") + name,
      lb("رقم البطاقة الوطنية: [  ]   ·   العنوان أو وسيلة التواصل: [  ]", "N° CIN : [  ]   ·   Adresse ou contact : [  ]", "National ID no.: [  ]   ·   Address or contact: [  ]"),
      "",
      lb("السيد المحترم،", "Monsieur,", "Dear Sir or Madam,"),
      lb(`أتشرف بأن أتقدم إليكم بهذه الشكاية بخصوص وقائع حدثت بتاريخ ${date} بمدينة ${city}، وهي كالتالي:`, `J'ai l'honneur de vous soumettre la présente plainte concernant des faits survenus le ${date} à ${city}, à savoir :`, `I respectfully submit this complaint regarding events that took place on ${date} in ${city}, as follows:`),
      facts,
      "",
      lb("أرفق بهذه الشكاية (إن وجد): [شهادة طبية] [صور أو لقطات شاشة] [أسماء الشهود].", "Pièces jointes (le cas échéant) : [certificat médical] [photos ou captures] [noms des témoins].", "Attached (if any): [medical certificate] [photos or screenshots] [witnesses' names]."),
      lb("لذا، ألتمس منكم فتح بحث في الموضوع واتخاذ ما ترونه مناسباً، بما في ذلك تدابير الحماية التي يتيحها القانون.", "Je vous prie donc d'ouvrir une enquête et de prendre les mesures appropriées, y compris les mesures de protection prévues par la loi.", "I therefore ask you to open an investigation and take appropriate action, including the protection measures provided by law."),
      "",
      lb("وتقبلوا فائق التقدير والاحترام.", "Veuillez agréer l'expression de ma haute considération.", "Yours faithfully,"),
      lb("التوقيع: ", "Signature : ", "Signature: ") + name
    ].join("\n");
    document.getElementById("cw-txt").value = txt;
    document.getElementById("cw-out").hidden = false;
    document.getElementById("cw-to").textContent = lb("قدمي الشكاية موقعة لدى: ", "Déposez la plainte signée auprès de : ", "File the signed complaint with: ") + X(c.to) + lb(". أمان لم يرسل أي شيء، ولا يضيف وقائع أو مواد قانونية من عنده.", ". AMAN n'a rien envoyé et n'ajoute aucun fait ni article de loi.", ". AMAN has not sent anything and adds no facts or legal articles.");
    document.getElementById("cw-txt").focus();
    return false;
  };
  window.amanDraftCopy = function () { const v = document.getElementById("cw-txt").value; if (navigator.clipboard) navigator.clipboard.writeText(v).then(() => amanAnnounce && amanAnnounce(lb("تم النسخ", "Copié", "Copied"))); };
  window.amanDraftSave = function () {
    const v = document.getElementById("cw-txt").value, a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + v], { type: "text/plain;charset=utf-8" }));
    a.download = lb("shikaya", "plainte", "complaint") + ".txt"; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  /* ---------- About & Safe institution: fuller content ---------- */

  /* Richer guide intro: steps, legal pathways, digital safety timeline */
  const baseGuide2 = P.guide;
  P.guide = function () {
    const steps = [
      lb("الخطوة 1 — السلامة الفورية", "Étape 1 — Sécurité immédiate", "Step 1 — Immediate safety"),
      lb("إذا كنتِ في خطر مباشر، اتصلي بـ 19 أو 177 فوراً. انتقلي إلى مكان آمن: بيت قريبة موثوقة، مستشفى عمومي، أو مركز شرطة. لا تتركي أدلة مهمة ورائك (وثائق الهوية، شهادات الأطباء).", "Si vous êtes en danger immédiat, appelez le 19 ou 177. Rejoignez un lieu sûr : famille de confiance, hôpital public ou commissariat. Gardez avec vous vos documents d'identité et certificats médicaux.", "If you are in immediate danger, call 19 or 177. Move to a safe place: a trusted relative's home, a public hospital, or a police station. Keep identity documents and medical certificates with you."),
      lb("الخطوة 2 — التوثيق الطبي", "Étape 2 — Documentation médicale", "Step 2 — Medical documentation"),
      lb("توجهي إلى أقرب مستشفى عمومي أو مركز صحي لإجراء فحص طبي وطلب شهادة الإيذاء الجسدي أو النفسي (ITT). هذه الشهادة أساسية لأي إجراء قانوني لاحق.", "Rendez-vous à l'hôpital public le plus proche pour un examen médical et demandez le certificat d'ITT (incapacité totale de travail). Ce document est indispensable pour toute procédure judiciaire ultérieure.", "Go to the nearest public hospital for a medical examination and request the ITT medical certificate (total temporary incapacity). This certificate is essential for any subsequent legal proceedings."),
      lb("الخطوة 3 — تقديم الشكاية", "Étape 3 — Dépôt de plainte", "Step 3 — Filing a complaint"),
      lb("يمكنك تقديم الشكاية حضورياً لدى الشرطة (19)، الدرك الملكي (177)، أو لدى وكيل الملك بالمحكمة الابتدائية مباشرة. عبر الإنترنت: منصة vcfemme.pmp.ma أو بوابة chikaya.ma. طلبي خلية التكفل بالنساء ضحايا العنف الموجودة في معظم المحاكم.", "Vous pouvez déposer plainte en personne à la police (19), à la gendarmerie (177) ou directement auprès du procureur du Roi. En ligne : vcfemme.pmp.ma ou chikaya.ma. Demandez la cellule de prise en charge des femmes victimes, disponible dans la plupart des tribunaux.", "You can file a complaint in person at the police (19), gendarmerie (177) or directly with the King's Prosecutor. Online: vcfemme.pmp.ma or chikaya.ma. Ask for the support unit for women victims available in most courts."),
      lb("الخطوة 4 — المرافقة القانونية", "Étape 4 — Accompagnement juridique", "Step 4 — Legal support"),
      lb("اطلبي تعيين محامٍ من هيئة المحامين أو التواصل مع إحدى الجمعيات الحقوقية كـ ADFM أو UAF أو FLDF. المساعدة القضائية مكفولة قانونياً للأشخاص محدودي الدخل.", "Demandez la désignation d'un avocat ou contactez des associations comme l'ADFM, l'UAF ou la FLDF. L'aide juridictionnelle est garantie par la loi pour les personnes à revenus limités.", "Request the appointment of a lawyer or contact associations such as ADFM, UAF or FLDF. Legal aid is guaranteed by law for people with limited income."),
      lb("الخطوة 5 — الدعم النفسي والاجتماعي", "Étape 5 — Soutien psychologique et social", "Step 5 — Psychological and social support"),
      lb("تتوفر خدمات الدعم النفسي في مستشفيات عمومية وبعض الجمعيات المتخصصة. مؤسسة التعاون الوطني (Entraide Nationale) تقدم دعماً اجتماعياً مادياً في حالات الضرورة. لا تترددي في طلب المساعدة.", "Des services de soutien psychologique sont disponibles dans les hôpitaux publics et certaines associations spécialisées. L'Entraide Nationale offre un soutien social et matériel en cas de nécessité.", "Psychological support services are available in public hospitals and some specialized associations. Entraide Nationale provides social and material support in cases of necessity. Do not hesitate to ask for help.")
    ];
    const base = baseGuide2();
    const stepsHtml = `<h2>${lb('خطوات التعامل مع الوضع','Étapes à suivre','Steps to take')}</h2>
<div class="steps-list">${
  steps.reduce((acc, s, i) => {
    if (i % 2 === 0) return acc + `<div class="step-card"><div class="step-num">${(i/2)+1}</div><div class="step-body"><h3>${s}</h3>`;
    return acc + `<p>${s}</p></div></div>`;
  }, '')
}</div>
<p class="muted">${lb('هذه المعلومات ذات طابع توعوي عام ولا تُغني عن الاستشارة القانونية المتخصصة.','Ces informations sont à titre général et ne remplacent pas un conseil juridique spécialisé.','This information is for general awareness only and does not replace specialized legal advice.')}</p>`;
    return base + stepsHtml;
  };

  const baseAbout = P.about;
  P.about = function () {
    const doList = [lb("نوعّي بأشكال العنف والحقوق", "Informer sur les violences et les droits", "Inform about violence and rights"), lb("نوجّه نحو الجهات الرسمية والمختصة", "Orienter vers les services officiels et spécialisés", "Refer to official and specialised services"), lb("نساعد على تحضير الشكاية دون إرسالها", "Aider à préparer une plainte sans l'envoyer", "Help prepare a complaint without sending it"), lb("نقدم دروساً مجانية وأدوات سلامة", "Proposer des cours gratuits et des outils de sécurité", "Offer free lessons and safety tools")];
    const dontList = [lb("لسنا خدمة طوارئ ولا نرسل أي تدخل", "Nous ne sommes pas un service d'urgence", "We are not an emergency service"), lb("لا نقدم استشارة قانونية أو طبية رسمية", "Pas de conseil juridique ou médical officiel", "No official legal or medical advice"), lb("لا نحفظ وصف حالات العنف ولا نبيع أي بيانات", "Aucun récit de violence stocké, aucune donnée vendue", "No violence accounts stored, no data sold"), lb("لا نعرض أي جهة كشريك دون موافقة موثقة", "Aucun partenaire affiché sans accord documenté", "No partner shown without documented approval")];
    const li = a => `<ul>${a.map(x => `<li>${E(x)}</li>`).join("")}</ul>`;
    return baseAbout() + `<div class="grid"><div class="card"><h3>${lb("ما نقوم به", "Ce que nous faisons", "What we do")}</h3>${li(doList)}</div><div class="card"><h3>${lb("ما لا نقوم به", "Ce que nous ne faisons pas", "What we don't do")}</h3>${li(dontList)}</div></div>
      <div class="grid">${["ai", "academy", "laws", "community"].map(k => `<a class="card" href="#${k}" style="text-decoration:none;color:inherit">${ic(k)}<h3>${t(k)}</h3></a>`).join("")}</div>`;
  };
  const baseSafe = P.safe;
  P.safe = function () {
    const c = [lb("تعيين شخص مرجعي مكوَّن للاستماع والتوجيه", "Désigner une personne référente formée à l'écoute et à l'orientation", "Appoint a trained focal person for listening and referral"), lb("نشر الأرقام الرسمية (19، 177، 8350) في أماكن واضحة", "Afficher les numéros officiels (19, 177, 8350)", "Display the official numbers (19, 177, 8350)"), lb("اعتماد مسطرة داخلية واضحة ضد التحرش تحترم السرية", "Adopter une procédure interne claire et confidentielle contre le harcèlement", "Adopt a clear, confidential internal anti-harassment procedure"), lb("تنظيم ورشة توعية واحدة على الأقل سنوياً", "Organiser au moins un atelier de sensibilisation par an", "Hold at least one awareness workshop a year"), lb("عدم التستر على العنف وتوجيه الضحايا نحو الجهات المختصة", "Ne jamais couvrir les violences et orienter vers les services compétents", "Never cover up violence and refer victims to competent services")];
    const h = baseSafe(), i = h.indexOf(`<h3>${t("partF")}</h3>`);
    const add = `<div class="card"><h3>${lb("التزامات الميثاق", "Engagements de la charte", "Charter commitments")}</h3><ol>${c.map(x => `<li>${E(x)}</li>`).join("")}</ol><p class="muted">${lb("المؤسسات الموقعة تُعرض فقط بعد تقييم موثق وموافقتها الصريحة.", "Les établissements signataires ne sont affichés qu'après évaluation documentée et accord explicite.", "Signatory institutions are only listed after a documented assessment and their explicit consent.")}</p></div>`;
    return i > 0 ? h.slice(0, i) + add + h.slice(i) : h + add;
  };

  /* ---------- English everywhere in the AI layer ---------- */
  const EN_SUG = [["Urgent image blackmail", "Someone is blackmailing me with private photos and chats and threatens to send them to my family unless I pay. What should I do now?"], ["Blackmail on social media", "Someone threatens to post my photos on Instagram and TikTok if I don't pay. How should I react?"], ["Law 103-13 & workplace harassment", "What do Law 103-13 and the Labour Code say about harassment at work, and how can I prove it without losing my job?"], ["Urgent protection order", "How can I ask a court for protection so someone cannot contact me or come near my home?"], ["Confidential psychological support", "Where can I find confidential listening and psychological support in Morocco?"], ["Calming exercise for panic", "I'm having a panic attack after a threat. Please guide me to calm down right now."], ["Complaint to the King's Prosecutor", "How do I file an official complaint with the King's Prosecutor without revealing my address?"], ["DGSN cybercrime unit", "How do I contact the police cybercrime unit (DGSN) and what evidence should I bring?"]];
  if (typeof AI_SUGGESTIONS !== "undefined") AI_SUGGESTIONS.forEach((s, i) => { if (EN_SUG[i]) { s.titleEn = EN_SUG[i][0]; s.promptEn = EN_SUG[i][1]; } });

  /* ---------- Voice control for the whole app ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const VK = "aman-voice-ctl";
  const VC = window.amanVC = { on: false, rec: null, busy: false };
  const norm = s => String(s || "").toLowerCase().normalize("NFKD").replace(/[ً-ٰٟ̀-ͯ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  const ROUTES = {
    home: "الرئيسيه|الصفحه الرئيسيه|البدايه|الدار|accueil|home|main page",
    ai: "المساعد|مساعد|الذكاء|ذكاء|شات|assistant|ia|intelligence|chat|ai",
    guide: "التوجيه|توجيه|شكايه|الشكايه|نشكي|orientation|plainte|guidance|complaint|guide",
    laws: "القوانين|القانون|قانون|قوانين|lois|loi|laws|law",
    dir: "الدليل|دليل|الجمعيات|جمعيه|المحامين|annuaire|associations|directory",
    digital: "المقالات|مقالات|الرقمي|مقال|articles|article|numerique|digital",
    academy: "الاكاديميه|اكاديميه|الدروس|دروس|التعليم|academie|cours|lecons|academy|courses|lessons",
    faq: "الاسئله|اسئله|سؤال|questions|faq",
    about: "من نحن|شكون حنا|a propos|qui sommes|about",
    community: "المجتمع|مجتمع|المنشورات|communaute|publications|community|posts",
    publish: "انشر|نشر|كتب منشور|publier|publish|new post",
    contact: "اتصال|تواصل|الاتصال|contact|contacter",
    access: "امكانيه الوصول|الولوج|الاعاقه|accessibilite|accessibility",
    account: "حسابي|الحساب|compte|account|profile",
    install: "تثبيت|installer|install",
    safe: "المؤسسه الامنه|الميثاق|charte|etablissement|charter",
    qr: "رمز|qr|كود"
  };
  const ACTS = [
    ["sos", "sos|طوارئ|النجده|نجده|عتقوني|عاونوني|خطر|urgence|au secours|emergency|help me"],
    ["call19", "عيط للبوليس|عيط على البوليس|اتصل بالشرطه|اتصلي بالشرطه|appelle la police|appeler la police|call the police|call police"],
    ["call177", "اتصل بالدرك|اتصلي بالدرك|عيط للجادارمي|عيط على الجادارمي|appelle la gendarmerie|call the gendarmerie"],
    ["call8350", "اتصل ب 8350|عيط ل 8350|اتصل بكلنا معاك|appelle le 8350|call 8350"],
    ["exit", "خروج سريع|تمويه|الطقس|sortie rapide|camouflage|quick exit"],
    ["stopctl", "سد الميكروفون|اوقف الاوامر|حبس التحكم|توقف عن الاستماع|arrete d ecouter|arrete le controle|stop listening|stop voice"],
    ["read", "اقرا|قرا|قرالي|اقرا الصفحه|lis|lire|read"],
    ["stop", "توقف|سكت|بركا|arrete|stop|silence"],
    ["back", "رجوع|ارجع|الرجوع|retour|back"],
    ["down", "انزل|لتحت|اسفل|descends|bas|scroll down|down"],
    ["up", "طلع|لفوق|اعلى|monte|haut|scroll up|up"],
    ["ar", "العربيه|عربيه|بالعربيه|arabe|arabic"],
    ["fr", "الفرنسيه|فرنسيه|بالفرنسيه|francais|french"],
    ["en", "الانجليزيه|الانجليزيه|انجليزيه|انجليزي|anglais|english"],
    ["dark", "الوضع الليلي|الليلي|الوضع النهاري|mode nuit|mode jour|dark mode|light mode"],
    ["help", "الاوامر|شنو نقول|مساعده الاوامر|aide|commandes|help|commands"]
  ];
  const has = (s, list) => list.split("|").some(w => { const n = norm(w); return n && (` ${s} `).includes(` ${n} `); });
  const VMSG = {
    on: ["التحكم بالصوت مفعل. قولي مثلاً: افتح الأكاديمية، أو اقرأ الصفحة، أو طوارئ.", "Contrôle vocal activé. Dites par exemple : ouvre l'académie, lis la page, ou urgence.", "Voice control on. Say for example: open academy, read the page, or emergency."],
    off: ["تم إيقاف التحكم بالصوت.", "Contrôle vocal désactivé.", "Voice control off."],
    open: ["فتحت ", "J'ouvre ", "Opening "],
    unk: ["ما فهمتش. قولي «الأوامر» باش تسمعي اللائحة.", "Je n'ai pas compris. Dites « commandes » pour la liste.", "I didn't understand. Say \"commands\" to hear the list."],
    help: ["الأوامر: افتح متبوعة باسم الصفحة مثل الرئيسية، المساعد، التوجيه، القوانين، الأكاديمية، المقالات، الدليل، المجتمع. أو: اقرأ الصفحة، توقف، رجوع، انزل، طلع، طوارئ، اتصل بالشرطة، خروج سريع، العربية، الفرنسية، الإنجليزية، أوقف الاستماع. وكذلك: اكتب متبوعة بالنص، ابدا الكتابة، صيفط، عيط على رقم أو على اسم، صيفط رسالة أو واتساب لشي حد، صيفط موقعي، ضغط على اسم الزر، سول أمان، فين أقرب كوميسارية.", "Commandes : ouvre suivi du nom de la page, comme accueil, assistant, orientation, lois, académie, articles, annuaire, communauté. Ou : lis la page, stop, retour, descends, monte, urgence, appelle la police, sortie rapide, arabe, français, anglais, arrête d'écouter. Et aussi : écris suivi du texte, commence la dictée, envoie, appelle un numéro ou un nom, envoie un SMS ou un WhatsApp à quelqu'un, envoie ma position, clique sur le nom d'un bouton, demande à AMAN, commissariat le plus proche.", "Commands: open followed by a page name, like home, assistant, guidance, laws, academy, articles, directory, community. Or: read the page, stop, back, down, up, emergency, call the police, quick exit, Arabic, French, English, stop listening. Also: write followed by the text, start dictation, send, call a number or a name, send an SMS or WhatsApp to someone, send my location, click a button name, ask AMAN, nearest police station."],
    denied: ["ما قدرتش نستعمل الميكروفون. اسمحي للمتصفح باستعمال الميكروفون.", "Micro indisponible. Autorisez le micro dans le navigateur.", "Microphone unavailable. Allow microphone access in your browser."],
    na: ["متصفحك لا يدعم التعرف على الصوت. جربي Chrome أو Edge أو Safari.", "Votre navigateur ne gère pas la reconnaissance vocale. Essayez Chrome, Edge ou Safari.", "Your browser doesn't support speech recognition. Try Chrome, Edge or Safari."],
    btn: ["التحكم بالصوت (Alt+V)", "Contrôle vocal (Alt+V)", "Voice control (Alt+V)"]
  };
  const say = (msg, then) => {
    if (window.amanAnnounce) amanAnnounce(msg);
    const tip = document.getElementById("vc-tip"); if (tip) { tip.textContent = msg; tip.hidden = false; clearTimeout(tip._t); tip._t = setTimeout(() => { tip.hidden = true; }, 6000); }
    if (window.amanSay) { VC.busy = true; try { VC.rec && VC.rec.abort(); } catch (e) {} amanSay(msg, () => { VC.busy = false; then && then(); listen(); }); setTimeout(() => { if (VC.busy) { VC.busy = false; listen(); } }, 15000); }
    else { then && then(); }
  };
  function command(raw) {
    const s = norm(raw);
    if (!s) return;
    // Dictation, calls, messages, clicks, contacts (app-voice.js)
    if (window.amanVoiceExtra && window.amanVoiceExtra(raw, s, say)) return;
    // Long sentences on the assistant page are questions, not commands.
    if (route() === "ai" && s.split(" ").length > 4 && window.amanSendAiQuery) { amanSendAiQuery(raw); return; }
    for (const [k, words] of ACTS) {
      if (!has(s, words)) continue;
      if (k === "sos") { amanOpenSosModal(); return say(lb("فتحت الطوارئ. اتصلي بـ19 أو 177.", "Urgence ouverte. Appelez le 19 ou le 177.", "Emergency opened. Call 19 or 177.")); }
      if (k.startsWith("call")) { location.href = "tel:" + k.slice(4); return; }
      if (k === "exit") { stop(); return amanCamouflage(); }
      if (k === "stopctl") { return stop(true); }
      if (k === "read") { return window.amanReadPage && amanReadPage(); }
      if (k === "stop") { window.amanStopSpeech && amanStopSpeech(); return; }
      if (k === "back") { history.back(); return; }
      if (k === "down" || k === "up") { scrollBy({ top: (k === "down" ? 1 : -1) * innerHeight * 0.8, behavior: "smooth" }); return; }
      if (k === "ar" || k === "fr" || k === "en") { setL(["ar", "fr", "en"].indexOf(k)); restartLang(); return say(X(VMSG.on)); }
      if (k === "dark") { amanToggleTheme(); return; }
      if (k === "help") { return say(X(VMSG.help)); }
    }
    for (const r in ROUTES) {
      if (has(s, ROUTES[r])) {
        location.hash = r;
        setTimeout(() => say(X(VMSG.open) + (T[r] ? t(r) : "")), 350);
        return;
      }
    }
    // On the assistant page, anything else is a question for AMAN AI.
    if (route() === "ai" && window.amanSendAiQuery) { amanSendAiQuery(raw); return; }
    say(X(VMSG.unk));
  }
  function listen() {
    if (!VC.on || VC.busy || VC.rec || !SR) return;
    if (window.speechSynthesis && (speechSynthesis.speaking || speechSynthesis.pending)) { setTimeout(listen, 400); return; }
    if (window.amanVoice && window.amanVoice.on) { setTimeout(listen, 2000); return; } // AI hands-free mode owns the mic
    const rec = new SR();
    rec.lang = (window.amanRecLang && window.amanRecLang()) || ["ar-MA", "fr-FR", "en-US"][L] || "ar-MA";
    rec.continuous = false; rec.interimResults = false; rec.maxAlternatives = 1;
    rec.onresult = e => { const tx = e.results && e.results[0] && e.results[0][0] ? e.results[0][0].transcript : ""; if (tx) command(tx); };
    rec.onerror = e => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") { VC.denied = true; stop(); say(X(VMSG.denied)); armGesture(); }
    };
    rec.onend = () => { VC.rec = null; setUI(); if (VC.on && !VC.busy) setTimeout(listen, 250); };
    VC.rec = rec;
    try { rec.start(); } catch (e) { VC.rec = null; setTimeout(listen, 1000); }
    setUI();
  }
  function restartLang() { try { VC.rec && VC.rec.abort(); } catch (e) {} VC.rec = null; }
  function start(announce) {
    if (!SR) { say(X(VMSG.na)); return; }
    VC.on = true; try { localStorage.setItem(VK, "1"); } catch (e) {}
    setUI();
    if (announce) say(X(VMSG.on)); else listen();
  }
  function stop(announce) {
    VC.on = false; try { localStorage.removeItem(VK); } catch (e) {}
    try { VC.rec && VC.rec.abort(); } catch (e) {} VC.rec = null; setUI();
    if (announce) { if (window.amanAnnounce) amanAnnounce(X(VMSG.off)); window.amanSay && amanSay(X(VMSG.off)); }
  }
  window.amanVCSay = say; window.amanVCListen = () => listen();
  window.amanVoiceControl = () => (VC.on ? stop(true) : start(true));
  // Browsers may need one tap before the microphone can start.
  function armGesture() {
    const go = () => { removeEventListener("pointerdown", go, true); removeEventListener("keydown", go, true); if (!VC.on) start(true); };
    addEventListener("pointerdown", go, true); addEventListener("keydown", go, true);
  }
  function setUI() {
    const hdr = document.getElementById("hd-act");
    let b = document.getElementById("vc-btn");
    if (hdr && !b) {
      b = document.createElement("button");
      b.type = "button"; b.id = "vc-btn"; b.className = "vc-btn";
      b.onclick = () => window.amanVoiceControl();
      b.innerHTML = svgIcon("mic", "ic", 18);
      hdr.insertBefore(b, hdr.firstChild);
      const tip = document.createElement("div"); tip.id = "vc-tip"; tip.className = "vc-tip"; tip.hidden = true; tip.setAttribute("aria-hidden", "true"); document.body.appendChild(tip);
    }
    if (b) {
      b.setAttribute("aria-label", X(VMSG.btn)); b.title = X(VMSG.btn);
      b.setAttribute("aria-pressed", VC.on ? "true" : "false");
      b.classList.toggle("on", VC.on); b.classList.toggle("live", !!VC.rec);
      if (!SR) b.hidden = true;
    }
  }
  document.addEventListener("keydown", e => { if (e.altKey && (e.key === "v" || e.key === "V")) { e.preventDefault(); window.amanVoiceControl(); } });
  addEventListener("hashchange", () => { setUI(); if (location.hash === "#sos") { history.replaceState(null, "", "#home"); draw(); amanOpenSosModal(); } if (location.hash === "#voice") { history.replaceState(null, "", "#home"); draw(); start(true); } });

  /* ---------- Speech: English voices on the accessibility page ---------- */
  const baseVoices = window.amanRenderVoices;
  if (baseVoices) window.amanRenderVoices = function () {
    baseVoices();
    const host = document.getElementById("a11y-voices");
    const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    const en = vs.filter(v => /^en/i.test(v.lang));
    if (host && en.length && !host.querySelector('[lang="en"]')) {
      const ul = host.querySelector(".a11y-voices");
      if (ul) ul.insertAdjacentHTML("beforeend", `<li><button type="button" class="btn o" lang="en" onclick="amanTestVoice('en')">${svgIcon("volume", "ic", 16)} <span>English</span> <small>${en.length}</small></button></li>`);
    }
  };

  /* ---------- Directory: official national services (public, always shown) ---------- */
  const OFFICIAL = [
    { n: "19", t: ["الشرطة (الأمن الوطني)", "Police (Sûreté nationale)", "Police (National Security)"], d: ["المدن — طوارئ ونجدة", "Villes — urgences", "Cities — emergencies"] },
    { n: "177", t: ["الدرك الملكي", "Gendarmerie royale", "Royal Gendarmerie"], d: ["العالم القروي", "Zones rurales", "Rural areas"] },
    { n: "15", t: ["الوقاية المدنية", "Protection civile", "Civil Protection"], d: ["إسعاف وحرائق", "Secours et incendies", "Ambulance and fire"] },
    { n: "8350", t: ["كلنا معاك — الاتحاد الوطني لنساء المغرب", "Koulouna Maak — UNFM", "Koulouna Maak — UNFM"], d: ["خط مجاني للاستماع والتوجيه للنساء", "Ligne gratuite d'écoute et d'orientation pour les femmes", "Free listening and referral line for women"] }
  ];
  const baseDir = P.dir;
  if (baseDir) P.dir = function () {
    const off = `<h2>${lb("الخدمات الرسمية الوطنية", "Services officiels nationaux", "Official national services")}</h2><div class="grid">${OFFICIAL.map(o => `<a class="card" href="tel:${o.n}" style="text-decoration:none;color:inherit"><span class="tag">${lb("رقم عمومي", "Numéro public", "Public number")}</span><h3 dir="ltr" style="text-align:start">${o.n}</h3><p><b>${E(X(o.t))}</b><br>${E(X(o.d))}</p></a>`).join("")}
      <div class="card"><span class="tag">${lb("حضورياً", "Sur place", "In person")}</span><h3>${lb("خلايا التكفل بالنساء ضحايا العنف", "Cellules de prise en charge des femmes victimes", "Support units for women victims")}</h3><p>${lb("في المحاكم الابتدائية ومحاكم الاستئناف، ومصالح الشرطة والدرك، والمستشفيات العمومية (القانون 103-13).", "Dans les tribunaux de première instance et d'appel, la police, la gendarmerie et les hôpitaux publics (loi 103-13).", "In courts of first instance and appeal, police, gendarmerie and public hospitals (Law 103-13).")}</p></div>
      <div class="card"><span class="tag">${lb("عبر الإنترنت", "En ligne", "Online")}</span><h3>vcfemme.pmp.ma · chikaya.ma</h3><p>${lb("منصة النيابة العامة للتبليغ عن العنف ضد النساء، والبوابة الوطنية للشكايات.", "Plateforme du ministère public pour signaler les violences faites aux femmes, et portail national des réclamations.", "Public Prosecution platform for reporting violence against women, and the national complaints portal.")}</p><p><a href="https://vcfemme.pmp.ma/" target="_blank" rel="noopener">vcfemme.pmp.ma</a> · <a href="https://www.chikaya.ma/?lang=ar" target="_blank" rel="noopener">chikaya.ma</a></p></div></div>
      <p class="muted">${lb("أرقام ومواقع عمومية؛ تحققي منها قبل الاعتماد عليها. لا تعني أي شراكة مع أمان.", "Numéros et sites publics ; vérifiez-les avant de vous y fier. Aucun partenariat avec AMAN n'est sous-entendu.", "Public numbers and websites; check them before relying on them. No partnership with AMAN is implied.")}</p>
      <h2>${lb("ملفات موثقة من المجتمع", "Profils vérifiés de la communauté", "Verified community profiles")}</h2>`;
    const h = baseDir();
    const i = h.indexOf("</h1>");
    return i > 0 ? h.slice(0, i + 5) + off + h.slice(i + 5) : off + h;
  };

  /* ---------- Accessibility page: voice control card ---------- */
  const baseAccess = P.access;
  if (baseAccess) P.access = function () {
    const card = `<section class="card" aria-labelledby="vc-h"><h3 id="vc-h">${svgIcon("mic", "ic", 20)} ${X(VMSG.btn)}</h3><p>${lb("استعملي التطبيق بالصوت فقط: فعّلي التحكم بالصوت ثم قولي اسم الصفحة أو الأمر. يبقى مفعلاً حتى توقفيه، ويمكن فتحه مباشرة من الرابط ", "Utilisez l'application à la voix : activez le contrôle vocal puis dites le nom d'une page ou une commande. Il reste actif jusqu'à ce que vous l'arrêtiez. Lien direct : ", "Use the app by voice only: turn on voice control, then say a page name or a command. It stays on until you turn it off. Direct link: ")}<b dir="ltr">${E(location.origin)}/?voice=1</b></p><p class="note">${E(X(VMSG.help))}</p><p><button type="button" class="btn d" onclick="amanVoiceControl();draw()">${VC.on ? lb("إيقاف التحكم بالصوت", "Désactiver le contrôle vocal", "Turn voice control off") : lb("تفعيل التحكم بالصوت", "Activer le contrôle vocal", "Turn voice control on")}</button></p></section>`;
    return card + baseAccess();
  };

  /* ---------- Start ---------- */
  const q = new URLSearchParams(location.search);
  const wantVoice = q.get("voice") === "1" || location.hash === "#voice";
  const boot = () => {
    if (location.hash === "#sos") { history.replaceState(null, "", "#home"); setTimeout(() => amanOpenSosModal(), 50); }
    if (location.hash === "#voice") history.replaceState(null, "", "#home");
    setUI();
    let saved = false; try { saved = localStorage.getItem(VK) === "1"; } catch (e) {}
    if (SR && (wantVoice || saved)) { start(wantVoice); if (!VC.rec) armGesture(); }
  };
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
  addEventListener("hashchange", () => setTimeout(setUI, 0));
})();
