import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/700.css";
import { CaseStudyPage } from "./pages/CaseStudyPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CaseStudyPage />
  </StrictMode>
);
