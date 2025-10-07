import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 30; // 2-column layout

const rewards = [
  {
    id: "1",
    title: "First Purchase",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy.",
    icon: <Ionicons name="pricetag-outline" size={28} color="#ff6600" />,
  },

  {
    id: "2",
    title: "Loyal Customer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy.",
    icon: <Ionicons name="heart-outline" size={28} color="#ff6600" />,
  },
  {
    id: "3",
    title: "Review Maker",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy.",
    icon: <Ionicons name="star-outline" size={28} color="#ff6600" />,
  },
  {
    id: "4",
    title: "Big Soul",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy.",
    icon: <Ionicons name="happy-outline" size={28} color="#ff6600" />,
  },
  {
    id: "5",
    title: "T-Shirt Collector",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy.",
    icon: <FontAwesome5 name="tshirt" size={24} color="#ff6600" />,
  },
  {
    id: "6",
    title: "10+ Orders",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy.",
    icon: <Ionicons name="cart-outline" size={28} color="#ff6600" />,
  },
];

export default function ProgressScreen() {

  const [activeTab, setActiveTab] = useState("Progress");


  return (
    <SafeAreaView style={styles.container}>

      {/* ---------- HEADER ---------- */}

      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }} // dummy profile
          style={styles.profileImage}
        />
        <Text style={styles.headerTitle}>Vouchers</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="list" size={22} color="#ff6600" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="gift-outline" size={22} color="#ff6600" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color="#ff6600" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Active Rewards" && styles.activeTab,
          ]}
               onPress={() => router.replace("/vouchers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Active Rewards" && styles.activeTabText,
            ]}
          >
            Active Rewards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Progress" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("progress")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Progress" && styles.activeTabText,
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>

      </View>

      {/* ---------- REWARD GRID ---------- */}
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  /* ------------ HEADER ------------ */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  
  },
  iconBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    padding: 4,
    marginTop:20
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },

  tab: { flex: 1, alignItems: "center", paddingVertical: 8 },
  activeTab: {
    backgroundColor: "#ff6600",
    borderRadius: 15,
  },
  tabText: { color: "#999", fontSize: 14 },
  activeTabText: { color: "#fff", fontWeight: "bold" },

  /* ------------ REWARDS GRID ------------ */
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#333",
  },
  description: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
