import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  ready: false,
  login: async () => {},
  logout: async () => {},
  extend: async () => {},
});

/** Logged-in user ({ name, unit, expiresAt } or null) and session actions; provided by components/common/AuthProvider. */
export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
