import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface HeaderProps {
  pageName: string;
  onHomePress?: () => void;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  hasNotifications?: boolean;
  showSearchIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  pageName,
  onHomePress,
  onSearchPress,
  onNotificationPress,
  onProfilePress,
  hasNotifications = false,
  showSearchIcon = true,
}) => {
  return (
    <View style={styles.header}>
      {/* Left side - Homepage Image and Page Name */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onHomePress} style={styles.homeButton}>
          <Image 
            source={require('@/assets/images/HomePage/HomePage.png')} 
            style={styles.homeImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{pageName}</Text>
      </View>

      {/* Right side icons */}
      <View style={styles.rightIcons}>
        {/* Search Icon - conditionally rendered */}
        {showSearchIcon && (
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#06498e" />
          </TouchableOpacity>
        )}

        {/* Notifications Bell with Red Dot */}
        <TouchableOpacity onPress={onNotificationPress} style={styles.notificationContainer}>
          <Ionicons name="notifications" size={24} color="#06498e" />
          {hasNotifications && <View style={styles.redDot} />}
        </TouchableOpacity>

        {/* Profile Image */}
        <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
          <Ionicons name="person-circle" size={32} color="#06498e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  homeButton: {
    padding: 8,
  },
  homeImage: {
    width: 32,
    height: 32,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06498e',
    marginLeft: 12,
  },
  iconButton: {
    padding: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  redDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  profileButton: {
    padding: 8,
  },
});

export default Header;
