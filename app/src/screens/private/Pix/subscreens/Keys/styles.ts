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

  keyList: {
    marginTop: 30,
    gap: 20,
  },

  keyCard: {
    backgroundColor: "#ffffff",

    borderRadius: 12,
    padding: 20,
  },

  keyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d1b2a",
  },

  keyDesc: {
    fontSize: 14,
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 5,
  },
  keyDetail: {
    fontSize: 16,
    color: "#0d1b2a",
    fontWeight: "700",
    marginTop: 5,
    opacity: 0.9,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
