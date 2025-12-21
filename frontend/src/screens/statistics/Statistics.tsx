import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PieChart, BarChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import axiosInstance from "../../utils/axiosInstance";
import StatCard from "../../components/statistic/StatCard";
import { styles } from "./statisticsStyle";

interface BookingStats {
  totalBookings: number;
  toursBooked: number;
  accommodationsBooked: number;
  totalSpent: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  reviewsWritten: number;
}

interface MonthlySpending {
  month: string;
  amount: number;
}

export default function Statistics() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [stats, setStats] = useState<BookingStats>({
    totalBookings: 0,
    toursBooked: 0,
    accommodationsBooked: 0,
    totalSpent: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    reviewsWritten: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlySpending[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStatistics();
    setRefreshing(false);
  };

  const fetchStatistics = async () => {
    try {
      const [bookingsResponse, confirmedResponse] = await Promise.all([
        axiosInstance.get("/bookings"),
        axiosInstance.get("/bookings/confirmed-services/list"),
      ]);

      const bookings = bookingsResponse.data;
      const confirmedServices = confirmedResponse.data;

      // Calculate statistics
      const toursCount = bookings.filter((b: any) => b.tour).length;
      const accommodationsCount = bookings.filter((b: any) => b.accommodation).length;
      const totalSpending = bookings.reduce((sum: number, b: any) => sum + Number(b.totalPrice || 0), 0);
      const confirmed = bookings.filter((b: any) => b.status === "confirmed").length;
      const pending = bookings.filter((b: any) => b.status === "pending").length;
      const cancelled = bookings.filter((b: any) => b.status === "cancelled").length;

      // Calculate monthly spending (last 6 months)
      const monthly = calculateMonthlySpending(bookings);

      setStats({
        totalBookings: bookings.length,
        toursBooked: toursCount,
        accommodationsBooked: accommodationsCount,
        totalSpent: totalSpending,
        confirmedBookings: confirmed,
        pendingBookings: pending,
        cancelledBookings: cancelled,
        reviewsWritten: confirmedServices.length,
      });

      setMonthlyData(monthly);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlySpending = (bookings: any[]): MonthlySpending[] => {
    const monthNames = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
    const currentDate = new Date();
    const monthlyMap: { [key: string]: number } = {};

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const monthLabel = monthNames[date.getMonth()];
      monthlyMap[monthKey] = 0;
    }

    // Aggregate spending by month
    bookings.forEach((booking: any) => {
      if (booking.createdAt && booking.status !== "cancelled") {
        const date = new Date(booking.createdAt);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        if (monthlyMap.hasOwnProperty(monthKey)) {
          monthlyMap[monthKey] += Number(booking.totalPrice || 0);
        }
      }
    });

    // Convert to array
    return Object.entries(monthlyMap).map(([key, amount]) => {
      const [year, monthIndex] = key.split("-");
      return {
        month: monthNames[Number(monthIndex)],
        amount,
      };
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Pie chart data for booking status
  const statusPieData = [
    {
      name: "Đã xác nhận",
      population: stats.confirmedBookings,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Đang chờ",
      population: stats.pendingBookings,
      color: "#FF9800",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Đã hủy",
      population: stats.cancelledBookings,
      color: "#F44336",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  // Bar chart data for monthly spending
  const barChartData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        data: monthlyData.map((d) => d.amount / 1000000), // Convert to millions
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1B1E28" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thống kê</Text>
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
        <Text style={styles.headerTitle}>Thống kê</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng quan</Text>
          <StatCard
            icon="briefcase-variant"
            iconColor="#0F93C3"
            title="Tổng số đặt chỗ"
            value={stats.totalBookings}
            backgroundColor="#0F93C3"
          />
          <StatCard
            icon="airplane"
            iconColor="#FF6B6B"
            title="Tour đã đặt"
            value={stats.toursBooked}
            backgroundColor="#FF6B6B"
          />
          <StatCard
            icon="home-city"
            iconColor="#4ECDC4"
            title="Chỗ ở đã đặt"
            value={stats.accommodationsBooked}
            backgroundColor="#4ECDC4"
          />
          <StatCard
            icon="cash-multiple"
            iconColor="#95E1D3"
            title="Tổng chi tiêu"
            value={formatCurrency(stats.totalSpent)}
            backgroundColor="#95E1D3"
          />
          <StatCard
            icon="star"
            iconColor="#FFD93D"
            title="Đánh giá đã viết"
            value={stats.reviewsWritten}
            backgroundColor="#FFD93D"
          />
        </View>

        {/* Booking Status Pie Chart */}
        {stats.totalBookings > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trạng thái đặt chỗ</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={statusPieData}
                width={screenWidth - 48}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          </View>
        )}

        {/* Monthly Spending Bar Chart */}
        {monthlyData.length > 0 && monthlyData.some((d) => d.amount > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiêu theo tháng (triệu VNĐ)</Text>
            <View style={styles.chartContainer}>
              <BarChart
                data={barChartData}
                width={screenWidth - 48}
                height={220}
                yAxisLabel=""
                yAxisSuffix="M"
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(15, 147, 195, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForLabels: {
                    fontSize: 12,
                  },
                }}
                style={styles.chart}
                fromZero
              />
            </View>
          </View>
        )}

        {/* Summary Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết trạng thái</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <View style={[styles.statusDot, { backgroundColor: "#4CAF50" }]} />
                <Text style={styles.detailLabel}>Đã xác nhận</Text>
              </View>
              <Text style={styles.detailValue}>{stats.confirmedBookings}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <View style={[styles.statusDot, { backgroundColor: "#FF9800" }]} />
                <Text style={styles.detailLabel}>Đang chờ</Text>
              </View>
              <Text style={styles.detailValue}>{stats.pendingBookings}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <View style={[styles.statusDot, { backgroundColor: "#F44336" }]} />
                <Text style={styles.detailLabel}>Đã hủy</Text>
              </View>
              <Text style={styles.detailValue}>{stats.cancelledBookings}</Text>
            </View>
          </View>
        </View>

        {/* Empty State */}
        {stats.totalBookings === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="chart-line" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Chưa có dữ liệu thống kê</Text>
            <Text style={styles.emptySubtext}>Hãy bắt đầu đặt tour hoặc chỗ ở để xem thống kê của bạn</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
