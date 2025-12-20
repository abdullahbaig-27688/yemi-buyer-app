import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import countriesData from "world-countries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShippingHeader from "@/components/SettingHeader";

const ShippingAddressScreen = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const countries = countriesData.map((c) => c.name.common).sort();

  // ---------------- PREFILL ON MOUNT ----------------
  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("shipping_address");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setCountry(parsed.country || "");
          setAddress(parsed.address || "");
          setCity(parsed.city || "");
          setPostcode(parsed.postcode || "");
          setPhone(parsed.phone || "");
        }
      } catch (err) {
        console.log("Error fetching shipping info:", err);
      }
    };

    fetchShippingData();
  }, []);

  // ---------------- SAVE SHIPPING DATA ----------------
  const handleSave = async () => {
    if (!name || !country || !address || !city || !postcode || !phone) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const data = { name, country, address, city, postcode, phone };
      await AsyncStorage.setItem("shipping_address", JSON.stringify(data));

      // Show success message (optional)
      // Alert.alert("✅ Success", "Shipping address saved successfully");

      // Navigate to Payment Method Screen
      router.push("/paymentmethod"); // <-- change this to your payment screen route
    } catch (err) {
      console.log("Error saving shipping info:", err);
      Alert.alert("Error", "Failed to save shipping address");
    }
  };

  return (
    <View style={styles.container}>
      <ShippingHeader
        title="Settings"
        subtitle="Shipping Address"
        showBack
        onBackPress={() => router.back()}
      />
      {/* Name */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Contact Person Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Required"
          value={name}
          onChangeText={setName}
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

          {country ? (
            <Ionicons name="checkmark-circle" size={24} color="#FF6600" />
          ) : (
            <Ionicons name="earth" size={24} color="#FF6600" />
          )}
        </TouchableOpacity>
      </View>

      {/* City */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Required"
          value={city}
          onChangeText={setCity}
        />
      </View>

      {/* Postcode */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Required"
          value={postcode}
          onChangeText={setPostcode}
        />
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

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Proceed to Checkout</Text>
      </Pressable>

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
    </View>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  label: { fontSize: 20, color: "#333", marginBottom: 6 },
  countryRow: {},
  countrySelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  countryText: { fontSize: 16, color: "#333" },
  countrySelected: { color: "#003366", fontWeight: "600" },
  inputWrapper: { marginBottom: 25 },
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
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
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
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
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
  closeModalText: { color: "#fff", fontWeight: "600" },
});
