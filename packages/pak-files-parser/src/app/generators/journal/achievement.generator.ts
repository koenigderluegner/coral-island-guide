import { Achievement } from "@ci/data-types";
import { convertToIconName, readAsset } from "../../../util/functions";
import { RawAchievement } from "../../../interfaces/raw-data-interfaces/raw-achievement.interface";
import { StringTable } from "../../../util/string-table.class";


export class AchievementGenerator {
    private achievements: RawAchievement[];


    constructor() {
        this.achievements = readAsset<(any | RawAchievement)[]>('ProjectCoral/Content/ProjectCoral/Data/Achievement/DA_AchievementSubsystemConfig.json')
            .filter((a): a is {
                Properties: RawAchievement
            } => 'Properties' in a && 'achievementId' in a.Properties).map(a => a.Properties)
    }

    generate(): Map<string, Achievement> {
        const map: Map<string, Achievement> = new Map<string, Achievement>();

        this.achievements.forEach(rawAchievement => {
            const achievement: Achievement = {
                id: rawAchievement.achievementId,
                title: StringTable.getString(rawAchievement.achievementTitle) ?? '',
                description: StringTable.getString(rawAchievement.achievementDesc) ?? '',
                iconName: convertToIconName(rawAchievement.icon.AssetPathName.split('.').pop() ?? '').replace('.png', ''),
            }

            map.set(rawAchievement.achievementId, achievement)
        })

        return map;
    }
}
