import { Injectable, signal } from '@angular/core';
import { BaseDbService } from "../../shared/services/base-db.service";
import { Observable, of, shareReplay, tap } from "rxjs";
import { BirthdayDashboardEntry, CritterDashboardEntry, FishDashboardEntry } from "@ci/data-types";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseDbService {

    #fish = signal<FishDashboardEntry[]>([]);
    #insects = signal<CritterDashboardEntry[]>([]);
    #oceanCritter = signal<CritterDashboardEntry[]>([]);
    #birthdays = signal<BirthdayDashboardEntry[]>([]);

    getFish$(): Observable<FishDashboardEntry[]> {
        if (!this.#fish().length) {
            return this.http.get<FishDashboardEntry[]>(`${this.BASE_PATH}/dashboards/museum-fish.json`)
                .pipe(
                    tap(items => this.#fish.set(items)),
                    shareReplay(1)
                );
        } else {
            return of((this.#fish.asReadonly()()))
        }
    }

    getInsects$(): Observable<CritterDashboardEntry[]> {
        if (!this.#insects().length) {
            return this.http.get<CritterDashboardEntry[]>(`${this.BASE_PATH}/dashboards/museum-insects.json`)
                .pipe(
                    tap(items => this.#insects.set(items)),
                    shareReplay(1)
                );
        } else {
            return of((this.#insects.asReadonly()()))
        }
    }

    getOceanCritters$(): Observable<CritterDashboardEntry[]> {
        if (!this.#oceanCritter().length) {
            return this.http.get<CritterDashboardEntry[]>(`${this.BASE_PATH}/dashboards/museum-ocean-critters.json`)
                .pipe(
                    tap(items => this.#oceanCritter.set(items)),
                    shareReplay(1)
                );
        } else {
            return of((this.#oceanCritter.asReadonly()()))
        }
    }

    getFish() {
        return this.#fish.asReadonly();
    }

    getInsects() {
        return this.#insects.asReadonly();
    }

    getOceanCritter() {
        return this.#oceanCritter.asReadonly();
    }

    getBirthdays$(): Observable<BirthdayDashboardEntry[]> {
        if (!this.#birthdays().length) {
            return this.http.get<BirthdayDashboardEntry[]>(`${this.BASE_PATH}/dashboards/birthdays.json`)
                .pipe(
                    tap(items => this.#birthdays.set(items)),
                    shareReplay(1)
                );
        } else {
            return of((this.#birthdays.asReadonly()()))
        }
    }

    getBirthdays() {
        return this.#birthdays.asReadonly();
    }


}
