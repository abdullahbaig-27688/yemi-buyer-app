import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SecoundryButton = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecoundryButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    zIndex: 1,
    alignSelf:'center',
    marginTop:10,
   
  },
  text: {

    fontSize: 16,
    fontWeight: "300",
  },
});
