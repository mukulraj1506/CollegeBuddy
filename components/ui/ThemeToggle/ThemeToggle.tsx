import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ThemeToggleProps {
  style?: any;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.toggleButton, { backgroundColor: colors.surface, borderColor: colors.border }, style]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={[styles.toggleText, { color: colors.text }]}>
        {isDark ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 18,
  },
});
