import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch latest products from API using axios
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://yemi.store/api/v1/products/new-arrival"
      );
      console.log("API Response:", response.data);

      if (response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        console.log("Unexpected API format:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("API Error:", error.message);
      Alert.alert("Error", "Failed to load latest products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Call fetchProducts when screen mounts
  useEffect(() => {
    fetchProducts();
  }, []);

 const renderProduct = ({ item }) => (
    <ProductCard
      name={item.name}
      product_type={item.product_type}
      category_id={item.category_id}
      brand_id={item.brand_id}
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title={"New Arrivals"} onPress={() => router.back()} />

      {loading ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 10 }}>Loading latest products...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found.</Text>
          }
        />
      )}
    </ScrollView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#999",
  },
});
