import { createContext } from "react";

interface AuthContextProps {
  token: string | null;
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
