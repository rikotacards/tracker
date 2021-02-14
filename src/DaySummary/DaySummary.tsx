import {
  Card,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  Theme
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { SummaryCharts } from "src/SummaryCharts/SummaryCharts";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  header: {
      display: 'flex',
      alignItems: 'center'
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

interface DaySummaryProps {
  dateString: string;
}
export const DaySummary: React.FC<DaySummaryProps> = ({ dateString }) => {
  const [isExpanded, setExpand] = React.useState(false);
  const classes = useStyles();
  const toggleExpand = () => {
    setExpand(!isExpanded);
  };
  return (
      <Card className={classes.root}>
        <div className={classes.header}>
          <Typography variant="body1">{dateString}</Typography>
          <IconButton
            onClick={toggleExpand}
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded
            })}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Collapse in={isExpanded}>
            <SummaryCharts/>
        </Collapse>
      </Card>
  );
};
