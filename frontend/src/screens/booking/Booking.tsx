import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../components/context/ToastContext";
import BookingCard from "../../components/booking/BookingCard";
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

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1B1E28" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đơn đặt của tôi</Text>
          <View style={styles.headerRight} />
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đơn đặt của tôi</Text>
        <View style={styles.headerRight} />
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
          <View style={styles.bookingList}>
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => {
                  // Navigate to booking detail if needed
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
