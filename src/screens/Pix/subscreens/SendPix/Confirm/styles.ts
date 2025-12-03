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
  card: {
    padding: 20,
    borderRadius: 12,
    marginTop: 40,
    height: 250,
    justifyContent: "center",
  },
  arrow: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
  },
  method: {
    fontSize: 15,
    fontWeight: 400,
    opacity: 0.7,
    color: "#f0f7ff",
  },
  value: {
    fontSize: 25,
    fontWeight: 600,
    color: "#f0f7ff",
  },
  name: { fontSize: 25, fontWeight: 500, color: "#f0f7ff" },
  bank: { fontSize: 15, fontWeight: 400, opacity: 0.7, color: "#f0f7ff" },
});
