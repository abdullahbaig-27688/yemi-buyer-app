import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const discounts = [10, 20, 30, 40, 50];

export default function FlashSaleScreen() {
  const [selectedDiscount, setSelectedDiscount] = useState(20);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch discounted products from API using axios
 useEffect(() => {
  const fetchDiscountedProducts = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [productRes, brandRes, categoryRes] = await Promise.all([
        axios.get("https://yemi.store/api/v1/products/discounted-product"),
        axios.get("https://yemi.store/api/v1/brands"),
        axios.get("https://yemi.store/api/v1/categories"),
      ]);

      console.log("🟢 Discounted Products:", productRes.data);
      console.log("🟣 Brands:", brandRes.data);
      console.log("🟡 Categories:", categoryRes.data);

      // ✅ Safely handle different key names
      const products =
        productRes.data?.products ||
        productRes.data?.data ||
        productRes.data ||
        [];

      const brands =
        brandRes.data?.brands ||
        brandRes.data?.data ||
        brandRes.data ||
        [];

      const categories =
        categoryRes.data?.categories ||
        categoryRes.data?.data ||
        categoryRes.data ||
        [];

      // ✅ Merge brand & category names into each product
      const combinedProducts = products.map((product) => {
        const brand =
          product.brand ||
          brands.find((b) => Number(b.id) === Number(product.brand_id));

        const category =
          product.category ||
          categories.find((c) => Number(c.id) === Number(product.category_id));

        return {
          ...product,
          brand_name: brand?.name || "Unknown Brand",
          category_name: category?.name || "Unknown Category",
        };
      });

      setProducts(combinedProducts);
    } catch (error) {
      console.error("❌ Error fetching discounted products:", error);
      Alert.alert("Error", "Failed to load discounted products");
    } finally {
      setLoading(false);
    }
  };

  fetchDiscountedProducts();
}, []);


  // Filter products by discount percentage
  const filteredProducts = products.filter(
    (p) => p.discount && Math.round(p.discount) === selectedDiscount
  );

  const renderProduct = ({ item }) => (
    <ProductCard
      name={item.name}
      product_type={item.product_type}
      category_name={item.category_name}
      brand_name={item.brand_name}
      unit_price={item.unit_price}
      thumbnail={item.thumbnail}
      oldprice={item.old_price || item.original_price}
      image={item.image || item.thumbnail || "https://via.placeholder.com/150"}
      onPress={() =>
        router.push({
          pathname: "/productdetails", // 👈 this opens your detail page
          params: { name: item.name }, // 👈 send product name to detail screen
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title={"Flash Sale"} onPress={() => router.back()} />

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

      {/* Loading Indicator */}
      {loading ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 10 }}>Loading flash sale products...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 40, color: "#999" }}>
              No products found for {selectedDiscount}% discount.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 50,
  },
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
    backgroundColor: "#ddd",
    marginHorizontal: 6,
  },
  discountBtnText: { fontSize: 14, color: "#444" },
  activeDiscount: { backgroundColor: "#FFFFFF", borderColor: "#FA8232" },
  activeDiscountText: { color: "#FF7F50" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 8,
  },
});
