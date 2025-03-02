// src/components/iceland-trip/EnhancedWeatherWidget.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudSnow, Wind, Droplets, Thermometer, RefreshCw, 
  CloudRain, ArrowDown, ArrowUp, Compass, Gauge, 
  Navigation, Info, AlertTriangle
} from 'lucide-react';

const EnhancedWeatherWidget = ({ theme }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeHourlyPage, setActiveHourlyPage] = useState(0);
  const [activeTab, setActiveTab] = useState('current'); // 'current', 'hourly', 'daily'
  const [lastUpdated, setLastUpdated] = useState(null);
  const [animateRefresh, setAnimateRefresh] = useState(false);
  const [animateTemperature, setAnimateTemperature] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  
  // 用於溫度變化動畫的ref
  const prevTempRef = useRef(null);
  const tempChangeRef = useRef(null);
  
  // 主要冰島旅遊地點
  const travelLocations = [
    { name: "雷克雅維克", lat: 64.1466, lon: -21.9426 },
    { name: "教會山", lat: 64.927, lon: -23.308 },
    { name: "黃金圈", lat: 64.255, lon: -21.130 },
    { name: "藍湖", lat: 63.880, lon: -22.449 },
    { name: "冰河湖", lat: 64.047, lon: -16.181 },
    { name: "維克", lat: 63.4198, lon: -19.0122 },
    { name: "霍芬", lat: 64.2505, lon: -15.2049 },
    { name: "塞里雅蘭瀑布", lat: 63.6149, lon: -19.9907 },
    { name: "斯科加瀑布", lat: 63.5320, lon: -19.5114 },
    { name: "蝙蝠山", lat: 64.2480, lon: -14.9870 }
  ];
  const [selectedLocation, setSelectedLocation] = useState(travelLocations[0]);

  // 監視地點變化，獲取數據
  useEffect(() => {
    fetchWeatherData();
  }, [selectedLocation]);
  
  // 設置溫度動畫效果
  useEffect(() => {
    if (currentWeather && prevTempRef.current !== null) {
      const currentTemp = Math.round(currentWeather.main.temp);
      if (prevTempRef.current !== currentTemp) {
        setAnimateTemperature(true);
        tempChangeRef.current = currentTemp > prevTempRef.current ? 'up' : 'down';
        
        // 動畫結束後重置
        const timer = setTimeout(() => {
          setAnimateTemperature(false);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
    
    if (currentWeather) {
      prevTempRef.current = Math.round(currentWeather.main.temp);
    }
  }, [currentWeather]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setAnimateRefresh(true); // 啟動刷新按鈕動畫
      
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      
      // 使用當前天氣 API (免費可用)
      const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&units=metric&appid=${apiKey}`);
      
      // 使用 5-day/3-hour forecast API (免費可用)
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&units=metric&appid=${apiKey}`);
      
      if (!currentRes.ok) {
        console.error("Current weather API failed:", currentRes.status, currentRes.statusText);
        throw new Error(`Current weather API error: ${currentRes.status}`);
      }
      
      if (!forecastRes.ok) {
        console.error("Forecast API failed:", forecastRes.status, forecastRes.statusText);
        throw new Error(`Forecast API error: ${forecastRes.status}`);
      }
      
      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();
      
      // 處理當前天氣數據
      setCurrentWeather({
        ...currentData,
        main: {
          ...currentData.main,
          visibility: currentData.visibility
        }
      });
      
      // 處理小時預報 (取前 24 小時 / 8 個時間點)
      const hourlyForecast = forecastData.list.slice(0, 8).map(item => ({
        dt: item.dt,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        weather: item.weather,
        pop: item.pop || 0, // 降水概率
        wind_speed: item.wind.speed
      }));
      
      // 處理日預報 (每天取中午的預報作為代表)
      const dailyForecast = [];
      const groupedByDay = {};
      
      // 以日期為鍵分組
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!groupedByDay[date]) {
          groupedByDay[date] = [];
        }
        groupedByDay[date].push(item);
      });
      
      // 每天取中午的預報
      Object.entries(groupedByDay).forEach(([date, items], index) => {
        if (index < 5) { // 最多取 5 天 (API 限制)
          // 尋找最接近中午的預報
          const noon = new Date(date);
          noon.setHours(12, 0, 0, 0);
          const noonTimestamp = noon.getTime() / 1000;
          
          // 找到最接近中午的預報
          const closestToDayItem = items.reduce((prev, curr) => {
            return Math.abs(curr.dt - noonTimestamp) < Math.abs(prev.dt - noonTimestamp) ? curr : prev;
          }, items[0]);
          
          // 計算溫度範圍
          const temps = items.map(item => item.main.temp);
          const maxTemp = Math.max(...temps);
          const minTemp = Math.min(...temps);
          
          // 計算最大降水概率
          const maxPop = Math.max(...items.map(item => item.pop || 0));
          
          dailyForecast.push({
            dt: closestToDayItem.dt,
            temp: {
              day: closestToDayItem.main.temp,
              min: minTemp,
              max: maxTemp
            },
            weather: closestToDayItem.weather,
            pop: maxPop, // 使用當天最大降水概率
            wind_speed: closestToDayItem.wind.speed
          });
        }
      });
      
      setForecast({
        hourly: hourlyForecast,
        daily: dailyForecast
      });
      
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
      setError(`無法獲取天氣數據: ${err.message}`);
    } finally {
      setLoading(false);
      
      // 延遲重置刷新動畫，讓動畫能完整播放
      setTimeout(() => {
        setAnimateRefresh(false);
      }, 800);
    }
  };

  // 輔助函數

  // 取得天氣圖示並添加動畫效果
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  // 根據天氣狀況獲取動畫效果類名
  const getWeatherAnimationClass = (iconCode) => {
    if (!iconCode) return '';
    
    // 下雨
    if (iconCode.includes('09') || iconCode.includes('10')) {
      return 'animate-rain';
    }
    // 下雪
    else if (iconCode.includes('13')) {
      return 'animate-snow';
    }
    // 雷雨
    else if (iconCode.includes('11')) {
      return 'animate-thunder';
    }
    // 霧
    else if (iconCode.includes('50')) {
      return 'animate-mist';
    }
    // 多雲
    else if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return 'animate-cloud';
    }
    // 晴天
    else if (iconCode.includes('01')) {
      return 'animate-sun';
    }
    
    return '';
  };
  
  // 格式化時間 (Unix timestamp)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
  };
  
  // 格式化日期 (Unix timestamp)
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    return days[date.getDay()];
  };
  
  // 取得風向文字
  const getWindDirection = (deg) => {
    const directions = ['北', '東北', '東', '東南', '南', '西南', '西', '西北'];
    return directions[Math.round(deg / 45) % 8];
  };
  
  // 格式化上次更新時間
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    
    return `最後更新: ${lastUpdated.toLocaleTimeString('zh-TW')}`;
  };

  // 渲染當前天氣板塊 - 簡化版，移除了日出日落信息
  const renderCurrentWeather = () => {
    if (!currentWeather) return null;
    
    const weather = currentWeather.weather[0];
    const main = currentWeather.main;
    const wind = currentWeather.wind;
    const isDarkMode = theme.darkMode;
    
    // 天氣圖標動畫類名
    const weatherAnimClass = getWeatherAnimationClass(weather.icon);
    
    // 溫度變化動畫類名
    const tempAnimClass = animateTemperature 
      ? tempChangeRef.current === 'up' 
        ? 'animate-temp-up' 
        : 'animate-temp-down'
      : '';
    
    return (
      <div className="space-y-4">
        {/* 主要天氣顯示 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`relative w-20 h-20 ${weatherAnimClass}`}>
              <img 
                src={getWeatherIcon(weather.icon)} 
                alt={weather.description}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className={`text-3xl font-bold transition-all duration-700 ${tempAnimClass}`}>
                {Math.round(main.temp)}°C
              </div>
              <div className="capitalize">{weather.description}</div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center">
              <ArrowUp className={`h-4 w-4 ${theme.highlight} mr-1`} />
              <span className="mr-2">{Math.round(main.temp_max)}°</span>
              <ArrowDown className={`h-4 w-4 ${theme.highlight} mr-1`} />
              <span>{Math.round(main.temp_min)}°</span>
            </div>
            <div className="text-sm mt-1">體感溫度: {Math.round(main.feels_like)}°C</div>
          </div>
        </div>
        
        {/* 天氣詳情網格 - 簡化版，保留重要的指標 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* 風速 */}
          <div className={`${theme.cardBg} p-3 rounded-lg transform transition hover:scale-105`}>
            <div className="flex items-center mb-1">
              <Wind className={`mr-1 h-4 w-4 ${theme.highlight}`} />
              <div className="text-sm font-medium">風速</div>
            </div>
            <div className="flex justify-between items-center">
              <div>{wind.speed} m/s</div>
              <div className="flex items-center text-sm">
                <Navigation 
                  className={`h-3 w-3 mr-1 ${theme.highlight} animate-wind-direction`} 
                  style={{ 
                    transform: `rotate(${wind.deg}deg)`,
                    animationDuration: `${Math.max(2, 8 - wind.speed)}s` // 風速越大，動畫越快
                  }} 
                />
                <span>{getWindDirection(wind.deg)}</span>
              </div>
            </div>
          </div>
          
          {/* 濕度 */}
          <div className={`${theme.cardBg} p-3 rounded-lg transform transition hover:scale-105`}>
            <div className="flex items-center mb-1">
              <Droplets className={`mr-1 h-4 w-4 ${theme.highlight} animate-bounce-slow`} />
              <div className="text-sm font-medium">濕度</div>
            </div>
            <div className="flex justify-between items-center">
              <div>{main.humidity}%</div>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} transition-all duration-1000`} 
                  style={{ width: `${main.humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* 氣壓 */}
          <div className={`${theme.cardBg} p-3 rounded-lg transform transition hover:scale-105`}>
            <div className="flex items-center mb-1">
              <Gauge className={`mr-1 h-4 w-4 ${theme.highlight} animate-pulse-slow`} />
              <div className="text-sm font-medium">氣壓</div>
            </div>
            <div>{main.pressure} hPa</div>
          </div>
          
          {/* 能見度 */}
          <div className={`${theme.cardBg} p-3 rounded-lg transform transition hover:scale-105`}>
            <div className="flex items-center mb-1">
              <Thermometer className={`mr-1 h-4 w-4 ${theme.highlight}`} />
              <div className="text-sm font-medium">體感溫度</div>
            </div>
            <div>{Math.round(main.feels_like)}°C</div>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染小時預報部分
  const renderHourlyForecast = () => {
    if (!forecast || !forecast.hourly) return null;
    
    const ITEMS_PER_PAGE = 4;
    const totalItems = forecast.hourly.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIdx = activeHourlyPage * ITEMS_PER_PAGE;
    const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, totalItems);
    const currentItems = forecast.hourly.slice(startIdx, endIdx);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">未來預報</h3>
          
          {/* 頁籤控制 (只有多頁時顯示) */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveHourlyPage(prev => Math.max(0, prev - 1))}
                disabled={activeHourlyPage === 0}
                className={`p-1 rounded ${theme.darkMode ? 'text-white' : 'text-gray-600'} ${activeHourlyPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} transition transform active:scale-95`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm">
                {activeHourlyPage + 1}/{totalPages}
              </span>
              <button 
                onClick={() => setActiveHourlyPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={activeHourlyPage === totalPages - 1}
                className={`p-1 rounded ${theme.darkMode ? 'text-white' : 'text-gray-600'} ${activeHourlyPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} transition transform active:scale-95`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {currentItems.map((hour, idx) => {
            const weatherAnimClass = getWeatherAnimationClass(hour.weather[0].icon);
            const precipChance = Math.round(hour.pop * 100);
            
            return (
              <div 
                key={idx} 
                className={`${theme.cardBg} p-2 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-md`}
              >
                <div className="text-sm font-medium">
                  {formatTime(hour.dt)}
                </div>
                <div className={`w-10 h-10 mx-auto ${weatherAnimClass}`}>
                  <img 
                    src={getWeatherIcon(hour.weather[0].icon)} 
                    alt={hour.weather[0].description}
                    className="w-full h-full"
                  />
                </div>
                <div className="text-lg font-bold">{Math.round(hour.temp)}°</div>
                <div 
                  className="flex items-center justify-center text-xs"
                  style={{ opacity: precipChance > 0 ? 1 : 0.5 }}
                >
                  <CloudRain className={`h-3 w-3 mr-1 ${precipChance > 30 ? 'animate-bounce-slow' : ''}`} />
                  <span>{precipChance}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // 渲染每日預報部分
  const renderDailyForecast = () => {
    if (!forecast || !forecast.daily) return null;
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">未來五天預報</h3>
        
        <div className="space-y-2">
          {forecast.daily.map((day, idx) => {
            const weatherAnimClass = getWeatherAnimationClass(day.weather[0].icon);
            const precipChance = Math.round(day.pop * 100);
            
            return (
              <div 
                key={idx} 
                className={`${theme.cardBg} p-3 rounded-lg flex items-center justify-between transform transition duration-300 hover:scale-102 hover:shadow-md`}
              >
                <div className="flex items-center">
                  <div className="w-16">
                    {idx === 0 ? '今天' : formatDay(day.dt)}
                  </div>
                  <div className={`w-10 h-10 ${weatherAnimClass}`}>
                    <img 
                      src={getWeatherIcon(day.weather[0].icon)} 
                      alt={day.weather[0].description}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="ml-1">
                    <div className="text-sm capitalize">{day.weather[0].description}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div 
                    className="flex items-center"
                    style={{ opacity: precipChance > 0 ? 1 : 0.5 }}
                  >
                    <CloudRain className={`h-4 w-4 mr-1 ${precipChance > 30 ? 'animate-bounce-slow' : ''}`} />
                    <span>{precipChance}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ArrowDown className={`h-4 w-4 ${theme.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span>{Math.round(day.temp.min)}°</span>
                    <ArrowUp className={`h-4 w-4 ${theme.darkMode ? 'text-red-400' : 'text-red-600'} ml-1`} />
                    <span>{Math.round(day.temp.max)}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className={`mb-6 ${theme.cardBg} rounded-xl p-4 ${theme.cardBorder} transition-all duration-300`}>
      {/* 標題與地點選擇器 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CloudSnow className={`h-5 w-5 ${theme.highlight} ${loading ? 'animate-bounce-slow' : ''}`} />
          <h2 className="text-lg font-semibold">冰島天氣預報</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 地點選擇器 */}
          <select
            value={JSON.stringify(selectedLocation)}
            onChange={(e) => setSelectedLocation(JSON.parse(e.target.value))}
            className={`text-sm px-2 py-1 rounded ${theme.darkMode ? 'bg-blue-800 bg-opacity-50 text-white border-blue-600' : 'bg-white border-blue-300'} border transition-all duration-300 focus:ring-2 focus:ring-blue-400`}
          >
            {travelLocations.map((loc, idx) => (
              <option key={idx} value={JSON.stringify(loc)}>
                {loc.name}
              </option>
            ))}
          </select>
          
          {/* 刷新按鈕 */}
          <button 
            onClick={fetchWeatherData}
            disabled={loading}
            className={`p-1.5 rounded-full ${theme.darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-400'} text-white transition transform ${animateRefresh ? 'animate-spin' : 'hover:rotate-180'} duration-500`}
            title="刷新天氣數據"
          >
            <RefreshCw className={`h-4 w-4`} />
          </button>
        </div>
      </div>
      
      {/* 最後更新時間 */}
      {lastUpdated && (
        <div className={`text-xs ${theme.secondaryText} -mt-2 mb-3 animate-fade-in`}>
          {formatLastUpdated()}
        </div>
      )}
      
      {/* 標籤導航 */}
      <div className="flex border-b mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
            activeTab === 'current' 
              ? `${theme.darkMode ? 'text-white' : 'text-blue-600'} border-b-2 ${theme.darkMode ? 'border-blue-400' : 'border-blue-600'}` 
              : theme.secondaryText
          }`}
        >
          即時天氣
        </button>
        <button
          onClick={() => setActiveTab('hourly')}
          className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
            activeTab === 'hourly' 
              ? `${theme.darkMode ? 'text-white' : 'text-blue-600'} border-b-2 ${theme.darkMode ? 'border-blue-400' : 'border-blue-600'}` 
              : theme.secondaryText
          }`}
        >
          小時預報
        </button>
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
            activeTab === 'daily' 
              ? `${theme.darkMode ? 'text-white' : 'text-blue-600'} border-b-2 ${theme.darkMode ? 'border-blue-400' : 'border-blue-600'}` 
              : theme.secondaryText
          }`}
        >
          每日預報
        </button>
      </div>
      
      {/* 載入中狀態 */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
          <div className={`animate-spin h-10 w-10 border-4 ${theme.darkMode ? 'border-blue-300' : 'border-blue-600'} rounded-full border-t-transparent`}></div>
          <div className="mt-4">正在載入天氣資料...</div>
        </div>
      ) : error ? (
        <div className="text-center py-6 animate-fade-in">
          <AlertTriangle className={`h-10 w-10 ${theme.darkMode ? 'text-red-400' : 'text-red-600'} mx-auto mb-2 animate-bounce-slow`} />
          <p className={theme.darkMode ? 'text-red-300' : 'text-red-600'}>
            {error}
          </p>
          <button
            onClick={fetchWeatherData}
            className={`mt-4 px-4 py-2 ${theme.button} text-white rounded-lg transition transform hover:scale-105 active:scale-95`}
          >
            重新載入
          </button>
        </div>
      ) : (
        <div className={`animate-tab-transition`}>
          {activeTab === 'current' && renderCurrentWeather()}
          {activeTab === 'hourly' && renderHourlyForecast()}
          {activeTab === 'daily' && renderDailyForecast()}
        </div>
      )}
      
      {/* 資料相關提示 */}
      <div className="mt-4 pt-3 border-t border-gray-200 border-opacity-30">
        <div className={`text-xs ${theme.secondaryText} flex items-center gap-1`}>
          <Info className="h-3 w-3" />
          <span>天氣數據由 OpenWeatherMap 提供，請以現場實際情況為主</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWeatherWidget;