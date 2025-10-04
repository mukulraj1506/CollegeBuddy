import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    inputBackground: string;
    inputBorder: string;
    buttonBackground: string;
    buttonText: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    shadow: string;
    overlay: string;
  };
  toggleTheme: () => void;
}

const lightTheme = {
  isDark: false,
  colors: {
    primary: '#06498e', // Original blue color
    secondary: '#f1f5f9', // Light slate
    background: '#ffffff', // Pure white
    surface: '#f8fafc', // Very light gray
    card: '#ffffff', // Pure white cards
    text: '#1e293b', // Dark slate text
    textSecondary: '#64748b', // Medium slate
    border: '#e2e8f0', // Light slate border
    inputBackground: '#ffffff', // White inputs
    inputBorder: '#9ca3af', // More prominent gray border
    buttonBackground: '#06498e', // Consistent with primary
    buttonText: '#ffffff', // White button text
    success: '#10b981', // Modern emerald green
    error: '#ef4444', // Modern red
    warning: '#f59e0b', // Modern amber
    info: '#06b6d4', // Modern cyan
    shadow: 'rgba(0, 0, 0, 0.1)', // Light shadow
    overlay: 'rgba(0, 0, 0, 0.5)', // Medium overlay
  },
};

const darkTheme = {
  isDark: true,
  colors: {
    primary: '#60a5fa', // Brighter, more vibrant blue
    secondary: '#1e293b', // Better slate color
    background: '#0f172a', // Deeper, richer dark background
    surface: '#1e293b', // Better surface color with more contrast
    card: '#1e293b', // Consistent with surface
    text: '#f8fafc', // Crisp white text
    textSecondary: '#cbd5e1', // Better secondary text color
    border: '#334155', // More visible borders
    inputBackground: '#1e293b', // Better input background
    inputBorder: '#6b7280', // More prominent input borders
    buttonBackground: '#60a5fa', // Consistent with primary
    buttonText: '#ffffff', // Keep white for buttons
    success: '#10b981', // Modern emerald green
    error: '#ef4444', // Modern red
    warning: '#f59e0b', // Modern amber
    info: '#06b6d4', // Modern cyan
    shadow: 'rgba(0, 0, 0, 0.4)', // Deeper shadow
    overlay: 'rgba(0, 0, 0, 0.8)', // More opaque overlay
  },
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const saveTheme = async (theme: boolean) => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(theme));
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    saveTheme(newTheme);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
