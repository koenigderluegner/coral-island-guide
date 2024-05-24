export const ToDoContexts = [
    'offerings',
    'journal_fish',
    'journal_critter',
    'journal_insects',
    'journal_gems',
    'journal_fossils',
    'journal_artifacts',
    'journal_crops',
    'journal_animal_produce',
    'journal_scavangables',
    'journal_ocean_produce',
    'cooking_recipes',
    'crafting',
    'artisan',
    'museum'
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
    journal_crops: 'Crops',
    journal_animal_produce: 'Animal Produce',
    journal_ocean_produce: 'Ocean Produce',
    journal_scavangables: 'Scavangables',
    cooking_recipes: 'Cooking recipes',
    crafting: 'Crafting',
    artisan: 'Artisan',
    museum: 'Museum'
} as const satisfies Record<ToDoContext, string>
