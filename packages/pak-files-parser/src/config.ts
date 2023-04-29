import path from 'path';
import { environment } from "./environments/environment";

const assetsPath = path.join(__dirname, '..', '..', '..', 'packages', 'guide', 'src', 'assets', environment.isBeta ? 'beta' : 'live');

export const config: { assetsPath: string; itemIconPath: string; databasePath: string; atlasFramesPath: string; texturesPath: string } = {
    assetsPath,
    itemIconPath: path.join(assetsPath, 'items', 'icons'),
    databasePath: path.join(assetsPath, 'database'),
    texturesPath: path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures'),
    atlasFramesPath: path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'AtlasImport', 'Frames')
}
