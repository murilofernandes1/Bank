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
    marginBottom: 40,
  },
  optionCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },

  optionGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    justifyContent: "flex-start",
    gap: 15,
  },

  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
  },
});
