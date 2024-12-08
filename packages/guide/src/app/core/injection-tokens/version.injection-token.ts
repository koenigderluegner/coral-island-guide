import {
    inject,
    Injectable,
    InjectionToken,
    makeEnvironmentProviders,
    provideAppInitializer,
    signal
} from "@angular/core";
import { HttpBackend, HttpClient, provideHttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { SettingsService } from "../../shared/services/settings.service";


@Injectable({providedIn: 'root'})
class GameVersionService {
    value = signal('')
    readonly #httpBackend = inject(HttpBackend);
    readonly #environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';

    value$() {
        const http = new HttpClient(this.#httpBackend);
        return http.get<{
            version: string
        }>(`assets/${this.#environment}/version.json?t=${new Date().toISOString()}`).pipe(
            map(res => {
                this.value.set(res.version)
                return res.version
            }),
        )
    }
}

export const GAME_VERSION = new InjectionToken<string>('GAME_VERSION');


export const provideGameVersion = () => makeEnvironmentProviders([
    provideHttpClient(),
    provideAppInitializer(() => {

        const initializerFn = ((GameVersionService: GameVersionService) => {
            return () => GameVersionService.value$();
        })(inject(GameVersionService));

        return initializerFn()

    }),
    {
        provide: GAME_VERSION,
        useFactory: (GameVersionService: GameVersionService) => GameVersionService.value() || '',
        deps: [GameVersionService]
    }
])
