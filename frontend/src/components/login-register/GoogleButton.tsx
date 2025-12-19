import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axiosInstance from "../../utils/axiosInstance";
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const GoogleButton = () => {
  const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID || "";
  const IOS_CLIENT_ID = process.env.IOS_CLIENT_ID || "";
  const ANDROID_CLIENT_ID = process.env.ANDROID_CLIENT_ID || "";
  const NESTJS_API_URL = "http://localhost:3000"; // Thay đổi nếu cần

  // const redirectUri = AuthSession.makeRedirectUri({
  //   scheme: 'frontend', // Phải khớp với scheme trong app.json
  //   path: 'google-callback', // Phần này không bắt buộc, nhưng giúp phân biệt nếu bạn có nhiều redirect URIs
  // });

  const OWNER = 'senko';
const SLUG = 'frontend';
const redirectUri = `https://auth.expo.io/@${OWNER}/${SLUG}`;


  const [request, response, promptAsync] = Google.useAuthRequest({
    // Sử dụng Web Client ID để yêu cầu Authorization Code.
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["profile", "email"],
    redirectUri: redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params; // <--- ĐÂY LÀ MÃ CODE BẠN CẦN
      console.log("Authorization Code nhận được:", code);

      // Gửi code này về NestJS
      sendCodeToNestJS(code);
    } else if (response?.type === "error") {
      console.error("Đăng nhập Google thất bại:", response.error);
    }
  }, [response]);

  const sendCodeToNestJS = async (code: any) => {
    try {
      const res = await axiosInstance.post(`${NESTJS_API_URL}/auth/google`, { code });

      const data = res.data;
      console.log("Phản hồi từ NestJS:", data);
      // TODO: Xử lý JWT hoặc thông tin người dùng được NestJS trả về (ví dụ: lưu vào AsyncStorage)
    } catch (error) {
      console.error("Lỗi khi gửi code đến NestJS:", error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        promptAsync();
      }}
    >
      <Ionicons name="logo-google" size={40} color="#4285F4" />
    </TouchableOpacity>
  );
};

export default GoogleButton;
