import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const { name } = useLocalSearchParams<{ name: string }>();
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { width } = Dimensions.get("window");
  const { addToCart } = useCart();

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("buyer_token");

        if (!token) {
          setError("Please login again");
          return;
        }

        const encodedName = encodeURIComponent(String(name));

        const res = await axios.get(
          `https://yemi.store/api/v1/products/details/${encodedName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProduct(res.data);
      } catch (err: any) {
        console.log(
          "❌ PRODUCT API ERROR:",
          err?.response?.data || err.message
        );
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchProductDetails();
  }, [name]);

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const token = await AsyncStorage.getItem("buyer_token");

      if (!token) {
        Alert.alert("Login required", "Please login to add product to cart");
        return;
      }

      // 🔥 Backend cart
      await axios.post(
        `https://yemi.store/api/v1/cart/add?id=${product.id}&quantity=${quantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔥 Local cart
      addToCart({
        id: product.id,
        title: product.name,
        image:
          product.thumbnail_full_url?.path ||
          product.images_full_url?.[0]?.path ||
          "https://via.placeholder.com/150",
        price: product.unit_price,
        quantity: quantity,
      });

      router.push("/addcart");
    } catch (err: any) {
      console.log("ADD TO CART ERROR:", err?.response?.data || err.message);
      Alert.alert("Error", "Failed to add product to cart");
    }
  };

  /* ---------------- GUARDS (VERY IMPORTANT) ---------------- */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>No product details available.</Text>
      </View>
    );
  }

  /* ---------------- SAFE IMAGE ---------------- */
  const mainImage =
    product.thumbnail_full_url?.path ||
    product.images_full_url?.[0]?.path ||
    "https://via.placeholder.com/400";

  /* ---------------- UI ---------------- */
  return (
    <ScrollView style={styles.container}>
      {/* Main Image */}
      <Image
        source={{ uri: mainImage }}
        style={styles.mainImage}
        contentFit="cover"
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={{ marginVertical: 12 }}>
          {/* Price */}
          <Text style={styles.price}>Price: ${product.unit_price}</Text>

          {/* Quantity selector */}
          <View style={styles.quantityRow}>
            <Text style={styles.totalQuantity}>Quantity: </Text>
            <Pressable
              style={styles.qtyButton}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyText}>-</Text>
            </Pressable>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <Pressable
              style={styles.qtyButton}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Text style={styles.qtyText}>+</Text>
            </Pressable>
          </View>

          {/* Total price */}
          <Text style={styles.totalPrice}>
            Total: ${(product.unit_price * quantity).toFixed(2)}
          </Text>
        </View>

        {/* Description */}
        <View style={{ marginTop: 12 }}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: product.details || "<p>No description available.</p>",
            }}
          />
        </View>

        {/* Variations */}
        {product.variation?.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>Available Variations</Text>
            {product.variation.map((variant: any, index: number) => (
              <View key={index} style={styles.variantCard}>
                <Text style={styles.variantText}>
                  {variant.type} — ${variant.price}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Gallery */}
        {product.images_full_url?.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={styles.sectionTitle}>More Images</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.images_full_url.map((img: any, idx: number) => (
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
          <Pressable style={styles.addToCartBtn} onPress={handleAddToCart}>
            <Text style={styles.btnText}>Add to Cart</Text>
          </Pressable>

          <Pressable style={styles.buyNowBtn}>
            <Text style={styles.btnText}>Buy Now</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsWishlisted(!isWishlisted)}
            style={styles.wishlistButton}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={24}
              color={isWishlisted ? "#E53935" : "#555"}
            />
          </Pressable>
        </View>
        <Pressable
          style={styles.chatVendorBtn}
          onPress={() => {
            // Navigate to chat screen or open chat with vendor
            router.push(`/chat?vendorId=${product.vendor_id}`);
          }}
        >
          <Text style={styles.btnText}>Chat with Vendor</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  mainImage: { width: "100%", height: 420 },
  detailsContainer: { paddingHorizontal: 20, paddingVertical: 16 },
  name: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: 22, fontWeight: "700", color: "#f97316" },
  sharecard: { backgroundColor: "#f5f5f5", borderRadius: 20, padding: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  variationImage: { width: 100, height: 120, borderRadius: 8, marginRight: 10 },
  variantCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  variantText: { fontSize: 16 },
  bottomButtons: {
    marginTop: 20,
    gap:10,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 12,
  },
  wishlistButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
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
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  qtyButton: {
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyText: { fontSize: 18, fontWeight: "700" },
  qtyValue: { marginHorizontal: 12, fontSize: 16, fontWeight: "700" },
  totalQuantity: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#f97316",
  },
  totalPrice: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#f97316",
  },
  chatVendorBtn: {
    flex: 1,
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
});
