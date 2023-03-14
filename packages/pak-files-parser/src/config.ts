import path from 'path';

const assetsPath = path.join(__dirname, '..', '..', '..', 'packages', 'guide', 'src', 'assets');

export const config: { assetsPath: string; itemIconPath: string; databasePath: string; texturePath: string; } = {
    assetsPath,
    itemIconPath: path.join(assetsPath, 'items', 'icons'),
    databasePath: path.join(assetsPath, 'database'),
    texturePath: path.join(__dirname, 'assets', 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'AtlasImport', 'Frames')
}
