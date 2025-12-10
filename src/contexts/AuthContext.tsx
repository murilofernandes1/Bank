import { createContext } from "react";

interface AuthContextProps {
  token: string | null;
  isLoggedIn: boolean;
  Login: (token: string) => void;
  Logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
