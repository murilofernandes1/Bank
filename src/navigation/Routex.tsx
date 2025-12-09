import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";

export default function Routes() {
  let userAuthenticated = false;
  return <>{userAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}</>;
}
