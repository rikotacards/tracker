import { Button, TextField, makeStyles, Theme, Card, Typography } from "@material-ui/core";
import React from "react";
import { addTrackedItem } from "src/firebase/dbActions";
import { TimeControlContext } from "src/Providers/TimerControlProvider";
import { UserContext } from "src/Providers/UserProvider";

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
  isMostRecent?: boolean;
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex', 
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  itemSpacing: {
    marginRight: theme.spacing(1)
  }
}))

export const AddItemForm: React.FC<TaskItemFormProps> = props => {
  const date = new Date();
  const user = React.useContext(UserContext);
  const timeControl = React.useContext(TimeControlContext)
  const classes = useStyles();
  
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
    })
    // Reset form
    setForm({...form, 'category': '', activity: ''})
    const formEl = document.getElementById('task-item-form') as HTMLFormElement;
    timeControl.setPause()
    formEl.reset()

  };

  return (
    <Card  className={classes.root}>
      <Typography className={classes.itemSpacing}>{createdLocalDate}</Typography>
      <form noValidate autoComplete="off" id="task-item-form">
        <TextField className={classes.itemSpacing} onChange={handleChange} id="category" helperText="E.g. 'work', 'learn'" label="Category" placeholder="Learn"/>
        <TextField  className={classes.itemSpacing} onChange={handleChange} id="activity" label="Activity" placeholder="How to use github" />
      </form>

      <Button variant="contained" size='small' disabled={form.activity.length === 0 || form.category.length === 0}onClick={onStartClick}>
        Start
      </Button>
    </Card>
  );
};