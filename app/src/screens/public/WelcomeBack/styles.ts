import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  logoWrapper: {
    width: "100%",
    alignItems: "center",
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0d1b2a",
  },

  bigTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#f0f7ff",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#e0f2ff",
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 50,
    lineHeight: 22,
  },

  buttons: {
    width: "100%",
    gap: 18,
    alignItems: "center",
  },

  primaryButton: {
    padding: 18,
    borderRadius: 16,
    marginTop: 25,
  },

  primaryButtonText: {
    textAlign: "center",
    color: "#0d1b2a",
    fontSize: 18,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 2,
    borderColor: "#e0f2ff",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "transparent",
    color: "#e0f2ff",
    fontSize: 25,
  },

  secondaryButtonText: {
    textAlign: "center",
    color: "#e0f2ff",
    fontSize: 18,
    fontWeight: "700",
  },
  exit: {
    bottom: 60,

    borderRadius: 50,
    alignSelf: "flex-end",
  },
});
