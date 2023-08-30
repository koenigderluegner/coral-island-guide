import path from 'path';
import { environment } from "./environments/environment";

const assetsPath = path.join(__dirname, '..', '..', '..', 'packages', 'guide', 'src', 'assets', environment.isBeta ? 'beta' : 'live');

export const config: {
    assetsPath: string;
    itemIconPath: string;
    databasePath: string;
    atlasFramesPath: string;
    characterPortraitsPath: string;
    texturesPath: string;
    portaitPath: string
    headPortaitPath: string
} = {
    assetsPath,
    itemIconPath: path.join(assetsPath, 'items', 'icons'),
    portaitPath: path.join(assetsPath, 'portraits'),
    headPortaitPath: path.join(assetsPath, 'head-portraits'),
    databasePath: path.join(assetsPath, 'database'),
    texturesPath: path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures'),
    characterPortraitsPath: path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Characters'),
    atlasFramesPath: path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'AtlasImport', 'Frames')
}
