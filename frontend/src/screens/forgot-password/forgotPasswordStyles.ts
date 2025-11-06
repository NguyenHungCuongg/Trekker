import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    minHeight: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#eff4f9",
  },
  frame: {
    width: 375,
    maxWidth: "100%",
    minHeight: 750,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#152242",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
    position: "relative",
  },
  body: {
    flex: 1,
    paddingTop: 88,
    paddingHorizontal: 20,
    paddingBottom: 72,
    gap: 28,
    width: "100%",
  },
  header: {
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7d848d",
    textAlign: "center",
  },
  fields: {
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1b1e28",
  },
  input: {
    height: 56,
    backgroundColor: "#f7f7f9",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1b1e28",
  },
  primaryCta: {
    marginTop: 8,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#0f93c3",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
