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
    }),
    '& .MuiIconBase-root': {
      paddingRight:0
    }
  },
  expandOpen: {
    transform: "rotate(180deg)",
    '& .MuiButtonBase-root': {
      paddingRight:0
    }
  },
  expandMoreIcon: {
    '&. MuiButtonBase-root': {
      paddingRight:0
    }
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
  demoUserId?: string;
  isMobileVariant?: boolean;
}
export const DaySummary: React.FC<DaySummaryProps> = ({demoUserId, dateString, isMobileVariant }) => {
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
        style={{'padding': '0px'}}
          onClick={toggleExpand}
          className={clsx(classes.expand, {
            [classes.expandOpen]: isExpanded
          })}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse in={isExpanded}>
        <SummaryCharts isMobileVariant={isMobileVariant} demoUserId={demoUserId} dateString={dateString}/>
        <Button onClick={toggleExpand} className={classes.collapseButton}>
          <ExpandLessIcon />
        </Button>
      </Collapse>
    </Card>
  );
};
