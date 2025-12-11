import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import ReviewCard from "../../components/review/ReviewCard";
import ReviewPopup from "../../components/review/ReviewPopup";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../components/context/ToastContext";
import { styles } from "./reviewStyles";

interface ReviewItem {
  id: number;
  serviceType: "tour" | "accommodation";
  serviceId: number;
  serviceName: string;
  serviceImage: string;
  serviceLocation: string;
  hasReviewed: boolean;
  rating?: number;
  comment?: string;
  reviewDate?: string;
}

export default function Review() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "reviewed" | "not-reviewed">("all");
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  useEffect(() => {
    fetchConfirmedServices();
  }, []);

  const fetchConfirmedServices = async () => {
    try {
      const response = await axiosInstance.get("/bookings/confirmed-services/list");

      // Transform backend data to ReviewItem format
      const reviewItems: ReviewItem[] = response.data.map((service: any, index: number) => ({
        id: index + 1,
        serviceType: service.serviceType,
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        serviceImage: service.serviceImage,
        serviceLocation: service.serviceLocation,
        hasReviewed: false, // TODO: Check if user has reviewed this service
        rating: undefined,
        comment: undefined,
        reviewDate: undefined,
      }));

      setReviews(reviewItems);
    } catch (error) {
      console.error("Error fetching confirmed services:", error);
      showToast("error", "Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConfirmedServices();
    setRefreshing(false);
  };

  const handleReviewPress = (review: ReviewItem) => {
    setSelectedReview(review);
    setShowReviewPopup(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    if (selectedReview) {
      // Update the review in the list
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r.id === selectedReview.id
            ? {
                ...r,
                hasReviewed: true,
                rating,
                comment,
                reviewDate: new Date().toISOString(),
              }
            : r
        )
      );
    }
    setShowReviewPopup(false);
    setSelectedReview(null);
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    if (filter === "reviewed") return review.hasReviewed;
    if (filter === "not-reviewed") return !review.hasReviewed;
    return true;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#1B1E28" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đánh giá dịch vụ</Text>
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
        <Text style={styles.headerTitle}>Đánh giá dịch vụ</Text>
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
              Tất cả ({reviews.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === "reviewed" && styles.filterTabActive]}
            onPress={() => setFilter("reviewed")}
          >
            <Text style={[styles.filterTabText, filter === "reviewed" && styles.filterTabTextActive]}>
              Đã đánh giá ({reviews.filter((r) => r.hasReviewed).length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === "not-reviewed" && styles.filterTabActive]}
            onPress={() => setFilter("not-reviewed")}
          >
            <Text style={[styles.filterTabText, filter === "not-reviewed" && styles.filterTabTextActive]}>
              Chưa đánh giá ({reviews.filter((r) => !r.hasReviewed).length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Review List */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {filteredReviews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="star" size={64} color="#CCC" />
            <Text style={styles.emptyText}>Chưa có đánh giá nào</Text>
            <Text style={styles.emptySubtext}>
              {filter === "all"
                ? "Hãy hoàn thành chuyến đi để đánh giá dịch vụ!"
                : filter === "reviewed"
                ? "Bạn chưa có đánh giá nào"
                : "Không có dịch vụ nào cần đánh giá"}
            </Text>
          </View>
        ) : (
          <View style={styles.reviewList}>
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} onReviewPress={handleReviewPress} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Review Popup */}
      {showReviewPopup && selectedReview && (
        <ReviewPopup
          visible={showReviewPopup}
          review={selectedReview}
          onClose={() => {
            setShowReviewPopup(false);
            setSelectedReview(null);
          }}
          onSubmit={handleSubmitReview}
        />
      )}
    </SafeAreaView>
  );
}
