import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../components/context/ToastContext";
import { formatNumber } from "../../utils/formatNumber";
import { styles } from "./bookingStyles";

interface BookingItem {
  id: number;
  serviceType: "tour" | "accommodation";
  serviceId: number;
  quantity: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "vnpay" | "cash";
  createdAt: string;
  tour?: {
    id: number;
    name: string;
    image: string;
    location: { name: string };
  };
  accommodation?: {
    id: number;
    name: string;
    image: string;
    address: string;
  };
}

export default function Booking() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showToast("error", "Không thể tải danh sách đơn đặt");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FF9800";
      case "confirmed":
        return "#4CAF50";
      case "cancelled":
        return "#F44336";
      default:
        return "#7D848D";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const renderBookingCard = (booking: BookingItem) => {
    const serviceName = booking.serviceType === "tour" ? booking.tour?.name : booking.accommodation?.name;
    const serviceImage = booking.serviceType === "tour" ? booking.tour?.image : booking.accommodation?.image;
    const serviceLocation =
      booking.serviceType === "tour" ? booking.tour?.location?.name : booking.accommodation?.address;

    return (
      <TouchableOpacity
        key={booking.id}
        style={styles.bookingCard}
        onPress={() => {
          // Navigate to booking detail if needed
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.serviceTypeTag}>
            <Text style={styles.serviceTypeText}>{booking.serviceType === "tour" ? "Tour" : "Chỗ ở"}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          {serviceImage && (
            <Image
              source={{ uri: serviceImage }}
              style={styles.serviceImage}
              defaultSource={require("../../../assets/default-thumbnail.png")}
            />
          )}
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName} numberOfLines={2}>
              {serviceName}
            </Text>
            {serviceLocation && (
              <View style={styles.locationRow}>
                <Feather name="map-pin" size={14} color="#7D848D" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {serviceLocation}
                </Text>
              </View>
            )}
            <View style={styles.dateRow}>
              <Feather name="calendar" size={14} color="#7D848D" />
              <Text style={styles.dateText}>
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </Text>
            </View>
            <View style={styles.quantityRow}>
              <Feather name="users" size={14} color="#7D848D" />
              <Text style={styles.quantityText}>{booking.quantity} người</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.paymentInfo}>
            <Feather
              name={booking.paymentMethod === "cash" ? "dollar-sign" : "credit-card"}
              size={16}
              color="#7D848D"
            />
            <Text style={styles.paymentText}>{booking.paymentMethod === "cash" ? "Tiền mặt" : "VNPAY"}</Text>
          </View>
          <Text style={styles.totalPrice}>{formatNumber(booking.totalPrice)} VND</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Đơn đặt của tôi</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F93C3" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn đặt của tôi</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterTab, filter === "all" && styles.filterTabActive]}
            onPress={() => setFilter("all")}
          >
            <Text style={[styles.filterTabText, filter === "all" && styles.filterTabTextActive]}>
              Tất cả ({bookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === "pending" && styles.filterTabActive]}
            onPress={() => setFilter("pending")}
          >
            <Text style={[styles.filterTabText, filter === "pending" && styles.filterTabTextActive]}>
              Chờ xác nhận ({bookings.filter((b) => b.status === "pending").length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === "confirmed" && styles.filterTabActive]}
            onPress={() => setFilter("confirmed")}
          >
            <Text style={[styles.filterTabText, filter === "confirmed" && styles.filterTabTextActive]}>
              Đã xác nhận ({bookings.filter((b) => b.status === "confirmed").length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === "cancelled" && styles.filterTabActive]}
            onPress={() => setFilter("cancelled")}
          >
            <Text style={[styles.filterTabText, filter === "cancelled" && styles.filterTabTextActive]}>
              Đã hủy ({bookings.filter((b) => b.status === "cancelled").length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Booking List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={64} color="#CCC" />
            <Text style={styles.emptyText}>Chưa có đơn đặt nào</Text>
            <Text style={styles.emptySubtext}>
              {filter === "all"
                ? "Hãy đặt tour hoặc chỗ ở để bắt đầu hành trình của bạn!"
                : `Không có đơn đặt ${getStatusText(filter).toLowerCase()}`}
            </Text>
          </View>
        ) : (
          <View style={styles.bookingList}>{filteredBookings.map(renderBookingCard)}</View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
