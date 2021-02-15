import { groupByDate } from "./groupByDate";
import { mockActivities } from "src/fixtures/mockActivities";

describe("groupByDate", () => {
  it("should transform 1 dimension array of activities to 2 dimension array of activities grouped by date", () => {
    expect(groupByDate(mockActivities)).toEqual([
      [
        {
          createdLocalDate: "14/02/2021",
          category: "project"
        },
        {
          createdLocalDate: "14/02/2021",
          category: "admin"
        },
        {
          createdLocalDate: "14/02/2021",
          category: "break"
        }
      ],
      [
        {
          createdLocalDate: "12/02/2021",
          category: "project"
        },
        {
          createdLocalDate: "12/02/2021",
          category: "admin"
        }
      ],
      [
        {
          createdLocalDate: "14/01/2021",
          category: "project"
        },
        {
          createdLocalDate: "14/01/2021",
          category: "project"
        }
      ]
    ]);
  });
});
