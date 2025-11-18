import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationCard from "../../components/home-card/LocationCard";
import DestinationCard from "../../components/home-card/DestinationCard";
import TourCard from "../../components/home-card/TourCard";
import AccommodationCard from "../../components/home-card/AccommodationCard";
import axiosInstance from "../../utils/axiosInstance";
import { User, Location, Destination, Tour, Accommodation } from "../../types";
import { styles } from "./homeStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Data cho LocationCard (Top tỉnh/thành)
  const locations: Location[] = [
    {
      name: "Hồ Chí Minh",
      accommodations: 245,
      tours: 189,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      name: "Hà Nội",
      accommodations: 198,
      tours: 156,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      name: "Đà Nẵng",
      accommodations: 142,
      tours: 98,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
  ];

  // Data cho DestinationCard (Top địa điểm du lịch)
  const destinations: Destination[] = [
    {
      name: "Vịnh Hạ Long",
      tours: 45,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      name: "Phố Cổ Hội An",
      tours: 38,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      name: "Chùa Một Cột",
      tours: 32,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
  ];

  // Data cho TourCard (Top tour du lịch)
  const tours: Tour[] = [
    {
      title: "Tour Sapa 3 ngày 2 đêm",
      location: "Sapa, Lào Cai",
      rating: 4.8,
      price: "3.500.000đ",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      title: "Tour Phú Quốc 4N3Đ",
      location: "Phú Quốc, Kiên Giang",
      rating: 4.9,
      price: "5.200.000đ",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      title: "Tour Đà Lạt 2N1Đ",
      location: "Đà Lạt, Lâm Đồng",
      rating: 4.7,
      price: "2.800.000đ",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
  ];

  // Data cho AccommodationCard (Top chỗ ở)
  const accommodations: Accommodation[] = [
    {
      name: "Khách sạn Mường Thanh",
      location: "Đà Nẵng",
      rating: 4.7,
      price: "1.200.000đ/đêm",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      name: "Resort Vinpearl",
      location: "Nha Trang",
      rating: 4.9,
      price: "2.500.000đ/đêm",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
    {
      name: "Homestay Sapa View",
      location: "Sapa, Lào Cai",
      rating: 4.6,
      price: "500.000đ/đêm",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
          <View style={styles.profile}>
            {loading ? (
              <ActivityIndicator size="small" color="#15C4C8" />
            ) : (
              <>
                <Image
                  source={
                    user?.profileImage
                      ? { uri: user.profileImage }
                      : require("../../../assets/default-profile-image.jpg")
                  }
                  style={styles.avatar}
                />
                <Text style={styles.username}>{user?.username || "Guest"}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroText1}>Đi để thấy</Text>
          <Text style={styles.heroText2}>
            Sống để <Text style={styles.highlight}>trải nghiệm!</Text>
          </Text>
        </View>

        {/* Section 1: Top tỉnh/thành - LocationCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top tỉnh/thành</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {locations.map((location, idx) => (
              <LocationCard key={idx} {...location} />
            ))}
          </ScrollView>
        </View>

        {/* Section 2: Top địa điểm du lịch - DestinationCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top địa điểm du lịch</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {destinations.map((destination, idx) => (
              <DestinationCard key={idx} {...destination} />
            ))}
          </ScrollView>
        </View>

        {/* Section 3: Top tour du lịch - TourCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top tour du lịch</Text>
            <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: "TourTab" })}>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {tours.map((tour, idx) => (
              <TourCard key={idx} {...tour} onPress={() => navigation.navigate("TourDetail")} />
            ))}
          </ScrollView>
        </View>

        {/* Section 4: Top chỗ ở - AccommodationCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top chỗ ở</Text>
            <TouchableOpacity onPress={() => navigation.navigate("MainTabs", { screen: "AccommodationTab" })}>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {accommodations.map((accommodation, idx) => (
              <AccommodationCard
                key={idx}
                {...accommodation}
                onPress={() => navigation.navigate("AccommodationDetail")}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
