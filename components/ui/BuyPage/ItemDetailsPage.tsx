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

interface ItemDetails {
  id: string;
  name: string;
  price: string;
  condition: string;
  category: string;
  description: string;
  seller: string;
  location: string;
  negotiable?: boolean;
  postedDate: string;
  images?: string[];
}

interface ItemDetailsPageProps {
  item: ItemDetails;
  onMessageSeller: (sellerId: string) => void;
  onAddToWishlist: (itemId: string) => void;
  onShare: (item: ItemDetails) => void;
  onReport: (itemId: string) => void;
}

const ItemDetailsPage: React.FC<ItemDetailsPageProps> = ({
  item,
  onMessageSeller,
  onAddToWishlist,
  onShare,
  onReport,
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleImageScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentImageIndex(Math.round(index));
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(item.id);
  };

  const handleShare = () => {
    onShare(item);
    Alert.alert('Share', 'Item shared successfully!');
  };

  const handleReport = () => {
    Alert.alert(
      'Report Item',
      'Are you sure you want to report this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'destructive', onPress: () => onReport(item.id) }
      ]
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  const formatPostedDate = (dateString?: string) => {
    if (!dateString) return 'Posted recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted 1 day ago';
    if (diffDays < 7) return `Posted ${diffDays} days ago`;
    if (diffDays < 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Posted ${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <TouchableOpacity onPress={handleReport} style={styles.reportButton}>
          <Ionicons name="flag-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photos Section */}
        <View style={styles.photosSection}>
          {(item.images && item.images.length > 0) ? (
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
          <Text style={styles.itemTitle}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            {item.negotiable === true && (
              <View style={styles.negotiableBadge}>
                <Text style={styles.negotiableText}>Negotiable</Text>
              </View>
            )}
          </View>
        </View>

        {/* Condition & Category Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Condition:</Text>
            <Text style={styles.detailValue}>{item.condition}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{item.category || 'Not specified'}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text 
            style={styles.description}
            numberOfLines={isDescriptionExpanded ? undefined : 3}
          >
            {item.description || 'No description provided'}
          </Text>
          {item.description && item.description.length > 100 && (
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

        {/* Seller Info Section */}
        <View style={styles.sellerSection}>
          <Text style={styles.sectionTitle}>Seller Information</Text>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerInitials}>
                {item.seller.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            <View style={styles.sellerDetails}>
              <Text style={styles.sellerName}>{item.seller}</Text>
              <View style={styles.sellerLocation}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.additionalDetails}>
          <Text style={styles.postedDate}>{formatPostedDate(item.postedDate)}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={handleWishlistToggle}
          >
            <Ionicons 
              name={isWishlisted ? "heart" : "heart-outline"} 
              size={20} 
              color={isWishlisted ? "#ff4444" : "#666"} 
            />
            <Text style={[
              styles.wishlistText,
              isWishlisted && styles.wishlistTextActive
            ]}>
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => onMessageSeller(item.id)}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Seller</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  reportButton: {
    padding: 4,
  },
  content: {
    flex: 1,
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
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#06498e',
    marginRight: 12,
  },
  negotiableBadge: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#06498e',
  },
  negotiableText: {
    fontSize: 12,
    color: '#06498e',
    fontWeight: '600',
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
  // Seller Section
  sellerSection: {
    ...globalStyles.paddingSection,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#06498e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sellerInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellerDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sellerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
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
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    ...globalStyles.paddingActionButtons,
    gap: 12,
  },
  wishlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  wishlistText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: '600',
  },
  wishlistTextActive: {
    color: '#ff4444',
  },
  contactButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#06498e',
  },
  contactButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
});

export default ItemDetailsPage;
