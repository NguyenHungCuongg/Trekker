import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path, Defs, Filter, FeDropShadow } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

export default function BottomNav() {
  const activeColor = "#0F93C3";
  const inactiveColor = "#7D848D";

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Nền cong */}
      <Svg width="100%" height="120" viewBox="0 0 375 90" preserveAspectRatio="none" style={styles.svgBackground}>
        <Defs>
          <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <FeDropShadow
              dx="0"
              dy="-2" // Offset dọc (âm = shadow ở trên)
              stdDeviation="8" // Độ mờ
              floodColor="#7d7d7dff" // Màu shadow
              floodOpacity="0.05" // Độ đậm (0-1)
            />
          </Filter>
        </Defs>
        <Path d="M0,20 C80,0 295,0 375,20 L375,90 L0,90 Z" fill="white" filter="url(#shadow)" />
      </Svg>

      {/* Các nút menu */}
      <View style={styles.navContainer}>
        <NavItem
          label="Trang chủ"
          icon={<Feather name="home" size={24} color={activeColor} />}
          active
          onPress={() => {}}
        />
        <NavItem label="Tour" icon={<Feather name="map-pin" size={24} color={inactiveColor} />} onPress={() => {}} />
        <View style={{ width: 70 }} />
        <NavItem
          label="Chỗ ở"
          icon={
            <MaterialCommunityIcons name="office-building-outline" size={24} color={inactiveColor} onPress={() => {}} />
          }
        />
        <NavItem
          label="Hồ sơ"
          icon={<Feather name="user" size={24} color={inactiveColor} />}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>

      {/* Nút trung tâm */}
      <View style={styles.centerWrapper}>
        <TouchableOpacity style={styles.centerButton} onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function NavItem({
  label,
  icon,
  active = false,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
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
    elevation: 2,
    shadowColor: "#404040ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    marginBottom: 20,
  },
});
