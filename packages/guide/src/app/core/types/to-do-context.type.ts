export const ToDoContexts = [
    'offerings',
    'journal_fish',
    'journal_critter',
    'journal_insects',
    'journal_gems',
    'journal_fossils',
    'journal_artifacts',
    'cooking_recipes',
] as const;

export type ToDoContext = typeof ToDoContexts[number];

export const ToDoContextDisplayNames = {
    offerings: 'Offerings',
    journal_fish: 'Fish',
    journal_critter: 'Sea Critter',
    journal_insects: 'Insects',
    journal_gems: 'Gems',
    journal_fossils: 'Fossils',
    journal_artifacts: 'Artifacts',
    cooking_recipes: 'Cooking recipes',
} as const satisfies Record<ToDoContext, string>
