import { API_BASE } from "@/config";
// Swap `_fetch` for the global `fetch` once the backend is available.
import { _fetch as request } from "./_fetch";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const buildUrl = (path, params) => {
  const query = new URLSearchParams(
    Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ).toString();
  return `${API_BASE}${path}${query ? `?${query}` : ""}`;
};

async function send(method, path, { params, body, signal, as = "json" } = {}) {
  const isForm = body instanceof FormData;
  const response = await request(buildUrl(path, params), {
    method,
    headers: {
      Accept: as === "text" ? "text/html" : "application/json",
      ...(body !== undefined && !isForm && { "Content-Type": "application/json" }),
    },
    body: body === undefined || isForm ? body : JSON.stringify(body),
    credentials: "include",
    signal,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(response.status, data.message || response.statusText);
  }
  return as === "text" ? response.text() : response.json();
}

export const apiGet = (path, params, { signal } = {}) => send("GET", path, { params, signal });

/** GET for endpoints that answer with a document (HTML) instead of JSON. */
export const apiGetText = (path, params, { signal } = {}) => send("GET", path, { params, signal, as: "text" });

/** `body` is sent as JSON, or as multipart when it is a FormData. */
export const apiPost = (path, body, { signal } = {}) => send("POST", path, { body, signal });

export const apiPut = (path, body, { signal } = {}) => send("PUT", path, { body, signal });

export const apiDelete = (path, { signal } = {}) => send("DELETE", path, { signal });
