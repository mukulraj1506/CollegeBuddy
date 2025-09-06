import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Dropdown styles
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
    position: 'relative',
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dropdownSelected: {
    color: '#06498e',
    fontWeight: '500',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  dropdownItemSelectedText: {
    color: '#06498e',
    fontWeight: '500',
  },

  // Checkbox styles
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#06498e',
    borderColor: '#06498e',
  },
  checkboxIcon: {
    color: '#fff',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  checkboxDisabledText: {
    color: '#999',
  },

  // Search bar styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
  },
  noResultsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },

  // Shared padding classes
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
  paddingCard: {
    padding: 12,
  },
  paddingSection: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  paddingHeader: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  paddingContent: {
    paddingHorizontal: 10,
    paddingTop:  10,
  },
  paddingActionButtons: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
