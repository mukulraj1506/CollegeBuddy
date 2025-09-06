import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface PreviousItemsCardProps {
  item: {
    id: string;
    name: string;
    price: string;
    status: string;
    date: string;
  };
  onViewDetails?: () => void;
}

const PreviousItemsCard: React.FC<PreviousItemsCardProps> = ({ item, onViewDetails }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemImage}>
        <Ionicons name="image-outline" size={40} color="#ccc" />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
        <View style={styles.itemMeta}>
          <Text style={[
            styles.itemStatus,
            { color: item.status === 'Sold' ? '#4CAF50' : '#FF9800' }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.viewDetailsButton} 
        onPress={onViewDetails}
        activeOpacity={0.8}
      >
        <Text style={styles.viewDetailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06498e',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  viewDetailsButton: {
    backgroundColor: '#06498e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PreviousItemsCard;
