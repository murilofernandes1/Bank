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

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [card, setCard] = useState<CreditCardProps | null>(null);
  const [invoice, setInvoice] = useState<InvoiceProps | null>(null);
  const [loading, setLoading] = useState(true);

  const AUTH_STORAGE_KEY = "@auth_token";

  async function Login(token: string) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    setToken(token);
    setAlreadyLogged(true);
    setAuthenticated(true);
  }

  function confirmPin() {
    setAuthenticated(true);
  }

  async function Logout() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
    setAlreadyLogged(false);
    setAuthenticated(false);
  }

  async function checkStoredToken() {
    const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const targetTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > targetTime) {
          console.log("Token expirado estaticamente");
          await Logout();
        } else {
          setToken(storedToken);
          setAlreadyLogged(true);
        }
      } catch (error) {
        await Logout();
      }
    }

    setLoading(false);
  }
  async function loadUser() {
    try {
      const { data } = await api.get("/me");
      setUser(data);
      if (data.creditCard) {
        setCard(data.creditCard);
        if (data.creditCard.invoices?.length > 0) {
          setInvoice(data.creditCard.invoices[0]);
        }
      }
    } catch (error) {
      console.log("Não foi possivel carregar o usuário", error);
    }
  }
  useEffect(() => {
    async function init() {
      await checkStoredToken();
      await loadUser();

      setLoading(false);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loadUser,
        token,
        alreadyLogged,
        authenticated,
        setAuthenticated,
        loading,
        Login,
        Logout,
        confirmPin,
        user,
        card,
        invoice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
