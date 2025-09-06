import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const WishlistTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>
      <Text style={styles.subtitle}>Items you've saved for later</Text>
      
      {/* Placeholder for wishlist items */}
      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderText}>No items in wishlist yet</Text>
        <Text style={styles.placeholderSubtext}>
          Tap the heart icon on any item to add it to your wishlist
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
    color: '#06498e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default WishlistTab;
