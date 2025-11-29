import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

interface SearchBarProps {
  placeholder?: string;
  onFilterPress: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
}

const searchIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="10.9413" cy="11.9414" r="7.94134" stroke="#7D848D" stroke-width="1.6"/>
    <path d="M20.0003 21.0001L17.0009 18.0006" stroke="#7D848D" stroke-width="1.6"/>
  </svg>
`;

const filterIcon = `
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
    <path d="M20.05 0.7H2.35C1.44 0.7 0.7 1.44 0.7 2.35C0.7 2.79 0.87 3.21 1.18 3.52L7.11 9.45C7.49 9.82 7.7 10.33 7.7 10.86V16.96C7.7 17.72 8.13 18.41 8.81 18.75L13.98 21.34C14.31 21.5 14.7 21.26 14.7 20.89V10.86C14.7 10.33 14.91 9.82 15.29 9.45L21.22 3.52C21.53 3.21 21.7 2.79 21.7 2.35C21.7 1.44 20.96 0.7 20.05 0.7Z" stroke="#7D848D" stroke-width="1.4"/>
  </svg>
`;

export default function SearchBar({
  placeholder = "Tìm kiếm dịch vụ du lịch",
  onFilterPress,
  onChangeText,
  value,
}: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <SvgXml xml={searchIcon} width={24} height={24} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#7D848D"
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={onFilterPress}>
        <SvgXml xml={filterIcon} width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1B1E28",
  },
});
