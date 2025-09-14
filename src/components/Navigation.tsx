import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "./MobileMenu";
import SidebarNav from "./SidebarNav";

const Navigation = ({ setActiveTab, activeTab }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <MobileMenu setActiveTab={setActiveTab} />;
  }
  return <SidebarNav setActiveTab={setActiveTab} activeTab={activeTab} />;
};

export default Navigation;