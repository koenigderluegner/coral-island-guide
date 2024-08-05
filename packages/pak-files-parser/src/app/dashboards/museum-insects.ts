import { CritterDashboardEntry, DatabaseItem } from "@ci/data-types";
import { generateJson } from "../../util/functions";
import path from "path";
import { DbItemToCritter } from "./db-item-to-critter-util.function";

export function createInsectDashboardFile(dbItems: DatabaseItem[]) {

    const dashboardList: CritterDashboardEntry[] = []

    dbItems
        .filter((item => !!item.insect))
        .forEach(item => {
            const entry = DbItemToCritter(item.insect!)
            dashboardList.push(entry)
        });

    generateJson(path.join('dashboards', `museum-insects.json`), dashboardList, true, 'none');


}
