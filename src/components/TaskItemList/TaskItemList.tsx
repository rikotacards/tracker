import React from "react";
import { db } from "../../firebase/firebaseutils";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";
import { Card } from "@material-ui/core";
import { ActivitieByDateList } from "src/ActivitiesByDateList/ActivitiesByDateList";

export interface TaskItemListProps {
  userId: string;
}

export const TaskItemList: React.FC<TaskItemListProps> = props => {
  const { userId } = props;
  const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);

  React.useEffect(() => {
    const unsub = db
      .collection("userItems")
      .doc(userId)
      .collection("activities")
      .orderBy("timestamp", "desc")
      .onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data());
        setItems(data as TaskItemInfo[]);
      });
    return () => unsub();
  }, [userId]);

  // List of task, not grouped by dates
  // const existingTasks = taskItems.map((item, i) => (
  //   <TaskItem key={item?.createdTime} {...item} isMostRecent={i === 1} />
  // ));
  const tasksByDate = taskItems.reduce((group: TaskItemInfo[][], c) => {
    if(group.length === 0){
     group.push([c])
     return group
   }   
   const lastIndexOfGroup =  group.length -1

   if(group.length > 0){
     if(group[lastIndexOfGroup][0].createdLocalDate === c.createdLocalDate){
       group[0].push(c)
     } else {
       group.push([c])
     }
   }
   return group
  
  }, [])


  if (taskItems.length === 0) {
    return <Card>Add a new task</Card>;
  }

  return <div><ActivitieByDateList activitiesByDate={tasksByDate}/></div>;
};
