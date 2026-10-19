import { apiGet } from "@/api/client";

export const fetchTrainingTypes = (opts) => apiGet("/training-types", null, opts);

export const fetchHolidayTrainings = ({ sido, month, type, keyword, onlyScheduled } = {}, opts) =>
  apiGet("/holiday-trainings", { sido, month, type, keyword, onlyScheduled: onlyScheduled ? "Y" : "" }, opts);

export const fetchOfficerPromotion = (opts) => apiGet("/officer-promotion", null, opts);
