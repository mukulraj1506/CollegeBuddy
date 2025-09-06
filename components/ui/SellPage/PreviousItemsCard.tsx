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
  onActionPress?: () => void;
}

const PreviousItemsCard: React.FC<PreviousItemsCardProps> = ({ item, onActionPress }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemImage}>
        <Ionicons name="image-outline" size={40} color="#ccc" />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.itemMeta}>
          <Text style={[
            styles.itemStatus,
            { color: item.status === 'Sold' ? '#4CAF50' : '#FF9800' }
          ]}>
            {item.status}
          </Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
        <Ionicons name="ellipsis-vertical" size={20} color="#666" />
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
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  itemDate: {
    fontSize: 12,
    color: '#666',
  },
  actionButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PreviousItemsCard;
