import { Route, Routes } from "react-router";
import { Providers } from "./providers";
import { HomePage } from "@/pages/home";
import { HarnessPage } from "@/pages/harness";
import "./../app/styles/index.css";

export function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/harness" element={<HarnessPage />} />
      </Routes>
    </Providers>
  );
}
