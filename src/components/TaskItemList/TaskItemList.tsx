import React from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { TaskItemInfo } from "../TaskItemForm/TaskItemForm";

export interface TaskItemListProps {
  taskItems: TaskItemInfo[];
}

export const TaskItemList: React.FC<TaskItemListProps> = props => {
  const { taskItems } = props;
  console.log(taskItems)
  const existingTasks = taskItems.map(item => (
    <TaskItem key={item?.createdTime} {...item} />
  ));

  return <div>{existingTasks}</div>;
};
