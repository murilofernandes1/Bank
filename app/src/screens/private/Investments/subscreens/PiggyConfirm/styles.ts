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
    fontSize: 22,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#0d1b2a",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 40,
  },

  value: {
    fontSize: 32,
    fontWeight: "700",
    color: "#f0f7ff",
  },

  arrow: {
    marginVertical: 16,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f0f7ff",
    marginTop: 8,
  },

  bank: {
    fontSize: 14,
    color: "#cbd5e1",
    marginTop: 2,
  },
});
