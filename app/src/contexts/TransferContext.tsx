import { createContext } from "react";

export type TransferMethod = "PIX" | "CARD";

interface TransferContextProps {
  destinationId: string | null;
  destinationName: string | null;
  amount: number | null;
  method: TransferMethod | null;

  setDestinationId: (destinationId: string | null) => void;
  setDestinationName: (destinationName: string | null) => void;
  setAmount: (value: number | null) => void;
  setMethod: (method: TransferMethod | null) => void;

  SendTransfer: (id: string, value: number) => Promise<void>;

  PayInvoice: (amount: number) => Promise<void>;
  loading: boolean;
}

export const TransferContext = createContext<TransferContextProps | undefined>(
  undefined
);
