import { inject, Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root'
})
export class TranslationLoaderService implements TranslateLoader {

    readonly #http = inject(HttpClient);
    readonly #settings = inject(SettingsService).getSettings();
    readonly #i18nPath = `/assets/${this.#settings.useBeta ? 'beta' : 'live'}/database/i18n/`

    getTranslation(lang: string): Observable<TranslationObject> {
        return this.#http.get<TranslationObject>(this.#i18nPath + lang + '.json')
    }

}
