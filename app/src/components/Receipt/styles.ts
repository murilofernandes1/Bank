import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    inset: 0,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 20,
    gap: 14,
    overflow: "hidden",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e0f2ff",
    textAlign: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(224,242,255,0.2)",
    marginVertical: 6,
  },

  row: {
    gap: 4,
  },

  label: {
    fontSize: 12,
    color: "#a9c4dd",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  value: {
    fontSize: 16,
    color: "#f0f7ff",
    fontWeight: "500",
  },

  mono: {
    fontSize: 14,
    color: "#f0f7ff",
    fontFamily: "monospace",
  },

  buttonsContainer: {
    position: "absolute",
    top: 48,
    right: 20,
    flexDirection: "row",
    gap: 16,
    zIndex: 10,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  orbitWrapper: {
    marginTop: 24,
    alignItems: "center",
  },

  orbit: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  orbitCenter: {
    width: 40,
    height: 40,
    borderRadius: 999,
    opacity: 0.9,
  },

  orbitDot: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 999,
    left: 40,
    bottom: 40,
    opacity: 0.6,
  },
});
