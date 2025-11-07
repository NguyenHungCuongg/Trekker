import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path, Defs, Filter, FeDropShadow } from "react-native-svg";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  const activeColor = "#0F93C3";
  const inactiveColor = "#7D848D";

  const handlePress = (routeName: string, index: number) => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  const isActive = (index: number) => state.index === index;

  return (
    <View style={styles.container}>
      {/* Nền cong */}
      <Svg width="100%" height="120" viewBox="0 0 375 90" preserveAspectRatio="none" style={styles.svgBackground}>
        <Defs>
          <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <FeDropShadow dx="0" dy="-2" stdDeviation="8" floodColor="#7d7d7dff" floodOpacity="0.08" />
          </Filter>
        </Defs>
        <Path d="M0,20 C80,0 295,0 375,20 L375,90 L0,90 Z" fill="white" filter="url(#shadow)" />
      </Svg>

      {/* Các nút menu */}
      <View style={styles.navContainer}>
        {/* Nhóm trái */}
        <NavItem
          label="Trang chủ"
          icon={<Feather name="home" size={24} color={isActive(0) ? activeColor : inactiveColor} />}
          active={isActive(0)}
          onPress={() => handlePress("HomeTab", 0)}
        />
        <NavItem
          label="Tour"
          icon={<Feather name="map-pin" size={24} color={isActive(1) ? activeColor : inactiveColor} />}
          active={isActive(1)}
          onPress={() => handlePress("TourTab", 1)}
        />

        {/* Khoảng trống cho nút Search */}
        <View style={styles.centerSpace} />

        {/* Nhóm phải */}
        <NavItem
          label="Chỗ ở"
          icon={
            <MaterialCommunityIcons
              name="office-building-outline"
              size={24}
              color={isActive(3) ? activeColor : inactiveColor}
            />
          }
          active={isActive(3)}
          onPress={() => handlePress("AccommodationTab", 3)}
        />
        <NavItem
          label="Hồ sơ"
          icon={<Feather name="user" size={24} color={isActive(4) ? activeColor : inactiveColor} />}
          active={isActive(4)}
          onPress={() => handlePress("ProfileTab", 4)}
        />
      </View>
      <View style={styles.centerWrapper}>
        <TouchableOpacity
          style={[styles.centerButton, isActive(2) && styles.centerButtonActive]}
          onPress={() => handlePress("SearchTab", 2)}
        >
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  centerSpace: {
    width: 64, // Khớp với width của nút Search
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 60, // Đảm bảo mỗi item có độ rộng tối thiểu
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
  centerButtonActive: {
    backgroundColor: "#0D7A9F", // Màu đậm hơn khi active
  },
});
