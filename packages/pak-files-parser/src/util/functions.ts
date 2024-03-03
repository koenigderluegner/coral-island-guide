import fs from 'fs';
import path from 'path';
import { AvailableLanguage, Item, MinimalItem, MinimalNPC, MinimalTagBasedItem } from '@ci/data-types';
import { config } from "../config";
import { environment } from "../environments/environment";
import { EffectMap, RequirementMap } from "../app/da-files-parser";
import { AssetPath } from "../types/asset-path.type";
import { ObjectPath } from "../types/object-path.type";
import { RawNPC } from "../interfaces/raw-data-interfaces/raw-npc.interface";

export function getParsedArgs(): Record<string, any> {
    return process.argv
        .filter(s => s.startsWith('-'))
        .map(s => s.replace(/^-+/, "").toLocaleLowerCase())
        .reduce((prev: Record<string, any>, current) => {
            const parts = current.split('=');
            if (parts.length === 2) {
                prev[parts[0]] = parts[1] === 'false' ? false : parts[1] === 'true' ? true : parts[1];
            } else {
                prev[parts[0]] = true
            }

            return prev;
        }, {})
}

export function readAsset<T = any>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(environment.assetPath, fileName), {encoding: 'utf8', flag: 'r'}));
}

export function generateJson(fileName: string, jsonContent: any, readable = false, lang: AvailableLanguage = "en") {
    const databasePath = path.join(config.databasePath, lang)
    const filePath = path.join(databasePath, fileName);
    const fileTargetLocation = filePath.split(path.sep).slice(0, -1).join(path.sep)

    createPathIfNotExists(fileTargetLocation);

    fs.writeFileSync(
        filePath,
        JSON.stringify(jsonContent, null, readable ? 2 : undefined).replace(/\n/g, "\r\n"),
        {
            encoding: 'utf8',
            flag: 'w+',
        }
    );
}

export function createPathIfNotExists(path: string): void {
    if (!fs.existsSync(path))
        fs.mkdirSync(path, {recursive: true});
}

export function copyAssetsForFiles(files: string[]): void {
    const generatedDirPath = path.join(__dirname, 'generated', 'images', 'icons');
    const outputPath = path.join(__dirname, 'output', 'images', 'icons');
    createPathIfNotExists(outputPath);
    files.forEach(fileName => {
        if (fs.existsSync(path.join(generatedDirPath, fileName)))
            fs.copyFileSync(path.join(generatedDirPath, fileName), path.join(outputPath, fileName));
    });
}

export function convertToIconName(objectName: string): string {
    let sanitizedName = objectName.replace(/_png[0-9]*$/, '.png');

    if (!sanitizedName?.endsWith('.png')) {
        sanitizedName = `${sanitizedName}.png`;
    }

    return sanitizedName;
}

export function AssetPathNameToIcon(assetPathName: string | AssetPath | ObjectPath): string {
    if (typeof assetPathName === 'string') {
        return convertToIconName(assetPathName.split('.').pop() ?? '').replace('.png', '')
    } else if ('ObjectPath' in assetPathName) {
        return convertToIconName(getReferencedString(assetPathName.ObjectName)).replace('.png', '')
    }

    return convertToIconName(assetPathName.AssetPathName.split('.').pop() ?? '').replace('.png', '')


}

export function minifyItem(item: undefined): undefined ;
export function minifyItem(item: null): null ;
export function minifyItem(item: Item | MinimalItem): MinimalItem;
export function minifyItem(item: {
    id: string,
    displayName: string,
    iconName: string | null
} | undefined): MinimalItem | undefined;
export function minifyItem(item: {
    id: string,
    displayName: string,
    iconName: string | null
} | Item | MinimalItem | null | undefined): MinimalItem | null | undefined {
    if (!item) return item;

    return {
        id: item.id,
        displayName: item.displayName,
        iconName: item.iconName
    };
}

export function minifyTagBasedItem(item: { key: string, displayName: string, iconName: string }): MinimalTagBasedItem {
    return {
        key: item.key,
        displayName: item.displayName,
        iconName: item.iconName
    };
}

export function minifyNPC(item: { key: string, characterName: string, iconName: string | null }): MinimalNPC {
    return {
        key: item.key,
        characterName: item.characterName,
        iconName: item.iconName
    };
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}


export function getReferencedString(a: string): string {
    if (a.includes(' ')) {
        return a.split(' ')[1] ?? '';
    } else {
        return a.split('\'')[1] ?? '';
    }
}

export function isEffectMap(value: EffectMap | RequirementMap | undefined): value is EffectMap {
    if (!notEmpty(value)) return false;
    const keys = [...value.keys()];
    return !!keys.length && 'effects' in value.get(keys[0])!
}

export function isRequirementMap(value: EffectMap | RequirementMap | undefined): value is RequirementMap {
    if (!notEmpty(value)) return false;
    const keys = [...value.keys()];
    return !!keys.length && 'requirements' in value.get(keys[0])!
}


export function extractOutfitPortraitsLocation(dbItem: RawNPC, itemKey: string) {
    let index = 0;
    let fileName = ''
    if (dbItem.portraitsDT) {
        const [portaitsPath, foundIndex] = dbItem.portraitsDT.ObjectPath.split('.');

        fileName = path.join(portaitsPath + '.json');
        index = +foundIndex;
    } else {
        fileName = path.join('ProjectCoral', 'Content', 'ProjectCoral', 'Core', 'Data', 'AI', 'NPC_Outfit', `DT_${itemKey}Outfit.json`)
    }
    return {index, fileName};
}
