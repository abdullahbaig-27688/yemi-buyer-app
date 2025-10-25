import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/Header";
import { router } from "expo-router";

const CATEGORY_DATA = [
  {
    id: "1",
    title: "Clothing",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    subcategories: [
      "Dresses",
      "Pants",
      "Skirts",
      "Shorts",
      "Jackets",
      "Hoodies",
      "Shirts",
      "Polo",
      "T-Shirts",
      "Tunics",
    ],
  },
  {
    id: "2",
    title: "Shoes",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    subcategories: ["Boots", "Flats", "Heels", "Sandals", "Athletic Shoes"],
  },
  {
    id: "3",
    title: "Bags",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    subcategories: [],
  },
  {
    id: "4",
    title: "Lingerie",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    subcategories: [],
  },
  {
    id: "5",
    title: "Accessories",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    subcategories: ["Jewelry", "Watches", "Handbags", "Belts", "Scarves"],
  },
];

export default function CategoriesScreen() {
  const [selectedTab, setSelectedTab] = useState("Female");
  const [expanded, setExpanded] = useState<string | null>("1");

  const renderSubcategories = (subcategories) => (
    <View style={styles.subcategoryWrapper}>
      {subcategories.map((item, index) => (
        <Pressable key={index} style={styles.subcategoryBox}>
          <Text style={styles.subcategoryText}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Pressable
        style={styles.categoryHeader}
        onPress={() => setExpanded(expanded === item.id ? null : item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Ionicons
          name={expanded === item.id ? "chevron-up" : "chevron-down"}
          size={20}
          color="black"
          style={{ marginLeft: "auto" }}
        />
      </Pressable>

      {expanded === item.id && item.subcategories.length > 0 && (
        <>{renderSubcategories(item.subcategories)}</>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      
        <Header title="All Categories" onPress={() => router.back()} />
      

      {/* Tabs */}
      <View style={styles.tabs}>
        {["All", "Female", "Male"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category List (No ScrollView, Only FlatList) */}
      <FlatList
        data={CATEGORY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={
        //   <View style={styles.justforyouview}>
        //     <Image
        //       source={{
        //         uri: "https://images.pexels.com/photos/374677/pexels-photo-374677.jpeg",
        //       }}
        //       style={styles.categoryImage}
        //     />
        //     <Pressable style={styles.jusforyoubutton}>
        //       <Text style={styles.categoryTitle}>Just for you</Text>
        //       <View style={styles.iconecolor}>
        //         <Ionicons name="arrow-forward" size={16} color="#fff" />
        //       </View>
        //     </Pressable>
        //   </View>
        // }
      />
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

  headerTitle: { fontSize: 20, fontWeight: "bold" },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f28c8c",
    marginHorizontal: 5,
  },
  activeTabButton: { backgroundColor: "#f28c8c" },
  tabText: { fontSize: 16, color: "#333", paddingHorizontal: 12 },
  activeTabText: { color: "#fff", fontWeight: "bold" },
  categoryContainer: {
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryTitle: { fontSize: 16, fontWeight: "600" },
  subcategoryWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  subcategoryBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#f28c8c",
    borderRadius: 8,
    paddingVertical: 12,

    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  subcategoryText: { fontSize: 14, color: "#333" },
  justforyouview: {
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  jusforyoubutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  iconecolor: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF7A00",
    alignItems: "center",
    justifyContent: "center",
  },
});
