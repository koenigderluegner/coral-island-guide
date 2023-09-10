import { Achievement } from "../../interfaces/achievement.interface";

export type IsAchievementCompletedRequirement = {
    type: "IsAchievementCompleted",
    meta: {
        achievement: Achievement
    }
}
