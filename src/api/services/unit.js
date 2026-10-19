import { apiDelete, apiGet, apiPost, apiPut } from "@/api/client";
import { API_BASE } from "@/config";

/** `board`: "notices" | "training-notices" */
export const fetchUnitPosts = (board, { page, size, searchCnd, searchWrd } = {}, opts) =>
  apiGet(`/me/unit/${board}`, { page, size, searchCnd, searchWrd }, opts);

export const fetchUnitPost = (board, id, opts) => apiGet(`/me/unit/${board}/${id}`, null, opts);

/** `status`: "answered" | "pending" | "followUp" */
export const fetchQuestions = ({ page, size, from, to, searchType, searchWrd, status } = {}, opts) =>
  apiGet("/me/unit/qna", { page, size, from, to, searchType, searchWrd, status }, opts);

export const fetchQuestion = (id, opts) => apiGet(`/me/unit/qna/${id}`, null, opts);

export const createQuestion = (question, opts) => apiPost("/me/unit/qna", question, opts);

/** Editable fields of the writer's own question: { title, body (plain text), email, public }. */
export const fetchQuestionForEdit = (id, opts) => apiGet(`/me/unit/qna/${id}/edit`, null, opts);

export const updateQuestion = (id, question, opts) => apiPut(`/me/unit/qna/${id}`, question, opts);

export const deleteQuestion = (id, opts) => apiDelete(`/me/unit/qna/${id}`, opts);

/** Resolves to the updated question; `parentId` makes it a reply to that top-level comment. */
export const addQuestionComment = (id, { body, parentId }, opts) =>
  apiPost(`/me/unit/qna/${id}/comments`, { body, parentId }, opts);

export const fetchFreePosts = ({ page, size, visibility, searchType, searchWrd } = {}, opts) =>
  apiGet("/me/unit/free-board", { page, size, public: visibility, searchType, searchWrd }, opts);

export const fetchFreePost = (id, opts) => apiGet(`/me/unit/free-board/${id}`, null, opts);

export const createFreePost = (post, opts) => apiPost("/me/unit/free-board", post, opts);

export const unitFileUrl = (board, id, fileSn) => `${API_BASE}/me/unit/${board}/${id}/files/${fileSn}`;
