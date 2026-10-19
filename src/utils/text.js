/** Byte length as counted by the legacy forms: 2 bytes for non-ASCII (Korean) characters. */
export const byteLength = (text) => [...text].reduce((sum, ch) => sum + (ch.charCodeAt(0) > 0x7f ? 2 : 1), 0);

/** "010-1234-5678" -> "010****5678" */
export const maskPhone = (phone) => (phone ? phone.replace(/^(\d{2,3})-?\d{3,4}-?(\d{4})$/, "$1****$2") : "");

const splitDigits = (digits, sizes) => {
  const parts = [];
  let rest = digits;
  for (const size of sizes) {
    if (!rest) break;
    parts.push(rest.slice(0, size));
    rest = rest.slice(size);
  }
  return parts.join("-");
};

/** Hyphenates Korean phone numbers while typing: 010-1234-5678, 02-123-4567, 031-123-4567, 1588-1234. */
export const formatPhone = (value) => {
  const digits = (value || "").replace(/\D/g, "").slice(0, 11);
  if (digits.startsWith("02")) return splitDigits(digits.slice(0, 10), digits.length > 9 ? [2, 4, 4] : [2, 3, 4]);
  if (/^1[5-9]/.test(digits) && digits.length <= 8) return splitDigits(digits, [4, 4]);
  return splitDigits(digits, digits.length > 10 ? [3, 4, 4] : [3, 3, 4]);
};
