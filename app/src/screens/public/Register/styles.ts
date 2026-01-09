import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    color: "#e0f2ff",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
    alignSelf: "center",
  },

  subtitle: {
    color: "#e0f2ff",
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 40,
    alignSelf: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 18,
    borderRadius: 12,
    fontSize: 16,
    color: "#e0f2ff",
    marginBottom: 20,
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  button: {
    backgroundColor: "#e0f2ff",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#0d1b2a",
    fontFamily: "Inter_700Bold",
  },

  loginText: {
    color: "#e0f2ff",
    textAlign: "center",
    marginTop: 24,
    fontSize: 15,
    opacity: 0.7,
    fontFamily: "Inter_400Regular",
  },

  error: {
    color: "red",
    fontSize: 15,
    alignSelf: "center",
    marginBottom: 10,
  },

  pin: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 25,
    width: "100%",
  },
});
