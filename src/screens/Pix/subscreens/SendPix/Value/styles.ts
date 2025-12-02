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
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f1ff",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 70,
    marginBottom: 50,
    shadowColor: "#003366",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "600",
    marginRight: 10,
    color: "#003366",
  },
  valueInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "600",
    color: "#003366",
  },
  send: {
    marginTop: 20,
  },
});
