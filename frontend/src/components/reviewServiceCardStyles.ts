import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B1E28",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewDate: {
    fontSize: 12,
    color: "#7D848D",
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: "#1B1E28",
    lineHeight: 20,
  },
});
