import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type FilterBadgeProps = {
  label: string;
  onRemove: () => void;
};

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, onRemove }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
    <TouchableOpacity onPress={onRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Ionicons name="close-circle" size={18} color="#0F93C3" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7F8",
    borderRadius: 20,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#0F93C3",
  },
  badgeText: {
    fontSize: 14,
    color: "#0F93C3",
    marginRight: 6,
    fontWeight: "500",
  },
});

export default FilterBadge;
