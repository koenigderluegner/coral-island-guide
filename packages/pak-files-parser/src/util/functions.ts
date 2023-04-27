import fs from 'fs';
import path from 'path';
import { Item, MinimalItem } from '@ci/data-types';
import { config } from "../config";
import { SourceString } from "../types/source-string.type";
import { environment } from "../environments/environment";

export function readAsset<T = any>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(environment.assetPath, fileName), {encoding: 'utf8', flag: 'r'}));
}

export function generateJson(fileName: string, jsonContent: any, readable = false) {
    const databasePath = config.databasePath
    if (!fs.existsSync(databasePath))
        fs.mkdirSync(databasePath, {recursive: true});


    fs.writeFileSync(path.join(databasePath, fileName), JSON.stringify(jsonContent, null, readable ? 2 : undefined), {
        encoding: 'utf8',
        flag: 'w+'
    });
}

export function createPathIfNotExists(path: string): void {
    if (!fs.existsSync(path))
        fs.mkdirSync(path, {recursive: true});
}

export function copyAssetsForFiles(files: string[]): void {
    const generatedDirPAth = path.join(__dirname, 'generated', 'images', 'icons');
    const outputPath = path.join(__dirname, 'output', 'images', 'icons');
    createPathIfNotExists(outputPath);
    files.forEach(fileName => {
        if (fs.existsSync(path.join(generatedDirPAth, fileName)))
            fs.copyFileSync(path.join(generatedDirPAth, fileName), path.join(outputPath, fileName));
    });
}

export function convertToIconName(objectName: string): string {
    let sanitizedName = objectName.replace(/_png[0-9]*$/, '.png');

    if (!sanitizedName?.endsWith('.png')) {
        sanitizedName = `${sanitizedName}.png`;
    }

    return sanitizedName;
}

export function minifyItem(item: Item): MinimalItem {
    return {
        id: item.id,
        displayName: item.displayName,
        iconName: item.iconName
    };
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function getSourceStringResult(sourceString: SourceString): string {
    return 'SourceString' in sourceString ? sourceString.SourceString : sourceString.Key;
}

