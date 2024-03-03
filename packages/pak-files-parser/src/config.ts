import path from 'path';
import { environment } from "./environments/environment";

const targetAssetsPath = path.join(__dirname, '..', '..', '..', 'packages', 'guide', 'src', 'assets', environment.isBeta ? 'beta' : 'live');
const sourceContentPath = path.join(environment.assetPath, 'ProjectCoral', 'Content')
export const config: {
    assetsPath: string;
    itemIconPath: string;
    databasePath: string;
    atlasFramesPath: string;
    characterPortraitsPath: string;
    sourceContentPath: string;
    texturesPath: string;
    portraitPath: string
    headPortraitPath: string
} = {
    assetsPath: targetAssetsPath,
    itemIconPath: path.join(targetAssetsPath, 'items', 'icons'),
    portraitPath: path.join(targetAssetsPath, 'portraits'),
    headPortraitPath: path.join(targetAssetsPath, 'head-portraits'),
    databasePath: path.join(targetAssetsPath, 'database'),
    sourceContentPath,
    texturesPath: path.join(sourceContentPath, 'ProjectCoral', 'Textures'),
    characterPortraitsPath: path.join(sourceContentPath, 'ProjectCoral', 'Characters'),
    atlasFramesPath: path.join(sourceContentPath, 'ProjectCoral', 'Textures', 'AtlasImport', 'Frames')
}
