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

export default function JustForYouScreen() {
  const [products, setProducts] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJustForYou = async () => {
      try {
        setLoading(true);

        const [productRes, brandRes, categoryRes] = await Promise.all([
          axios.get("https://yemi.store/api/v1/products/just-for-you"),
          axios.get("https://yemi.store/api/v1/brands"),
          axios.get("https://yemi.store/api/v1/categories"),
        ]);

        console.log("🟢 Products API:", productRes.data);
        console.log("🟣 Brands API:", brandRes.data);
        console.log("🟡 Categories API:", categoryRes.data);

        // ✅ Flexible data extraction (handles multiple possible response structures)
        const products =
          productRes.data?.products ||
          productRes.data?.data ||
          productRes.data ||
          [];

        const brands =
          brandRes.data?.brands || brandRes.data?.data || brandRes.data || [];

        const categories =
          categoryRes.data?.categories ||
          categoryRes.data?.data ||
          categoryRes.data ||
          [];

        // ✅ Safely merge brand/category names into each product
        const combinedProducts = products.map((product) => {
          // Use nested brand/category if available, otherwise find from lists

          const brand =
            product.brand_id != null
              ? brands.find((b) => Number(b.id) === Number(product.brand_id))
              : null;

          const category =
            product.category_id != null
              ? categories.find(
                  (c) => Number(c.id) === Number(product.category_id)
                )
              : null;

          return {
            ...product,
            brand_name: brand?.name || null,
            category_name: category?.name || null,
          };
        });

        setProducts(combinedProducts);
      } catch (error) {
        console.error("❌ Error fetching Just For You products:", error);
        Alert.alert("Error", "Failed to load Just For You products");
      } finally {
        setLoading(false);
      }
    };

    fetchJustForYou();
  }, []);

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header title={"Just For You"} onPress={() => router.back()} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loaderText}>
            Loading Just For You products...
          </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 50,
  },
  loaderContainer: { alignItems: "center", marginTop: 50 },
  loaderText: { marginTop: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#999",
  },
});
