import { inject, Injectable, signal } from '@angular/core';
import { SettingsService } from "../../shared/services/settings.service";
import { UserData } from "../types/user-data.type";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private static readonly _CURRENT_USER_DATA_VERSION = 3;
    private static readonly _USER_DATA_STORE_KEY = 'user-data'
    private static readonly _SAVE_GAME_NAME_PREFIX = 'Save game '
    userData = signal<{ version: number, currentIndex: number; data: UserData[] }>({
        version: UserDataService._CURRENT_USER_DATA_VERSION,
        currentIndex: -1,
        data: []
    })
    localStorage = inject(LocalStorageService);
    readonly #versionSuffix = inject(SettingsService).getSettings().useBeta ? '_beta' : '_live';

    save(): void {
        this.localStorage.setItem(UserDataService._USER_DATA_STORE_KEY + this.#versionSuffix, JSON.stringify(this.userData()));
    }

    read(): void {
        const userData = this.localStorage.getItem(UserDataService._USER_DATA_STORE_KEY + this.#versionSuffix);
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
            name: this.#getNextName(),
            myGuideFilter: {year: 1, day: 1, season: "Spring", weather: "Sunny", hideCompleted: true},
            todoText: '',
            todos: [],
            checklists: {}
        }
    }

    getCurrentData(): UserData {
        return this.userData().data[this.userData().currentIndex]
    }

    #migrate(userData: any): { version: number, currentIndex: number; data: UserData[] } {
        let migratedData: UserData[] = userData.data ?? [];
        let existingVersion = userData.version
        while (existingVersion !== UserDataService._CURRENT_USER_DATA_VERSION) {

            if (!existingVersion) {
                migratedData = [this.createEmptyUserData()];
                existingVersion = UserDataService._CURRENT_USER_DATA_VERSION;
            } else if (existingVersion === 1) {
                migratedData = migratedData.map((d, index) => {
                    d.myGuideFilter = {year: 1, day: 1, season: "Spring", weather: "Sunny", hideCompleted: true};
                    d.name = UserDataService._SAVE_GAME_NAME_PREFIX + (index + 1);
                    d.checklists = {};
                    return d
                });
                existingVersion = 2;
            } else if (existingVersion === 2) {
                migratedData = migratedData.map(d => {
                    d.todoText = '';
                    return d
                });
                existingVersion = 3;
            }


        }

        return {
            version: UserDataService._CURRENT_USER_DATA_VERSION,
            currentIndex: userData.currentIndex ?? 0,
            data: migratedData
        }

    }

    #getNextName(): string {
        const names = new Set(this.userData().data.map(d => d.name));
        let currentIndex = this.userData().data.length + 1;

        while (names.has(UserDataService._SAVE_GAME_NAME_PREFIX + currentIndex)) {
            currentIndex++;
        }

        return UserDataService._SAVE_GAME_NAME_PREFIX + currentIndex;


    }
}
