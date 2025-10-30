import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
        <Image
          source={{
            uri: "https://api.builder.io/api/v1/image/assets/TEMP/262654fd78b73747670ca9b2eda301ae21af9466?width=298",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Username</Text>
        <Text style={styles.email}>diachimail@gmail.com</Text>
      </View>

      {/* Menu Card */}
      <View style={styles.menuCard}>
        <MenuItem
          icon={<Feather name="user" size={20} color="#7D848D" />}
          label="Chi tiết hồ sơ"
          onPress={() => navigation.navigate("ProfileDetail")}
        />
        <Divider />
        <MenuItem
          icon={<MaterialCommunityIcons name="chart-bar" size={20} color="#7D848D" />}
          label="Thống kê"
          onPress={undefined}
        />
        <Divider />
        <MenuItem icon={<Feather name="file-text" size={20} color="#7D848D" />} label="Hóa đơn" onPress={undefined} />
        <Divider />
        <MenuItem
          icon={<MaterialCommunityIcons name="message-text-outline" size={20} color="#7D848D" />}
          label="Review"
          onPress={undefined}
        />
        <Divider />
        <MenuItem
          icon={<MaterialCommunityIcons name="logout" size={20} color="#7D848D" />}
          label="Đăng xuất"
          onPress={undefined}
        />
      </View>
    </ScrollView>
  );
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuContent}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#C5C6CC" />
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#fff",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 56,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B1E28",
    textAlign: "center",
  },
  userSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 45,
    marginBottom: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1B1E28",
  },
  email: {
    fontSize: 14,
    color: "#7D848D",
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    shadowColor: "#383838ff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 40,
  },
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
  divider: {
    height: 1,
    backgroundColor: "#F0F0F2",
    marginHorizontal: 18,
  },
});
