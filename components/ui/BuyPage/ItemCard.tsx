import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Item {
  id: string;
  name: string;
  price: string;
  condition: string;
  image: any;
  seller: string;
  location: string;
}

interface ItemCardProps {
  item: Item;
  onPress?: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  const handlePress = () => {
    onPress?.(item);
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
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={16} color="#06498e" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  conditionBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  conditionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06498e',
    marginBottom: 8,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sellerText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#06498e',
    borderRadius: 16,
  },
  messageButtonText: {
    fontSize: 12,
    color: '#06498e',
    marginLeft: 4,
    fontWeight: '500',
  },
  buyButton: {
    backgroundColor: '#06498e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ItemCard;
