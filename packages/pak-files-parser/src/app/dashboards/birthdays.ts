import { GiftPreferences, NPC } from "@ci/data-types";
import { specificDateToNumber } from "@ci/util";
import { BirthdayDashboardEntry } from "../../../../data-types/src/lib/dashboard/birthday-dashboard-entry.type";
import { generateJson } from "../../util/functions";
import path from "path";


export function createBirthdaysFile(npcDbMap: Map<string, NPC>, giftPreferences: Record<string, GiftPreferences>[]) {


    const dashboardList: BirthdayDashboardEntry[] = []

    const npcs = [...npcDbMap.values()];

    npcs.filter(npc => !!npc.birthday)
        .sort((a, b) => {
            if (a.birthday && b.birthday) {
                return specificDateToNumber(a.birthday) - specificDateToNumber(b.birthday)
            }
            return 0
        })
        .forEach(npc => {
            const lovedGifts = giftPreferences.find(g => Object.keys(g).includes(npc.key))?.[npc.key].lovePreferences ?? [];

            const npcEntry: BirthdayDashboardEntry = {
                npcKey: npc.key,
                characterName: npc.characterName,
                iconName: npc.iconName,
                birthday: npc.birthday!,
                lovedGifts,

            };

            dashboardList.push(npcEntry);

        });

    generateJson(path.join('dashboards', `birthdays.json`), dashboardList, true, 'none');

}
