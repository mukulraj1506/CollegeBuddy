import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      {/* Search Input */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          onSubmitEditing={onSearchPress}
        />
        <TouchableOpacity onPress={onSearchPress} style={styles.searchIconButton}>
          <Ionicons name="search" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Button */}
      <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface }]} onPress={onFilterPress}>
        <Ionicons name="filter" size={20} color={colors.primary} />
        <Text style={[styles.filterLabel, { color: colors.primary }]}>Filter</Text>
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
    borderBottomWidth: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
  },
  filterLabel: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SearchBar;
