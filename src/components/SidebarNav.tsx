import React from "react";
import { Button } from "@/components/ui/button";
import { User, Home, Calendar, Utensils, Droplets, Dumbbell, BookHeart } from "lucide-react";

const navItems = [
  { label: "Dashboard", tab: "dashboard", icon: Home },
  { label: "Period", tab: "period", icon: Calendar },
  { label: "Meals", tab: "meals", icon: Utensils },
  { label: "Water", tab: "water", icon: Droplets },
  { label: "Workout", tab: "workout", icon: Dumbbell },
  { label: "Journal", tab: "journal", icon: BookHeart },
  { label: "Profile", tab: "profile", icon: User },
];

export default function SidebarNav({ setActiveTab, activeTab }) {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-sidebar-border bg-sidebar-accent shadow-xl flex flex-col gap-2 p-6 z-40">
      <div className="mb-8 text-2xl font-bold text-primary">Her Compass</div>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.tab}
            variant={activeTab === item.tab ? "default" : "ghost"}
            className="flex items-center gap-3 justify-start w-full py-3 text-lg"
            onClick={() => setActiveTab(item.tab)}
            aria-label={item.label}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Button>
        );
      })}
    </aside>
  );
}
