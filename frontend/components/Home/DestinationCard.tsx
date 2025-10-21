import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

interface DestinationCardProps {
  image: string;
  title: string;
  rating: string;
  location: string;
  userCount: string;
  showBookmark?: boolean;
}

export default function DestinationCard({
  image,
  title,
  rating,
  location,
  userCount,
  showBookmark = false,
}: DestinationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {showBookmark && (
          <View style={styles.bookmarkContainer}>
            <View style={styles.bookmarkBg} />
            <Svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={styles.bookmarkIcon}
            >
              <Path
                d="M3.00012 3.99998C3.00012 2.34312 4.34327 0.999977 6.00012 0.999977H12.0001C13.657 0.999977 15.0001 2.34312 15.0001 3.99998V14.3358C15.0001 15.2267 13.923 15.6728 13.293 15.0429L10.4143 12.1642C9.63329 11.3831 8.36696 11.3831 7.58591 12.1642L4.70723 15.0429C4.07726 15.6728 3.00012 15.2267 3.00012 14.3358V3.99998Z"
                stroke="white"
                strokeWidth="1.5"
              />
            </Svg>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.rating}>
            <Svg width="12" height="12" viewBox="0 0 13 12" fill="none">
              <Path fill="#FFD336" />
            </Svg>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.locationContainer}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Circle
                cx="8"
                cy="7.33336"
                r="2"
                stroke="#7D848D"
                strokeWidth="1.5"
              />
              <Path
                d="M14 7.25928C14 10.5321 10.25 14.6667 8 14.6667C5.75 14.6667 2 10.5321 2 7.25928C2 3.98649 4.68629 1.33336 8 1.33336C11.3137 1.33336 14 3.98649 14 7.25928Z"
                stroke="#7D848D"
                strokeWidth="1.5"
              />
            </Svg>
            <Text style={styles.locationText}>{location}</Text>
          </View>

          <View style={styles.userImages}>
            {[1, 2, 3].map((i) => (
              <ImageBackground
                key={i}
                source={{ uri: `https://i.pravatar.cc/48?img=${i}` }}
                style={styles.avatar}
                imageStyle={{ borderRadius: 12 }}
              />
            ))}
            <View style={styles.userCount}>
              <Text style={styles.userCountText}>{userCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 268,
    height: 384,
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#b4bcc9",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    padding: 14,
  },
  imageContainer: { position: "relative", width: 240, height: 286 },
  image: { width: "100%", height: "100%", borderRadius: 20 },
  bookmarkContainer: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 34,
    height: 34,
  },
  bookmarkBg: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#1B1E28",
    opacity: 0.2,
  },
  bookmarkIcon: { position: "absolute", top: 8, left: 8 },
  content: { marginTop: 14, paddingHorizontal: 6 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, color: "#1B1E28", fontWeight: "500", flex: 1 },
  rating: { flexDirection: "row", alignItems: "center", gap: 4, marginLeft: 8 },
  ratingText: { fontSize: 15, color: "#1B1E28" },
  locationContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  locationText: { color: "#7D848D", fontSize: 15, marginLeft: 4 },
  userImages: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 24, height: 24, marginLeft: -8 },
  userCount: {
    width: 24,
    height: 24,
    backgroundColor: "#E5F4FF",
    borderRadius: 12,
    marginLeft: -8,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  userCountText: { color: "#1B1E28", fontSize: 11 },
});
