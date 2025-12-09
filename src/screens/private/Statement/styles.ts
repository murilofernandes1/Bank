import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  recentTransactions: {
    flexDirection: "column",
    gap: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: "#f0f7ff",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
  cardRecentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  transactionInfo: {
    flex: 1,
    marginHorizontal: 15,
  },

  titleTransaction: {
    fontSize: 18,
    fontWeight: "500",
    color: "#e0f2ff",
  },

  exitValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff6b6b",
  },

  entryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4ade80",
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
});
