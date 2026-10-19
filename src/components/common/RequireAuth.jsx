import { Navigate, Outlet, useLocation } from "react-router-dom";
import ROUTES from "@/constants/routes";
import useAuth from "@/hooks/useAuth";

/** Route guard: sends anonymous visitors to the login page and back here after login. */
export default function RequireAuth() {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) return null;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  return <Outlet />;
}
