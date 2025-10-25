import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PaymentHeader from "@/components/SettingHeader";

const PaymentMethodsScreen = () => {
    const router=useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [cardData, setCardData] = useState({
    cardHolder: "",
    cardNumber: "",
    valid: "",
    cvv: "",
  });

  const handleInputChange = (field, value) => {
    setCardData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSaveChanges = () => {
    let newErrors = {};
    if (!cardData.cardHolder.trim())
      newErrors.cardHolder = "Card holder name is required";
    if (!cardData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!cardData.valid.trim()) newErrors.valid = "Expiry date is required";
    if (!cardData.cvv.trim()) newErrors.cvv = "CVV is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Card data:", cardData);
    setModalVisible(false);
    setCardData({
      cardHolder: "",
      cardNumber: "",
      valid: "",
      cvv: "",
    });
    setErrors({});
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const DottedLine = () => {
    return (
      <View style={styles.dottedLineContainer}>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <PaymentHeader
        title="Settings"
        subtitle="Payment Method"
        showBack
        onBackPress={() => router.back()}
      />
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.title}>Payment Methods</Text>
      </View> */}

      <ScrollView style={styles.content}>
        {/* Card Example */}
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <View style={styles.circlesContainer}>
              <LinearGradient
                colors={["#EB001B", "#F2661C"]}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.circle}
              />
              <LinearGradient
                colors={["#F2661C", "#F79E1B"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.circle, { marginLeft: -30 }]}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <DottedLine />
              <Text style={styles.cardNumber}>1579</Text>
            </View>
            <View style={styles.numbersContainer}>
              <Text style={styles.cardHolderName}>AMANDA MORGAN</Text>
              <Text style={styles.cardNumber}>1272</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Card</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.form}>
                {/* Card Holder */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Card Holder</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter card holder name"
                    value={cardData.cardHolder}
                    onChangeText={(text) =>
                      handleInputChange("cardHolder", text)
                    }
                  />
                  {errors.cardHolder ? (
                    <Text style={styles.errorText}>{errors.cardHolder}</Text>
                  ) : null}
                </View>

                {/* Card Number */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter card number"
                    value={cardData.cardNumber}
                    onChangeText={(text) =>
                      handleInputChange("cardNumber", formatCardNumber(text))
                    }
                    keyboardType="numeric"
                    maxLength={19}
                  />
                  {errors.cardNumber ? (
                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                  ) : null}
                </View>

                {/* Valid & CVV in one row */}
                <View style={styles.row}>
                  <View
                    style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}
                  >
                    <Text style={styles.inputLabel}>Valid</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="MM/YY"
                      value={cardData.valid}
                      onChangeText={(text) =>
                        handleInputChange("valid", formatExpiryDate(text))
                      }
                      keyboardType="numeric"
                      maxLength={5}
                    />
                    {errors.valid ? (
                      <Text style={styles.errorText}>{errors.valid}</Text>
                    ) : null}
                  </View>

                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChangeText={(text) =>
                        handleInputChange("cvv", text.replace(/\D/g, ""))
                      }
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                    />
                    {errors.cvv ? (
                      <Text style={styles.errorText}>{errors.cvv}</Text>
                    ) : null}
                  </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveChanges}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 50
  },
  header: { gap: 20, marginTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  title: { fontSize: 16 },
  content: { flex: 1 },
  cardContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    marginTop: 20,
  },
  cardContent: {
    flex: 1,
    backgroundColor: "#F1F4FE",
    gap: 12,
    height: 150,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  circlesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  dottedLineContainer: {
    flexDirection: "row",
    height: 2,
    alignItems: "center",
  },
  dot: {
    width: 4,
    height: 2,
    backgroundColor: "#000",
    marginRight: 4,
    borderRadius: 1,
  },
  numbersContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cardHolderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    textAlign: "left",
    letterSpacing: 2,
  },
  addButton: {
    width: 50,
    height: 150,
    backgroundColor: "#FA8232",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
    lineHeight: 32,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: { fontSize: 24, color: "#666" },
  form: { padding: 16 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  saveButton: {
    backgroundColor: "#FA8232",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default PaymentMethodsScreen;
