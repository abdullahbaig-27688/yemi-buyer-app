import { Ionicons } from "@expo/vector-icons";
import { use, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Row from "../components/Row";
import Header from "@/components/Header";

export default function SettingsScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.setting}>Settings</Text>
      {/* <Header title="Settings" /> */}
      <Text style={styles.section}>Personal</Text>

      <Row label="Profile" onPress={() => router.navigate("/profilesetting")} />
      <Row
        label="Shipping Address"
        onPress={() => router.navigate("/addresssetting")}
      />
      <Row
        label="Payment methods"
        onPress={() => router.navigate("/paymentsetting")}
      />

      <Text style={styles.section}>Shop</Text>

      <Row label="Country" value="Vietnam" onPress={() => {}} />
      <Row
        label="Currency"
        value="$ USD"
        onPress={() => router.navigate("/currencysetting")}
      />
      <Row
        label="Sizes"
        value="UK"
        onPress={() => router.navigate("/sizesetting")}
      />

      {/* Toggle everything below */}
      <Row
        label="Terms and Conditions"
        onPress={() => setExpanded((prev) => !prev)}
        showArrow={false}
      />

      {expanded && (
        <>
          <View style={styles.termsBox}>
            <Text style={styles.termsHeading}>Terms & Conditions</Text>
            <Text style={styles.termsText}>
              Place your detailed terms and conditions here. This text block
              appears when the row is tapped.
            </Text>
          </View>

          <Text style={styles.section}>Account</Text>

          <Row
            label="Language"
            value="English"
            onPress={() => router.navigate("/languagesetting")}
          />

          <Row label="About Slada" onPress={() => Alert.alert("About Slada")} />

          <Pressable
            style={{ marginTop: 30 }}
            onPress={() =>
              Alert.alert(
                "Delete Account",
                "Are you sure you want to delete your account? This action cannot be undone.",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => {} },
                ]
              )
            }
          >
            <Text style={styles.delete}>Delete My Account</Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Slada</Text>
            <Text style={styles.footerSub}>Version 1.8 April, 2020</Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
     paddingHorizontal: 20,
    paddingVertical: 20,
  },
  section: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
    // fontWeight: "700",
    marginTop: 35,
  },
  setting: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 45,
    color: "#000",
    // fontWeight: "700",
  },

  delete: {
    color: "red",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  footerSub: {
    color: "#888",
    marginTop: 4,
  },
  termsBox: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  termsHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
});
