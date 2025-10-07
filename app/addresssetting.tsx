import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import countriesData from "world-countries"; // ✅ install with: yarn add world-countries

const ShippingAddressScreen = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ get country names from library
  const countries = countriesData.map((c) => c.name.common).sort();

  const handleSave = () => {
    if (!country || !address || !city || !postcode || !phone) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    Alert.alert("✅ Success", "Shipping address saved successfully");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Shipping Address</Text>

        {/* Country */}
        <View style={styles.countryRow}>
          <Text style={styles.label}>Country</Text>
          <TouchableOpacity
            style={styles.countrySelect}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.countryText,
                country ? styles.countrySelected : null,
              ]}
            >
              {country ? country : "Choose your country"}
            </Text>

            {/* Change icon based on selection */}
            {country ? (
              <Ionicons name="checkmark-circle" size={24} color="#FF6600" />
            ) : (
              <Ionicons name="earth" size={24} color="#FF6600" />
            )}
          </TouchableOpacity>
        </View>

        {/* Address */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* City */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Town / City</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            value={city}
            onChangeText={setCity}
          />
        </View>

        {/* Postcode */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Postcode</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            value={postcode}
            onChangeText={setPostcode}
          />
        </View>

        {/* Phone */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Required"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        
      </ScrollView>

      {/* Country Picker Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🌍 Select Country</Text>
            <FlatList
              data={countries}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryOption}
                  onPress={() => {
                    setCountry(item);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.countryText,
                      country === item ? styles.countrySelected : null,
                    ]}
                  >
                    {item}
                  </Text>
                  {country === item && (
                    <Ionicons name="checkmark-circle" size={20} color="green" />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  countryRow: {
    marginBottom: 20,
  },
  countrySelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  countryText: {
    fontSize: 16,
    color: "#333",
  },
  countrySelected: {
    color: "#003366", // dark blue for selected country
    fontWeight: "600",
  },
  inputWrapper: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f6f7fb",
  },
  saveButton: {
    backgroundColor: "#FF6600",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 90,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  countryOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeModal: {
    marginTop: 15,
    backgroundColor: "#FF6600",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalText: {
    color: "#fff",
    fontWeight: "600",
  },
});
