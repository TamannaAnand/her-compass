import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/theme/useTheme";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const Profile = () => {
  const theme = useTheme();
  // Placeholder user info
  const user = {
    name: "Jane Doe",
    email: "jane.doe@email.com",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff",
  };

  return (
    <div className={`${theme.mainContainer}`}>
      <div className={theme.innerContainer}>
        <Card className={`${theme.cardBase} ${theme.cardAccent}`}>
          <CardContent
            className={
              theme.cardContentBase + " flex flex-col items-center gap-4"
            }
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="rounded-full w-24 h-24 shadow-md mb-2"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {user.name}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>
              {/* Recent Workouts */}
      <div className="space-y-4 flex-1">
        <h3 className="text-lg font-semibold text-foreground">
          Update info
        </h3>
        <div className="space-y-2">

            <Card  className="bg-card shadow-glow">
              <CardHeader>
                <CardTitle className="text-lg"></CardTitle>
              </CardHeader>
              <CardContent className={theme.cardContentBase}>
                <p className="text-muted-foreground"></p>
              </CardContent>
            </Card>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Profile;
