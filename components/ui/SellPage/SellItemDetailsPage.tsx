import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

const { width: screenWidth } = Dimensions.get('window');

interface SellItemDetails {
  id: string;
  name: string;
  price: string;
  condition: string;
  category: string;
  description: string;
  status: 'Active' | 'Sold';
  postedDate: string;
  images?: string[];
}

interface SellItemDetailsPageProps {
  item: SellItemDetails;
  onEditItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onShare: (item: SellItemDetails) => void;
}

const SellItemDetailsPage: React.FC<SellItemDetailsPageProps> = ({
  item,
  onEditItem,
  onDeleteItem,
  onShare,
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleImageScroll = (event: any) => {
    try {
      if (!event?.nativeEvent) return;
      
      const slideSize = event.nativeEvent.layoutMeasurement?.width;
      const contentOffset = event.nativeEvent.contentOffset?.x;
      
      if (slideSize && contentOffset !== undefined) {
        const index = contentOffset / slideSize;
        setCurrentImageIndex(Math.round(index));
      }
    } catch (error) {
      console.warn('Error handling image scroll:', error);
    }
  };

  const handleEdit = () => {
    if (item?.id && onEditItem) {
      onEditItem(item.id);
    }
  };

  const handleDelete = () => {
    if (!item?.id || !onDeleteItem) return;
    
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            try {
              onDeleteItem(item.id);
              router.back();
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete item. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleShare = () => {
    if (item && onShare) {
      try {
        onShare(item);
        Alert.alert('Share', 'Item shared successfully!');
      } catch (error) {
        console.error('Error sharing item:', error);
        Alert.alert('Error', 'Failed to share item. Please try again.');
      }
    }
  };

  const handleGoBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error('Error navigating back:', error);
    }
  };

  const formatPostedDate = (dateString?: string) => {
    if (!dateString) return 'Posted recently';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Posted recently';
      
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Posted 1 day ago';
      if (diffDays < 7) return `Posted ${diffDays} days ago`;
      if (diffDays < 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
      return `Posted ${Math.ceil(diffDays / 30)} months ago`;
    } catch (error) {
      return 'Posted recently';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Item Details</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={20} color="#06498e" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photos Section */}
        <View style={styles.photosSection}>
          {(item?.images && item.images.length > 0) ? (
            <>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleImageScroll}
                style={styles.imageCarousel}
              >
                {item.images.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.carouselImage} />
                    {index === 0 && (
                      <View style={styles.coverBadge}>
                        <Text style={styles.coverText}>Cover</Text>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
              
              {/* Image Indicators */}
              {item.images.length > 1 && (
                <View style={styles.imageIndicators}>
                  {item.images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        index === currentImageIndex && styles.activeIndicator
                      ]}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Ionicons name="image-outline" size={48} color="#ccc" />
              <Text style={styles.noImageText}>No images available</Text>
            </View>
          )}
        </View>

        {/* Title + Price Section */}
        <View style={styles.titlePriceSection}>
          <Text style={styles.itemTitle}>{item?.name || 'Untitled Item'}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item?.price || 'Price not set'}</Text>
            {item?.status && (
              <View style={[
                styles.statusBadge,
                { backgroundColor: item.status === 'Sold' ? '#4CAF50' : '#FF9800' }
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Condition & Category Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Condition:</Text>
            <Text style={styles.detailValue}>{item?.condition || 'Not specified'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{item?.category || 'Not specified'}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text 
            style={styles.description}
            numberOfLines={isDescriptionExpanded ? undefined : 3}
          >
            {item?.description || 'No description provided'}
          </Text>
          {item?.description && item.description.length > 100 && (
            <TouchableOpacity 
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              style={styles.expandButton}
            >
              <Text style={styles.expandButtonText}>
                {isDescriptionExpanded ? 'Show Less' : 'Show More'}
              </Text>
              <Ionicons 
                name={isDescriptionExpanded ? "chevron-up" : "chevron-down"} 
                size={16} 
                color="#06498e" 
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Additional Details */}
        <View style={styles.additionalDetails}>
          <Text style={styles.postedDate}>{formatPostedDate(item?.postedDate)}</Text>
        </View>
      </ScrollView>

      {/* Fixed Action Buttons */}
      <View style={styles.fixedActionButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
        >
          <Ionicons name="create-outline" size={20} color="#06498e" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...globalStyles.paddingHeader,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  shareButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 100, // Add padding to prevent content from being hidden behind fixed buttons
  },
  // Photos Section
  photosSection: {
    marginBottom: 20,
  },
  imageCarousel: {
    height: 250,
  },
  imageContainer: {
    width: screenWidth,
    height: 250,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#06498e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  coverText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#06498e',
  },
  noImageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noImageText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  // Title + Price Section
  titlePriceSection: {
    ...globalStyles.paddingSection,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#06498e',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  // Details Section
  detailsSection: {
    ...globalStyles.paddingSection,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    width: 80,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  // Description Section
  descriptionSection: {
    ...globalStyles.paddingSection,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  expandButtonText: {
    fontSize: 14,
    color: '#06498e',
    fontWeight: '600',
    marginRight: 4,
  },
  // Additional Details
  additionalDetails: {
    ...globalStyles.paddingSection,
  },
  postedDate: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  // Fixed Action Buttons
  fixedActionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    ...globalStyles.paddingActionButtons,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    paddingBottom: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#06498e',
    backgroundColor: '#fff',
  },
  editButtonText: {
    fontSize: 16,
    color: '#06498e',
    marginLeft: 6,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
});

export default SellItemDetailsPage;
