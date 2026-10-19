import { apiGet } from "@/api/client";

/** `group`: "banks" | "familyRelations" | "emailDomains" | "delayReasons" | "mailOptOuts" */
export const fetchCodes = (group, opts) => apiGet(`/codes/${group}`, null, opts);
