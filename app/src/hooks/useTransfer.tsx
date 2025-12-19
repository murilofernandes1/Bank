import { useContext } from "react";
import { TransferContext } from "../contexts/TransferContext";

export function useTransfer() {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error("useTransfer deve ser usado dentro de um authProvider");
  }
  return context;
}
