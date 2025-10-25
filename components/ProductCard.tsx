import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type ProductCardProps = {
  name: string;
  slug: string;
  category_name?: string;
  brand_name?: string; // 👈 added category
  unit_price: string;
  product_type?: string;
  oldprice?: string;
  thumbnail: string;
  discount?: string;
  image: string;
  onPress?: () => void;
  onWishlist?: () => void;

  showDiscount?: boolean; // 👈 NEW prop
};
const ProductCard = ({
  name,
  slug,
  category_name,
  brand_name,
  product_type,
  unit_price,
  oldprice,
  thumbnail,
  discount,
  image,

  onPress,
  showDiscount = false,
}: ProductCardProps) => {
  const baseUrl = "https://yemi.store/storage/app/public/product/thumbnail/";
  const imageUrl =
    typeof thumbnail === "string" && thumbnail.startsWith("http")
      ? thumbnail
      : typeof thumbnail === "string"
      ? `${baseUrl}${thumbnail}`
      : "https://via.placeholder.com/150";

  return (
    <Pressable style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {/* 👇 Only show discount tag if enabled */}
      {showDiscount && discount && (
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>-{discount}%</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.type} numberOfLines={1}>
          Type: {product_type}
        </Text>
        {/* Row: Category + Brand */}
        <View style={styles.row}>
          <Text style={styles.category}>Category: {category_name || "N/A"}</Text>
          <Text style={styles.brand}>Brand: {brand_name || "N/A"}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>New Price: ${unit_price}</Text>
        {/* 👇 Only show old price if flash screen */}
        {showDiscount && oldprice && (
          <Text style={styles.oldprice}>${oldprice}</Text>
        )}
      </View>

      <View style={styles.btnContainer}>
        <Pressable style={styles.viewdetails}>
          <Text style={styles.text}>View Details</Text>
        </Pressable>
        <Pressable style={styles.buynow}>
          <Text style={styles.text}>Add to Wishlist</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    width: "48%",
    paddingVertical: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  priceContainer: {
    flexDirection: "column",
    gap: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnContainer: {
    flexDirection: "column",
    gap: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  type: {
    fontSize: 14,
    fontWeight: "500",
    color: "grey",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginTop: 4,
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 4,
  },
  category: {
    fontSize: 13,
    color: "#FF7B00",
  },
  brand: {
    fontSize: 13,
    color: "#007AFF",
  },
  oldprice: {
    fontSize: 13,
    color: "gray",
    textDecorationLine: "line-through",
  },
  viewdetails: {
    backgroundColor: "#ff7b00ff",
    borderRadius: 10,
    borderColor: "#eee",
    // width:"100%",
    marginTop: 8,
    borderWidth: 2,
    padding: 10,
  },
  buynow: {
    backgroundColor: "#ff0b17b4",
    borderRadius: 10,
    borderColor: "#eee",
    // width:"100%",
    marginTop: 8,
    borderWidth: 2,
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "#000",
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
});
