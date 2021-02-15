import { TaskItemInfo } from "src/components/AddItemForm/AddItemForm"

// Used for charts
export const getSumDurationByCategory = (items: TaskItemInfo[], uniqueCategories: string[]) => {
    const categorySums = items.reduce((categories: Record<string, number>, item) => {
        const categoryName = item.category.toLowerCase()
        if(!categories[categoryName]){
            categories[categoryName] = item.activityDuration
        } else {
            categories[categoryName] = categories[categoryName] + item.activityDuration || 0
        }
        return categories
    }, {})

    const categorySumOrdered = uniqueCategories.map((category) => {
        if(categorySums[category]){
            return categorySums[category]
        } else {
            return 0
        }
    })
    return categorySumOrdered
}