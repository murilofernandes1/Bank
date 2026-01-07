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

  keyList: {
    marginTop: 20,
    gap: 18,
  },

  keyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  keyCardGradient: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#e0f2ff20",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  keyCardEmpty: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  badge: {
    backgroundColor: "#1b263b",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },

  badgeText: {
    color: "#e0f2ff",
    fontWeight: "600",
    fontSize: 12,
  },

  keyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d1b2a",
  },

  keyDetail: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 5,
    color: "#0d1b2a",
  },

  keyDesc: {
    fontSize: 14,
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 5,
  },

  deleteButton: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#0d1b2a",
  },
});
