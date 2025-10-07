import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function OrderTrackingScreen() {
  const steps = [
    {
      id: 1,
      title: "Packed",
      desc: "Your parcel is packed and will be handed over to our delivery partner.",
      time: "April 19 12:31",
    },
    {
      id: 2,
      title: "On the Way to Logistic Facility",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore.",
      time: "April 19 16:20",
    },
    {
      id: 3,
      title: "Arrived at Logistic Facility",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore.",
      time: "April 19 19:07",
    },
    {
      id: 4,
      title: "Shipped",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore.",
      time: "April 20 08:15",
    },
    {
      id: 5,
      title: "Out for Delivery",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore.",
      time: "April 22 11:10",
    },
  ];

  const fillRatio =
    steps.length > 1 ? (steps.length - 1) / (steps.length - 1) : 1;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image
            source={require('../assets/images/choice3.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.headerTitle}>To Recieve</Text>
            <Text style={styles.headerSubtitle}>Track Your Order</Text>
          </View>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconWrap}>
            <Icon name="card-giftcard" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrap}>
            <Icon name="menu" size={22} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrap}>
            <Icon name="settings" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------- Progress bar ---------- */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack} />
        <LinearGradient
          colors={["#008CFF", "#008CFF"]}
          style={[styles.progressFill, { width: `${fillRatio * 100}%` }]}
        />
        {steps.map((_, i) => {
          const left = `${(i / (steps.length - 1)) * 100}%`;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                { left },
                i === steps.length - 1 && styles.activeDot,
              ]}
            />
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- Tracking Number ---------- */}
        <View style={styles.trackCard}>
          <View>
            <Text style={styles.trackLabel}>Tracking Number</Text>
            <Text style={styles.trackValue}>LGS-8292783930076731</Text>
          </View>
          <Icon name="content-copy" size={20} color="#FF7A30" />
        </View>

        {/* ---------- Steps ---------- */}
        {steps.map((step) => (
          <View key={step.id} style={styles.stepBox}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepTime}>{step.time}</Text>
            </View>
            <Text style={styles.stepDesc}>{step.desc}</Text>
          </View>
        ))}

        {/* ---------- Bottom Alert ---------- */}

        <View style={styles.alertBar}>

          <Pressable style={styles.alertbutton}>

            <Text style={styles.alertText}>
              Attempt to deliver your parcel was not successful
            </Text>
            <Icon name="arrow-forward-ios" size={16} color="#E53935" />
          </Pressable>
          <Text style={styles.alertDate}>April 23 15:59</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DOT = 16;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  leftHeader: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#000" },
  headerSubtitle: { fontSize: 13, color: "#666" },
  rightIcons: { flexDirection: "row" },
  iconWrap: { marginLeft: 12 },

  progressContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: DOT,
    justifyContent: "center",
  },
  progressTrack: {
    position: "absolute",
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
    left: 0,
    right: 0,
  },
  progressFill: {
    position: "absolute",
    height: 6,
    borderRadius: 3,
  },
  dot: {
    position: "absolute",
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: "#008CFF",
    marginLeft: -DOT / 2,
  },
  activeDot: { backgroundColor: "#FF2D55" },

  trackCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  trackLabel: { fontSize: 14, color: "#666" },
  trackValue: { fontSize: 16, fontWeight: "600", color: "#000" },

  stepBox: { marginBottom: 22 },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000"
  },
  stepTime: {
    fontSize: 14,
    color: "#999"
  },
  stepDesc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20
  },

  alertBar: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',        // ➜ let content wrap to next line
    alignItems: 'center',    // vertically center icon/date if needed
    flexDirection: 'row'
  },
  alertbutton: {
    flexDirection: 'row'
  },
  alertText: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    flexShrink: 1,           // ➜ text can shrink if space is tight
  },
  alertDate: {
    color: '#E53935',
    marginBottom: 4,
    marginLeft: 8,
  },

});
