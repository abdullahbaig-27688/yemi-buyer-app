import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

export default function WishlistScreen() {
  // 🛒 Wishlist state (start empty)
  const [wishlistData, setWishlistData] = useState([]);

  // 🧾 Recently viewed (for static demo)
  const recentlyViewed = [
    require("../../assets/images/choice1.png"),
    require("../../assets/images/choice2.png"),
    require("../../assets/images/choice3.png"),
  ];

  // 🧩 Render Wishlist item
  const renderWishlistItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.itemImage} />
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() =>
            setWishlistData(wishlistData.filter((i) => i.id !== item.id))
          }
        >
          <Ionicons name="trash-bin-outline" size={20} color="#FF6C3C" />
        </TouchableOpacity>
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.priceRow}>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          )}
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.color}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.size}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.sideIcon}>
        <Ionicons name="cart-outline" size={24} color="#FF6C3C" />
      </TouchableOpacity>
    </View>
  );

  // 🧠 Example “Add to Wishlist” simulation (for demo)
  const addSampleItem = () => {
    setWishlistData([
      ...wishlistData,
      {
        id: Date.now().toString(),
        image: require("../../assets/images/product.png"),
        title: "New Leather Bag",
        price: "$25.00",
        oldPrice: "$35.00",
        color: "Brown",
        size: "M",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Wishlist</Text>

      {wishlistData.length === 0 ? (
        // 🧍 Empty State
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={60} color="#FF6C3C" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <Text style={styles.emptySubText}>
            Start adding your favorite products!
          </Text>

          <TouchableOpacity style={styles.addBtn} onPress={addSampleItem}>
            <Text style={styles.addBtnText}>Add Sample Item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 🧾 Wishlist Section
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={wishlistData}
            keyExtractor={(item) => item.id}
            renderItem={renderWishlistItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  // 🧍 Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 12,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: "#FF6C3C",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  // 📦 Product Styles
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderBottomWidth: 0.8,
    borderColor: "#eee",
  },
  imageWrapper: {
    position: "relative",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  deleteBtn: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    bottom: 1,
    left: 1,
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginLeft: 4,
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  tagRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  tag: {
    backgroundColor: "#E7EBF0",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },
  sideIcon: {
    alignSelf: "center",
    marginLeft: 6,
  },
});
