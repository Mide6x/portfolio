const INITIAL_DATA_KEY = "__INITIAL_DATA__";

export const getInitialData = () => {
  if (typeof window === "undefined") return null;
  return window[INITIAL_DATA_KEY] ?? null;
};

export const clearInitialData = () => {
  if (typeof window === "undefined") return;
  delete window[INITIAL_DATA_KEY];
};

export { INITIAL_DATA_KEY };
