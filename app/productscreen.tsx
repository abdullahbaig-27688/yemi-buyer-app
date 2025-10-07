import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  "https://randomuser.me/api/portraits/women/76.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
];

export default function productscreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (

    <View style={styles.container}>
      {/* Horizontal Carousel */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {images.map((uri, index) => (
          <View key={index} style={{ width, alignItems: "center" }}>
            <Image source={{ uri }} style={styles.detailImage} />
  
          </View>
        ))}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#ccc", "orange", "#ccc"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor: dotColor,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailImage: {
    width: width * 0.9,
    height: 450,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 10,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
