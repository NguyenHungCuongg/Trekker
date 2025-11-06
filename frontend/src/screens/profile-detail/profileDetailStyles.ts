import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F7F7F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1E28",
  },
  doneButton: {
    fontSize: 16,
    color: "#0F93C3",
  },
  content: {
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B1E28",
  },
  changeAvatar: {
    fontSize: 14,
    color: "#0F93C3",
    marginTop: 4,
  },
  formSection: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    color: "#1B1E28",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1B1E28",
  },
  homeIndicator: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  homeBar: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#1B1E28",
  },
});
