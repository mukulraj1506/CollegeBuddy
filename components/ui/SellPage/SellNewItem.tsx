import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

interface SellNewItemProps {
  onSubmit?: (formData: any) => void;
}

const SellNewItem: React.FC<SellNewItemProps> = ({ onSubmit }) => {
  const { colors } = useTheme();
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    negotiable: false,
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [conditionSearch, setConditionSearch] = useState('');

  const categories = ['Books', 'Stationery', 'Electronics', 'Clothing', 'Sports', 'Others'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  // Photo handling functions
  const handleAddPhoto = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  // Form handling functions
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.({ ...formData, photos });
  };

  // Filter functions for search
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredConditions = conditions.filter(condition =>
    condition.toLowerCase().includes(conditionSearch.toLowerCase())
  );

  // Reset search when dropdown closes
  const handleCategoryDropdownToggle = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowConditionDropdown(false);
    if (!showCategoryDropdown) {
      setCategorySearch('');
    }
  };

  const handleConditionDropdownToggle = () => {
    setShowConditionDropdown(!showConditionDropdown);
    setShowCategoryDropdown(false);
    if (!showConditionDropdown) {
      setConditionSearch('');
    }
  };

  return (
    <ScrollView
      style={styles.formContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ overflow: 'visible' }}
    >
      {/* Title Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Title <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="e.g., Scientific Calculator or Calculus Textbook"
          placeholderTextColor={colors.textSecondary}
          value={formData.title}
          onChangeText={(value) => handleInputChange('title', value)}
          maxLength={100}
        />
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Description <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.textArea, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text }]}
          placeholder="Describe your item in detail..."
          placeholderTextColor={colors.textSecondary}
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Photos Upload Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Photos</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Add up to 10 photos. First photo will be the cover image.</Text>

        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo }} style={styles.photoPreview} />
              {index === 0 && (
                <View style={[styles.coverBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.coverText}>Cover</Text>
                </View>
              )}
              <TouchableOpacity
                style={[styles.removePhotoButton, { backgroundColor: colors.card }]}
                onPress={() => handleRemovePhoto(index)}
              >
                <Ionicons name="close-circle" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))}

          {photos.length < 10 && (
            <TouchableOpacity style={[styles.addPhotoButton, { borderColor: colors.primary, backgroundColor: colors.surface }]} onPress={handleAddPhoto}>
              <Ionicons name="camera" size={24} color={colors.primary} />
              <Text style={[styles.addPhotoText, { color: colors.primary }]}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.photoOptions}>
          <TouchableOpacity style={[styles.photoOption, { backgroundColor: colors.secondary }]} onPress={() => console.log('Camera')}>
            <Ionicons name="camera" size={20} color={colors.primary} />
            <Text style={[styles.photoOptionText, { color: colors.primary }]}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.photoOption, { backgroundColor: colors.secondary }]} onPress={() => console.log('Gallery')}>
            <Ionicons name="images" size={20} color={colors.primary} />
            <Text style={[styles.photoOptionText, { color: colors.primary }]}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Section */}
      <View style={[styles.section, { zIndex: showCategoryDropdown ? 1000 : 1 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Category <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
        </Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={[globalStyles.dropdown, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}
            onPress={handleCategoryDropdownToggle}
          >
            <Text style={[
              globalStyles.dropdownText,
              { color: colors.text },
              !formData.category && [globalStyles.dropdownPlaceholder, { color: colors.textSecondary }]
            ]}>
              {formData.category || 'Select Category'}
            </Text>
            <Ionicons
              name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.textSecondary}
              style={globalStyles.dropdownIcon}
            />
          </TouchableOpacity>

          {showCategoryDropdown && (
            <View style={[globalStyles.dropdownList, { position: 'absolute', top: 50, backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
              {/* Search Bar */}
              <View style={styles.searchWrapper}>
                <TextInput
                  style={[
                    styles.searchInput, 
                    { 
                      backgroundColor: colors.inputBackground, 
                      borderColor: colors.inputBorder, 
                      color: colors.text,
                      paddingLeft: 50, // Make space for search icon on the left
                      paddingRight: 50, // Make space for close icon on the right
                    }
                  ]}
                  placeholder="Search categories..."
                  placeholderTextColor={colors.textSecondary}
                  value={categorySearch}
                  onChangeText={setCategorySearch}
                  autoFocus={true}
                />
                <TouchableOpacity style={styles.searchIconAbsolute}>
                  <Ionicons name="search" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
                {categorySearch.length > 0 && (
                  <TouchableOpacity 
                    style={styles.closeIconAbsolute}
                    onPress={() => setCategorySearch('')}
                  >
                    <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView
                style={{ maxHeight: 160 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[globalStyles.dropdownItem, { borderBottomColor: colors.border }]}
                      onPress={() => {
                        handleInputChange('category', category);
                        setShowCategoryDropdown(false);
                        setCategorySearch('');
                      }}
                    >
                      <Text style={[globalStyles.dropdownItemText, { color: colors.text }]}>{category}</Text>
                      {formData.category === category && (
                        <Ionicons name="checkmark" size={20} color={colors.primary} />
                      )}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={globalStyles.noResultsContainer}>
                    <Text style={globalStyles.noResultsText}>No categories found</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Condition Section */}
      <View style={[styles.section, { zIndex: showConditionDropdown ? 1000 : 1 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Condition <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
        </Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={[globalStyles.dropdown, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}
            onPress={handleConditionDropdownToggle}
          >
            <Text style={[
              globalStyles.dropdownText,
              { color: colors.text },
              !formData.condition && [globalStyles.dropdownPlaceholder, { color: colors.textSecondary }]
            ]}>
              {formData.condition || 'Select Condition'}
            </Text>
            <Ionicons
              name={showConditionDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.textSecondary}
              style={globalStyles.dropdownIcon}
            />
          </TouchableOpacity>

          {showConditionDropdown && (
            <View style={[globalStyles.dropdownList, { position: 'absolute', top: 50, backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
              {/* Search Bar */}
              <View style={styles.searchWrapper}>
                <TextInput
                  style={[
                    styles.searchInput, 
                    { 
                      backgroundColor: colors.inputBackground, 
                      borderColor: colors.inputBorder, 
                      color: colors.text,
                      paddingLeft: 50, // Make space for search icon on the left
                      paddingRight: 50, // Make space for close icon on the right
                    }
                  ]}
                  placeholder="Search conditions..."
                  placeholderTextColor={colors.textSecondary}
                  value={conditionSearch}
                  onChangeText={setConditionSearch}
                  autoFocus={true}
                />
                <TouchableOpacity style={styles.searchIconAbsolute}>
                  <Ionicons name="search" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
                {conditionSearch.length > 0 && (
                  <TouchableOpacity 
                    style={styles.closeIconAbsolute}
                    onPress={() => setConditionSearch('')}
                  >
                    <Ionicons name="close-circle" size={16} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView
                style={{ maxHeight: 160 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                {filteredConditions.length > 0 ? (
                  filteredConditions.map((condition) => (
                    <TouchableOpacity
                      key={condition}
                      style={[globalStyles.dropdownItem, { borderBottomColor: colors.border }]}
                      onPress={() => {
                        handleInputChange('condition', condition);
                        setShowConditionDropdown(false);
                        setConditionSearch('');
                      }}
                    >
                      <Text style={[globalStyles.dropdownItemText, { color: colors.text }]}>{condition}</Text>
                      {formData.condition === condition && (
                        <Ionicons name="checkmark" size={20} color={colors.primary} />
                      )}
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={globalStyles.noResultsContainer}>
                    <Text style={globalStyles.noResultsText}>No conditions found</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Price Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Price <Text style={[styles.asterisk, { color: colors.error }]}>*</Text>
        </Text>
        <View style={[styles.priceContainer, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
          <Text style={[styles.currencySymbol, { color: colors.textSecondary, borderRightColor: colors.border }]}>₹</Text>
          <TextInput
            style={[styles.input, styles.priceInput, { color: colors.text }]}
            placeholder="0.00"
            placeholderTextColor={colors.textSecondary}
            value={formData.price}
            onChangeText={(value) => {
              // Only allow numbers and decimal point
              const numericValue = value.replace(/[^0-9.]/g, '');
              // Prevent multiple decimal points
              const parts = numericValue.split('.');
              const finalValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : numericValue;
              handleInputChange('price', finalValue);
            }}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={globalStyles.checkboxContainer}
          onPress={() => handleInputChange('negotiable', !formData.negotiable)}
        >
          <View style={[
            globalStyles.checkbox,
            { borderColor: colors.border, backgroundColor: colors.inputBackground },
            formData.negotiable && [globalStyles.checkboxChecked, { backgroundColor: colors.primary, borderColor: colors.primary }]
          ]}>
            {formData.negotiable && (
              <Ionicons name="checkmark" size={16} style={[globalStyles.checkboxIcon, { color: colors.buttonText }]} />
            )}
          </View>
          <Text style={[globalStyles.checkboxLabel, { color: colors.text }]}>Price is negotiable</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.buttonBackground }]} onPress={handleSubmit}>
        <Text style={[styles.submitButtonText, { color: colors.buttonText }]}>Upload Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    overflow: 'visible',
  },
  section: {
    marginBottom: 24,
    position: 'relative',
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  asterisk: {
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  // Input styles
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  // Photo upload styles
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoItem: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  coverBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  coverText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  removePhotoButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: 10,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  photoOptions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  photoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  photoOptionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  // Price styles
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRightWidth: 1,
  },
  priceInput: {
    flex: 1,
    borderWidth: 0,
    margin: 0,
  },
  // Submit button styles
  submitButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Search wrapper styles
  searchWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    height: 48,
  },
  searchIconAbsolute: {
    position: 'absolute',
    left: 16, // Position on the left side
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  closeIconAbsolute: {
    position: 'absolute',
    right: 12, // Exact same position as the caret icon
    top: '50%',
    transform: [{ translateY: -10 }], // Exact same transform as the caret icon
  },
});

export default SellNewItem;