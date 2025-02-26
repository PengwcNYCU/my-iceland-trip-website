// service-worker.js
const CACHE_NAME = 'iceland-trip-cache-v1';
const RUNTIME_CACHE = 'iceland-trip-runtime';

// 需要預緩存的靜態資源
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/api/placeholder/400/300', // 佔位圖片
  '/api/placeholder/500/300',
  '/manifest.json',
  // 可以添加其他靜態資源
];

// 安裝 Service Worker 時緩存靜態資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 啟用 Service Worker 時清理舊緩存
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截網絡請求，優先使用緩存但同時更新緩存
self.addEventListener('fetch', event => {
  // 跳過不允許緩存的請求 (如 Chrome 擴展請求)
  if (!event.request.url.startsWith('http')) return;
  
  // 處理 API 請求特殊情況
  if (event.request.url.includes('/api/')) {
    // 對於 API 請求，使用網絡優先策略
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 對成功響應進行緩存
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // 網絡失敗時使用緩存
          return caches.match(event.request);
        })
    );
    return;
  }

  // 對於其他請求，使用緩存優先策略
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // 即使有緩存，也嘗試更新它
          fetch(event.request)
            .then(response => {
              // 更新緩存
              if (response.status === 200) {
                caches.open(RUNTIME_CACHE)
                  .then(cache => {
                    cache.put(event.request, response);
                  });
              }
            })
            .catch(err => console.log('Cache update failed:', err));
            
          return cachedResponse;
        }

        // 如果沒有緩存，使用網絡並緩存
        return fetch(event.request)
          .then(response => {
            // 確保是有效響應
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆響應以緩存
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// 後台同步處理，處理離線時用戶的操作
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// 執行數據同步
async function syncData() {
  const offlineData = await getOfflineData();
  if (offlineData && offlineData.length) {
    try {
      // 處理離線數據
      // 如果有需要同步到服務器的數據，可以在這裡處理
      console.log('Syncing offline data...');
      
      // 清理已同步的數據
      await clearOfflineData();
    } catch (error) {
      console.error('Sync failed:', error);
      return Promise.reject(error);
    }
  }
  return Promise.resolve();
}

// 獲取離線數據
function getOfflineData() {
  return new Promise(resolve => {
    const data = localStorage.getItem('offlineData');
    resolve(data ? JSON.parse(data) : []);
  });
}

// 清理離線數據
function clearOfflineData() {
  return new Promise(resolve => {
    localStorage.removeItem('offlineData');
    resolve();
  });
}