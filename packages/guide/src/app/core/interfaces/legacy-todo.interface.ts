import { CookingRecipe, Critter, Fish, Item, MinimalItem, Offering } from "@ci/data-types";

export interface LegacyToDo {
    version: number;
    offerings: Offering[];
    journal: {
        critter: Critter[];
        insects: Critter[];
        fish: Fish[],
        artifacts: Item[],
        gems: Item[],
        fossils: Item[],
    }
    cookingRecipes: CookingRecipe[],
    uncategorized: MinimalItem[]
}
