import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modal: {
    width: "100%",
    height: height * 0.5,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#f0f7ff",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#e0f2ff",
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 36,
    lineHeight: 22,
  },

  loadingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  loadingCenter: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "#e0f2ff",
    position: "absolute",
  },

  loadingOrbit: {
    width: 90,
    height: 90,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
  },

  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: "#415a77",
  },

  loadingText: {
    marginTop: 90,
    fontSize: 16,
    color: "#e0f2ff",
    opacity: 0.85,
  },
});
