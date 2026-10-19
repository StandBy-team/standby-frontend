import { apiGet } from "@/api/client";

export const fetchSiteInfo = (opts) => apiGet("/site-info", null, opts);
