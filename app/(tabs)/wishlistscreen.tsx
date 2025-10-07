// WishlistScreen.js
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

const recentlyViewed = [
  require("../../assets/images/choice1.png"),
  require("../../assets/images/choice2.png"),
  require("../../assets/images/choice3.png"),
  require("../../assets/images/choice1.png"),
  require("../../assets/images/choice3.png"),
];

const wishlistData = [
  {
    id: "1",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "1",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "1",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "1",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "1",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "1",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },

  {
    id: "2",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$12,00",
    oldPrice: "$17,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "3",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$27,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
  {
    id: "4",
    image: require("../../assets/images/product.png"),
    title: "Lorem ipsum dolor sit amet consectetur.",
    price: "$19,00",
    color: "Pink",
    size: "M",
    icon: "cart-outline",
  },
];

export default function wishlistscreen() {
  const renderWishlistItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.itemImage} />

        <TouchableOpacity style={styles.deleteBtn}>
          <Ionicons name="trash-bin-outline" size={20} color="#FF6C3C" />
        </TouchableOpacity>
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 2,
          }}
        >
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
        <Ionicons name={item.icon} size={24} color="#FF6C3C" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Wishlist</Text>

      {/* Recently viewed */}
      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>Recently viewed</Text>
        <TouchableOpacity style={styles.arrowBtn}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentlyViewed}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.recentImage} />
        )}
      />

      {/* Wishlist items */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={wishlistData}
          keyExtractor={(item) => item.id}
          renderItem={renderWishlistItem}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
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
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentText: {
    fontSize: 16,
    fontWeight: "600",
  },
  arrowBtn: {
    backgroundColor: "#FF6C3C",
    borderRadius: 20,
    padding: 6,
  },
  recentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginBottom: 5,
  },

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
