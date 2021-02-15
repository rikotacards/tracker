import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { BarChart } from "src/components/BarChart/BarChart";
import { PieChart } from "src/components/PieChart/PieChart";
import { db } from "src/firebase/firebaseutils";
import { getData } from "src/pages/Stats";
import { isMobile } from "src/platform/platform";
import { UserContext } from "src/Providers/UserProvider";
import { getSumDurationByCategory } from "src/utils/getSumDurationByCategory";
import { getUniqueCategories } from "src/utils/getUniqueCategories";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around"
  }
}));

const useMobileStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  }
}));

export const SummaryCharts: React.FC = () => {
  const user = React.useContext(UserContext);
  const classes = useStyles();
  const classesMobile = useMobileStyles();
  const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);

  React.useEffect(() => {
    const unsub = db
      .collection("userItems")
      .doc(user?.uid)
      .collection("activities")
      .where("createdLocalDate", ">", "14/02/2021")
      .where("createdLocalDate", "<", "16/02/2021")
      .orderBy("createdLocalDate", "desc")
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setItems(data as TaskItemInfo[]);
      });
    return () => unsub();
  }, [user?.uid]);
  const labels = taskItems.map(item => item.createdLocalTime);
  const data = taskItems.map(item => item.activityDuration);
  const uniqueCategories = getUniqueCategories(taskItems);
  const sumDurationByCategory = getSumDurationByCategory(
    taskItems,
    uniqueCategories
  );
  if (!uniqueCategories?.length) {
    return (
      <div>
        <Typography>
          Not enough data. You can start seeing data after you've completed
          timing a task.
        </Typography>
      </div>
    );
  }
  if (isMobile()) {
    return (
      <div className={classesMobile.root}>
        <div>
          <PieChart labels={uniqueCategories} data={sumDurationByCategory} />
        </div>
        <br />
        <div>
          <BarChart labels={labels} data={data} />
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div>
        <BarChart labels={labels} data={data} />
      </div>
      <div>
        <PieChart labels={uniqueCategories} data={sumDurationByCategory} />
      </div>
    </div>
  );
};
