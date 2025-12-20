import { computed, inject, Injectable } from '@angular/core';
import { SettingsService } from "../../shared/services/settings.service";

export type Config = {
    assetPath: string;
    iconPath: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    readonly #settings = inject(SettingsService);
    readonly config = computed<Config>(() => {
        const settings = this.#settings.getSettings();
        const versionPath = settings.useBeta ? 'beta' : 'live'
            return {
                assetPath: `/assets/${versionPath}/`,
                iconPath: `assets/${versionPath}/items/icons/`
            }
        }
    )

}
