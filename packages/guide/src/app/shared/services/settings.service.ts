import { Injectable } from '@angular/core';
import { Settings } from "../interfaces/settings.interface";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private readonly CURRENT_SETTINGS_VERSION = 1
    private readonly SETTINGS_STORAGE_KEY = 'coral-guide-settings';
    private readonly DEFAULT_SETTINGS: Settings = {
        version: this.CURRENT_SETTINGS_VERSION,
        useBeta: false,
        language: "en"
    }

    private _settings?: Settings

    saveSettings(partialSettings: Partial<Settings>): void {
        const settings = {...this.DEFAULT_SETTINGS, ...partialSettings};

        localStorage.setItem(this.SETTINGS_STORAGE_KEY, JSON.stringify(settings));

        this._settings = settings;
    }


    getSettings(): Settings {
        const settings = localStorage.getItem(this.SETTINGS_STORAGE_KEY);

        if (!settings) {
            this.saveSettings(this.DEFAULT_SETTINGS)
        } else if (!this._settings) {
            const parsedSettings = JSON.parse(settings);

            this._settings = this._migrate(parsedSettings);
        }

        return this._settings!;
    }


    private _migrate(parsedSettings: Partial<Settings> | Settings): Settings {
        if (!parsedSettings['version']) {
            const migrated = {...this.DEFAULT_SETTINGS, useBeta: !!parsedSettings.useBeta};
            this.saveSettings(migrated);
            return migrated
        }
        return parsedSettings as Settings;
    }
}
