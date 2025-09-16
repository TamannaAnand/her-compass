
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { mobileTheme, desktopTheme, tabletTheme, ThemeContext } from "./ThemeContext";

export type ThemeType = "mobile" | "desktop" | "tablet";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [theme, setTheme] = useState(isMobile ? mobileTheme : desktopTheme);

  useEffect(() => {
    setTheme(isMobile ? mobileTheme : isTablet ? tabletTheme : desktopTheme);
  }, [isMobile, isTablet]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
