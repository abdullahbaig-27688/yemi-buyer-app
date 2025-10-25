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

export default function MostDemandedScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostDemanded = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://yemi.store/api/v1/products/most-demanded-product");

        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          console.log("Unexpected API format:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching most demanded products:", error);
        Alert.alert("Error", "Failed to load most demanded products");
      } finally {
        setLoading(false);
      }
    };

    fetchMostDemanded();
  }, []);

  const renderProduct = ({ item }) => (
    <ProductCard
      name={item.name}
      price={item.price}
      oldprice={item.old_price || item.original_price}
      image={item.image || item.thumbnail || "https://via.placeholder.com/150"}
      onPress={() => router.push(`/productdetails?id=${item.id}`)}
    />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header title={"Most Demanded"} onPress={() => router.back()} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loaderText}>Loading most demanded products...</Text>
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
            <Text style={styles.emptyText}>No most demanded products found.</Text>
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
