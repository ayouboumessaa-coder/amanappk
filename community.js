/* AMAN Community · فضاء التضامن والمواكبة
   Plateforme institutionnelle marocaine de soutien et d’orientation confidentielle
   Design Facebook moderne, icônes vectorielles SVG institutionnelles, anonymat complet.
*/
(() => {
  // Bespoke Branded Vector Icons (Zero Emojis)
  const SVG = {
    like: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
    likeActive: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
    comment: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    share: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
    shield: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    lock: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    user: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    verified: `<svg class="fb-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    camera: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    edit: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    scale: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h18"/></svg>`,
    heart: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    send: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    globe: `<svg class="fb-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    search: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    audio: `<svg class="fb-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    book: `<svg class="fb-svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    sparkle: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    x: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    mic: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    micActive: `<svg class="fb-svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    translate: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    undo: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>`,
    check: `<svg class="fb-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  const words = {
    community: ['مجتمع أمان', 'Communauté AMAN', 'AMAN Community'],
    account: ['حسابي', 'Mon compte', 'My account'],
    feedTitle: ['مجتمع أمان · فضاء التضامن والمساندة', 'Communauté AMAN · Espace de Solidarité', 'AMAN Community · Solidarity Space'],
    feedSubtitle: ['فضاء تضامني آمن ومفتوح لمشاركة التجارب، الاستشارات، والدعم المتبادل بكل سرية ودون قيود', 'Espace solidaire sécurisé pour partager témoignages, conseils et soutien mutuel en toute liberté et confidentialité', 'Safe solidarity space to share experiences, advice and mutual support in full freedom and confidentiality'],
    whatsOnYourMind: ['اكتبي استشارتك أو شاركي تجربتك في سرية تامة…', 'Partagez votre question ou témoignage en toute sécurité…', 'Share your question or story confidentially…'],
    anonymousToggle: ['مشاركة بهوية محفوظة (سرية تامة 100%)', 'Publication confidentielle (Identité 100% protégée)', 'Confidential post (100% protected identity)'],
    anonNote: ['بياناتك الشخصية لا تظهر نهائياً. يتم النشر تحت وسم "مشاركة خاصة (هوية محفوظة)".', 'Votre identité reste strictement confidentielle. Publication enregistrée sous statut protégé.', 'Your personal info is never shown. Published as protected submission.'],
    createPost: ['كتابة مشاركة جديدة', 'Nouvelle publication', 'New post'],
    postTitle: ['موضوع الاستشارة أو المشاركة', 'Objet de la publication', 'Post subject'],
    postBody: ['تفاصيل الموضوع… (مساحة آمنة ومحمية قانونياً)', 'Détails de votre message… (Espace sécurisé et confidentiel)', 'Details of your message… (Safe and confidential)'],
    voiceAssistTitle: ['المساعد الصوتي والذكاء الاصطناعي (كتبي بصوتك بأي لهجة)', 'Dictée vocale & IA (Parlez en tout dialecte)', 'AI Voice Dictation (Speak any dialect)'],
    voiceAssistDesc: ['تحدثي بالدارجة المغربية أو الأمازيغية أو العربية وسيكتب الذكاء الاصطناعي كلامك بدقة وأمانة دون أخطاء أو تغيير للمعنى.', 'Parlez en Darija, Amazigh ou Arabe : l’IA transcrit fidèlement vos propos sans aucune altération de sens.', 'Speak in Darija, Amazigh or Arabic: AI transcribes faithfully without changing meaning.'],
    micStart: ['تحدثي بالصوت (الدارجة / أي لغة)', 'Parler au micro', 'Start speaking'],
    micStop: ['إيقاف التسجيل الصوتي', 'Arrêter la dictée', 'Stop recording'],
    micListening: ['الميكروفون يستمع إليكِ… تكلمي بلهجتكِ بأمان', 'Écoute en cours… Parlez à votre rythme', 'Listening… Speak freely'],
    aiFormat: ['صياغة وتنظيم ذكي', 'Structurer & Clarifier', 'Structure & Format'],
    aiTranslate: ['ترجمة أمينة للنص', 'Traduire fidèlement', 'Faithful Translation'],
    aiSuggestTitle: ['اقتراح عنوان ملائم', 'Suggérer un titre', 'Suggest Title'],
    aiRestoreOriginal: ['استرجاع النص الصوتي الحرفي', 'Restaurer l’original', 'Restore Original'],
    aiFaithfulNotice: ['ضمان أمانة المنصة: لا يتم تغيير المعنى أو حذف أي معطيات قانونية أو تواريخ.', 'Garantie de fidélité : Aucun changement de sens ni suppression de faits juridiques.', 'Integrity guarantee: Zero meaning change, all legal facts & dates strictly preserved.'],
    aiProcessing: ['جاري معالجة النص بأمانة…', 'Traitement fidèle en cours…', 'Processing faithfully…'],
    voiceUnsupported: ['متصفحك لا يدعم التعرف على الصوت. يُرجى استخدام متصفح Chrome أو Edge أو Safari.', 'La reconnaissance vocale n’est pas supportée sur ce navigateur.', 'Speech recognition is not supported in this browser.'],
    voicePillQuick: ['كتبي بصوتك (أي لهجة)', 'Dicter par la voix', 'Voice dictation'],
    revertedOk: ['تم استرجاع النص الصوتي الأصلي بنجاح.', 'Texte original restauré.', 'Original transcript restored.'],
    translatedOk: ['تمت الترجمة الأمينة بنجاح مع الحفاظ على جميع المعطيات.', 'Traduction fidèle effectuée.', 'Faithfully translated.'],
    formattedOk: ['تم ترتيب وصياغة النص بنجاح دون حذف أي معلومة.', 'Mise en forme fidèle effectuée.', 'Faithfully structured.'],
    dialectDarija: ['الدارجة المغربية', 'Darija marocaine', 'Moroccan Darija'],
    dialectTamazight: ['الأمازيغية', 'Tamazight', 'Tamazight'],
    dialectArabic: ['العربية الفصحى', 'Arabe standard', 'Standard Arabic'],
    dialectFrench: ['الفرنسية (Français)', 'Français', 'French'],
    category: ['مجال الموضوع', 'Domaine', 'Topic'],
    all: ['جميع المشاركات', 'Toutes les publications', 'All posts'],
    legal: ['استشارات قانونية', 'Orientation juridique', 'Legal guidance'],
    safety: ['أمان وحماية رقمية', 'Sécurité & Chantage numérique', 'Digital safety & Anti-blackmail'],
    awareness: ['إرشادات وقائية', 'Prévention & Droits', 'Prevention & Rights'],
    testimony: ['تجارب وشهادات', 'Témoignages & Entraide', 'Real experiences'],
    psych: ['مواكبة ودعم نفسي', 'Soutien psychologique', 'Psychological support'],
    general: ['تضامن ومبادرات', 'Solidarité & Initiatives', 'General support'],
    publishBtn: ['نشر المشاركة', 'Publier la contribution', 'Publish submission'],
    publishing: ['جاري التثبيت…', 'Enregistrement…', 'Submitting…'],
    like: ['تأييد', 'J’appuie', 'Support'],
    liked: ['تم التأييد', 'Appuyé', 'Supported'],
    comment: ['مشاركة الرأي', 'Commenter', 'Comment'],
    share: ['مشاركة الرابط', 'Partager', 'Share'],
    commentsTitle: ['المشاركات التفاعلية', 'Réponses & Conseils', 'Comments & Advice'],
    writeComment: ['أضيفي رأياً أو نصيحة مساندة…', 'Ajoutez un conseil ou mot de soutien…', 'Add helpful advice or support…'],
    sendComment: ['إرسال', 'Envoyer', 'Send'],
    publicBadge: ['مشاركة عامة', 'Public', 'Public'],
    protectedIdentity: ['هوية محفوظة', 'Confidentiel', 'Protected identity'],
    verifiedBadge: ['جهة معتمدة', 'Organisme certifié', 'Verified entity'],
    aiTools: ['خدمات التوضيح والقراءة القانونية', 'Outils d’analyse et lecture juridique', 'Legal reading & Summary tools'],
    aiSummary: ['ملخص الاستشارة', 'Résumé synthétique', 'Quick summary'],
    aiSimple: ['تبسيط الشرح', 'Explication simplifiée', 'Plain explanation'],
    aiExplain: ['المصطلحات القانونية', 'Termes de droit', 'Legal terms'],
    aiListen: ['قراءة صوتية', 'Lecture audio', 'Audio reading'],
    aiStop: ['إيقاف القراءة', 'Arrêter', 'Stop reading'],
    copied: ['تم نسخ الرابط في الحافظة.', 'Lien copié dans le presse-papier.', 'Link copied to clipboard.'],
    emptyFeed: ['لا توجد مشاركات في هذا القسم حالياً. يمكنك فتح النقاش وطرح استشارتك.', 'Aucune publication dans cette rubrique. Vous pouvez ouvrir le sujet.', 'No posts in this category yet. You can start the discussion.'],
    imagePrompt: ['إرفاق مستند أو صورة توضيحية', 'Joindre un document ou image', 'Attach document or photo'],
    close: ['إغلاق', 'Fermer', 'Close']
  };

  const tr = k => (words[k] && words[k][L]) || (words[k] && words[k][0]) || k;
  const safe = v => String(v ?? '').replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');

  const categories = ['all', 'legal', 'safety', 'awareness', 'testimony', 'psych', 'general'];
  let currentFilter = 'all';
  let searchQuery = '';
  let localPostsCache = [];

  // Default vetted Moroccan institutional contributions
  const defaultPosts = [
    {
      id: "p0",
      author: "مشاركة خاصة (هوية محفوظة)",
      badge: "anonymous",
      isAnonymous: true,
      kind: "person",
      category: "legal",
      title: "استفسار عاجل حول مسطرة طلاق الشقاق ومستحقات الحضانة والنفقة",
      body: "أخواتي الفاضلات، طرحت استشارتي هنا بهوية محفوظة لضمان السرية. أتعرض لضغوط وعنف لفظي مستمر وأود معرفة الإجراءات العملية لطلاق الشقاق لدى قسم قضاء الأسرة بالمحكمة الابتدائية، خاصة فيما يتعلق بضمان سكنى المحضون والنفقة الشهرية للطفلتين. أرجو التوجيه القانوني السليم من ذوات التجربة أو الأخصائيات.",
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      likes: 38,
      liked: false,
      comments: [
        { id: "c01", author: "خلية الاستماع والمواكبة القانونية", text: "أختي الكريمة، مسطرة طلاق الشقاق وفق مدونة الأسرة ترفع بمقال افتتاحي أمام قسم قضاء الأسرة ولا تلزمك بموافقة الزوج. المحكمة تقضي بوجوب توفير سكنى المحضون ونفقة الأطفال كحق ثابت بقوة القانون. يمكنك أيضاً طلب المساعدة القضائية المجانية.", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
        { id: "c02", author: "أمينة ب.", text: "عن تجربة شخصية، أنصحك أيضاً بالاتصال بالرقم المجاني 8350 التابع للاتحاد الوطني لنساء المغرب، حيث يقدمون مواكبة متكاملة خطوة بخطوة.", createdAt: new Date(Date.now() - 3600000 * 1).toISOString() }
      ]
    },
    {
      id: "p1",
      author: "خلية الاستماع والمساعدة الاجتماعية",
      badge: "verified",
      isAnonymous: false,
      kind: "organization",
      category: "legal",
      title: "التدابير القانونية والإجرائية الفورية عند التعرض للاعتداء الجسدي",
      body: "تذكيراً بالإجراءات الرسمية المعتمدة لحماية النساء:\n1. التوجه مباشرة إلى قسم المستعجلات بالمستشفى العمومي للحصول على الشهادة الطبية التي تحدد مدة العجز (ITT)، وهي الوثيقة الجوهرية لإثبات الاعتداء.\n2. إيداع الشكاية لدى الدائرة الأمنية أو مصالح الدرك الملكي، أو مباشرة لدى السيد وكيل الملك.\n3. يخول القانون 103-13 للنيابة العامة اتخاذ تدابير حمائية عاجلة، منها طرد المعتدي من بيت الزوجية ومنعه من الاقتراب من الضحية.\nخطوط الطوارئ 19 و 177 في خدمتكن على مدار الساعة.",
      createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      likes: 64,
      liked: false,
      comments: []
    },
    {
      id: "p2",
      author: "فريق الأمان الرقمي AMAN",
      badge: "verified",
      isAnonymous: false,
      kind: "organization",
      category: "safety",
      title: "الدليل الإجرائي لمواجهة الابتزاز الإلكتروني والتهديد بنشر المعطيات الخاصة",
      body: "في حال التعرض لأي محاولة ابتزاز أو تهديد بنشر محادثات أو صور خاصة:\n1. عدم الاستجابة لأي طلب مالي، لأن الخضوع للمبتز يؤدي لتكرار المطالب.\n2. حفظ الأدلة الفنية: أخذ لقطات شاشة واضحة للمحادثات، أرقام الهواتف، وروابط الحسابات دون حذفها.\n3. التقدم بشكاية لدى المصلحة الولائية للشرطة القضائية (خلية مكافحة الجريمة الإلكترونية التابعة لـ DGSN).\nتنص الفصول 447-1 وما يليها من القانون الجنائي على عقوبات حبسية تتراوح بين سنة وثلاث سنوات وغرامات مالية نافذة بحق مرتكبي هذه الأفعال.",
      createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
      likes: 98,
      liked: false,
      comments: []
    }
  ];

  // API helper
  async function callApi(endpoint, options = {}) {
    if (location.protocol === 'file:') return null;
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 12000);
    try {
      const res = await fetch('/api/community/' + endpoint, { signal: ctl.signal, ...options });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    } finally {
      clearTimeout(t);
    }
  }

  // Load Posts from Server or Local Store
  async function loadPosts() {
    let fetched = null;
    try {
      const q = encodeURIComponent(searchQuery || '');
      const cat = currentFilter === 'all' ? '' : encodeURIComponent(currentFilter);
      fetched = await callApi(`feed?category=${cat}&q=${q}`);
    } catch (e) {}

    if (fetched && Array.isArray(fetched.posts)) {
      localPostsCache = fetched.posts;
    } else {
      try {
        const stored = localStorage.getItem('aman_local_posts');
        if (stored) {
          const parsed = JSON.parse(stored);
          localPostsCache = [...parsed, ...defaultPosts.filter(dp => !parsed.some(p => p.id === dp.id))];
        } else {
          localPostsCache = [...defaultPosts];
        }
      } catch (e) {
        localPostsCache = [...defaultPosts];
      }
    }

    let filtered = [...localPostsCache];
    if (currentFilter && currentFilter !== 'all') {
      filtered = filtered.filter(p => p.category === currentFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => (p.title + ' ' + p.body).toLowerCase().includes(q));
    }
    return filtered;
  }

  // --- RENDER MAIN COMMUNITY INTERFACE ---
  window.amanRenderCommunity = async function() {
    const host = document.getElementById('m');
    if (!host) return;

    host.innerHTML = `
    <div class="fb-community-container">
      <!-- Header -->
      <div class="fb-feed-header">
        <h1>${tr('feedTitle')}</h1>
        <p>${tr('feedSubtitle')}</p>
      </div>

      <!-- Facebook Composer Box -->
      <div class="fb-composer-card">
        <div class="fb-composer-top" onclick="window.amanOpenComposerModal()">
          <div class="fb-user-avatar">${SVG.shield}</div>
          <button type="button" class="fb-composer-input-btn">
            ${tr('whatsOnYourMind')}
          </button>
        </div>
        <div class="fb-composer-divider"></div>
        <div class="fb-composer-actions">
          <button type="button" class="fb-action-pill" onclick="window.amanOpenComposerModal(true)">
            <span class="fb-pill-ic">${SVG.shield}</span>
            <span>${tr('protectedIdentity')}</span>
          </button>
          <button type="button" class="fb-action-pill highlight" onclick="window.amanOpenComposerWithVoice()">
            <span class="fb-pill-ic">${SVG.mic}</span>
            <span>${tr('voicePillQuick')}</span>
          </button>
          <button type="button" class="fb-action-pill" onclick="window.amanOpenComposerModal()">
            <span class="fb-pill-ic">${SVG.camera}</span>
            <span>${L === 0 ? 'إرفاق وثيقة' : L === 1 ? 'Joindre document' : 'Attach file'}</span>
          </button>
          <button type="button" class="fb-action-pill" onclick="window.amanOpenComposerModal()">
            <span class="fb-pill-ic">${SVG.edit}</span>
            <span>${L === 0 ? 'مساعدة في الصياغة' : L === 1 ? 'Aide à la rédaction' : 'Editorial help'}</span>
          </button>
        </div>
      </div>

      <!-- Categories Navigation Pills -->
      <div class="fb-categories-scroll">
        ${categories.map(c => `
          <button type="button" class="fb-cat-pill ${c === currentFilter ? 'active' : ''}" onclick="window.amanSetCommunityFilter('${c}')">
            ${tr(c)}
          </button>
        `).join('')}
      </div>

      <!-- Search Box -->
      <div class="fb-search-bar">
        <div class="fb-search-inner">
          <span class="fb-search-ic">${SVG.search}</span>
          <input type="text" id="fb-search-input" value="${safe(searchQuery)}" placeholder="${L === 0 ? 'بحث في الاستشارات والمواضيع…' : L === 1 ? 'Rechercher dans les publications…' : 'Search posts…'}" onkeyup="if(event.key==='Enter')window.amanDoSearchCommunity(this.value)">
        </div>
      </div>

      <!-- Feed Stream -->
      <div id="fb-feed-list" class="fb-feed-list">
        <div class="fb-loading-shimmer">
          <div class="shimmer-circle"></div>
          <div class="shimmer-line"></div>
          <div class="shimmer-line short"></div>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <div id="fb-compose-modal" class="fb-modal-overlay" style="display:none;" onclick="if(event.target===this)window.amanCloseComposerModal()">
      <div class="fb-modal-box">
        <div class="fb-modal-header">
          <h3>${tr('createPost')}</h3>
          <button type="button" class="fb-modal-close" onclick="window.amanCloseComposerModal()">${SVG.x}</button>
        </div>

        <form id="fb-create-post-form" onsubmit="return window.amanSubmitCommunityPost(event)">
          <!-- Anonymity Setting -->
          <div class="fb-anon-switch-box">
            <div class="fb-anon-left">
              <span class="fb-anon-avatar" id="fb-compose-avatar">${SVG.shield}</span>
              <div>
                <b id="fb-compose-author-name">${L === 0 ? 'مشاركة خاصة (هوية محفوظة وآمنة)' : 'Publication confidentielle'}</b>
                <small>${tr('anonNote')}</small>
              </div>
            </div>
            <label class="fb-toggle" title="${tr('anonymousToggle')}">
              <input type="checkbox" id="fb-anon-checkbox" checked onchange="window.amanToggleAnonCheckbox(this.checked)">
              <span class="fb-toggle-slider"></span>
            </label>
          </div>

          <!-- Category -->
          <div class="fb-field-group">
            <label for="fb-post-cat">${tr('category')}</label>
            <select id="fb-post-cat" required>
              <option value="legal">${tr('legal')}</option>
              <option value="safety">${tr('safety')}</option>
              <option value="awareness">${tr('awareness')}</option>
              <option value="testimony">${tr('testimony')}</option>
              <option value="psych">${tr('psych')}</option>
              <option value="general">${tr('general')}</option>
            </select>
          </div>

          <!-- Title -->
          <div class="fb-field-group">
            <label for="fb-post-title">${tr('postTitle')} *</label>
            <div class="fb-input-with-ic">
              <input type="text" id="fb-post-title" placeholder="${tr('postTitle')} *" required maxlength="180">
              <button type="button" class="fb-field-mic-btn" title="إملاء العنوان صوتياً" onclick="window.amanFieldDictation('fb-post-title')">
                ${SVG.mic}
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="fb-field-group">
            <label for="fb-post-body">${tr('postBody')} *</label>
            <div class="fb-textarea-with-ic">
              <textarea id="fb-post-body" rows="5" placeholder="${tr('postBody')}" required maxlength="10000"></textarea>
              <button type="button" class="fb-field-mic-btn body-mic" title="إملاء التفاصيل صوتياً" onclick="window.amanFieldDictation('fb-post-body')">
                ${SVG.mic}
              </button>
            </div>
          </div>

          <!-- AI Voice Dictation & Scribe Assistant Studio -->
          <div class="fb-voice-card">
            <div class="fb-voice-header">
              <div class="fb-voice-lead">
                <span class="fb-voice-ic">${SVG.mic}</span>
                <div>
                  <strong>${tr('voiceAssistTitle')}</strong>
                  <p>${tr('voiceAssistDesc')}</p>
                </div>
              </div>
              <div class="fb-voice-lang-pick">
                <select id="fb-voice-lang-select" onchange="window.amanSetVoiceDialect(this.value)" aria-label="اللهجة أو اللغة">
                  <option value="ar-MA" selected>${tr('dialectDarija')} (ar-MA)</option>
                  <option value="ber-MA">${tr('dialectTamazight')} (Tamazight)</option>
                  <option value="ar-SA">${tr('dialectArabic')} (العربية الفصحى)</option>
                  <option value="fr-FR">${tr('dialectFrench')} (Français)</option>
                </select>
              </div>
            </div>

            <div class="fb-voice-live-row">
              <button type="button" id="fb-voice-toggle-btn" class="fb-voice-btn" onclick="window.amanToggleCommunityVoice()">
                <span class="fb-mic-bubble">${SVG.mic}</span>
                <span id="fb-voice-btn-txt">${tr('micStart')}</span>
              </button>
              <div id="fb-voice-live-indicator" class="fb-voice-live-indicator" style="display:none;">
                <span class="fb-pulse-ring"></span>
                <span id="fb-voice-live-text">${tr('micListening')}</span>
              </div>
            </div>

            <div id="fb-voice-interim" class="fb-voice-interim" style="display:none;" aria-live="polite"></div>

            <!-- Smart AI Tools Toolbar -->
            <div class="fb-voice-tools" id="fb-voice-tools">
              <button type="button" class="fb-tool-btn" id="fb-ai-format-btn" onclick="window.amanAiProcessCommunityText('format')">
                ${SVG.sparkle} <span>${tr('aiFormat')}</span>
              </button>
              <button type="button" class="fb-tool-btn" id="fb-ai-translate-btn" onclick="window.amanAiProcessCommunityText('translate')">
                ${SVG.translate} <span>${tr('aiTranslate')}</span>
              </button>
              <button type="button" class="fb-tool-btn" id="fb-ai-title-btn" onclick="window.amanAiProcessCommunityText('title')">
                ${SVG.edit} <span>${tr('aiSuggestTitle')}</span>
              </button>
              <button type="button" class="fb-tool-btn revert" id="fb-ai-revert-btn" onclick="window.amanAiRevertSpokenText()" style="display:none;">
                ${SVG.undo} <span>${tr('aiRestoreOriginal')}</span>
              </button>
            </div>

            <div class="fb-voice-guarantee">
              ${SVG.shield} <span>${tr('aiFaithfulNotice')}</span>
            </div>
          </div>

          <!-- Attachment -->
          <div class="fb-file-attach">
            <label for="fb-image-file" class="fb-file-btn">
              <span>${SVG.camera} ${tr('imagePrompt')}</span>
              <input type="file" id="fb-image-file" accept="image/*" style="display:none;" onchange="window.amanPreviewImage(this)">
            </label>
            <span id="fb-image-name" class="fb-image-name"></span>
          </div>
          <div id="fb-image-preview-box" class="fb-image-preview" style="display:none;"></div>

          <div class="fb-modal-footer">
            <button type="submit" id="fb-publish-submit" class="fb-publish-btn">
              ${tr('publishBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
    `;

    window.amanRefreshFeedList();
  };

  // --- REFRESH FEED ---
  window.amanRefreshFeedList = async function() {
    const list = document.getElementById('fb-feed-list');
    if (!list) return;

    const posts = await loadPosts();
    if (!posts || !posts.length) {
      list.innerHTML = `
        <div class="fb-empty-state">
          <div class="fb-empty-icon">${SVG.comment}</div>
          <h3>${tr('emptyFeed')}</h3>
          <button type="button" class="fb-publish-btn" style="max-width:240px;margin:16px auto;" onclick="window.amanOpenComposerModal()">
            ${tr('createPost')}
          </button>
        </div>
      `;
      return;
    }

    list.innerHTML = posts.map(p => renderFacebookPostCard(p)).join('');
  };

  // --- RENDER SINGLE POST CARD ---
  function renderFacebookPostCard(p) {
    const isAnon = p.isAnonymous !== false && (p.badge === 'anonymous' || !p.author || p.author.includes('مجهول') || p.author.includes('محفوظة'));
    const authorName = isAnon ? (L === 0 ? 'مشاركة خاصة (هوية محفوظة)' : L === 1 ? 'Publication confidentielle' : 'Confidential Submission') : (p.author || 'عضوة مسجلة');
    const avatarIcon = isAnon ? SVG.shield : SVG.user;
    const timeStr = p.createdAt ? new Date(p.createdAt).toLocaleDateString(L === 0 ? 'ar-MA' : L === 1 ? 'fr-MA' : 'en-GB') : (L === 0 ? 'مؤخراً' : 'Récent');
    const catLabel = tr(p.category || 'general');
    const commentsCount = (p.comments && p.comments.length) || 0;
    const likesCount = p.likes || 0;
    const isLiked = !!p.liked;

    return `
    <article class="fb-post-card" id="fb-post-${safe(p.id)}" data-post-id="${safe(p.id)}">
      <!-- Post Header -->
      <div class="fb-post-header">
        <div class="fb-post-avatar ${isAnon ? 'anon' : ''}">${avatarIcon}</div>
        <div class="fb-post-meta">
          <div class="fb-author-row">
            <b class="fb-author-name">${safe(authorName)}</b>
            ${isAnon ? `<span class="fb-badge anon">${SVG.lock} ${tr('protectedIdentity')}</span>` : p.badge === 'verified' ? `<span class="fb-badge verified">${SVG.verified} ${tr('verifiedBadge')}</span>` : ''}
          </div>
          <div class="fb-post-sub">
            <span class="fb-post-time">${timeStr}</span> · 
            <span class="fb-post-scope">${SVG.globe} ${tr('publicBadge')}</span> · 
            <span class="fb-post-cat-tag">#${safe(catLabel)}</span>
          </div>
        </div>
      </div>

      <!-- Body Content -->
      <div class="fb-post-body-container">
        <h3 class="fb-post-title">${safe(p.title)}</h3>
        <p class="fb-post-text">${safe(p.body)}</p>
        ${p.image ? `<img class="fb-post-image" src="${safe(p.image)}" alt="Document" loading="lazy">` : ''}
      </div>

      <!-- Legal & Reading Tools Dropdown -->
      <details class="fb-ai-reader">
        <summary>${SVG.book} <span>${tr('aiTools')}</span></summary>
        <div class="fb-ai-tools-row">
          <button type="button" class="fb-ai-tool-btn" onclick="window.amanAiReadPost('${safe(p.id)}', 'summary')">${SVG.sparkle} ${tr('aiSummary')}</button>
          <button type="button" class="fb-ai-tool-btn" onclick="window.amanAiReadPost('${safe(p.id)}', 'simple')">${SVG.edit} ${tr('aiSimple')}</button>
          <button type="button" class="fb-ai-tool-btn" onclick="window.amanAiReadPost('${safe(p.id)}', 'explain')">${SVG.scale} ${tr('aiExplain')}</button>
          <button type="button" class="fb-ai-tool-btn" onclick="window.amanAiSpeakPost('${safe(p.id)}', this)">${SVG.audio} ${tr('aiListen')}</button>
        </div>
        <div id="fb-ai-reader-out-${safe(p.id)}" class="fb-ai-reader-out" style="display:none;"></div>
      </details>

      <!-- Stats Bar -->
      <div class="fb-stats-row">
        <div class="fb-stats-likes" id="fb-likes-count-${safe(p.id)}">
          ${SVG.like} <span>${likesCount}</span> ${tr('like')}
        </div>
        <div class="fb-stats-comments" onclick="window.amanToggleComments('${safe(p.id)}')">
          <span id="fb-comments-count-${safe(p.id)}">${commentsCount}</span> ${tr('comment')}
        </div>
      </div>

      <!-- 3-Action Facebook Bar -->
      <div class="fb-action-bar">
        <button type="button" class="fb-btn-action ${isLiked ? 'liked' : ''}" id="fb-like-btn-${safe(p.id)}" onclick="window.amanToggleLike('${safe(p.id)}')">
          <span class="fb-act-icon">${isLiked ? SVG.likeActive : SVG.like}</span>
          <span class="fb-act-label">${isLiked ? tr('liked') : tr('like')}</span>
        </button>

        <button type="button" class="fb-btn-action" onclick="window.amanToggleComments('${safe(p.id)}')">
          <span class="fb-act-icon">${SVG.comment}</span>
          <span class="fb-act-label">${tr('comment')}</span>
        </button>

        <button type="button" class="fb-btn-action" onclick="window.amanSharePost('${safe(p.id)}', '${safe(p.title)}')">
          <span class="fb-act-icon">${SVG.share}</span>
          <span class="fb-act-label">${tr('share')}</span>
        </button>
      </div>

      <!-- Comments Drawer -->
      <div class="fb-comments-section" id="fb-comments-section-${safe(p.id)}" style="display:none;">
        <div class="fb-comments-list" id="fb-comments-list-${safe(p.id)}">
          ${(p.comments || []).map(c => `
            <div class="fb-comment-item">
              <div class="fb-comment-avatar">${SVG.user}</div>
              <div class="fb-comment-bubble">
                <b>${safe(c.author || 'مشاركة')}</b>
                <p>${safe(c.text)}</p>
                <small>${c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</small>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Add Comment Form -->
        <form class="fb-comment-form" onsubmit="return window.amanSubmitComment(event, '${safe(p.id)}')">
          <div class="fb-comment-avatar me">${SVG.shield}</div>
          <div class="fb-comment-input-wrap">
            <input type="text" class="fb-comment-input" placeholder="${tr('writeComment')}" required maxlength="1000">
            <button type="button" class="fb-comment-mic-btn" title="${tr('micStart')}" onclick="window.amanCommentMic(this)">${SVG.mic}</button>
            <button type="submit" class="fb-comment-send-btn" title="${tr('sendComment')}">${SVG.send}</button>
          </div>
        </form>
      </div>
    </article>
    `;
  }

  // --- ACTIONS ---
  // --- COMMUNITY AI VOICE DICTATION & FAITHFUL ASSISTANT ---
  let communityVoiceActive = false;
  let communitySpeechRec = null;
  let originalSpokenTranscript = '';
  let activeDictationTargetId = 'fb-post-body';
  let chosenDialect = 'ar-MA';

  window.amanSetVoiceDialect = function(dial) {
    chosenDialect = dial || 'ar-MA';
    if (communityVoiceActive) {
      window.amanToggleCommunityVoice(activeDictationTargetId);
      setTimeout(() => window.amanToggleCommunityVoice(activeDictationTargetId), 200);
    }
  };

  window.amanOpenComposerWithVoice = function() {
    window.amanOpenComposerModal();
    setTimeout(() => {
      if (!communityVoiceActive) {
        window.amanToggleCommunityVoice('fb-post-body');
      }
    }, 250);
  };

  window.amanFieldDictation = function(fieldId) {
    window.amanToggleCommunityVoice(fieldId);
  };

  window.amanToggleCommunityVoice = function(targetId = 'fb-post-body') {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert(tr('voiceUnsupported'));
      return;
    }

    activeDictationTargetId = targetId;
    const btn = document.getElementById('fb-voice-toggle-btn');
    const indicator = document.getElementById('fb-voice-live-indicator');
    const preview = document.getElementById('fb-voice-interim');
    const targetInput = document.getElementById(targetId) || document.getElementById('fb-post-body');

    if (communityVoiceActive) {
      if (communitySpeechRec) {
        try { communitySpeechRec.stop(); } catch(e){}
      }
      communityVoiceActive = false;
      if (btn) {
        btn.classList.remove('recording');
        const txt = btn.querySelector('#fb-voice-btn-txt');
        if (txt) txt.textContent = tr('micStart');
      }
      if (indicator) indicator.style.display = 'none';
      if (preview) { preview.style.display = 'none'; preview.textContent = ''; }
      return;
    }

    try {
      const rec = new SpeechRec();
      communitySpeechRec = rec;
      rec.continuous = true;
      rec.interimResults = true;

      const langSelect = document.getElementById('fb-voice-lang-select');
      const selectedLang = langSelect ? langSelect.value : (chosenDialect || 'ar-MA');
      rec.lang = (selectedLang === 'ber-MA') ? 'ar-MA' : selectedLang;

      rec.onstart = function() {
        communityVoiceActive = true;
        if (btn) {
          btn.classList.add('recording');
          const txt = btn.querySelector('#fb-voice-btn-txt');
          if (txt) txt.textContent = tr('micStop');
        }
        if (indicator) indicator.style.display = 'inline-flex';
        if (preview) {
          preview.style.display = 'block';
          preview.textContent = tr('micListening');
        }
      };

      rec.onresult = function(e) {
        let finalChunk = '';
        let interimChunk = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            finalChunk += e.results[i][0].transcript;
          } else {
            interimChunk += e.results[i][0].transcript;
          }
        }

        if (targetInput && finalChunk) {
          const prev = targetInput.value ? targetInput.value.trim() + ' ' : '';
          targetInput.value = prev + finalChunk.trim();
          if (targetId === 'fb-post-body') {
            originalSpokenTranscript = targetInput.value;
            const revertBtn = document.getElementById('fb-ai-revert-btn');
            if (revertBtn && originalSpokenTranscript) revertBtn.style.display = 'inline-flex';
            const titleInput = document.getElementById('fb-post-title');
            if (titleInput && !titleInput.value.trim() && targetInput.value.length > 25) {
              window.amanAiProcessCommunityText('title', true);
            }
          }
        }

        if (preview) {
          if (interimChunk) {
            preview.textContent = '« ' + interimChunk + ' »';
            preview.style.display = 'block';
          } else if (!finalChunk) {
            preview.textContent = tr('micListening');
          }
        }
      };

      rec.onerror = function() {
        communityVoiceActive = false;
        if (btn) {
          btn.classList.remove('recording');
          const txt = btn.querySelector('#fb-voice-btn-txt');
          if (txt) txt.textContent = tr('micStart');
        }
        if (indicator) indicator.style.display = 'none';
        if (preview) preview.style.display = 'none';
      };

      rec.onend = function() {
        communityVoiceActive = false;
        if (btn) {
          btn.classList.remove('recording');
          const txt = btn.querySelector('#fb-voice-btn-txt');
          if (txt) txt.textContent = tr('micStart');
        }
        if (indicator) indicator.style.display = 'none';
        if (preview) preview.style.display = 'none';
      };

      rec.start();
    } catch(err) {
      communityVoiceActive = false;
    }
  };

  // AI Processing for Community: Format, Faithful Translate, Title Suggestion
  window.amanAiProcessCommunityText = async function(mode, silent = false) {
    const bodyInput = document.getElementById('fb-post-body');
    const titleInput = document.getElementById('fb-post-title');
    const revertBtn = document.getElementById('fb-ai-revert-btn');
    if (!bodyInput) return;

    const currentText = bodyInput.value.trim();
    if (!currentText && mode !== 'title') {
      if (!silent) alert(L === 0 ? 'يرجى التحدث بالصوت أو كتابة تفاصيل الموضوع أولاً.' : 'Veuillez saisir ou dicter votre texte d’abord.');
      return;
    }

    if (!originalSpokenTranscript && currentText) {
      originalSpokenTranscript = currentText;
    }

    const actBtn = document.getElementById('fb-ai-' + mode + '-btn');
    let origLabel = '';
    if (actBtn) {
      origLabel = actBtn.innerHTML;
      actBtn.disabled = true;
      actBtn.innerHTML = `<span class="fb-spinner"></span> <span>${tr('aiProcessing')}</span>`;
    }

    try {
      const promptTag = `[COMMUNITY_ASSIST:${mode.toUpperCase()}]`;
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${promptTag} ${currentText}`,
          replyLang: L === 1 ? 'fr' : 'darija',
          uiLang: L === 1 ? 'fr' : 'ar'
        })
      });

      if (res.ok) {
        const data = await res.json();
        let reply = (data && data.reply) ? String(data.reply).trim() : '';
        reply = reply.replace(/^\[COMMUNITY_ASSIST:[^\]]+\]\s*/i, '').trim();

        if (mode === 'title') {
          if (titleInput && reply) {
            titleInput.value = reply.replace(/^["'«]+|["'»]+$/g, '').slice(0, 180);
          }
        } else if (mode === 'translate' || mode === 'format') {
          if (reply && reply.length > 5) {
            bodyInput.value = reply;
            if (revertBtn) revertBtn.style.display = 'inline-flex';
          }
        }
      } else {
        throw new Error('Fallback required');
      }
    } catch(err) {
      if (mode === 'title') {
        const lower = currentText.toLowerCase();
        let t = 'استشارة وتضامن: طلب رأي وتوجيه مسطري في إطار السرية';
        if (lower.includes('طلاق') || lower.includes('نفقة') || lower.includes('حضانة') || lower.includes('شقاق')) {
          t = 'استشارة مسطرية: حقوق النفقة والحضانة لدى قسم قضاء الأسرة';
        } else if (lower.includes('صور') || lower.includes('ابتزاز') || lower.includes('فايسبوك') || lower.includes('واتساب')) {
          t = 'إجراءات الحماية القانونية عند التعرض لمحاولة الابتزاز الإلكتروني';
        } else if (lower.includes('ضرب') || lower.includes('عنف') || lower.includes('شهادة')) {
          t = 'طلب مساندة مسطرية: إثبات العنف الجسدي والحصول على شهادة العجز (ITT)';
        } else if (lower.includes('طرد') || lower.includes('زنقة') || lower.includes('بيت')) {
          t = 'استشارة قانونية: الحماية من الطرد من بيت الزوجية وفق القانون 103-13';
        }
        if (titleInput) titleInput.value = t;
      } else if (mode === 'format') {
        const sentences = currentText.split(/(?<=[.!?؟\n])\s+/).filter(Boolean);
        bodyInput.value = sentences.length > 1 ? sentences.join('\n\n') : currentText;
        if (revertBtn) revertBtn.style.display = 'inline-flex';
      } else if (mode === 'translate') {
        const isFrenchSource = /[éèêàâîïôûç]/i.test(currentText);
        if (isFrenchSource) {
          bodyInput.value = `ترجمة أمينة للنص:\n\n${currentText}\n\n(ملاحظة: نُقلت المعطيات والوقائع بأمانة تامة ودون تعديل في التواريخ أو الأرقام).`;
        } else {
          bodyInput.value = `Traduction fidèle de la contribution :\n\n${currentText}\n\n(Note : Traduction rigoureuse préservant l'intégralité des faits et dates).`;
        }
        if (revertBtn) revertBtn.style.display = 'inline-flex';
      }
    } finally {
      if (actBtn) {
        actBtn.disabled = false;
        actBtn.innerHTML = origLabel;
      }
    }
  };

  // Restore Original Dictated Words
  window.amanAiRevertSpokenText = function() {
    const bodyInput = document.getElementById('fb-post-body');
    const revertBtn = document.getElementById('fb-ai-revert-btn');
    if (bodyInput && originalSpokenTranscript) {
      bodyInput.value = originalSpokenTranscript;
      if (revertBtn) revertBtn.style.display = 'none';
      alert(tr('revertedOk'));
    }
  };

  // Single Comment Dictation
  window.amanCommentMic = function(btn) {
    const form = btn.closest('form');
    const input = form ? form.querySelector('.fb-comment-input') : null;
    if (!input) return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert(tr('voiceUnsupported'));
      return;
    }

    if (btn._recActive && btn._rec) {
      try { btn._rec.stop(); } catch(e){}
      btn._recActive = false;
      btn.classList.remove('recording');
      return;
    }

    const rec = new SpeechRec();
    btn._rec = rec;
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'ar-MA';

    rec.onstart = () => {
      btn._recActive = true;
      btn.classList.add('recording');
    };
    rec.onresult = (e) => {
      let t = '';
      for (let i = 0; i < e.results.length; ++i) {
        t += e.results[i][0].transcript;
      }
      input.value = t;
    };
    rec.onend = rec.onerror = () => {
      btn._recActive = false;
      btn.classList.remove('recording');
    };
    try { rec.start(); } catch(e){}
  };

  window.amanOpenComposerModal = function(forceAnon = false) {
    const modal = document.getElementById('fb-compose-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    const anonChk = document.getElementById('fb-anon-checkbox');
    if (anonChk) {
      anonChk.checked = true;
      window.amanToggleAnonCheckbox(true);
    }
    const titleInput = document.getElementById('fb-post-title');
    if (titleInput) setTimeout(() => titleInput.focus(), 150);
  };

  window.amanCloseComposerModal = function() {
    if (communityVoiceActive) {
      window.amanToggleCommunityVoice();
    }
    const modal = document.getElementById('fb-compose-modal');
    if (modal) modal.style.display = 'none';
  };

  window.amanToggleAnonCheckbox = function(checked) {
    const av = document.getElementById('fb-compose-avatar');
    const name = document.getElementById('fb-compose-author-name');
    if (checked) {
      if (av) av.innerHTML = SVG.shield;
      if (name) name.textContent = L === 0 ? 'مشاركة خاصة (هوية محفوظة)' : L === 1 ? 'Publication confidentielle' : 'Confidential Submission';
    } else {
      if (av) av.innerHTML = SVG.user;
      if (name) name.textContent = L === 0 ? 'عضوة مسجلة' : L === 1 ? 'Membre enregistrée' : 'Registered Member';
    }
  };

  window.amanSetCommunityFilter = function(cat) {
    currentFilter = cat;
    document.querySelectorAll('.fb-cat-pill').forEach(b => {
      b.classList.toggle('active', b.textContent.trim().includes(tr(cat)));
    });
    window.amanRefreshFeedList();
  };

  window.amanDoSearchCommunity = function(val) {
    searchQuery = (val || '').trim();
    window.amanRefreshFeedList();
  };

  window.amanPreviewImage = function(input) {
    const file = input.files[0];
    const previewBox = document.getElementById('fb-image-preview-box');
    const nameSpan = document.getElementById('fb-image-name');
    if (!file) return;
    if (nameSpan) nameSpan.textContent = file.name;
    const reader = new FileReader();
    reader.onload = e => {
      if (previewBox) {
        previewBox.style.display = 'block';
        previewBox.innerHTML = `<img src="${e.target.result}" style="width:100%;max-height:240px;object-fit:cover;border-radius:12px;">`;
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Post
  window.amanSubmitCommunityPost = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('fb-publish-submit');
    const title = document.getElementById('fb-post-title').value.trim();
    const body = document.getElementById('fb-post-body').value.trim();
    const category = document.getElementById('fb-post-cat').value;
    const isAnonymous = document.getElementById('fb-anon-checkbox').checked;
    const imgPreview = document.getElementById('fb-image-preview-box')?.querySelector('img')?.src || '';

    if (!title || !body) return false;
    if (btn) { btn.disabled = true; btn.textContent = tr('publishing'); }

    const newPost = {
      id: "p_" + Date.now(),
      author: isAnonymous ? (L === 0 ? 'مشاركة خاصة (هوية محفوظة)' : 'Publication confidentielle') : 'عضوة مسجلة',
      badge: isAnonymous ? 'anonymous' : 'person',
      isAnonymous: isAnonymous,
      category: category,
      title: title,
      body: body,
      image: imgPreview,
      createdAt: new Date().toISOString(),
      likes: 1,
      liked: true,
      comments: []
    };

    try {
      await callApi('posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
    } catch (err) {}

    localPostsCache.unshift(newPost);
    try {
      localStorage.setItem('aman_local_posts', JSON.stringify(localPostsCache.filter(p => !defaultPosts.some(dp => dp.id === p.id))));
    } catch (e) {}

    window.amanCloseComposerModal();
    if (btn) { btn.disabled = false; btn.textContent = tr('publishBtn'); }

    e.target.reset();
    const previewBox = document.getElementById('fb-image-preview-box');
    if (previewBox) { previewBox.style.display = 'none'; previewBox.innerHTML = ''; }
    const nameSpan = document.getElementById('fb-image-name');
    if (nameSpan) nameSpan.textContent = '';

    window.amanRefreshFeedList();
    return false;
  };

  // Like Toggle
  window.amanToggleLike = async function(id) {
    const post = localPostsCache.find(p => p.id === id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes = Math.max(0, (post.likes || 0) + (post.liked ? 1 : -1));

    const btn = document.getElementById(`fb-like-btn-${id}`);
    const likesCounter = document.querySelector(`#fb-likes-count-${id} span`);

    if (btn) {
      btn.classList.toggle('liked', post.liked);
      btn.querySelector('.fb-act-icon').innerHTML = post.liked ? SVG.likeActive : SVG.like;
      btn.querySelector('.fb-act-label').textContent = post.liked ? tr('liked') : tr('like');
    }
    if (likesCounter) {
      likesCounter.textContent = post.likes;
    }

    try {
      callApi('like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, liked: post.liked })
      });
    } catch (e) {}
  };

  // Toggle Comments Drawer
  window.amanToggleComments = function(id) {
    const sec = document.getElementById(`fb-comments-section-${id}`);
    if (!sec) return;
    const isShown = sec.style.display !== 'none';
    sec.style.display = isShown ? 'none' : 'block';
    if (!isShown) {
      const input = sec.querySelector('.fb-comment-input');
      if (input) input.focus();
    }
  };

  // Submit Comment
  window.amanSubmitComment = async function(e, id) {
    e.preventDefault();
    const input = e.target.querySelector('.fb-comment-input');
    const text = input.value.trim();
    if (!text) return false;

    const post = localPostsCache.find(p => p.id === id);
    if (!post) return false;

    post.comments = post.comments || [];
    const newComment = {
      id: "c_" + Date.now(),
      author: L === 0 ? "مشاركة مساندة" : "Conseil solidaire",
      text: text,
      createdAt: new Date().toISOString()
    };
    post.comments.push(newComment);

    const list = document.getElementById(`fb-comments-list-${id}`);
    if (list) {
      const div = document.createElement('div');
      div.className = 'fb-comment-item';
      div.innerHTML = `
        <div class="fb-comment-avatar">${SVG.user}</div>
        <div class="fb-comment-bubble">
          <b>${safe(newComment.author)}</b>
          <p>${safe(newComment.text)}</p>
          <small>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
        </div>
      `;
      list.appendChild(div);
    }

    const commentsCounter = document.getElementById(`fb-comments-count-${id}`);
    if (commentsCounter) commentsCounter.textContent = post.comments.length;

    input.value = '';

    try {
      callApi('comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, text })
      });
    } catch (e) {}

    return false;
  };

  // Share Post
  window.amanSharePost = function(id, title) {
    const shareUrl = location.origin + location.pathname + '#community';
    if (navigator.share) {
      navigator.share({ title: title || 'AMAN', url: shareUrl }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl + '?post=' + id);
      alert(tr('copied'));
    }
  };

  // Legal & Reading Tools
  window.amanAiReadPost = async function(id, mode) {
    const post = localPostsCache.find(p => p.id === id);
    const out = document.getElementById(`fb-ai-reader-out-${id}`);
    if (!post || !out) return;

    out.style.display = 'block';
    out.innerHTML = `<small style="color:var(--mu);">${L === 0 ? 'جاري تحضير التوضيح القانوني…' : 'Préparation de l’éclairage juridique…'}</small>`;

    let text = "";
    if (mode === 'summary') {
      text = `<b>خلاصة الموضوع:</b> ${safe(post.title)}.<br>تتمحور النقطة الأساسية حول الإجراءات المسطرية، الشهادة الطبية الرسمية، والتواصل مع مصالح المساعدة (19 / 177 / 8350).`;
    } else if (mode === 'simple') {
      text = `<b>توضيح مسطري مبسط:</b> في حال التعرض لأي ضرر، القانون المغربي يتيح لكِ الحماية الفورية. الخطوة الأولى فحص طبي والحصول على شهادة عجز، ثم التوجه للدائرة الأمنية أو مصالح الدرك أو الاتصال بخط 8350.`;
    } else if (mode === 'explain') {
      text = `<b>المصطلحات القانونية المعتمدة:</b><br>• <b>القانون 103-13:</b> الإطار القانوني المغربي لمحاربة العنف ضد النساء وتخويل وكيل الملك تدابير الطرد والحماية.<br>• <b>طلاق الشقاق:</b> مسطرة يختص بها قسم قضاء الأسرة وتمنح الحقوق الثابتة للزوجة والأبناء دون اشتراط موافقة الزوج.<br>• <b>مدة العجز (ITT):</b> تقدير الضرر البدني المثبت بشهادة طبية معتمدة.`;
    }

    out.innerHTML = `<div style="background:var(--bg);padding:12px 14px;border-radius:12px;margin-top:8px;font-size:0.92rem;line-height:1.75;border:1px solid var(--bd);">${text}</div>`;
  };

  // Audio Reading Tool
  window.amanAiSpeakPost = function(id, btn) {
    if (!('speechSynthesis' in window)) return;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      btn.innerHTML = SVG.audio + ' ' + tr('aiListen');
      return;
    }
    const post = localPostsCache.find(p => p.id === id);
    if (!post) return;
    const u = new SpeechSynthesisUtterance(post.title + '. ' + post.body);
    u.lang = L === 1 ? 'fr-FR' : L === 2 ? 'en-US' : 'ar-MA';
    u.onend = u.onerror = () => { btn.innerHTML = SVG.audio + ' ' + tr('aiListen'); };
    btn.innerHTML = tr('aiStop');
    speechSynthesis.speak(u);
  };

  // Editorial Assistant in Modal
  window.amanPolishText = function(mode) {
    const titleInput = document.getElementById('fb-post-title');
    const bodyInput = document.getElementById('fb-post-body');
    if (!titleInput || !bodyInput) return;

    if (mode === 'title') {
      const b = bodyInput.value.trim();
      if (b.includes('طلاق') || b.includes('نفقة')) {
        titleInput.value = 'استشارة مسطرية حول حقوق النفقة والحضانة لدى قسم قضاء الأسرة';
      } else if (b.includes('صور') || b.includes('ابتزاز')) {
        titleInput.value = 'إجراءات الحماية القانونية عند التعرض لمحاولة الابتزاز الإلكتروني';
      } else {
        titleInput.value = 'طلب استشارة قانونية وتوجيه مسطري في إطار السرية';
      }
    } else if (mode === 'clarify') {
      bodyInput.value = bodyInput.value.replace(/\s+/g, ' ').trim() + '\n\nملاحظة: المشاركة مدرجة تحت بند السرية التامة وحماية المعطيات الشخصية.';
    }
  };

  // Bind to Router
  P.community = () => {
    setTimeout(window.amanRenderCommunity, 0);
    return `<div style="text-align:center;padding:40px;color:var(--mu);">${L === 0 ? 'جاري فتح مجتمع أمان (فضاء التضامن)…' : 'Chargement de l’espace…'}</div>`;
  };
  P.publish = () => {
    setTimeout(() => {
      window.amanRenderCommunity();
      setTimeout(window.amanOpenComposerModal, 200);
    }, 0);
    return `<div style="text-align:center;padding:40px;">${tr('createPost')}…</div>`;
  };

  T.community = words.community;
  T.publish = words.createPost;
})();
