import React from "react";
import { UserContext, UserProvider } from "./Providers/UserProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { TimerControlProvider } from "./Providers/TimerControlProvider";
import { Appbar } from "./components/Appbar/Appbar";
import { StatsPage } from "./pages/Stats";
import { SignUp } from "./pages/SignUp";

export const App = () => {
  const user = React.useContext(UserContext);

  return (
    <UserProvider>
      <TimerControlProvider>
        <Router>
          <Appbar />
          <Switch>
            <Route exact path="/stats">
              <StatsPage />
            </Route>
            <Route exact path="/signIn">
              {user ? <Redirect to="/" /> : <SignIn />}
            </Route>
            <Route exact path="/signUp">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </TimerControlProvider>
    </UserProvider>
  );
};
