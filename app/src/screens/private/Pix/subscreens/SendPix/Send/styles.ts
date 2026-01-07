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
    marginBottom: 26,
  },
  searchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 6,
    elevation: 4,
  },
  pixDestination: {
    flex: 1,
    height: 54,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0d1b2a",
  },
  searchButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#0d1b2a",
    justifyContent: "center",
    alignItems: "center",
  },
  contacts: {
    marginTop: 36,
    gap: 24,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d1b2a",
  },
  cardRecent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  contactInfo: {
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e0f2ff",
  },
  key: {
    fontSize: 14,
    color: "#e0f2ff",
    opacity: 0.75,
  },
  keyName: {
    fontWeight: "600",
    color: "#e0f2ff",
  },
  bank: {
    fontSize: 13,
    color: "#e0f2ff",
    opacity: 0.6,
  },
  feedback: {
    alignSelf: "center",
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
  },
});
