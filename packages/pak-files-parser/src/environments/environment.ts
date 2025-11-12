import { EnvironmentConfig } from "./environment-config.interface";
import path from "path";
import { workspaceRoot } from "nx/src/utils/workspace-root";

// since esbuild does not support file replacement, we use this method to determine the environment
const envName = process.env['NX_TASK_TARGET_CONFIGURATION'];

const liveEnvironment: EnvironmentConfig = {
    isBeta: false,
    assetPath: path.join(workspaceRoot, 'pak-assets', 'live')
};

const betaEnvironment: EnvironmentConfig = {
    isBeta: true,
    assetPath: path.join(workspaceRoot, 'pak-assets', 'beta')
};


export const environment = envName === 'beta' ? betaEnvironment : liveEnvironment;
