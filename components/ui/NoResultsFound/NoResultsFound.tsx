import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface NoResultsFoundProps {
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onClearFilters?: () => void;
  showClearButton?: boolean;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({
  title = 'No items found',
  subtitle = 'Try adjusting your search or filter criteria',
  icon = 'search-outline',
  onClearFilters,
  showClearButton = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={64} color="#ccc" />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      {showClearButton && onClearFilters && (
        <View style={styles.buttonContainer}>
          <Text style={styles.clearButton} onPress={onClearFilters}>
            Clear Filters
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
  clearButton: {
    fontSize: 16,
    color: '#06498e',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default NoResultsFound;
