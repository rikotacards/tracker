import { Box, Button, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { AddItemForm } from "src/components/AddItemForm/AddItemForm";
import { TaskItemList } from "src/components/TaskItemList/TaskItemList";
import { UserContext } from "src/Providers/UserProvider";
import { SignIn } from "./SignIn";


export const Home: React.FC = () => {
  const user = React.useContext(UserContext);
  React.useEffect(() => {}, [user]);
  if (!user) {
    return <SignIn />;
  }
  return (
    <div>
      <div>
        {!user.uid! ? (

          <Box>
            <Skeleton variant="rect" width="100%" animation="wave">
              <Box style={{ height: "120px" }} />
            </Skeleton>
            <Skeleton width="100%" variant='text' animation="wave" >
            </Skeleton>
            <Skeleton width="100%" variant='text' animation="wave" >
            </Skeleton>
            <Skeleton width="100%" variant='text' animation="wave" >
            </Skeleton>
          </Box>
        ) : (
          <div>
            <AddItemForm />
            <TaskItemList userId={user.uid} />
          </div>
        )}
      </div>
    </div>
  );
};
