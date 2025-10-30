import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationCard from "../components/home-card/LocationCard";
import DestinationCard from "../components/home-card/DestinationCard";
import TourCard from "../components/home-card/TourCard";
import AccommodationCard from "../components/home-card/AccommodationCard";
import BottomNav from "../components/home/BottomNav";

interface Location {
  name: string;
  accommodations: number;
  tours: number;
  image: string;
}

interface Destination {
  name: string;
  tours: number;
  image: string;
}

interface Tour {
  title: string;
  location: string;
  rating: number;
  price: string;
  image: string;
}

interface Accommodation {
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
}

export default function Home() {
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.username}>Leonardo</Text>
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
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {tours.map((tour, idx) => (
              <TourCard key={idx} {...tour} />
            ))}
          </ScrollView>
        </View>

        {/* Section 4: Top chỗ ở - AccommodationCard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top chỗ ở</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {accommodations.map((accommodation, idx) => (
              <AccommodationCard key={idx} {...accommodation} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 56,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#BFDBFE",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    marginLeft: 8,
    color: "#1B1E28",
    fontWeight: "600",
    fontSize: 14,
  },
  hero: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  heroText1: {
    fontSize: 32,
    color: "#1B1E28",
    lineHeight: 40,
  },
  heroText2: {
    fontSize: 32,
    color: "#1B1E28",
    fontWeight: "bold",
    lineHeight: 40,
  },
  highlight: {
    color: "#15C4C8",
  },
  section: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#1B1E28",
    fontWeight: "bold",
  },
  sectionLink: {
    color: "#0F93C3",
    fontSize: 14,
  },
  scrollContainer: {
    gap: 16,
    paddingRight: 20,
  },
});
