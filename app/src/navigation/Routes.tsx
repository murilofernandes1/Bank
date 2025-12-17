import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";
import WelcomeBack from "screens/public/WelcomeBack";
import { useAuth } from "../hooks/useAuth";

export default function Routes() {
  const { token, alreadyLogged, authenticated } = useAuth();

  if (!token) {
    return <PublicNavigator />;
  }

  if (alreadyLogged && !authenticated) {
    return <WelcomeBack />;
  }

  return <PrivateNavigator />;
}
