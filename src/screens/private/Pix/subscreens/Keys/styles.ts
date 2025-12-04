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
    borderColor: "#0d1b2a",
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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

  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
