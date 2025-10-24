import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function PasswordField({ label, value, onChangeText, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor="#7d848d"
        />
        <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M12 5.25C4.5 5.25 1.5 12 1.5 12s3 6.75 10.5 6.75S22.5 12 22.5 12s-3-6.75-10.5-6.75z"
                stroke="#7d848d"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <Path
                d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                stroke="#7d848d"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          ) : (
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M3.98 8.223A10.477 10.477 0 001.5 12c0 1.657.845 3.582 2.262 5.13.709.774 1.54 1.537 2.465 2.145a13.18 13.18 0 004.273 1.62c1.05.173 2.148.173 3.198 0a13.18 13.18 0 004.273-1.62c.925-.608 1.756-1.37 2.465-2.145A10.48 10.48 0 0022.5 12a10.48 10.48 0 00-2.262-5.13c-.709-.774-1.54-1.537-2.465-2.145a13.18 13.18 0 00-4.273-1.62 11.02 11.02 0 00-3.198 0 13.18 13.18 0 00-4.273 1.62c-.925.608-1.756 1.37-2.465 2.145A10.477 10.477 0 003.98 8.223z"
                stroke="#7d848d"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <Path
                d="M3 3l18 18M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                stroke="#7d848d"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          )}
        </TouchableOpacity>
      </View>
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
  passwordContainer: {
    position: "relative",
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 48,
    backgroundColor: "#f7f7f9",
    borderRadius: 15,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: "#1b1e28",
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
