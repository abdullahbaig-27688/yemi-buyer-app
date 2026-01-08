import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string; // optional route
  onPress?: () => void; // optional custom action
}

interface VerticalMenuProps {
  menuItems: MenuItem[];
  onClose?: () => void; // function to close sidebar
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({ menuItems, onClose }) => {
  return (
    <View style={styles.sidebarContainer}>
      <ScrollView>
        {menuItems.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
            onPress={() => {
              if (item.route) {
                router.push(item.route);
              }
              if (item.onPress) item.onPress();
              if (onClose) onClose();
            }}
          >
            <Ionicons name={item.icon} size={24} color="#333" />
            <Text style={styles.menuText}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default VerticalMenu;

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 250,
    flex: 1,
    backgroundColor: "#fa8232",
    paddingTop: 50,
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuItemPressed: {
    backgroundColor: "#f0f0f0",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    color: "#333",
  },
});
