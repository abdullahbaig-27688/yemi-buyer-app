import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import SideBar from "@/components/VerticalMenu";

const { width } = Dimensions.get("window");

const BANNERS = [
  {
    id: "1",
    title: "Big Sale",
    subtitle: "Up to 50% off",
    image:
      "https://www.yemi.store/storage/app/public/banner/2025-11-21-69209490e9e54.webp",
  },
  {
    id: "2",
    title: "Flash Deals",
    subtitle: "Limited Time Offer",
    image:
      "https://www.yemi.store/storage/app/public/banner/2025-11-21-692094d9b3925.webp",
  },
];

export default function HomeScreen() {
  const [latestProducts, setLatestProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [justForYou, setJustForYou] = useState<any[]>([]);
  const [mostDemanded, setMostDemanded] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "1", label: "Home", icon: "home-outline", route: "/(tabs)" },
    { id: "2", label: "Profile Info", icon: "person-outline", route: "/profile" },
    { id: "3", label: "My Orders", icon: "cart-outline", route: "/orders" },
    {
      id: "4",
      label: "Settings",
      icon: "settings-outline",
      route: "/settings",
    },
    {
      id: "5",
      label: "Logout",
      icon: "log-out-outline",
      onPress: () => alert("Logged out!"),
    },
  ];

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        setLoading(true);

        // 🔑 Get token from AsyncStorage
        const token = await AsyncStorage.getItem("buyer_token");
        // console.log("TOKEN:", token);

        if (!token) {
          setError("Please login again");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch all sections
        const [
          latestRes,
          newArrRes,
          discRes,
          bestRes,
          topRes,
          justRes,
          mostRes,
          catRes,
          brandRes,
        ] = await Promise.all([
          axios.get("https://yemi.store/api/v1/products/latest", { headers }),
          axios.get("https://yemi.store/api/v1/products/new-arrival", {
            headers,
          }),
          axios.get("https://yemi.store/api/v1/products/discounted-product", {
            headers,
          }),
          axios.get("https://yemi.store/api/v1/products/best-sellings", {
            headers,
          }),
          axios.get("https://yemi.store/api/v1/products/top-rated", {
            headers,
          }),
          axios.get("https://yemi.store/api/v1/products/just-for-you", {
            headers,
          }),
          axios.get(
            "https://yemi.store/api/v1/products/most-demanded-product",
            { headers }
          ),
          axios.get("https://yemi.store/api/v1/products/home-categories", {
            headers,
          }),
          axios.get("https://yemi.store/api/v1/brands", { headers }),
        ]);

        // ⚡ Parse data correctly (adjust according to your API)
        setLatestProducts(latestRes.data?.products || []);
        setNewArrivals(newArrRes.data?.products || []);
        setDiscountedProducts(discRes.data?.products || []);
        setBestsellers(bestRes.data?.products || []);
        setTopRated(topRes.data?.products || []);
        setJustForYou(justRes.data?.products || []);
        setMostDemanded(mostRes.data?.products || []);
        setCategories(catRes.data?.categories || []);
        setBrands(brandRes.data?.brands || []);
        console.log("Latest:", latestRes.data);
        console.log("New Arrivals:", newArrRes.data);
        console.log("Discounted:", discRes.data);
        console.log("Bestsellers:", bestRes.data);
        console.log("Top Rated:", topRes.data);
        console.log("Just For You:", justRes.data);
        console.log("Most Demanded:", mostRes.data);
        console.log("Categories:", catRes.data);
        console.log("Brands:", brandRes.data);
      } catch (err: any) {
        console.log("HOME API ERROR:", err?.response?.data || err.message);
        if (err?.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to load home data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllSections();
  }, []);

  if (loading) return <Text style={styles.centered}>Loading...</Text>;
  if (error)
    return <Text style={[styles.centered, { color: "red" }]}>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => setSidebarOpen(true)}>
            <Ionicons name="menu-outline" size={30} />
          </Pressable>
          <Text style={styles.headerTitle}>Shop</Text>
          <View style={styles.inputview}>
            <TextInput placeholder="Search" />
            <Ionicons name="camera-outline" size={26} />
          </View>
        </View>
        {/* Banner */}
        <View style={styles.bannerWrapper}>
          <Swiper autoplay autoplayTimeout={3} showsPagination>
            {BANNERS.map((item) => (
              <ImageBackground
                key={item.id}
                source={{ uri: item.image }}
                style={styles.bannerSlide}
                imageStyle={{ borderRadius: 15 }} // Rounded corners on image
              >
                {/* Overlay to make text readable */}
                <View style={styles.bannerOverlay}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                </View>
              </ImageBackground>
            ))}
          </Swiper>
        </View>

        {/* Product Sections */}
        <Section title="Categories" data={categories} isCategory />
        <Section title="Brands" data={brands} isBrand />
        <Section title="Latest Products" data={latestProducts} />
        {/* <Section title="New Arrivals" data={newArrivals} /> */}
        <Section title="New Arrivals" data={discountedProducts} />
        <Section title="Best sellings" data={bestsellers} />
        <Section title="Top Rated" data={bestsellers} />
        <Section title="Most Popular" data={bestsellers} />
        <Section
          title="Just For You"
          data={justForYou}
          sectionKey="just-for-you"
        />
      </ScrollView>
      {/* Sidebar Modal */}
      <Modal
        visible={sidebarOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setSidebarOpen(false)}
      >
        {sidebarOpen && (
          <View style={styles.sidebarOverlay}>
            {/* Sidebar itself */}
            <SideBar
              menuItems={menuItems}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Clickable area outside sidebar to close it */}
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setSidebarOpen(false)}
            />
          </View>
        )}
      </Modal>
    </View>
  );
}

/* ---------------- SECTION COMPONENT ---------------- */

function Section({ title, data, sectionKey, isCategory, isBrand }: any) {
  if (!data?.length) return null;

  const handleViewAll = () => {
    switch (sectionKey) {
      case "just-for-you":
        router.push("/justforyou");
        break;

      case "best-selling":
        router.push("/flashdiscount");
        break;

      case "top-rated":
        router.push("/mostdemanded");
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>

        <Pressable onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/productdetails",
                params: { name: item.name },
              })
            }
            style={styles.saleCard}
          >
            <Image
              source={{
                uri:
                  item.thumbnail_full_url?.path ||
                  item.image_full_url?.path ||
                  "https://via.placeholder.com/150",
              }}
              style={styles.saleImg}
            />
            <Text numberOfLines={1}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  centered: { textAlign: "center", marginTop: 100 },

  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 26, fontWeight: "700" },

  inputview: {
    width: "75%",
    height: 40,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bannerWrapper: { height: 180, marginVertical: 20 },
  bannerSlide: {
    width: width - 30,
    height: 180,
    justifyContent: "flex-end", // Push text to bottom
    padding: 20,
    borderRadius: 15,
    overflow: "hidden", // Important for rounded corners
  },

  bannerOverlay: {
    // backgroundColor: "rgba(0,0,0,0.35)", // semi-transparent dark overlay
    padding: 10,
    borderRadius: 10,
  },

  bannerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },

  bannerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 2,
  },

  sectionWrapper: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  catCard: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    borderRadius: 15,
    padding: 8,
  },
  tile: { height: 100, borderRadius: 10 },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  catName: { fontWeight: "700" },

  countPill: {
    backgroundColor: "#E8F0FF",
    borderRadius: 12,
    paddingHorizontal: 8,
  },

  wrapper: { marginBottom: 20 },

  saleCard: {
    width: 140,
    backgroundColor: "#FFF3E0",
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },

  saleImg: { width: 120, height: 120, borderRadius: 10 },

  productPrice: { color: "#FF5722", fontWeight: "700" },
  catCardHorizontal: {
    width: 140,
    backgroundColor: "#F5F7FB",
    borderRadius: 15,
    padding: 8,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCardHorizontal: {
    width: 140,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 8,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tileHorizontal: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  viewAll: {
    color: "#FF5722",
    fontWeight: "600",
    fontSize: 14,
  },
  sidebarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    flexDirection: "row", // sidebar + rest of screen
    zIndex: 1000,
  },

  sidebarContainer: {
    width: 250,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
});
