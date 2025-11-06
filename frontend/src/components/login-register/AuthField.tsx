import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

interface AuthFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function AuthField({ label, value, onChangeText, ...rest }: AuthFieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#7d848d"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    width: "100%",
  },
  label: {
    color: "#1b1e28",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f7f7f9",
    borderRadius: 15,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: "#1b1e28",
  },
});
