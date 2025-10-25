import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const RECENT = [
  "https://randomuser.me/api/portraits/women/11.jpg",
  "https://randomuser.me/api/portraits/women/22.jpg",
  "https://randomuser.me/api/portraits/women/33.jpg",
  "https://randomuser.me/api/portraits/men/44.jpg",
  "https://randomuser.me/api/portraits/women/55.jpg",
];

const STORIES = [
  { id: "s1", name: "Anna", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=60" },
  { id: "s2", name: "Maya", img: "https://images.unsplash.com/photo-1545996124-1b6f6f0d7b98?w=400&q=60" },
  { id: "s3", name: "Lina", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=60" },
  { id: "s4", name: "Nora", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=60" },
  { id: "s5", name: "Eve", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=60" },
];

export default function ProfileScreen() {
   const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.profilePic}
        />
        <Pressable style={styles.activityButton} onPress={() => router.push("/myactivity")}>
          <Text style={styles.activityText}>My Activity</Text>
        </Pressable>

        <View style={styles.iconRow}>
          <Ionicons name="grid-outline" size={22} color="#333" style={styles.icon} />
          <Ionicons name="menu-outline" size={22} color="#333" style={styles.icon} />
          <Pressable onPress={()=>router.push("/settings")}>
             <Ionicons name="settings-outline" size={22} color="#333" style={styles.icon} />
          </Pressable>
          {/* <Ionicons name="settings-outline" size={22} color="#333" style={styles.icon} /> */}
        </View>
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>Hello, Romina!</Text>

      {/* Announcement Box */}
      <View style={styles.announcementBox}>
        <View style={{ flex: 1 }}>
          <Text style={styles.announcementTitle}>Announcement</Text>
          <Text style={styles.announcementText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit luctus libero ac vulputate.
          </Text>
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={() => Alert.alert("Announcement Clicked")}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Recently Viewed */}
      <View style={styles.section}>
        <View style={styles.rowHeader}>
          <Text style={styles.sectionTitle}>Recently viewed</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScroll}>
          {RECENT.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => Alert.alert("Working on it")}>
              <Image source={{ uri: item }} style={styles.recentImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* My Orders */}
      <View style={styles.section}>
        <View style={styles.rowHeader}>
          <Text style={styles.sectionTitle}>My Orders</Text>
        </View>
        <View style={styles.ordersRow}>
          <Pressable style={styles.orderCard} onPress={() => Alert.alert("To Pay")}>
            <Text style={styles.labletext}>To Pay</Text>
          </Pressable>
          <Pressable style={styles.orderCard} onPress={() => Alert.alert("To Receive")}>
            <Text style={styles.labletext}>To Receive</Text>
          </Pressable>
          <Pressable style={styles.orderCard} onPress={() => Alert.alert("To Review")}>
            <Text style={styles.labletext}>To Review</Text>
          </Pressable>
        </View>
      </View>

      {/* Stories */}
      <View style={styles.section}>
        <View style={styles.rowHeader}>
          <Text style={styles.sectionTitle}>Stories</Text>
        </View>
        <FlatList
          data={STORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.storyItem} onPress={() => Alert.alert(item.name)}>
              <Image source={{ uri: item.img }} style={styles.storyAvatar} />
              <Text style={styles.storyName}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activityButton: {
    backgroundColor: "#f97316",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
  },
  activityText: {
    color: "#fff",
    fontWeight: "600",
  },
  iconRow: {
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  announcementBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  announcementTitle: {
    fontWeight: "700",
    marginBottom: 5,
  },
  announcementText: {
    color: "#555",
    fontSize: 13,
  },
  arrowButton: {
    backgroundColor: "#f97316",
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  section: {
    marginBottom: 10,
  },
  rowHeader: {
    width: "100%",
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  recentScroll: {
    flexDirection: "row",
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  ordersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  orderCard: {
    flex: 1,
    backgroundColor: "#FAFBFF",
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  labletext: {
    color: "#FA8232",
    fontSize: 16,
  },
  storyItem: {
    width: 102,
    alignItems: "center",
    margin: 3,
  },
  storyAvatar: {
    width: 100,
    height: 170,
    borderRadius: 6,
    resizeMode: "cover",
  },
  storyName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },
});
