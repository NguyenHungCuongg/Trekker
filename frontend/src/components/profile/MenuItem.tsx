import React from "react";
import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuContent}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#C5C6CC" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: 16,
    color: "#1B1E28",
    marginLeft: 10,
  },
});

export default MenuItem;
