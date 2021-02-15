import React from "react";
import { Button, Typography } from "@material-ui/core";
import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";
import { db } from "src/firebase/firebaseutils";
import { UserContext } from "src/Providers/UserProvider";
import { BarChart } from "src/components/BarChart/BarChart";
import { PieChart } from "src/components/PieChart/PieChart";
import { getSumDurationByCategory } from "src/utils/getSumDurationByCategory";
import { getUniqueCategories } from "src/utils/getUniqueCategories";

export const getData = async (userId: string) => {
  const query = db
    .collection("userItems")
    .doc(userId)
    .collection("activities")
    .where("createdLocalDate", ">", "13/02/2021")
    .where("createdLocalDate", "<", "15/02/2021")
    .orderBy("createdLocalDate", "desc");

  const querySnapshot = await query.get();

  const returnData: TaskItemInfo[] = [];

  querySnapshot.forEach(doc => {
    returnData.push(doc.data() as TaskItemInfo);
  });
  return returnData;
};

export const StatsPage: React.FC = () => {
  const user = React.useContext(UserContext);
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
    <div>
      <div>
        <Button>Today</Button>
      </div>
      <Typography>Stats</Typography>
      <BarChart labels={labels} data={data} />
      <PieChart labels={uniqueCategories} data={sumDurationByCategory} />
    </div>
  );
};
