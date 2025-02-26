// src/utils/rssFetcher.js
import { saveRoadAlerts, getRoadAlerts, isDataStale } from './offlineStorage';

// 冰島道路與安全相關的 RSS 源
const RSS_URLS = {
  ROAD_CONDITIONS: 'https://www.road.is/feeds/umferd', // 道路狀況和交通(需替換為真實可用的RSS feed)
  SAFETRAVEL: 'https://safetravel.is/feeds/alerts' // 安全旅行警報(需替換為真實可用的RSS feed)
};

/**
 * 解析 XML 格式的 RSS 訂閱
 * @param {string} text - XML 文本
 * @returns {Object} - 解析後的數據
 */
const parseRSS = (text) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    
    const items = xmlDoc.querySelectorAll('item');
    const result = [];
    
    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const guid = item.querySelector('guid')?.textContent || '';
      
      // 提取特定的道路情報
      const roadInfo = parseRoadInfo(title, description);
      
      result.push({
        id: guid || link || Date.now().toString(),
        title,
        description,
        pubDate: new Date(pubDate),
        link,
        ...roadInfo
      });
    });
    
    return result;
  } catch (error) {
    console.error('解析 RSS 失敗:', error);
    return [];
  }
};

/**
 * 從標題和描述中提取道路情報
 * @param {string} title - 警報標題
 * @param {string} description - 警報描述
 * @returns {Object} - 提取的道路情報
 */
const parseRoadInfo = (title, description) => {
  // 這個函數的實現取決於 RSS 源的具體格式
  // 下面是一個示例實現，可能需要根據實際 RSS 源調整
  
  // 道路標識符的模式 (例如："Route 1", "F-35", 等)
  const roadPattern = /(?:Route|Road|Highway|F-)\s*\d+/gi;
  
  // 狀態模式 (例如：開放，關閉，部分開放等)
  const statusPattern = /(?:open|closed|partially open|caution|warning|alert)/gi;

  // 搜索標題和描述以提取道路信息
  const roadMatches = (title + ' ' + description).match(roadPattern) || [];
  const statusMatches = (title + ' ' + description).match(statusPattern) || [];
  
  const road = roadMatches.length > 0 ? roadMatches[0] : '';
  const status = statusMatches.length > 0 ? statusMatches[0].toLowerCase() : '';
  
  // 將狀態標準化
  let normalizedStatus = 'unknown';
  if (status.includes('open') && !status.includes('partially')) {
    normalizedStatus = 'open';
  } else if (status.includes('closed')) {
    normalizedStatus = 'closed';
  } else if (status.includes('partially')) {
    normalizedStatus = 'partial';
  } else if (status.includes('caution') || status.includes('warning') || status.includes('alert')) {
    normalizedStatus = 'caution';
  }
  
  return {
    road,
    status: normalizedStatus,
    statusOriginal: status
  };
};

/**
 * 獲取道路警報
 * @param {boolean} forceRefresh - 是否強制刷新
 * @returns {Promise<Array>} - 道路警報列表
 */
export const fetchRoadAlerts = async (forceRefresh = false) => {
  try {
    // 如果不是強制刷新，且數據不過期，則使用本地存儲的數據
    if (!forceRefresh && !isDataStale(6)) { // 6小時有效期
      const cachedAlerts = getRoadAlerts();
      if (cachedAlerts && cachedAlerts.length > 0) {
        console.log('使用緩存的道路警報數據');
        return cachedAlerts;
      }
    }
    
    // 如果沒有可用的緩存或需要刷新，則獲取新數據
    console.log('獲取最新道路警報');
    
    // 嘗試從所有 RSS 源獲取數據
    const responses = await Promise.allSettled([
      fetch(RSS_URLS.ROAD_CONDITIONS).then(res => res.text()),
      fetch(RSS_URLS.SAFETRAVEL).then(res => res.text())
    ]);
    
    let allAlerts = [];
    
    // 處理成功的響應
    responses.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const source = Object.keys(RSS_URLS)[index];
        const alerts = parseRSS(result.value);
        
        // 添加來源標識
        alerts.forEach(alert => {
          alert.source = source;
        });
        
        allAlerts = [...allAlerts, ...alerts];
      }
    });
    
    // 按發布日期排序 (最新的優先)
    allAlerts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    
    // 過濾掉重複項
    const uniqueAlerts = allAlerts.filter((alert, index, self) => 
      index === self.findIndex(a => a.id === alert.id)
    );
    
    // 保存到本地存儲
    if (uniqueAlerts.length > 0) {
      saveRoadAlerts(uniqueAlerts);
    }
    
    return uniqueAlerts;
  } catch (error) {
    console.error('獲取道路警報失敗:', error);
    
    // 如果發生錯誤，嘗試使用本地存儲的數據
    const cachedAlerts = getRoadAlerts();
    return cachedAlerts || [];
  }
};

/**
 * 獲取特定道路的警報
 * @param {string} roadId - 道路標識符，如 "Route 1"
 * @returns {Promise<Array>} - 該道路的警報列表
 */
export const fetchAlertsForRoad = async (roadId) => {
  try {
    const allAlerts = await fetchRoadAlerts();
    return allAlerts.filter(alert => 
      alert.road.toLowerCase().includes(roadId.toLowerCase())
    );
  } catch (error) {
    console.error(`獲取道路 ${roadId} 的警報失敗:`, error);
    return [];
  }
};

/**
 * 將警報嚴重性轉換為UI顯示格式
 * @param {string} status - 警報狀態
 * @returns {Object} - UI顯示屬性
 */
export const getAlertSeverityUI = (status) => {
  switch (status) {
    case 'closed':
      return {
        color: 'red',
        icon: 'alert-circle',
        label: '關閉'
      };
    case 'partial':
      return {
        color: 'orange',
        icon: 'alert-triangle',
        label: '部分開放'
      };
    case 'caution':
      return {
        color: 'yellow',
        icon: 'alert-triangle',
        label: '注意'
      };
    case 'open':
      return {
        color: 'green',
        icon: 'check-circle',
        label: '開放'
      };
    default:
      return {
        color: 'gray',
        icon: 'help-circle',
        label: '未知'
      };
  }
};