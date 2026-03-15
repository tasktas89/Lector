const CACHE_NAME = 'nexus-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Instalación: Guardar en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activación: Limpiar cachés antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Estrategia: Red primero, si falla, Caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
