import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DestinationCard from "../components/home/DestinationCard";
import BottomNav from "../components/home/BottomNav";

interface Destination {
  image: string;
  title: string;
  rating: string;
  location: string;
  userCount: string;
}

interface SectionProps {
  title: string;
  data: Destination[];
}

export default function Home() {
  const destinations1: Destination[] = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Niladri Reservoir",
      rating: "4.7",
      location: "Tekergat, Sunamgnj",
      userCount: "+50",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Darma Reservoir",
      rating: "4.9",
      location: "Darma, Kuningan",
      userCount: "+50",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Sông Reservoir",
      rating: "4.8",
      location: "Vietnam",
      userCount: "+50",
    },
  ];

  const destinations2: Destination[] = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Niladri Reservoir",
      rating: "4.7",
      location: "Tekergat, Sunamgnj",
      userCount: "+50",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Beach Paradise",
      rating: "4.9",
      location: "Nha Trang",
      userCount: "+75",
    },
  ];

  const destinations3: Destination[] = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Mountain View",
      rating: "4.8",
      location: "Sa Pa",
      userCount: "+60",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Darma Reservoir",
      rating: "4.9",
      location: "Darma, Kuningan",
      userCount: "+50",
    },
  ];

  const destinations4: Destination[] = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Niladri Reservoir",
      rating: "4.7",
      location: "Tekergat, Sunamgnj",
      userCount: "+50",
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
      title: "Coastal Resort",
      rating: "4.9",
      location: "Đà Nẵng",
      userCount: "+80",
    },
  ];

  const Section: React.FC<SectionProps> = ({ title, data }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {data.map((dest, idx) => (
          <DestinationCard key={idx} {...dest} showBookmark />
        ))}
      </ScrollView>
    </View>
  );

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

        <Section title="Top tỉnh/thành" data={destinations1} />
        <Section title="Top địa điểm du lịch" data={destinations2} />
        <Section title="Top tour du lịch" data={destinations3} />
        <Section title="Top chỗ ở" data={destinations4} />
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
