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
    const { createdTime } = dateGroup[0];
    const dateString = new Date(createdTime).toDateString();

    const activityLines = dateGroup.map((activityItem, activityItemIndex) => (
      <TaskItem
        key={activityItem.createdTime}
        {...activityItem}
        isMostRecent={dateGroupIndex === 0 && activityItemIndex === 1}
      />
    ));
    const activityLinesWithDate = [
      <DaySummary dateString={dateString} key={dateString} />,
      ...activityLines
    ];
    return activityLinesWithDate;
  });
  return <div>{rendered}</div>;
};
