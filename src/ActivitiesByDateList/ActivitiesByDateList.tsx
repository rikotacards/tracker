import React from "react";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { TaskItem } from "src/components/TaskItem/TaskItem";
import { DaySummary } from "src/DaySummary/DaySummary";
import { getMsToDateString } from "src/utils/groupByDate";

interface ActivitiesByDateListProps {
  activitiesByDate: TaskItemInfo[][];
  demoUserId?: string;
  isMobileVariant?: boolean;
}

export const ActivitieByDateList: React.FC<ActivitiesByDateListProps> = ({
  activitiesByDate,
  demoUserId,
  isMobileVariant
}) => {

  const rendered = activitiesByDate.map((dateGroup, dateGroupIndex) => {
    const { createdTime } = dateGroup[0];
    const dateString = getMsToDateString(createdTime)
    const activityLines = dateGroup.map((activityItem, activityItemIndex) => (
      <TaskItem
        key={activityItem.createdTime}
        {...activityItem}
        // Fix bug here, where if the next day begins, this wont be set properly
        isMostRecent={dateGroupIndex === 0 && activityItemIndex === 1}
      />
    ));
    const activityLinesWithDate = [
      <DaySummary isMobileVariant={isMobileVariant} demoUserId={demoUserId} dateString={dateString} key={dateString} />,
      ...activityLines
    ];
    return activityLinesWithDate;
  });
  return <div>{rendered}</div>;
};
