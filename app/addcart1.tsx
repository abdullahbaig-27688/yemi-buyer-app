import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CartScreen() {
  // Wishlist items data
  const wishlistItems = [
    {
      id: '1',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$37.00',
      variant: 'Risk N',
      image: 'https://picsum.photos/200/300?random=1',
    },
    {
      id: '2',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      price: '$37.00',
      variant: 'Risk N',
      image: 'https://picsum.photos/200/300?random=2',
    }
  ];

  // Render wishlist item
  const renderWishlistItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.priceVariantRow}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <Text style={styles.itemVariant}>{item.variant}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with Time */}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>Cart 0</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Shipping Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil-outline" size={20} color="#FFf" />
            </TouchableOpacity>
          </View>
          <Text style={styles.addressText}>
            Boeing 5.2, Two-Dim Work Admin, Orbital 2, No.CN Web 8/4
          </Text>
        </View>

        <Image
          source={require('../assets/images/Empty Cart.png')}
          style={{ alignSelf: 'center', marginVertical: 50 }}
        />


        {/* Wishlist Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>From Your Wishlist</Text>

          {/* Wishlist Items */}
          <FlatList
            data={wishlistItems}
            renderItem={renderWishlistItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}

          />
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total  $0.00</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  header: {
    padding: 10,
    justifyContent: 'center',
    position: 'relative',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  editButton: {
    padding: 4,
    backgroundColor: '#FF7A00',
    borderRadius: 15
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  productImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  priceVariantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  itemVariant: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    height: 40,
    width: 80,
    justifyContent: 'center'
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});