import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const ChatsTab: React.FC = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Messages</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Chat with sellers and buyers</Text>
      
      {/* Placeholder for chat conversations */}
      <View style={styles.placeholderContent}>
        <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>No conversations yet</Text>
        <Text style={[styles.placeholderSubtext, { color: colors.textSecondary }]}>
          Start a conversation by messaging a seller about their item
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default ChatsTab;
