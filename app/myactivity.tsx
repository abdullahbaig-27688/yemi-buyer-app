import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MyActivityScreen() {

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/choice3.png')}
                        style={styles.avatar}
                    />
                    <Text style={styles.headerTitle}>My Activity</Text>

                    <View style={styles.headerIcons}>

                        <TouchableOpacity style={styles.iconWrap}>
                            <Icon name="gift-outline" size={22} color="#FA8232" style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconWrap}>
                            <Icon name="menu" size={22} color="#FA8232" style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconWrap}>
                            <Icon name="settings-outline" size={22} color="#FA8232" style={styles.icon} />
                        </TouchableOpacity>

                    </View>

                </View>

                {/* Month Selector */}
                <Pressable style={styles.monthBox}>

                    <Text style={styles.monthText}>April</Text>

                </Pressable>


                {/* Circular Chart */}
                <View style={styles.chartContainer}>
                    <Icon name="chevron-left" size={28} color="#999" style={styles.chevronLeft} />
                    <View style={styles.chartBox}>
                        <Svg height="200" width="200">
                            <Circle cx="100" cy="100" r="90" stroke="#FF6F00" strokeWidth="18" fill="none" />
                            <Circle cx="100" cy="100" r="90" stroke="#FF4081" strokeWidth="18" fill="none"
                                strokeDasharray="565" strokeDashoffset="200" />
                            <Circle cx="100" cy="100" r="90" stroke="#4CAF50" strokeWidth="18" fill="none"
                                strokeDasharray="565" strokeDashoffset="400" />
                        </Svg>

                        <View style={styles.chartCenter}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>$365,00</Text>
                        </View>
                    </View>
                    <Icon name="chevron-right" size={28} color="#999" style={styles.chevronRight} />
                </View>

                {/* Category Pills */}
                <View style={styles.categories}>

                    <Text style={[styles.category, { backgroundColor: "#FF6F00" }]}>
                        Clothing $183.00
                    </Text>

                    <Text style={[styles.category, { backgroundColor: "#4CAF50" }]}>
                        Lingerie $92.00
                    </Text>
                    <Text style={[styles.category, { backgroundColor: "#FFA000" }]}>
                        Shoes $47.00
                    </Text>
                    <Text style={[styles.category, { backgroundColor: "#E91E63" }]}>
                        Bags $43.00
                    </Text>
                </View>

                {/* Order Status */}
                <View style={styles.statusRow}>

                    <View style={styles.statusItem}>
                        <View style={styles.statusCircle}>
                            <Text style={styles.statusNumber}>12</Text>
                        </View>
                        <Text style={styles.statusLabel}>Ordered</Text>
                    </View>

                    <View style={styles.statusItem}>

                        <View style={styles.statusCircle}>
                            <Text style={styles.statusNumber}>7</Text>
                        </View>
                        <Text style={styles.statusLabel}>Received</Text>

                    </View>

                    <View style={styles.statusItem}>
                        <View>
                            <View style={styles.statusCircle}>
                                <Text style={styles.statusNumber}>5</Text>
                            </View>
                        </View>
                        <Text style={styles.statusLabel}>To Receive</Text>

                    </View>
                </View>

                {/* Order History Button */}
                <TouchableOpacity style={styles.orderBtn}>
                    <Text style={styles.orderBtnText}>Order History</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: { flex: 1, backgroundColor: "#fff" },
    scroll: { paddingHorizontal: 20, paddingBottom: 20 },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "space-between",
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    headerTitle: { fontSize: 20, fontWeight: "600", flex: 1, color: "#333" },
    headerIcons: { flexDirection: "row" },
    icon: {},
    iconWrap: {
        backgroundColor: '#E5EBFC',
        marginHorizontal: 5,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'

    },
    monthBox: {
        backgroundColor: "#f5f5f5",
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: "center",
        height: 40,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    monthText: { fontSize: 16, fontWeight: "500" },

    chartContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    chartBox: { alignItems: "center", justifyContent: "center" },
    chartCenter: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#f5f5f5',
        height:120,
        width:120,
        borderRadius:60
    },
    totalLabel: { fontSize: 16, color: "#888" },
    totalAmount: { fontSize: 22, fontWeight: "700" },

    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginVertical: 10,
    },
    category: {
        color: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
        margin: 5,
        fontWeight: "600",
    },

    statusRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    statusItem: { alignItems: "center" },
    statusCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    statusNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        backgroundColor: "#FF6F00",
        height: 52,
        width: 52,
        borderRadius: 30,
        textAlign: "center",
        textAlignVertical: "center",
        textAlignVertical: "center",
        lineHeight: 40,
    },

    statusLabel: {
        marginTop: 6,
        fontSize: 14,
        color: "#555"
    },

    orderBtn: {
        backgroundColor: "#FF6F00",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 30,
    },
    orderBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },

});
