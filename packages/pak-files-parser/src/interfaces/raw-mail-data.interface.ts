import { SourceString } from '../types/source-string.type';
import { Color } from '../types/color.type';
import { AssetPath } from '../types/asset-path.type';

export interface RawMailData {
    sender: SourceString;
    title: SourceString;
    content: SourceString;
    greetopenmessage: SourceString;
    greetclosemessage: SourceString;
    mailtype: string;
    tags: string[];
    isPhotoAttached: true;
    photoPaperColor: Color;
    photoBGColor: Color;
    photoImage: AssetPath;
    isImportantMail: boolean;
}
