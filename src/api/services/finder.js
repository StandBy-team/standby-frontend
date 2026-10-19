import { apiGet } from "@/api/client";
import { API_BASE } from "@/config";

export const fetchRegions = (opts) => apiGet("/regions", null, opts);

export const fetchTrainingCenters = ({ sido, keyword, page, size } = {}, opts) =>
  apiGet("/training-centers", { sido, keyword, page, size }, opts);

export const fetchTrainingCenter = (id, opts) => apiGet(`/training-centers/${id}`, null, opts);

export const trainingCenterPlanUrl = (id) => `${API_BASE}/training-centers/${id}/plan`;

export const fetchTroopSido = (opts) => apiGet("/troops/sido", null, opts);

export const fetchTroopSigungu = (sido, opts) => apiGet("/troops/sigungu", { sido }, opts);

export const fetchTroops = (sigungu, opts) => apiGet("/troops", { sigungu }, opts);

export const fetchTroop = (id, opts) => apiGet(`/troops/${id}`, null, opts);

export const fetchAddresses = (keyword, opts) => apiGet("/addresses", { keyword }, opts);
