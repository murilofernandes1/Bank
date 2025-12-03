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

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    height: 200,
    justifyContent: "center",
  },

  greeting: {
    color: "#0d1b2a",
    fontSize: 30,
    fontWeight: "400",
  },

  name: {
    fontWeight: "700",
  },

  balance: {
    width: "100%",
    padding: 40,
    borderRadius: 12,
    marginTop: 10,
    position: "relative",
  },

  balanceContainer: {
    flexDirection: "column",
  },

  eye: {
    position: "absolute",
    right: 20,
    top: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#e0f2ff",
    opacity: 0.8,
  },

  number: {
    fontSize: 28,
    fontWeight: "700",
    color: "#e0f2ff",
    marginTop: 8,
  },

  section: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "700",
  },

  pendents: {
    width: "100%",
    marginTop: 30,
  },

  card: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginRight: 15,
  },

  notifications: {
    padding: 10,
    borderRadius: 50,
  },
  recentTransactions: {
    flexDirection: "column",
    gap: 20,
    marginTop: 25,
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

  serviceButton: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    marginRight: 15,
  },
  serviceCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  services: {
    width: "100%",
    marginTop: 30,
  },
  serviceName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
  },
  pixIcon: {
    resizeMode: "center",
    height: 50,
    width: 50,
    color: "#e0f2ff",
  },
});
