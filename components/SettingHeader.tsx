import React from "react";
import { StyleSheet, View, Pressable, Text, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
type SettingHeaderProps = {
  title: string;
  subtitle: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
};
const SettingHeader = ({
  title,
  subtitle,
  showBack,
  onBackPress,
  rightIcon,
  onRightPress,
}: SettingHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}

      {/* {showBack ? (
        <Pressable style={styles.iconButton} onPress={onBackPress}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </Pressable>
      ) : (
        <View style={styles.placeholderIcon} />
      )} */}

      <View style={{ flex: 1, alignItems: "flex-start" }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {showBack ? (
        <Pressable style={styles.iconButton} onPress={onBackPress}>
          <Ionicons name="close" size={28} color="#000" />
        </Pressable>
      ) : (
        <View style={styles.placeholderIcon} />
      )}
    </View>
  );
};

export default SettingHeader;
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 20,
    
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#666",
  },
  iconButton: {
    padding: 6,
  },
  placeholderIcon: {
    width: 30,
  },
});
