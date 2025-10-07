import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function PaymentScreen() {
  const [selectedOption, setSelectedOption] = useState("Standard");
  const [voucherVisible, setVoucherVisible] = useState(false);

  // ======= NEW: payment-flow states =======
  // null | 'choose' | 'select' | 'progress' | 'error' | 'done'
  const [paymentStep, setPaymentStep] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false)

  // ======= existing items =======
  const items = [
    {
      id: "1",
      image: "https://picsum.photos/100/100?1",
      desc: "Lorem ipsum dolor sit amet consectetur.",
      price: 17.0,
      quantity: 1,
    },
    {
      id: "2",
      image: "https://picsum.photos/100/100?2",
      desc: "Lorem ipsum dolor sit amet consectetur.",
      price: 17.0,
      quantity: 1,
    },
    {
      id: "3",
      image: "https://picsum.photos/100/100?3",
      desc: "Another cute item for testing.",
      price: 20.0,
      quantity: 2,
    },
  ];

  // cards to show in the choose-card modal
  const cards = [
    { id: "c1", brand: "Mastercard", last4: "1234" },
    { id: "c2", brand: "Visa", last4: "5678" },
  ];

  const ShippingOption = ({ type, days, price }) => {
    const selected = selectedOption === type;
    return (
      <TouchableOpacity
        style={[styles.optionRow, selected && styles.optionSelected]}
        onPress={() => setSelectedOption(type)}
      >
        <Ionicons
          name={selected ? "checkmark-circle" : "ellipse-outline"}
          size={22}
          color={selected ? "#FF6C44" : "#ccc"}
          style={{ marginRight: 10 }}
        />
        <View style={styles.optionTextRow}>
          <Text style={styles.optionTitle}>{type}</Text>
          <Text style={styles.optionDays}>{days}</Text>
          <Text style={styles.optionPrice}>{price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        {item.quantity >= 1 && (
          <View style={styles.qtyBadge}>
            <Text style={styles.qtyText}>{item.quantity}</Text>
          </View>
        )}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemDesc}>{item.desc}</Text>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const startPayment = () => {
    setPaymentStep("progress");
    setTimeout(() => {
      Math.random() > 0.5 ? setPaymentStep("done") : setPaymentStep("error");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Payment</Text>

      {/* Shipping Address */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionText}>
          25, Duyen 3, Xa Thien Ward, Xa Phu, District 2, Ho Chi Minh City
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionText}>+69 123 0000</Text>
        <Text style={styles.sectionText}>andresinango@example.com</Text>
      </View>

      {/* Items List */}
      <View style={styles.itemHeader}>
        <Text style={styles.sectionTitle}>Items ({items.length})</Text>
        <TouchableOpacity
          style={styles.addVoucherBtn}
          onPress={() => setVoucherVisible(true)}
        >
          <Text style={styles.addVoucherText}>Add Voucher</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      {/* Shipping Options */}
      <View style={styles.shippingSection}>
        <Text style={styles.sectionTitle}>Shipping Options</Text>
        <ShippingOption type="Standard" days="5-7 days" price="FREE" />
        <ShippingOption type="Express" days="1-2 days" price="$12.00" />
        <Text style={styles.deliveryNote}>
          Delivered on or before Thursday, 23 April 2020
        </Text>
      </View>

      {/* Payment Method */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => setPaymentStep("choose")}
        >
          <Text style={styles.cardButtonText}>Card</Text>
        </TouchableOpacity>
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total ${total.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.payText}>Pay</Text>
        </TouchableOpacity>

      </View>

      {/* ======== 6 MODALS ======== */}

      {/* 1️⃣ Voucher Modal */}
      <Modal
        visible={voucherVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setVoucherVisible(false)}
      >

        <TouchableWithoutFeedback onPress={() => setVoucherVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              <Text style={styles.header}>Active Vouchers</Text>
              {[{
                title: "First Purchase",
                desc: "5% off your next order",
                date: "Valid Until 6.8.20",
              },
              {
                title: "Gift From Customer Care",
                desc: "15% off your next purchase",
                date: "Valid Until 6.8.20",
              }].map((v, i) => (
                <View key={i} style={styles.voucherCard}>
                  <View style={styles.voucherInfo}>
                    <Text style={styles.voucherTitle}>{v.title}</Text>
                    <Text style={styles.voucherDesc}>{v.desc}</Text>
                    <Text style={styles.voucherDate}>{v.date}</Text>
                  </View>
                  <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 2️⃣ Choose / Add Card */}

      <Modal visible={paymentStep === "choose"} transparent animationType="slide">

        <TouchableWithoutFeedback onPress={() => setPaymentStep(null)}>

          <View style={styles.overlay}>
            <View style={styles.sheet}>
              <Text style={styles.modalTitle}>Payment Methods</Text>
              <FlatList
                data={cards}
                keyExtractor={(c) => c.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.cardRow}
                    onPress={() => {
                      setSelectedCard(item);
                      setPaymentStep("select");
                    }}
                  >
                    <Ionicons name="card" size={24} color="#FF6C44" />
                    <Text style={{ marginLeft: 10 }}>
                      {item.brand} **** {item.last4}
                    </Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => alert("Open add card flow")}
              >
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={{ color: "#fff", marginLeft: 8, fontWeight: "600" }}>
                  Add Card
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 3️⃣ Select Card Confirmation */}
      <Modal visible={paymentStep === "select"} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setPaymentStep(null)}>
          <View style={styles.overlayCenter}>
            <View style={styles.box}>
              <Text style={styles.modalTitle}>Use this card?</Text>
              <Text style={{ marginVertical: 8 }}>
                {selectedCard?.brand} **** {selectedCard?.last4}
              </Text>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={startPayment}
              >
                <Text style={styles.primaryText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 4️⃣ Payment Progress */}
      <Modal visible={paymentStep === "progress"} transparent animationType="fade">
        <View style={styles.overlayCenter}>
          <View style={styles.box}>
            <ActivityIndicator size="large" color="#FF6C44" />
            <Text style={{ marginTop: 10 }}>Payment in progress…</Text>
          </View>
        </View>
      </Modal>

      {/* 5️⃣ Payment Failed */}
      <Modal visible={paymentStep === "error"} transparent animationType="fade">
        <View style={styles.overlayCenter}>
          <View style={styles.box}>
            <Text style={styles.modalTitle}>Payment Failed</Text>
            <Text style={{ textAlign: "center", color: "#666", marginVertical: 8 }}>
              Please try again or choose another payment method.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={startPayment}>
              <Text style={styles.primaryText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: "#ccc", marginTop: 10 }]}
              onPress={() => setPaymentStep(null)}
            >
              <Text style={{ color: "#000", fontWeight: "700" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 6️⃣ Payment Success */}
      <Modal visible={paymentStep === "done"} transparent animationType="fade">
        <View style={styles.overlayCenter}>
          <View style={styles.box}>
            <Ionicons name="checkmark-circle" size={60} color="green" />
            <Text style={styles.modalTitle}>Transaction Complete</Text>
            <Text style={{ marginBottom: 12, textAlign: "center", color: "#666" }}>
              Thank you — your order is being processed.
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setPaymentStep(null)}
            >
              <Text style={styles.primaryText}>Track My Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Shipping Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.backdrop}>
            {/* Stop touch propagation inside content */}
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContent}
              >
                <Text style={styles.title}>Shipping Address</Text>

                <Text style={styles.label}>Country</Text>

                <View style={{justifyContent:'space-between', alignContent:'center', flexDirection:'row'}}>
                  <Text>India</Text>
                  <Pressable style={styles.iconecolor}>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </Pressable>

                </View>




                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Magadi Main Rd, next to Prasanna Theatre"
                />

                <Text style={styles.label}>Town / City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Bengaluru, Karnataka 560023"
                />

                <Text style={styles.label}>Postcode</Text>
                <TextInput style={styles.input} placeholder="70000" keyboardType="numeric" />

                <TouchableOpacity style={styles.saveBtn} onPress={() => setShowModal(false)}>
                  <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 24, fontWeight: "700", marginVertical: 6 },
  sectionCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  sectionText: { fontSize: 14, color: "#555", marginBottom: 4 },
  editBtn: { backgroundColor: "#FF6C44", borderRadius: 16, padding: 4 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  addVoucherBtn: {
    borderWidth: 1,
    borderColor: "#FF6C44",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  addVoucherText: { color: "#FF6C44", fontWeight: "600" },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 12, marginTop: 8 },
  itemImage: { width: 60, height: 60, borderRadius: 10, marginRight: 12, backgroundColor: "#eee" },
  qtyBadge: {
    position: "absolute",
    top: -6,
    right: -5,
    backgroundColor: "#FF6C44",
    borderRadius: 12,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  itemInfo: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  itemDesc: { fontSize: 14, flex: 1, marginRight: 10 },
  itemPrice: { fontSize: 16, fontWeight: "600", color: "#FF6C44" },
  shippingSection: { marginTop: 20, marginBottom: 20 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 12,
  },
  optionSelected: { backgroundColor: "#F9F9F9", borderColor: "#FF6C44" },
  optionTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  optionTitle: { fontSize: 16, fontWeight: "500" },
  optionDays: { fontSize: 14, color: "#888", marginHorizontal: 10 },
  optionPrice: { fontSize: 16, fontWeight: "600", color: "#FF6C44" },
  deliveryNote: { fontSize: 13, color: "#888", marginTop: 4 },
  cardButton: {
    backgroundColor: "#E5EBFC",
    paddingVertical: 10,
    borderRadius: 16,
    marginTop: 8,
    alignItems: "center",
    height: 40,
    width: 100,
  },
  cardButtonText: { color: "#FF6C44", fontWeight: "600" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  totalText: { fontSize: 18, fontWeight: "700" },
  payButton: {
    backgroundColor: "#202020",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  voucherCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff7f2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF6C44",
  },
  voucherInfo: { flex: 1, marginRight: 10 },
  voucherTitle: { fontWeight: "700", fontSize: 16, color: "#333" },
  voucherDesc: { color: "#666", marginVertical: 4 },
  voucherDate: { color: "#999", fontSize: 12 },
  applyBtn: {
    alignSelf: "center",
    backgroundColor: "#FF6C44",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  applyText: { color: "#fff", fontWeight: "600" },

  // ======= NEW modal styles =======
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlayCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  addBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#FF6C44",
  },
  primaryBtn: {
    backgroundColor: "#FF6C44",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 12,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "orange",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold" },
  iconecolor: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#a3a09dff",
    alignItems: "center",
    justifyContent: "center",
  },

});

