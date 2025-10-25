 import { Ionicons } from "@expo/vector-icons";
 import { StyleSheet,Pressable,View,Text } from "react-native";
 type RowProps = {
    label: string;
    onPress: () => void;
    showArrow?: boolean;
    value?: string;}
 const Row = ({label, value, onPress, showArrow}:RowProps) => (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {showArrow && (
          <Ionicons name="chevron-forward" size={18} color="#888" />
        )}
      </View>
    </Pressable>
  );

  export default Row;
  const styles= StyleSheet.create({
 row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 15,
    color: "#222",
  },
   value: {
    fontSize: 15,
    color: "#666",
    marginRight: 5,
  },
  })

