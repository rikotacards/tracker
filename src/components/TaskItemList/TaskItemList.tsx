import React from "react";
import { db } from "../../firebase/firebaseutils";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";
import { Card } from "@material-ui/core";
import { ActivitieByDateList } from "src/ActivitiesByDateList/ActivitiesByDateList";
import { groupByDate } from "src/utils/groupByDate";

export interface TaskItemListProps {
  userId: string;
}

export const TaskItemList: React.FC<TaskItemListProps> = props => {
  const { userId } = props;
  const [activities, setActivities] = React.useState<TaskItemInfo[]>([]);

  React.useEffect(() => {
    const unsub = db
      .collection("userItems")
      .doc(userId)
      .collection("activities")
      .orderBy("timestamp", "desc")
      .onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data());
        setActivities(data as TaskItemInfo[]);
      });
    return () => unsub();
  }, [userId]);

  const activitiesByDate = groupByDate(activities);

  if (activities.length === 0) {
    return <Card>Add a new task</Card>;
  }

  return (
    <div>
      <ActivitieByDateList activitiesByDate={activitiesByDate} />
    </div>
  );
};

// List of task, not grouped by dates
// const existingTasks = taskItems.map((item, i) => (
//   <TaskItem key={item?.createdTime} {...item} isMostRecent={i === 1} />
// ));
