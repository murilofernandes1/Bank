import { ReactNode, useEffect, useState } from "react";
import {
  AuthContext,
  CreditCardProps,
  InvoiceProps,
  UserProps,
} from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import api from "services/api";

type AuthProviderProps = {
  children: ReactNode;
};

const AUTH_STORAGE_KEY = "@auth_token";

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [card, setCard] = useState<CreditCardProps | null>(null);
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);

  const [authenticated, setAuthenticated] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  const [booting, setBooting] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);

  const loading = booting || loadingUser;

  async function Login(token: string) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    setToken(token);
    setAuthenticated(true);
    setAlreadyLogged(false);
  }

  async function Logout() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);

    setToken(null);
    setUser(null);
    setCard(null);
    setInvoice(null);

    setAuthenticated(false);
    setAlreadyLogged(false);
  }

  function confirmPin() {
    setAuthenticated(true);
  }

  async function loadUser() {
    try {
      const { data } = await api.get("/me");

      setUser(data);

      if (data.creditCard) {
        setCard(data.creditCard);
        setInvoice(data.creditCard.invoices?.[0] ?? null);
      } else {
        setCard(null);
        setInvoice(null);
      }
    } catch {
      await Logout();
    }
  }

  useEffect(() => {
    async function bootstrap() {
      const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

      if (!storedToken) {
        setBooting(false);
        return;
      }

      try {
        const decoded: any = jwtDecode(storedToken);
        const expired = Date.now() > decoded.exp * 1000;

        if (expired) {
          await Logout();
          setBooting(false);
          return;
        }

        setToken(storedToken);
        setAlreadyLogged(true);
        setAuthenticated(false);
      } catch {
        await Logout();
      }

      setBooting(false);
    }

    bootstrap();
  }, []);

  useEffect(() => {
    if (!token || !authenticated) return;

    async function fetchUser() {
      setLoadingUser(true);
      await loadUser();
      setLoadingUser(false);
    }

    fetchUser();
  }, [token, authenticated]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        card,
        invoice,
        authenticated,
        alreadyLogged,
        booting,
        loading,
        Login,
        Logout,
        confirmPin,
        loadUser,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
