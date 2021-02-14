import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export const Appbar: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
        <Typography variant="h6">Fluid Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
