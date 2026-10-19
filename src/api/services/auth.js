import { apiGet, apiPost } from "@/api/client";

/** `method`: "simple" | "phone" | "ipin" — the identity verification used on the login page. */
export const login = (method, opts) => apiPost("/auth/login", { method }, opts);

export const logout = (opts) => apiPost("/auth/logout", undefined, opts);

export const fetchAuthUser = (opts) => apiGet("/auth/me", null, opts);

export const extendSession = (opts) => apiPost("/auth/extend", undefined, opts);
