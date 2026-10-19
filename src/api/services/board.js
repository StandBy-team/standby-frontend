import { apiGet } from "@/api/client";

export const fetchBoard = (board, opts) => apiGet(`/boards/${board}`, null, opts);

export const fetchArticles = (board, { page, size, searchCnd, searchWrd, sort, order } = {}, opts) =>
  apiGet(`/boards/${board}/articles`, { page, size, searchCnd, searchWrd, sort, order }, opts);

export const fetchArticle = (board, nttId, opts) => apiGet(`/boards/${board}/articles/${nttId}`, null, opts);
