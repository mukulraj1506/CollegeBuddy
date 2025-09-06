import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Header from '../Header/Header';
import SellPage from '../SellPage/SellPage';
import ItemCard from './ItemCard';

interface BuyPageProps {
  onLogout?: () => void;
}

const BuyPage: React.FC<BuyPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'Buy' | 'Sell' | 'Orders' | 'Chats'>('Buy');

  // Sample data for items
  const sampleItems = [
    {
      id: '1',
      name: 'Calculus Textbook',
      price: '$45.00',
      condition: 'Like New',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'John D.',
      location: 'Engineering Building'
    },
    {
      id: '2',
      name: 'Scientific Calculator',
      price: '$25.00',
      condition: 'Good',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Sarah M.',
      location: 'Math Department'
    },
    {
      id: '3',
      name: 'Lab Coat',
      price: '$15.00',
      condition: 'Excellent',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Mike R.',
      location: 'Science Lab'
    },
    {
      id: '4',
      name: 'Programming Notes',
      price: '$8.00',
      condition: 'Good',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Alex K.',
      location: 'Computer Science'
    }
  ];


  const handleHomePress = () => {
    console.log('Home pressed');
    // TODO: Navigate to home page
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // TODO: Open search functionality
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
    // TODO: Navigate to notifications
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    // TODO: Navigate to profile
  };

  const handleTabPress = (tab: 'Buy' | 'Sell' | 'Orders' | 'Chats') => {
    setActiveTab(tab);
    console.log(`Tab pressed: ${tab}`);
    // TODO: Navigate to respective tab content
  };

  const getPageName = () => {
    switch (activeTab) {
      case 'Buy': return 'Buy';
      case 'Sell': return 'Sell';
      case 'Orders': return 'Orders';
      case 'Chats': return 'Chats';
      default: return 'Buy';
    }
  };

  const getShowSearchIcon = () => {
    return activeTab === 'Buy';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Buy':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {sampleItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </ScrollView>
        );
      case 'Sell':
        return <SellPage onLogout={onLogout} />;
      case 'Orders':
        return (
          <View style={styles.placeholderContent}>
            <Text style={styles.placeholderText}>Orders Page</Text>
          </View>
        );
      case 'Chats':
        return (
          <View style={styles.placeholderContent}>
            <Text style={styles.placeholderText}>Chats Page</Text>
          </View>
        );
      default:
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {sampleItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        pageName={getPageName()}
        onHomePress={handleHomePress}
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
        hasNotifications={true}
        showSearchIcon={getShowSearchIcon()}
      />

      {/* Content */}
      {renderContent()}


      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  },
});

export default BuyPage;
