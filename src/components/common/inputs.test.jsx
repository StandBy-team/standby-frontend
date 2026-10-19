import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import DateInput from "./DateInput";
import PhoneField from "./PhoneField";
import { formatPhone } from "@/utils/text";

describe("formatPhone", () => {
  it.each([
    ["01012345678", "010-1234-5678"],
    ["0101234", "010-123-4"],
    ["0212345678", "02-1234-5678"],
    ["021234567", "02-123-4567"],
    ["0311234567", "031-123-4567"],
    ["15881234", "1588-1234"],
    ["010-1234-56789", "010-1234-5678"],
    ["abc", ""],
  ])("%s -> %s", (input, expected) => {
    expect(formatPhone(input)).toBe(expected);
  });
});

function ControlledPhone() {
  const [value, setValue] = useState("");
  return <PhoneField id="p" value={value} onChange={setValue} />;
}

describe("PhoneField", () => {
  it("hyphenates as the user types", () => {
    render(<ControlledPhone />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "01098765432" } });
    expect(input).toHaveValue("010-9876-5432");
    expect(input).toHaveAttribute("autocomplete", "tel");
  });
});

describe("DateInput", () => {
  it.each(["2026-10-18", "20261018"])("accepts typed %s", (typed) => {
    const onChange = vi.fn();
    render(<DateInput id="d" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: typed } });
    expect(onChange).toHaveBeenCalledWith("2026-10-18");
  });

  it("ignores impossible dates", () => {
    const onChange = vi.fn();
    render(<DateInput id="d" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "2026-13-40" } });
    expect(onChange).not.toHaveBeenCalledWith(expect.stringMatching(/^2026/));
  });
});
