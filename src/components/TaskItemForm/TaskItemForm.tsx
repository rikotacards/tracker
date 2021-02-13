import { Button, TextField } from "@material-ui/core";
import React from "react";
import { addTrackedItem } from "../../firebase/dbActions";
import { UserContext } from "../../Providers/UserProvider";
import { sendTaskToDb } from "../../utils/sendTaskToDb";

export const getCurrentTime = () => {
  return new Date();
};

interface TaskItemFormProps {
  createTime?: number;
}

export interface TaskItemInfo {
  activity: string;
  category: string;
  createdLocalTime: string;
  createdLocalDate: string;
  createdTime: number;
  pausedTime?: number;
  isPaused: boolean;
  isCompleted: boolean;
  isResumed: boolean;
  resumedTime?: number;
}

const initialFormData: TaskItemInfo = {
  activity: "",
  category: "",
  createdTime: Date.now(),
  createdLocalTime: "",
  createdLocalDate: "",
  isPaused: false,
  isCompleted: false,
  isResumed: false,
};

export const TaskItemForm: React.FC<TaskItemFormProps> = props => {
  const date = new Date();
  const user = React.useContext(UserContext);
  
  const createdLocalTime = date.toLocaleTimeString();
  const createdLocalDate = date.toLocaleDateString();
  const [form, setForm] = React.useState<TaskItemInfo>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onStartClick = () => {
    addTrackedItem({
      ...form,
      createdLocalTime, 
      createdLocalDate,
      userId: user?.uid || "anon",
      name: user?.displayName || "anon",
      createdTime: Date.now()
    });
   
    
  };

  return (
    <div style={{ margin: "2px", border: "1px solid black", display: "flex" }}>
      <div>{createdLocalDate}</div>
      <form noValidate autoComplete="off" id="task-item-form">
        <TextField onChange={handleChange} id="category" label="Category" />
        <TextField onChange={handleChange} id="activity" label="Activity" />
      </form>

      <Button variant="contained" onClick={onStartClick}>
        Start
      </Button>
    </div>
  );
};
