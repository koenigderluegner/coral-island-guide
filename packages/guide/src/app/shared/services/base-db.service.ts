import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root'
})
export class BaseDbService {

    protected readonly settings = inject(SettingsService).getSettings();
    protected readonly BASE_PATH_WITH_LANG: string;
    protected readonly BASE_PATH: string;
    protected readonly http = inject(HttpClient);

    constructor() {
        const version = this.settings.useBeta ? 'beta' : 'live';
        const lang = this.settings.language ?? 'en'
        this.BASE_PATH = `assets/${version}/database`;
        this.BASE_PATH_WITH_LANG = `assets/${version}/database/${lang}`;
    }
}
