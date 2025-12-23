import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 25,
    fontWeight: "600",
    color: "#0d1b2a",
  },
  camera: {
    flex: 1,
  },
  portrait: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
});
