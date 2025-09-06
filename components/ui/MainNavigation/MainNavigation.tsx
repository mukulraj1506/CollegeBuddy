import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import BuyTab from '../BuyTab/BuyTab';
import ChatsTab from '../ChatsTab/ChatsTab';
import Header from '../Header/Header';
import SellPage from '../SellPage/SellPage';
import WishlistTab from '../WishlistTab/WishlistTab';

interface MainNavigationProps {
  onLogout?: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'Buy' | 'Sell' | 'Wishlist' | 'Chats'>('Buy');

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

  const handleTabPress = (tab: 'Buy' | 'Sell' | 'Wishlist' | 'Chats') => {
    setActiveTab(tab);
    console.log(`Tab pressed: ${tab}`);
  };

  const getPageName = () => {
    switch (activeTab) {
      case 'Buy': return 'Buy';
      case 'Sell': return 'Sell';
      case 'Wishlist': return 'Wishlist';
      case 'Chats': return 'Chats';
      default: return 'Buy';
    }
  };

  const getShowSearchIcon = () => {
    return false; // As requested, search icon is disabled
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Buy':
        return <BuyTab />;
      case 'Sell':
        return <SellPage onLogout={onLogout} />;
      case 'Wishlist':
        return <WishlistTab />;
      case 'Chats':
        return <ChatsTab />;
      default:
        return <BuyTab />;
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
});

export default MainNavigation;
