import { Button } from "@material-ui/core";
import React from "react";
import {
  TaskItemInfo,
  TaskItemForm
} from "../components/TaskItemForm/TaskItemForm";
import { TaskItemList } from "../components/TaskItemList/TaskItemList";
import { Link } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import { getUserActivities } from "../firebase/dbActions";
import { db } from "../firebase/firebaseutils";

export const Home: React.FC = () => {
    const user = React.useContext(UserContext);
    const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);
   
   

  React.useEffect(() => {
    if(user){
    const unsub =    db
    .collection('userItems')
    .doc(user.uid)
    .collection('activities')
    .onSnapshot(querySnapshot => {
        const data: TaskItemInfo[] = [];
        querySnapshot.forEach(doc => {
          data.push({ ...(doc.data() as TaskItemInfo) });
        });
        setItems(data)
    })
    return () => unsub()
    }
  }, []);
  return (
    <div>
      <div>
        <Button>
          <Link to="/signIn">
            Login
          </Link>
        </Button>
        <TaskItemForm />
        <TaskItemList taskItems={taskItems} />
      </div>
    </div>
  );
};
