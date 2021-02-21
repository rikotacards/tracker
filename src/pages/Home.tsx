import { makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { AddItemForm } from "src/components/AddItemForm/AddItemForm";
import { TaskItemList } from "src/components/TaskItemList/TaskItemList";
import { UserContext } from "src/Providers/UserProvider";
import { SignUp } from "./SignUp";

interface ActivitiesSkeletonProps {
  amount: number;
}

export const useSkeletonStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    marginBottom: theme.spacing(0.5)
  },
  skeleton: {
    borderRadius: theme.spacing(0.7)
  }
}));
export const ActivitiesSkeleton: React.FC<ActivitiesSkeletonProps> = props => {
  const { amount } = props;
  const classes = useSkeletonStyles();
  const skeletonCount = [];
  for (let i = 0; i < amount; i++) {
    skeletonCount.push(i);
  }
  return (
    <>
      {skeletonCount.map(index => (
        <div className={classes.skeletonContainer} key={index}>
          <Skeleton
            key={index}
            className={classes.skeleton}
            animation={"wave"}
            variant="rect"
            height={70}
          ></Skeleton>
        </div>
      ))}
    </>
  );
};
export const Home: React.FC = () => {
  const user = React.useContext(UserContext);
  React.useEffect(() => {}, [user]);
  if (!user) {
    return <SignUp />;
  }
  return !user.uid! ? (
    <ActivitiesSkeleton amount={8} />
  ) : (
    <div>
      <AddItemForm />
      <TaskItemList userId={user.uid} />
    </div>
  );
};
