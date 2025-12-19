import { ReactNode, useEffect, useState } from "react";
import { TransferContext } from "../contexts/TransferContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "services/api";
import LoadingScreen from "components/LoadingScreen";

type TransferProviderProps = {
  children: ReactNode;
};

export function TransferProvider({ children }: TransferProviderProps) {
  const [destinationName, setDestinationName] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <LoadingScreen />;
  }

  async function SendTransfer(destinationId: string, amount: number) {
    try {
      setLoading(true);
      setAmount(amount);
      setDestinationId(destinationId);
      await api.post("/pix/send", {
        amount: amount,
        destinationId: destinationId,
      });
      setDestinationId(null);
      setAmount(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TransferContext.Provider
      value={{
        destinationId,
        setDestinationId,
        setDestinationName,
        setAmount,
        destinationName,
        amount,
        SendTransfer,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
}
