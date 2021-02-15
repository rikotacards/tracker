import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm";

export const getUniqueCategories = (activities: TaskItemInfo[]) => {
    const categories = {} as Record<string, boolean>;
    const uniqueCategories: string[] = []
    activities.forEach((activity) => {
        const category = activity.category.toLowerCase()
        if(!categories[category]){
            categories[category] = true;
            uniqueCategories.push(category)
        }
    }) 
    return uniqueCategories;
}