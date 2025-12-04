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
  header: {
    fontSize: 28,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    opacity: 0.8,
  },
  serviceButton: {
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    marginRight: 15,
  },
  serviceCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  services: {
    width: "100%",
    marginTop: 50,
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
