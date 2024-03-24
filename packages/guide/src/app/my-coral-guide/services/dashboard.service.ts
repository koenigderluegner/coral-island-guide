import { Injectable, signal } from '@angular/core';
import { BaseDbService } from "../../shared/services/base-db.service";
import { Observable, of, shareReplay, tap } from "rxjs";
import { FishDashboardEntry } from "@ci/data-types";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseDbService {

    #fish = signal<FishDashboardEntry[]>([]);

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


}
