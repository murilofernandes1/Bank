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
    color: "#0d1b2a",
    opacity: 0.7,
    marginTop: 6,
    marginBottom: 30,
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 10,
  },

  horizontalList: {
    paddingVertical: 16,
    paddingRight: 16,
  },

  piggyCard: {
    width: 160,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    marginRight: 12,
    elevation: 2,
  },

  createCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },

  piggyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  piggyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
  },

  piggyValue: {
    fontSize: 13,
    color: "#0f172a",
    marginTop: 6,
  },

  piggySubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f0f7ff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 24,
    alignItems: "center",
  },

  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
    marginBottom: 18,
  },

  modalCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 6,
    textAlign: "center",
  },

  modalValueMain: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 4,
  },

  modalSubValue: {
    fontSize: 14,
    color: "#415a77",
    marginBottom: 20,
  },

  progressContainer: {
    width: "100%",
    marginBottom: 28,
  },

  progressBackground: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(13,27,42,0.15)",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: 6,
    borderRadius: 6,
  },

  progressText: {
    marginTop: 8,
    fontSize: 12,
    color: "#415a77",
    textAlign: "right",
  },

  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0d1b2a",
    marginBottom: 16,
  },

  modalTitle2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0d1b2a",
    marginBottom: 20,
  },
});
