import { CalendarEvent, DatabaseItem, GiftPreferences, NPC } from "@ci/data-types";
import { createFishDashboardFile } from "./dashboards/museum-fish";
import { createBirthdaysFile } from "./dashboards/birthdays";


export function DashboardFilesCreation(dbItems: DatabaseItem[], npcDbMap: Map<string, NPC>, calendarDbMap: Map<string, CalendarEvent[]>, giftPreferences: Record<string, GiftPreferences>[]): void {
    createFishDashboardFile(dbItems);
    createBirthdaysFile(npcDbMap, giftPreferences)
}
