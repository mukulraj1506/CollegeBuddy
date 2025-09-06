import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

interface Item {
  id: string;
  name: string;
  price: string;
  condition: string;
  category?: string;
  description?: string;
  image: any;
  images?: string[];
  seller: string;
  location: string;
  negotiable?: boolean;
  postedDate?: string;
}

interface ItemCardProps {
  item: Item;
  onPress?: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    onPress?.(item);
  };

  const handleViewDetails = () => {
    // Navigate to item details page with item data as params
    router.push({
      pathname: '/item-details',
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
        postedDate: item.postedDate || '',
        images: item.images ? JSON.stringify(item.images) : '[]',
      }
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      {/* Item Image */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.conditionBadge}>
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
      </View>

      {/* Item Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        
        <Text style={styles.price}>{item.price}</Text>
        
        <View style={styles.sellerInfo}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.sellerText}>{item.seller}</Text>
        </View>
        
        <View style={styles.locationInfo}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
      
      {/* View Details Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetails}>
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    ...globalStyles.paddingCard,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  conditionBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 1,
  },
  conditionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#06498e',
    marginBottom: 4,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  sellerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  viewDetailsButton: {
    backgroundColor: '#06498e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 80,
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ItemCard;



