import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f7ff",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 80,
    alignItems: "center",
  },

  qrBox: {
    padding: 30,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: "#0d1b2a",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    width: 320,
    height: 320,
  },

  amount: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1b263b",
    marginBottom: 10,
  },

  receiver: {
    fontSize: 18,
    opacity: 0.8,
    color: "#1b263b",
    marginBottom: 10,
    textAlign: "center",
  },

  counter: {
    marginTop: 15,
    fontSize: 16,
    color: "#415a77",
    textAlign: "center",
  },

  timer: {
    fontWeight: "700",
    color: "#0d1b2a",
  },

  expired: {
    color: "#ff4d4d",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});
