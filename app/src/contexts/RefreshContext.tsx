import { createContext } from "react";

export type AppRefreshContextType = {
  refreshing: boolean;
  refreshApp: () => void;
};

export const AppRefreshContext = createContext<AppRefreshContextType>(
  {} as AppRefreshContextType
);
