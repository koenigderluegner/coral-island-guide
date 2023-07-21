import { CookingRecipe, Critter, Fish, Item, Offering } from "@ci/data-types";

export interface Checklist {
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
    cookingRecipes: CookingRecipe[]
}
