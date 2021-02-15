import { mockActivities } from 'src/fixtures/mockActivities';
import {getSumDurationByCategory} from './getSumDurationByCategory';
import { getUniqueCategories } from './getUniqueCategories';

describe('getSumDurationByCategory', () => {
    it('should get sum duration of each category', () => {
        const uniqueCategories = getUniqueCategories(mockActivities);
        expect(getSumDurationByCategory(mockActivities, uniqueCategories)).toEqual([
            4,2,1
        ])
    })
})