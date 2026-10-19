import { createContext, useContext } from "react";

export const FeedbackContext = createContext({
  toast: () => {},
  confirm: async () => false,
});

/** `toast(message, { tone: "info" | "success" | "error" })` shows a short message at the bottom of the page. */
export const useToast = () => useContext(FeedbackContext).toast;

/** `await confirm(message)` resolves to true when the user accepts the in-page dialog. */
export const useConfirm = () => useContext(FeedbackContext).confirm;
