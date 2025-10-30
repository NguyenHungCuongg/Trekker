import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";

interface DestinationCardProps {
  name: string;
  tours: number;
  image: string;
  onPress?: () => void;
}

export default function DestinationCard({ name, tours, image, onPress }: DestinationCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.stat}>
          <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <Path
              d="M5.36666 4.28117V14.0556M10.0333 1.02304V10.7974M1.9757 1.32183L4.37082 3.41209C4.94769 3.91553 5.78563 3.91553 6.36251 3.41209L9.03749 1.07759C9.61436 0.574151 10.4523 0.574152 11.0292 1.07759L14.1403 3.7927C14.4949 4.10221 14.7 4.56071 14.7 5.04418V13.131C14.7 13.8216 13.9309 14.1989 13.4243 13.7568L11.0292 11.6665C10.4523 11.1631 9.61436 11.1631 9.03749 11.6665L6.36251 14.001C5.78563 14.5044 4.94769 14.5044 4.37082 14.001L1.25971 11.2859C0.905055 10.9764 0.699997 10.5179 0.699997 10.0344V1.94757C0.699997 1.25698 1.46911 0.879724 1.9757 1.32183Z"
              stroke="#7D848D"
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </Svg>
          <Text style={styles.statText}>Số tour du lịch: {tours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 268,
    height: 383,
    borderRadius: 24,
    backgroundColor: "#fff",
    shadowColor: "#B4BCC9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    paddingVertical: 15,
    paddingHorizontal: 14,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  image: {
    width: 240,
    height: 286,
    borderRadius: 20,
    resizeMode: "cover",
  },
  content: {
    paddingTop: 14,
    alignItems: "center",
  },
  title: {
    color: "#1B1E28",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 9,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  statText: {
    color: "#7D848D",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
});
