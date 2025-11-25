import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <section className="max-w-1/4 h-dvh grid place-items-center mx-auto">
      <App />
    </section>
    <Toaster />
  </StrictMode>
);
