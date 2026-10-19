import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/hooks/useAuth";
import { extendSession, fetchAuthUser, login as loginRequest, logout as logoutRequest } from "@/api/services/auth";
import { TRAINING_INFO_POPUP_KEY } from "@/constants/storage";
import { logger } from "@/utils/logger";
import { removeSessionItem } from "@/utils/storage";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchAuthUser({ signal: controller.signal })
      .then(setUser)
      .catch((error) => {
        if (error.name === "AbortError") return;
        setUser(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setReady(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!user) return undefined;
    const timer = setTimeout(() => {
      setUser(null);
      window.alert("로그인 세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.");
    }, Math.max(0, user.expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [user]);

  const login = useCallback(async (method) => {
    const next = await loginRequest(method);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (error) {
      logger.error("logout failed", error);
    }
    removeSessionItem(TRAINING_INFO_POPUP_KEY);
    setUser(null);
  }, []);

  const extend = useCallback(async () => {
    try {
      setUser(await extendSession());
    } catch (error) {
      setUser(null);
      window.alert(error.message);
    }
  }, []);

  const value = useMemo(() => ({ user, ready, login, logout, extend }), [user, ready, login, logout, extend]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
