import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/globalStyles';
import { ThemeToggle } from '../ThemeToggle';

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
  const router = useRouter();
  const { colors } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const sidebarWidth = screenWidth; // Take full screen width
  const [slideAnim] = useState(new Animated.Value(sidebarWidth));

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
      toValue: sidebarWidth,
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
        // Navigate to Edit Profile page
        router.push('/edit-profile' as any);
        onEditProfile?.();
        break;
      case 'contact':
        // Navigate to Contact Us page
        router.push('/contact-us' as any);
        onContactUs?.();
        break;
      case 'logout':
        onLogout?.();
        break;
    }
  };

  return (
    <>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        {/* Left side - Homepage Image and Page Name */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={onHomePress} style={styles.homeButton}>
            <Image 
              source={require('@/assets/images/HomePage/HomePage.png')} 
              style={styles.homeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.pageTitle, { color: colors.primary }]}>{pageName}</Text>
        </View>

        {/* Right side icons */}
        <View style={styles.rightIcons}>
          {/* Search Icon - conditionally rendered */}
          {showSearchIcon && (
            <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
              <Ionicons name="search" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}

          {/* Notifications Bell with Red Dot */}
          <TouchableOpacity onPress={onNotificationPress} style={styles.notificationContainer}>
            <Ionicons name="notifications" size={24} color={colors.primary} />
            {hasNotifications && <View style={[styles.redDot, { backgroundColor: colors.error }]} />}
          </TouchableOpacity>

          {/* Profile Image */}
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar Drawer - Outside of header container */}
      {showProfileMenu && (
        <>
          {/* Overlay */}
          <TouchableOpacity 
            style={[styles.overlay, { backgroundColor: colors.overlay }]}
            activeOpacity={1}
            onPress={closeSidebar}
          />
          
          {/* Sidebar */}
          <Animated.View 
            style={[
              styles.sidebar,
              { backgroundColor: colors.background },
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <SafeAreaView style={styles.sidebarSafeArea} edges={['top', 'left', 'right']}>
              {/* Back Button Header */}
              <View style={[styles.sidebarHeader, { borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={closeSidebar} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              {/* Scrollable Content */}
              <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
              {/* User Profile Section */}
              <View style={[styles.userProfileSection, { borderBottomColor: colors.border }]}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person-circle" size={80} color={colors.primary} />
                </View>
                <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
                <Text style={[styles.userEmail, { color: colors.textSecondary }]}>john.doe@example.com</Text>
              </View>

              {/* Menu Items */}
              <View style={styles.menuContainer}>
                <TouchableOpacity 
                  style={[styles.menuItem, { backgroundColor: colors.background, borderBottomColor: colors.border }]}
                  onPress={() => handleMenuOption('edit')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="create-outline" size={24} color={colors.primary} />
                  <Text style={[styles.menuItemText, { color: colors.text }]}>Edit Profile</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.menuItem, { backgroundColor: colors.background, borderBottomColor: colors.border }]}
                  onPress={() => handleMenuOption('contact')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="mail-outline" size={24} color={colors.primary} />
                  <Text style={[styles.menuItemText, { color: colors.text }]}>Contact Us</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                {/* Theme Toggle */}
                <View style={[styles.menuItem, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
                  <Ionicons name="color-palette-outline" size={24} color={colors.primary} />
                  <Text style={[styles.menuItemText, { color: colors.text }]}>Theme</Text>
                  <ThemeToggle style={styles.sidebarThemeToggle} />
                </View>
              </View>
            </ScrollView>

            {/* Fixed Footer */}
            <View style={[styles.sidebarFooter, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
              <Text style={[styles.madeWithLove, { color: colors.textSecondary }]}>Made with ❤️ in India</Text>
              
              <View style={[styles.footerDivider, { backgroundColor: colors.border }]} />
              
              <TouchableOpacity 
                style={[styles.logoutButton, { backgroundColor: colors.surface, borderColor: colors.error }]}
                onPress={() => handleMenuOption('logout')}
              >
                <Ionicons name="log-out-outline" size={24} color={colors.error} />
                <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
              </TouchableOpacity>
            </View>
            </SafeAreaView>
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
  sidebarThemeToggle: {
    marginLeft: 'auto',
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
    width: screenWidth, // Take full screen width
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
  sidebarSafeArea: {
    flex: 1,
    width: '100%',
  },
  sidebarContent: {
    flex: 1,
    paddingBottom: 20,
    width: '100%',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: '100%',
  },
  backButton: {
    padding: 8,
  },
  userProfileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: '100%',
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
    paddingTop: 16,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    width: '100%',
    backgroundColor: '#fff',
  },
  menuItemPressed: {
    backgroundColor: '#f0f8ff',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    flex: 1,
    fontWeight: '500',
  },
  menuItemIcon: {
    marginRight: 8,
  },
  sidebarFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    width: '100%',
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
