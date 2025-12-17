import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f7ff",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
  card: {
    width: "100%",
    height: 175,
    borderRadius: 12,
    marginRight: 15,
    marginTop: 30,
    padding: 40,
    justifyContent: "center",
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
  },

  cardName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#e0f2ff",
    opacity: 0.8,
  },
  invoice: {
    color: "#e0f2ff",
    fontWeight: 700,
    fontSize: 20,
    opacity: 0.8,
  },
  value: {
    marginTop: 5,
    color: "#e0f2ff",
    fontWeight: 700,
    fontSize: 25,
  },
  exp: {
    marginTop: 10,
    color: "#e0f2ff",
    fontWeight: 500,
    fontSize: 15,
    opacity: 0.8,
  },
  date: {
    fontWeight: 700,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0d1b2a",
    marginTop: 20,
  },
});
