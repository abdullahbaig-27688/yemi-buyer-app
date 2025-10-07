import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VoucherScreen() {
  const [activeTab, setActiveTab] = useState("Active Rewards");

  const vouchers = [
    {
      id: 1,
      title: "First Purchase",
      desc: "5% off for your next order",
      expiry: "Valid Until 4.21.20",
      left: "3 days left",
    },
    {
      id: 2,
      title: "Gift From Customer Care",
      desc: "15% off your next purchase",
      expiry: "Valid Until 6.20.20",
    },
    {
      id: 3,
      title: "Loyal Customer",
      desc: "10% off your next purchase",
      expiry: "Valid Until 6.20.20",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
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
          <MaterialIcons />
        </View>
      </View>

      {/* Tabs */}
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
          onPress={() => router.replace("/progress")}
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

      {/* Voucher List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {vouchers.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            {/* Left Notch */}
            <View style={styles.notchLeft} />
            {/* Right Notch */}
            <View style={styles.notchRight} />

            <View style={styles.card}>
              {/* Header Row */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>Voucher</Text>
                <View style={styles.rightHeader}>
                  {item.left && <Text style={styles.leftText}>{item.left}</Text>}
                  <Text style={styles.expiry}>{item.expiry}</Text>
                </View>
              </View>

              {/* Dotted Line */}
              <View style={styles.dottedLine} />

              {/* Content */}
              <Text style={styles.cardTitle}>🎁 {item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>

              {/* Collected Button */}
              <TouchableOpacity style={styles.collectedBtn}>
                <Text style={styles.collectedText}>Collected</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", flex: 1 },
  headerIcons: { flexDirection: "row" },
  icon: { marginLeft: 10 },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    padding: 4,
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

  cardWrapper: {
    marginHorizontal: 20,
    marginVertical: 12,
    position: "relative",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ff6600",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  notchLeft: {
    position: "absolute",
    top: "35%",
    left: -10,

    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff6600",
    width: 20,
    height: 10,         // half of width
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    zIndex: 2,
  },
  notchRight: {
    position: "absolute",
    top: "35%",
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff6600",
    zIndex: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardLabel: { color: "#ff6600", fontSize: 13, fontWeight: "bold" },
  rightHeader: { flexDirection: "row", alignItems: "center" },
  leftText: { color: "#ff6600", fontSize: 12, marginRight: 6 },
  expiry: { fontSize: 12, color: "#999" },

  dottedLine: {
    borderBottomWidth: 1,
    borderColor: "#ff6600",
    borderStyle: "dotted",
    marginVertical: 8,
  },

  cardTitle: { fontSize: 16, fontWeight: "bold", marginTop: 4 },
  cardDesc: { fontSize: 13, color: "#555", marginVertical: 4 },

  collectedBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#ff6600",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  collectedText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

});
