import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

type HeaderProps = {
  title: string;

  onPress: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={() => router.back()} style={styles.iconWrapper}>
        <Ionicons name="close" size={24} color="#000" />
      </Pressable>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // paddingVertical: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  iconWrapper: {
    padding: 5,
  },
});
