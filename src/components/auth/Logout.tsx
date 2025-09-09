import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";

const Logout = ({ setActiveTab }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Logs out the user from Supabase
    setActiveTab("login"); // Redirect to login tab
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Logout</h1>
        </div>
        <Card className="mb-8 bg-gradient-accent border-0 shadow-glow">
          <CardContent className="p-8 text-center">
            Please select the Logout Button to Confirm
            <Button
              size="lg"
              className="mt-6 bg-primary hover:bg-primary/90 shadow-soft"
              onClick={handleLogout}
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