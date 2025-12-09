import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width - 40,
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B1E28",
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceInfo: {
    padding: 20,
    paddingBottom: 16,
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
  },
  ratingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B1E28",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFB800",
  },
  commentSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  commentInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#1B1E28",
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  characterCount: {
    fontSize: 12,
    color: "#B0B0B0",
    textAlign: "right",
    marginTop: 4,
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7D848D",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#0F93C3",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
