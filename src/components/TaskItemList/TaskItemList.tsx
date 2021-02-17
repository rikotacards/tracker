import React from "react";
import { db } from "../../firebase/firebaseutils";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";
import { Card, Typography } from "@material-ui/core";
import { ActivitieByDateList } from "src/ActivitiesByDateList/ActivitiesByDateList";
import { groupByDate } from "src/utils/groupByDate";
import { makeStyles, Theme } from "@material-ui/core";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { ActivitiesSkeleton } from "src/pages/Home";
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
  isMobileVariant? : boolean;
}

export const TaskItemList: React.FC<TaskItemListProps> = props => {
  const { userId, demoUserId , isMobileVariant} = props;
  const classes = useStyles();
  const [activities, setActivities] = React.useState<TaskItemInfo[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = db
      .collection("userItems")
      .doc(userId)
      .collection("activities")
      .orderBy("timestamp", "desc").limit(3)
      .onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data());
        setActivities(data as TaskItemInfo[])
        setLoading(false)
      })
    return () => unsub()
  }, [userId]);

  const activitiesByDate = groupByDate(activities);

  if(loading){
    return (
      <ActivitiesSkeleton amount={10}/>
    )
  }

  if (activities.length === 0 && !loading) {
    return (
      <Card className={classes.addNewContainer}>
        <Typography variant='caption' color='primary'>Add new task using form above</Typography><ArrowDropUpIcon color='primary'/>
      </Card>
    );
  }



  return (
      <ActivitieByDateList isMobileVariant={isMobileVariant} activitiesByDate={activitiesByDate} demoUserId={demoUserId}/>
  );
};

// List of task, not grouped by dates
// const existingTasks = taskItems.map((item, i) => (
//   <TaskItem key={item?.createdTime} {...item} isMostRecent={i === 1} />
// ));
