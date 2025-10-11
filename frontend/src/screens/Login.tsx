import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton}>
        {/* <Ionicons name="chevron-back" size={24} color="#000" /> */}
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>Vui lòng đăng nhập để tiếp tục</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Tên đăng nhập"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="**********"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {/* <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#999"
            /> */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text>Bạn không có tài khoản? </Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>Hoặc xác thực bằng</Text>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png",
              }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
              }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
              }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 10,
    width: 32,
    height: 32,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
    marginTop: 6,
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    marginBottom: 10,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  forgotText: {
    textAlign: "right",
    color: "#00B5C3",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00B5C3",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  registerText: {
    color: "#00B5C3",
    fontWeight: "500",
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    width: 42,
    height: 42,
  },
});
