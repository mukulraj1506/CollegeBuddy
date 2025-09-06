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
        <Text style={styles.sectionTitle}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Scientific Calculator or Calculus Textbook"
          value={formData.title}
          onChangeText={(value) => handleInputChange('title', value)}
          maxLength={100}
        />
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your item in detail..."
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Photos Upload Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <Text style={styles.sectionSubtitle}>Add up to 10 photos. First photo will be the cover image.</Text>

        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo }} style={styles.photoPreview} />
              {index === 0 && (
                <View style={styles.coverBadge}>
                  <Text style={styles.coverText}>Cover</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.removePhotoButton}
                onPress={() => handleRemovePhoto(index)}
              >
                <Ionicons name="close-circle" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          ))}

          {photos.length < 10 && (
            <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
              <Ionicons name="camera" size={24} color="#06498e" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.photoOptions}>
          <TouchableOpacity style={styles.photoOption} onPress={() => console.log('Camera')}>
            <Ionicons name="camera" size={20} color="#06498e" />
            <Text style={styles.photoOptionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoOption} onPress={() => console.log('Gallery')}>
            <Ionicons name="images" size={20} color="#06498e" />
            <Text style={styles.photoOptionText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Section */}
      <View style={[styles.section, { zIndex: showCategoryDropdown ? 1000 : 1 }]}>
        <Text style={styles.sectionTitle}>Category *</Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={globalStyles.dropdown}
            onPress={handleCategoryDropdownToggle}
          >
            <Text style={[
              globalStyles.dropdownText,
              !formData.category && globalStyles.dropdownPlaceholder
            ]}>
              {formData.category || 'Select Category'}
            </Text>
            <Ionicons
              name={showCategoryDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
              style={globalStyles.dropdownIcon}
            />
          </TouchableOpacity>

          {showCategoryDropdown && (
            <View style={[globalStyles.dropdownList, { position: 'absolute', top: 50 }]}>
              {/* Search Bar */}
              <View style={globalStyles.searchContainer}>
                <Ionicons name="search" size={16} color="#666" style={globalStyles.searchIcon} />
                <TextInput
                  style={globalStyles.searchInput}
                  placeholder="Search categories..."
                  placeholderTextColor="#999"
                  value={categorySearch}
                  onChangeText={setCategorySearch}
                  autoFocus={true}
                />
                {categorySearch.length > 0 && (
                  <TouchableOpacity onPress={() => setCategorySearch('')}>
                    <Ionicons name="close-circle" size={16} color="#666" />
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
                      style={globalStyles.dropdownItem}
                      onPress={() => {
                        handleInputChange('category', category);
                        setShowCategoryDropdown(false);
                        setCategorySearch('');
                      }}
                    >
                      <Text style={globalStyles.dropdownItemText}>{category}</Text>
                      {formData.category === category && (
                        <Ionicons name="checkmark" size={20} color="#06498e" />
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
        <Text style={styles.sectionTitle}>Condition *</Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={globalStyles.dropdown}
            onPress={handleConditionDropdownToggle}
          >
            <Text style={[
              globalStyles.dropdownText,
              !formData.condition && globalStyles.dropdownPlaceholder
            ]}>
              {formData.condition || 'Select Condition'}
            </Text>
            <Ionicons
              name={showConditionDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
              style={globalStyles.dropdownIcon}
            />
          </TouchableOpacity>

          {showConditionDropdown && (
            <View style={[globalStyles.dropdownList, { position: 'absolute', top: 50 }]}>
              {/* Search Bar */}
              <View style={globalStyles.searchContainer}>
                <Ionicons name="search" size={16} color="#666" style={globalStyles.searchIcon} />
                <TextInput
                  style={globalStyles.searchInput}
                  placeholder="Search conditions..."
                  placeholderTextColor="#999"
                  value={conditionSearch}
                  onChangeText={setConditionSearch}
                  autoFocus={true}
                />
                {conditionSearch.length > 0 && (
                  <TouchableOpacity onPress={() => setConditionSearch('')}>
                    <Ionicons name="close-circle" size={16} color="#666" />
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
                      style={globalStyles.dropdownItem}
                      onPress={() => {
                        handleInputChange('condition', condition);
                        setShowConditionDropdown(false);
                        setConditionSearch('');
                      }}
                    >
                      <Text style={globalStyles.dropdownItemText}>{condition}</Text>
                      {formData.condition === condition && (
                        <Ionicons name="checkmark" size={20} color="#06498e" />
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
        <Text style={styles.sectionTitle}>Price *</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={[styles.input, styles.priceInput]}
            placeholder="0.00"
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
            formData.negotiable && globalStyles.checkboxChecked
          ]}>
            {formData.negotiable && (
              <Ionicons name="checkmark" size={16} style={globalStyles.checkboxIcon} />
            )}
          </View>
          <Text style={globalStyles.checkboxLabel}>Price is negotiable</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Upload Item</Text>
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
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  // Input styles
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
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
    backgroundColor: '#06498e',
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
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#06498e',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9ff',
  },
  addPhotoText: {
    fontSize: 12,
    color: '#06498e',
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
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
  },
  photoOptionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#06498e',
    fontWeight: '500',
  },
  // Price styles
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  priceInput: {
    flex: 1,
    borderWidth: 0,
    margin: 0,
  },
  // Submit button styles
  submitButton: {
    backgroundColor: '#06498e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SellNewItem;