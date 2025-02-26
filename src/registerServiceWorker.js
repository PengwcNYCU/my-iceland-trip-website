// src/registerServiceWorker.js
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      
      // 註冊服務工作者
      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // 檢查更新
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // 在這裡，有新版本的服務工作者可用
                  console.log('New content is available and will be used when all tabs for this page are closed.');
                  
                  // 可選：通知用戶有更新
                  if (window.confirm('應用有新版本可用。重新加載以更新？')) {
                    window.location.reload();
                  }
                } else {
                  // 在這裡，所有內容已成功預先緩存
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
      
      // 檢查是否支持後台同步
      if ('SyncManager' in window) {
        navigator.serviceWorker.ready
          .then(registration => {
            // 註冊後台同步任務
            registration.sync.register('sync-data')
              .catch(err => console.log('Background sync registration failed:', err));
          });
      }
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

// 檢查網絡連接狀態
export function checkNetworkStatus() {
  const updateNetworkStatus = () => {
    const isOnline = navigator.onLine;
    // 派發事件
    window.dispatchEvent(new CustomEvent('network-status-change', { detail: { isOnline } }));
    
    if (isOnline) {
      console.log('🌐 連接到網絡');
    } else {
      console.log('🔌 離線模式');
    }
  };
  
  // 初始檢查
  updateNetworkStatus();
  
  // 監聽在線/離線狀態變化
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  
  return () => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  };
}