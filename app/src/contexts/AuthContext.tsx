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
  currentLimit: number;
}
export interface InvoiceProps {
  amount: number;
  referenceDate: Date;
  id: string;
  totalAmount: number;
  paidAmount: number;
  invoiceAmount: number;
  isPaid: number;
  invoiceDueDate: Date;
}

export interface PixKeysProps {
  id: string;
  key: string;
  type: string;
}

interface AuthContextProps {
  token: string | null;
  user: UserProps | null;
  card?: CreditCardProps | null;
  invoice?: InvoiceProps | null;
  loading: boolean;
  alreadyLogged: boolean;
  authenticated: boolean;
  booting: boolean;
  setAuthenticated: (boolean: boolean) => void;
  Login: (token: string) => void;
  confirmPin: () => void;
  Logout: () => void;
  loadUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
