import { readAsset } from "./functions";
import { RawStringTable } from "../interfaces/raw-data-interfaces/raw-string-table.interface";
import { SourceString } from "../types/source-string.type";
import { AvailableLanguage, AvailableLanguages, TranslationKey } from "@ci/data-types";

export class StringTable {

    static translations: Record<string, Record<string, string>> = {};
    private static readonly cachedStringTables: Map<string, RawStringTable> = new Map<string, RawStringTable>()
    private static readonly cachedLocalizationFiles: Map<string, Record<string, Record<string, string>>> = new Map<string, Record<string, Record<string, string>>>()

    public static getString(ref: SourceString, lang?: AvailableLanguage): TranslationKey | null {


        AvailableLanguages.forEach(l => {
            if (this.translations[l] === undefined) {
                this.translations[l] = {}
            }
        })


        if ('TableId' in ref) {
            const stringTablePath = ref.TableId.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0] + '.json';

            let stringTable = StringTable.cachedStringTables.get(stringTablePath);
            if (!stringTable) {
                const asset = readAsset<RawStringTable[]>(stringTablePath)[0];
                asset.StringTable.KeysToMetaData = {
                    ...(asset.StringTable.KeysToMetaData ?? {}),
                    ...(asset.StringTable.KeysToEntries ?? {}),
                }
                StringTable.cachedStringTables.set(stringTablePath, asset)
                stringTable = asset;
            }


            const translatedString = stringTable.StringTable.KeysToMetaData[ref.Key] ?? ref.Key;
            AvailableLanguages.forEach(l => this.translations[l][ref.Key] = translatedString)
            return ref.Key

        } else if ('SourceString' in ref) {

            const key = [ref.Namespace, ref.Key].filter(Boolean).join('.')

            AvailableLanguages.forEach(lang => {
                let stringTable = StringTable.cachedLocalizationFiles.get(lang);

                if (!stringTable) {
                    const asset = readAsset<Record<string, Record<string, string>>>(`/ProjectCoral/Content/Localization/Game/${lang}/Game.json`);
                    StringTable.cachedLocalizationFiles.set(lang, asset);
                    stringTable = asset;
                }
                this.translations[lang][key] = stringTable[ref.Namespace][ref.Key] ?? ref.LocalizedString ?? ref.Key;
            })
            return key

        }

        return ref.CultureInvariantString ?? null


    }

    public static addTranslationForKey(key: string, namespace = '') {

        AvailableLanguages.forEach(lang => {
            let stringTable = StringTable.cachedLocalizationFiles.get(lang);

            if (!stringTable) {
                const asset = readAsset<Record<string, Record<string, string>>>(`/ProjectCoral/Content/Localization/Game/${lang}/Game.json`);
                StringTable.cachedLocalizationFiles.set(lang, asset);
                stringTable = asset;
            }
            this.translations[lang][key] = stringTable[namespace][key] ?? key;
        })
    }

}
