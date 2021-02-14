import React from "react";
import { UserContext, UserProvider } from "./Providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./components/SignIn/SignIn";
import { TimerControlProvider } from "./Providers/TimerControlProvider";
import { Appbar } from "./components/Appbar/Appbar";

export const App = () => {
  const user = React.useContext(UserContext);

  return (
    <UserProvider>
      <TimerControlProvider>
        <Router>
          <Appbar />
          <Switch>
            <Route exact path="/signIn">
              {user ? <Redirect to="/" /> : <SignIn />}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </TimerControlProvider>
    </UserProvider>
  );
};
