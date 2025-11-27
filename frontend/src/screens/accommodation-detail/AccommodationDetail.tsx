import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./accommodationDetailStyles";
import axiosInstance from "../../utils/axiosInstance";
import { useToast } from "../../components/context/ToastContext";
import { RoomType } from "../../types";
import { formatNumber } from "../../utils/formatNumber";

export default function AccommodationDetail() {
  const navigation = useNavigation();
  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null);
  const [accommodation, setAccommodation] = useState<any>({
    id: null,
    destinationId: "",
    name: "",
    description: "",
    rating: 0,
    phone: "",
    email: "",
    address: "",
    image: null,
    destination: {},
    roomTypes: [] as RoomType[],
  });
  const route = useRoute();
  const { id } = route.params as { id: any };
  const { showToast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchAccommodations(id).then(() => setLoading(false));
  }, [id]);

  const fetchAccommodations = async (id: any) => {
    try {
      const res = await axiosInstance.get(`/accommodations/${id}`);
      setAccommodation(res.data);
    } catch (error) {
      console.error("Error fetching accommodation detail:", error);
      showToast("error", "Lỗi khi tải chi tiết chỗ ở");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Hero section */}
      <View style={styles.heroSection}>
        <Image
          source={{
            uri:
              accommodation.image ??
              "https://api.builder.io/api/v1/image/assets/TEMP/3a418dd532202f2265e9644023bf652cb4b75966?width=480",
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
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.handle} />

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{accommodation.name}</Text>
            <Text style={styles.address}>{accommodation.address}</Text>
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
            <Text style={styles.metaText}>
              {accommodation.destination?.name}
            </Text>
          </View>

          {accommodation.rating > 0 ? (
            <View style={styles.metaItem}>
              <Svg width={13} height={12} viewBox="0 0 13 12" fill="none">
                <Path
                  d="M5.59149 0.345492C5.74042 -0.115164 6.38888 -0.115164 6.53781 0.345491L7.62841 3.71885C7.69501 3.92486 7.88603 4.06434 8.10157 4.06434H11.6308C12.1128 4.06434 12.3132 4.68415 11.9233 4.96885L9.06803 7.0537C8.89366 7.18102 8.82069 7.4067 8.8873 7.61271L9.9779 10.9861C10.1268 11.4467 9.60222 11.8298 9.21232 11.5451L6.35708 9.46024C6.18271 9.33291 5.94659 9.33291 5.77222 9.46024L2.91698 11.5451C2.52708 11.8298 2.00247 11.4467 2.1514 10.9861L3.242 7.61271C3.30861 7.4067 3.23564 7.18102 3.06127 7.0537L0.206033 4.96885C-0.183869 4.68415 0.0165137 4.06434 0.49846 4.06434H4.02773C4.24326 4.06434 4.43428 3.92486 4.50089 3.71885L5.59149 0.345492Z"
                  fill="#FFD336"
                />
              </Svg>
              <Text style={styles.rating}>{accommodation.rating}</Text>
              <Text style={styles.reviews}>(2498)</Text>
            </View>
          ) : (
            <Text style={styles.rating}>Chưa có đánh giá</Text>
          )}
        </View>

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <View style={styles.contactItem}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.6079 13.3983 14.6298 13.2133 14.6127C11.1619 14.3904 9.19137 13.6894 7.46 12.5667C5.84919 11.5431 4.48353 10.1774 3.46 8.56665C2.33334 6.82745 1.6322 4.84731 1.41334 2.78665C1.39633 2.60229 1.41804 2.41649 1.47712 2.24107C1.53621 2.06564 1.63135 1.90444 1.75619 1.76773C1.88104 1.63102 2.03295 1.52179 2.20229 1.44706C2.37163 1.37232 2.55463 1.33369 2.74 1.33332H4.74C5.06356 1.33013 5.37722 1.4447 5.62248 1.65568C5.86774 1.86665 6.02808 2.15961 6.07334 2.47998C6.15774 3.12003 6.31427 3.74847 6.54 4.35332C6.62974 4.59193 6.64908 4.85127 6.59591 5.10058C6.54274 5.34988 6.41928 5.57872 6.24 5.75998L5.39334 6.60665C6.34241 8.27568 7.72431 9.65758 9.39334 10.6067L10.24 9.75998C10.4213 9.5807 10.6501 9.45724 10.8994 9.40407C11.1487 9.3509 11.4081 9.37024 11.6467 9.45998C12.2515 9.68571 12.88 9.84224 13.52 9.92665C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.9532 14.6667 11.28Z"
                stroke="#7D848D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.contactText}>{accommodation.phone}</Text>
          </View>

          <View style={styles.contactItem}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                d="M2.66667 2.66666H13.3333C14.0667 2.66666 14.6667 3.26666 14.6667 4V12C14.6667 12.7333 14.0667 13.3333 13.3333 13.3333H2.66667C1.93333 13.3333 1.33333 12.7333 1.33333 12V4C1.33333 3.26666 1.93333 2.66666 2.66667 2.66666Z"
                stroke="#7D848D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M14.6667 4L8 8.66667L1.33333 4"
                stroke="#7D848D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.contactText}>{accommodation.email}</Text>
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
          {accommodation.description} {"\n"}
          {"\n"}
          {accommodation.roomTypes.map((roomType: any, index: number) => (
            <Text key={index}>
              <Text> - {roomType.name}:</Text> {roomType.description} {"\n"}
              {"\n"}
            </Text>
          ))}
          Các mô tả khác về chỗ ở (Phần này tự làm flexible thôi){" "}
          <Text style={styles.readMore}>Xem thêm</Text>
        </Text>

        {/* Room Types Section */}
        <Text style={styles.sectionTitle}>Loại phòng</Text>
        {accommodation.roomTypes &&
          accommodation?.roomTypes?.map((roomType: RoomType, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.roomTypeCard,
                selectedRoomType === index && styles.roomTypeCardSelected,
              ]}
              onPress={() =>
                setSelectedRoomType(selectedRoomType === index ? null : index)
              }
              activeOpacity={0.7}
            >
              <View style={styles.roomTypeHeader}>
                <Text
                  style={[
                    styles.roomTypeName,
                    selectedRoomType === index && styles.roomTypeNameSelected,
                  ]}
                >
                  {roomType.name}
                </Text>
                <Text
                  style={[
                    styles.roomTypePrice,
                    selectedRoomType === index && styles.roomTypePriceSelected,
                  ]}
                >
                  {formatNumber(roomType.discountPrice
                    ? roomType.discountPrice
                    : roomType.price)}
                  đ/đêm
                </Text>
              </View>
              <Text style={styles.roomTypeCapacity}>
                Sức chứa: {roomType.capacity} người
              </Text>
              <Text style={styles.roomTypeAmenities}>
                Tiện nghi: {roomType.amenities}
              </Text>
              {selectedRoomType === index && (
                <View style={styles.selectedIndicator}>
                  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <Circle cx="8" cy="8" r="8" fill="#0F93C3" />
                    <Path
                      d="M11.3346 5.33398L6.66797 10.0007L4.66797 8.00065"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          ))}

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Đặt phòng</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
