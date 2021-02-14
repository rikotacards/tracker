import React from "react";
import { db } from "../../firebase/firebaseutils";
import { TaskItem } from "../TaskItem/TaskItem";
import { TaskItemInfo } from "../AddItemForm/AddItemForm";

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

  const existingTasks = taskItems.map((item, i) => (
    <TaskItem key={item?.createdTime} {...item} isMostRecent={i === 1} />
  ));
  if (taskItems.length === 0) {
    return <div>Add a new task</div>;
  }

  return <div>{existingTasks}</div>;
};
