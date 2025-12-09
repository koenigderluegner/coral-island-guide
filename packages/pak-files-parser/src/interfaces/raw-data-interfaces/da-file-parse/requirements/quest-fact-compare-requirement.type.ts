import { RawRequirementWithMeta } from './raw-requirement-with-meta';

export type RawQuestFactCompareRequirement = RawRequirementWithMeta<
    'QuestFactCompare',
    {
        fact: {
            factName: {
                RowName: string;
            };
        };
        factCompare: {
            comparedInteger: number;
            compareType: string;
        };
    }
>;
