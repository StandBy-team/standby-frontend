import { formatPhone } from "@/utils/text";

/** Phone number input that hyphenates as you type ("010-1234-5678"). */
export default function PhoneField({ id, value, onChange, className = "inp-box wd140", ...rest }) {
  return (
    <input
      id={id}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      maxLength={13}
      placeholder="010-0000-0000"
      className={className}
      value={value ?? ""}
      onChange={(e) => onChange(formatPhone(e.target.value))}
      {...rest}
    />
  );
}
