import { EnvironmentConfig } from "./environment-config.interface";
import path from "path";

export const environment: EnvironmentConfig = {
    isBeta: true,
    assetPath: path.join(__dirname, 'assets', 'beta')
};
