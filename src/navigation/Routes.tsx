import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";
import { useAuth } from "../hooks/useAuth";
export default function Routes() {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <PrivateNavigator /> : <PublicNavigator />}</>;
}
