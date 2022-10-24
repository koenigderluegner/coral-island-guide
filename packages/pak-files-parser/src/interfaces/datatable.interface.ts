export interface Datatable<T> {
    "Type": string,
    "Name": string,
    "Properties": {
        "RowStruct": {
            "ObjectName": string
            "ObjectPath": string
        }
    },
    "Rows": {
        [key: string]: T
    }
}