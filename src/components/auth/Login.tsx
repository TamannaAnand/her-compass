import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import supabase  from "@/lib/supabaseClient";

const Login = ({ setActiveTab }) => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      // Handle error (show toast, etc.)
      console.error(error.message);
    } else {
      setActiveTab("dashboard"); // Redirect to dashboard on successful login
    }
  };

  return (
    <div className="p-4 pb-20">
      <div className="max-w-md mx-auto">
         <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground">
            Login to start tracking your wellness journey
          </p>
        </div>
        <Card className="mb-8 bg-gradient-accent border-0 shadow-glow">
          <CardContent className="p-8 text-center">
            Please Login with your Google Account
            <Button
              size="lg"
              className="mt-6 bg-primary hover:bg-primary/90 shadow-soft"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;