import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import ItemCard from './ItemCard';

const { width } = Dimensions.get('window');

interface BuyPageProps {
  onLogout?: () => void;
}

const BuyPage: React.FC<BuyPageProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [slideAnim] = useState(new Animated.Value(-width * 0.8));

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

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Close menu
      Animated.timing(slideAnim, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Open menu
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMenuOpen(false);
  };

  const handleMenuOption = (option: string) => {
    console.log(`Selected: ${option}`);
    closeMenu();
    // TODO: Implement navigation to different sections
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#06498e" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Buy & Sell</Text>
        
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={32} color="#06498e" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for books, supplies, and more..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

             {/* Content */}
       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
         {sampleItems.map((item) => (
           <ItemCard key={item.id} item={item} />
         ))}
       </ScrollView>

      {/* Side Menu */}
      <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#06498e" />
          </TouchableOpacity>
        </View>
        
                 <View style={styles.menuOptions}>
           <TouchableOpacity 
             style={[styles.menuOption, styles.activeMenuOption]} 
             onPress={() => handleMenuOption('Buy')}
           >
             <Ionicons name="cart" size={24} color="#06498e" />
             <Text style={[styles.menuOptionText, styles.activeMenuOptionText]}>Buy</Text>
           </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuOption} 
            onPress={() => handleMenuOption('Sell')}
          >
            <Ionicons name="add-circle-outline" size={24} color="#06498e" />
            <Text style={styles.menuOptionText}>Sell</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuOption} 
            onPress={() => handleMenuOption('Orders')}
          >
            <Ionicons name="list-outline" size={24} color="#06498e" />
            <Text style={styles.menuOptionText}>Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuOption} 
            onPress={() => handleMenuOption('Chats')}
          >
            <Ionicons name="chatbubbles-outline" size={24} color="#06498e" />
            <Text style={styles.menuOptionText}>Chats</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ff4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Overlay */}
      {isMenuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06498e',
  },
  profileButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06498e',
  },
  closeButton: {
    padding: 8,
  },
  menuOptions: {
    paddingTop: 20,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuOptionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  activeMenuOption: {
    backgroundColor: '#f0f8ff',
    borderLeftWidth: 4,
    borderLeftColor: '#06498e',
  },
  activeMenuOptionText: {
    color: '#06498e',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4444',
    marginLeft: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default BuyPage;
