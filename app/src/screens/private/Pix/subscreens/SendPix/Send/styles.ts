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
  contactsTitle: {
    fontSize: 20,
    fontWeight: "600",
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

  pixArea: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  pixDestination: {
    flex: 1,
    height: 60,
    paddingHorizontal: 16,
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    fontSize: 16,
    color: "#0d1b2a",
  },

  contacts: {
    marginTop: 40,
    gap: 30,
  },

  cardRecent: {
    padding: 20,
    borderRadius: 12,
  },

  contactInfo: {
    gap: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e0f2ff",
  },

  key: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e0f2ff",
    opacity: 0.7,
  },

  keyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e0f2ff",
  },

  bank: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e0f2ff",
    opacity: 0.6,
  },
});
