import { Button } from "@material-ui/core";
import React from "react";
import {
  AddItemForm
} from "../components/AddItemForm/AddItemForm";
import { TaskItemList } from "../components/TaskItemList/TaskItemList";
import { Link } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

export const Home: React.FC = () => {
  const user = React.useContext(UserContext);
    if(!user){
        return(
            <Button>
            <Link to="/signIn">Login</Link>
          </Button> 
        )
    }
  return (
    <div>
      <div>
        <AddItemForm />
        {!user.uid! ? (
          "loading"
        ) : (
          <TaskItemList userId={user.uid} />
        )}
      </div>
    </div>
  );
};
