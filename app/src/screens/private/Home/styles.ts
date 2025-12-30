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

  inlineCard: {
    marginTop: 20,
  },

  inlineCardGradient: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  inlineCardText: {
    color: "#e0f2ff",
    fontSize: 18,
    fontWeight: "700",
  },

  section: {
    fontSize: 22,
    fontWeight: "700",
  },

  pendents: {
    width: "100%",
    marginTop: 30,
  },

  card: {
    width: "100%",
    height: 175,
    borderRadius: 12,
    marginRight: 15,
    marginTop: 30,
    padding: 40,
    justifyContent: "center",
  },

  exit: {
    padding: 10,
    borderRadius: 50,
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  cardModal: {
    width: "80%",
    borderRadius: 12,
    overflow: "hidden",
  },

  cardGradient: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    color: "#e0f2ff",
    fontSize: 22,
    fontWeight: "700",
  },

  modalOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalOutside: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  modalCard: {
    width: "100%",
    padding: 25,
    borderRadius: 16,
    backgroundColor: "#1b263b",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e0f2ff",
    marginBottom: 20,
    textAlign: "center",
  },

  modalContent: {
    alignItems: "center",
    gap: 10,
  },

  cardNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e0f2ff",
  },

  cardName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#e0f2ff",
    opacity: 0.8,
  },
  invoice: {
    color: "#e0f2ff",
    fontWeight: 700,
    fontSize: 20,
    opacity: 0.8,
  },
  value: {
    marginTop: 5,
    color: "#e0f2ff",
    fontWeight: 700,
    fontSize: 25,
  },
  exp: {
    marginTop: 10,
    color: "#e0f2ff",
    fontWeight: 500,
    fontSize: 15,
    opacity: 0.8,
  },
  date: {
    fontWeight: 700,
  },
  divisor: {
    backgroundColor: "#1b263b",
    width: "100%",
    height: 2,
    marginTop: 30,
    marginBottom: 30,
    opacity: 0.1,
  },
  cardLabel: {
    fontSize: 16,
    color: "#e0f2ff",
    opacity: 0.85,
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#e0f2ff",
  },
});
