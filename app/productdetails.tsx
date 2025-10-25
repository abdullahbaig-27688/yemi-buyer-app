import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";

export default function ProductDetailScreen() {
  const { name } = useLocalSearchParams(); // get product name from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState(null);

  const { width } = Dimensions.get("window");
  const { addToCart } = useCart(); // ✅ use context function

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://yemi.store/api/v1/products/details/${encodeURIComponent(
            name
          )}`
        );
        console.log("✅ Product fetched:", response.data);
        setProduct(response.data);
      } catch (err) {
        console.log("❌ API Error:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchProductDetails();
  }, [name]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.name,
      image:
        product.image_full_url?.path ||
        product.image ||
        "https://via.placeholder.com/150",
      price: product.unit_price,
      quantity: 1,
    });
    router.push("/addcart"); // ✅ then navigate
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );

  if (!product)
    return (
      <View style={styles.center}>
        <Text>No product details available.</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: product.thumbnail_full_url?.path }}
        style={styles.mainImage}
        contentFit="cover"
      />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.unit_price}</Text>
          {/* <Text style={styles.price}>${product.old_price}</Text> */}
          <TouchableOpacity style={styles.sharecard}>
            <Ionicons
              name="return-up-forward-outline"
              size={22}
              color="#242222"
            />
          </TouchableOpacity>
        </View>

        {/* Render HTML Description */}
        <View style={{ marginTop: 12 }}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: product.details || "<p>No description available.</p>",
            }}
          />
        </View>

        {/* Variations */}
        {product.variation && product.variation.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>Available Variations</Text>
            {product.variation.map((variant, index) => (
              <View key={index} style={styles.variantCard}>
                <Text style={styles.variantText}>
                  {variant.type} — ${variant.price}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Additional Images */}
        {product.images_full_url && product.images_full_url.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>More Images</Text>
            <ScrollView horizontal>
              {product.images_full_url.map((img, idx) => (
                <Image
                  key={idx}
                  source={{ uri: img.path }}
                  style={styles.variationImage}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          {/* Wishlist Button */}
          <TouchableOpacity
            onPress={() => setIsWishlisted(!isWishlisted)}
            style={styles.wishlistButton}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={24}
              color={isWishlisted ? "#E53935" : "#555"}
            />
          </TouchableOpacity>
          <Pressable
            style={styles.addToCartBtn}
            onPress={() => handleAddToCart(product)}
          >
            <Text style={styles.btnText}>Add to Cart</Text>
          </Pressable>
          <Pressable style={styles.buyNowBtn}>
            <Text style={styles.btnText}>Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: { width: "100%", height: 420 },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  name: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 22, fontWeight: "700", color: "#f97316" },
  sharecard: { backgroundColor: "#f5f5f5", borderRadius: 20, padding: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  variationImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginRight: 10,
  },
  variantCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  variantText: { fontSize: 16 },
  bottomButtons: {
    marginTop: 20,
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 12,
    justifyContent: "space-between",
  },
  wishlistButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: "#555",
    padding: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
