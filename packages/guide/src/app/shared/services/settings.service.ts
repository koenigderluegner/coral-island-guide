import { Injectable } from '@angular/core';
import { Settings } from "../interfaces/settings.interface";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private readonly SETTINGS_STORAGE_KEY = 'coral-guide-settings';
    private readonly DEFAULT_SETTINGS: Settings = {
        useBeta: false
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
            this._settings = JSON.parse(settings)
        }

        return this._settings!;
    }


}
