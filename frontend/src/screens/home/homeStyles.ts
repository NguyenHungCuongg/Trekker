import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    borderRadius: 20,
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
