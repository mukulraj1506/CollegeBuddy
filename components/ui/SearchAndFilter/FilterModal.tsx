import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { BuyFilters, Category, Condition, ItemStatus, SellFilters } from './types';

// Common filter options
const CONDITIONS: Condition[] = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
const CATEGORIES: Category[] = ['Textbooks', 'Electronics', 'Clothing', 'Accessories', 'Other'];

// Buy page specific props
interface BuyFilterModalProps {
  visible: boolean;
  filters: BuyFilters;
  onClose: () => void;
  onApplyFilters: (filters: BuyFilters) => void;
  onClearFilters: () => void;
}

// Sell page specific props
interface SellFilterModalProps {
  visible: boolean;
  filters: SellFilters;
  onClose: () => void;
  onApplyFilters: (filters: SellFilters) => void;
  onClearFilters: () => void;
}

// Buy Filter Modal
export const BuyFilterModal: React.FC<BuyFilterModalProps> = ({
  visible,
  filters,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  const [localFilters, setLocalFilters] = React.useState<BuyFilters>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const toggleCondition = (condition: Condition) => {
    const currentConditions = localFilters.condition || [];
    const newConditions = currentConditions.includes(condition)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition];
    setLocalFilters({ ...localFilters, condition: newConditions });
  };

  const toggleCategory = (category: Category) => {
    const currentCategories = localFilters.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    setLocalFilters({ ...localFilters, category: newCategories });
  };

  const [selectedFilter, setSelectedFilter] = React.useState<string>('priceRange');

  const filterOptions = [
    { key: 'priceRange', title: 'Price Range' },
    { key: 'datePosted', title: 'Date Posted' },
    { key: 'priceSort', title: 'Price Sort' },
    { key: 'condition', title: 'Condition' },
    { key: 'category', title: 'Category' },
  ];

  const renderFilterContent = () => {
    switch (selectedFilter) {
       case 'priceRange':
         return (
           <View style={styles.filterContent}>
             <View style={styles.priceRangeContainer}>
               <TextInput
                 style={styles.priceInput}
                 placeholder="Min"
                 keyboardType="numeric"
                 value={localFilters.priceRange?.min?.toString() || ''}
                 onChangeText={(text) => {
                   const min = text ? parseInt(text) : undefined;
                   setLocalFilters({
                     ...localFilters,
                     priceRange: { ...localFilters.priceRange, min: min || 0 }
                   });
                 }}
               />
               <Text style={styles.priceSeparator}>to</Text>
               <TextInput
                 style={styles.priceInput}
                 placeholder="Max"
                 keyboardType="numeric"
                 value={localFilters.priceRange?.max?.toString() || ''}
                 onChangeText={(text) => {
                   const max = text ? parseInt(text) : undefined;
                   setLocalFilters({
                     ...localFilters,
                     priceRange: { ...localFilters.priceRange, max: max || 0 }
                   });
                 }}
               />
             </View>
           </View>
         );

      case 'datePosted':
        return (
          <View style={styles.filterContent}>
            <View style={styles.optionContainer}>
              {(['asc', 'desc'] as const).map((order) => (
                <TouchableOpacity
                  key={order}
                  style={[
                    styles.optionButton,
                    localFilters.datePosted === order && styles.selectedOption
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, datePosted: order })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.datePosted === order && styles.selectedOptionText
                  ]}>
                    {order === 'asc' ? 'Oldest First' : 'Newest First'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'priceSort':
        return (
          <View style={styles.filterContent}>
            <View style={styles.optionContainer}>
              {(['low-to-high', 'high-to-low'] as const).map((sort) => (
                <TouchableOpacity
                  key={sort}
                  style={[
                    styles.optionButton,
                    localFilters.priceSort === sort && styles.selectedOption
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, priceSort: sort })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.priceSort === sort && styles.selectedOptionText
                  ]}>
                    {sort === 'low-to-high' ? 'Low to High' : 'High to Low'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'condition':
        return (
          <View style={styles.filterContent}>
            <View style={styles.chipContainer}>
              {CONDITIONS.map((condition) => (
                <TouchableOpacity
                  key={condition}
                  style={[
                    styles.chip,
                    localFilters.condition?.includes(condition) && styles.selectedChip
                  ]}
                  onPress={() => toggleCondition(condition)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.condition?.includes(condition) && styles.selectedChipText
                  ]}>
                    {condition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'category':
        return (
          <View style={styles.filterContent}>
            <View style={styles.chipContainer}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.chip,
                    localFilters.category?.includes(category) && styles.selectedChip
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.category?.includes(category) && styles.selectedChipText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Side - Filter Categories */}
          <View style={styles.leftSide}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterCategory,
                  selectedFilter === option.key && styles.selectedFilterCategory
                ]}
                onPress={() => setSelectedFilter(option.key)}
              >
                <Text style={[
                  styles.filterCategoryText,
                  selectedFilter === option.key && styles.selectedFilterCategoryText
                ]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Separator Line */}
          <View style={styles.separator} />

          {/* Right Side - Filter Content */}
          <View style={styles.rightSide}>
            {renderFilterContent()}
          </View>
        </View>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Sell Filter Modal
export const SellFilterModal: React.FC<SellFilterModalProps> = ({
  visible,
  filters,
  onClose,
  onApplyFilters,
  onClearFilters,
}) => {
  const [localFilters, setLocalFilters] = React.useState<SellFilters>(filters);
  const [selectedFilter, setSelectedFilter] = React.useState<string>('datePosted');

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const toggleStatus = (status: ItemStatus) => {
    const currentStatuses = localFilters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    setLocalFilters({ ...localFilters, status: newStatuses });
  };

  const toggleCondition = (condition: Condition) => {
    const currentConditions = localFilters.condition || [];
    const newConditions = currentConditions.includes(condition)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition];
    setLocalFilters({ ...localFilters, condition: newConditions });
  };

  const toggleCategory = (category: Category) => {
    const currentCategories = localFilters.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    setLocalFilters({ ...localFilters, category: newCategories });
  };

  const filterOptions = [
    { key: 'datePosted', title: 'Date Posted' },
    { key: 'status', title: 'Status' },
    { key: 'condition', title: 'Condition' },
    { key: 'category', title: 'Category' },
  ];

  const renderFilterContent = () => {
    switch (selectedFilter) {
      case 'datePosted':
        return (
          <View style={styles.filterContent}>
            <View style={styles.optionContainer}>
              {(['asc', 'desc'] as const).map((order) => (
                <TouchableOpacity
                  key={order}
                  style={[
                    styles.optionButton,
                    localFilters.datePosted === order && styles.selectedOption
                  ]}
                  onPress={() => setLocalFilters({ ...localFilters, datePosted: order })}
                >
                  <Text style={[
                    styles.optionText,
                    localFilters.datePosted === order && styles.selectedOptionText
                  ]}>
                    {order === 'asc' ? 'Oldest First' : 'Newest First'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'status':
        return (
          <View style={styles.filterContent}>
            <View style={styles.chipContainer}>
              {(['Active', 'Sold'] as ItemStatus[]).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.chip,
                    localFilters.status?.includes(status) && styles.selectedChip
                  ]}
                  onPress={() => toggleStatus(status)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.status?.includes(status) && styles.selectedChipText
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'condition':
        return (
          <View style={styles.filterContent}>
            <View style={styles.chipContainer}>
              {CONDITIONS.map((condition) => (
                <TouchableOpacity
                  key={condition}
                  style={[
                    styles.chip,
                    localFilters.condition?.includes(condition) && styles.selectedChip
                  ]}
                  onPress={() => toggleCondition(condition)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.condition?.includes(condition) && styles.selectedChipText
                  ]}>
                    {condition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'category':
        return (
          <View style={styles.filterContent}>
            <View style={styles.chipContainer}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.chip,
                    localFilters.category?.includes(category) && styles.selectedChip
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text style={[
                    styles.chipText,
                    localFilters.category?.includes(category) && styles.selectedChipText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Side - Filter Categories */}
          <View style={styles.leftSide}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterCategory,
                  selectedFilter === option.key && styles.selectedFilterCategory
                ]}
                onPress={() => setSelectedFilter(option.key)}
              >
                <Text style={[
                  styles.filterCategoryText,
                  selectedFilter === option.key && styles.selectedFilterCategoryText
                ]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Separator Line */}
          <View style={styles.separator} />

          {/* Right Side - Filter Content */}
          <View style={styles.rightSide}>
            {renderFilterContent()}
          </View>
        </View>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06498e',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  clearButton: {
    fontSize: 16,
    color: '#06498e',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSide: {
    width: 120,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  rightSide: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  separator: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  filterCategory: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedFilterCategory: {
    backgroundColor: '#f0f8ff',
    borderRightWidth: 3,
    borderRightColor: '#06498e',
  },
  filterCategoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedFilterCategoryText: {
    color: '#06498e',
    fontWeight: '600',
  },
  filterContent: {
    flex: 1,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#06498e',
    marginBottom: 20,
  },
  priceRangeContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  priceSeparator: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
    borderColor: '#06498e',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#06498e',
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  selectedChip: {
    backgroundColor: '#f0f8ff',
    borderColor: '#06498e',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#06498e',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  applyButton: {
    backgroundColor: '#06498e',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
