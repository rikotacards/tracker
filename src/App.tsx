import { Button } from "@material-ui/core";
import React from "react";
import {
  TaskItemForm,
  TaskItemInfo
} from "./components/TaskItemForm/TaskItemForm";
import { TaskItemList } from "./components/TaskItemList/TaskItemList";
import { UserContext, UserProvider } from "./Providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./components/SignIn/SignIn";

export const App = () => {
  const user = React.useContext(UserContext);
  console.log("usr", user);

  const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);
  React.useEffect(() => {
    if (!localStorage.getItem("taskItems")) {
      localStorage.setItem("taskItems", JSON.stringify([]));
      return;
    }
    const itemsInfoResponse = localStorage.getItem("itemsInfo");
    if (!itemsInfoResponse) {
      return;
    }
    const itemsInfo = JSON.parse(itemsInfoResponse);
    const taskItems = localStorage.getItem("taskItems");
    console.log(taskItems);
    if (taskItems) {
      const taskItemsList = JSON.parse(taskItems);
      while (taskItemsList.length > 10) {
        taskItemsList.shift();
      }
      const items = taskItemsList.map((createdTime: number) => {
        return itemsInfo[createdTime];
      });
      console.log("items", items);
      setItems(items);
    }
  }, []);

  return (
    <UserProvider>
      <Router>
        <Route exact path="/signIn">
          {user ? <Redirect to="/" /> : <SignIn />}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Router>
    </UserProvider>
  );
};
