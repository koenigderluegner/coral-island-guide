export const sortOptions = [
    {
        displayName: 'Default',
        value: 'default'
    },
    {
        displayName: 'Alphabetical',
        value: 'alphabetical'
    },
    {
        displayName: 'Birthdate',
        value: 'birthdate'
    }
] as const;

const sortValues = sortOptions.map(s => s.value);
export type NpcSortValues = typeof sortValues[number]
