import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import SellItemDetailsPage from '../components/ui/SellPage/SellItemDetailsPage';

export default function SellItemDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Convert params to the expected item format
  const item = {
    id: params.id as string,
    name: params.name as string,
    price: params.price as string,
    condition: params.condition as string,
    category: params.category as string,
    description: params.description as string,
    status: params.status as 'Active' | 'Sold',
    postedDate: params.date as string,
    images: [], // You can add image handling here if needed
  };

  const handleEditItem = (itemId: string) => {
    // TODO: Navigate to edit item page
    // router.push({ pathname: '/edit-item', params: { id: itemId } });
  };

  const handleDeleteItem = (itemId: string) => {
    // TODO: Implement delete functionality
    // This could involve API calls, state updates, etc.
  };

  const handleShare = (item: any) => {
    // TODO: Implement share functionality
  };

  return (
    <View style={{ flex: 1 }}>
      <SellItemDetailsPage
        item={item}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onShare={handleShare}
      />
    </View>
  );
}
