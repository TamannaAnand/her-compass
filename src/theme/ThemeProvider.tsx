
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { mobileTheme, desktopTheme, ThemeContext } from "./ThemeContext";

export type ThemeType = "mobile" | "desktop";


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState(isMobile ? mobileTheme : desktopTheme);

  useEffect(() => {
    setTheme(isMobile ? mobileTheme : desktopTheme);
  }, [isMobile]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
