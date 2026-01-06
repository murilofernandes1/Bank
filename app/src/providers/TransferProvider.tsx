import { ReactNode, useState } from "react";
import { TransferContext } from "../contexts/TransferContext";
import { useAuth } from "hooks/useAuth";
import api from "services/api";

type TransferProviderProps = {
  children: ReactNode;
};

export function TransferProvider({ children }: TransferProviderProps) {
  const [destinationName, setDestinationName] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [method, setMethod] = useState<"PIX" | "CARD" | null>(null);
  const [loading, setLoading] = useState(false);
  const { loadUser } = useAuth();

  async function SendTransfer(destId: string, value: number) {
    if (!method) return;
    try {
      setLoading(true);
      if (method === "PIX") {
        await api.post("/pix/send", { amount: value, destinationId: destId });
      } else {
        await api.post("/card/transfer", {
          amount: value,
          destinationId: destId,
        });
      }
      setDestinationId(null);
      setDestinationName(null);
      setAmount(null);
      setMethod(null);
      await loadUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function PayInvoice(value: number) {
    try {
      setLoading(true);
      await api.post(`/card/invoice`, { amount: value });
      await loadUser();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TransferContext.Provider
      value={{
        PayInvoice,
        destinationId,
        setDestinationId,
        destinationName,
        setDestinationName,
        amount,
        setAmount,
        method,
        setMethod,
        SendTransfer,
        loading,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}
