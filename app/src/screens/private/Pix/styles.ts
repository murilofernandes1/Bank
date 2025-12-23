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
  serviceButton: {
    alignItems: "flex-start",
    textAlign: "center",
    flexDirection: "column",
    marginRight: 15,
  },
  serviceCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  services: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  serviceName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
  },
});
