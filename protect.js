// AMAN privacy shield. A website cannot fully block screenshots or screen recording
// (the operating system or another camera can always capture the screen), so this
// script makes capture harder and hides content in the situations a browser can detect.
(()=>{
  const root=document.documentElement;
  const msg=["المحتوى مخفي لحماية الخصوصية","Contenu masqué pour protéger la confidentialité","Content hidden to protect privacy"];
  const lang=()=>{try{return typeof L==="number"?L:0}catch(e){return 0}};
  const shield=document.createElement("div");
  shield.id="aman-shield";shield.setAttribute("aria-hidden","true");
  const setText=()=>{shield.textContent=msg[lang()]||msg[0]};
  const hide=()=>{setText();root.classList.add("aman-hidden")};
  const show=()=>root.classList.remove("aman-hidden");
  const mount=()=>{if(!shield.isConnected)document.body.appendChild(shield)};
  if(document.body)mount();else document.addEventListener("DOMContentLoaded",mount);

  // Hide content when the tab or app goes to the background (app switcher previews, many recorders, screen sharing pickers).
  document.addEventListener("visibilitychange",()=>{document.hidden?hide():show()});
  addEventListener("pagehide",hide);addEventListener("pageshow",show);
  // Hide when the window loses focus (snipping tools, overlays), except while a native file picker or media control is open.
  let picking=false;
  document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest('input[type=file],select,video'))picking=true},true);
  addEventListener("blur",()=>{if(!picking)hide()});
  addEventListener("focus",()=>{picking=false;show()});

  // Print Screen and common capture shortcuts: hide briefly and clear the copied image where the browser allows it.
  const capture=e=>{
    const k=(e.key||"").toLowerCase();
    const prt=k==="printscreen"||e.keyCode===44;
    const mac=e.metaKey&&e.shiftKey&&["3","4","5","s"].includes(k);
    const win=e.metaKey&&e.shiftKey&&k==="s";
    if(!prt&&!mac&&!win)return;
    hide();
    try{navigator.clipboard&&navigator.clipboard.writeText("")}catch(err){}
    setTimeout(show,1500);
  };
  addEventListener("keyup",capture,true);addEventListener("keydown",capture,true);

  // Block screen-sharing from inside this page (e.g. injected scripts asking to record the tab).
  try{
    if(navigator.mediaDevices&&navigator.mediaDevices.getDisplayMedia){
      navigator.mediaDevices.getDisplayMedia=()=>Promise.reject(new DOMException("Screen capture is disabled on AMAN","NotAllowedError"));
    }
  }catch(err){}

  // Community content: no right-click menu, drag, copy or save on posts, comments and photos.
  const guarded=t=>t&&t.closest&&t.closest(".community-post,.community-comment,.community-photo,.community-ai-out");
  const editable=t=>t&&t.closest&&t.closest("input,textarea,[contenteditable=true]");
  ["contextmenu","copy","cut","dragstart"].forEach(ev=>document.addEventListener(ev,e=>{if(guarded(e.target)&&!editable(e.target))e.preventDefault()},true));
  // Printing / "save as PDF" shows a notice instead of the page.
  addEventListener("beforeprint",hide);addEventListener("afterprint",show);
})();
