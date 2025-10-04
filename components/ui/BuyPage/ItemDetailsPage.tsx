import { useTheme } from '@/contexts/ThemeContext';
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
import { SafeAreaView } from 'react-native-safe-area-context';
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
  isInWishlist?: boolean;
}

const ItemDetailsPage: React.FC<ItemDetailsPageProps> = ({
  item,
  onMessageSeller,
  onAddToWishlist,
  onShare,
  onReport,
  isInWishlist = false,
}) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Item Details</Text>
        <TouchableOpacity onPress={handleReport} style={styles.reportButton}>
          <Ionicons name="flag-outline" size={20} color={colors.error} />
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
            <View style={[styles.noImageContainer, { backgroundColor: colors.surface }]}>
              <Ionicons name="image-outline" size={48} color={colors.textSecondary} />
              <Text style={[styles.noImageText, { color: colors.textSecondary }]}>No images available</Text>
            </View>
          )}
        </View>

        {/* Title + Price Section */}
        <View style={styles.titlePriceSection}>
          <Text style={[styles.itemTitle, { color: colors.text }]}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
            {item.negotiable === true && (
              <View style={[styles.negotiableBadge, { backgroundColor: colors.info }]}>
                <Text style={[styles.negotiableText, { color: colors.buttonText }]}>Negotiable</Text>
              </View>
            )}
          </View>
        </View>

        {/* Condition & Category Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Condition:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{item.condition}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Category:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{item.category || 'Not specified'}</Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text 
            style={[styles.description, { color: colors.text }]}
            numberOfLines={isDescriptionExpanded ? undefined : 3}
          >
            {item.description || 'No description provided'}
          </Text>
          {item.description && item.description.length > 100 && (
            <TouchableOpacity 
              onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              style={styles.expandButton}
            >
              <Text style={[styles.expandButtonText, { color: colors.primary }]}>
                {isDescriptionExpanded ? 'Show Less' : 'Show More'}
              </Text>
              <Ionicons 
                name={isDescriptionExpanded ? "chevron-up" : "chevron-down"} 
                size={16} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Seller Info Section */}
        <View style={styles.sellerSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Seller Information</Text>
          <View style={styles.sellerInfo}>
            <View style={[styles.sellerAvatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.sellerInitials, { color: colors.buttonText }]}>
                {item.seller.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            <View style={styles.sellerDetails}>
              <Text style={[styles.sellerName, { color: colors.text }]}>{item.seller}</Text>
              <View style={styles.sellerLocation}>
                <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                <Text style={[styles.locationText, { color: colors.textSecondary }]}>{item.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.additionalDetails}>
          <Text style={[styles.postedDate, { color: colors.textSecondary }]}>{formatPostedDate(item.postedDate)}</Text>
        </View>

      </ScrollView>

      {/* Fixed Action Buttons */}
      <View style={[styles.fixedActionButtons, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.wishlistButton, { borderColor: colors.border, backgroundColor: colors.card }]}
          onPress={handleWishlistToggle}
        >
          <Ionicons 
            name={isWishlisted ? "heart" : "heart-outline"} 
            size={20} 
            color={isWishlisted ? colors.error : colors.textSecondary} 
          />
          <Text style={[
            styles.wishlistText,
            { color: isWishlisted ? colors.error : colors.textSecondary }
          ]}>
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: colors.primary }]}
          onPress={() => onMessageSeller(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color={colors.buttonText} />
          <Text style={[styles.contactButtonText, { color: colors.buttonText }]}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '100%',
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
    paddingBottom: 120, // Increased padding to prevent content from being hidden behind fixed buttons
    width: '100%',
  },
  // Photos Section
  photosSection: {
    marginBottom: 20,
  },
  imageCarousel: {
    height: Math.min(screenWidth * 0.75, 300), // Responsive height based on screen width
  },
  imageContainer: {
    width: screenWidth,
    height: Math.min(screenWidth * 0.75, 300), // Responsive height based on screen width
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
    height: Math.min(screenWidth * 0.75, 300), // Responsive height based on screen width
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
    fontSize: Math.min(screenWidth * 0.06, 24), // Responsive font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: Math.min(screenWidth * 0.075, 30), // Responsive line height
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: Math.min(screenWidth * 0.07, 28), // Responsive font size
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
    marginTop: 20,
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
    width: '100%',
    maxWidth: '100%',
  },
  wishlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  wishlistText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
  contactButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  contactButtonText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
});

export default ItemDetailsPage;
