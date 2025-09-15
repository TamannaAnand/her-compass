import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { Button } from "@/components/ui/button";
import { User, Home, Calendar, Utensils, Droplets, Dumbbell, BookHeart, LogOutIcon } from "lucide-react";

const navItems = [
  { label: "Dashboard", tab: "dashboard", icon: Home },
  { label: "Period", tab: "period", icon: Calendar },
  { label: "Meals", tab: "meals", icon: Utensils },
  { label: "Water", tab: "water", icon: Droplets },
  { label: "Workout", tab: "workout", icon: Dumbbell },
  { label: "Journal", tab: "journal", icon: BookHeart },
  { label: "Profile", tab: "profile", icon: User },
  { label: "Logout", tab: "logout", icon: LogOutIcon },
];

export default function SidebarNav({ setActiveTab, activeTab }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile || isTablet) setCollapsed(true);
    else setCollapsed(false);
  }, [isMobile, isTablet]);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar-accent shadow-xl flex flex-col gap-2 z-40 transition-[width,padding] duration-500 ${collapsed ? "w-16 p-2 border-r border-muted" : "w-64 p-6"}`}
      aria-expanded={!collapsed}
    >
      <div className={`flex ${collapsed ? "justify-center" : "justify-between"}`}>
        <span
          className={`text-2xl font-bold text-primary transition-all duration-500 origin-left ${collapsed ? "opacity-0 scale-95 w-0" : "opacity-100 scale-100 w-auto"}`}
        >
          Her Compass
        </span>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full border border-muted bg-background transition-all duration-300 shadow-none"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full border border-muted bg-background transition-all duration-300 shadow-md"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            style={{ zIndex: 10 }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
      <nav className={`flex flex-col gap-2 ${collapsed ? "items-center" : "items-stretch"}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.tab}
              variant={activeTab === item.tab ? "default" : "ghost"}
              className={`flex items-center w-full py-3 text-lg transition-all duration-500 ${collapsed ? "justify-center px-0" : "justify-start px-4"}`}
              onClick={() => setActiveTab(item.tab)}
              aria-label={item.label}
              style={{ minHeight: "48px" }}
            >
              <Icon className={`h-5 w-5 transition-all duration-500 ${collapsed ? "mx-auto" : "mr-3"}`} />
              <span
                className={`transition-all duration-500 origin-left ${collapsed ? "opacity-0 scale-95 w-0" : "opacity-100 scale-100 w-auto"}`}
                style={{ transitionProperty: "opacity,transform,width" }}
              >
                {item.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
