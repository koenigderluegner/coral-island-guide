import { Injectable, signal } from '@angular/core';
import { BaseDbService } from "../../shared/services/base-db.service";
import { Observable, of, shareReplay, tap } from "rxjs";
import { BirthdayDashboardEntry, FishDashboardEntry } from "@ci/data-types";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseDbService {

    #fish = signal<FishDashboardEntry[]>([]);
    #birthdays = signal<BirthdayDashboardEntry[]>([]);

    getFish$(): Observable<FishDashboardEntry[]> {
        if (!this.#fish().length) {
            return this.http.get<FishDashboardEntry[]>(`${this.BASE_PATH}/dashboards/fish.json`)
                .pipe(
                    tap(items => this.#fish.set(items)),
                    shareReplay(1)
                );
        } else {
            return of((this.#fish.asReadonly()()))
        }
    }

    getFish() {
        return this.#fish.asReadonly();
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
