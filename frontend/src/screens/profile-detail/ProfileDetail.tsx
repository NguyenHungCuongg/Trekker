import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { styles } from "./profileDetailStyles";

export default function ProfileDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        <TouchableOpacity style={styles.backCircle} onPress={() => navigation.navigate("Profile")}>
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
