import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../App";
import { useToast } from "../../components/context/ToastContext";
import axiosInstance from "../../utils/axiosInstance";
import BackButton from "../../components/login-register/BackButton";
import { styles } from "./forgotPasswordStyles";

export default function ForgotPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSentOTP = async () => {
    if (!email) {
      showToast("error", "Vui lòng nhập email khôi phục.");
      return;
    }
    try {
      console.log(email);
      const response = await axiosInstance.post("/verification-code/generate", {
        email: email,
      });
      console.log("Response:", response.data);
      if (response.data.statusCode === 200) {
        showToast("success", "Đã gửi mã OTP đến email của bạn.");
        navigation.navigate("Verification", { email });
      } else {
        showToast("error", "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error) {
      showToast("error", "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.frame}>
        <BackButton navigateTo="Login" />

        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <Text style={styles.subtitle}>Nhập tài khoản email để khôi phục mật khẩu</Text>
          </View>

          <View style={styles.fields}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your-email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.primaryCta}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSentOTP}>
              <Text style={styles.primaryButtonText}>Khôi phục mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
