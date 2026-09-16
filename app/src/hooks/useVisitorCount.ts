import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio_visits_count";

// CountAPI.xyz (the free visitor-counter service this could otherwise use) is
// dead — DNS doesn't resolve. Local-only count, no backend.
export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const current = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10) || 0;
    const next = current + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    setCount(next);
  }, []);

  return count;
}
