import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../../../App";
import { User } from "../../types";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../components/context/ToastContext";
import { styles } from "./profileDetailStyles";

export default function ProfileDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });
  /*
  For Đạt:
  Cái user là để coi dữ liệu gốc từ backend, còn 
  cái formData là để user sửa tạm thời để m làm chức năng
  edit nha cu!
  */

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      setUser(response.data);
      setFormData({
        fullName: response.data.fullName || "",
        username: response.data.username || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const hasChanges = () => {
    return (
      formData.fullName !== (user?.fullName || "") ||
      formData.username !== (user?.username || "") ||
      formData.email !== (user?.email || "") ||
      formData.phone !== (user?.phone || "")
    );
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      showToast("error", "Tên đăng nhập không được để trống");
      return false;
    }

    if (!formData.email.trim()) {
      showToast("error", "Email không được để trống");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("error", "Email không hợp lệ");
      return false;
    }
    if (!formData.fullName.trim()) {
      showToast("error", "Họ và tên không được để trống");
      return false;
    }
    if (!formData.phone.trim()) {
      showToast("error", "Số điện thoại không được để trống");
      return false;
    }
    return true;
  };

  // Hàm chọn và upload ảnh đại diện
  const handleChangeAvatar = async () => {
    try {
      // Xin quyền truy cập thư viện ảnh
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        showToast("error", "Bạn cần cấp quyền truy cập thư viện ảnh!");
        return;
      }

      // Mở thư viện ảnh
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Crop vuông
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const imageUri = result.assets[0].uri;

      // Confirm trước khi upload
      Alert.alert("Xác nhận thay đổi", "Bạn có muốn cập nhật ảnh đại diện?", [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Cập nhật",
          onPress: () => uploadAvatar(imageUri),
        },
      ]);
    } catch (error) {
      console.error("Error picking image:", error);
      showToast("error", "Có lỗi khi chọn ảnh!");
    }
  };

  // Hàm upload ảnh lên server
  const uploadAvatar = async (imageUri: string) => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      const filename = imageUri.split("/").pop() || "profile.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";
      formData.append("file", {
        uri: imageUri,
        name: filename,
        type: type,
      } as any);
      const response = await axiosInstance.put("/users/profile/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser((prev) => (prev ? { ...prev, profileImage: response.data.imageUrl } : null));
      showToast("success", "Cập nhật ảnh đại diện thành công!");
    } catch (error: any) {
      console.error("Error uploading avatar:", error);

      if (error.response?.status === 400) {
        showToast("error", error.response.data.message || "File không hợp lệ");
      } else {
        showToast("error", "Upload ảnh thất bại. Vui lòng thử lại!");
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDone = async () => {
    if (!hasChanges()) {
      navigation.goBack();
      return;
    }

    if (!validateForm()) {
      return;
    }

    Alert.alert("Xác nhận cập nhật", "Bạn có chắc chắn muốn lưu thay đổi?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Lưu",
        onPress: async () => {
          try {
            setSaving(true);

            // Gọi API cập nhật
            const response = await axiosInstance.put("/users/profile", {
              fullName: formData.fullName.trim(),
              username: formData.username.trim(),
              email: formData.email.trim(),
              phone: formData.phone.trim(),
            });
            setUser(response.data);
            showToast("success", "Cập nhật thông tin thành công!");
            setTimeout(() => {
              navigation.goBack();
            }, 1000);
          } catch (error: any) {
            console.error("Error updating profile:", error);
            if (error.response?.status === 400) {
              showToast("error", error.response.data.message || "Dữ liệu không hợp lệ");
            } else if (error.response?.status === 409) {
              showToast("error", "Tên đăng nhập hoặc email đã tồn tại");
            } else {
              showToast("error", "Cập nhật thất bại. Vui lòng thử lại!");
            }
          } finally {
            setSaving(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCircle} onPress={() => navigation.goBack()} disabled={saving}>
          <Ionicons name="chevron-back" size={24} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết hồ sơ</Text>
        <TouchableOpacity onPress={handleDone} disabled={saving || loading}>
          {saving ? (
            <ActivityIndicator size="small" color="#0F93C3" />
          ) : (
            <Text style={[styles.doneButton, (saving || loading) && { opacity: 0.5 }]}>Xong</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#0F93C3" style={{ marginVertical: 40 }} />
        ) : (
          <>
            {/* Avatar */}
            <View style={styles.avatarSection}>
              {uploadingImage ? (
                <View style={styles.avatar}>
                  <ActivityIndicator size="large" color="#0F93C3" />
                </View>
              ) : (
                <Image
                  source={
                    user?.profileImage
                      ? { uri: user.profileImage }
                      : require("../../../assets/default-profile-image.jpg")
                  }
                  style={styles.avatar}
                />
              )}
              <Text style={styles.username}>{user?.username || "Guest"}</Text>
              <TouchableOpacity onPress={handleChangeAvatar} disabled={uploadingImage || saving}>
                <Text style={[styles.changeAvatar, (uploadingImage || saving) && { opacity: 0.5 }]}>
                  {uploadingImage ? "Đang tải lên..." : "Đổi ảnh đại diện"}
                </Text>
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
                  placeholder="Nhập họ và tên"
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
                  placeholder="Nhập tên đăng nhập"
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
                  placeholder="Nhập email"
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
                  placeholder="Nhập số điện thoại"
                />
                <Feather name="edit-2" size={18} color="#0F93C3" />
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeBar} />
      </View>
    </View>
  );
}
