import { Home, Droplets, Utensils, Dumbbell, Calendar, BookHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    { icon: Home, label: "Home", id: "dashboard" },
    { icon: Droplets, label: "Water", id: "water" },
    { icon: Utensils, label: "Meals", id: "meals" },
    { icon: Dumbbell, label: "Workout", id: "workout" },
    { icon: Calendar, label: "Cycle", id: "cycle" },
    { icon: BookHeart, label: "Journal", id: "journal" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-glow z-50">
      <div className="grid grid-cols-6 p-2 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`h-16 flex flex-col items-center gap-1 hover:bg-primary-soft ${
                isActive ? "text-primary bg-primary-soft" : "text-muted-foreground"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;