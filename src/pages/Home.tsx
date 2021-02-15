import { makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { AddItemForm } from "src/components/AddItemForm/AddItemForm";
import { TaskItemList } from "src/components/TaskItemList/TaskItemList";
import { UserContext } from "src/Providers/UserProvider";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const getActivitiesSkeleton = (component: JSX.Element, amount: number) => {
  const skeletons = []
  for(let i = 0; i < amount; i++){
    skeletons.push(
      component
    )
  }
  return skeletons
}


export const useSkeletonStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    marginBottom: theme.spacing(0.5),
  },
  skeleton: {
    borderRadius: theme.spacing(0.7)
  }
}))
export const Home: React.FC = () => {
  const classes = useSkeletonStyles()
  const user = React.useContext(UserContext);
  React.useEffect(() => {}, [user]);
  if (!user) {
    return <SignUp />;
  }
  return (
    <div>
      <div>
        {!user.uid! ? (
          <>
          {getActivitiesSkeleton(
            <div className={classes.skeletonContainer}>
            <Skeleton
            className={classes.skeleton}
              animation={"wave"}
              variant="rect"
              height={70}
            ></Skeleton>
          </div>, 8
          )}
          </>
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
