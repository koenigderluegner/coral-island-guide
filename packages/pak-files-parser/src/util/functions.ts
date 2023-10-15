import fs from 'fs';
import path from 'path';
import { MinimalItem } from '@ci/data-types';
import { config } from "../config";
import { environment } from "../environments/environment";
import { EffectMap, RequirementMap } from "../app/da-files-parser";

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

export function generateJson(fileName: string, jsonContent: any, readable = false) {
    const databasePath = config.databasePath

    createPathIfNotExists(databasePath);


    fs.writeFileSync(
        path.join(databasePath, fileName),
        JSON.stringify(jsonContent, null, readable ? 2 : undefined),
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

export function AssetPathNameToIcon(assetPathName: string): string {
    return convertToIconName(assetPathName.split('.').pop() ?? '').replace('.png', '')
}

export function minifyItem(item: { id: string, displayName: string, iconName: string | null }): MinimalItem {
    return {
        id: item.id,
        displayName: item.displayName,
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

