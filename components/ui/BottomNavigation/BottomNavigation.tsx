import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface BottomNavigationProps {
  activeTab: 'Buy' | 'Sell' | 'Wishlist' | 'Chats';
  onTabPress: (tab: 'Buy' | 'Sell' | 'Wishlist' | 'Chats') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const { colors } = useTheme();
  const tabs = [
    { key: 'Buy' as const, icon: 'cart', label: 'Buy' },
    { key: 'Sell' as const, icon: 'add-circle-outline', label: 'Sell' },
    { key: 'Wishlist' as const, icon: 'heart-outline', label: 'Wishlist' },
    { key: 'Chats' as const, icon: 'chatbubbles-outline', label: 'Chats' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border, shadowColor: colors.shadow }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && [styles.activeTab, { backgroundColor: colors.secondary }],
          ]}
          onPress={() => onTabPress(tab.key)}
        >
          <Ionicons
            name={tab.icon as any}
            size={20}
            color={activeTab === tab.key ? colors.primary : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: colors.textSecondary },
              activeTab === tab.key && [styles.activeTabLabel, { color: colors.primary }],
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
    borderTopWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
    borderRadius: 6,
  },
  tabLabel: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  activeTabLabel: {
    fontWeight: '600',
  },
});

export default BottomNavigation;
