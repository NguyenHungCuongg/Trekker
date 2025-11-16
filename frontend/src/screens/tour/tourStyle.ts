import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 55,
  },

  /* HEADER */
  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    left: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1E28",
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B1E28",
  },
  viewControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20
  },

  /* GRID */
  grid: {
    gap: 16,
  },
  gridCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridList: {
    flexDirection: "column",
  },
});
