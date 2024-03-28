import { readAsset } from "../../util/functions";
import { Datatable } from "../../interfaces/datatable.interface";
import { BaseGenerator } from "./base-generator.class";
import { HeartEventTriggerData, LocationInfo } from "@ci/data-types";
import { getEnumValue } from "@ci/util";
import { RawHeartEventTriggerData } from "../../interfaces/raw-data-interfaces/raw-heart-event-trigger-data.interface";


export class HeartEventTriggerDataGenerator extends BaseGenerator<RawHeartEventTriggerData, HeartEventTriggerData> {

    datatable: Datatable<RawHeartEventTriggerData>[] = readAsset<Datatable<RawHeartEventTriggerData>[]>('ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DT_HeartEventCutsceneTrigger.json');

    constructor(protected locationMap: Map<string, LocationInfo>) {
        super();
    }

    handleEntry(itemKey: string, dbItem: RawHeartEventTriggerData): HeartEventTriggerData | undefined {
        return {
            id: itemKey,
            location: this.locationMap.get(dbItem.locationRow.RowName)?.location ?? dbItem.locationRow.RowName,
            canTriggerSameDay: dbItem.canTriggerSameDay,
            heartLevel: dbItem.heartLevel,
            npc: dbItem.npc,
            cutscene: dbItem.cutscene,
            enabled: dbItem.enabled,
            otherCutscenesState: dbItem.otherCutscenesState,
            specificDay: dbItem.specificDay.map(getEnumValue),
            specificMonth: dbItem.specificMonth.map(getEnumValue),
            specificWeather: dbItem.specificWeather.map(getEnumValue),
            time: dbItem.time,
            effects: this.getEffects(itemKey),
            requirements: this.getRequirements(itemKey),
        };
    }
}
