import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Sample data for recently viewed items by day
const itemsByDay = {
  1: [
    { id: '1-1', discription: 'Learn learn driver is used on retainer', price: '$37.00', image: 'https://picsum.photos/200/300?random=1' },
    { id: '1-2', discription: 'Premium quality retainer with advanced features', price: '$57.00', image: 'https://picsum.photos/200/300?random=2' },
  ],
  2: [
    { id: '2-1', discription: 'High-performance driver tool with extended warranty', price: '$42.00', image: 'https://picsum.photos/200/300?random=3' },
    { id: '2-2', discription: 'Professional grade equipment for daily use', price: '$29.00', image: 'https://picsum.photos/200/300?random=4' },
  ],
  // Note: Days 3-14 are intentionally left empty to simulate no activity
  15: [
    { id: '15-1', discription: 'Weekend special offer product', price: '$49.00', image: 'https://picsum.photos/200/300?random=7' },
    { id: '15-2', discription: 'Premium weekend bundle package', price: '$99.00', image: 'https://picsum.photos/200/300?random=8' },
  ],
  25: [
    { id: '25-1', discription: 'End of month clearance item', price: '$25.00', image: 'https://picsum.photos/200/300?random=9' },
    { id: '25-2', discription: 'Monthly special limited edition', price: '$75.00', image: 'https://picsum.photos/200/300?random=10' },
  ],
};

// Get today's date
const today = new Date().getDate();

// Function to format date as "8 Sep"
const formatDate = (day) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${monthNames[8]}`; // September is index 8 (0-based)
};

export default function RecentlyReviewed() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState('today'); // 'today' or 'month'
  const [displayedItems, setDisplayedItems] = useState(itemsByDay[today] || []);

  // Generate calendar days (1-31)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  // Handle day selection
  const handleDaySelect = (day) => {
    setSelectedDate(day);
    
    // Update displayed items based on selected day
    if (itemsByDay[day]) {
      setDisplayedItems(itemsByDay[day]);
    } else {
      // Set to empty array if no items for this day
      setDisplayedItems([]);
    }
    
    // Stay in month view after selecting a day (don't switch to today view)
    setViewMode('month');
  };

  // Handle today button press
  const handleTodayPress = () => {
    setViewMode('today');
    setSelectedDate(today);
    // Check if today has items, otherwise set empty
    if (itemsByDay[today]) {
      setDisplayedItems(itemsByDay[today]);
    } else {
      setDisplayedItems([]);
    }
  };

  // Handle month button press
  const handleMonthPress = () => {
    setViewMode('month');
  };

  // Render item for recently viewed
  const renderRecentItem = ({ item }) => (
    <View style={styles.recentItem}>
      <Image source={{ uri: item.image }} style={styles.recentImage} />
      <Text style={styles.recentdisc} numberOfLines={3}>{item.discription}</Text>
      <Text style={styles.recentPrice}>{item.price}</Text>
    </View>
  );

  // Render empty state when no items
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="eye-off-outline" size={48} color="#ccc" />
      <Text style={styles.emptyText}>No items viewed on this day</Text>
      <Text style={styles.emptySubText}>You haven't viewed any products on September {selectedDate}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Recently Viewed Section */}
        <Text style={styles.sectionTitle}>Recently viewed</Text>
        
        {/* View Mode Toggle Buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, viewMode === 'today' && styles.activeToggleButton]}
            onPress={handleTodayPress}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'today' && styles.activeToggleButtonText]}>
              Today
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, viewMode === 'month' && styles.activeToggleButton]}
            onPress={handleMonthPress}
          >
            <Text style={[styles.toggleButtonText, viewMode === 'month' && styles.activeToggleButtonText]}>
              {viewMode === 'month' ? formatDate(selectedDate) : 'This Month'}
            </Text>
            <Ionicons 
              name="chevron-down-outline" 
              size={16} 
              color={viewMode === 'month' ? '#FF7A00' : '#666'} 
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Calendar Section - Only shown when viewMode is 'month' */}
        {viewMode === 'month' && (
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>September 2023</Text>
              <View style={styles.calendarNav}>
                <TouchableOpacity style={styles.navButton}>
                  <Ionicons name="chevron-back" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                  <Ionicons name="chevron-forward" size={20} color="#333" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Day labels */}
            <View style={styles.daysHeader}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Text key={day} style={styles.dayLabel}>{day}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {calendarDays.map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.calendarDay,
                    selectedDate === day && styles.selectedDay,
                    itemsByDay[day] && styles.hasItemsDay // Highlight days with items
                  ]}
                  onPress={() => handleDaySelect(day)}
                >
                  <Text style={[
                    styles.dayText,
                    selectedDate === day && styles.selectedDayText,
                    !itemsByDay[day] && styles.noItemsDayText // Dim days without items
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Display selected date info */}
        <View style={styles.dateInfoContainer}>
          <Text style={styles.dateInfoText}>
            {viewMode === 'today' ? 'Today' : 'Selected'}: September {selectedDate}
          </Text>
          {!itemsByDay[selectedDate] && (
            <Text style={styles.noActivityText}>No activity on this day</Text>
          )}
        </View>

        {/* Recently Viewed Items Grid or Empty State */}
        {displayedItems.length > 0 ? (
          <FlatList
            data={displayedItems}
            renderItem={renderRecentItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.recentList}
            scrollEnabled={false} // Since it's inside a ScrollView
          />
        ) : (
          renderEmptyState()
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  activeToggleButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeToggleButtonText: {
    color: '#FF7A00',
    fontWeight: '600',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  dateInfoContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noActivityText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  recentList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  recentItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: width / 2 - 32, // Two columns with proper spacing
  },
  recentImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentdisc: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    // These properties ensure text wraps properly
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  recentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  calendarNav: {
    flexDirection: 'row',
  },
  navButton: {
    padding: 4,
    marginLeft: 8,
    backgroundColor: '#f1f3f5',
    borderRadius: 20,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayLabel: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  selectedDay: {
    backgroundColor: '#FF7A00',
    borderRadius: 20,
  },
  hasItemsDay: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noItemsDayText: {
    color: '#ccc',
  },
});