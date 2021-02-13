import { TaskItemInfo } from "../components/TaskItemForm/TaskItemForm";

export const sendTaskToDb = (taskItemInfo: TaskItemInfo) => {
  const { createdTime } = taskItemInfo;
  console.log(taskItemInfo)
  const itemInfoResponse = localStorage.getItem("itemsInfo");
  if (!itemInfoResponse) {
    localStorage.setItem(
      "itemsInfo",
      JSON.stringify({ [createdTime]: { ...taskItemInfo, createdTime } })
    );
  }
  if (itemInfoResponse) {
    const itemsInfo = JSON.parse(itemInfoResponse);
    localStorage.setItem(
      "itemsInfo",
      JSON.stringify({
        ...itemsInfo,
        [createdTime]: { ...taskItemInfo, createdTime }
      })
    );
  }

  const items = localStorage.getItem("taskItems");
  if (!items) {
    return;
  }
  const itemsList = JSON.parse(items);
  const newItemsList = [...itemsList, createdTime];

  localStorage.setItem("taskItems", JSON.stringify(newItemsList));
};
