import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8; // 80% of screen width

const PaymentMethodsScreen = () => {
  const cards = [
    {
      id: "1",
      type: "MasterCard",
      circles: ["orange", "red"],
      number: "•••• •••• ••••",
      last: "1579",
      holder: "AMANDA MORGAN",
      expiry: "12/22",
    },
    {
      id: "2",
      type: "Visa",
      circles: ["blue", "lightblue"],
      number: "•••• •••• ••••",
      last: "4532",
      holder: "AMANDA MORGAN",
      expiry: "08/24",
    },
  ];

  const transactions = [
    { id: "1", date: "April19 2020 12:31", order: "#92287157", amount: "-$14.00" },
    { id: "2", date: "April19 2020 12:31", order: "#92287157", amount: "-$37.00", negative: true },
    { id: "3", date: "April19 2020 12:31", order: "#92287157", amount: "-$21.00" },
    { id: "4", date: "April19 2020 12:31", order: "#92287157", amount: "-$75.00" },
    { id: "5", date: "April19 2020 12:31", order: "#92287157", amount: "-$214.00" },
    { id: "6", date: "April19 2020 12:31", order: "#92287157", amount: "-$53.00" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Payment Methods</Text>

      {/* Card carousel */}
      <FlatList
        data={cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 15}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: CARD_WIDTH }]}>
            {/* Two overlapping circles */}
            <View style={styles.circleRow}>
              <View
                style={[styles.circle, { backgroundColor: item.circles[0] }]}
              />
              <View
                style={[
                  styles.circle,
                  { backgroundColor: item.circles[1], marginLeft: -15 },
                ]}
              />
            </View>

            {/* Card Number + Last Digits */}
            <View style={styles.rowBetween}>
              <Text style={styles.cardNumber}>{item.number}</Text>
              <Text style={styles.cardNumber}>{item.last}</Text>
            </View>

            {/* Name + Expiry Date */}
            <View style={styles.rowBetween}>
              <Text style={styles.cardHolder}>{item.holder}</Text>
              <Text style={styles.cardHolder}>{item.expiry}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      />

      {/* Transactions */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionRow}>
            <View style={styles.iconWrapper}>
              <Ionicons name="lock-closed" size={20} color="#FF6600" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.order}>Order {item.order}</Text>
            </View>
            <Text
              style={[
                styles.amount,
                { color: item.negative ? "red" : "#000" },
              ]}
            >
              {item.amount}
            </Text>
          </View>
        )}
      />

      
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal:16
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
    marginTop:20
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f7f8fb",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom:20
  },
  circleRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardHolder: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#f7f8fb",
  },
  iconWrapper: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  order: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
