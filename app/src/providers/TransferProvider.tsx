import { ReactNode, useState } from "react";
import { TransferContext } from "../contexts/TransferContext";
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

  async function SendTransfer(destId: string, value: number) {
    if (!method) return;

    try {
      setLoading(true);

      if (method === "PIX") {
        await api.post("/pix/send", {
          amount: value,
          destinationId: destId,
        });
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TransferContext.Provider
      value={{
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
