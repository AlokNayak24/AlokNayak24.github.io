import { useEffect, useState } from "react";

export interface HNStory {
  id: number;
  title: string;
  url?: string;
}

export function useHackerNews(count = 5) {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) => res.json())
      .then((ids: number[]) => {
        const top = ids.slice(0, count);
        return Promise.all(
          top.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json()))
        );
      })
      .then((items) => {
        if (cancelled) return;
        setStories(items.filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setStories([]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  return { stories, loading };
}
