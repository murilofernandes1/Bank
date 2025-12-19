import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/providers/AuthProvider";
import { TransferProvider } from "./src/providers/TransferProvider";
import Routes from "./src/navigation/Routes";

export default function App() {
  return (
    <AuthProvider>
      <TransferProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </TransferProvider>
    </AuthProvider>
  );
}
