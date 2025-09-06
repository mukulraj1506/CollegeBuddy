import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface BottomNavigationProps {
  activeTab: 'Buy' | 'Sell' | 'Wishlist' | 'Chats';
  onTabPress: (tab: 'Buy' | 'Sell' | 'Wishlist' | 'Chats') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs = [
    { key: 'Buy' as const, icon: 'cart', label: 'Buy' },
    { key: 'Sell' as const, icon: 'add-circle-outline', label: 'Sell' },
    { key: 'Wishlist' as const, icon: 'heart-outline', label: 'Wishlist' },
    { key: 'Chats' as const, icon: 'chatbubbles-outline', label: 'Chats' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => onTabPress(tab.key)}
        >
          <Ionicons
            name={tab.icon as any}
            size={20}
            color={activeTab === tab.key ? '#06498e' : '#666'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.key && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  activeTab: {
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#06498e',
    fontWeight: '600',
  },
});

export default BottomNavigation;
