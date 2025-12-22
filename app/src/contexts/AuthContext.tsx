import { createContext } from "react";

export interface UserProps {
  id: string;
  name: string;
}

interface AuthContextProps {
  token: string | null;
  user: UserProps | null;
  loading: boolean;
  alreadyLogged: boolean;
  authenticated: boolean;
  Login: (token: string) => void;
  confirmPin: () => void;
  Logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
