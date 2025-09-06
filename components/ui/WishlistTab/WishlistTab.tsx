import { useRouter } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { ItemList } from '../Common';

const WishlistTab: React.FC = () => {
  const router = useRouter();

  // Sample wishlist data (in a real app, this would come from state/API)
  const wishlistItems = [
    {
      id: '1',
      name: 'Calculus Textbook',
      price: '$45.00',
      priceValue: 45,
      condition: 'Like New' as const,
      category: 'Textbooks' as const,
      datePosted: '2024-01-15',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'John D.',
      location: 'Engineering Building',
      negotiable: true,
      description: 'Comprehensive calculus textbook covering all major topics.',
      images: [],
      status: 'Sold' as const
    },
    {
      id: '2',
      name: 'Scientific Calculator',
      price: '$25.00',
      priceValue: 25,
      condition: 'Good' as const,
      category: 'Electronics' as const,
      datePosted: '2024-01-10',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Sarah M.',
      location: 'Math Department',
      negotiable: false,
      description: 'TI-84 Plus calculator in good working condition.',
      images: [],
      status: 'Active' as const
    },
    {
      id: '3',
      name: 'Lab Coat',
      price: '$15.00',
      priceValue: 15,
      condition: 'New' as const,
      category: 'Clothing' as const,
      datePosted: '2024-01-05',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Mike R.',
      location: 'Science Lab',
      negotiable: true,
      description: 'Brand new lab coat, never used.',
      images: [],
      status: 'Active' as const
    },
  ];

  const handleItemPress = (item: any) => {
    // Navigate to item details page (same as buy page)
    router.push({
      pathname: '/item-details' as any,
      params: {
        id: item.id,
        name: item.name,
        price: item.price,
        condition: item.condition,
        category: item.category || '',
        description: item.description || '',
        seller: item.seller,
        location: item.location,
        negotiable: item.negotiable?.toString() || 'false',
        postedDate: item.datePosted || '',
        images: item.images ? JSON.stringify(item.images) : '[]',
        fromWishlist: 'true', // Indicate this is from wishlist
        status: item.status || '',
      }
    });
  };

  return (
    <View style={styles.container}>
      <ItemList
        items={wishlistItems}
        onItemPress={handleItemPress}
        showStatus={true}
        placeholder={{
          title: "No items in wishlist yet",
          subtitle: "Tap the heart icon on any item to add it to your wishlist",
          icon: "heart-outline"
        }}
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

export default WishlistTab;
