import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id?: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AUTH_STORAGE_KEY = "@auth_token";

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const isLoggedIn = !!token;

  async function Login(token: string) {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);

      const decoded = jwtDecode<JwtPayload>(token);

      setToken(token);
    } catch (error) {
      console.log(`Erro ao persistir estado de login`, error);
    }
  }

  async function Logout() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
  }
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (storedToken) {
          const decoded = jwtDecode<JwtPayload>(storedToken);

          setToken(storedToken);
        }
      } catch (error) {
        console.log("ERRO AO CARREGAR O TOKEN", error);
      }
    }
    loadStorageData();
  }, []);
  return (
    <AuthContext.Provider value={{ token, isLoggedIn, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}
