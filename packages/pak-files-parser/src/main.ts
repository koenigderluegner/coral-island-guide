import { generateJson } from './util/functions';
import { ItemDbGenerator } from './app/item-db.generator';
import { CraftingRecipeDbGenerator } from './app/crafting-recipe-db.generator';


const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();

const recipeDbGenerator: CraftingRecipeDbGenerator = new CraftingRecipeDbGenerator(itemDbMap);
const craftingRecipeDbMap = recipeDbGenerator.generate();

generateJson('items.json', [...itemDbMap.values()]);
generateJson('crafting-recipes.json', [...craftingRecipeDbMap.values()]);

