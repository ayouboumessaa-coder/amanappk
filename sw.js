// AMAN service worker: makes the site installable, speeds up repeat visits and keeps the app shell usable offline.
const CACHE = "aman-v26";
const SHELL = ["/", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png", "/logo.png", "/mark.png", "/apple-touch-icon.png", "/app.css", "/content.js", "/app-core.js", "/app-ai.js", "/app-speech.js", "/app-extra.js", "/app-voice.js", "/search.js", "/search.css", "/community.js", "/community.css", "/protect.js", "/protect.css", "/select.js", "/select.css"];
const NETWORK_TIMEOUT = 4000;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

const isImage = url => /\.(png|jpe?g|webp|svg|ico)$/i.test(url.pathname);

function put(key, res) {
  if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)).catch(() => {}); }
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Never cache API calls (live alerts, AI, directory) or third-party requests
  if (url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  const isAppPage = req.mode === "navigate" && (url.pathname === "/" || url.pathname === "/index.html");
  const key = isAppPage ? "/" : req;

  // Images: cache first, refresh in the background.
  if (isImage(url)) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => put(req, res));
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    }));
    return;
  }

  // Pages, scripts and styles: network first so users get the latest version,
  // but fall back to the cached copy if the network is slow or offline.
  e.respondWith(new Promise(resolve => {
    let done = false;
    const fallback = () => caches.match(key).then(r => r || (isAppPage ? caches.match("/") : undefined));
    const timer = setTimeout(() => fallback().then(r => { if (r && !done) { done = true; resolve(r); } }), NETWORK_TIMEOUT);
    fetch(req).then(res => {
      put(key, res);
      clearTimeout(timer);
      if (!done) { done = true; resolve(res); }
    }).catch(() => {
      clearTimeout(timer);
      fallback().then(r => { if (!done) { done = true; resolve(r || Response.error()); } });
    });
  }));
});
