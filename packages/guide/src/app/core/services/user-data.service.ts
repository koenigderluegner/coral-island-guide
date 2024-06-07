import { inject, Injectable, signal } from '@angular/core';
import { SettingsService } from "../../shared/services/settings.service";
import { UserData } from "../types/user-data.type";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private static readonly _CURRENT_USER_DATA_VERSION = 1
    private static readonly _USER_DATA_STORE_KEY = 'user-data'
    userData = signal<{ version: number, currentIndex: number; data: UserData[] }>({
        version: UserDataService._CURRENT_USER_DATA_VERSION,
        currentIndex: -1,
        data: []
    })
    readonly #versionSuffix = inject(SettingsService).getSettings().useBeta ? '_beta' : '_live';


    save(): void {
        localStorage.setItem(UserDataService._USER_DATA_STORE_KEY + this.#versionSuffix, JSON.stringify(this.userData()));
    }

    read(): void {
        const userData = localStorage.getItem(UserDataService._USER_DATA_STORE_KEY + this.#versionSuffix);
        if (userData) {
            this.userData.set(JSON.parse(userData));
        } else {
            this.userData.set({
                version: UserDataService._CURRENT_USER_DATA_VERSION,
                currentIndex: 0,
                data: [this.createEmptyUserData()]
            })
            this.save();
        }
    }

    createEmptyUserData(): UserData {
        return {
            todos: []
        }
    }
}
