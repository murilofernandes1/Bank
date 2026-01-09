import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
  },

  card: {
    width: 400,
    padding: 20,
    borderRadius: 20,
    height: 275,
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
    bottom: 15,
    left: 15,
  },

  number: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
    marginBottom: 8,
    opacity: 0.8,
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
});
