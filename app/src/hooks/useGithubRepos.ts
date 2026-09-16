import { useEffect, useState } from "react";

export interface GithubRepo {
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

export function useGithubRepos(username: string) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setRepos([]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading };
}
