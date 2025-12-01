import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/axiosInstance";

// Complete the auth session for expo-auth-session
WebBrowser.maybeCompleteAuthSession();

interface UseGoogleAuthProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useGoogleAuth = ({ onSuccess, onError }: UseGoogleAuthProps = {}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Android Client ID
    androidClientId:
      process.env.GOOGLE_ANDROID_CLIENT_ID ||
      "106876136946-rma849tndp1mgoinsutnq7p6seasphcr.apps.googleusercontent.com",

    // iOS Client ID
    iosClientId:
      process.env.GOOGLE_IOS_CLIENT_ID || "106876136946-bf5cmaffvn785cr2d06vmh7hhfcjnhed.apps.googleusercontent.com",

    // Web Client ID (for Expo Go development)
    webClientId:
      process.env.GOOGLE_CLIENT_ID || "106876136946-84q8v8jiu5sijcq22rbmshkg71m8p7s9.apps.googleusercontent.com",

    // Expo Client ID (same as Web Client ID)
    expoClientId:
      process.env.GOOGLE_CLIENT_ID || "106876136946-84q8v8jiu5sijcq22rbmshkg71m8p7s9.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Google auth success, access token:", authentication?.accessToken);
      handleGoogleSignIn(authentication?.accessToken);
    } else if (response?.type === "error") {
      console.error("Google auth error:", response.error);
      onError?.(response.error);
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken: string | undefined) => {
    if (!accessToken) {
      console.error("No access token received");
      onError?.(new Error("No access token received"));
      return;
    }

    try {
      console.log("Sending access token to backend...");
      // Gửi access token lên backend
      const result = await axiosInstance.post("/auth/google", {
        accessToken,
      });

      console.log("Backend response:", result.data);

      if (result.data && result.data.access_token) {
        // Lưu JWT token vào AsyncStorage
        await AsyncStorage.setItem("token", result.data.access_token);

        console.log("Google login successful:", result.data.user);
        onSuccess?.();
      } else {
        throw new Error("No token received from backend");
      }
    } catch (error: any) {
      console.error("Google sign in error:", error.response?.data || error.message);
      onError?.(error);
    }
  };

  return {
    request,
    promptAsync,
  };
};
