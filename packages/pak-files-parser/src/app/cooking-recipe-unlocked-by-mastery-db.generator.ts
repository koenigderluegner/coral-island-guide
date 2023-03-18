import { readAsset } from '../util/functions';
import { RawUnlockByMastery } from "../interfaces/raw-unlock-by-mastery.interface";
import { Datatable } from "../interfaces/datatable.interface";
import { UnlockedByMasteryDbGenerator } from "./unlocked-by-mastery-db.generator";

export class CookingRecipeUnlockedByMasteryDbGenerator extends UnlockedByMasteryDbGenerator {

    recipesDB: Datatable<RawUnlockByMastery>[] = readAsset<Datatable<RawUnlockByMastery>[]>('DT_CookingRecipeUnlockByMastery.json');

}
