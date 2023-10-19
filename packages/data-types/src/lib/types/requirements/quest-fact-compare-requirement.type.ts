export const QuestFactComparators = ['MoreEqual'] as const

export type  QuestFactCompareRequirement = {
    type: 'QuestFactCompare',
    meta: {
        factName: string;
        value: number;
        comparator: typeof QuestFactComparators[number];
    }
}
