import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/theme/useTheme";
import { getUserData } from "@/api/userAPI";

import { useEffect, useState } from "react";
import { set } from "date-fns";

const Profile = () => {
  const theme = useTheme();
  // Placeholder user info
  const [user, setUser] = (useState as any)({
    name: "User",
    email: "",
    avatarUrl:
      "Add a valid avatar URL",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      console.log("Fetched User Data:", userData);
      if (userData) {
        setUser({
          name: userData.user_metadata.full_name || "User",
          email: userData.email || "",
          avatarUrl:
            userData.user_metadata.avatar_url ||
            "Add a valid avatar URL",
        });
      } else {
        setUser({
          name: "User",
          email: "",
          avatarUrl:
            "Add a valid avatar URL",
        });
      }

    };

    fetchUserData();
  }, [setUser]);

  const handleUpdateUserInfo = () => {
    // Logic to update user info
  }
 

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
              <p className="text-muted-foreground"></p>
            </div>
          </CardContent>
        </Card>

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
