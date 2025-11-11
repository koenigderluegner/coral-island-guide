import { EnvironmentConfig } from "./environment-config.interface";
import path from "path";
import { workspaceRoot } from "nx/src/utils/workspace-root";

export const environment: EnvironmentConfig = {
    isBeta: false,
    assetPath: path.join(workspaceRoot, 'pak-assets', 'live')
};
