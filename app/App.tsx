import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/providers/AuthProvider";
import { TransferProvider } from "./src/providers/TransferProvider";
import Routes from "./src/navigation/Routes";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

export default function App() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);

  return (
    <>
      <StatusBar hidden />
      <AuthProvider>
        <TransferProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </TransferProvider>
      </AuthProvider>
    </>
  );
}
