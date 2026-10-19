import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toDateValue } from "@/utils/date";

const WEEKDAYS = { Su: "일", Mo: "월", Tu: "화", We: "수", Th: "목", Fr: "금", Sa: "토" };

const toDate = (value) => (value ? new Date(`${value}T00:00:00`) : null);

const toValue = (date) => (date ? toDateValue(date) : "");

function Header({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) {
  return (
    <div className="datepicker-head">
      <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} aria-label="이전 달">
        &lt;
      </button>
      <strong>
        {date.getFullYear()}년 {date.getMonth() + 1}월
      </strong>
      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled} aria-label="다음 달">
        &gt;
      </button>
    </div>
  );
}

/** Date field holding "YYYY-MM-DD" strings; accepts typed "YYYY-MM-DD" or "YYYYMMDD", or a pick from the calendar. */
export default function DateInput({ id, value, onChange, min, max, title, className = "date" }) {
  return (
    <DatePicker
      id={id}
      className={className}
      title={title}
      selected={toDate(value)}
      onChange={(date) => onChange(toValue(date))}
      minDate={toDate(min)}
      maxDate={toDate(max)}
      dateFormat={["yyyy-MM-dd", "yyyyMMdd"]}
      strictParsing
      placeholderText="YYYY-MM-DD"
      formatWeekDay={(name) => WEEKDAYS[name.slice(0, 2)] ?? name}
      renderCustomHeader={Header}
      autoComplete="off"
      inputMode="numeric"
    />
  );
}
