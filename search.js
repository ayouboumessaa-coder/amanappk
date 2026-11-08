/* Searches public, bundled guidance only; queries are never stored or sent. */
(() => {
  const copy = [
    {title:'البحث في AMAN', hint:'ابحث في المقالات، الحقوق ومعلومات المساعدة', label:'كلمات البحث', empty:'ما لقينا حتى نتيجة. جرّب كلمات أخرى.', start:'اكتب كلمة أو أكثر للبحث في محتوى التطبيق.', count:'نتيجة', close:'إغلاق', open:'البحث', privacy:'البحث كيشمل المحتوى المضمّن فقط، وما كيبحثش فالحسابات أو الرسائل أو المؤسسات المباشرة.', clear:'مسح البحث'},
    {title:'Rechercher dans AMAN', hint:'Articles, droits et informations d’aide', label:'Mots à rechercher', empty:'Aucun résultat. Essayez d’autres mots.', start:'Saisissez un ou plusieurs mots pour commencer.', count:'résultat(s)', close:'Fermer', open:'Rechercher', privacy:'Recherche dans le contenu intégré uniquement, sans comptes, messages ni annuaire en direct.', clear:'Effacer'},
    {title:'Search AMAN', hint:'Find articles, rights and help information', label:'Search words', empty:'No results. Try different words.', start:'Enter one or more words to search the app.', count:'result(s)', close:'Close', open:'Search', privacy:'Search covers bundled content only, excluding accounts, messages and the live directory.', clear:'Clear search'}
  ];
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f\u064b-\u065f\u0670ـ]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').toLocaleLowerCase();
  const icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';
  let returnFocus;
  const dialog = document.createElement('dialog');
  dialog.className = 'aman-search';
  dialog.setAttribute('aria-labelledby','aman-search-title');
  document.body.append(dialog);
  function entries() {
    const records = [];
    for (const page of ['guide','digital','about','safe','academy','install']) {
      const doc = new DOMParser().parseFromString(P[page](), 'text/html');
      doc.querySelectorAll('form,button,input,select,textarea,script,style').forEach(node=>node.remove());
      const cards = [...doc.querySelectorAll('.card,.em,.note')];
      if (!cards.length) cards.push(doc.body);
      cards.forEach(card=>{
        const title = card.querySelector('h2,h3')?.textContent || t(page);
        const text = card.textContent.replace(/\s+/g,' ').trim();
        if(text) records.push({page, title, text, haystack:normalize(title+' '+text)});
      });
    }
    return records;
  }
  function open() {
    if(dialog.open) return;
    const c = copy[L];
    returnFocus = document.activeElement;
    dialog.dir = L === 0 ? 'rtl' : 'ltr';
    dialog.lang = ['ar','fr','en'][L];
    dialog.innerHTML = `<div class="search-top"><h2 id="aman-search-title">${c.title}</h2><button type="button" class="btn d" data-close>${c.close}</button></div><p>${c.hint}</p><label for="aman-search-input">${c.label}</label><div class="search-field"><input id="aman-search-input" type="search" maxlength="160" autocomplete="off" aria-describedby="aman-search-privacy"><button type="button" class="btn d" data-clear>${c.clear}</button></div><p id="aman-search-privacy" class="search-muted">${c.privacy}</p><p role="status" aria-live="polite" id="aman-search-status"></p><div id="aman-search-results"></div>`;
    const input = dialog.querySelector('input');
    const results = dialog.querySelector('#aman-search-results');
    const status = dialog.querySelector('#aman-search-status');
    const index = entries();
    function update() {
      const words = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
      results.replaceChildren();
      if(!words.length){status.textContent=c.start;return;}
      const found = index.filter(item=>words.every(word=>item.haystack.includes(word)));
      status.textContent = found.length ? `${found.length} ${c.count}` : c.empty;
      found.forEach(item=>{
        const link = document.createElement('a');
        link.className='search-result'; link.href='#'+item.page;
        const heading=document.createElement('h3'); heading.textContent=item.title;
        const category=document.createElement('small'); category.textContent=t(item.page);
        const text=document.createElement('p');
        const matchAt=normalize(item.text).indexOf(words[0]);
        const start=Math.max(0,matchAt-65);
        text.textContent=(start?'…':'')+item.text.slice(start,start+240)+(item.text.length>start+240?'…':'');
        link.append(category,heading,text); link.onclick=()=>dialog.close(); results.append(link);
      });
    }
    input.oninput=update;
    dialog.querySelector('[data-close]').onclick=()=>dialog.close();
    dialog.querySelector('[data-clear]').onclick=()=>{input.value='';update();input.focus();};
    update(); dialog.showModal(); input.focus();
  }
  dialog.addEventListener('close',()=>{dialog.replaceChildren();if(returnFocus?.isConnected)returnFocus.focus();});
  function mount() {
    const host=document.getElementById('hd-act');
    if(!host)return;
    let button=document.getElementById('aman-search-open');
    if(!button){button=document.createElement('button');button.id='aman-search-open';button.type='button';button.className='theme-btn';button.innerHTML=icon;button.onclick=open;host.prepend(button);}
    button.title=copy[L].open; button.setAttribute('aria-label',copy[L].open);
  }
  const originalChrome=chrome;
  chrome=function(){originalChrome();mount();};
  mount();
  addEventListener('hashchange',()=>{if(dialog.open)dialog.close();});
})();
