import { inject, Injectable, makeEnvironmentProviders, provideAppInitializer, signal } from "@angular/core";
import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
import { firstValueFrom, map } from "rxjs";
import { SettingsService } from "../../shared/services/settings.service";

// TODO split into separate files, clean up
@Injectable({providedIn: 'root'})
export class GameVersionService {
    value = signal('')
    readonly #http2 = inject(HttpClient);
    readonly #environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';

    value$() {
        const http = this.#http2;
        return firstValueFrom(http.get<{
            version: string
        }>(`assets/${this.#environment}/version.json?t=${new Date().toISOString()}`).pipe(
            map(res => {
                this.value.set(res.version)
                return res.version
            }),
        ))

    }
}

export const provideGameVersion = () => makeEnvironmentProviders([
    provideHttpClient(withFetch()),
    provideAppInitializer(() => {
        const initializerFn = ((GameVersionService: GameVersionService) => {
            return () => GameVersionService.value$();
        })(inject(GameVersionService));

        return initializerFn()

    }),
])
