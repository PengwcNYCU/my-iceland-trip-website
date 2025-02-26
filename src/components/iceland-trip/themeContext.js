// src/components/iceland-trip/themeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);