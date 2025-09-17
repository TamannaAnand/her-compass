import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { label: "Dashboard", tab: "dashboard" },
  { label: "Period Tracker", tab: "period" },
  { label: "Meals", tab: "meals" },
  { label: "Water", tab: "water" },
  { label: "Workout", tab: "workout" },
  { label: "Journal", tab: "journal" },
  { label: "Profile", tab: "profile" },
  { label: "Logout", tab: "logout" }
];

export default function MobileMenu({ setActiveTab }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Open menu">
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-card shadow-lg rounded-lg p-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Button
              key={item.tab}
              variant="ghost"
              className="justify-start"
              onClick={() => {
                setActiveTab(item.tab);
                setOpen(false);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
