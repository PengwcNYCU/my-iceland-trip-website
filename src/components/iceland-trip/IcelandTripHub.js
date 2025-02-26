// src/components/iceland-trip/IcelandTripHub.js
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sun, Sunset, Clock, AlertCircle, Menu, X, CloudSnow, 
  Thermometer, Wind, Droplets, Compass, Camera, Info, Moon, FileText, 
  ChevronDown, ChevronRight, Image } from 'lucide-react';

import { ThemeProvider, useTheme } from './themeContext';
import { daysData } from './itineraryData';
import MapComponent, { FallbackMapComponent } from './MapComponent';
import EnhancedWeatherWidget from './EnhancedWeatherWidget'; 
import LiveInfo from './liveInfo';
import PhotoSpots from './photoSpots';

// 主要應用組件
const IcelandTripContent = () => {
    const { darkMode, toggleDarkMode, theme } = useTheme();
    const [selectedDay, setSelectedDay] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [expandedActivity, setExpandedActivity] = useState(null);
    const [activeSection, setActiveSection] = useState('itinerary');
  
  // 計算當前選擇日期的所有地點座標
  const selectedDayLocations =
    daysData[selectedDay - 1]?.activities.filter(activity => activity.coordinates).map(activity => activity.coordinates) || [];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleActivityExpansion = (index) => {
    if (expandedActivity === index) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(index);
    }
  };

  // 找到當前選擇的標記相關的活動
  const getActivityForLocation = (location) => {
    return daysData[selectedDay - 1]?.activities.find(activity => 
      activity.coordinates && 
      activity.coordinates.lat === location.lat && 
      activity.coordinates.lng === location.lng
    );
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
      {/* Header with mobile menu */}
      <header className={`sticky top-0 z-50 ${theme.headerBg} backdrop-blur-md shadow-lg`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className={`h-6 w-6 ${theme.highlight}`} />
            <h1 className="text-xl font-bold">冰島旅遊指南</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setActiveSection('itinerary')} 
              className={`flex items-center space-x-1 ${activeSection === 'itinerary' ? theme.text : `${theme.secondaryText} hover:${theme.text}`}`}>
              <Calendar className="h-4 w-4" />
              <span>行程</span>
            </button>
            <button 
              onClick={() => setActiveSection('liveInfo')} 
              className={`flex items-center space-x-1 ${activeSection === 'liveInfo' ? theme.text : `${theme.secondaryText} hover:${theme.text}`}`}>
              <Info className="h-4 w-4" />
              <span>即時資訊</span>
            </button>
            <button 
              onClick={() => setActiveSection('photoSpots')} 
              className={`flex items-center space-x-1 ${activeSection === 'photoSpots' ? theme.text : `${theme.secondaryText} hover:${theme.text}`}`}>
              <Camera className="h-4 w-4" />
              <span>攝影景點</span>
            </button>
            <button 
              onClick={toggleDarkMode} 
              className={`ml-4 p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-800' : 'bg-blue-900 text-white'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-800' : 'bg-blue-900 text-white'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={toggleMenu} className="text-current focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-blue-800 bg-opacity-95' : 'bg-white'} backdrop-blur-md`}>
            <div className="container mx-auto px-4 py-2 space-y-3">
              <button 
                onClick={() => { setActiveSection('itinerary'); toggleMenu(); }} 
                className="flex items-center space-x-2 w-full py-2">
                <Calendar className="h-5 w-5" />
                <span>行程</span>
              </button>
              <button 
                onClick={() => { setActiveSection('liveInfo'); toggleMenu(); }} 
                className="flex items-center space-x-2 w-full py-2">
                <Info className="h-5 w-5" />
                <span>即時資訊</span>
              </button>
              <button 
                onClick={() => { setActiveSection('photoSpots'); toggleMenu(); }} 
                className="flex items-center space-x-2 w-full py-2">
                <Camera className="h-5 w-5" />
                <span>攝影景點</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-6 mb-20">
        {/* 強化版天氣小工具 - 替換原有的WeatherWidget */}
        <EnhancedWeatherWidget theme={theme} />
        
        {/* 根據活動部分顯示相應內容 */}
        {activeSection === 'itinerary' && (
          <>
            {/* Date selector */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {daysData.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index + 1)}
                    className={`px-4 py-3 rounded-lg flex-shrink-0 transition-all transform ${
                      selectedDay === index + 1
                        ? `${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white shadow-lg scale-105`
                        : `${darkMode ? 'bg-white bg-opacity-10 hover:bg-opacity-20' : 'bg-white hover:bg-blue-50'}`
                    }`}
                  >
                    <div className="text-sm font-medium">{day.date}</div>
                    <div className="text-xs truncate max-w-32">{day.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current day info */}
            <div className={`mb-6 ${theme.cardBg} rounded-xl p-4 ${theme.cardBorder}`}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className={`w-5 h-5 ${theme.highlight}`} />
                <h3 className="text-xl font-semibold">
                  {daysData[selectedDay - 1]?.title}
                </h3>
              </div>
              <div className={`mt-2 flex items-center gap-4 text-sm ${theme.secondaryText}`}>
                <div className="flex items-center gap-1">
                  <Sun className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                  <span>日出: {daysData[selectedDay - 1]?.sunrise}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sunset className={`w-4 h-4 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
                  <span>日落: {daysData[selectedDay - 1]?.sunset}</span>
                </div>
              </div>
            </div>

            {/* Map section */}
            <div className="mb-6 overflow-hidden rounded-xl shadow-lg map-section">
              {selectedDayLocations.length > 0 ? (
                <div className="relative">
                  <div className={`absolute top-0 left-0 right-0 z-10 ${darkMode ? 'bg-gradient-to-b from-blue-900 to-transparent' : 'bg-gradient-to-b from-white to-transparent'} h-8 opacity-70`}></div>
                  {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
                    <MapComponent 
                      locations={selectedDayLocations} 
                      selectedMarker={selectedMarker}
                      setSelectedMarker={setSelectedMarker}
                      darkMode={darkMode}
                      theme={theme}
                      getActivityForLocation={getActivityForLocation}
                    />
                  ) : (
                    <FallbackMapComponent 
                      locations={selectedDayLocations}
                      days={daysData}
                      selectedDay={selectedDay}
                      darkMode={darkMode}
                      theme={theme}
                    />
                  )}
                  <div className={`absolute bottom-0 left-0 right-0 z-10 ${darkMode ? 'bg-gradient-to-t from-blue-900 to-transparent' : 'bg-gradient-to-t from-white to-transparent'} h-8 opacity-70`}></div>
                </div>
              ) : (
                <div className={`${darkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-50'} h-64 flex items-center justify-center`}>
                  <p>此日期無地圖標記點</p>
                </div>
              )}
            </div>

            {/* Activities - 直接顯示詳情，不再需要點擊 */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold flex items-center gap-2 mb-4`}>
                <FileText className={`h-5 w-5 ${theme.highlight}`} />
                <span>當日行程</span>
              </h3>
              
              {daysData[selectedDay - 1]?.activities.map((activity, index) => (
                <div key={index} className={`${theme.cardBg} rounded-xl p-4 ${theme.cardBorder}`}>
                  <div>
                    {/* 活動標題區 - 可點擊展開/收合 */}
                    <div 
                      className="flex items-start gap-3 cursor-pointer"
                      onClick={() => toggleActivityExpansion(index)}
                    >
                      <MapPin className={`w-5 h-5 ${theme.highlight} mt-1 flex-shrink-0`} />
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg">
                            {activity.time && `${activity.time} - `}
                            {activity.location || activity.type}
                          </h3>
                          <div>
                            {expandedActivity === index ? 
                              <ChevronDown className="w-5 h-5" /> : 
                              <ChevronRight className="w-5 h-5" />
                            }
                          </div>
                        </div>
                        
                        {/* 基本資訊始終顯示 */}
                        {activity.transport && (
                          <p className={`${theme.secondaryText} text-sm mt-1 flex items-center`}>
                            <Clock className={`w-4 h-4 inline mr-2 ${theme.highlight}`} />
                            {activity.transport}
                          </p>
                        )}
                        {activity.duration && (
                          <p className={`${theme.secondaryText} text-sm`}>
                            建議停留：{activity.duration}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* 展開後顯示的詳細資訊 */}
                    {expandedActivity === index && (
                      <div className="mt-4 pl-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activity.image && (
                            <div className="rounded-lg overflow-hidden h-48 bg-gray-200">
                              <img 
                                src={activity.image} 
                                alt={activity.location || activity.type} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div>
                            {activity.description && (
                              <p className="mb-3">{activity.description}</p>
                            )}
                            
                            {Array.isArray(activity.details) ? (
                              <div>
                                <h4 className={`text-sm font-medium ${theme.highlight} mb-1`}>詳細資訊</h4>
                                <ul className={`list-disc list-inside space-y-1 text-sm ${theme.secondaryText}`}>
                                  {activity.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : activity.details ? (
                              <div>
                                <h4 className={`text-sm font-medium ${theme.highlight} mb-1`}>詳細資訊</h4>
                                <p className={`text-sm ${theme.secondaryText}`}>{activity.details}</p>
                              </div>
                            ) : null}
                            
                            {activity.coordinates && (
                              <button 
                                className={`mt-3 px-4 py-2 ${theme.button} text-white rounded flex items-center gap-2 text-sm`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMarker(activity.coordinates);
                                  // 滾動到地圖
                                  document.querySelector('.map-section')?.scrollIntoView({behavior: 'smooth'});
                                }}
                              >
                                <MapPin className="w-4 h-4" />
                                <span>在地圖中顯示</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Live Information Section */}
        {activeSection === 'liveInfo' && (
          <LiveInfo theme={theme} />
        )}
        
        {/* Photography Spots Section */}
        {activeSection === 'photoSpots' && (
          <PhotoSpots 
            theme={theme} 
            setSelectedDay={setSelectedDay} 
            setActiveSection={setActiveSection} 
            setSelectedMarker={setSelectedMarker}
            days={daysData}
          />
        )}
        
        {/* Notice section */}
        <div className={`mt-8 ${darkMode ? 'bg-amber-500 bg-opacity-10' : 'bg-amber-50'} backdrop-blur-md rounded-xl p-4 ${darkMode ? 'border border-amber-300 border-opacity-30' : 'border border-amber-200'}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
            <h3 className="text-lg font-semibold">注意事項</h3>
          </div>
          <ul className={`space-y-2 text-sm ${darkMode ? 'text-blue-50' : 'text-gray-700'}`}>
            <li className="flex items-start gap-2">
              <span className={darkMode ? 'text-amber-400' : 'text-amber-500'}>•</span>
              <span>冬季冰島天氣多變，請務必關注天氣預報及路況，並預留充裕的交通時間。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={darkMode ? 'text-amber-400' : 'text-amber-500'}>•</span>
              <span>景點停留時間為參考建議，您可依照個人興趣及行程彈性調整。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={darkMode ? 'text-amber-400' : 'text-amber-500'}>•</span>
              <span>冰島自然環境脆弱，請遵守環保原則，不踐踏植被，不丟棄垃圾。</span>
            </li>
          </ul>
        </div>
      </main>
      
      {/* Bottom navigation for mobile */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-blue-900 bg-opacity-95' : 'bg-white bg-opacity-95'} backdrop-blur-md shadow-lg z-40`}>
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveSection('itinerary')} 
            className={`flex flex-col items-center py-3 px-4 ${activeSection === 'itinerary' ? theme.text : theme.secondaryText}`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">行程</span>
          </button>
          <button 
            onClick={() => setActiveSection('liveInfo')} 
            className={`flex flex-col items-center py-3 px-4 ${activeSection === 'liveInfo' ? theme.text : theme.secondaryText}`}
          >
            <Info className="h-5 w-5" />
            <span className="text-xs mt-1">資訊</span>
          </button>
          <button 
            onClick={() => setActiveSection('photoSpots')} 
            className={`flex flex-col items-center py-3 px-4 ${activeSection === 'photoSpots' ? theme.text : theme.secondaryText}`}
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs mt-1">攝影</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// 主應用包裝器（提供主題）
const IcelandTripHub = () => {
  return (
    <ThemeProvider>
      <IcelandTripContent />
    </ThemeProvider>
  );
};

export default IcelandTripHub;