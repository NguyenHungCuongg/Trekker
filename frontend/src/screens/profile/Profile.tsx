import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../App";
import { User } from "../../types";
import axiosInstance from "../../utils/axiosInstance";
import MenuItem from "../../components/profile/MenuItem";
import { styles } from "./profileStyles";

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            // Xóa token khỏi AsyncStorage
            await AsyncStorage.removeItem("token");

            // Reset navigation stack và chuyển về Start screen
            navigation.reset({
              index: 0,
              routes: [{ name: "Start" }],
            });
          } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại!");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
      </View>

      {/* User Info */}
      <View style={styles.userSection}>
        {loading ? (
          <ActivityIndicator size="large" color="#0F93C3" style={{ marginVertical: 40 }} />
        ) : (
          <>
            <Image
              source={
                user?.profileImage ? { uri: user.profileImage } : require("../../../assets/default-profile-image.jpg")
              }
              style={styles.avatar}
            />
            <Text style={styles.username}>{user?.username || "Guest"}</Text>
            <Text style={styles.email}>{user?.email || "No email"}</Text>
          </>
        )}
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
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
}

const Divider = () => <View style={styles.divider} />;
