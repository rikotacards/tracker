import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
  Button,
  LinearProgress
} from "@material-ui/core";
import React from "react";
import { signOut } from "src/firebase/firebaseutils";
import { UserContext } from "src/Providers/UserProvider";

const useStyles = makeStyles((theme: Theme) => ({
  signOut: {
    marginLeft: "auto"
  }
}));

export const Appbar: React.FC = () => {
  const user = React.useContext(UserContext);

  const handleSignOut = () => {
    signOut();
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Temporal</Typography>
          {user?.uid ? (
            <Button
              size="small"
              onClick={handleSignOut}
              color="secondary"
              variant="contained"
              className={classes.signOut}
            >
              Sign out
            </Button>
          ) : null}
        </Toolbar>
        {user && !user?.uid ? <LinearProgress color="secondary" /> : null}
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
