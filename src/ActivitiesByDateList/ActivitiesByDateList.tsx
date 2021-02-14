import { Card, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { TaskItem } from "src/components/TaskItem/TaskItem";

interface ActivitiesByDateListProps {
  activitiesByDate: TaskItemInfo[][];
}

const useStyles = makeStyles((theme: Theme) => ({
  dateContainer: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
export const ActivitieByDateList: React.FC<ActivitiesByDateListProps> = ({
  activitiesByDate
}) => {
  const classes = useStyles();
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
      <Card className={classes.dateContainer} key={dateString}>
        <Typography variant="body1">{dateString}</Typography>
      </Card>,
      ...activityLines
    ];
    return activityLinesWithDate;
  });
  return <div>{rendered}</div>;
};
