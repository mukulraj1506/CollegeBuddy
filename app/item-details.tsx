import ItemDetailsPage from '@/components/ui/BuyPage/ItemDetailsPage';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function ItemDetailsScreen() {
  const params = useLocalSearchParams();
  
  // Mock item data - in real app, this would come from API or state management
  const mockItem = {
    id: params.id as string || '1',
    name: params.name as string || 'Calculus Textbook',
    price: params.price as string || '$45.00',
    condition: params.condition as string || 'Like New',
    category: params.category as string || 'Textbooks',
    description: params.description as string || 'Comprehensive calculus textbook covering all major topics including derivatives, integrals, and differential equations. Perfect condition with minimal highlighting.',
    seller: params.seller as string || 'John D.',
    location: params.location as string || 'Engineering Building',
    negotiable: params.negotiable === 'true',
    postedDate: params.postedDate as string || '2024-01-15',
    images: params.images ? JSON.parse(params.images as string) : [
      'https://via.placeholder.com/400x300/06498e/ffffff?text=Calculus+Textbook',
      'https://via.placeholder.com/400x300/4CAF50/ffffff?text=Inside+Pages',
      'https://via.placeholder.com/400x300/FF9800/ffffff?text=Back+Cover'
    ],
  };

  const handleMessageSeller = (sellerId: string) => {
    console.log('Message seller:', sellerId);
    // TODO: Navigate to chat or implement messaging
  };

  const handleAddToWishlist = (itemId: string) => {
    console.log('Add to wishlist:', itemId);
    // TODO: Implement wishlist functionality
  };

  const handleShare = (item: any) => {
    console.log('Share item:', item);
    // TODO: Implement sharing functionality
  };

  const handleReport = (itemId: string) => {
    console.log('Report item:', itemId);
    // TODO: Implement reporting functionality
  };

  return (
    <ItemDetailsPage
      item={mockItem}
      onMessageSeller={handleMessageSeller}
      onAddToWishlist={handleAddToWishlist}
      onShare={handleShare}
      onReport={handleReport}
    />
  );
}
