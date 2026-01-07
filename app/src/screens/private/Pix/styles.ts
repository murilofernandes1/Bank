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
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 6,
    marginBottom: 22,
  },
  heroCard: {
    marginBottom: 26,
  },
  heroGradient: {
    borderRadius: 22,
    padding: 22,
    alignItems: "flex-start",
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 10,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#cbd5f5",
    marginTop: 4,
  },
  section: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 14,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceButton: {
    width: "47%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 5,
  },
  serviceCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceName: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#0d1b2a",
  },
  tipCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginTop: 10,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: "#475569",
  },
});
