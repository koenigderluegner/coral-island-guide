import { SourceString } from '../../types/source-string.type';
import { Color } from '../../types/color.type';
import { AssetPath } from '../../types/asset-path.type';

export interface RawTornPage {
    titleText: SourceString;
    image: AssetPath;
    type: string;
    contentText: SourceString;
    tornPagesEffects: AssetPath;
    isPhotoAttached: boolean;
    photoPaperColor: Color;
    photoBGColor: Color;
    photoImage: AssetPath;
}
