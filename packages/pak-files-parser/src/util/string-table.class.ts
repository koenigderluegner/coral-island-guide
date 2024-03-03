import { readAsset } from "./functions";
import { RawStringTable } from "../interfaces/raw-data-interfaces/raw-string-table.interface";
import { SourceString } from "../types/source-string.type";
import { AvailableLanguage } from "@ci/data-types";

export class StringTable {

    static defaultLang: AvailableLanguage = 'en';
    private static readonly cachedStringTables: Map<string, RawStringTable> = new Map<string, RawStringTable>()
    private static readonly cachedLocalizationFiles: Map<string, Record<string, Record<string, string>>> = new Map<string, Record<string, Record<string, string>>>()

    public static getString(ref: SourceString, lang?: AvailableLanguage): string | null {
        if (!lang) lang = StringTable.defaultLang;

        if ('TableId' in ref) {
            const stringTablePath = ref.TableId.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0] + '.json';

            if (!StringTable.cachedStringTables.has(stringTablePath)) {
                StringTable.cachedStringTables.set(stringTablePath, readAsset<RawStringTable[]>(stringTablePath)[0])
            }

            const stringTable = StringTable.cachedStringTables.get(stringTablePath)!;

            return stringTable.StringTable.KeysToMetaData[ref.Key] ?? ref.Key

        } else if ('SourceString' in ref) {

            if (!StringTable.cachedLocalizationFiles.has(lang)) {
                StringTable.cachedLocalizationFiles.set(lang, readAsset<Record<string, Record<string, string>>>(`/ProjectCoral/Content/Localization/Game/${lang}/Game.json`));
            }

            const stringTable = StringTable.cachedLocalizationFiles.get(lang)!;

            return stringTable[ref.Namespace][ref.Key] ?? ref.LocalizedString ?? ref.Key

        }

        return ref.CultureInvariantString ?? null


    }

}
