import React, { createContext, useState, useContext, useEffect } from 'react';
import { daysData } from './itineraryData';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [isAutoThemeEnabled, setIsAutoThemeEnabled] = useState(true);

  // 將時間字串轉換為可比較的數值
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // 切換主題的方法
  const toggleDarkMode = (manual = false) => {
    if (manual) {
      // 如果是手動切換，禁用自動主題
      setIsAutoThemeEnabled(false);
      setDarkMode(prevMode => !prevMode);
    } else {
      // 自動切換
      setDarkMode(prevMode => !prevMode);
    }
  };

  // 自動根據日出日落時間設定主題
  useEffect(() => {
    // 如果自動主題被禁用，不執行自動切換
    if (!isAutoThemeEnabled) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    // 找到當前的行程日期（假設行程從第一天開始）
    const day = daysData[currentDay - 1];
    if (day) {
      const sunrise = timeToMinutes(day.sunrise);
      const sunset = timeToMinutes(day.sunset);

      // 如果當前時間在日出到日落之間，設為亮色模式
      setDarkMode(currentTime < sunrise || currentTime > sunset);
    }
  }, [currentDay, isAutoThemeEnabled]);

  // 重新啟用自動主題
  const enableAutoTheme = () => {
    setIsAutoThemeEnabled(true);
  };

  // 根據暗/亮模式設定主題色
  const theme = {
    darkMode,
    bg: darkMode ? 'bg-gradient-to-b from-blue-900 via-blue-700 to-blue-900' : 'bg-gradient-to-b from-blue-50 via-white to-blue-50',
    text: darkMode ? 'text-white' : 'text-gray-800',
    headerBg: darkMode ? 'bg-blue-900 bg-opacity-90' : 'bg-white bg-opacity-90',
    cardBg: darkMode ? 'bg-white bg-opacity-10 backdrop-blur-md' : 'bg-white shadow-md',
    cardBorder: darkMode ? 'border border-blue-300 border-opacity-30' : 'border border-gray-200',
    highlight: darkMode ? 'text-blue-300' : 'text-blue-600',
    secondaryText: darkMode ? 'text-blue-100' : 'text-gray-600',
    button: darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
    iconColor: darkMode ? 'text-blue-300' : 'text-blue-500'
  };

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      theme, 
      setCurrentDay,
      isAutoThemeEnabled,
      enableAutoTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);