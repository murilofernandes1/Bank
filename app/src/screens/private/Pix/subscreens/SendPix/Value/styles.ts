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
    marginBottom: 30,
  },

  valueInput: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 8,
  },

  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0d1b2a",
    marginTop: 40,
    marginBottom: 16,
  },

  services: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  serviceButton: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 2,
  },

  notSelected: {
    width: "48%",
    backgroundColor: "#e2e8f0",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },

  serviceCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0d1b2a",
  },

  errorText: {
    marginTop: 8,
    color: "#ff6b6b",
    fontSize: 13,
    fontWeight: "500",
    alignSelf: "center",
  },
  limit: {
    marginTop: 6,
    fontSize: 13,
    color: "#475569",
  },
});
