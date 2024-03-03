export enum ToDoCategory {
    OFFERINGS = "offerings",
    JOURNAL_FISH = "journal_fish",
    JOURNAL_CRITTER = "journal_critter",
    JOURNAL_INSECTS = "journal_insects",
    JOURNAL_GEMS = "journal_gems",
    JOURNAL_FOSSILS = "journal_fossils",
    JOURNAL_ARTIFACTS = "journal_artifacts",
    COOKING_RECIPES = "cooking_recipes",
}

export const ToDoCategoryDisplayNames: Record<ToDoCategory, string> = {
    [ToDoCategory.OFFERINGS]: 'Offerings',
    [ToDoCategory.JOURNAL_FISH]: 'Fish',
    [ToDoCategory.JOURNAL_CRITTER]: 'Sea Critter',
    [ToDoCategory.JOURNAL_INSECTS]: 'Insects',
    [ToDoCategory.JOURNAL_GEMS]: 'Gems',
    [ToDoCategory.JOURNAL_FOSSILS]: 'Fossils',
    [ToDoCategory.JOURNAL_ARTIFACTS]: 'Artifacts',
    [ToDoCategory.COOKING_RECIPES]: 'Cooking recipes',
}
