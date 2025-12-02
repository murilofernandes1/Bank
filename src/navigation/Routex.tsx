import PrivateNavigator from "./PrivateNavigator";

export default function Routes() {
  let userAuthenticated = true;
  return <>{userAuthenticated ? <PrivateNavigator /> : <PrivateNavigator />}</>;
}
