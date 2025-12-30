import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f7ff",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0d1b2a",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#415a77",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 22,
  },

  invoiceCard: {
    borderRadius: 16,
    padding: 24,
  },

  cardLabel: {
    fontSize: 16,
    color: "#e0f2ff",
    opacity: 0.85,
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#e0f2ff",
    marginBottom: 14,
  },

  cardExpiration: {
    fontSize: 14,
    color: "#e0f2ff",
  },

  badgeClosed: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(240,247,255,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#e0f2ff",
    fontSize: 13,
    fontWeight: "600",
  },

  actionArea: {
    gap: 14,
    marginBottom: 34,
  },

  helperInline: {
    fontSize: 13,
    color: "#415a77",
    textAlign: "center",
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 4,
  },

  sectionDesc: {
    fontSize: 14,
    color: "#415a77",
    marginBottom: 16,
  },

  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  creditCard: {
    width: 400,
    height: 275,
    borderRadius: 20,
    padding: 20,
  },

  orbitWrapper: {
    alignItems: "flex-start",
  },

  orbit: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  orbitCenter: {
    width: 52,
    height: 52,
    borderRadius: 999,
    opacity: 0.9,
  },

  orbitDot: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 999,
    left: 48,
    bottom: 48,
    opacity: 0.6,
  },

  contactless: {
    width: 44,
    height: 44,
    position: "absolute",
    top: 15,
    right: 15,
  },

  userInfo: {
    position: "absolute",
    bottom: 28,
    left: 20,
  },

  numberContainer: {
    width: "66%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  number: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
    opacity: 0.8,
    marginBottom: 8,
  },

  cardNumber: {
    fontWeight: "600",
    fontSize: 20,
    color: "#e0f2ff",
    letterSpacing: 2,
    opacity: 0.8,
  },

  title: {
    fontSize: 20,
    color: "#e0f2ff",
    fontWeight: "500",
    width: "80%",
    marginTop: 12,
  },

  mastercard: {
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 15,
    right: 15,
  },

  bold: {
    fontWeight: "700",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
