import { CalendarEvent, DatabaseItem, GiftPreferences, NPC } from "@ci/data-types";
import { createFishDashboardFile } from "./dashboards/museum-fish";
import { createBirthdaysFile } from "./dashboards/birthdays";
import { createInsectDashboardFile } from "./dashboards/museum-insects";
import { createOceanCrittersDashboardFile } from "./dashboards/museum-ocean-critter";


export function DashboardFilesCreation(dbItems: DatabaseItem[], npcDbMap: Map<string, NPC>, calendarDbMap: Map<string, CalendarEvent[]>, giftPreferences: Record<string, GiftPreferences>[]): void {
    createFishDashboardFile(dbItems);
    createInsectDashboardFile(dbItems);
    createOceanCrittersDashboardFile(dbItems);
    createBirthdaysFile(npcDbMap, giftPreferences)
}
