import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({ value, onChangeText, placeholder }: any) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 40,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
});
