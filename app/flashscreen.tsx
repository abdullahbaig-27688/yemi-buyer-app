import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { router } from "expo-router";

const discounts = [10, 20, 30, 40, 50];

const products = [
  {
    id: "1",
    title: "Stylish Sunglasses",
    price: 16.0,
    oldPrice: 20.0,
    discount: 20,
     image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: "2",
    title: "Summer Hat",
    price: 16.0,
    oldPrice: 20.0,
    discount: 20,
   image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: "3",
    title: "Floral Dress",
    price: 16.0,
    oldPrice: 20.0,
    discount: 20,
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: "4",
    title: "Casual Outfit",
    price: 16.0,
    oldPrice: 20.0,
    discount: 20,
    image: "https://randomuser.me/api/portraits/women/40.jpg",
  },
];

export default function FlashSaleScreen() {
  const [selectedDiscount, setSelectedDiscount] = useState(20);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const h = Math.floor(m / 60);
    return `${h.toString().padStart(2, "0")}:${(m % 60)
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const filteredProducts = products.filter(
    (p) => p.discount === selectedDiscount
  );

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.discountTag}>
        <Text style={styles.discountText}>-{item.discount}%</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header title={"Flash Sale"} onPress={() => router.back()} />
      </View>

      {/* Discount Filter */}
      <View style={styles.discountFilter}>
        {discounts.map((d) => (
          <TouchableOpacity
            key={d}
            style={[
              styles.discountBtn,
              selectedDiscount === d && styles.activeDiscount,
            ]}
            onPress={() => setSelectedDiscount(d)}
          >
            <Text
              style={[
                styles.discountBtnText,
                selectedDiscount === d && styles.activeDiscountText,
              ]}
            >
              {d}%
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{selectedDiscount}% Discount</Text>

      {/* Products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Ionicons name="heart-outline" size={24} color="#000" />
        <Ionicons name="cart-outline" size={24} color="#000" />
        <Ionicons name="person-outline" size={24} color="#000" />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    // backgroundColor: "#FF7F50",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomRightRadius: 50,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#FF9F70",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  timerText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
  discountFilter: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  discountBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 6,
  },
  discountBtnText: { fontSize: 14, color: "#444" },
  activeDiscount: { backgroundColor: "#FF7F50", borderColor: "#FF7F50" },
  activeDiscountText: { color: "#fff" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    width: "48%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    height: 140,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountTag: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF7F50",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  discountText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  title: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
    marginHorizontal: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  price: { fontSize: 14, fontWeight: "bold", color: "#000", marginRight: 6 },
  oldPrice: { fontSize: 12, color: "#aaa", textDecorationLine: "line-through" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
