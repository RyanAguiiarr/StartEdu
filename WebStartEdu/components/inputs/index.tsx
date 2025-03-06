import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface ImputProps {
  label: string;
  value: string;
  onchangeText: (text: string) => void;
}

const Imput = ({ label, value, onchangeText }: ImputProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onchangeText}
      style={styles.imput}
    />
  );
};

const styles = StyleSheet.create({
  imput: {
    borderColor: "blue",
    borderWidth: 1,
    width: "90%",
    height: 50,
    margin: 12,
  },
});

export default Imput;
