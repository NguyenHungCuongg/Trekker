import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "../../components/context/ToastContext";
import axiosInstance from "../../utils/axiosInstance";
import { formatNumber } from "../../utils/formatNumber";
import { styles } from "./bookingConfirmationStyles";
import { WebView } from "react-native-webview";

interface RouteParams {
  serviceType: "tour" | "accommodation";
  serviceId: number;
  roomTypeId?: number;
  serviceName: string;
  servicePrice: number;
  quantity: number;
  startDate: string;
  endDate: string;
  serviceImage?: string;
}

export default function BookingConfirmation() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { showToast } = useToast();
  const params = route.params as RouteParams;

  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const webViewRef = useRef<WebView>(null);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"vnpay" | "cash">("cash");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        showToast("error", "Vui lòng đăng nhập để tiếp tục");
        navigation.navigate("Login");
        return;
      }

      const response = await axiosInstance.get("/auth/profile");
      setUserInfo({
        fullName: response.data.fullName || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
      });
    } catch (error) {
      console.error("Error loading user info:", error);
      showToast("error", "Không thể tải thông tin người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setSubmitting(true);
    try {
      const bookingData = {
        serviceType: params.serviceType,
        serviceId: params.serviceId,
        roomTypeId: params.roomTypeId,
        quantity: params.quantity,
        startDate: params.startDate,
        endDate: params.endDate,
        totalPrice: params.servicePrice * params.quantity,
        customerName: userInfo.fullName,
        customerEmail: userInfo.email,
        customerPhone: userInfo.phone,
        notes: "",
        paymentMethod: paymentMethod,
      };

      const response = await axiosInstance.post("/bookings", bookingData);

      if (response.data.booking) {
        showToast("success", response.data.message || "Đặt chỗ thành công!");

        // Navigate to success screen or booking list
        navigation.navigate("MainTabs", {
          screen: "Profile",
          params: { showBookings: true },
        });
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      const errorMessage = error.response?.data?.message || "Đặt chỗ thất bại. Vui lòng thử lại.";
      showToast("error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmVnpay = async () => {
    setSubmitting(true);
    try {
      const bookingData = {
        serviceType: params.serviceType,
        serviceId: params.serviceId,
        roomTypeId: params.roomTypeId,
        quantity: params.quantity,
        startDate: params.startDate,
        endDate: params.endDate,
        totalPrice: params.servicePrice * params.quantity,
        customerName: userInfo.fullName,
        customerEmail: userInfo.email,
        customerPhone: userInfo.phone,
        notes: "",
        paymentMethod: paymentMethod,
      };

      const response = await axiosInstance.post("/vnpay/create_payment_url", bookingData);

      if (response.data?.paymentUrl) {
        console.log("✅ Full Payment URL:", response.data.paymentUrl);
        console.log("✅ URL length:", response.data.paymentUrl.length);
        console.log("✅ URL starts with:", response.data.paymentUrl.substring(0, 100));
        setPaymentUrl(response.data.paymentUrl);
        setShowWebView(true);
      }
    } catch (error: any) {
      console.error("Lỗi tạo thanh toán:", error);
      showToast("error", "Tạo thanh toán thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === "PAYMENT_COMPLETE") {
      setShowWebView(false);
      if (data.status === "success") {
        showToast("success", "Thanh toán thành công!");
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        showToast("error", "Thanh toán thất bại");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0F93C3" />
      </View>
    );
  }

  const totalAmount = params.servicePrice * params.quantity;
  const serviceLabel = params.serviceType === "tour" ? "Tour" : "Chỗ ở";

  if (showWebView) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <WebView
          ref={webViewRef}
          source={{ uri: paymentUrl }}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0F93C3" />
              <Text>Đang tải trang thanh toán...</Text>
            </View>
          )}
          onMessage={handleWebViewMessage}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView Error:", nativeEvent);
            showToast("error", `Lỗi: ${nativeEvent.description}`);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("HTTP Error:", nativeEvent.statusCode);
          }}
          onLoadStart={() => console.log("WebView started loading")}
          onLoadEnd={() => console.log("WebView finished loading")}
          onShouldStartLoadWithRequest={(request) => {
            const { url } = request;
            console.log("🔗 WebView navigating to:", url);

            // 1. Kiểm tra nếu URL là Deep Link (exp://) hoặc URL trả về từ NestJS
            if (url.startsWith("exp://") || url.includes("/vnpay/vnpay_return")) {
              // Nếu là link exp://, ta sẽ dùng Linking của Expo để mở hoặc điều hướng thủ công
              if (url.startsWith("exp://")) {
                // Tắt WebView trước
                setShowWebView(false);

                // Phân tích params từ URL để điều hướng vào screen VnpayReturn
                // Ví dụ URL: exp://192.168.1.135:8081/--/VnpayReturn?status=success...
                const queryString = url.split("?")[1];
                const params = Object.fromEntries(new URLSearchParams(queryString));

                // Điều hướng trong App
                navigation.navigate("VnpayReturn", {
                  status: params.status,
                  orderId: params.orderId,
                  message: params.message,
                  amount: params.amount,
                });

                return false; // Ngăn WebView load tiếp
              }
            }

            return true;
          }}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          javaScriptEnabled={true}
          domStorageEnabled={true}
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          cacheEnabled={true}
          incognito={false}
          allowsBackForwardNavigationGestures={true}
          originWhitelist={["*"]}
          injectedJavaScript={`
            window.postMessage = (message) => {
              window.ReactNativeWebView.postMessage(JSON.stringify(message));
            };
            true;
          `}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => setShowWebView(false)}>
          <Text style={styles.backButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xác nhận đặt chỗ</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Thông tin đặt chỗ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đặt {params.serviceType === "tour" ? "tour" : "chỗ"}</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{serviceLabel}:</Text>
              <Text style={styles.infoValue}>{params.serviceName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số người:</Text>
              <Text style={styles.infoValue}>{params.quantity} người</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày đi:</Text>
              <Text style={styles.infoValue}>{formatDate(params.startDate)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày về:</Text>
              <Text style={styles.infoValue}>{formatDate(params.endDate)}</Text>
            </View>
          </View>
        </View>

        {/* Thông tin khách hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Họ tên:</Text>
              <Text style={styles.infoValue}>{userInfo.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>SĐT:</Text>
              <Text style={styles.infoValue}>{userInfo.phone}</Text>
            </View>
          </View>
        </View>

        {/* Chi tiết giá */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết giá</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Giá {params.serviceType === "tour" ? "tour" : "phòng"}:</Text>
              <Text style={styles.infoValue}>{formatNumber(params.servicePrice)} VND</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số lượng:</Text>
              <Text style={styles.infoValue}>x{params.quantity}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalValue}>{formatNumber(totalAmount)} VND</Text>
            </View>
          </View>
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === "vnpay" && styles.paymentOptionSelected]}
              onPress={() => setPaymentMethod("vnpay")}
            >
              <View style={styles.radioButton}>
                {paymentMethod === "vnpay" && <View style={styles.radioButtonSelected} />}
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>VNPay</Text>
                <Text style={styles.paymentDescription}>Chuyển khoản ngân hàng</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === "cash" && styles.paymentOptionSelected]}
              onPress={() => setPaymentMethod("cash")}
            >
              <View style={styles.radioButton}>
                {paymentMethod === "cash" && <View style={styles.radioButtonSelected} />}
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>Tiền mặt</Text>
                <Text style={styles.paymentDescription}>Thanh toán khi gặp hướng dẫn viên</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Note for cash payment */}
        {paymentMethod === "cash" && (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Lưu ý:</Text>
            <Text style={styles.noteText}>• Vui lòng thanh toán tiền mặt khi gặp hướng dẫn viên</Text>
            <Text style={styles.noteText}>• Mang theo mã đặt chỗ để xác nhận</Text>
          </View>
        )}
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, submitting && styles.confirmButtonDisabled]}
          onPress={paymentMethod === "vnpay" ? handleConfirmVnpay : handleConfirmBooking}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>Xác nhận và thanh toán</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
