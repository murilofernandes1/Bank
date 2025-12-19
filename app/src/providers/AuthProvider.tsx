import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const AUTH_STORAGE_KEY = "@auth_token";

  async function Login(token: string) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    setToken(token);
    setAlreadyLogged(true);
    setAuthenticated(true);
    setLoading(false);
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

  useEffect(() => {
    async function checkStoredToken() {
      const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

      if (storedToken) {
        setToken(storedToken);
        setAlreadyLogged(true);
        setAuthenticated(false);
        setLoading(false);
      } else {
        setToken(null);
        setAlreadyLogged(false);
        setAuthenticated(false);
        setLoading(false);
      }
    }

    checkStoredToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        alreadyLogged,
        authenticated,
        loading,
        Login,
        Logout,
        confirmPin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
