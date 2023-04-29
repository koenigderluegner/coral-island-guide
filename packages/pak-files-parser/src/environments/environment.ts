import { EnvironmentConfig } from "./environment-config.interface";
import path from "path";

export const environment: EnvironmentConfig = {
    isBeta: false,
    assetPath: path.join(__dirname, 'assets', 'live')
};
