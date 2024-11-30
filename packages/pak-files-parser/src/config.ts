import path from 'path';
import { environment } from "./environments/environment";

const targetAssetsPath = path.join(__dirname, '..', '..', '..', 'packages', 'guide', 'src', 'assets',);
const sourceContentPath = path.join(environment.assetPath, 'ProjectCoral', 'Content')
const versionRootPath = path.join(targetAssetsPath, environment.isBeta ? 'beta' : 'live');
export const config: {
    target: {
        assetsRoot: string;
        versionRootPath: string,
        itemIconPath: string;
        headPortraitPath: string;
        databasePath: string;
        portraitPath: string
    },
    source: {
        contentRoot: string;
        texturesPath: string;
        treeIconPath: string;
        portraitsPath: string;
    }
} = {
    target: {
        assetsRoot: targetAssetsPath,
        versionRootPath,
        itemIconPath: path.join(versionRootPath, 'items', 'icons'),
        headPortraitPath: path.join(versionRootPath, 'head-portraits'),
        databasePath: path.join(versionRootPath, 'database'),
        portraitPath: path.join(versionRootPath, 'portraits'),
    },
    source: {
        contentRoot: sourceContentPath,
        texturesPath: path.join(sourceContentPath, 'ProjectCoral', 'Textures'),
        treeIconPath: path.join(sourceContentPath, 'ProjectCoral', 'Core', 'Data','TemporaryIcon'),
        portraitsPath: path.join(sourceContentPath, 'ProjectCoral', 'Characters'),
    },
}
