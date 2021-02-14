import React from "react";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { TaskItem } from "src/components/TaskItem/TaskItem";
import { DaySummary } from "src/DaySummary/DaySummary";

interface ActivitiesByDateListProps {
  activitiesByDate: TaskItemInfo[][];
}

export const ActivitieByDateList: React.FC<ActivitiesByDateListProps> = ({
  activitiesByDate
}) => {
  const rendered = activitiesByDate.map((dateGroup, dateGroupIndex) => {
    const dateStringFromDb = dateGroup[0].createdLocalDate;
    const dateParts = dateStringFromDb.split("/");
    const dateString = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0]
    ).toDateString()

    const activityLines = dateGroup.map((activityItem, activityItemIndex) => (
      <TaskItem
        key={activityItem.createdTime}
        {...activityItem}
        isMostRecent={dateGroupIndex === 0 && activityItemIndex === 1}
      />
    ));
    const activityLinesWithDate = [
        <DaySummary dateString={dateString}/>
     ,
      ...activityLines
    ];
    return activityLinesWithDate;
  });
  return <div>{rendered}</div>;
};
