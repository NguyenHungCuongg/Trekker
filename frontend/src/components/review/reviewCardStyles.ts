import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  serviceTypeTag: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceTypeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F93C3",
  },
  reviewDate: {
    fontSize: 12,
    color: "#7D848D",
  },
  cardContent: {
    flexDirection: "row",
    padding: 12,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B1E28",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 13,
    color: "#7D848D",
    marginLeft: 4,
    flex: 1,
  },
  reviewSection: {
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#1B1E28",
    lineHeight: 20,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F93C3",
    marginLeft: 6,
  },
  cardFooter: {
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F93C3",
    paddingVertical: 12,
    borderRadius: 8,
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 6,
  },
});
