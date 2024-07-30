import { APP_INITIALIZER, inject, InjectionToken, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpBackend, HttpClient, provideHttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { SettingsService } from "../../shared/services/settings.service";


export const GAME_VERSION = new InjectionToken<string>('GAME_VERSION');

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ], providers: [
        provideHttpClient(),
        {provide: APP_INITIALIZER, useValue: () => GameVersionModule._loading, multi: true},
        {provide: GAME_VERSION, useFactory: () => GameVersionModule._value || {}}
    ]
})
export class GameVersionModule {

    private static _loading: Observable<string>;
    private static _value: string;
    readonly #httpBackend = inject(HttpBackend);
    readonly #environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';

    constructor() {
        const http = new HttpClient(this.#httpBackend);

        GameVersionModule._loading = http.get<{
            version: string
        }>(`assets/${this.#environment}/version.json?t=${new Date().toISOString()}`).pipe(
            map(res => {
                GameVersionModule._value = res.version;
                return res.version
            })
        );

    }
}
