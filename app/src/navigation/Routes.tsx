import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";
import WelcomeBack from "screens/public/WelcomeBack";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "components/LoadingScreen";

export default function Routes() {
  const { token, user, alreadyLogged, authenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!token) {
    return <PublicNavigator />;
  }

  if (alreadyLogged && !authenticated) {
    return <WelcomeBack />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  return <PrivateNavigator />;
}
