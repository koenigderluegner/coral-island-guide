import { AssetPath } from "../../types/asset-path.type";
import { SourceString } from "../../types/source-string.type";

export interface RawTagBasedCookingGeneric {
    "tagQuery": {
        "TokenStreamVersion": number,
        "TagDictionary": [],
        "QueryTokenStream": [],
        "UserDescription": string,
        "AutoDescription": string
    },
    "icon": AssetPath,
    "readableText": SourceString
}
