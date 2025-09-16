import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import MobileMenu from "./MobileMenu";
import SidebarNav from "./SidebarNav";

const Navigation = ({ setActiveTab, activeTab }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  if (isMobile) {
    return <MobileMenu setActiveTab={setActiveTab} />;
  }
  if (isTablet) {
    return <MobileMenu setActiveTab={setActiveTab} />;
  }
  return <SidebarNav setActiveTab={setActiveTab} activeTab={activeTab} />;
};

export default Navigation;