import React from "react";
import { db } from "../../firebase/firebaseutils";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";
import { Card, LinearProgress, Typography } from "@material-ui/core";
import { ActivitieByDateList } from "src/ActivitiesByDateList/ActivitiesByDateList";
import { groupByDate } from "src/utils/groupByDate";
import { makeStyles, Theme } from "@material-ui/core";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Skeleton } from "@material-ui/lab";
import { getActivitiesSkeleton, useSkeletonStyles } from "src/pages/Home";
const useStyles = makeStyles((theme: Theme) => ({
  addNewContainer: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));
export interface TaskItemListProps {
  userId: string;
  demoUserId?: string;
}

export const TaskItemList: React.FC<TaskItemListProps> = props => {
  const { userId, demoUserId } = props;
  const classes = useStyles();
  const skeletonClasses = useSkeletonStyles();
  const [activities, setActivities] = React.useState<TaskItemInfo[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = db
      .collection("userItems")
      .doc(userId)
      .collection("activities")
      .orderBy("timestamp", "desc")
      .onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data());
        setActivities(data as TaskItemInfo[])
        setLoading(false)
      })
    return () => unsub()
  }, [userId]);

  const activitiesByDate = groupByDate(activities);

  if (activities.length === 0 && !loading) {
    return (
      <Card className={classes.addNewContainer}>
        <Typography variant='caption' color='primary'>Add new task using form above</Typography><ArrowDropUpIcon color='primary'/>
      </Card>
    );
  }

  if(loading){
    return (
      <>
      {getActivitiesSkeleton(
            <div className={skeletonClasses.skeletonContainer}>
            <Skeleton
              animation={"wave"}
              variant="rect"
              height={70}
              className={skeletonClasses.skeleton}
            ></Skeleton>
          </div>, 8
          )}
      </>


    )
  }

  return (
    <div>
      <ActivitieByDateList activitiesByDate={activitiesByDate} demoUserId={demoUserId}/>
    </div>
  );
};

// List of task, not grouped by dates
// const existingTasks = taskItems.map((item, i) => (
//   <TaskItem key={item?.createdTime} {...item} isMostRecent={i === 1} />
// ));
