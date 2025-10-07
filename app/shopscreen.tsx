import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

const { width } = Dimensions.get("window");

const categories = [
  { id: "1", name: "Dresses", image: "https://randomuser.me/api/portraits/women/11.jpg" },
  { id: "2", name: "Pants", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: "3", name: "Skirts", image: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: "4", name: "Shorts", image: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: "5", name: "Jackets", image: "https://randomuser.me/api/portraits/women/55.jpg" },
  { id: "6", name: "Hoodies", image: "https://randomuser.me/api/portraits/women/66.jpg" },
  { id: "7", name: "Shirts", image: "https://randomuser.me/api/portraits/men/77.jpg" },
  { id: "8", name: "Polo", image: "https://randomuser.me/api/portraits/men/88.jpg" },
  { id: "9", name: "T-shirts", image: "https://randomuser.me/api/portraits/women/99.jpg" },
  { id: "10", name: "Tunics", image: "https://randomuser.me/api/portraits/men/12.jpg" },
];

const products = [
  { id: "1", name: "Lorem ipsum dolor sit amet", price: "$17,00", image: "https://randomuser.me/api/portraits/women/19.jpg" },
  { id: "2", name: "Lorem ipsum dolor sit amet", price: "$17,00", image: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: "3", name: "Lorem ipsum dolor sit amet", price: "$17,00", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: "4", name: "Lorem ipsum dolor sit amet", price: "$17,00", image: "https://randomuser.me/api/portraits/women/85.jpg" },
];

export default function shopscreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>

        <View style={styles.headerRight}>

            <View style={styles.categoryBox}>
            <TextInput
            style={styles.categoryText}
            placeholder="Clothing ✕"
            placeholderTextColor='#FA8232'
            
            />
            <Ionicons name="camera-outline" size={22} color="#FA8232" />
            </View>
       
        </View>
      </View>

      {/* Categories */}
     {/* Categories */}
<FlatList
  data={categories}
  keyExtractor={(item) => item.id}
  numColumns={5} // 👈 This makes 5 items per row
  columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
  renderItem={({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  )}
/>


      {/* All Items Header */}
      <View style={styles.allItemsHeader}>
        <Text style={styles.allItemsText}>All Items</Text>
        <Ionicons name="options-outline" size={20} color="#333" />
      </View>

      {/* Products Grid */}
      <View style={styles.productsContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryBox: {
    backgroundColor: "#f1f1f9",
    paddingHorizontal: 12,
    justifyContent:'space-between',
    borderRadius: 15,
    flexDirection:'row',
    alignItems:'center',
    width:200
  },
  
 categoryItem: {
  alignItems: "center",
  flex: 1,
  marginHorizontal: 5,
},
categoryImage: {
  width: 55,
  height: 55,
  borderRadius: 30,
},

  categoryName: {
    marginTop: 5,
    fontSize: 12,
    color: "#444",
  },
  allItemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  allItemsText: {
    fontSize: 18,
    fontWeight: "600",
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: width * 0.44,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
    paddingBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 13,
    fontWeight: "500",
    paddingHorizontal: 8,
    marginTop: 6,
    color: "#333",
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    paddingHorizontal: 8,
    marginTop: 4,
  },
});
