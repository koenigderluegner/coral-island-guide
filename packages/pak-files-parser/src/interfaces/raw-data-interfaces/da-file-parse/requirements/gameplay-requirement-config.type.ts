import { DaRequirements } from './da-requirements.type';
import { AssetMap } from '../../../../types/asset-map.type';
import { ObjectPath } from '../../../../types/object-path.type';

export type GameplayRequirementsConfig = {
    Type: 'C_GameplayRequirementsConfig';
    Name: string;
    Properties?: {
        map: GameplayRequirementsConfigMap | GameplayRequirementsConfigMap[];
    };
};

export type GameplayRequirementsConfigMap = AssetMap<{
    type: string;
    requirements: ObjectPath[];
}>;

export type GameplayRequirementsConfigEntry = GameplayRequirementsConfig | DaRequirements;
