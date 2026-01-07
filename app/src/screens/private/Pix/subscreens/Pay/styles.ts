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
    fontSize: 15,
    color: "#475569",
    marginTop: 6,
    marginBottom: 30,
  },

  optionCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
  },

  optionGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    borderRadius: 16,
    justifyContent: "flex-start",
    gap: 16,
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(224,242,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
  },
});
