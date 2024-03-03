import { Item, MinimalItem } from "@ci/data-types";
import { Datatable } from "../interfaces/datatable.interface";
import { RawMusuemChecklist } from "../interfaces/raw-data-interfaces/raw-musuem-checklist.interface";
import { minifyItem, readAsset } from "../util/functions";
import { nonNullable } from "@ci/util";

export class MuseumChecklistGenerator {


    protected assets: Map<string, Datatable<RawMusuemChecklist>>

    constructor(protected itemMap: Map<string, Item>) {
        this.assets = new Map<string, Datatable<RawMusuemChecklist>>([
            ['Artifacts', readAsset<Datatable<RawMusuemChecklist>[]>('ProjectCoral/Content/ProjectCoral/Museum/Data/DT_ArtifactDonationList.json')[0]],
            ['Gems', readAsset<Datatable<RawMusuemChecklist>[]>('ProjectCoral/Content/ProjectCoral/Museum/Data/DT_GemsDonationList.json')[0]],
            ['Fossil', readAsset<Datatable<RawMusuemChecklist>[]>('ProjectCoral/Content/ProjectCoral/Museum/Data/DT_FossilDonationList.json')[0]],
            ['Fish', readAsset<Datatable<RawMusuemChecklist>[]>('ProjectCoral/Content/ProjectCoral/Museum/Data/DT_FishDonationList.json')[0]],
            ['Insects', readAsset<Datatable<RawMusuemChecklist>[]>('ProjectCoral/Content/ProjectCoral/Museum/Data/DT_BugsDonationList.json')[0]],
            ['Sea critters', readAsset<Datatable<RawMusuemChecklist>[]>('ProjectCoral/Content/ProjectCoral/Museum/Data/DT_OceanCritterDonationList.json')[0]],
        ])
    }

    generate(): Map<string, Record<string, MinimalItem[]>> {

        const resObject: Record<string, MinimalItem[]> = {};

        [...this.assets.keys()].forEach(listName => {

            const entries = this.assets.get(listName)!;

            const itemList = Object.keys(entries.Rows)
                .map(rowName => entries.Rows[rowName].item.itemID)
                .map(itemId => this.itemMap.get(itemId))
                .map(minifyItem)
                .filter(nonNullable)

            resObject[listName] = itemList;

        })

        const result = new Map<string, Record<string, MinimalItem[]>>;
        result.set('unused', resObject);
        return result;

    }
}
