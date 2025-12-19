import { createContext } from "react";

interface TransferContextProps {
  destinationId: string | null;
  destinationName: string | null;
  amount: number | null;
  setDestinationId: (destinationId: string | null) => void;
  setDestinationName: (destinationName: string | null) => void;
  setAmount: (value: number | null) => void;
  SendTransfer: (id: string, value: number) => Promise<void>;
}

export const TransferContext = createContext<TransferContextProps | undefined>(
  undefined
);
