export type RawSendMailToPlayerEffect = {
    "Type": "C_SendMailToPlayerEffect",
    "Name": string
    "Outer": string
    "Class": "UScriptClass'C_SendMailToPlayerEffect'",
    "Properties": {
        "mailRow": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        },
        "mailId": string
        "dayDelay": number
    }
}
