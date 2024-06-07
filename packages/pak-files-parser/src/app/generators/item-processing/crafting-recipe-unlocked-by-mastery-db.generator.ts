import { readAsset } from '../../../util/functions';
import { RawUnlockByMastery } from "../../../interfaces/raw-data-interfaces/raw-unlock-by-mastery.interface";
import { Datatable } from "../../../interfaces/datatable.interface";
import { UnlockedByMasteryDbGenerator } from "./unlocked-by-mastery-db.generator";

export class CraftingRecipeUnlockedByMasteryDbGenerator extends UnlockedByMasteryDbGenerator {

    recipesDB: Datatable<RawUnlockByMastery>[] = readAsset<Datatable<RawUnlockByMastery>[]>('ProjectCoral/Content/ProjectCoral/Core/Data/Crafting/DT_CraftingUnlockByMastery.json');

}
