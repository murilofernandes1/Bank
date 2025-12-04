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
    marginTop: 165,
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
});
