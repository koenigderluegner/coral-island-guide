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