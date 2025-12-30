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
    marginBottom: 20,
  },

  card: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
  },
  creditCard: {
    width: 400,
    padding: 20,
    borderRadius: 20,
    height: 275,
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
    marginBottom: 16,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardExpiration: {
    fontSize: 14,
    color: "#e0f2ff",
    opacity: 0.9,
  },

  badgeClosed: {
    backgroundColor: "rgba(240,247,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#e0f2ff",
    fontSize: 13,
    fontWeight: "600",
  },

  actionArea: {
    gap: 16,
  },

  helperBox: {
    backgroundColor: "#eaf2ff",
    padding: 14,
    borderRadius: 12,
  },

  helperText: {
    fontSize: 14,
    color: "#0d1b2a",
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 20,
  },

  bold: {
    fontWeight: "700",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",

    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
  },

  contactless: {
    width: 35,
    height: 35,
    position: "absolute",
    top: 15,
    right: 15,
  },

  userInfo: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 50,
    left: 20,
  },

  number: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
    marginBottom: 8,
    opacity: 0.8,
  },
  cardNumber: {
    fontSize: 20,
    color: "#e0f2ff",
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: "#e0f2ff",
    fontWeight: "500",
    width: "80%",
  },

  mastercard: {
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  orbitWrapper: {
    alignItems: "flex-start",
  },

  orbit: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  orbitCenter: {
    width: 40,
    height: 40,
    borderRadius: 999,
    opacity: 0.9,
  },

  orbitDot: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 999,
    left: 40,
    bottom: 40,
    opacity: 0.6,
  },
  numberContainer: {
    width: "66%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
