import { makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { BarChart } from "src/components/BarChart/BarChart";
import { PieChart } from "src/components/PieChart/PieChart";
import { getData } from "src/pages/Stats";
import { UserContext } from "src/Providers/UserProvider";
import {
  getUniqueCategories,
  getSumDurationByCategory
} from "src/utils/chartHelpers";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    // maxWidth: "400px",
    justifyContent: "space-around"
  }
}));

export const SummaryCharts: React.FC = () => {
  const user = React.useContext(UserContext);
  const classes = useStyles();
  const [taskItems, setItems] = React.useState<TaskItemInfo[]>([]);

  React.useEffect(() => {
    getData(user?.uid || "0").then(result => {
      setItems(result);
    });
  }, [user?.uid]);
  const labels = taskItems.map(item => item.createdLocalTime);
  const data = taskItems.map(item => item.activityDuration);
  const uniqueCategories = getUniqueCategories(taskItems);
  const sumDurationByCategory = getSumDurationByCategory(
    taskItems,
    uniqueCategories
  );
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
