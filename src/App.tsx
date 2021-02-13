import React from "react";
import { TaskItem } from "./TaskItem/TaskItem";
import { TaskItemForm, TaskItemInfo } from "./TaskItemForm/TaskItemForm";
import { TaskItemList } from "./TaskItemList/TaskItemList";

export const App = () => {
  const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);
  React.useEffect(() => {
    if (!localStorage.getItem("taskItems")) {
      localStorage.setItem("taskItems", JSON.stringify([]));
      return;
    }
    const itemsInfoResponse = localStorage.getItem("itemsInfo");
    if (!itemsInfoResponse) {
      return;
    }
    const itemsInfo = JSON.parse(itemsInfoResponse)
    const taskItems = localStorage.getItem("taskItems");
    console.log(taskItems)
    if (taskItems) {
      const taskItemsList = JSON.parse(taskItems);
      while (taskItemsList.length > 10) {
        taskItemsList.shift();
      }
      const items = taskItemsList.map((createdTime: number) => {
        return itemsInfo[createdTime];
      });
      console.log('items', items)
      setItems(items);
    }
  }, []);

 
  return (
    <div>
      <div>
        <TaskItemForm />
      </div>
      <TaskItemList taskItems={taskItems}/>
    </div>
  );
};
