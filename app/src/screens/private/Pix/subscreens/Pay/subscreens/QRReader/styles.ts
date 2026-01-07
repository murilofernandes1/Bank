import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: "25%",
    alignSelf: "center",
    alignItems: "center",
  },
  helperText: {
    marginTop: 16,
    fontSize: 18,
    color: "#e0f2ff",
    fontWeight: "500",
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#e0f2ff",
    fontWeight: "500",
  },
  errorText: {
    marginTop: 8,
    fontSize: 16,
    color: "#ff4d4d",
    fontWeight: "600",
    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f0f7ff",
  },
  message: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#0d1b2a",
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: "#e0f2ff",
  },
});
