import { SourceString } from "../types/source-string.type";

type Color = {
    "R": number
    "G": number
    "B": number


    "A": number,
    "Hex": string
};

export interface RawMailData {
    "sender": SourceString,
    "title": SourceString,
    "content": SourceString,
    "greetopenmessage": SourceString,
    "greetclosemessage": SourceString,
    "mailtype": string
    "tags": string[],
    "isPhotoAttached": true,
    "photoPaperColor": Color,
    "photoBGColor": Color,
    "photoImage": {
        "AssetPathName": string
        "SubPathString": string
    },
    "isImportantMail": boolean
}
