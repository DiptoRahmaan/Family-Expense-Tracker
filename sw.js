const CACHE_NAME = 'ledger-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/new.html',
  '/expenses.html',
  '/reports.html',
  '/profile.html',
  '/admin.html',
  '/nav.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
