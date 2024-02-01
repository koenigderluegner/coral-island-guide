import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "../../shared/services/settings.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    private readonly _environment = inject(SettingsService).getSettings().useBeta ? 'beta' : 'live';
    private readonly _http = inject(HttpClient);

    get(): Observable<{ version: string }> {
        return this._http.get<{ version: string }>(`assets/${this._environment}/version.json`)
    }

}
