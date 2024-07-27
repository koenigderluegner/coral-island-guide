import { inject, Injectable, signal } from '@angular/core';
import { SettingsService } from "../../shared/services/settings.service";
import { UserData } from "../types/user-data.type";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private static readonly _CURRENT_USER_DATA_VERSION = 2
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

            const parsedJSON = JSON.parse(userData);
            const migrated = this.#migrate(parsedJSON);

            this.userData.set(migrated);

            if (parsedJSON.version !== migrated.version) {
                this.save();
            }


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
            myGuideDate: {year: 1, day: 1, season: "Spring"},
            todos: []
        }
    }

    #migrate(userData: any): { version: number, currentIndex: number; data: UserData[] } {
        let migratedData: UserData[] = userData.data ?? [];
        let existingVersion = userData.version
        while (existingVersion !== UserDataService._CURRENT_USER_DATA_VERSION) {

            if (!existingVersion) {
                migratedData = [this.createEmptyUserData()];
                existingVersion = UserDataService._CURRENT_USER_DATA_VERSION;
            } else if (existingVersion === 1) {
                migratedData = migratedData.map(d => {
                    d.myGuideDate = {year: 1, day: 1, season: "Spring"};
                    return d
                });
                existingVersion = 2;
            }


        }

        return {
            version: UserDataService._CURRENT_USER_DATA_VERSION,
            currentIndex: userData.currentIndex ?? 0,
            data: migratedData
        }

    }
}
