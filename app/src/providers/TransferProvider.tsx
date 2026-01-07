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

  async function CheckPin(pin: string): Promise<boolean> {
    try {
      await api.post("/auth/pin", { pin });
      return true;
    } catch {
      return false;
    }
  }

  async function SendTransfer(pin: string, destId: string, value: number) {
    if (!method) return;

    const isValid = await CheckPin(pin);
    if (!isValid) throw new Error("PIN_INVALID");

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

      loadUser();
    } finally {
      setLoading(false);
    }
  }

  async function PayInvoice(pin: string, value: number) {
    const isValid = await CheckPin(pin);
    if (!isValid) throw new Error("PIN_INVALID");

    try {
      setLoading(true);
      await api.put(`/card/invoice`, { amount: value });
      loadUser();
    } finally {
      setLoading(false);
    }
  }

  return (
    <TransferContext.Provider
      value={{
        CheckPin,
        SendTransfer,
        PayInvoice,
        destinationId,
        setDestinationId,
        destinationName,
        setDestinationName,
        amount,
        setAmount,
        method,
        setMethod,
        loading,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}
