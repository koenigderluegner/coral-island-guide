import { BaseGenerator } from "../_base/base-generator.class";
import { ProductSizeByMood } from "@ci/data-types";
import { Datatable } from "../../../interfaces/datatable.interface";
import { readAsset } from "../../../util/functions";

type ChancePerHeartLevel = {
    small: number;
    large: number;
}

export class AnimalMoodSizeGenerator extends BaseGenerator<ChancePerHeartLevel, ProductSizeByMood> {
    datatable: Datatable<ChancePerHeartLevel>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Animals/DT_AnimalProductSizeByBadMood.json`);
    neutralMood: Record<string, ChancePerHeartLevel>;
    happyMood: Record<string, ChancePerHeartLevel>;

    constructor() {
        super();
        this.neutralMood = readAsset<Datatable<ChancePerHeartLevel>[]>(`ProjectCoral/Content/ProjectCoral/Animals/DT_AnimalProductSizeByNeutralMood.json`)[0].Rows;
        this.happyMood = readAsset<Datatable<ChancePerHeartLevel>[]>(`ProjectCoral/Content/ProjectCoral/Animals/DT_AnimalProductSizeByHappyMood.json`)[0].Rows;

    }

    handleEntry(itemKey: string, dbItem: ChancePerHeartLevel): ProductSizeByMood | undefined {


        return {
            heartLevel: +itemKey,
            bad: dbItem,
            neutral: this.neutralMood[itemKey],
            happy: this.happyMood[itemKey],

        }

    }
}
