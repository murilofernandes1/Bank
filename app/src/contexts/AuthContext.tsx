import { createContext } from "react";

export interface UserProps {
  id: string;
  name: string;
  balance: number;
  creditCard?: CreditCardProps;
  pixKeys?: PixKeysProps;
}

export interface CreditCardProps {
  id: string;
  creditLimit: number;
  cvv: number;
  expirationDate: Date;
  invoiceClosingDate: Date;
  invoiceDueDate: Date;
  invoiceClosingDay: number;
  invoiceDueDay: number;
  invoices: InvoiceProps[];
  number: number;
}
export interface InvoiceProps {
  referenceDate: Date;

  totalAmount: number;
  paidAmount: number;

  isPaid: number;
}

export interface PixKeysProps {
  id: string;
  key: string;
  type: string;
}

interface AuthContextProps {
  token: string | null;
  user: UserProps | null;
  loading: boolean;
  alreadyLogged: boolean;
  authenticated: boolean;
  setAuthenticated: (boolean: boolean) => void;
  Login: (token: string) => void;
  confirmPin: () => void;
  Logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
