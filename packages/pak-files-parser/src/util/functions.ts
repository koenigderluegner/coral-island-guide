import fs from 'fs';
import path from 'path';

export function readAsset<T = any>(fileName: string): T {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', fileName), {encoding: 'utf8', flag: 'r'}));
}

export function generateJson(fileName: string, jsonContent: any) {

    const generatedDirPAth = path.join(__dirname, 'generated');

    if (!fs.existsSync(path.join(__dirname, 'generated')))
        fs.mkdirSync(generatedDirPAth, {recursive: true});


    fs.writeFileSync(path.join(generatedDirPAth, fileName), JSON.stringify(jsonContent, null, 4), {
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

export function getEnumValue(EnumString: string): string {
    let strings = EnumString.split('::');
    return strings[1] ?? EnumString[0];
}


export function allTrue(obj: Record<string, boolean>): boolean {
    const keys: string[] = Object.keys(obj);
    const trueValues = keys.map(key => obj[key]).filter(b => b);

    return trueValues.length === keys.length;

}


export function getTruthyValues(obj: Record<string, boolean>, anyText = 'Any'): string {
    return allTrue(obj)
        ? anyText
        : Object.keys(obj)
            .filter((key) => obj[key])
            .map(capitalizeFirstLetter)
            .map(addSpacesToPascalCase)
            .join(', ');
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addSpacesToPascalCase(pascalCase: string): string {
    return pascalCase.replaceAll(/([A-Z])/g, ' $1').trim();
}
