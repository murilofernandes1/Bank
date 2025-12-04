import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/private/Home";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/navigation/Routex";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
