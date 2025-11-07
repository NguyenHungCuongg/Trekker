import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axiosInstance from "../../utils/axiosInstance";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import type { RootStackParamList } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "../../components/context/ToastContext";
import BackButton from "../../components/login-register/BackButton";
import AuthField from "../../components/login-register/AuthField";
import PasswordField from "../../components/login-register/PasswordField";
import { styles } from "./loginStyles";

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!username || !password) {
      showToast("error", "Vui lòng điền đầy đủ thông tin đăng nhập.");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      if (response.data && response.data.access_token) {
        await AsyncStorage.setItem("token", response.data.access_token);
        showToast("success", "Đăng nhập thành công!");
        navigation.navigate("MainTabs");
      } else {
        showToast("error", "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      showToast("error", "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin ẹc ẹc." + error);
      console.log(axiosInstance.defaults);
      console.error("Login error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.loginPage}>
      <View style={styles.loginFrame}>
        <View style={styles.loginBody}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginTitle}>Đăng nhập</Text>
            <Text style={styles.loginSubtitle}>Vui lòng đăng nhập để tiếp tục</Text>
          </View>

          <View style={styles.loginFields}>
            <AuthField label="Tên đăng nhập" placeholder="Tên đăng nhập" value={username} onChangeText={setUsername} />

            <PasswordField label="Mật khẩu" placeholder="••••••••" value={password} onChangeText={setPassword} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotLink}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.primaryCta}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.auxiliary}>
            <View style={styles.signupText}>
              <Text style={{ color: "#7d848d" }}>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}> Đăng ký</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.alternateDivider}>Hoặc đăng nhập bằng</Text>

            <View style={styles.socialRow}>
              <Ionicons name="logo-facebook" size={40} color="#1877F2" />
              <Ionicons name="logo-instagram" size={40} color="#C13584" />
              <Ionicons name="logo-twitter" size={40} color="#03A9F4" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
