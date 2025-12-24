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
    marginBottom: 40,
  },

  valueInput: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    fontSize: 32,
    color: "#0d1b2a",
  },
  serviceButton: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    marginRight: 15,
  },
  notSelected: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    marginRight: 15,
    opacity: 0.4,
  },
  serviceCircle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  services: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40,
  },
  serviceName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    opacity: 0.8,
  },
  methodTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0d1b2a",
    marginTop: 40,
    opacity: 0.8,
  },
  errorText: {
    marginTop: 8,
    color: "#ff6b6b",
    fontSize: 13,
    fontWeight: "500",
    alignSelf: "center",
  },
});
