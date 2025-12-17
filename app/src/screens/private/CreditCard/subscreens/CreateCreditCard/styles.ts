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
    fontSize: 16,
    fontWeight: "400",
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 5,
    marginBottom: 40,
  },
  subtitle2: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0d1b2a",
    marginTop: 20,
  },
  section: {
    fontSize: 22,
    fontWeight: "700",
  },
  serviceButton: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    marginRight: 15,
  },

  serviceCircle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  services: {
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
  },
  number: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e0f2ff",
  },
});
