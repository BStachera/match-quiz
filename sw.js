const V = 'match-quiz-v1';
const ASSETS = [
  './',
  './index.html',
  './qrcode.min.js',
  './favicon.png',
  './icon.png',
  './site.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).catch(() => caches.match('./')))
  );
});
