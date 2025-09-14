import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";
import WaterTracker from "@/components/WaterTracker";
import MealTracker from "@/components/MealTracker";
import WorkoutTracker from "@/components/WorkoutTracker";
import PeriodTracker from "@/components/PeriodTracker";
import Journal from "@/components/Journal";
import Logout from "@/components/auth/Logout";
import Login from "@/components/auth/Login";
import supabase from "@/api/supabaseClient";
import { useEffect } from "react";
import SignUp from "./components/auth/Signup";
import Profile from "./components/Profile";


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

   const handleTabChange = (tab) => {
    // If user is not logged in, only allow login and signup
    if (!isLoggedIn && tab !== "login" && tab !== "signup") {
      return;
    }
    
    // If user is logged in and tries to access auth pages, redirect to dashboard
    if (isLoggedIn && (tab === "login" || tab === "signup")) {
      setActiveTab("dashboard");
      return;
    }
    
    setActiveTab(tab);
  };

  const renderActiveTab = () => {

     // If not logged in, only show auth pages
    if (!isLoggedIn) {
      switch (activeTab) {
        case "signup":
          return <SignUp setActiveTab={handleTabChange} />;
        default:
          return <Login setActiveTab={handleTabChange} />;
      }
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
      case "period":
        return <PeriodTracker />;
      case "journal":
        return <Journal />;
      case "profile":
        return <Profile />;
      case "logout":
        return <Logout setActiveTab={setActiveTab} />;
      case "signup":
        return <SignUp setActiveTab={setActiveTab} />;
      default:
        return <Login setActiveTab={setActiveTab} />;
    }

  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-background">
          {renderActiveTab()}
          {isLoggedIn && (
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
