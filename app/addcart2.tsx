import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function AddCart() {

  const [showModal, setShowModal] = useState(false);
  // Cart items data with unique IDs
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      variant: 'Frrk, Size M',
      price: 27.00,
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      image: 'https://picsum.photos/200/300?random=1',
      quantity: 1
    },
    {
      id: '2',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      variant: 'Frrk, Size M',
      price: 27.00,
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      image: 'https://picsum.photos/200/300?random=2',
      quantity: 1
    },
    {
      id: '3',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      variant: 'Frrk, Size M',
      price: 27.00,
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      image: 'https://picsum.photos/200/300?random=3',
      quantity: 1
    },
    {
      id: '4',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      variant: 'Frrk, Size M',
      price: 27.00,
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      image: 'https://picsum.photos/200/300?random=4',
      quantity: 1
    },
    {
      id: '5',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      variant: 'Frrk, Size M',
      price: 27.00,
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      image: 'https://picsum.photos/200/300?random=5',
      quantity: 1
    },
    {
      id: '6',
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      variant: 'Frrk, Size M',
      price: 27.00,
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      image: 'https://picsum.photos/200/300?random=6',
      quantity: 1
    }
  ]);

  // Update quantity
  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Render cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItem}>
        {/* Image with trash icon */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="trash-bin-outline" size={20} color="#FF7A00" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemVariant}>{item.variant}</Text>

          {/* Price and quantity controls in the same row */}
          <View style={styles.priceQuantityRow}>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

            {/* Quantity controls */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      {/* Shipping Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.addressRow}>
          <Text style={styles.addressText} numberOfLines={2}>
            26 Downs in 2, The Dain Your Air Plus, Exeter 2, File On Main line
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil-outline" size={20} color="#FFf" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cart Items Section */}
        <View style={styles.picSection}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
          />
        </View>
      </ScrollView>

      {/* Total and Checkout Section */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.backdrop}>
            {/* Stop touch propagation inside content */}
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContent}
              >
                <Text style={styles.title}>Shipping Address</Text>

                <Text style={styles.label}>Country</Text>
                
                <View style={styles.inputview}>
                  <TextInput placeholder="India" />
                  <View style={styles.iconview}>
                    <Ionicons name='arrow-forward' size={22} />
                  </View>
                </View>

                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Magadi Main Rd, next to Prasanna Theatre"
                />

                <Text style={styles.label}>Town / City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bengaluru, Karnataka 560023"
                />

                <Text style={styles.label}>Postcode</Text>
                <TextInput style={styles.input} placeholder="70000" keyboardType="numeric" />

                <TouchableOpacity style={styles.saveBtn} onPress={() => setShowModal(false)}>
                  <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#F9F9F9',
    padding: 8,
    borderRadius: 12,
    marginVertical: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    flex: 1,
  },
  editButton: {
    padding: 4,
    backgroundColor: '#FF7A00',
    borderRadius: 15
  },
  picSection: {
    marginBottom: 16,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  cartItemContainer: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 3,
    bottom: 13,
    left: 2
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom:14
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutText: { color: "#fff", fontWeight: "bold" },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F1F4FE'
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "orange",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold" },
  inputview:{
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center'
  },
  iconview:{

    backgroundColor:'#F9F9F9',
    padding:6,
    borderRadius:20

  }
});