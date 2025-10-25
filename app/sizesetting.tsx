import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import SizeHeader from "@/components/SettingHeader";

const sizes = [
  { id: "1", name: "US" },
  { id: "2", name: "EU" },
  { id: "3", name: "UK" },
];

export default function SizeSettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("US");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.name && styles.selectedItem,
      ]}
      onPress={() => setSelectedLanguage(item.name)}
    >
      <Text style={styles.languageText}>{item.name}</Text>
      {selectedLanguage === item.name ? (
        <Ionicons name="checkmark-circle" size={22} color="#ff6600" />
      ) : (
        <Ionicons name="ellipse-outline" size={22} color="#f5b5b5" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SizeHeader title="Settings" subtitle="Sizes" showBack />
      {/* <Text style={styles.header}>Settings</Text>
      <Text style={styles.subHeader}>Sizes</Text> */}

      <FlatList
        data={sizes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 6,
    marginBottom: 12,
  },
  selectedItem: {
    borderColor: "#4a90e2",
    backgroundColor: "#f8fbff",
  },
  languageText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
