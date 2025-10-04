import { useTheme } from '@/contexts/ThemeContext';
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
  status?: 'Active' | 'Sold';
}

interface ItemCardProps {
  item: Item;
  onPress?: (item: Item) => void;
  showStatus?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress, showStatus = false }) => {
  const router = useRouter();
  const { colors } = useTheme();

  const handlePress = () => {
    onPress?.(item);
  };

  const handleViewDetails = () => {
    // Navigate to item details page with item data as params
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
        postedDate: item.postedDate || '',
        images: item.images ? JSON.stringify(item.images) : '[]',
      }
    });
  };

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]} onPress={handlePress} activeOpacity={0.7}>
      {/* Item Image */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={[styles.conditionBadge, { backgroundColor: colors.success }]}>
          <Text style={styles.conditionText}>{item.condition}</Text>
        </View>
      </View>

      {/* Item Details */}
      <View style={styles.detailsContainer}>
        <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        
        <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
        
        {showStatus && item.status && (
          <View style={styles.statusContainer}>
            <Text style={[
              styles.statusText,
              { color: item.status === 'Sold' ? colors.success : colors.warning }
            ]}>
              {item.status}
            </Text>
          </View>
        )}
        
        <View style={styles.sellerInfo}>
          <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.sellerText, { color: colors.textSecondary }]}>{item.seller}</Text>
        </View>
        
        <View style={styles.locationInfo}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>{item.location}</Text>
        </View>
      </View>
      
      {/* View Details Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.viewDetailsButton, { backgroundColor: colors.buttonBackground }]} onPress={handleViewDetails}>
          <Text style={[styles.viewDetailsButtonText, { color: colors.buttonText }]}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    ...globalStyles.paddingCard,
    marginBottom: 12,
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
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  sellerText: {
    fontSize: 12,
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  statusContainer: {
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  viewDetailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 80,
  },
  viewDetailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ItemCard;



