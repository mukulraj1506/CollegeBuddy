import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

const { width: screenWidth } = Dimensions.get('window');

interface HeaderProps {
  pageName: string;
  onHomePress?: () => void;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onEditProfile?: () => void;
  onContactUs?: () => void;
  onLogout?: () => void;
  hasNotifications?: boolean;
  showSearchIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  pageName,
  onHomePress,
  onSearchPress,
  onNotificationPress,
  onProfilePress,
  onEditProfile,
  onContactUs,
  onLogout,
  hasNotifications = false,
  showSearchIcon = true,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [slideAnim] = useState(new Animated.Value(screenWidth));

  const handleProfilePress = () => {
    setShowProfileMenu(true);
    onProfilePress?.();
    
    // Animate sidebar in
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowProfileMenu(false);
    });
  };

  const handleMenuOption = (option: string) => {
    closeSidebar();
    switch (option) {
      case 'edit':
        onEditProfile?.();
        break;
      case 'contact':
        onContactUs?.();
        break;
      case 'logout':
        onLogout?.();
        break;
    }
  };

  return (
    <>
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
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color="#06498e" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar Drawer - Outside of header container */}
      {showProfileMenu && (
        <>
          {/* Overlay */}
          <TouchableOpacity 
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeSidebar}
          />
          
          {/* Sidebar */}
          <Animated.View 
            style={[
              styles.sidebar,
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            {/* Back Button Header */}
            <View style={styles.sidebarHeader}>
              <TouchableOpacity onPress={closeSidebar} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
              {/* User Profile Section */}
              <View style={styles.userProfileSection}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person-circle" size={80} color="#06498e" />
                </View>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john.doe@example.com</Text>
              </View>

              {/* Menu Items */}
              <View style={styles.menuContainer}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => handleMenuOption('edit')}
                >
                  <Ionicons name="create-outline" size={24} color="#06498e" />
                  <Text style={styles.menuItemText}>Edit Profile</Text>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => handleMenuOption('contact')}
                >
                  <Ionicons name="mail-outline" size={24} color="#06498e" />
                  <Text style={styles.menuItemText}>Contact Us</Text>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Fixed Footer */}
            <View style={styles.sidebarFooter}>
              <Text style={styles.madeWithLove}>Made with ❤️ in India</Text>
              
              <View style={styles.footerDivider} />
              
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={() => handleMenuOption('logout')}
              >
                <Ionicons name="log-out-outline" size={24} color="#ff4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...globalStyles.paddingHeader,
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
  // Sidebar Styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    backgroundColor: '#fff',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingBottom: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  userProfileSection: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userAvatar: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    flex: 1,
    fontWeight: '500',
  },
  sidebarFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingBottom: 10,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  madeWithLove: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  footerDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  logoutButton: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4444',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default Header;
