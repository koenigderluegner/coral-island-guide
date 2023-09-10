import { Achievement } from "@ci/data-types";
import { convertToIconName, readAsset } from "../util/functions";
import { RawAchievement } from "../interfaces/raw-data-interfaces/raw-achievement.interface";


export class AchievementGenerator {
    private achievements: RawAchievement[];


    constructor() {
        this.achievements = readAsset<(any | RawAchievement)[]>('ProjectCoral/Content/ProjectCoral/Data/Achievement/DA_AchievementSubsystemConfig.json')
            .filter((a): a is { Properties: RawAchievement } => 'Properties' in a && 'achievementId' in a.Properties).map(a => a.Properties)
    }

    generate(): Map<string, Achievement> {
        const map: Map<string, Achievement> = new Map<string, Achievement>();

        this.achievements.forEach(rawAchievement => {
            const achievement: Achievement = {
                id: rawAchievement.achievementId,
                title: rawAchievement.achievementTitle.LocalizedString,
                description: rawAchievement.achievementDesc.LocalizedString,
                iconName: convertToIconName(rawAchievement.icon.AssetPathName.split('.').pop() ?? '').replace('.png', ''),
            }

            map.set(rawAchievement.achievementId, achievement)
        })

        return map;
    }
}
