import { SourceString } from "../../types/source-string.type";
import { ObjectPath } from "../../types/object-path.type";

export interface RawFestival {
    "eventID": string;
    "eventsName": SourceString
    "image": ObjectPath,
    "icon": ObjectPath
}
