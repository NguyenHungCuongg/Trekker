import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loginPage: {
    minHeight: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#eff4f9",
  },
  loginFrame: {
    width: 375,
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    shadowColor: "#152242",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
  },
  loginBody: {
    flex: 1,
    paddingTop: 88,
    paddingHorizontal: 20,
    paddingBottom: 72,
    gap: 28,
  },
  loginHeader: {
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#7d848d",
  },
  loginFields: {
    flexDirection: "column",
    gap: 20,
  },
  forgotLink: {
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#0f93c3",
    marginTop: 8,
  },
  primaryCta: { marginTop: 8 },
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
  auxiliary: {
    alignItems: "center",
    gap: 24,
    marginTop: "auto",
  },
  signupText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  link: { color: "#0f93c3", textDecorationLine: "none" },
  alternateDivider: { fontSize: 14, color: "#707b81" },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  googleButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: 60,
  },
});
