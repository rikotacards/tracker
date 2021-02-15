import { mockActivities } from "src/fixtures/mockActivities";
import { getUniqueCategories } from "./getUniqueCategories";

describe("getUniqueCategories", () => {
  it("returns unique categories from a list of activities", () => {
    expect(getUniqueCategories(mockActivities)).toEqual([
      "project",
      "admin",
      "break"
    ]);
  });
});
