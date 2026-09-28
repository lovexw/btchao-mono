// ===============================
// Service Worker for btchao.com
// 策略目标：
// - HTML：网络优先（保证更新）
// - CSS / JS / 图片：缓存优先（加速）
// - 第三方资源：永不缓存
// ===============================

const CACHE_NAME = 'btchao-v20240215';

// 不缓存的第三方服务
const EXTERNAL_SERVICES = [
  'static.cloudflareinsights.com',
  'ly.btchao.com',
  'cdn.jsdelivr.net',
  'gravatar.com',
  'www.gravatar.com'
];

// 判断是否第三方资源
function isExternal(url) {
  return EXTERNAL_SERVICES.some(domain => url.includes(domain));
}

// -------------------------------
// install：只缓存静态资源（不缓存 HTML）
// -------------------------------
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});

// -------------------------------
// activate：清理旧缓存并立即接管
// -------------------------------
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      ),
      self.clients.claim()
    ])
  );
});

// -------------------------------
// fetch：按资源类型分策略
// -------------------------------
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // 只处理 http(s)
  if (!url.protocol.startsWith('http')) return;

  // 第三方资源：直连网络，不缓存
  if (isExternal(url.href)) {
    event.respondWith(fetch(request));
    return;
  }

  // HTML：网络优先（关键）
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // CSS / JS / 图片：缓存优先
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, copy);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // 其他请求：网络优先，失败再用缓存
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
