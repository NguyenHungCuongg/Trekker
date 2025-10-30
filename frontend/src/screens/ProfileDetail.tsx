import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

export default function ProfileDetail() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [formData, setFormData] = useState({
    fullName: "Đại dại di",
    username: "Sao cũng được",
    email: "nhom17@gmail.com",
    phone: "+88 01758-000666",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDone = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backCircle}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="chevron-back" size={24} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết hồ sơ</Text>
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.doneButton}>Xong</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Image
            source={{
              uri: "https://api.builder.io/api/v1/image/assets/TEMP/262654fd78b73747670ca9b2eda301ae21af9466?width=298",
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Username</Text>
          <TouchableOpacity>
            <Text style={styles.changeAvatar}>Đổi ảnh đại diện</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Họ và tên</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.fullName}
              onChangeText={(val) => handleInputChange("fullName", val)}
              style={styles.input}
              placeholderTextColor="#7D848D"
            />
            <Feather name="edit-2" size={18} color="#0F93C3" />
          </View>
        </View>

        {/* Username */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.username}
              onChangeText={(val) => handleInputChange("username", val)}
              style={styles.input}
              placeholderTextColor="#7D848D"
            />
            <Feather name="edit-2" size={18} color="#0F93C3" />
          </View>
        </View>

        {/* Email */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.email}
              onChangeText={(val) => handleInputChange("email", val)}
              style={styles.input}
              keyboardType="email-address"
              placeholderTextColor="#7D848D"
            />
            <Feather name="edit-2" size={18} color="#0F93C3" />
          </View>
        </View>

        {/* Phone */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Số điện thoại</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={formData.phone}
              onChangeText={(val) => handleInputChange("phone", val)}
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#7D848D"
            />
            <Feather name="edit-2" size={18} color="#0F93C3" />
          </View>
        </View>
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeBar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F7F7F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1E28",
  },
  doneButton: {
    fontSize: 16,
    color: "#0F93C3",
  },
  content: {
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B1E28",
  },
  changeAvatar: {
    fontSize: 14,
    color: "#0F93C3",
    marginTop: 4,
  },
  formSection: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    color: "#1B1E28",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1B1E28",
  },
  homeIndicator: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  homeBar: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#1B1E28",
  },
});
