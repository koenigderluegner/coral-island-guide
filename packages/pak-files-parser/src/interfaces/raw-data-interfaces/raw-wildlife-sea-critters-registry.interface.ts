import { ObjectPath } from '../../types/object-path.type';
import { AssetPath } from '../../types/asset-path.type';
import { DatatableRef } from '../../types/datatable-ref.type';

export interface RawWildlifeSeaCrittersRegistry {
    type: ObjectPath | AssetPath;
    spawnOptions: {
        spawnLimit: {
            Type: string;
            Value: number;
        };
        dailySpawn: {
            LowerBound: {
                Type: string;
                Value: number;
            };
            UpperBound: {
                Type: string;
                Value: number;
            };
        };
        spawnAmountGenerator: ObjectPath;
        spawnAmountConditionModifier: Record<string, number>;
        lifetime: string;
        spawnPeriod: string;
        firstDayMaximize: boolean;
        fillLimitOnFirstDay: boolean;
        zoneRarityDistribution: Record<string, number>[];
    };
    conditions: {
        always: false;
        zones: DatatableRef[];
        seasons: string[];
        dayTimeAllowed: boolean;
        nightTimeAllowed: boolean;
        time: [];
        weekDays: [];
        weather: string[];
        townRank: {
            LowerBound: {
                Type: string;
                Value: number;
            };
            UpperBound: {
                Type: string;
                Value: number;
            };
        };
        oceanQuality: {
            LowerBound: {
                Type: string;
                Value: number;
            };
            UpperBound: {
                Type: string;
                Value: number;
            };
        };
        requirements: null;
    };
    IsEditorOnly: boolean;
}
