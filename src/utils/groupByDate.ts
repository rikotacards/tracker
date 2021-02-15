import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";

export const getMsToDateString = (ms: number) => {
  return new Date(ms).toDateString();
};

export const groupByDate = (taskItems: TaskItemInfo[]) => {
  const groupsByDate = taskItems.reduce((group: TaskItemInfo[][], item) => {
    if (!group.length) {
      group.push([item]);
      return group;
    }
    const lastGroupIndex = group.length - 1;
    if (group.length > 0) {
      if (
        getMsToDateString(group[lastGroupIndex][0].createdTime) ===
        getMsToDateString(item.createdTime)
      ) {
        group[lastGroupIndex].push(item);
      } else {
        group.push([item]);
      }
      return group;
    }
    return group;
  }, []);
  return groupsByDate;
};
