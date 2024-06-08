import { isAuthenticated, userInfo } from "./../utils/auth";

export default function AdminRoute() {
  const auth = isAuthenticated();
  // const { role } = userInfo();

  return auth ? true : false;
}
