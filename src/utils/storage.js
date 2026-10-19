// Browser storage can be unavailable (private mode, blocked site data, no window in tests), so every access is guarded.
function getItem(storage, key) {
  try {
    const jsonStr = storage().getItem(key);
    return jsonStr ? JSON.parse(jsonStr) : null;
  } catch {
    return null;
  }
}

function setItem(storage, key, value) {
  try {
    storage().setItem(key, JSON.stringify(value === undefined ? null : value));
  } catch {
    /* ignore */
  }
}

function removeItem(storage, key) {
  try {
    storage().removeItem(key);
  } catch {
    /* ignore */
  }
}

export const getLocalItem = (key) => getItem(() => window.localStorage, key);
export const setLocalItem = (key, value) => setItem(() => window.localStorage, key, value);
export const removeLocalItem = (key) => removeItem(() => window.localStorage, key);

export const getSessionItem = (key) => getItem(() => window.sessionStorage, key);
export const setSessionItem = (key, value) => setItem(() => window.sessionStorage, key, value);
export const removeSessionItem = (key) => removeItem(() => window.sessionStorage, key);
