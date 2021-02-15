import { makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { BarChart } from "src/components/BarChart/BarChart";
import { PieChart } from "src/components/PieChart/PieChart";
import { db } from "src/firebase/firebaseutils";
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
interface SummaryChartsProps {
  dateString: string;
  demoUserId?: string;
}
export const SummaryCharts: React.FC<SummaryChartsProps> = ({dateString, demoUserId}) => {
  const user = React.useContext(UserContext);
  const classes = useStyles();
  const classesMobile = useMobileStyles();
  const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);

  const oneDayPrior =new Date(dateString).setDate(new Date(dateString).getDate()-1)
  const oneDayAfter = new Date(dateString).setDate(new Date(dateString).getDate()+1)

  React.useEffect(() => {
    const unsub = db
      .collection("userItems")
      .doc(demoUserId || user?.uid)
      .collection("activities")
      .where("createdTime", ">", oneDayPrior)
      .where("createdTime", "<", oneDayAfter)
      .orderBy("createdTime", "desc")
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
