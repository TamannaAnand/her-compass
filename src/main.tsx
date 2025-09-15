import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import React from "react";
import { Toaster } from "./components/ui/toaster.tsx";


createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <Toaster />
            <App />
        </ThemeProvider>
    </React.StrictMode>

);
