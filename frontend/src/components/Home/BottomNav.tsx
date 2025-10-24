import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

export default function BottomNav() {
  const activeColor = "#0F93C3";
  const inactiveColor = "#7D848D";

  return (
    <View style={styles.container}>
      {/* Nền cong */}
      <Svg width="100%" height="120" viewBox="0 0 375 90" preserveAspectRatio="none" style={styles.svgBackground}>
        <Path d="M0,20 C80,0 295,0 375,20 L375,90 L0,90 Z" fill="white" />
      </Svg>

      {/* Các nút menu */}
      <View style={styles.navContainer}>
        <NavItem label="Trang chủ" icon={<Feather name="home" size={24} color={activeColor} />} active />
        <NavItem label="Tour" icon={<Feather name="map-pin" size={24} color={inactiveColor} />} />
        <View style={{ width: 70 }} />
        <NavItem
          label="Chỗ ở"
          icon={<MaterialCommunityIcons name="office-building-outline" size={24} color={inactiveColor} />}
        />
        <NavItem label="Hồ sơ" icon={<Feather name="user" size={24} color={inactiveColor} />} />
      </View>

      {/* Nút trung tâm */}
      <View style={styles.centerWrapper}>
        <TouchableOpacity style={styles.centerButton}>
          <Feather name="search" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NavItem({ label, icon, active = false }: { label: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <TouchableOpacity style={styles.navItem}>
      {icon}
      <Text style={[styles.label, { color: active ? "#0F93C3" : "#7D848D" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    alignItems: "center",
  },
  svgBackground: {
    position: "absolute",
    bottom: 0,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: {
    fontSize: 12,
  },
  centerWrapper: {
    position: "absolute",
    bottom: 25, // đẩy nút lên giữa đường cong
    alignSelf: "center",
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0F93C3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 20,
  },
});
