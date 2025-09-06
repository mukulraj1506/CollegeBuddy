import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PreviousItems from './PreviousItems';
import SellNewItem from './SellNewItem';

interface SellPageProps {
  onLogout?: () => void;
}

const SellPage: React.FC<SellPageProps> = ({ onLogout }) => {
  const [activeSellTab, setActiveSellTab] = useState<'Previous' | 'New'>('Previous');

  // Sample data for previous items
  const previousItems = [
    {
      id: '1',
      name: 'Physics Textbook',
      price: '$35.00',
      status: 'Sold' as const,
      date: '2024-01-15',
      condition: 'Like New' as const,
      category: 'Textbooks' as const,
      image: require('@/assets/images/HomePage/HomePage.png'),
    },
    {
      id: '2',
      name: 'Chemistry Lab Kit',
      price: '$20.00',
      status: 'Active' as const,
      date: '2024-01-10',
      condition: 'Good' as const,
      category: 'Electronics' as const,
      image: require('@/assets/images/HomePage/HomePage.png'),
    },
    {
      id: '3',
      name: 'Math Calculator',
      price: '$15.00',
      status: 'Sold' as const,
      date: '2024-01-05',
      condition: 'New' as const,
      category: 'Electronics' as const,
      image: require('@/assets/images/HomePage/HomePage.png'),
    },
  ];


  const handleSellTabPress = (tab: 'Previous' | 'New') => {
    setActiveSellTab(tab);
    console.log(`Sell tab pressed: ${tab}`);
  };

  const handleItemAction = (itemId: string) => {
    console.log('Item action pressed for:', itemId);
    // TODO: Handle item actions (edit, delete, etc.)
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    // TODO: Submit form data
  };

  const renderPreviousItems = () => (
    <PreviousItems 
      items={previousItems} 
      onItemAction={handleItemAction}
    />
  );

  const renderSellNew = () => (
    <SellNewItem onSubmit={handleFormSubmit} />
  );

  return (
    <View style={styles.container}>
      {/* Sell Navigation */}
      <View style={styles.sellNavigation}>
        <TouchableOpacity
          style={[
            styles.sellNavButton,
            activeSellTab === 'Previous' && styles.activeSellNavButton
          ]}
          onPress={() => handleSellTabPress('Previous')}
        >
          <Text style={[
            styles.sellNavText,
            activeSellTab === 'Previous' && styles.activeSellNavText
          ]}>
            Previous Items
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.sellNavButton,
            activeSellTab === 'New' && styles.activeSellNavButton
          ]}
          onPress={() => handleSellTabPress('New')}
        >
          <Text style={[
            styles.sellNavText,
            activeSellTab === 'New' && styles.activeSellNavText
          ]}>
            Upload New Item
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeSellTab === 'Previous' ? renderPreviousItems() : renderSellNew()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sellNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sellNavButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeSellNavButton: {
    backgroundColor: '#f0f8ff',
  },
  sellNavText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeSellNavText: {
    color: '#06498e',
    fontWeight: '600',
  },
});

export default SellPage;
