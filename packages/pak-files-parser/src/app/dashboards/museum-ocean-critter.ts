import { CritterDashboardEntry, DatabaseItem } from "@ci/data-types";
import { generateJson } from "../../util/functions";
import path from "path";
import { DbItemToCritter } from "./db-item-to-critter-util.function";

export function createOceanCrittersDashboardFile(dbItems: DatabaseItem[]) {

    const dashboardList: CritterDashboardEntry[] = []

    dbItems
        .filter((item => !!item.oceanCritter))
        .forEach(item => {
            const entry = DbItemToCritter(item.oceanCritter!)
            dashboardList.push(entry)
        });

    generateJson(path.join('dashboards', `museum-ocean-critters.json`), dashboardList, true, 'none');


}
