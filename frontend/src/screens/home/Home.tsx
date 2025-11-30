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
import { useToast } from "../../components/context/ToastContext";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  const { showToast } = useToast();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTopLocations();
    fetchTopDestinations();
    fetchTopTours();
    fetchTopAccommodations();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      showToast("error", "Error fetching user profile:");
    } finally {
      setLoading(false);
    }
  };

  const fetchTopLocations = async () => {
    try {
      const response = await axiosInstance.get("/locations/top");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching top locations:", error);
      showToast("error", "Error fetching top locations:");
    }
  };

  const fetchTopDestinations = async () => {
    try {
      const response = await axiosInstance.get("/destinations/top");
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching top destinations:", error);
      showToast("error", "Error fetching top destinations:");
    }
  };

  const fetchTopTours = async () => {
    try {
      const response = await axiosInstance.get("/tours/top");
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching top tours:", error);
      showToast("error", "Error fetching top tours:");
    }
  };

  const fetchTopAccommodations = async () => {
    try {
      const response = await axiosInstance.get("/accommodations/top?limit=8");
      setAccommodations(response.data);
    } catch (error) {
      console.error("Error fetching top accommodations:", error);
      showToast("error", "Error fetching top accommodations:");
    }
  };

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
              <LocationCard
                key={idx}
                {...location}
                onPress={() =>
                  navigation.navigate("SearchTab", {
                    initialLocationId: location.id,
                    initialLocationName: location.name,
                  })
                }
              />
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
            {destinations.map((destination, idx) => {
              // Find the location for this destination
              const location = locations.find((loc) => loc.id === destination.locationId);
              return (
                <DestinationCard
                  key={idx}
                  {...destination}
                  onPress={() =>
                    navigation.navigate("SearchTab", {
                      initialLocationId: destination.locationId,
                      initialLocationName: location?.name || "",
                      initialDestinationId: destination.id,
                      initialDestinationName: destination.name,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Section 3: Top tour du lịch - TourCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top tour du lịch</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SearchTab", { initialServiceType: "tour" })}>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {tours.map((tour, idx) => (
              <TourCard key={idx} {...tour} onPress={() => navigation.navigate("TourDetail", { id: tour.id })} />
            ))}
          </ScrollView>
        </View>

        {/* Section 4: Top chỗ ở - AccommodationCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top chỗ ở</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SearchTab", { initialServiceType: "accommodation" })}>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {accommodations.map((accommodation, idx) => (
              <AccommodationCard
                key={idx}
                {...accommodation}
                onPress={() => navigation.navigate("AccommodationDetail", { id: accommodation.id })}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
