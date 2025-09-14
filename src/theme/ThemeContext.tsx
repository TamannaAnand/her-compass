import { createContext } from "react";
import * as theme from "./theme";

export type ThemeType = "mobile" | "desktop";

const mobileTheme = {
  ...theme,
  mainContainer: `min-h-screen p-2 pb-16 flex flex-col bg-gradient-app`,
  innerContainer: "max-w-full mx-auto px-2",
  sectionHeader: "text-2xl font-bold text-foreground mb-2",
  cardContentBase: "p-2",
  dashboardLayout: "flex flex-col gap-4", // vertical stack for mobile
  dashboardCard: "w-full bg-card shadow-glow p-2 mb-2 rounded-lg", // mobile card style
};

const desktopTheme = {
  ...theme,
  mainContainer: `from-primary/10 to-background p-8 flex flex-row bg-gradient-app`,
  innerContainer: "max-w-6xl mx-auto w-full flex flex-row gap-8 justify-center",
  sectionHeader: "text-4xl font-extrabold text-foreground mb-6",
  cardContentBase: "p-6",
  dashboardLayout: "grid grid-cols-3 gap-8 mx-auto", // modular grid for desktop
  dashboardCard: "bg-card shadow-glow rounded-xl p-6 flex flex-col min-h-[200px]", // desktop card style
};

export const ThemeContext = createContext(desktopTheme);
export { mobileTheme, desktopTheme };