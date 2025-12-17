import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    marginBottom: 20,
    color: "#e0f2ff",
    borderWidth: 1,
    borderColor: "rgba(224,242,255,0.2)",
  },

  button: {
    width: "100%",
    backgroundColor: "#e0f2ff",
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#0d1b2a",
    fontSize: 18,
    fontWeight: "700",
  },

  forgot: {
    marginTop: 20,
    color: "#e0f2ff",
    opacity: 0.6,
    textAlign: "center",
    fontSize: 14,
  },
  error: {
    color: "red",
    fontSize: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
});
