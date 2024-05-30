import { ItemDbGenerator } from "./items/item-db.generator";
import { DaFilesParser } from "../da-files-parser";
import { CalendarGenerator } from "./misc/calendar.generator";
import { NPCDbGenerator } from "./npcs/npc-db.generator";
import { CraftingRecipeUnlockedByMasteryDbGenerator } from "./item-processing/crafting-recipe-unlocked-by-mastery-db.generator";
import { CookingRecipeUnlockedByMasteryDbGenerator } from "./cooking/cooking-recipe-unlocked-by-mastery-db.generator";
import { TagBasedItemGenericDbGenerator } from "./items/tag-based-item-generic-db.generator";
import { CookingDbGenerator } from "./cooking/cooking-db.generator";
import { AchievementGenerator } from "./journal/achievement.generator";
import { SpecialItemDbGenerator } from "./items/special-item-db.generator";
import { MailDataGenerator } from "./journal/mail-data.generator";
import { FestivalDbGenerator } from "./shops-and-festivals/festival-db.generator";
import { LocationInfoGenerator } from "./misc/location-info.generator";
import { HeartEventTriggerDataGenerator } from "./heart-events/heart-event-trigger-data.generator";

export function generateBaseMaps() {
    const itemDbMap = new ItemDbGenerator().generate();

    DaFilesParser.ItemMap = itemDbMap;


    const calendarDbMap = new CalendarGenerator().generate();
    const npcDbMap = new NPCDbGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_NPCs.json', calendarDbMap).generate();
    const craftingRecipeUnlockedByMasteryDbMap = new CraftingRecipeUnlockedByMasteryDbGenerator(itemDbMap).generate();
    const cookingRecipeUnlockedByMasteryDbMap = new CookingRecipeUnlockedByMasteryDbGenerator(itemDbMap).generate();
    const tagBasedItemsDbMap = new TagBasedItemGenericDbGenerator(itemDbMap).generate();
    const cookingDbMap = new CookingDbGenerator(itemDbMap, cookingRecipeUnlockedByMasteryDbMap, tagBasedItemsDbMap).generate();

    DaFilesParser.CookingMap = cookingDbMap;

    const achievementMap = new AchievementGenerator().generate();

    DaFilesParser.AchievementMap = achievementMap;

    const specialItemDbMap = new SpecialItemDbGenerator().generate();

    DaFilesParser.SpecialItemMap = specialItemDbMap;

    const mailDataMap = new MailDataGenerator().generate({
        daFiles: [
            'ProjectCoral/Content/ProjectCoral/Data/Mail/DA_MailEffectsConfig.json'
        ]
    });


    DaFilesParser.MailMap = mailDataMap;


    const festivalDbMap = new FestivalDbGenerator().generate();


    const locationInfoMap = new LocationInfoGenerator().generate();


    const heartEventTriggerDataMap = new HeartEventTriggerDataGenerator(locationInfoMap).generate({
        daFiles: [
            'ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DA_HeartEventCutsceneAdvanceRequirement.json',
            'ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DA_HeartEventCutsceneEffects.json',
        ]
    });


    return {
        itemDbMap,
        calendarDbMap,
        npcDbMap,
        craftingRecipeUnlockedByMasteryDbMap,
        cookingRecipeUnlockedByMasteryDbMap,
        tagBasedItemsDbMap,
        cookingDbMap,
        achievementMap,
        specialItemDbMap,
        mailDataMap,
        festivalDbMap,
        locationInfoMap,
        heartEventTriggerDataMap
    } as const;
}
