import { NPC, SpecificDate } from "@ci/data-types";
import { NpcSortValues } from "./npc-sort-options.const";

const seasonWeightForSorting: Map<SpecificDate['season'], number> = new Map<SpecificDate["season"], number>([
    ["Spring", 100],
    ["Summer", 200],
    ["Fall", 300],
    ["Winter", 400],
])

export function filterNPCs<T extends NPC | {
    npc: NPC | undefined
}>(npcs: T[], searchValue: string, sortValue: NpcSortValues): T[] {
    switch (sortValue) {
        case "alphabetical":
            npcs = [...npcs].sort((a, b) => {
                const aCharacterName = 'characterName' in a ? a.characterName : a.npc?.characterName ?? ''
                const bCharacterName = 'characterName' in b ? b.characterName : b.npc?.characterName ?? ''

                if (aCharacterName.toLowerCase() === 'universal') return 1;
                if (bCharacterName.toLowerCase() === 'universal') return -1;
                return aCharacterName.localeCompare(bCharacterName)
            })
            break;
        case "birthdate":
            npcs = [...npcs].sort((a, b) => {

                const aCharacterName = 'characterName' in a ? a.characterName : a.npc?.characterName ?? ''
                const bCharacterName = 'characterName' in b ? b.characterName : b.npc?.characterName ?? ''

                if (aCharacterName.toLowerCase() === 'universal') return 1;
                if (bCharacterName.toLowerCase() === 'universal') return -1;


                let aBirthday = 'npc' in a ? a.npc?.birthday : a.birthday
                let bBirthday = 'npc' in b ? b.npc?.birthday : b.birthday

                if (!aBirthday && bBirthday) return 1;
                if (aBirthday && !bBirthday) return -1;
                if (!aBirthday && !bBirthday) return 0;

                aBirthday = aBirthday!;
                bBirthday = bBirthday!;
                const aValue = (seasonWeightForSorting.get(aBirthday.season) ?? 0) + aBirthday.day
                const bValue = (seasonWeightForSorting.get(bBirthday.season) ?? 0) + bBirthday.day

                return aValue - bValue
            })
            break;
    }

    if (!searchValue) return npcs;

    return npcs.filter(npc => {
        const characterName = 'characterName' in npc ? npc.characterName : npc.npc?.characterName ?? ''
        return characterName.toLowerCase().includes(searchValue)
    })
}
