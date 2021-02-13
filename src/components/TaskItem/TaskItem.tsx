import React from "react";
import { TaskItemInfo } from "../TaskItemForm/TaskItemForm";
import { TimeDisplay } from "../TimeDisplay/TimeDisplay";


export const TaskItem: React.FC<TaskItemInfo> = props => {
  const {
    createdTime,
    activity,
    category,
    createdLocalTime,
    createdLocalDate
  } = props;
  return (
    <div style={{ margin: "2px", border: "1px solid black", display: "flex" }}>
      <div>Category</div>
      <div>{category}</div>
      <div>Activity</div>
      {activity}
      <div>
        Date: {createdLocalDate} - {createdLocalTime}
      </div>
      <TimeDisplay createTime={createdTime} />
    </div>
  );
};
