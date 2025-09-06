import React, { useMemo, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import ItemCard from '../BuyPage/ItemCard';
import NoResultsFound from '../NoResultsFound';
import { BuyFilterModal, BuyFilters, SearchAndFilterState, SearchBar } from '../SearchAndFilter';

interface Item {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  category: 'Textbooks' | 'Electronics' | 'Clothing' | 'Accessories' | 'Other';
  datePosted: string;
  image: any;
  seller: string;
  location: string;
  negotiable?: boolean;
  description?: string;
  images?: string[];
}

interface ItemListProps {
  items: Item[];
  placeholder?: {
    title: string;
    subtitle: string;
    icon?: string;
  };
  onItemPress?: (item: Item) => void;
  showFilters?: boolean;
  showStatus?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ 
  items, 
  placeholder,
  onItemPress,
  showFilters = true,
  showStatus = false
}) => {
  // Search and filter state
  const [searchAndFilter, setSearchAndFilter] = useState<SearchAndFilterState<BuyFilters>>({
    searchQuery: '',
    filters: {},
    isFilterModalOpen: false,
  });

  // Separate state for the input value (what user types)
  const [inputValue, setInputValue] = useState('');

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply search query
    if (searchAndFilter.searchQuery) {
      const query = searchAndFilter.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.seller.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }

    // Apply filters
    const { filters } = searchAndFilter;

    // Price range filter
    if (filters.priceRange && filters.priceRange.length > 0) {
      filtered = filtered.filter(item => {
        const price = item.priceValue;
        return filters.priceRange!.some(range => {
          switch (range) {
            case 'under-25': return price < 25;
            case '25-50': return price >= 25 && price <= 50;
            case '50-100': return price >= 50 && price <= 100;
            case 'over-100': return price > 100;
            default: return true;
          }
        });
      });
    }

    // Condition filter
    if (filters.condition && filters.condition.length > 0) {
      filtered = filtered.filter(item =>
        filters.condition!.includes(item.condition)
      );
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(item =>
        filters.category!.includes(item.category)
      );
    }

    // Date posted sort
    if (filters.datePosted) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.datePosted);
        const dateB = new Date(b.datePosted);
        return filters.datePosted === 'asc' 
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }

    return filtered;
  }, [searchAndFilter, items]);

  // Event handlers
  const handleSearchChange = (query: string) => {
    setInputValue(query);
  };

  const handleSearchPress = () => {
    setSearchAndFilter(prev => ({ ...prev, searchQuery: inputValue }));
  };

  const handleFilterPress = () => {
    setSearchAndFilter(prev => ({ ...prev, isFilterModalOpen: true }));
  };

  const handleCloseFilterModal = () => {
    setSearchAndFilter(prev => ({ ...prev, isFilterModalOpen: false }));
  };

  const handleApplyFilters = (filters: BuyFilters) => {
    setSearchAndFilter(prev => ({ ...prev, filters }));
  };

  const handleClearFilters = () => {
    setSearchAndFilter(prev => ({ ...prev, filters: {}, searchQuery: '' }));
    setInputValue('');
  };

  const handleItemPress = (item: Item) => {
    onItemPress?.(item);
  };

  return (
    <>
      {/* Search and Filter Bar */}
      {showFilters && (
        <SearchBar
          searchQuery={inputValue}
          onSearchChange={handleSearchChange}
          onSearchPress={handleSearchPress}
          onFilterPress={handleFilterPress}
          placeholder="Search items..."
        />
      )}

      {/* Items List or No Results */}
      {filteredItems.length > 0 ? (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onPress={handleItemPress}
              showStatus={showStatus}
            />
          ))}
        </ScrollView>
      ) : (
        <NoResultsFound
          title={placeholder?.title || "No items found"}
          subtitle={placeholder?.subtitle || "Try adjusting your search terms or filter criteria to find items."}
          icon={placeholder?.icon || "search-outline"}
          onClearFilters={handleClearFilters}
          showClearButton={searchAndFilter.searchQuery !== '' || Object.keys(searchAndFilter.filters).length > 0}
        />
      )}

      {/* Filter Modal */}
      {showFilters && (
        <BuyFilterModal
          visible={searchAndFilter.isFilterModalOpen}
          filters={searchAndFilter.filters}
          onClose={handleCloseFilterModal}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default ItemList;
