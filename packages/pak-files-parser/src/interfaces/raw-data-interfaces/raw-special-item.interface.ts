export interface RawSpecialItem {
    "id": string
    "advancedVariant": string[],
    "name": {
        "Namespace": string
        "Key": string
        "SourceString": string
        "LocalizedString": string
    },
    "description": {
        "Namespace": string
        "Key": string
        "SourceString": string
        "LocalizedString": string
    },
    "icon": {
        "ObjectName": string
        "ObjectPath": string
    }
}
