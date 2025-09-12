import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const cards = [
  {
    id: 1,
    image: require("../assets/images/hellocrd.png"),
    title: "Hello",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend lacus.",
  },
  {
    id: 2,
    image: require("../assets/images/readycard.png"),
    title: "Ready?",
    desc: "Get started with the best shopping experience. Let’s make it happen!",
  },
  // You can add more cards here if needed
];

const HelloCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex < cards.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
      }, 2000); // change card every 2s

      return () => clearTimeout(timer);
    } else {
      // Navigate after last card
      const redirect = setTimeout(() => {
        router.replace("/getstarted");
      }, 3000);

      return () => clearTimeout(redirect);
    }
  }, [activeIndex]);

  const { image, title, desc } = cards[activeIndex];

  return (
    <View style={styles.container}>
      {/* Top Orange Shape */}
      <View style={styles.topShape}></View>

      {/* Card Content */}
      <View style={styles.card}>
        <Image source={image} style={styles.image} contentFit="cover" />
        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>

      {/* Dots Indicator */}
      <View style={styles.dots}>
        {cards.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? "#FA8232" : "#D9D9D9" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default HelloCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
  },
  topShape: {
    position: "absolute",
    top: -70,
    left: -30,
    width: 280,
    height: 350,
    backgroundColor: "#FA8232",
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    transform: [{ rotate: "15deg" }],
  },
  card: {
    marginTop: 100,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 350,
  },
  textBox: {
    padding: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#202020",
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    lineHeight: 20,
  },
  dots: {
    flexDirection: "row",
    marginTop: 30,
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
  },
});
