// Common filter types
export type SortOrder = 'asc' | 'desc';
export type Condition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
export type Category = 'Textbooks' | 'Electronics' | 'Clothing' | 'Accessories' | 'Other';

// Price range filter
export interface PriceRange {
  min: number;
  max: number;
}

// Buy page filters
export interface BuyFilters {
  priceRange?: PriceRange;
  datePosted?: SortOrder;
  priceSort?: 'low-to-high' | 'high-to-low';
  condition?: Condition[];
  category?: Category[];
}

// Sell page filters (for previous items)
export type ItemStatus = 'Active' | 'Sold';

export interface SellFilters {
  datePosted?: SortOrder;
  status?: ItemStatus[];
  condition?: Condition[];
  category?: Category[];
}

// Search and filter state
export interface SearchAndFilterState<T> {
  searchQuery: string;
  filters: T;
  isFilterModalOpen: boolean;
}
