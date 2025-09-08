import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Plus, Minus, Hand } from "lucide-react";

const Logout = ({setActiveTab}) => {
    const HandleLogout = () => {
        setActiveTab("login");
    }

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Logout</h1>
        </div>

        {/* Water Counter */}
        <Card className="mb-8 bg-gradient-accent border-0 shadow-glow">
          <CardContent className="p-8 text-center">
            Please select the Logout Button to Confirm
            <Button
              size="lg"
              className="mt-6 bg-primary hover:bg-primary/90 shadow-soft"
              onClick={HandleLogout}
            >
              Confirm Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logout;