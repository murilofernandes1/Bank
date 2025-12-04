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

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0d1b2a",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 5,
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    fontSize: 16,
    marginTop: 30,
    color: "#0d1b2a",
  },

  randomBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
  },

  randomText: {
    fontSize: 16,
    color: "#0d1b2a",
    opacity: 0.8,
  },

  confirmButton: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#1b263b",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
