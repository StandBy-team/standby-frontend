import { apiDelete, apiGet, apiPost } from "@/api/client";

export const fetchApplicableTrainings = (opts) => apiGet("/me/applicable-trainings", null, opts);

export const fetchPlanCenters = ({ type, sido }, opts) => apiGet("/training-plans/centers", { type, sido }, opts);

export const fetchTrainingPlans = ({ type, center, from, to }, opts) =>
  apiGet("/training-plans", { type, center, from, to }, opts);

export const fetchTrainingApplications = ({ page, size } = {}, opts) =>
  apiGet("/me/training-applications", { page, size }, opts);

export const fetchTrainingApplication = (id, opts) => apiGet(`/me/training-applications/${id}`, null, opts);

export const createTrainingApplication = (application, opts) => apiPost("/me/training-applications", application, opts);

export const deleteTrainingApplication = (id, opts) => apiDelete(`/me/training-applications/${id}`, opts);

export const fetchDelayOptions = (opts) => apiGet("/me/delay-options", null, opts);

export const fetchDelayApplications = ({ page, size } = {}, opts) =>
  apiGet("/me/delay-applications", { page, size }, opts);

export const fetchDelayApplication = (id, opts) => apiGet(`/me/delay-applications/${id}`, null, opts);

/** Sent as multipart so the evidence files go with the form fields. */
export const createDelayApplication = ({ trainingId, start, end, reasonCode, files }, opts) => {
  const form = new FormData();
  form.append("trainingId", trainingId);
  form.append("start", start);
  form.append("end", end);
  form.append("reasonCode", reasonCode);
  files.forEach((file) => form.append("files", file));
  return apiPost("/me/delay-applications", form, opts);
};

export const fetchHoldApplications = ({ page, size } = {}, opts) =>
  apiGet("/me/hold-applications", { page, size }, opts);

export const fetchHoldApplication = (id, opts) => apiGet(`/me/hold-applications/${id}`, null, opts);
