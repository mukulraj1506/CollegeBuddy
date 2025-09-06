import React from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import PreviousItemsCard from './PreviousItemsCard';

interface PreviousItemsProps {
  items: Array<{
    id: string;
    name: string;
    price: string;
    status: string;
    date: string;
  }>;
  onItemAction?: (itemId: string) => void;
}

const PreviousItems: React.FC<PreviousItemsProps> = ({ items, onItemAction }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {items.map((item) => (
        <PreviousItemsCard
          key={item.id}
          item={item}
          onActionPress={() => onItemAction?.(item.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default PreviousItems;
