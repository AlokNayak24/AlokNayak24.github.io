import { useEffect, useState } from "react";

export function useLiveClock(timezone: string) {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-IN", { timeZone: timezone }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-IN", { timeZone: timezone }));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return time;
}
