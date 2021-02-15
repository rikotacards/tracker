import {
  Card,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  Button
} from "@material-ui/core";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { SummaryCharts } from "src/SummaryCharts/SummaryCharts";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  header: {
    display: "flex",
    alignItems: "center"
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
  },
  collapseButton: {
    display: "flex",
    marginTop: theme.spacing(3),
    width: '100%',
    background: theme.palette.grey[200]
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
        <Typography color='primary' variant="h5">{dateString}</Typography>
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
        <SummaryCharts dateString={dateString}/>
        <Button onClick={toggleExpand} className={classes.collapseButton}>
          <ExpandLessIcon />
        </Button>
      </Collapse>
    </Card>
  );
};
