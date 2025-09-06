import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchPress: () => void;
  onFilterPress: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSearchPress,
  onFilterPress,
  placeholder = 'Search items...',
}) => {
  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          onSubmitEditing={onSearchPress}
        />
        <TouchableOpacity onPress={onSearchPress} style={styles.searchIconButton}>
          <Ionicons name="search" size={20} color="#06498e" />
        </TouchableOpacity>
      </View>

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons name="filter" size={20} color="#06498e" />
        <Text style={styles.filterLabel}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginRight: 12,
    minHeight: 44,
  },
  searchIconButton: {
    padding: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minHeight: 44,
  },
  filterLabel: {
    marginLeft: 6,
    fontSize: 14,
    color: '#06498e',
    fontWeight: '500',
  },
});

export default SearchBar;
