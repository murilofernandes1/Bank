import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f7ff",
  },

  content: {
    paddingHorizontal: 20,
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
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 6,
    marginBottom: 30,
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 30,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 6,
  },

  infoText: {
    fontSize: 14,
    color: "#0d1b2a",
    opacity: 0.8,
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 14,
  },

  daysContainer: {
    paddingVertical: 10,
    paddingBottom: 20,
  },

  dayCard: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#e6eef7",
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  dayCardSelected: {
    backgroundColor: "#0d1b2a",
    transform: [{ scale: 1.05 }],
  },

  dayNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0d1b2a",
  },

  dayNumberSelected: {
    color: "#f0f7ff",
  },

  dayLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#0d1b2a",
    opacity: 0.7,
  },

  dayLabelSelected: {
    color: "#f0f7ff",
    opacity: 0.9,
  },

  confirmationBox: {
    backgroundColor: "#eaf2ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 30,
  },

  confirmationText: {
    fontSize: 15,
    color: "#0d1b2a",
    textAlign: "center",
  },

  bold: {
    fontWeight: "700",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
