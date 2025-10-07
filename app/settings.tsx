import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [expanded, setExpanded] = useState(false);

  const Row = ({ label, value, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {showArrow && (
          <Ionicons name="chevron-forward" size={18} color="#888" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.setting}>Settings</Text>
      <Text style={styles.section}>Personal</Text>

      <Row label="Profile" onPress={() => { }} />
      <Row label="Shipping Address" onPress={() => { }} />
      <Row label="Payment methods" onPress={() => { }} />

      <Text style={styles.section}>Shop</Text>

      <Row label="Country" value="Vietnam" onPress={() => { }} />
      <Row label="Currency" value="$ USD" onPress={() => { }} />
      <Row label="Sizes" value="UK" onPress={() => { }} />

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
          <Row label="Language" value="English" onPress={() => { }} />
          <Row label="About Slada" onPress={() => { }} />

          <TouchableOpacity style={{ marginTop: 30 }}>
            <Text style={styles.delete}>Delete My Account</Text>
          </TouchableOpacity>

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
    paddingHorizontal: 20 
  },
  section: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
    fontWeight: '700',
    marginTop:35
  },
  setting: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 45,
    color: "#000",
    fontWeight: '700'

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  
  },
  label: {
    fontSize: 15,
    color: "#222"
  },
  value: {
    fontSize: 15,
    color: "#666",
    marginRight: 5
  },
  delete: {
    color: "red",
    fontSize: 15,
    fontWeight: "600"
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40
  },
  footerText: {
    fontSize: 16,
    fontWeight: "700"
  },
  footerSub: {
    color: "#888",
    marginTop: 4
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
    marginBottom: 10
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444"
  },
});
