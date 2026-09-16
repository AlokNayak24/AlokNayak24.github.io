import { useEffect, useState } from "react";

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

interface WeatherState {
  temp: string;
  description: string;
  loading: boolean;
  error: boolean;
}

// Hardcoded Ahmedabad coordinates — matches the identity.location on siteData.
const LAT = 23.0225;
const LON = 72.5714;

export function useWeather() {
  const [state, setState] = useState<WeatherState>({ temp: "—", description: "Loading…", loading: true, error: false });

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const code = data?.current_weather?.weathercode;
        const temp = data?.current_weather?.temperature;
        setState({
          temp: typeof temp === "number" ? `${Math.round(temp)}°C` : "—",
          description: WMO_DESCRIPTIONS[code] ?? "Ahmedabad",
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ temp: "—", description: "Weather unavailable", loading: false, error: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
