import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 44,
    marginBottom: 30,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F7F7F9",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1E28",
  },
  cancelText: {
    fontSize: 16,
    color: "#0F93C3",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F9",
    borderRadius: 16,
    height: 48,
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    color: "#1B1E28",
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 16,
  },
  clearAllButton: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  clearAllText: {
    fontSize: 14,
    color: "#0F93C3",
    fontWeight: "600",
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B1E28",
    marginBottom: 16,
  },
  results: {
    paddingBottom: 40,
    paddingTop: 10,
    alignItems: "center",
  },
  resultsContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#7D848D",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B1E28",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#7D848D",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1E28",
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
