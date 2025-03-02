// src/components/iceland-trip/liveInfo.js
import React, { useState, useEffect } from 'react';
import { Info, CloudSnow, AlertCircle, ExternalLink, Map, RefreshCw, Wifi, WifiOff, CheckCircle, XCircle, AlertTriangle, HelpCircle, Moon, Star } from 'lucide-react';
import { fetchRoadAlerts, getAlertSeverityUI } from '../../utils/rssFetcher';
import { isDataStale, getLastUpdated } from '../../utils/offlineStorage';

const LiveInfo = ({ theme }) => {
  const [roadAlerts, setRoadAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  // 處理網絡狀態變化
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // 也訂閱自定義事件
    const handleNetworkStatusChange = (event) => {
      setIsOnline(event.detail.isOnline);
    };
    
    window.addEventListener('network-status-change', handleNetworkStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('network-status-change', handleNetworkStatusChange);
    };
  }, []);

  // 加載數據
  useEffect(() => {
    loadRoadAlerts();
    
    // 獲取最後更新時間
    const lastTime = getLastUpdated();
    if (lastTime) {
      setLastUpdated(lastTime);
    }
    
    // 設置定期刷新（只在線時）
    const refreshInterval = setInterval(() => {
      if (navigator.onLine) {
        loadRoadAlerts(false);
      }
    }, 30 * 60 * 1000); // 每30分鐘
    
    return () => clearInterval(refreshInterval);
  }, []);

  // 加載道路警報
  const loadRoadAlerts = async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 只有在線時才強制刷新
      const shouldForceRefresh = forceRefresh && isOnline;
      const alerts = await fetchRoadAlerts(shouldForceRefresh);
      
      setRoadAlerts(alerts);
      
      // 更新最後更新時間
      const lastTime = getLastUpdated();
      if (lastTime) {
        setLastUpdated(lastTime);
      }
    } catch (error) {
      console.error('加載道路警報失敗:', error);
      setError('無法加載道路警報，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  // 手動刷新數據
  const handleRefresh = () => {
    loadRoadAlerts(true);
  };

  // 格式化最後更新時間
  const formatLastUpdated = (date) => {
    if (!date) return '未知';
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      return '剛剛';
    } else if (diffMins < 60) {
      return `${diffMins} 分鐘前`;
    } else if (diffMins < 24 * 60) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} 小時前`;
    } else {
      const days = Math.floor(diffMins / (60 * 24));
      return `${days} 天前`;
    }
  };
  
  // 根據狀態獲取圖標元件
  const getStatusIcon = (status) => {
    switch(status) {
      case 'closed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'caution':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'open':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // 根據狀態獲取背景色
  const getStatusBackground = (status, isDarkMode) => {
    switch(status) {
      case 'closed':
        return isDarkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50';
      case 'partial':
        return isDarkMode ? 'bg-orange-900 bg-opacity-20' : 'bg-orange-50';
      case 'caution':
        return isDarkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50';
      case 'open':
        return isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50';
      default:
        return isDarkMode ? 'bg-gray-800 bg-opacity-20' : 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold flex items-center gap-2`}>
          <Info className={`h-6 w-6 ${theme.highlight}`} />
          <span>冰島即時資訊</span>
        </h2>
        
        {/* 網絡狀態指示器 */}
        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center text-green-500">
              <Wifi className="h-4 w-4 mr-1" />
              <span className="text-xs">在線</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-500">
              <WifiOff className="h-4 w-4 mr-1" />
              <span className="text-xs">離線模式</span>
            </div>
          )}
          
          {/* 刷新按鈕 */}
          <button 
            onClick={handleRefresh}
            disabled={isLoading || !isOnline}
            className={`p-1 rounded ${theme.button} text-white disabled:opacity-50`}
            title="刷新道路警報"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* 最後更新時間 */}
      {lastUpdated && (
        <div className={`text-xs ${theme.secondaryText} -mt-4`}>
          最後更新: {formatLastUpdated(lastUpdated)}
          {isDataStale() && !isLoading && (
            <span className="ml-1 text-orange-500">（數據可能已過期）</span>
          )}
        </div>
      )}
      
      {/* 極光資訊卡片 - 新增 */}
      <div className={`${theme.cardBg} rounded-xl p-5 ${theme.cardBorder} border-purple-300 ${theme.darkMode ? 'border-opacity-30' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`${theme.darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
            <Moon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold">北極光預測</h3>
        </div>
        
        <p className={`${theme.secondaryText} mb-4`}>
          冰島是觀測北極光的絕佳地點，特別是在9月至4月的黑夜期間。可以透過以下資源查看即時和預測的極光活動。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://en.vedur.is/weather/forecasts/aurora/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-4 rounded-lg ${theme.darkMode ? 'bg-purple-900 bg-opacity-20 hover:bg-opacity-30' : 'bg-purple-50 hover:bg-purple-100'} transition flex items-start gap-3`}
          >
            <div className={`${theme.darkMode ? 'text-purple-300' : 'text-purple-600'} mt-1`}>
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium mb-1">冰島氣象局極光預測</div>
              <div className={`text-sm ${theme.secondaryText}`}>官方提供冰島地區的極光活動預測和雲層覆蓋情況</div>
              <div className="flex items-center text-xs mt-2">
                <span className={theme.highlight}>查看預測</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
            </div>
          </a>
          
          <a 
            href="https://www.spaceweatherlive.com/en/auroral-activity/aurora-forecast.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-4 rounded-lg ${theme.darkMode ? 'bg-purple-900 bg-opacity-20 hover:bg-opacity-30' : 'bg-purple-50 hover:bg-purple-100'} transition flex items-start gap-3`}
          >
            <div className={`${theme.darkMode ? 'text-purple-300' : 'text-purple-600'} mt-1`}>
              <Star className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium mb-1">Space Weather Live</div>
              <div className={`text-sm ${theme.secondaryText}`}>提供全球極光預測和太陽活動即時資訊</div>
              <div className="flex items-center text-xs mt-2">
                <span className={theme.highlight}>查看預測</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
      
      {/* 道路警報部分 */}
      <div className={`${theme.cardBg} rounded-xl p-5 ${theme.cardBorder}`}>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className={`w-5 h-5 ${theme.darkMode ? 'text-red-400' : 'text-red-500'}`} />
          <h3 className="text-lg font-semibold">道路警報</h3>
        </div>
        
        {isLoading ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
          </div>
        ) : error ? (
          <div className={`p-4 rounded-lg ${theme.darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'}`}>
            <p className={theme.darkMode ? 'text-red-300' : 'text-red-600'}>{error}</p>
            {!isOnline && (
              <p className="text-sm mt-2">您目前處於離線模式。請連接網絡後重試。</p>
            )}
          </div>
        ) : roadAlerts.length > 0 ? (
          <div className="space-y-3">
            {roadAlerts.slice(0, 5).map((alert, index) => (
              <div 
                key={alert.id || index}
                className={`p-3 rounded-lg ${getStatusBackground(alert.status, theme.darkMode)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <span className="font-medium">{alert.road || alert.title}</span>
                  </div>
                  <div className={`text-xs ${theme.secondaryText}`}>
                    {alert.pubDate ? new Date(alert.pubDate).toLocaleDateString() : ''}
                  </div>
                </div>
                
                <p className="text-sm mt-1 line-clamp-2">{alert.description}</p>
                
                {alert.link && (
                  <a 
                    href={alert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-xs flex items-center mt-2 ${theme.highlight}`}
                  >
                    <span>查看詳情</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>
            ))}
            
            {roadAlerts.length > 5 && (
              <p className={`text-sm ${theme.secondaryText} text-center`}>
                還有 {roadAlerts.length - 5} 則警報未顯示
              </p>
            )}
          </div>
        ) : (
          <div className={`p-4 rounded-lg ${theme.darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} text-center`}>
            <p>目前沒有活躍的道路警報</p>
            <p className="text-sm mt-1">安全順利的旅程！</p>
          </div>
        )}
      </div>
      
      {/* Information Resources - Link Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Road Conditions Link Card */}
        <a 
          href="https://www.road.is/travel-info/road-conditions-and-weather/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${theme.cardBg} rounded-xl p-4 ${theme.cardBorder} hover:shadow-lg transition-all transform hover:-translate-y-1`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`${theme.darkMode ? 'bg-blue-800' : 'bg-blue-100'} rounded-full p-2`}>
              <Info className={`h-5 w-5 ${theme.darkMode ? 'text-blue-200' : 'text-blue-600'}`} />
            </div>
            <h3 className="text-lg font-semibold">道路狀況</h3>
          </div>
          
          <p className={`${theme.secondaryText} text-sm mb-3`}>
            查看冰島官方道路管理局發布的道路狀況和封閉信息，確保安全行車。
          </p>
          
          <div className="flex items-center text-sm font-medium mt-auto">
            <span className={theme.highlight}>查看官方信息</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </div>
        </a>
        
        {/* SafeTravel Link Card */}
        <a 
          href="https://safetravel.is/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${theme.cardBg} rounded-xl p-4 ${theme.cardBorder} hover:shadow-lg transition-all transform hover:-translate-y-1`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`${theme.darkMode ? 'bg-green-800' : 'bg-green-100'} rounded-full p-2`}>
              <AlertCircle className={`h-5 w-5 ${theme.darkMode ? 'text-green-200' : 'text-green-600'}`} />
            </div>
            <h3 className="text-lg font-semibold">安全旅行</h3>
          </div>
          
          <p className={`${theme.secondaryText} text-sm mb-3`}>
            查看冰島官方安全旅行網站，獲取最新的安全警示和旅行建議。
          </p>
          
          <div className="flex items-center text-sm font-medium mt-auto">
            <span className={theme.highlight}>訪問安全旅行網站</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </div>
        </a>
      </div>
      
      {/* Safety Tips */}
      <div className={`${theme.cardBg} rounded-xl p-5 ${theme.cardBorder} border-amber-200 ${theme.darkMode ? 'border-opacity-30' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className={`w-5 h-5 ${theme.darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
          <h3 className="text-lg font-semibold">旅行安全提示</h3>
        </div>
        
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-amber-400' : 'text-amber-500'}>•</span>
            <span>冬季冰島天氣多變，請務必時刻關注天氣預報及路況，並預留充裕的交通時間。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-amber-400' : 'text-amber-500'}>•</span>
            <span>緊急電話：112 (全冰島通用)。建議下載冰島112官方應用程式，可在緊急情況下求助。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-amber-400' : 'text-amber-500'}>•</span>
            <span>冬季道路行駛需格外謹慎，F開頭的高地道路在冬季通常會完全關閉。</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LiveInfo;