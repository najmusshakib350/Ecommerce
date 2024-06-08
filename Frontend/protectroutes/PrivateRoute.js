import { isAuthenticated } from "./../utils/auth";

export default function PrivateRoute() {
  const auth = isAuthenticated();

  return auth ? true : false;
}
