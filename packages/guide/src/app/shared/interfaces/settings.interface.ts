import { AvailableLanguage } from "@ci/data-types";

export interface Settings {
    version: number;
    useBeta: boolean;
    language: AvailableLanguage;
}
