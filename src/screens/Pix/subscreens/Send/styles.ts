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
    color: "##0d1b2a",
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
  },
  pixArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    gap: 5,
  },
  pixDestination: {
    backgroundColor: "#e3f1ff",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 60,
    flex: 1,
    color: "#003366",
    fontSize: 16,
  },

  recentTransactions: {
    flexDirection: "column",
    gap: 20,
    marginTop: 25,
  },

  cardRecent: {
    padding: 20,
    borderRadius: 12,
  },
  contacts: {
    marginTop: 40,
    gap: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  bank: {
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.6,
  },
  key: {
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.6,
  },
  keyName: {
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.6,
  },
  contactInfo: { gap: 5 },
});
