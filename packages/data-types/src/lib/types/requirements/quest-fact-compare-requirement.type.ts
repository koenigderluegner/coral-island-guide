export const QuestFactComparators = ['MoreEqual', 'Equal'] as const

export type  QuestFactCompareRequirement = {
    type: 'QuestFactCompare',
    meta: {
        factName: string;
        value: number;
        comparator: typeof QuestFactComparators[number];
    }
}
