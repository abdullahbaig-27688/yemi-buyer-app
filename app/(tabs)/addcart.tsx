import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddCart() {
  const router= useRouter();
  const { id, title, image, price } = useLocalSearchParams();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [showModal, setShowModal] = useState(false);

  console.log("🛒 Cart Items:", cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = cartItems.length > 0 ? 2.0 : 0;
  const total = subtotal + delivery;

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItem}>
        <Image
          source={{
            uri:
              item.image_full_url?.path ||
              item.image ||
              "https://via.placeholder.com/150",
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Ionicons name="trash-bin-outline" size={22} color="#FF7A00" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Your cart is empty.
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
          />
          <View style={styles.bottomBar}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <Pressable
              style={styles.checkoutButton}
              // onPress={() => setShowModal(true)}
              onPress={()=>router.push("/addresssetting")}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  cartItemContainer: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
  },
  cartItem: { flexDirection: "row", alignItems: "center" },
  itemImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: "#333", marginVertical: 4 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  quantity: { fontSize: 16, marginHorizontal: 8 },
  bottomBar: {
    flexDirection: "column",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  total: { fontSize: 18, fontWeight: "bold", color: "#FF7A00" },
  checkoutButton: {
    backgroundColor: "#f97316",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
