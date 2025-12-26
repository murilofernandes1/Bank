import { ReactNode, useEffect, useState } from "react";
import { AuthContext, UserProps } from "../contexts/AuthContext";
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
      const loadUser = await api.get("/me");
      setUser(loadUser.data);
    } catch (error) {
      console.log("Não foi possivel carregar o usuário", error);
    }
  }
  useEffect(() => {
    try {
      checkStoredToken();
      loadUser();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        alreadyLogged,
        authenticated,
        setAuthenticated,
        loading,
        Login,
        Logout,
        confirmPin,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
