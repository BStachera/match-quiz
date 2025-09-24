// sw.js — network-first dla dokumentów i skryptów, cache-first dla assetów
const CACHE_STATIC = 'mq-static-v4';

// Precache tylko twarde assety (ikony itp.)
const STATIC_ASSETS = [
  './favicon.png',
  './icon.png',
  './qrcode.min.js',
  './site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_STATIC);
      await cache.addAll(STATIC_ASSETS);
    } catch (e) {
      // ignore
    } finally {
      self.skipWaiting();
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map(k => (k !== CACHE_STATIC ? caches.delete(k) : Promise.resolve()))
    );
    await self.clients.claim();
  })());
});

// Strategia: dokumenty/skrypty/style — network-first (bez odkładania do cache)
//            obrazy/fonty — cache-first
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const dest = req.destination; // 'document' | 'script' | 'style' | 'image' | 'font' | ...
  if (dest === 'document' || dest === 'script' || dest === 'style') {
    event.respondWith(networkFirst(req));
  } else if (dest === 'image' || dest === 'font') {
    event.respondWith(cacheFirst(req));
  } else {
    // domyślnie network-first, żeby nie blokować aktualizacji innych zasobów
    event.respondWith(networkFirst(req));
  }
});

async function networkFirst(req) {
  try {
    // omijamy cache przeglądarki
    const fresh = await fetch(req, { cache: 'no-store' });
    return fresh;
  } catch (err) {
    // fallback: co jest w cache (np. offline)
    const cached = await caches.match(req);
    if (cached) return cached;

    // awaryjnie spróbuj index.html z cache (gdy nawigacja offline)
    if (req.mode === 'navigate') {
      const indexCached = await caches.match('./');
      if (indexCached) return indexCached;
    }
    throw err;
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const resp = await fetch(req);
    const cache = await caches.open(CACHE_STATIC);
    cache.put(req, resp.clone());
    return resp;
  } catch (e) {
    // brak offline assetu – zwróć błąd jak jest
    throw e;
  }
}
