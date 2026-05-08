export const Checklists = ['bought', 'cooking-recipes', 'museum', 'offerings', 'orchestra-zones', 'shipped', 'crafted', 'defeated'] as const;

export type Checklist = typeof Checklists[number];
