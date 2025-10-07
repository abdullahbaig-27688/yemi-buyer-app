import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

const currencies = [
  { id: "1", name: "USD - US Dollar" },
  { id: "2", name: "EUR - Euro" },
  { id: "3", name: "GBP - British Pound" },
  { id: "4", name: "PKR - Pakistani Rupee" },
  { id: "5", name: "INR - Indian Rupee" },
];

export default function CurrencySettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("Euro");

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subHeader}>Currency</Text>

      <FlatList
        data={currencies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
