import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const BASE_DEFAULTS = { page: "1", searchCnd: "0", searchWrd: "", sort: "", order: "" };

/**
 * Keeps list state (page, search condition, sort) in the URL query string,
 * so that reloading or returning from a detail page restores the same list.
 * `filters` declares extra string criteria with their defaults, e.g. { from: "", answered: "" }.
 */
export function useListNavigation(filters) {
  const [params, setParams] = useSearchParams();
  const filterKey = JSON.stringify(filters ?? {});
  const DEFAULTS = useMemo(() => ({ ...BASE_DEFAULTS, ...JSON.parse(filterKey) }), [filterKey]);

  const query = useMemo(
    () => ({
      ...Object.fromEntries(Object.keys(DEFAULTS).map((key) => [key, params.get(key) || DEFAULTS[key]])),
      page: Number(params.get("page")) || 1,
    }),
    [params, DEFAULTS]
  );

  const update = useCallback(
    (patch) => {
      const next = { ...query, ...patch };
      const search = new URLSearchParams();
      Object.entries(next).forEach(([key, value]) => {
        if (value !== undefined && String(value) !== DEFAULTS[key]) search.set(key, String(value));
      });
      setParams(search);
    },
    [query, setParams, DEFAULTS]
  );

  const setPage = useCallback((page) => update({ page }), [update]);

  /** Applies new search criteria (any of the query keys) and goes back to the first page. */
  const search = useCallback((criteria) => update({ ...criteria, page: 1 }), [update]);

  const toggleSort = useCallback(
    (field) => {
      const order = query.sort === field && query.order === "asc" ? "desc" : "asc";
      update({ sort: field, order, page: 1 });
    },
    [query, update]
  );

  return { query, setPage, search, toggleSort };
}

export default useListNavigation;
