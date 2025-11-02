import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { styles } from "./profileStyles";

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
