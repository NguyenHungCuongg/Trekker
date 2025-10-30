import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

export default function TourDetail() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Hero section */}
      <View style={styles.heroSection}>
        <Image
          source={{
            uri: "https://api.builder.io/api/v1/image/assets/TEMP/0ce3e082b0ccb12a660832009bf3f49958919af7?width=750",
          }}
          style={styles.heroImage}
        />

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4685 6.41431C14.792 6.67307 14.8444 7.14504 14.5857 7.46849L10.9605 12L14.5857 16.5314C14.8444 16.8549 14.792 17.3269 14.4685 17.5856C14.1451 17.8444 13.6731 17.7919 13.4144 17.4685L9.41437 12.4685C9.19523 12.1946 9.19524 11.8054 9.41437 11.5314L13.4144 6.53145C13.6731 6.208 14.1451 6.15556 14.4685 6.41431Z"
              fill="white"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Content section */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Tên tour</Text>
            <Text style={styles.duration}>Thời lượng tour</Text>
          </View>
        </View>

        {/* Meta section */}
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Circle
                cx="8"
                cy="7.33334"
                r="2"
                stroke="#7D848D"
                strokeWidth="1.5"
              />
              <Path
                d="M14 7.25926C14 10.5321 10.25 14.6667 8 14.6667C5.75 14.6667 2 10.5321 2 7.25926C2 3.98646 4.68629 1.33334 8 1.33334C11.3137 1.33334 14 3.98646 14 7.25926Z"
                stroke="#7D848D"
                strokeWidth="1.5"
              />
            </Svg>
            <Text style={styles.metaText}>Tên location</Text>
          </View>

          <View style={styles.metaItem}>
            <Svg width={13} height={12} viewBox="0 0 13 12" fill="none">
              <Path
                d="M5.59149 0.345492C5.74042 -0.115164 6.38888 -0.115164 6.53781 0.345491L7.62841 3.71885C7.69501 3.92486 7.88603 4.06434 8.10157 4.06434H11.6308C12.1128 4.06434 12.3132 4.68415 11.9233 4.96885L9.06803 7.0537C8.89366 7.18102 8.82069 7.4067 8.8873 7.61271L9.9779 10.9861C10.1268 11.4467 9.60222 11.8298 9.21232 11.5451L6.35708 9.46024C6.18271 9.33291 5.94659 9.33291 5.77222 9.46024L2.91698 11.5451C2.52708 11.8298 2.00247 11.4467 2.1514 10.9861L3.242 7.61271C3.30861 7.4067 3.23564 7.18102 3.06127 7.0537L0.206033 4.96885C-0.183869 4.68415 0.0165137 4.06434 0.49846 4.06434H4.02773C4.24326 4.06434 4.43428 3.92486 4.50089 3.71885L5.59149 0.345492Z"
                fill="#FFD336"
              />
            </Svg>
            <Text style={styles.rating}>4.7</Text>
            <Text style={styles.reviews}>(2498)</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.price}>$giá</Text>
            <Text style={styles.priceUnit}> /Người</Text>
          </View>
        </View>

        {/* Gallery */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
        >
          {[
            "https://api.builder.io/api/v1/image/assets/TEMP/1eec378f8e06ba0df68d6f1dd0d1d6e27edc3177?width=173",
            "https://api.builder.io/api/v1/image/assets/TEMP/f58486cec84dac3d288db19aee8598689cf5ae25?width=173",
            "https://api.builder.io/api/v1/image/assets/TEMP/45d9be22b8577d98eb84edc24f32490442b57cca?width=173",
          ].map((url, i) => (
            <Image key={i} source={{ uri: url }} style={styles.galleryImage} />
          ))}
        </ScrollView>

        {/* Description */}
        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={styles.description}>
          Số người tham gia tối đa. {"\n"}
          Ngày bắt đầu - ngày kết thúc. {"\n"}
          Các mô tả khác (Phần này tự làm flexible thôi){" "}
          <Text style={styles.readMore}>Xem thêm</Text>
        </Text>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Đặt ngay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroSection: {
    width: "100%",
    height: 340, // Giảm bớt cho tỉ lệ thực tế iPhone
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 52,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(27,30,40,0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#fff",
    marginTop: -40,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 2,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 16,
    backgroundColor: "#7D848D",
    opacity: 0.2,
    alignSelf: "center",
    marginBottom: 24,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: "#1B1E28",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  duration: {
    color: "#7D848D",
    fontSize: 14,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
    rowGap: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: "#7D848D",
    fontSize: 14,
  },
  rating: {
    color: "#1B1E28",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  reviews: {
    color: "#7D848D",
    fontSize: 14,
  },
  price: {
    color: "#15C4C8",
    fontSize: 14,
    fontWeight: "600",
  },
  priceUnit: {
    color: "#7D848D",
    fontSize: 14,
  },
  gallery: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  sectionTitle: {
    color: "#1B1E28",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    color: "#7D848D",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  readMore: {
    color: "#15C4C8",
    textDecorationLine: "underline",
  },
  bookButton: {
    width: "100%",
    height: 54,
    borderRadius: 16,
    backgroundColor: "#0F93C3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
