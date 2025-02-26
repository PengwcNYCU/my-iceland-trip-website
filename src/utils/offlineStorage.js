// src/utils/offlineStorage.js
/**
 * 離線存儲工具，使用 localStorage 管理離線數據
 */

const KEYS = {
  WEATHER: 'iceland_weather_data',
  ROAD_ALERTS: 'iceland_road_alerts',
  NORTHERN_LIGHTS: 'iceland_northern_lights',
  LAST_UPDATED: 'iceland_data_last_updated'
};

/**
 * 保存天氣數據到本地存儲
 * @param {Object} data - 天氣數據
 * @returns {boolean} - 操作是否成功
 */
export const saveWeatherData = (data) => {
  try {
    localStorage.setItem(KEYS.WEATHER, JSON.stringify(data));
    updateLastUpdated();
    return true;
  } catch (error) {
    console.error('保存天氣數據失敗:', error);
    return false;
  }
};

/**
 * 保存道路警報到本地存儲
 * @param {Array} alerts - 道路警報數據
 * @returns {boolean} - 操作是否成功
 */
export const saveRoadAlerts = (alerts) => {
  try {
    localStorage.setItem(KEYS.ROAD_ALERTS, JSON.stringify(alerts));
    updateLastUpdated();
    return true;
  } catch (error) {
    console.error('保存道路警報失敗:', error);
    return false;
  }
};

/**
 * 保存北極光預報到本地存儲
 * @param {Object} data - 北極光預報數據
 * @returns {boolean} - 操作是否成功
 */
export const saveNorthernLightsData = (data) => {
  try {
    localStorage.setItem(KEYS.NORTHERN_LIGHTS, JSON.stringify(data));
    updateLastUpdated();
    return true;
  } catch (error) {
    console.error('保存北極光預報失敗:', error);
    return false;
  }
};

/**
 * 獲取本地存儲的天氣數據
 * @returns {Object|null} - 天氣數據或 null
 */
export const getWeatherData = () => {
  try {
    const data = localStorage.getItem(KEYS.WEATHER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('獲取天氣數據失敗:', error);
    return null;
  }
};

/**
 * 獲取本地存儲的道路警報
 * @returns {Array|null} - 道路警報數據或 null
 */
export const getRoadAlerts = () => {
  try {
    const data = localStorage.getItem(KEYS.ROAD_ALERTS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('獲取道路警報失敗:', error);
    return null;
  }
};

/**
 * 獲取本地存儲的北極光預報
 * @returns {Object|null} - 北極光預報數據或 null
 */
export const getNorthernLightsData = () => {
  try {
    const data = localStorage.getItem(KEYS.NORTHERN_LIGHTS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('獲取北極光預報失敗:', error);
    return null;
  }
};

/**
 * 更新數據最後更新時間
 */
const updateLastUpdated = () => {
  try {
    localStorage.setItem(KEYS.LAST_UPDATED, new Date().toISOString());
  } catch (error) {
    console.error('更新時間戳失敗:', error);
  }
};

/**
 * 獲取數據最後更新時間
 * @returns {Date|null} - 最後更新時間或 null
 */
export const getLastUpdated = () => {
  try {
    const timestamp = localStorage.getItem(KEYS.LAST_UPDATED);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error('獲取時間戳失敗:', error);
    return null;
  }
};

/**
 * 檢查數據是否需要更新 (超過指定時間)
 * @param {number} hours - 數據有效時間（小時）
 * @returns {boolean} - 是否需要更新
 */
export const isDataStale = (hours = 3) => {
  try {
    const lastUpdated = getLastUpdated();
    if (!lastUpdated) return true;
    
    const now = new Date();
    const diffMs = now - lastUpdated;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return diffHours > hours;
  } catch (error) {
    console.error('檢查數據是否過期失敗:', error);
    return true; // 發生錯誤時默認需要更新
  }
};

/**
 * 清除所有本地存儲的數據
 */
export const clearAllData = () => {
  try {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('清除數據失敗:', error);
    return false;
  }
};