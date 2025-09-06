import React, { useMemo, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import ItemCard from '../BuyPage/ItemCard';
import NoResultsFound from '../NoResultsFound';
import { BuyFilterModal, BuyFilters, SearchAndFilterState, SearchBar } from '../SearchAndFilter';

const BuyTab: React.FC = () => {
  // Search and filter state
  const [searchAndFilter, setSearchAndFilter] = useState<SearchAndFilterState<BuyFilters>>({
    searchQuery: '',
    filters: {},
    isFilterModalOpen: false,
  });

  // Separate state for the input value (what user types)
  const [inputValue, setInputValue] = useState('');

  // Sample data for items (with additional properties for filtering)
  const sampleItems = [
    {
      id: '1',
      name: 'Calculus Textbook',
      price: '$45.00',
      priceValue: 45,
      condition: 'Like New' as const,
      category: 'Textbooks' as const,
      datePosted: '2024-01-15',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'John D.',
      location: 'Engineering Building'
    },
    {
      id: '2',
      name: 'Scientific Calculator',
      price: '$25.00',
      priceValue: 25,
      condition: 'Good' as const,
      category: 'Electronics' as const,
      datePosted: '2024-01-10',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Sarah M.',
      location: 'Math Department'
    },
    {
      id: '3',
      name: 'Lab Coat',
      price: '$15.00',
      priceValue: 15,
      condition: 'New' as const,
      category: 'Clothing' as const,
      datePosted: '2024-01-05',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Mike R.',
      location: 'Science Lab'
    },
    {
      id: '4',
      name: 'Programming Notes',
      price: '$8.00',
      priceValue: 8,
      condition: 'Good' as const,
      category: 'Textbooks' as const,
      datePosted: '2024-01-20',
      image: require('@/assets/images/HomePage/HomePage.png'),
      seller: 'Alex K.',
      location: 'Computer Science'
    }
  ];

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = [...sampleItems];

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
    if (filters.priceRange) {
      filtered = filtered.filter(item =>
        item.priceValue >= filters.priceRange!.min &&
        item.priceValue <= filters.priceRange!.max
      );
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

    // Price sort
    if (filters.priceSort) {
      filtered.sort((a, b) => {
        return filters.priceSort === 'low-to-high'
          ? a.priceValue - b.priceValue
          : b.priceValue - a.priceValue;
      });
    }

    return filtered;
  }, [searchAndFilter]);

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

  return (
    <>
      {/* Search and Filter Bar */}
      <SearchBar
        searchQuery={inputValue}
        onSearchChange={handleSearchChange}
        onSearchPress={handleSearchPress}
        onFilterPress={handleFilterPress}
        placeholder="Search items..."
      />

      {/* Items List or No Results */}
      {filteredItems.length > 0 ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ScrollView>
      ) : (
        <NoResultsFound
          title="No items found"
          subtitle="Try adjusting your search terms or filter criteria to find what you're looking for."
          icon="search-outline"
          onClearFilters={handleClearFilters}
          showClearButton={searchAndFilter.searchQuery !== '' || Object.keys(searchAndFilter.filters).length > 0}
        />
      )}

      {/* Filter Modal */}
      <BuyFilterModal
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
  content: {
    flex: 1,
    ...globalStyles.paddingContent,
  },
});

export default BuyTab;
