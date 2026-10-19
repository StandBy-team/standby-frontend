import { apiGet } from "@/api/client";

export const fetchMain = (opts) => apiGet("/main", null, opts);

export const fetchPopups = (opts) => apiGet("/popups", null, opts);
