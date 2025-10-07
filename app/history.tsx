import { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const orders = [
  {
    id: "1",
    img: "https://picsum.photos/300/300?random=1",
    text: "Lorem ipsum dolor sit amet consectetur.",
    orderId: "#92287157",
    date: "April.06",
  },
  {
    id: "2",
    img: "https://picsum.photos/300/300?random=2",
    text: "Lorem ipsum dolor sit amet consectetur.",
    orderId: "#92287157",
    date: "April.06",
  },
  {
    id: "3",
    img: "https://picsum.photos/300/300?random=3",
    text: "Lorem ipsum dolor sit amet consectetur.",
    orderId: "#92287157",
    date: "April.06",
  },
  {
    id: "4",
    img: "https://picsum.photos/300/300?random=4",
    text: "Lorem ipsum dolor sit amet consectetur.",
    orderId: "#92287157",
    date: "April.06",
  },
  {
    id: "5",
    img: "https://picsum.photos/300/300?random=5",
    text: "Lorem ipsum dolor sit amet consectetur.",
    orderId: "#92287157",
    date: "April.06",
  },
];

export default function HistoryScreen() {
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [doneModalVisible, setDoneModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const openReviewModal = (item) => {
    setSelectedOrder(item);
    setRating(0);
    setComment("");
    setReviewModalVisible(true);
  };

  const submitReview = () => {
    setReviewModalVisible(false);
    setDoneModalVisible(true);
  };

  const renderStars = (size = 30, onPressable = true) => (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onPressable && setRating(i)}
          activeOpacity={onPressable ? 0.7 : 1}
        >
          <Icon
            name={i <= rating ? "star" : "star-outline"}
            size={size}
            color="#FF6F00"
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>{item.text}</Text>
        <Text style={styles.orderId}>
          Order <Text style={{ fontWeight: "700" }}>{item.orderId}</Text>
        </Text>
        <View style={styles.bottomRow}>
          <Text style={styles.date}>{item.date}</Text>
          <TouchableOpacity
            style={styles.reviewBtn}
            onPress={() => openReviewModal(item)}
          >
            <Text style={styles.reviewText}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/choice2.png")}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>History</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconWrap}>
            <Icon name="gift-outline" size={22} color="#FA8232" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrap}>
            <Icon name="menu" size={22} color="#FA8232" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrap}>
            <Icon name="settings-outline" size={22} color="#FA8232" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Review Modal */}
      <Modal
        visible={reviewModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setReviewModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.reviewModal}>
                <Text style={styles.modalTitle}>Review</Text>
                {selectedOrder && (
                  <View style={styles.modalOrderRow}>
                    <Image
                      source={{ uri: selectedOrder.img }}
                      style={styles.modalImg}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: "#444" }}>{selectedOrder.text}</Text>
                      <Text style={{ fontWeight: "700", marginTop: 4 }}>
                        Order {selectedOrder.orderId}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Stars */}
                {renderStars()}

                {/* Comment box */}
                <TextInput
                  placeholder="Your comment"
                  style={styles.commentBox}
                  value={comment}
                  onChangeText={setComment}
                  multiline
                />

                {/* Say it button */}
                <TouchableOpacity
                  style={styles.sayBtn}
                  onPress={submitReview}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Say it!</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Done Modal */}
      <Modal
        visible={doneModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setDoneModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDoneModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.doneModal}>
                <View style={styles.doneIconWrap}>
                  <Icon name="heart" size={24} color="#FF6F00" />
                </View>
                <Text style={styles.doneTitle}>Done!</Text>
                <Text style={{ color: "#555", marginBottom: 10 }}>
                  Thank you for your review
                </Text>
                {renderStars(28, false)}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    color: "#333",
  },
  headerIcons: { flexDirection: "row" },
  iconWrap: {
    backgroundColor: "#E5EBFC",
    marginHorizontal: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardImage: { width: 80, height: 80, borderRadius: 8 },
  cardContent: { flex: 1, marginLeft: 12, justifyContent: "space-between" },
  cardText: { fontSize: 14, color: "#444", marginBottom: 4 },
  orderId: { fontSize: 14, color: "#444", marginBottom: 4 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: { fontSize: 13, color: "#666" },
  reviewBtn: {
    borderColor: "#FF6F00",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  reviewText: {
    color: "#FF6F00",
    fontWeight: "600",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewModal: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  modalOrderRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  modalImg: { width: 50, height: 50, borderRadius: 25 },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 100,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  sayBtn: {
    backgroundColor: "#FF6F00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  doneModal: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  doneIconWrap: {
    backgroundColor: "#FFE5CC",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    marginBottom: 10,
  },
  doneTitle: { fontSize: 18, fontWeight: "700", marginBottom: 5 },
});
