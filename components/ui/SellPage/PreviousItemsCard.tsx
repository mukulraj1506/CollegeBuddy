import { useTheme } from '@/contexts/ThemeContext';
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
  const { colors } = useTheme();
  
  return (
    <View style={[styles.itemCard, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View style={[styles.itemImage, { backgroundColor: colors.surface }]}>
        <Ionicons name="image-outline" size={40} color={colors.textSecondary} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>{item.price}</Text>
        <Text style={[styles.itemDate, { color: colors.textSecondary }]}>{item.date}</Text>
        <View style={styles.itemMeta}>
          <Text style={[
            styles.itemStatus,
            { color: item.status === 'Sold' ? colors.success : colors.warning }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.viewDetailsButton, { backgroundColor: colors.buttonBackground }]} 
        onPress={onViewDetails}
        activeOpacity={0.8}
      >
        <Text style={[styles.viewDetailsButtonText, { color: colors.buttonText }]}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
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
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    marginLeft: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  viewDetailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PreviousItemsCard;
