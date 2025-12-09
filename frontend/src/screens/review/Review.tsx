import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import ReviewCard from "../../components/review/ReviewCard";
import ReviewPopup from "../../components/review/ReviewPopup";
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

// Dummy data for testing
const DUMMY_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    serviceType: "tour",
    serviceId: 5,
    serviceName: "Du lịch Phú Quốc 3 ngày 2 đêm",
    serviceImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    serviceLocation: "Phú Quốc, Kiên Giang",
    hasReviewed: true,
    rating: 5,
    comment: "Chuyến đi tuyệt vời! Hướng dẫn viên nhiệt tình, phong cảnh đẹp. Sẽ quay lại lần nữa.",
    reviewDate: "2024-12-01T10:00:00Z",
  },
  {
    id: 2,
    serviceType: "accommodation",
    serviceId: 3,
    serviceName: "Vinpearl Resort & Spa Nha Trang Bay",
    serviceImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    serviceLocation: "Nha Trang, Khánh Hòa",
    hasReviewed: false,
  },
  {
    id: 3,
    serviceType: "tour",
    serviceId: 8,
    serviceName: "Tour Sapa 2 ngày 1 đêm",
    serviceImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400",
    serviceLocation: "Sapa, Lào Cai",
    hasReviewed: true,
    rating: 4,
    comment: "Khung cảnh đẹp, không khí mát mẻ. Tuy nhiên đường đi hơi xa.",
    reviewDate: "2024-11-28T14:30:00Z",
  },
  {
    id: 4,
    serviceType: "accommodation",
    serviceId: 7,
    serviceName: "Pullman Danang Beach Resort",
    serviceImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
    serviceLocation: "Đà Nẵng",
    hasReviewed: false,
  },
  {
    id: 5,
    serviceType: "tour",
    serviceId: 12,
    serviceName: "Khám phá Hạ Long 1 ngày",
    serviceImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400",
    serviceLocation: "Hạ Long, Quảng Ninh",
    hasReviewed: true,
    rating: 5,
    comment: "Vịnh Hạ Long thật sự tuyệt đẹp! Dịch vụ tốt, thức ăn ngon.",
    reviewDate: "2024-11-25T09:00:00Z",
  },
];

export default function Review() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [reviews, setReviews] = useState<ReviewItem[]>(DUMMY_REVIEWS);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "reviewed" | "not-reviewed">("all");
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
