import { SourceString } from '../../types/source-string.type';
import { AssetPath } from '../../types/asset-path.type';

export interface RawAchievement {
    achievementId: string;
    achievementTitle: SourceString;
    achievementDesc: SourceString;
    quest: AssetPath;
    icon: AssetPath;
    isTrackingProgress: boolean;
    questCondition: string;
}
