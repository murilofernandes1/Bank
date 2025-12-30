import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  messageWrapper: {
    alignItems: "center",
    gap: 12,
  },

  message: {
    fontSize: 22,
    fontWeight: "600",
    color: "#e0f2ff",
    textAlign: "center",
  },
});
