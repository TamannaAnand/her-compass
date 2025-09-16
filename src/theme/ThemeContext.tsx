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
  dashboardInnerContainer: "max-w-full mx-auto px-2", // mobile layout for dashboard inner container
};

const desktopTheme = {
  ...theme,
  mainContainer: `from-primary/10 to-background p-8 flex flex-row bg-gradient-app`,
  innerContainer: "max-w-6xl mx-auto w-full flex flex-row gap-8 justify-center",
  sectionHeader: "text-4xl font-extrabold text-foreground mb-6",
  cardContentBase: "p-6",
  dashboardLayout: "grid grid-cols-2 gap-8 mx-auto", // modular grid for desktop
  dashboardCard: "bg-card shadow-glow rounded-xl p-6 flex flex-col min-h-[200px]", // desktop card style
  dashboardInnerContainer: "max-w-6xl mx-auto w-full flex flex-row gap-8 justify-center"
};

const tabletTheme = {
  ...theme,
  mainContainer: `min-h-screen p-4 pb-16 flex flex-col bg-gradient-app mx-auto align-middle`,
  innerContainer: "max-w-full mx-auto px-4",
  sectionHeader: "text-3xl font-bold text-foreground mb-4",
  cardContentBase: "p-6",
  dashboardLayout: "grid grid-cols-2 gap-8 mx-auto", // modular grid for desktop
  dashboardCard: "bg-card shadow-glow rounded-xl p-6 flex flex-col min-h-[200px]", // desktop card style
  dashboardInnerContainer: "max-w-6xl mx-auto w-full flex flex-col gap-8 "
}

export const ThemeContext = createContext(desktopTheme);
export { mobileTheme, desktopTheme, tabletTheme };