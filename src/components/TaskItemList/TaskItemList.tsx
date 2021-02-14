import React from "react";
import { db } from "../../firebase/firebaseutils";
import { TaskItem } from "../TaskItem/TaskItem";
import { TaskItemInfo } from "../TaskItemForm/TaskItemForm";

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
        console.log('data', data)
        setItems(data as TaskItemInfo[]);
      });
    return () => unsub();
  }, []);

  console.log("TaskItemLit renderd", userId, taskItems);
  const existingTasks = taskItems.map(item => (
    <TaskItem key={item?.createdTime} {...item} />
  ));
  if (taskItems.length === 0) {
    return <div>Add a new task</div>;
  }

  return <div>{existingTasks}</div>;
};
