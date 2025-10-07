import { LinearGradient } from 'expo-linear-gradient';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderTrackingScreen = () => {
  const trackingSteps = [
    {
      id: 1,
      title: 'Packed',
      description:
        'Your parcel is packed and will be handed over to our delivery partner.',
      time: 'Apr 19 12:31',
      status: 'completed',
    },
    {
      id: 2,
      title: 'On the Way to Logistic Facility',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit; sed diam nonumy eirmod tempor invidunt ut labore.',
      time: 'Apr 19 16:20',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Arrived at Logistic Facility',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit; sed diam nonumy eirmod tempor invidunt ut labore.',
      time: 'Apr 19 19:07',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Shipped',
      description:
        'Estimated delivery tomorrow.',
      time: 'Expected Apr 20',
      status: 'pending',
    },
  ];

  const fillRatio = 0.5; // how much of the line is filled

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ------- Header ------- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>To Receive</Text>
            <Text style={styles.headerSubtitle}>Track Your Order</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="card-giftcard" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="settings" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ------- Thermometer-style Progress ------- */}
      <View style={styles.progressWrapper}>
        <View style={styles.track} />
        <LinearGradient
          colors={['#FFB347', '#FA8232', '#FF5722']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${fillRatio * 100}%` }]}
        />
        {trackingSteps.map((_, i) => {
          const dotLeft = `${(i / (trackingSteps.length - 1)) * 100}%`;
          const active = i <= 1; // first two are active for demo
          return (
            <View
              key={i}
              style={[
                styles.dot,
                { left: dotLeft },
                active ? styles.dotActive : styles.dotInactive,
              ]}
            />
          );
        })}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ------- Tracking Number Section ------- */}
        <View style={styles.trackingSection}>
          <Text style={styles.sectionTitle}>Tracking Number</Text>
          <Text style={styles.trackingNumber}>
            LGS-192927839300763731
          </Text>
        </View>

        {/* ------- Steps with Description ------- */}
        <View style={{ paddingTop: 20 }}>
          {trackingSteps.map(step => {
            const isDim = step.status !== 'completed';
            return (
              <View key={step.id} style={styles.stepItem}>
                <View style={styles.stepHeader}>
                  <Text style={[styles.stepTitle, isDim && styles.dimText]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.stepTime, isDim && styles.dimText]}>
                    {step.time}
                  </Text>
                </View>
                <Text style={[styles.stepDescription, isDim && styles.dimText]}>
                  {step.description}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DOT_SIZE = 18;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: { fontSize: 18, fontWeight: '600', color: '#1976D2' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
  headerIcons: { flexDirection: 'row' },
  iconButton: { padding: 8, marginLeft: 12 },

  /* Thermometer progress */
  progressWrapper: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
    height: DOT_SIZE,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E6E6E6',
    left: 0,
    right: 0,
  },
  fill: {
    position: 'absolute',
    height: 10,
    borderRadius: 5,
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginLeft: -DOT_SIZE / 2,
    backgroundColor: '#ccc',
  },
  dotActive: { backgroundColor: '#FF7A30' },
  dotInactive: { backgroundColor: '#DADADA' },

  /* Tracking number */
  trackingSection: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 14, fontWeight: '500', color: '#666', marginBottom: 6 },
  trackingNumber: { fontSize: 18, fontWeight: '600', color: '#1A1A1A' },

  /* Steps */
  stepItem: { marginBottom: 24 },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  stepTime: { fontSize: 14, color: '#2196F3' },
  stepDescription: { fontSize: 14, color: '#000', lineHeight: 20 },
  dimText: { color: '#B0B0B0' },
});

export default OrderTrackingScreen;
