import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f7ff",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 80,
    alignItems: "center",
  },

  qrBox: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1b263b",
    marginBottom: 20,
  },

  amount: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1b263b",
    marginBottom: 10,
  },

  receiver: {
    fontSize: 18,
    opacity: 0.7,
    color: "#1b263b",
  },
  counter: {
    marginTop: 20,
    fontSize: 16,
    color: "#1b263b",
  },
  expired: { color: "red", fontWeight: "700", marginTop: 10, fontSize: 16 },
});
