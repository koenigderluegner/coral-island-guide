import { SourceString } from '../../types/source-string.type';
import { ObjectPath } from '../../types/object-path.type';
import { AssetPath } from '../../types/asset-path.type';

type DefaultAppearance = {
    halfBodyPortrait: AssetPath;
    appearanceDT: ObjectPath | null;
    "halfBodyPortraitConcealed": AssetPath,
    "mapIcon": AssetPath
};

export interface RawNPC {
    characterID: string;
    CharacterName: SourceString;
    Description: SourceString;
    mapIcon: AssetPath
    defaultAppearance: DefaultAppearance
    newFormAppearance: DefaultAppearance
    isDateable: boolean;
    canHaveRelationships: boolean;
    canReceiveGifts: boolean;
    canInteract: boolean;
    dialogPortraitPosition: {
        X: number;
        Y: number;
    };
    dialogPortraitScale: number;
    PortraitMenu: AssetPath;
    PortraitScale: number;
    PortraitScroll: {
        X: number;
        Y: number;
    };
    UVTile: {
        X: number;
        Y: number;
    };
    CalendarPortraitScale: number;
    CalendarPortraitScroll: {
        X: number;
        Y: number;
    };
    CalendarUVTile: {
        X: number;
        Y: number;
    };
    CharacterCategory: string;
}
