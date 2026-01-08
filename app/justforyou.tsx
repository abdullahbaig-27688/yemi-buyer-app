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
  View,
} from "react-native";

export default function JustForYouScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJustForYou = async () => {
      try {
        setLoading(true);

        // Fetch JUST FOR YOU products
        const productRes = await axios.get(
          "https://yemi.store/api/v1/products/just-for-you"
        );

        // Many Yemi APIs return `products` array
        const fetchedProducts =
          productRes.data?.products ||
          productRes.data?.data ||
          productRes.data ||
          [];

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("❌ Error loading Just For You products:", error);
        Alert.alert("Error", "Could not load Just For You products");
      } finally {
        setLoading(false);
      }
    };

    fetchJustForYou();
  }, []);

  const renderProduct = ({ item }: any) => (
    <ProductCard
      name={item.name}
      product_type={item.product_type}
      category_name={item.category?.name || item.category_name}
      brand_name={item.brand?.name || item.brand_name}
      unit_price={item.unit_price}
      thumbnail={item.thumbnail}
      oldprice={item.old_price || item.original_price}
      image={item.image || item.thumbnail || "https://via.placeholder.com/150"}
      onPress={() =>
        router.push({
          pathname: "/productdetails",
          params: { name: item.name },
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Just For You" onPress={() => router.back()} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Loading products...</Text>
        </View>
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: "#fff" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
