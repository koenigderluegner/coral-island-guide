export interface RawStringTable {
    "Type": string;
    "Name": string;
    "Class": string;
    "StringTable": {
        "TableNamespace": string;
        "KeysToMetaData": Record<string, string>;
    },
    "StringTableId": number;
}
