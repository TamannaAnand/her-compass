import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "@/components/Dashboard";
import BottomNavigation from "@/components/BottomNavigation";
import WaterTracker from "@/components/WaterTracker";
import MealTracker from "@/components/MealTracker";
import WorkoutTracker from "@/components/WorkoutTracker";
import CycleTracker from "@/components/CycleTracker";
import Journal from "@/components/Journal";
import Logout from "@/components/auth/Logout";
import Login from "@/components/auth/Login";
import supabase, { userId } from "@/lib/supabaseClient";
import { useEffect } from "react";


const queryClient = new QueryClient();


const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data?.user);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const renderActiveTab = () => {
        if (!isLoggedIn) {
      return <Login setActiveTab={setActiveTab} />;
    }
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "water":
        return <WaterTracker />;
      case "meals":
        return <MealTracker />;
      case "workout":
        return <WorkoutTracker />;
      case "cycle":
        return <CycleTracker />;
      case "journal":
        return <Journal />;
      case "logout":
        return <Logout setActiveTab={setActiveTab} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {renderActiveTab()}
          {isLoggedIn && (
            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </div>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
