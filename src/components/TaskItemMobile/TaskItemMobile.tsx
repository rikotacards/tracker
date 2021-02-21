import {
  Button,
  Card,
  Collapse,
  IconButton,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";

import React from "react";
import { removeActivity } from "../../firebase/dbActions";
import { UserContext } from "../../Providers/UserProvider";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { TimeDisplay } from "src/components/TimeDisplay/TimeDisplay";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grow from "@material-ui/core/Grow";
import clsx from "clsx";
import { EditableText } from "../EditableText/EditableText";
import { Tag } from "../Tag/Tag";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  categoryContainer: {
    width: "100px",
    display: "flex",
    justifyContent: "center"
  },
  itemSpacing: {
    marginRight: theme.spacing(0.5)
  },
  timeDisplay: {
    padding: theme.spacing(0, 1, 0, 1),
    borderRadius: theme.spacing(0.5)
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "column"
  },
  activityContainer: {
    width: "130px"
    // padding: theme.spacing(0.7)
  },
  moreIcon: {
    marginLeft: "auto",
    '& .MuiButtonBase-root':{
      padding: 0
    }
  },
  activityText: {
    textTransform: "capitalize",
    textAlign: "left",
    textDecoration: "none",
    justifyContent: "left"
  },
  cardContent: {
    display: "flex",
    alignItems: "center"
  },
  deleteButton: {
    marginTop: theme.spacing(1),
    width: "100%"
  },
  activityTagContainer: {
    display: "flex",
    flexDirection: "column",
    width: "160px"
  },
}));
export const TaskItemMobile: React.FC<TaskItemInfo> = props => {
  const [isDeleteClicked, setDeleteClicked] = React.useState(false);

  const { createdTime, activity, category, createdLocalTime } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const onDelete = () => {
    removeActivity({ userId: user?.uid || "anon", createdTime });
  };
  const toggleDeleteButton = () => {
    setDeleteClicked(!isDeleteClicked);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.cardContent}>
        <div className={clsx(classes.dateTimeContainer, classes.itemSpacing)}>
          <Typography variant="caption">Started: </Typography>
          <Typography variant="caption" className={classes.itemSpacing}>
            {createdLocalTime}
          </Typography>
        </div>
        <div className={classes.activityTagContainer}>
          <div className={clsx(classes.activityContainer, classes.itemSpacing)}>
            <EditableText
              text={activity}
              placeholder="edit"
              userId={user?.uid || ""}
              createdTime={createdTime}
            >
              <Button
                size="small"
                className={clsx(classes.itemSpacing, classes.activityText)}
              >
                <Typography variant="caption">{activity}</Typography>
              </Button>
            </EditableText>
          </div>
          <Tag label={category} />
        </div>
        <div className={clsx(classes.itemSpacing)}>
          <TimeDisplay {...props} />
        </div>
        <div className={classes.moreIcon}>
          <IconButton onClick={toggleDeleteButton}>
            <MoreVertIcon style={{'padding': 0}} color={isDeleteClicked ? "secondary" : undefined} />
          </IconButton>
        </div>
      </div>
      <Collapse in={isDeleteClicked}>
        <Grow in={isDeleteClicked}>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={onDelete}
            className={classes.deleteButton}
          >
            Delete
          </Button>
        </Grow>
      </Collapse>
    </Card>
  );
};
