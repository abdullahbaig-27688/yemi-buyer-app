import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function productshop() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {/* Main Product Image */}
        <Image
          source={require('../assets/images/Image.png')}
          style={styles.mainImage}
        />

        {/* Bottom Row (Viewers + Live Tag + Shop Button) */}
        <View style={styles.bottomRow}>
          <View style={styles.liveInfo}>
            <Ionicons name="eye-outline" size={20} color="#333" />
            <Text style={styles.liveText}>2,530</Text>
            <View style={styles.liveTag}>
              <Text style={{ color: "white", fontSize: 12 }}>LIVE</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopText}>Shop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: 335,
    height: 660,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 20,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    width: "90%",
  },
  liveInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveText: {
    fontSize: 14,
    marginHorizontal: 6,
  },
  liveTag: {
    backgroundColor: "green",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  shopButton: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  shopText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
