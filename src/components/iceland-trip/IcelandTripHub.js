import React, { useState } from 'react';
import { Calendar, MapPin, Sun, Moon, Menu, X, 
  Compass, Info, RefreshCw } from 'lucide-react';

import { ThemeProvider, useTheme } from './themeContext';
import MapComponent, { FallbackMapComponent } from './MapComponent';
import EnhancedWeatherWidget from './EnhancedWeatherWidget'; 
import LiveInfo from './liveInfo';
import EnhancedItinerary from './EnhancedItinerary.js';
import PenguinPet from './PenguinPet';

// 主要應用組件
const IcelandTripContent = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    theme, 
    isAutoThemeEnabled, 
    enableAutoTheme 
  } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activeSection, setActiveSection] = useState('itinerary');
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 處理主題切換，手動模式
  const handleThemeToggle = () => {
    toggleDarkMode(true);
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
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleThemeToggle} 
                className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-800' : 'bg-blue-900 text-white'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {!isAutoThemeEnabled && (
                <button 
                  onClick={enableAutoTheme} 
                  className={`p-2 rounded-full ${theme.button} text-white`}
                  aria-label="Enable auto theme"
                  title="恢復自動主題模式"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleThemeToggle} 
                className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-800' : 'bg-blue-900 text-white'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              {!isAutoThemeEnabled && (
                <button 
                  onClick={enableAutoTheme} 
                  className={`p-2 rounded-full ${theme.button} text-white`}
                  aria-label="Enable auto theme"
                  title="恢復自動主題模式"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              )}
            </div>
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
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-6 mb-20">
        {/* 根據活動部分顯示相應內容 */}
        {activeSection === 'itinerary' && (
          <EnhancedItinerary 
            theme={theme} 
            setSelectedMarker={setSelectedMarker} 
          />
        )}
        
        {/* Live Information Section - 只在此頁面顯示天氣組件 */}
        {activeSection === 'liveInfo' && (
          <>
            {/* 強化版天氣小工具 - 只在即時資訊頁面顯示 */}
            <EnhancedWeatherWidget theme={theme} />
            <LiveInfo theme={theme} />
          </>
        )}
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
            <span className="text-xs mt-1">即時</span>
          </button>
        </div>
      </nav>
      
      {/* Cute penguin pet */}
      <PenguinPet theme={theme} />
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