import { SourceString } from "../../types/source-string.type";
import { AssetPath } from "../../types/asset-path.type";

export interface RawTagBasedItemGeneric {
    "tagQuery": {
        "TokenStreamVersion": 0,
        "TagDictionary": {
            "TagName": string
        }[],
        "QueryTokenStream": number[],
        "UserDescription": string
        "AutoDescription": string
    },
    "icon": AssetPath,
    "readableText": SourceString
}
