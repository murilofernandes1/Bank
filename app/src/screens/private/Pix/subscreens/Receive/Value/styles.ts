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

  header: {
    fontSize: 28,
    fontWeight: "600",
    color: "#0d1b2a",
    marginBottom: 40,
  },

  valueInput: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 8,
  },
  error: {
    color: "red",
    fontSize: 15,
    alignSelf: "center",
  },
});
