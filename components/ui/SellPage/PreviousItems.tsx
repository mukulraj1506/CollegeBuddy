import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import NoResultsFound from '../NoResultsFound';
import { SearchAndFilterState, SearchBar, SellFilterModal, SellFilters } from '../SearchAndFilter';
import PreviousItemsCard from './PreviousItemsCard';

interface PreviousItemsProps {
  items: Array<{
    id: string;
    name: string;
    price: string;
    status: 'Active' | 'Sold';
    date: string;
    condition?: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
    category?: 'Textbooks' | 'Electronics' | 'Clothing' | 'Accessories' | 'Other';
  }>;
  onItemAction?: (itemId: string) => void;
}

const PreviousItems: React.FC<PreviousItemsProps> = ({ items, onItemAction }) => {
  // Search and filter state
  const [searchAndFilter, setSearchAndFilter] = useState<SearchAndFilterState<SellFilters>>({
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
        item.name.toLowerCase().includes(query)
      );
    }

    // Apply filters
    const { filters } = searchAndFilter;

    // Status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(item =>
        filters.status!.includes(item.status)
      );
    }

    // Condition filter
    if (filters.condition && filters.condition.length > 0 && items[0]?.condition) {
      filtered = filtered.filter(item =>
        item.condition && filters.condition!.includes(item.condition)
      );
    }

    // Category filter
    if (filters.category && filters.category.length > 0 && items[0]?.category) {
      filtered = filtered.filter(item =>
        item.category && filters.category!.includes(item.category)
      );
    }

    // Date posted sort
    if (filters.datePosted) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
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

  const handleApplyFilters = (filters: SellFilters) => {
    setSearchAndFilter(prev => ({ ...prev, filters }));
  };

  const handleClearFilters = () => {
    setSearchAndFilter(prev => ({ ...prev, filters: {}, searchQuery: '' }));
    setInputValue('');
  };

  return (
    <>
      {/* Search and Filter Bar */}
      <SearchBar
        searchQuery={inputValue}
        onSearchChange={handleSearchChange}
        onSearchPress={handleSearchPress}
        onFilterPress={handleFilterPress}
        placeholder="Search your items..."
      />

      {/* Items List or No Results */}
      {filteredItems.length > 0 ? (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {filteredItems.map((item) => (
            <PreviousItemsCard
              key={item.id}
              item={item}
              onActionPress={() => onItemAction?.(item.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <NoResultsFound
          title="No items found"
          subtitle="Try adjusting your search terms or filter criteria to find your items."
          icon="search-outline"
          onClearFilters={handleClearFilters}
          showClearButton={searchAndFilter.searchQuery !== '' || Object.keys(searchAndFilter.filters).length > 0}
        />
      )}

      {/* Filter Modal */}
      <SellFilterModal
        visible={searchAndFilter.isFilterModalOpen}
        filters={searchAndFilter.filters}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
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

export default PreviousItems;
