import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function productscreen() {
    const mainImage = require("../assets/images/product.png");
    const choice1 = require("../assets/images/choice1.png");
    const choice2 = require("../assets/images/choice2.png");
    const choice3 = require("../assets/images/choice3.png");

    const [selectedColor, setSelectedColor] = useState("Pink");
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const variations = [
        { id: 1, img: choice1, name: "Pink" },
        { id: 2, img: choice2, name: "Blue" },
        { id: 3, img: choice3, name: "Purple" },
        { id: 4, img: choice1, name: "Peach" },
    ];

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const onAddToCart = () => {
        console.log("Add to cart:", { selectedColor, selectedSize, quantity });
        setModalVisible(false);
    };

    const onBuyNow = () => {
        console.log("Buy now:", { selectedColor, selectedSize, quantity });
        setModalVisible(false);
    };

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Image source={mainImage} style={styles.mainImage} resizeMode="cover" />

                <View style={styles.detailsContainer}>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>$17,00</Text>
                        <TouchableOpacity style={styles.sharecard}>
                            <Ionicons name={"return-up-forward-outline"} size={22} color="#242222" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris,
                        scelerisque eu mauris id, pretium pulvinar sapien.
                    </Text>

                    <View style={styles.variationHeader}>
                        <Text style={styles.variationTitle}>Variations</Text>

                        <View style={styles.selectionPreview}>
                            <Text style={styles.selectionText}>{selectedColor}</Text>
                            <View style={styles.sizePill}>
                                <Text style={styles.sizePillText}>{selectedSize}</Text>
                            </View>
                        </View>

                        <Pressable style={styles.iconecolor} onPress={() => setModalVisible(true)}>
                            <Ionicons name="arrow-forward" size={16} color="#fff" />
                        </Pressable>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variationList}>
                        {variations.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.variationItem,
                                    selectedColor === item.name && styles.variationItemSelected,
                                ]}
                                onPress={() => setSelectedColor(item.name)}
                            >
                                <Image source={item.img} style={styles.variationImage} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.buttonsRow}>
                        <TouchableOpacity style={styles.heartBtn} onPress={() => setIsFavorite((s) => !s)}>
                            <Ionicons
                                name={isFavorite ? "heart" : "heart-outline"}
                                size={28}
                                color={isFavorite ? "#f97316" : "#242222"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cartBtn} onPress={() => setModalVisible(true)}>
                            <Text style={styles.cartText}>Add to cart</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buyBtn} onPress={() => setModalVisible(true)}>
                            <Text style={styles.buyText}>Buy now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {/* Tap anywhere on this Pressable overlay to close */}
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    {/* stopPropagation so taps inside bottom sheet don’t close */}
                    <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.handleWrap}>
                            <View style={styles.handle} />
                        </View>

                        <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>
                            <View style={styles.topRow}>
                                <Image source={choice1} style={styles.thumb} />
                                <View style={styles.topInfo}>
                                    <Text style={styles.modalPrice}>$17,00</Text>
                                    <View style={styles.pillsRow}>
                                        <View style={styles.pill}>
                                            <Text style={styles.pillText}>{selectedColor}</Text>
                                        </View>
                                        <View style={[styles.pill, styles.pillMini]}>
                                            <Text style={styles.pillText}>{selectedSize}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.sectionTitle}>Color Options</Text>
                            <View style={styles.colorOptionsRow}>
                                {variations.map((v) => (
                                    <TouchableOpacity
                                        key={v.id}
                                        style={[
                                            styles.colorOption,
                                            selectedColor === v.name && styles.colorOptionActive,
                                        ]}
                                        onPress={() => setSelectedColor(v.name)}
                                    >
                                        <Image source={v.img} style={styles.colorImg} />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.sectionTitle}>Size</Text>
                            <View style={styles.sizeRow}>
                                {["S", "M", "L", "XL", "XXL", "XXXL"].map((s) => (
                                    <TouchableOpacity
                                        key={s}
                                        onPress={() => setSelectedSize(s)}
                                        style={[styles.sizeButton, selectedSize === s && styles.sizeButtonActive]}
                                    >
                                        <Text
                                            style={[
                                                styles.sizeButtonText,
                                                selectedSize === s && styles.sizeButtonTextActive,
                                            ]}
                                        >
                                            {s}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.quantityRow}>
                                <Text style={styles.sectionTitle}>Quantity</Text>
                                <TouchableOpacity style={styles.circleBtn} onPress={decrement}>
                                    <Text style={styles.circleBtnText}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.quantityDisplay}>
                                    <Text style={styles.quantityNumber}>{quantity}</Text>
                                </View>
                                <TouchableOpacity style={styles.circleBtn} onPress={increment}>
                                    <Text style={styles.circleBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalActions}>
                                <TouchableOpacity style={styles.heartBtnModal} onPress={() => setIsFavorite((s) => !s)}>
                                    <Ionicons
                                        name={isFavorite ? "heart" : "heart-outline"}
                                        size={26}
                                        color={isFavorite ? "#f97316" : "#242222"}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cartBtnModal} onPress={onAddToCart}>
                                    <Text style={styles.cartTextModal}>Add to cart</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buyBtnModal} onPress={onBuyNow}>
                                    <Text style={styles.buyTextModal}>Buy now</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <View style={styles.bottomIndicatorWrap}>
                            <View style={styles.bottomIndicator} />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, backgroundColor: "#fff" },
    mainImage: { width: "100%", height: 420 },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    price: { fontSize: 24, fontWeight: "700" },
    sharecard: { backgroundColor: "#f5f5f5", borderRadius: 20, padding: 8 },
    description: { color: "#555", marginTop: 8, lineHeight: 20 },
    variationHeader: { flexDirection: "row", alignItems: "center", marginTop: 20 },
    variationTitle: { fontSize: 18, fontWeight: "700", flex: 1 },
    selectionPreview: { flexDirection: "row", alignItems: "center", marginRight: 10 },
    selectionText: { color: "#888", marginRight: 8 },
    sizePill: { backgroundColor: "#eef2ff", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    sizePillText: { color: "#1f2937", fontWeight: "600", fontSize: 12 },
    iconecolor: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FF7A00",
        alignItems: "center",
        justifyContent: "center",
    },
    variationList: { marginTop: 12 },
    variationItem: { marginRight: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 10, overflow: "hidden" },
    variationItemSelected: { borderColor: "#f97316", borderWidth: 2 },
    variationImage: { width: 70, height: 90, resizeMode: "cover" },
    buttonsRow: { flexDirection: "row", alignItems: "center", marginTop: 30 },
    heartBtn: { padding: 8, marginRight: 12 },
    cartBtn: {
        flex: 1,
        backgroundColor: "#000",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginRight: 10,
    },
    buyBtn: {
        flex: 1,
        backgroundColor: "#f97316",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    cartText: { color: "#fff", fontWeight: "600" },
    buyText: { color: "#fff", fontWeight: "600" },

    /* Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "flex-end",
    },
    bottomSheet: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        maxHeight: "85%",
    },
    handleWrap: { alignItems: "center", paddingTop: 8 },
    handle: { width: 60, height: 6, borderRadius: 6, backgroundColor: "#e5e7eb" },
    modalBody: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
    topRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    thumb: { width: 52, height: 52, borderRadius: 12, marginRight: 12 },
    topInfo: { flex: 1 },
    modalPrice: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
    pillsRow: { flexDirection: "row", alignItems: "center" },
    pill: {
        backgroundColor: "#eef2ff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 14,
        marginRight: 8,
    },
    pillMini: { paddingHorizontal: 8, paddingVertical: 4 },
    pillText: { color: "#1f2937", fontWeight: "600", fontSize: 12 },
    sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 10, marginBottom: 8, color: "#111827" },
    colorOptionsRow: { flexDirection: "row", marginBottom: 6 },
    colorOption: {
        width: 64,
        height: 64,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#eee",
        overflow: "hidden",
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    colorOptionActive: { borderColor: "#3b82f6", borderWidth: 2 },
    colorImg: { width: 56, height: 56, resizeMode: "cover", borderRadius: 6 },
    sizeRow: { flexDirection: "row", marginBottom: 12 },
    sizeButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginRight: 10,
    },
    sizeButtonActive: { backgroundColor: "#eef2ff", borderColor: "#3b82f6" },
    sizeButtonText: { fontWeight: "600", color: "#374151" },
    sizeButtonTextActive: { color: "#1d4ed8" },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 8,
        gap: 5,
    },
    circleBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#f97316",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    circleBtnText: { fontSize: 22, color: "#f97316", fontWeight: "700" },
    quantityDisplay: {
        width: 64,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dbeafe",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eff6ff",
        marginRight: 12,
    },
    quantityNumber: { fontSize: 18, fontWeight: "700", color: "#1e40af" },
    modalActions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        marginBottom: 6,
    },
    heartBtnModal: { padding: 8, marginRight: 10 },
    cartBtnModal: {
        flex: 1,
        backgroundColor: "#000",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginRight: 10,
    },
    buyBtnModal: {
        flex: 1,
        backgroundColor: "#f97316",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    cartTextModal: { color: "#fff", fontWeight: "600" },
    buyTextModal: { color: "#fff", fontWeight: "600" },
    bottomIndicatorWrap: { alignItems: "center", paddingVertical: 8 },
    bottomIndicator: { width: 120, height: 8, borderRadius: 8, backgroundColor: "#111827" },
});
