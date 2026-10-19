import { apiGet, apiGetText, apiPut } from "@/api/client";

export const fetchProfile = (opts) => apiGet("/me/profile", null, opts);

export const updateProfile = (profile, opts) => apiPut("/me/profile", profile, opts);

export const fetchMyTraining = (opts) => apiGet("/me/training", null, opts);

export const fetchStandingReserve = (opts) => apiGet("/me/standing-reserve", null, opts);

export const fetchAwards = (opts) => apiGet("/me/awards", null, opts);

/** Printable HTML document for a training; `kind` is "certificate" (교육필증) or "call-up-notice" (소집통지서). */
export const fetchTrainingDocument = (trainingId, kind, opts) =>
  apiGetText(`/me/trainings/${encodeURIComponent(trainingId)}/${kind}`, null, opts);
