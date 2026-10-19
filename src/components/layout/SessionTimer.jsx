import { useEffect, useState } from "react";

const format = (ms) => {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
};

/** mm:ss left until the login session expires. */
export default function SessionTimer({ expiresAt }) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p id="timer" className="tac" aria-label="로그인 남은 시간">
      {format(expiresAt - now)}
    </p>
  );
}
