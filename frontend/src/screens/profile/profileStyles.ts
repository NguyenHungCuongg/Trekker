import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: "#fff",
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B1E28",
    textAlign: "center",
  },
  userSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 45,
    marginBottom: 18,
  },
  username: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1B1E28",
  },
  email: {
    fontSize: 14,
    color: "#7D848D",
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    shadowColor: "#383838ff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F2",
    marginHorizontal: 18,
  },
});
